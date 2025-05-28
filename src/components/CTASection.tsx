"use client"; // ← must be first line

import React from "react";
import { Button } from "./ui/button";

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const CTASection = ({
  title = "Ready to transform your meetings?",
  description = "Start turning your conversations into actionable mind maps today.",
  buttonText = "Try a sample meeting",
  onButtonClick = () => {},
}: CTASectionProps) => {
  return (
    <section className="w-full bg-zinc-900 py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 md:p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {title}
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-lg">
                {description}
              </p>
              <div>
                <Button
                  onClick={onButtonClick}
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-white/90 hover:text-indigo-700 font-medium px-8 py-6 h-auto text-lg shadow-lg"
                >
                  {buttonText}
                </Button>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-0"></div>
              <div className="relative z-10 w-full max-w-sm">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-2xl">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
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
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        Premium Plan
                      </h3>
                      <p className="text-white/70 text-sm">
                        Unlimited meetings
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-white/90">
                        Unlimited recordings
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-white/90">Advanced mind maps</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-400 mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-white/90">Team collaboration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
