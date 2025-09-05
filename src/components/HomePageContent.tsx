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

  // Control logo variant (white over preloader a bit longer; black otherwise) and hide over CTA
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const lightEl = document.querySelector('[data-logo-variant="light"]') as HTMLElement | null;
    const hideLogoTargets = Array.from(document.querySelectorAll('[data-logo-hide="true"]')) as HTMLElement[];

    // Keep light variant longer by expanding bottom root margin
    const lightObserver = new IntersectionObserver(
      (entries) => {
        const isLightVisible = entries.some((e) => e.isIntersecting);
        setLogoVariant(isLightVisible ? 'light' : 'dark');
      },
      { root: null, threshold: 0.05, rootMargin: '0px 0px -200px 0px' }
    );

    const hideObserver = new IntersectionObserver(
      (entries) => {
        // Ховаємо лого, якщо будь-яка ціль видима хоча б на 1px
        const anyHide = entries.some((e) => e.isIntersecting);
        setIsLogoHidden(anyHide);
      },
      // Ховати лого, як тільки CTA входить у вʼюпорт (без затримки)
      { root: null, threshold: 0, rootMargin: '0px' }
    );

    if (lightEl) lightObserver.observe(lightEl);
    hideLogoTargets.forEach((el) => hideObserver.observe(el));

    return () => {
      lightObserver.disconnect();
      hideObserver.disconnect();
    };
  }, [otherBlocks.length, !!preloaderBlock]);


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

          
        <div className="h-[40px]"/>

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
