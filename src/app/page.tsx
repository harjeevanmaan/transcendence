import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AppCanvasMockup from "@/components/AppCanvasMockup";
import CTASection from "@/components/CTASection";
import { Separator } from "@/components/ui/separator";
import { ArrowDownCircle, Upload, Map } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <Navbar />

      <main>
        <HeroSection />

        {/* How it works section */}
        <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12 text-zinc-900 dark:text-white">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                <ArrowDownCircle className="h-8 w-8 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-zinc-100">
                Record
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Simply record your meeting or upload an existing recording.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-zinc-100">
                Upload
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Our AI processes the audio and extracts key information.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                <Map className="h-8 w-8 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-zinc-100">
                Get Map
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Receive a visual mind map of your meeting in seconds.
              </p>
            </div>
          </div>
        </section>

        <Separator className="max-w-7xl mx-auto" />

        {/* App Canvas Mockup */}
        <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12 text-zinc-900 dark:text-white">
            See it in action
          </h2>
          <AppCanvasMockup />
        </section>

        <CTASection />
      </main>

      {/* Footer */}
      <footer className="bg-zinc-100 dark:bg-zinc-800 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              © {new Date().getFullYear()} Transcendence. All rights reserved.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 text-sm"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
