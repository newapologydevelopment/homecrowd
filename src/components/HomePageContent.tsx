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
  const [smoothScrollEnabled] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [shouldShowSchedule, setShouldShowSchedule] = useState(true);
  const [logoVariant, setLogoVariant] = useState<'light' | 'dark'>('light');
  const [isLogoHidden, setIsLogoHidden] = useState(false);
  const [isLightZoneVisible, setIsLightZoneVisible] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

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

  // Hide Schedule button when CTA or Footer are in view
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const targets = Array.from(document.querySelectorAll('[data-hide-schedule="true"]')) as Element[];
    if (targets.length === 0) return;

    const io = new IntersectionObserver((entries) => {
      const anyVisible = entries.some((e) => e.isIntersecting);
      setShouldShowSchedule(!anyVisible);
    }, { root: null, threshold: 0.25 });

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [otherBlocks.length]);

  // Control logo variant: white over preloader and CTA; dark otherwise
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const lightEl = document.querySelector('[data-logo-variant="light"]') as HTMLElement | null;
    const hideLogoTargets = Array.from(document.querySelectorAll('[data-logo-hide="true"]')) as HTMLElement[];

    // Keep light variant longer by expanding bottom root margin
    const lightObserver = new IntersectionObserver(
      (entries) => {
        const isLightVisible = entries.some((e) => e.isIntersecting);
        setIsLightZoneVisible(isLightVisible);
      },
      { root: null, threshold: 0.05, rootMargin: '0px 0px -200px 0px' }
    );

    const ctaObserver = new IntersectionObserver(
      (entries) => {
        // Enable white logo variant if CTA is in viewport
        const anyVisible = entries.some((e) => e.isIntersecting);
        setIsCtaVisible(anyVisible);
      },
      // React immediately as soon as CTA enters viewport
      { root: null, threshold: 0, rootMargin: '0px' }
    );

    if (lightEl) lightObserver.observe(lightEl);
    hideLogoTargets.forEach((el) => ctaObserver.observe(el));

    return () => {
      lightObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, [otherBlocks.length, !!preloaderBlock]);

  // Derive actual logo variant from visibility flags
  useEffect(() => {
    setLogoVariant(isLightZoneVisible || isCtaVisible ? 'light' : 'dark');
  }, [isLightZoneVisible, isCtaVisible]);


  return (
    <main className="h-[100dvh] md:min-h-screen">
      {/* Preloader */}
      {preloaderBlock && (
        <div data-logo-variant="light">
          <BlockRenderer
            pageData={pageData}
            block={preloaderBlock}
            onPreloaderComplete={handlePreloaderComplete}
          />
        </div>
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
          <HomecrowdLogo canRender={canRender} variant={logoVariant} hidden={isLogoHidden} />
        </div>
        
        {shouldShowSchedule && (
          <div className="w-full flex justify-center fixed bottom-[20px] md:bottom-[35px] z-[9999]">
            <ScheduleButton
              canRender={canRender}
              title={pageData.scheduleButton?.title || ""}
              link={pageData.scheduleButton?.link || ""}
            />
          </div>
        )}

          
        <div className="md:h-[40px] h-[0px]"/>

        {/* Page Blocks */}
        <div className={smoothScrollEnabled ? "smooth-scroll-enabled" : ""}>
          {otherBlocks.map((block) => {
            const hideSchedule = block._type === 'ctaBlock' || block._type === 'footerBlock';
            const logoHide = block._type === 'ctaBlock';
            const variant = 'dark';
            return (
              <div
                key={block._key}
                data-hide-schedule={hideSchedule ? 'true' : 'false'}
                data-logo-variant={variant}
                data-logo-hide={logoHide ? 'true' : 'false'}
              >
                <BlockRenderer
                  pageData={pageData}
                  block={block}
                  isPreloaderComplete={isPreloaderComplete}
                />
              </div>
            )
          })}
        </div>
      </>
      {/* )} */}
    </main>
  );
}
