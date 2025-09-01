"use client";

import { useState, useEffect } from "react";
import { BlockRenderer } from "@/components/BlockRenderer";
import { StickyNavigation } from "@/components/navigation/StickyNavigation";
import { PageData } from "@/types";

interface HomePageContentProps {
  pageData: PageData;
}

export function HomePageContent({ pageData }: HomePageContentProps) {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [smoothScrollEnabled, setSmoothScrollEnabled] = useState(false);

  // Enable smooth scroll after preloader
  useEffect(() => {
    if (isPreloaderComplete) {
      const timer = setTimeout(() => {
        setSmoothScrollEnabled(true);
        // Initialize Lenis smooth scroll (when available)
        if (typeof window !== "undefined") {
          document.documentElement.style.scrollBehavior = "smooth";
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isPreloaderComplete]);

  const handlePreloaderComplete = () => {
    setIsPreloaderComplete(true);
  };

  // Find preloader block
  const preloaderBlock = pageData.blocks.find(
    (block) => block._type === "preloader"
  );
  const otherBlocks = pageData.blocks.filter(
    (block) => block._type !== "preloader"
  );

  // Extract navigation data from page data
  const navigationData = {
    logo: pageData.logo || null,
    ctaButton: {
      text: "Get Started",
      url: "/contact",
    },
  };

  console.log("isPreloaderComplete", isPreloaderComplete);

  return (
    <main className="min-h-screen">
      {/* Preloader */}
      {!isPreloaderComplete && preloaderBlock && (
        <BlockRenderer
          block={preloaderBlock}
          onPreloaderComplete={handlePreloaderComplete}
        />
      )}

      {/* Main Content */}
      {/* {isPreloaderComplete && ( */}
        <>
          {/* Sticky Navigation */}
          <StickyNavigation
            logo={navigationData.logo}
            ctaButton={navigationData.ctaButton}
          />

          {/* Page Blocks */}
          <div className={smoothScrollEnabled ? "smooth-scroll-enabled" : ""}>
            {otherBlocks.map((block) => (
              <BlockRenderer
                key={block._key}
                block={block}
                isPreloaderComplete={isPreloaderComplete}
              />
            ))}
          </div>
        </>
      {/* )} */}
    </main>
  );
}
