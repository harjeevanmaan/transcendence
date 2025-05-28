import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
}

const HeroSection = ({
  headline = "Turn any meeting into an instant mind-map",
  subheadline = "Transcendence uses AI to automatically convert your meeting recordings into visual mind maps, helping you capture and organize key insights without the manual work.",
  ctaText = "Record a meeting",
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center bg-white dark:bg-zinc-900 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-zinc-900 dark:text-white tracking-tight">
              {headline}
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl">
              {subheadline}
            </p>
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Endorsements */}
            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Trusted by innovative teams at:
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-zinc-700 dark:text-zinc-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                    </svg>
                  </div>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    Acme Inc
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-zinc-700 dark:text-zinc-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    StackAI
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-zinc-700 dark:text-zinc-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                  </div>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    HappyTech
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px] h-[400px] rounded-xl bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-indigo-900/20 dark:via-zinc-800 dark:to-indigo-900/20 overflow-hidden flex items-center justify-center border border-indigo-100 dark:border-indigo-900/30 shadow-xl">
              {/* Premium Mockup */}
              <div className="w-full h-full p-6 flex items-center justify-center">
                <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-lg shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
                  <div className="p-4 bg-indigo-500 text-white flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-sm font-medium">
                      Transcendence Meeting
                    </div>
                    <div></div>
                  </div>
                  <div className="p-4 flex flex-col items-center justify-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-indigo-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                      </svg>
                    </div>
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
                      00:00:00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/20 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-indigo-100 dark:bg-indigo-900/20 rounded-full filter blur-3xl opacity-30 -z-10"></div>
    </section>
  );
};

export default HeroSection;
