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
    <section className="py-[80px]">
      <div className="mx-auto p">
        {/* Title */}
        {block.title && (
          <div className="text-center font-baikal-book mb-[48px]">
            <h2 className="text-[2.5rem]">{block.title}</h2>
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
                    "mr-[69px] bg-slate-300 w-[784px] h-[570px] max-w-[784px] max-h-[570px] flex-shrink-0 overflow-hidden relative transition-opacity duration-300 group",
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
                  <div className="w-full h-full flex flex-col items-start justify-between">
                    <div className="relative w-full h-[449px]">
                      <AdvancedVideo
                        video={video.video}
                        autoPlay
                        className="w-full h-full object-cover"
                        controls={false}
                      />
                      {/* Play button overlay - only visible on active slide hover */}
                      {index === currentSlide && (
                        <div
                          className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVideoClick(video);
                          }}
                        >
                          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                            <div className="w-0 h-0 border-l-[18px] border-l-black border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex h-[121px] bg-gray-main w-full min-w-fit px-[31px] py-[26px]">
                      <div className="flex flex-col min-w-[291px]">
                        <span className="font-baikal-extracondensed-bold text-blackMain text-[1.25rem]">
                          {video.authorName}
                        </span>
                        <span className="font-baikal-condensed text-blackMain text-[0.8rem]">
                          {video.authorRole?.toLocaleUpperCase()}
                        </span>
                      </div>
                      <div className="max-h-[121px]">
                        <span className="font-baikal-book text-[1rem] leading-[1.2]">
                          {video.testimonialText}
                        </span>
                      </div>
                    </div>

                    <span className="absolute top-[30px] left-[33px] font-baikal-extracondensed-bold text-white-main text-[1.25rem]">
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
        <DialogContent className="max-w-[90vw] max-h-[100vh] p-0 bg-black [&>button]:hidden">
          {selectedVideo && (
            <div className="relative w-full h-full">
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
                className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full flex items-center justify-center text-white transition-colors duration-200"
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
