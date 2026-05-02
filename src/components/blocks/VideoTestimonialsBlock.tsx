"use client";

import { VideoTestimonialsBlock as VideoTestimonialsBlockType } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import AdvancedVideo from "../ui/AdvancedVideo";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface VideoTestimonialsBlockProps {
  block: VideoTestimonialsBlockType;
}

const FALLBACK_IDS = [
  'cLbG6RpaDcNDue2CiqvyD3K5sCgEL0079WVs3TkJ8gec',
  'JkiNPQT01KtYZl7xUU6E7qh2r0102u2jL028NEOqirHWNE8',
];

export function VideoTestimonialsBlock({ block }: VideoTestimonialsBlockProps) {
  const videos = block.videos.map((v, i) => ({
    ...v,
    muxPlaybackId: v.muxPlaybackId || FALLBACK_IDS[i] || '',
  }));

  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
    setIsDialogOpen(true);
  };

  return (
    <section className="pt-[57px] md:pt-[80px] pb-[0px] md:pb-[95px]">
      <div className="mx-auto p">
        {/* Title */}
        {block.title && (
          <div className="text-center md:mb-[48px] mb-[26px]">
            <h2 className="md:text-[2.5rem] text-[1.25rem] text-black-main font-baikal-light">
              {block.title}
            </h2>
          </div>
        )}

        <Carousel
          opts={{
            align: "center",
            loop: true,
            startIndex: 1,
            dragFree: false,
            skipSnaps: false,
            inViewThreshold: 0.5,
            containScroll: "trimSnaps",
          }}
          orientation="horizontal"
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent className="md:max-h-[570px] max w-[100vw]">
            {[...videos, ...videos, ...videos].map(
              (video, index) => (
                <CarouselItem
                  key={index}
                  className={clsx(
                    "rounded-[4px] md:rounded-[8px] mr-[20px] md:mr-[69px] w-[85vw] md:w-[784px] max-w-[85vw] md:max-w-[784px] max flex-shrink-0 overflow-hidden relative transition-opacity duration-300 group",
                    index === currentSlide
                      ? "opacity-100"
                      : "opacity-50 cursor-pointer"
                  )}
                  onClick={() => {
                    if (api && index !== currentSlide) {
                      api.scrollTo(index);
                    }
                  }}
                >
                  <div className="relative w-full md:h-[449px] h-[333px] ">
                    <AdvancedVideo
                      muxPlaybackId={video.muxPlaybackId}
                      autoPlay
                      className="w-full h-full object-cover"
                      controls={false}
                    />
                    {/* Play button overlay - only visible on active slide hover */}
                    {index === currentSlide && (
                      <div
                        className="absolute inset-0 bg-transparent bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoClick(video);
                        }}
                      >
                        <div className="flex rounded-[13px]  items-center justify-center hover:scale-110 transition-transform duration-200">
                          <div className="w-0 h-0 opacity-75 hover:opacity-85 border-l-[50px] border-l-white border-t-[30px] border-t-transparent border-b-[30px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-col md:flex-row flex md:h-[165px] bg-gray-main w-full min-w-fit px-[23px] md:px-[31px] pb-[24px] md:rounded-b-[8px] rounded-b-[4px] overflow-hidden border-b border-[#222222]/[0.08]">
                    <div className="flex flex-col min-w-[260px] md:mt-[19px] mt-[14px]">
                      <span className="text-center md:text-left font-baikal-extracondensed-bold text-blackMain md:text-[2rem] text-[1.5rem] ">
                        {video.authorName}
                      </span>
                      <span className="text-center md:text-left font-baikal-condensed text-blackMain text-[0.8rem]">
                        {video.authorRole?.toLocaleUpperCase()}
                      </span>
                    </div>
                    <div className=" md:max-w-[400px] max-w-full max-h-[121px] md:max-h-full mt-[26px] flex md:block leading-[1.2]">
                      <span className="text-center md:text-left font-baikal-light md:text-[1rem] text-[0.8rem] leading-[1.2]">
                        {video.testimonialText}
                      </span>
                    </div>
                  </div>

                  <span className="absolute md:max-w-full max-w-[150px] md:top-[20px] top-[14px] md:left-[33px] left-[13.5px] font-baikal-extracondensed-bold text-white-main text-[1.25rem] leading-[100%]">
                    {video?.institution?.toUpperCase()}
                  </span>
                </CarouselItem>
              )
            )}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Full-screen video dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-fit h-fit p-0 bg-transparent flex items-center justify-center [&>button]:hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-90 data-[state=open]:zoom-in-105 data-[state=closed]:slide-out-to-center-4 data-[state=open]:slide-in-from-center-4 duration-500 ease-out focus:outline-none focus:ring-0 focus:border-0">
          <DialogTitle className="sr-only">Video Player</DialogTitle>
          {selectedVideo && (
            <div className="relative animate-in fade-in-0 zoom-in-105 duration-500 ease-out flex items-center justify-center">
              <AdvancedVideo
                muxPlaybackId={selectedVideo.muxPlaybackId}
                autoPlay={false}
                muted={false}
                className="md:rounded-[8px] rounded-[4px] object-contain md:max-w-[70vw] max-w-[100vw] max-h-[82vh]"
                controls={true}
              />
              <DialogFooter style={{ height: 0, width: "100%" }}>
                <DialogClose asChild>
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 animate-in fade-in-0 slide-in-from-top-2 delay-200 z-10 focus:outline-none focus:ring-0 focus:border-0"
                  >
                    ✕
                  </button>
                </DialogClose>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}