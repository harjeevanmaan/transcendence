import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface AppCanvasMockupProps {
  transcriptText?: string;
}

export default function AppCanvasMockup({
  transcriptText = "[00:00:01] John: I think we should focus on the new product launch.\n[00:00:10] Sarah: Agreed. The market research shows promising results.\n[00:00:18] John: Let's set a timeline for the next quarter.\n[00:00:25] Mike: We need to consider the budget implications.\n[00:00:32] Sarah: Marketing should be our priority.\n[00:00:40] John: What about the technical requirements?\n[00:00:48] Mike: The development team needs at least 6 weeks.\n[00:00:55] Sarah: We should also plan for a beta testing phase.\n[00:01:03] John: Good point. Let's allocate 2 weeks for that.",
}: AppCanvasMockupProps) {
  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-12 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-8 text-center">
          See Transcendence in Action
        </h2>

        <Card className="w-full overflow-hidden border-0 rounded-xl shadow-2xl bg-white dark:bg-zinc-900">
          <div className="flex flex-col md:flex-row h-[600px]">
            {/* Transcript Sidebar - Hidden on mobile */}
            <div className="hidden md:block md:w-1/5 border-r border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-800 dark:to-zinc-900">
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 backdrop-blur-sm">
                <h3 className="font-semibold text-zinc-900 dark:text-white flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
                  Live transcript
                </h3>
              </div>
              <div className="p-4 h-[calc(100%-57px)] overflow-y-auto">
                <pre className="font-mono text-xs text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                  {transcriptText}
                </pre>
              </div>
            </div>

            {/* Mind Map Preview */}
            <div className="flex-1 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-800/50 dark:to-zinc-900 p-4">
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
                <h3 className="font-semibold text-zinc-900 dark:text-white flex items-center">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full animate-pulse mr-2"></span>
                  Mind-map preview
                </h3>
                <div className="flex space-x-2">
                  <span className="text-xs px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full font-medium shadow-sm">
                    Processing...
                  </span>
                </div>
              </div>

              <div className="h-[calc(100%-57px)] flex items-center justify-center p-8">
                <div className="w-full h-full rounded-xl flex flex-col items-center justify-center p-6 bg-white/40 dark:bg-zinc-800/20 backdrop-blur-sm shadow-lg">
                  {/* Premium SVG for mind map */}
                  <svg
                    className="w-full h-full max-w-2xl mx-auto"
                    viewBox="0 0 800 500"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Subtle Grid Background */}
                    <pattern
                      id="grid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="rgba(99, 102, 241, 0.1)"
                        strokeWidth="0.5"
                      />
                    </pattern>
                    <rect width="800" height="500" fill="url(#grid)" />

                    {/* Glowing Central Node */}
                    <circle
                      cx="400"
                      cy="250"
                      r="65"
                      fill="url(#centralGradient)"
                      filter="drop-shadow(0px 4px 8px rgba(99, 102, 241, 0.5))"
                    />
                    <defs>
                      <radialGradient
                        id="centralGradient"
                        cx="0.5"
                        cy="0.5"
                        r="0.5"
                        fx="0.5"
                        fy="0.5"
                      >
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </radialGradient>
                    </defs>
                    <text
                      x="400"
                      y="250"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="16"
                      fontWeight="600"
                      filter="drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3))"
                    >
                      Product Launch
                    </text>

                    {/* Premium Connection Lines with Gradients */}
                    <defs>
                      <linearGradient
                        id="lineGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#a5b4fc"
                          stopOpacity="0.7"
                        />
                        <stop
                          offset="100%"
                          stopColor="#6366f1"
                          stopOpacity="0.7"
                        />
                      </linearGradient>
                    </defs>

                    {/* Curved Connection Lines */}
                    <path
                      d="M 400 185 C 400 150, 400 150, 400 120"
                      stroke="url(#lineGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      filter="drop-shadow(0px 1px 2px rgba(99, 102, 241, 0.3))"
                    />
                    <path
                      d="M 400 315 C 400 350, 400 350, 400 380"
                      stroke="url(#lineGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      filter="drop-shadow(0px 1px 2px rgba(99, 102, 241, 0.3))"
                    />
                    <path
                      d="M 335 250 C 300 250, 260 250, 220 250"
                      stroke="url(#lineGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      filter="drop-shadow(0px 1px 2px rgba(99, 102, 241, 0.3))"
                    />
                    <path
                      d="M 465 250 C 500 250, 540 250, 580 250"
                      stroke="url(#lineGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      filter="drop-shadow(0px 1px 2px rgba(99, 102, 241, 0.3))"
                    />

                    {/* Glossy Secondary Nodes */}
                    <defs>
                      <radialGradient
                        id="nodeGradient"
                        cx="0.5"
                        cy="0.5"
                        r="0.5"
                        fx="0.5"
                        fy="0.5"
                      >
                        <stop offset="0%" stopColor="#c7d2fe" />
                        <stop offset="100%" stopColor="#a5b4fc" />
                      </radialGradient>
                    </defs>

                    {/* Timeline Node */}
                    <circle
                      cx="400"
                      cy="100"
                      r="45"
                      fill="url(#nodeGradient)"
                      filter="drop-shadow(0px 4px 6px rgba(165, 180, 252, 0.5))"
                    />
                    <text
                      x="400"
                      y="100"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1F2937"
                      fontSize="14"
                      fontWeight="500"
                    >
                      Timeline: Q2
                    </text>

                    {/* Budget Node */}
                    <circle
                      cx="400"
                      cy="400"
                      r="45"
                      fill="url(#nodeGradient)"
                      filter="drop-shadow(0px 4px 6px rgba(165, 180, 252, 0.5))"
                    />
                    <text
                      x="400"
                      y="400"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1F2937"
                      fontSize="14"
                      fontWeight="500"
                    >
                      Budget
                    </text>

                    {/* Marketing Node */}
                    <circle
                      cx="200"
                      cy="250"
                      r="45"
                      fill="url(#nodeGradient)"
                      filter="drop-shadow(0px 4px 6px rgba(165, 180, 252, 0.5))"
                    />
                    <text
                      x="200"
                      y="250"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1F2937"
                      fontSize="14"
                      fontWeight="500"
                    >
                      Marketing
                    </text>

                    {/* Technical Node */}
                    <circle
                      cx="600"
                      cy="250"
                      r="45"
                      fill="url(#nodeGradient)"
                      filter="drop-shadow(0px 4px 6px rgba(165, 180, 252, 0.5))"
                    />
                    <text
                      x="600"
                      y="250"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1F2937"
                      fontSize="14"
                      fontWeight="500"
                    >
                      Technical
                    </text>

                    {/* Sub-connections with elegant curves */}
                    <path
                      d="M 600 295 C 600 320, 600 330, 600 350"
                      stroke="#a5b4fc"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="600"
                      cy="370"
                      r="22"
                      fill="#c7d2fe"
                      fillOpacity="0.9"
                      filter="drop-shadow(0px 2px 4px rgba(199, 210, 254, 0.5))"
                    />
                    <text
                      x="600"
                      y="370"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1F2937"
                      fontSize="11"
                      fontWeight="500"
                    >
                      6 weeks dev
                    </text>

                    <path
                      d="M 200 295 C 200 320, 200 330, 200 350"
                      stroke="#a5b4fc"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="200"
                      cy="370"
                      r="22"
                      fill="#c7d2fe"
                      fillOpacity="0.9"
                      filter="drop-shadow(0px 2px 4px rgba(199, 210, 254, 0.5))"
                    />
                    <text
                      x="200"
                      y="370"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1F2937"
                      fontSize="11"
                      fontWeight="500"
                    >
                      Priority
                    </text>

                    <path
                      d="M 445 100 C 470 100, 480 100, 500 100"
                      stroke="#a5b4fc"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="520"
                      cy="100"
                      r="22"
                      fill="#c7d2fe"
                      fillOpacity="0.9"
                      filter="drop-shadow(0px 2px 4px rgba(199, 210, 254, 0.5))"
                    />
                    <text
                      x="520"
                      y="100"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1F2937"
                      fontSize="11"
                      fontWeight="500"
                    >
                      Beta: 2 weeks
                    </text>
                  </svg>

                  <p className="text-zinc-500 dark:text-zinc-400 text-center mt-4 font-medium">
                    AI is generating your mind map based on the meeting
                    transcript
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center space-x-2 text-sm text-zinc-600 dark:text-zinc-400 bg-white/80 dark:bg-zinc-800/80 px-4 py-2 rounded-full shadow-sm">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>AI processing in real-time</span>
          </div>
        </div>
      </div>
    </div>
  );
}
