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

        <Card className="w-full overflow-hidden border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg bg-white dark:bg-zinc-900">
          <div className="flex flex-col md:flex-row h-[600px]">
            {/* Transcript Sidebar - Hidden on mobile */}
            <div className="hidden md:block md:w-1/5 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800">
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
                <h3 className="font-semibold text-zinc-900 dark:text-white">
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
            <div className="flex-1 bg-zinc-50 dark:bg-zinc-800/50 p-4">
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  Mind-map preview
                </h3>
                <div className="flex space-x-2">
                  <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                    Processing...
                  </span>
                </div>
              </div>

              <div className="h-[calc(100%-57px)] flex items-center justify-center p-8">
                <div className="w-full h-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl flex flex-col items-center justify-center p-6">
                  {/* Placeholder SVG for mind map */}
                  <svg
                    className="w-full h-full max-w-2xl mx-auto"
                    viewBox="0 0 800 500"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Central Node */}
                    <circle
                      cx="400"
                      cy="250"
                      r="60"
                      fill="#6366F1"
                      fillOpacity="0.8"
                    />
                    <text
                      x="400"
                      y="250"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="14"
                      fontWeight="500"
                    >
                      Product Launch
                    </text>

                    {/* Connection Lines */}
                    <line
                      x1="400"
                      y1="190"
                      x2="400"
                      y2="120"
                      stroke="#6366F1"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    <line
                      x1="400"
                      y1="310"
                      x2="400"
                      y2="380"
                      stroke="#6366F1"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    <line
                      x1="340"
                      y1="250"
                      x2="220"
                      y2="250"
                      stroke="#6366F1"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    <line
                      x1="460"
                      y1="250"
                      x2="580"
                      y2="250"
                      stroke="#6366F1"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />

                    {/* Timeline Node */}
                    <circle
                      cx="400"
                      cy="100"
                      r="40"
                      fill="#A5B4FC"
                      fillOpacity="0.7"
                    />
                    <text
                      x="400"
                      y="100"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1F2937"
                      fontSize="12"
                    >
                      Timeline: Q2
                    </text>

                    {/* Budget Node */}
                    <circle
                      cx="400"
                      cy="400"
                      r="40"
                      fill="#A5B4FC"
                      fillOpacity="0.7"
                    />
                    <text
                      x="400"
                      y="400"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1F2937"
                      fontSize="12"
                    >
                      Budget
                    </text>

                    {/* Marketing Node */}
                    <circle
                      cx="200"
                      cy="250"
                      r="40"
                      fill="#A5B4FC"
                      fillOpacity="0.7"
                    />
                    <text
                      x="200"
                      y="250"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1F2937"
                      fontSize="12"
                    >
                      Marketing
                    </text>

                    {/* Technical Node */}
                    <circle
                      cx="600"
                      cy="250"
                      r="40"
                      fill="#A5B4FC"
                      fillOpacity="0.7"
                    />
                    <text
                      x="600"
                      y="250"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1F2937"
                      fontSize="12"
                    >
                      Technical
                    </text>

                    {/* Sub-connections */}
                    <line
                      x1="600"
                      y1="290"
                      x2="600"
                      y2="350"
                      stroke="#A5B4FC"
                      strokeWidth="2"
                    />
                    <circle
                      cx="600"
                      cy="370"
                      r="20"
                      fill="#C7D2FE"
                      fillOpacity="0.7"
                    />
                    <text
                      x="600"
                      y="370"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1F2937"
                      fontSize="10"
                    >
                      6 weeks dev
                    </text>

                    <line
                      x1="200"
                      y1="290"
                      x2="200"
                      y2="350"
                      stroke="#A5B4FC"
                      strokeWidth="2"
                    />
                    <circle
                      cx="200"
                      cy="370"
                      r="20"
                      fill="#C7D2FE"
                      fillOpacity="0.7"
                    />
                    <text
                      x="200"
                      y="370"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1F2937"
                      fontSize="10"
                    >
                      Priority
                    </text>

                    <line
                      x1="440"
                      y1="100"
                      x2="500"
                      y2="100"
                      stroke="#A5B4FC"
                      strokeWidth="2"
                    />
                    <circle
                      cx="520"
                      cy="100"
                      r="20"
                      fill="#C7D2FE"
                      fillOpacity="0.7"
                    />
                    <text
                      x="520"
                      y="100"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1F2937"
                      fontSize="10"
                    >
                      Beta: 2 weeks
                    </text>
                  </svg>

                  <p className="text-zinc-500 dark:text-zinc-400 text-center mt-4">
                    AI is generating your mind map based on the meeting
                    transcript
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center space-x-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>AI processing in real-time</span>
          </div>
        </div>
      </div>
    </div>
  );
}
