import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AppCanvasMockup from "@/components/AppCanvasMockup";
import CTASection from "@/components/CTASection";
import { Separator } from "@/components/ui/separator";
import {
  ArrowDownCircle,
  Upload,
  Map,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <Navbar />

      <main>
        <HeroSection />

        {/* Desired Outcome - Objection section */}
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-zinc-50 dark:bg-zinc-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-semibold mb-6 text-zinc-900 dark:text-white">
                  Stop losing valuable insights from your meetings
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8">
                  Most professionals capture less than 20% of important
                  information during meetings. Transcendence ensures you never
                  miss critical details again.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-zinc-900 dark:text-white">
                        Complete meeting capture
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Every word is transcribed with speaker identification
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-zinc-900 dark:text-white">
                        Instant visual summaries
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        AI-generated mind maps highlight key topics and
                        decisions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-zinc-900 dark:text-white">
                        Searchable knowledge base
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Find any meeting moment with powerful search
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700">
                <h3 className="text-xl font-semibold mb-6 text-zinc-900 dark:text-white">
                  "But I already take notes..."
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Manual note-taking divides your attention
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      You miss 50-80% of the conversation
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Notes lack structure and visual organization
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Time wasted organizing and sharing notes
                    </p>
                  </div>
                </div>
                <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                  <p className="text-indigo-700 dark:text-indigo-300 font-medium">
                    Transcendence handles all of this automatically, so you can
                    fully participate in your meetings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Value Proposition */}
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-white dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4 text-zinc-900 dark:text-white">
              Focus on the conversation, not on taking notes
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-16 max-w-3xl mx-auto">
              Our AI handles the hard work so you can be fully present in your
              meetings
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-zinc-50 dark:bg-zinc-800 p-8 rounded-xl shadow-lg">
                <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6 mx-auto">
                  <Clock className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
                  Hit record
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Simply press record at the start of your meeting and let our
                  AI do the rest
                </p>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800 p-8 rounded-xl shadow-lg">
                <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6 mx-auto">
                  <FileText className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
                  Notes and transcription taken for your meeting
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Our AI captures every word with speaker identification and
                  timestamps
                </p>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800 p-8 rounded-xl shadow-lg">
                <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6 mx-auto">
                  <Map className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
                  Accurate summary at the end provided
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Receive a beautiful mind map highlighting key topics,
                  decisions, and action items
                </p>
              </div>
            </div>

            {/* Credibility Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  98%
                </div>
                <p className="text-zinc-700 dark:text-zinc-300">
                  Transcription accuracy
                </p>
              </div>
              <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  3.2x
                </div>
                <p className="text-zinc-700 dark:text-zinc-300">
                  Faster meeting follow-ups
                </p>
              </div>
              <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  10k+
                </div>
                <p className="text-zinc-700 dark:text-zinc-300">
                  Meetings processed
                </p>
              </div>
              <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  87%
                </div>
                <p className="text-zinc-700 dark:text-zinc-300">
                  Time saved on notes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works section - Simplified */}
        <section className="py-16 px-4 md:px-8 lg:px-16 bg-zinc-50 dark:bg-zinc-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-12 text-zinc-900 dark:text-white">
              How it works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg">
                <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                  <ArrowDownCircle className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-zinc-100">
                  1. Record
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Press the record button when your meeting starts
                </p>
              </div>

              <div className="flex flex-col items-center text-center bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg">
                <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-zinc-100">
                  2. AI Processing
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Our AI transcribes and analyzes the conversation in real-time
                </p>
              </div>

              <div className="flex flex-col items-center text-center bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg">
                <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                  <Map className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-zinc-100">
                  3. Get Mind Map
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Receive your visual mind map as soon as the meeting ends
                </p>
              </div>
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

        {/* Testimonials */}
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-zinc-50 dark:bg-zinc-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-12 text-zinc-900 dark:text-white">
              What our users say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">
                      Sarah Johnson
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Product Manager
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400 inline-block"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                  "Transcendence has completely transformed our team meetings.
                  The mind maps make it so easy to follow up on action items and
                  decisions."
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">
                      Michael Chen
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Engineering Lead
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400 inline-block"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                  "I used to spend hours writing up meeting notes. Now I can
                  focus on the discussion and let Transcendence handle the
                  documentation. Game changer!"
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">
                      Emily Rodriguez
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Marketing Director
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400 inline-block"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                  "The visual mind maps have made our strategy meetings so much
                  more productive. Everyone leaves with the same understanding
                  of what was discussed."
                </p>
              </div>
            </div>
          </div>
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
