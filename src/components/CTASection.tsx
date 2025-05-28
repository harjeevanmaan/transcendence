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
    <section className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 py-16 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
          {title}
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <Button
          onClick={onButtonClick}
          size="lg"
          className="bg-white text-indigo-600 hover:bg-white/90 hover:text-indigo-700 font-medium px-8 py-6 h-auto text-lg"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
