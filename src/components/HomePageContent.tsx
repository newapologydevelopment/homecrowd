"use client";

import { useState, useEffect } from "react";
import { BlockRenderer } from "@/components/BlockRenderer";
// import { StickyNavigation } from "@/components/navigation/StickyNavigation";
import { PageData } from "@/types";
import { ScheduleButton } from "./ui/ScheduleButton";
import { HomecrowdLogo } from "./ui/HomecrowdLogo";
import { LenisProvider } from "./providers/LenisProvider";
import { StackedCards } from "./ui/StackedCard";

interface HomePageContentProps {
  pageData: PageData;
}

export function HomePageContent({ pageData }: HomePageContentProps) {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [smoothScrollEnabled, setSmoothScrollEnabled] = useState(false);
  const [canRender, setCanRender] = useState(false);

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
    (block) => block._type === "preloaderBlock"
  );

  const otherBlocks = pageData.blocks.filter(
    (block) => block._type !== "preloaderBlock"
  );

  // Extract navigation data from page data
  const navigationData = {
    logo: pageData.logo || null,
    ctaButton: {
      text: "Get Started",
      link: "/contact",
    },
  };

  useEffect(() => {
    setTimeout(() => { setCanRender(true) }, 4000)
  }, [])

  console.log("isPreloaderComplete", isPreloaderComplete);

  return (
    <main className="min-h-screen">
      {/* Preloader */}
      {preloaderBlock && (
        <BlockRenderer
          pageData={pageData}
          block={preloaderBlock}
          onPreloaderComplete={handlePreloaderComplete}
        />
      )}

      {/* {isPreloaderComplete && <LenisProvider />} */}

      {/* Main Content */}
      {/* {isPreloaderComplete && ( */}
      <>
        {/* Sticky Navigation */}
        {/* <StickyNavigation
          logo={navigationData.logo}
          ctaButton={navigationData.ctaButton}
        /> */}
        <div className="w-full flex justify-center fixed top-[28px] z-[9999]">
          <HomecrowdLogo canRender={canRender} />
        </div>
        
        <div className="w-full flex justify-center fixed bottom-[115px] z-[9999]">
          <ScheduleButton
            canRender={canRender}
            title={pageData.scheduleButton?.title || ""}
            link={pageData.scheduleButton?.link || ""}
          />
        </div>


        {/* Page Blocks */}
        <div className={smoothScrollEnabled ? "smooth-scroll-enabled" : ""}>
          {otherBlocks.map((block) => (
            <BlockRenderer
              pageData={pageData}
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
