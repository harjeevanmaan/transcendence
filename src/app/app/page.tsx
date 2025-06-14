"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Square, Mic } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { NodeType, EdgeType } from "@/components/MindMapCanvas";

// ForceGraph uses window; load dynamically to avoid SSR issues.
const MindMapCanvas = dynamic(() => import("@/components/MindMapCanvas"), {
  ssr: false,
});
import type { MindMapData } from "@/components/MindMapCanvas";

// ───────────────────────────────────────────────────────────────
// Backend routing – set this to true when you want to hit your
// local FastAPI/Flask/Whatever running on :5001.
const USE_LOCAL_BACKEND = false;   // ← flip to true for localhost:5001
const BACKEND_ENDPOINT  = USE_LOCAL_BACKEND
  ? "http://localhost:5001/api/backend"
  : "/api/backend";                // default Next.js route

// ✨ 2. utility that re-uses existing objects so their x/y stay intact
const mergeGraphData = (
  prev: MindMapData,
  incoming: MindMapData
): MindMapData => {
  const nodeMap = new Map(prev.nodes.map((n) => [n.id, n]));

  const mergedNodes: NodeType[] = incoming.nodes.map((n) => {
    const existing = nodeMap.get(n.id);

    /* ──────────────── 1️⃣  Already-known node ──────────────── */
    if (existing) {
      // update mutable fields
      existing.label      = n.label;
      existing.importance = n.importance;

      // NEW: copy coords & lock them *before* FG sees the data
      if (existing.x !== undefined && existing.y !== undefined) {
        existing.fx = existing.x;
        existing.fy = existing.y;
      }

      return existing;                // 🔄 keep reference (no re-heat)
    }

    /* ──────────────── 2️⃣  Brand-new node ─────────────────── */
    // allow free movement until we freeze after layout
    return { ...n };
  });

  const edgeKey  = (e: EdgeType) => `${e.source}->${e.target}`;
  const edgeMap  = new Map(prev.edges.map((e) => [edgeKey(e), e]));
  const mergedEdges: EdgeType[] = incoming.edges.map((e) => {
    const existing = edgeMap.get(edgeKey(e));
    if (existing) {
      existing.relation = e.relation;
      existing.weight   = e.weight;
      return existing;
    }
    return { ...e };
  });

  return { nodes: mergedNodes, edges: mergedEdges };
};

export default function AppPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState("00:00:00");
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [transcript, setTranscript] = useState<string[]>([]);
  const [graphData, setGraphData] = useState<MindMapData>({ nodes: [], edges: [] });

  // Refs for audio recording
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isRecordingRef = useRef(false);
  const recognitionRef = useRef<any>(null);

  // Pump state for backend sync
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptRef = useRef<string>("");

  /* ────────── layout-debug refs & logger ────────── */
  const mainRef    = useRef<HTMLElement>(null);
  const mapAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      const mainH = mainRef.current?.getBoundingClientRect().height ?? 0;
      const mapH  = mapAreaRef.current?.getBoundingClientRect().height ?? 0;
      console.log("[Layout] main:", mainH, "px  |  map-area:", mapH, "px");
    };
    measure();                       // first run
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Cleanup function for all timeouts
  useEffect(() => {
    return () => {
      // Clear interval when component unmounts
      if (timerInterval) {
        clearInterval(timerInterval);
      }

      // Clear all timeouts
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));

      // Clear debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Stop media recorder if active
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [timerInterval]);

  // Update ref when state changes and handle cleanup when recording stops
  useEffect(() => {
    isRecordingRef.current = isRecording;

    // When recording is stopped, ensure all resources are properly cleaned up
    if (!isRecording && mediaRecorderRef.current) {
      // Make sure the MediaRecorder is stopped
      if (mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }

      // Stop all tracks in the stream
      if (mediaRecorderRef.current.stream) {
        const tracks = mediaRecorderRef.current.stream.getTracks();
        tracks.forEach((track) => track.stop());
      }

      // Clear debounce timer when recording stops
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      // Reset state
      setTranscript([]);
      audioChunksRef.current = [];
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current = [];

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Set up recording state
      setIsRecording(true);

      // Start timer
      let seconds = 0;
      const interval = setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        setTimer(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`,
        );
      }, 1000);
      setTimerInterval(interval);

      // Handle audio data
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Start recording
      mediaRecorder.start(1000); // Collect data every second

      // Start speech recognition
      startSpeechRecognition();

      // Start backend pump
      startBackendPump();
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    // First update the recording ref directly to ensure all async operations check this value
    isRecordingRef.current = false;

    // Update recording state
    setIsRecording(false);

    // Stop timer
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setTimer("00:00:00");

    // Stop media recorder
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      try {
        mediaRecorderRef.current.stop();

        // Stop all tracks in the stream
        const tracks = mediaRecorderRef.current.stream.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (error) {
        console.error("Error stopping media recorder:", error);
      }
    }

    // Stop speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      } catch (error) {
        console.error("Error stopping speech recognition:", error);
      }
    }

    // Clear all pending timeouts
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current = [];

    // Stop backend pump and send final payload immediately
    stopBackendPump();
    if (transcriptRef.current.length > 0) {
      console.log("▶️ sending final transcript (", transcriptRef.current.length, "chars )");
      sendToBackend(transcriptRef.current);
    }
  };

  // Start speech recognition
  const startSpeechRecognition = () => {
    // Check if the browser supports the Web Speech API
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      console.error("Speech recognition not supported");
      alert(
        "Speech recognition is not supported in this browser. Please try Chrome, Edge, or Safari.",
      );
      // Fall back to simulation for unsupported browsers
      simulateTranscription();
      return;
    }

    // Create speech recognition instance
    // Use type assertion to avoid TypeScript errors during build
    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;

    // Configure recognition
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    // Handle results
    recognition.onresult = (event: any) => {
      if (!isRecordingRef.current) return;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => {
            const newTranscript = [...prev, transcript];
            transcriptRef.current = newTranscript.join(" ");
            return newTranscript;
          });
        }
      }
    };

    // Handle errors
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      if (event.error === "not-allowed") {
        alert(
          "Microphone access denied. Please check your browser permissions.",
        );
      }
    };

    // Start recognition
    try {
      recognition.start();
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      // Fall back to simulation if starting fails
      simulateTranscription();
    }
  };

  // Debounce timer for API calls
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Send transcript to backend every 15 s while recording (simple throttle)
  const sendToBackend = async (text: string) => {
    if (text.length < 50) return; // skip tiny payloads
    const t0 = performance.now();
    try {
      const res = await fetch(BACKEND_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      const ms = Math.round(performance.now() - t0);
      console.log(`⏱ round-trip ${ms} ms`);
      console.log("🧩 received", data.nodes.length, "nodes /", data.edges.length, "edges");
      data.nodes.forEach((n: any) => console.log("node:", n.id, "→", n.label));
      data.edges.forEach((e: any) =>
        console.log("edge:", e.source, "--(", e.relation || "", ")→", e.target)
      );
      setGraphData((prev) => mergeGraphData(prev, data));
    } catch (err) {
      console.error("🚨 backend fetch failed", err);
    }
  };

  const startBackendPump = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      sendToBackend(transcriptRef.current);
    }, 15000);
  };

  const stopBackendPump = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Simulate real-time transcription as fallback
  const simulateTranscription = () => {
    const transcriptPhrases = [
      "Hi everyone, thanks for joining today's meeting.",
      "Let's discuss the progress on the new feature implementation.",
      "The development team has completed the initial phase.",
      "We're seeing positive results from the user testing.",
      "I think we should prioritize the mobile experience.",
      "Does anyone have questions about the timeline?",
      "We need to allocate more resources to the marketing campaign.",
      "The analytics show a 20% increase in user engagement.",
      "Let's schedule a follow-up meeting next week.",
      "I'll share the presentation slides after the call.",
    ];

    let index = 0;

    const addTranscriptLine = () => {
      // Check the ref value, not the state
      if (!isRecordingRef.current) return;

      if (index < transcriptPhrases.length) {
        // Add the transcript line immediately to ensure it appears
        setTranscript((prev) => {
          const newTranscript = [...prev, transcriptPhrases[index]];
          transcriptRef.current = newTranscript.join(" ");
          return newTranscript;
        });
        index++;

        // Continue adding lines at random intervals if still recording
        const nextTimeout = Math.random() * 2000 + 1000; // 1-3 seconds
        const timeoutId = setTimeout(() => {
          // Double-check recording state before continuing
          if (isRecordingRef.current) {
            addTranscriptLine();
          }
        }, nextTimeout);

        // Store timeout ID for cleanup
        timeoutsRef.current.push(timeoutId);
      }
    };

    // Start the simulation with a small initial delay
    const initialTimeoutId = setTimeout(() => {
      if (isRecordingRef.current) {
        addTranscriptLine();
      }
    }, 500);

    // Store the initial timeout ID for cleanup
    timeoutsRef.current.push(initialTimeoutId);
  };

  return (
    <div className="h-screen overflow-hidden bg-white dark:bg-zinc-900 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-500 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <div className="text-sm font-medium">Transcendence Meeting</div>
        <div>
          <Link
            href="/"
            className="text-xs text-white/80 hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main ref={mainRef} className="flex flex-1 min-h-0">
        <div className="w-full flex flex-1 min-h-0">
          {/* Left side - Mind Map Area (75%) */}
          <div
            ref={mapAreaRef}
            className={`relative flex-[3] flex flex-col flex-1 min-h-0 ${
              graphData.nodes.length === 0 ? "items-center justify-center p-6" : ""
            }`}
          >
            {graphData.nodes.length > 0 && (
              <div className="absolute inset-0 pointer-events-none">
                <MindMapCanvas data={graphData} />
              </div>
            )}
            {!isRecording && graphData.nodes.length === 0 ? (
              <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-lg shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
                <div className="p-8 flex flex-col items-center justify-center space-y-4">
                  <button
                    onClick={startRecording}
                    className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800"
                  >
                    <Play className="h-10 w-10 text-indigo-500 ml-1" />
                  </button>
                  <span className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
                    Ready to Record
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    Click to start your meeting
                  </span>
                </div>
                <div className="p-4 border-t border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      AI Ready
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {timer}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-start justify-center p-6 relative bg-white/5 dark:bg-zinc-800/5 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-700">
                <div className="absolute top-6 left-6 flex items-center space-x-4">
                  <button
                    onClick={stopRecording}
                    className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 shadow-lg"
                  >
                    <Square className="h-5 w-5 text-red-500" />
                  </button>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      Recording
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {timer}
                    </span>
                  </div>
                </div>
                {graphData.nodes.length === 0 && (
                  <div className="text-center text-zinc-400 dark:text-zinc-500 mt-20">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-zinc-400 dark:text-zinc-500"
                      >
                        <path d="M12 2a10 10 0 1 0 10 10H12V2Z"></path>
                        <path d="M12 12 2.1 2.1"></path>
                      </svg>
                    </div>
                    <p className="text-sm">Mind map will appear here</p>
                    <p className="text-xs mt-1">
                      Processing your meeting in real-time
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right side - Transcription Area (25%) */}
          {(isRecording || graphData.nodes.length > 0) && (
            <div className="flex-1 ml-6 min-h-0 bg-white dark:bg-zinc-800 rounded-lg shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 flex flex-col">
              <div className="p-4 bg-indigo-500 text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mic className="h-4 w-4" />
                  <span className="text-sm font-medium">Live Transcript</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-xs">Live</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {transcript.length > 0 ? (
                  transcript.map((line, index) => (
                    <div
                      key={index}
                      className="bg-white/50 dark:bg-zinc-700/30 p-3 rounded-lg"
                    >
                      <p className="text-sm text-zinc-800 dark:text-zinc-200">
                        {line}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        {Math.floor(index * 2.5)}:
                        {(index * 15).toString().padStart(2, "0")}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center text-zinc-400 dark:text-zinc-500">
                    <p className="text-sm">Transcription will appear here</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
