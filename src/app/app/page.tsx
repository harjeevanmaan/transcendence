"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Square } from "lucide-react";
import Link from "next/link";

export default function AppPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState("00:00:00");
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null,
  );

  const startRecording = () => {
    setIsRecording(true);
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
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setTimer("00:00:00");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 flex flex-col">
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
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-lg shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
          <div className="p-8 flex flex-col items-center justify-center space-y-4">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800"
            >
              {isRecording ? (
                <Square className="h-10 w-10 text-red-500" />
              ) : (
                <Play className="h-10 w-10 text-indigo-500 ml-1" />
              )}
            </button>
            <span className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
              {isRecording ? "Recording..." : "Ready to Record"}
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {isRecording
                ? "Click to stop recording"
                : "Click to start your meeting"}
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
      </main>
    </div>
  );
}
