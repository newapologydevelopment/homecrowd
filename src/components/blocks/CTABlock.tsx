"use client";

import { Button } from "@/components/ui/button";
import {
  CTABlock as CTABlockType,
  MediaUnion,
  PageData,
  SanityImage,
  SanityVideo,
} from "@/types";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import AdvancedVideo from "../ui/AdvancedVideo";
import { ScheduleButton } from "../ui/ScheduleButton";

interface CTABlockProps {
  block: CTABlockType;
  pageData: PageData;
}

interface BackgroundMediaProps {
  media: MediaUnion;
}

function BackgroundMedia({ media }: BackgroundMediaProps) {
  //@ts-ignore
  if (media.mediaType === "image") {
    return (
      <Image
        src={urlFor(media as SanityImage).url()}
        alt={(media as SanityImage).alt || "Background"}
        fill
        className="object-cover"
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
    );
  }

  //@ts-ignore

  if (media.mediaType === "video") {
    return (
      <AdvancedVideo
        //@ts-ignore
        video={media?.video}
        autoPlay={true}
        controls={false}
        muted={true}
        className="w-full h-full object-cover"
        preload="auto"
      />
    );
  }

  return null;
}

export function CTABlock({ pageData, block }: CTABlockProps) {
  return (
    <section className="h-[100vh] w-[100vw] relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background Media */}
      {block.backgroundMedia && (
        <div className="absolute inset-0 z-0 w-[105vw] -left-[2.5vw]">
          <BackgroundMedia media={block.backgroundMedia} />
        </div>
      )}
      <div className="z-10 flex flex-col items-center justify-center">
        <span className="mt-[120px] text-white text-[5rem] font-baikal-extracondensed-bold max-w-[810px] text-center leading-[0.95] mb-[17px]">
          {block.title}
        </span>
        <span className="text-white text-[1rem] font-baikal-light w-[520px] min-w-[520px] text-center mb-[51px]">
          {block.description}
        </span>
        <div className="relative">
          <input
            style={{ width: "520px" }}
            className="placeholder:text-[##838383] placeholder:font-baikal-condensed text-[0.8rem] text-black-main h-[54px] max-w-[520px] pl-[22px] pr-[150px] rounded-[4px]"
            type="text"
            placeholder={"What’s your work email?"}
          />
          <ScheduleButton
            className="absolute right-[6.5px] top-[6.5px]"
            classNameButton="!text-black-main !h-[41px]"
            title={pageData.scheduleButton?.title || ""}
            link={pageData.scheduleButton?.link || ""}
            canRender={true}
          />
        </div>
      </div>
    </section>
  );
}
