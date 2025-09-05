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

export function VideoTestimonialsBlock({ block }: VideoTestimonialsBlockProps) {
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
    <section className="pt-[80px] pb-[0px] md:pb-[95px]">
      <div className="mx-auto p">
        {/* Title */}
        {block.title && (
          <div className="text-center md:mb-[48px] mb-[26px]">
            <h2 className="md:text-[2.5rem] text-[1.5rem] text-black-main font-baikal-light">{block.title}</h2>
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
          <CarouselContent className="max-h-[570px] w-[100vw]">
            {[...block.videos, ...block.videos, ...block.videos].map(
              (video, index) => (
                <CarouselItem
                  key={index}
                  className={clsx(
                    "rounded-[8px] border-[#2222221] box-border border mr-[20px] md:mr-[69px] w-[85vw] md:w-[784px] h-[570px] max-w-[85vw] md:max-w-[784px] max-h-[570px] flex-shrink-0 overflow-hidden relative transition-opacity duration-300 group",
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
                  <div className="w-full h-full flex flex-col items-start justify-between ">
                    <div className="relative w-full h-[449px] ">
                      <AdvancedVideo
                        video={video.video}
                        autoPlay
                        className="w-full h-full object-cover"
                        controls={false}
                      />
                      {/* Play button overlay - only visible on active slide hover */}
                      {index === currentSlide && (
                        <div
                          className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
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
                    <div className="flex-col md:flex-row flex h-full max-h-full md:h-[165px] bg-gray-main w-full min-w-fit px-[23px] md:px-[31px] pb-[24px] md:rounded-[4px] ">
                      <div className="flex flex-col min-w-[260px] md:mt-[19px] mt-[14px]">
                        <span className="text-center md:text-left font-baikal-extracondensed-bold text-blackMain md:text-[2rem] text-[1.5rem]">
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

                    <span className="absolute md:max-w-full max-w-[105px] md:top-[30px] top-[18px] md:left-[33px] left-[13.5px] font-baikal-extracondensed-bold text-white-main text-[1.25rem]">
                      {video?.institution?.toUpperCase()}
                    </span>
                  </div>
                </CarouselItem>
              )
            )}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Full-screen video dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[90vw] max-h-[100vh] p-0 bg-black [&>button]:hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-90 data-[state=open]:zoom-in-105 data-[state=closed]:slide-out-to-center-4 data-[state=open]:slide-in-from-center-4 duration-500 ease-out">
          <DialogTitle className="sr-only">Video Player</DialogTitle>
          {selectedVideo && (
            <div className="relative w-full h-full animate-in fade-in-0 zoom-in-105 duration-500 ease-out">
              <AdvancedVideo
                video={selectedVideo.video}
                autoPlay
                muted={false}
                className="w-full h-full object-contain"
                controls={true}
              />
            </div>
          )}

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 animate-in fade-in-0 slide-in-from-top-2 duration-500 delay-200"
              >
                ✕
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
