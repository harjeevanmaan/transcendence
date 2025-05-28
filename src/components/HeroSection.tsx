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
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px] h-[400px] rounded-xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-lg">
              {/* Placeholder for animated GIF/video */}
              <div className="text-zinc-400 dark:text-zinc-500 text-center px-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-16 h-16 mx-auto mb-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <p className="text-lg font-medium">Mind Map Animation</p>
                <p className="mt-2">
                  Visualize how your meetings transform into organized mind maps
                </p>
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
