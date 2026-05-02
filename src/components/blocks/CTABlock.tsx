"use client";

import {
  CTABlock as CTABlockType,
  BackgroundMedia,
  PageData,
  isBGImage,
  isBGVideo,
} from "@/types";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import { SanityVideo } from "../ui/SanityVideo";
import { ScheduleButton } from "../ui/ScheduleButton";

interface CTABlockProps {
  block: CTABlockType;
  pageData: PageData;
}

interface BackgroundMediaProps {
  media: BackgroundMedia;
}

function BackgroundMediaRenderer({ media }: BackgroundMediaProps) {
  if (isBGImage(media)) {
    return (
      <Image
        src={urlFor(media.image).url()}
        alt={media.image.alt || "Background"}
        fill
        className="object-cover"
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
    );
  }

  if (isBGVideo(media)) {
    return (
      <SanityVideo
        video={media.video}
        autoPlay={true}
        controls={false}
        muted={true}
        loop={true}
        playsInline={true}
        className="w-full md:h-full h-[105%] object-cover overflow-hidden md:overflow-visible"
      />
    );
  }

  return null;
}

export function CTABlock({ pageData, block }: CTABlockProps) {
  return (
    <section
      className="h-[100vh] w-[100vw] relative overflow-hidden flex flex-col items-center justify-center"
      data-logo-hide="true"
    >
      {/* Background Media */}
      {block.backgroundMedia && (
        <div className="absolute inset-0 z-0 w-[105vw] -left-[2.5vw]">
          <BackgroundMediaRenderer media={block.backgroundMedia} />
        </div>
      )}
      <div className="z-10 flex flex-col items-center justify-center">
        <span className="md:mt-[120px] mt-[0px]  md:mb-[17px] mb-[15px] text-white md:text-[5rem] text-[2.5rem] font-baikal-extracondensed-bold md:max-w-[810px] max-w-[333px] text-center leading-[0.95] ">
          {block.title}
        </span>
        <span className="text-white md:text-[1rem] text-[0.8rem] font-baikal-light md:w-[520px] w-[333px] md:min-w-[520px] min-w-[333px] text-center md:mb-[51px] mb-[31px]">
          {block.description}
        </span>
        <div className="relative">
          <input
            style={{ width: "520px" }}
            className="placeholder:text-[#838383] placeholder:font-baikal-condensed text-[0.8rem] text-black-main h-[54px] md:max-w-[520px] max-w-[333px] pl-[22px] pr-[150px] rounded-[4px]"
            type="text"
            placeholder={"What's your work email?"}
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
