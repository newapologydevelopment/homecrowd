'use client';

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PreloaderBlock as PreloaderBlockType } from '@/types'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface PreloaderBlockProps {
  block: PreloaderBlockType
  onComplete: () => void
}

export function PreloaderBlock({ block, onComplete }: PreloaderBlockProps) {
  const [isLoading, setIsLoading] = useState(true)
  const maskRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  console.log("block preloader", block);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(maskRef.current, {
      scale: 100,
      duration: 1,
      ease: 'power2.inOut',
      delay: 3,
    }).to(maskRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    }, '-=0.5').to([titleRef.current, subtitleRef.current], {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.5,
      ease: 'power2.out'
    }, '-=0.3')
  })

  const bg = block.backgroundMedia;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative inset-0 z-50 w-screen h-screen"
        >
          <div className="absolute inset-0 w-screen h-screen">
            {bg?.mediaType === 'image' && bg.image && (
              <Image
                src={urlFor(bg.image).url()}
                alt={bg.image.alt || 'Background'}
                fill
                className="object-cover"
                priority
                sizes="100vw"
                style={{ objectFit: 'cover' }}
              />
            )}
            {bg?.mediaType === 'video' && bg.video && (
              <video
                className="w-screen h-screen object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={bg.video.asset.url ?? ''} type="video/mp4" />
              </video>
            )}
          </div>
          {/* LOGO MASK!!! */}
          <div className="absolute inset-0 z-10 pointer-events-none" ref={maskRef}>
            <svg className="w-full h-full">
              <defs>

                <symbol id="hc-logo" viewBox="0 0 143 96">
                  <path
                    d="M98.5577 38.6066L102.583 19.9044H58.1431L62.4182 0H12.3307L0 57.3934H46.6026L42.3247 77.2978H90.0018L85.9853 96H130.672L143 38.6066H98.5577ZM30.9377 54.015L34.9257 35.4478H24.5932L20.6024 54.015H4.21257L15.0908 3.3784H31.4806L27.4926 21.9089H37.8279L41.8159 3.3784H58.2057L47.3275 54.015H30.9377ZM65.6359 74.2825C57.2051 74.2825 51.1961 71.9993 47.9358 67.3624L56.4149 27.9394C60.9288 24.4849 66.8241 23.1336 74.1918 23.1336C87.8813 23.1336 96.2552 29.0007 93.9983 43.1168H77.5033C78.3049 37.2834 76.8865 35.5239 72.9156 35.5239C68.2937 35.5239 65.7809 38.2857 63.9219 46.8781L63.1942 50.158C61.3751 58.4069 62.5035 61.8923 67.4921 61.8923C71.2044 61.8923 73.4272 59.8202 75.0645 54.091H91.5595C87.8813 68.207 79.3254 74.2825 65.6359 74.2825ZM105.118 86.3519C105.118 87.219 104.956 88.0242 104.632 88.7674C104.308 89.5107 103.865 90.161 103.299 90.7128C102.742 91.2674 102.08 91.701 101.315 92.0135C100.55 92.3288 99.7259 92.4837 98.8448 92.4837C97.9636 92.4837 97.1478 92.3288 96.3832 92.0135C95.6242 91.6925 94.9591 91.259 94.3877 90.7128C93.8221 90.161 93.3786 89.5107 93.0546 88.7674C92.7362 88.0242 92.5799 87.219 92.5799 86.3519V86.3321C92.5799 85.4707 92.7362 84.6683 93.0546 83.925C93.3786 83.1818 93.8221 82.5315 94.3877 81.9796C94.9591 81.4278 95.6242 80.9915 96.3832 80.679C97.1478 80.358 97.9721 80.1975 98.8533 80.1975C99.7345 80.1975 100.547 80.358 101.304 80.679C102.068 80.9915 102.733 81.4278 103.299 81.9796C103.865 82.5315 104.308 83.1818 104.632 83.925C104.956 84.6683 105.118 85.4707 105.118 86.3321В86.3519ZM103.444 84.3755C103.197 83.7674 102.847 83.2353 102.401 82.7792C101.96 82.3203 101.434 81.9628 100.829 81.7037C100.223 81.4447 99.5611 81.3124 98.8448 81.3124C98.1284 81.3124 97.4747 81.4447 96.8692 81.7037C96.2638 81.9628 95.7351 82.3203 95.2888 82.7792C94.8454 83.2353 94.5014 83.7674 94.2541 84.3755C94.0068 84.9836 93.8818 85.6339 93.8818 86.3321В86.3519C93.8818 87.0557 94.0068 87.7088 94.2541 88.317C94.5014 88.9251 94.8454 89.4544 95.2888 89.9048C95.7351 90.3553 96.2638 90.7128 96.8692 90.9803C97.4747 91.2393 98.1341 91.3688 98.8448 91.3688C99.5554 91.3688 100.223 91.2393 100.829 90.9803C101.434 90.7128 101.96 90.3553 102.401 89.9048C102.847 89.4544 103.197 88.9251 103.444 88.317C103.691 87.7088 103.816 87.0557 103.816 86.3519В86.3321C103.816 85.6339 103.691 84.9836 103.444 84.3755ZM100.022 89.505L98.4411 87.0782H97.9124В89.505H96.3007В83.0438H98.9585C99.3848 83.0438 99.7572 83.0917 100.076 83.1874C100.397 83.2831 100.664 83.4211 100.871 83.5985C101.076 83.7674 101.23 83.9757 101.326 84.2206C101.429 84.4684 101.48 84.7415 101.48 85.0399В85.0624C101.48 85.2877 101.451 85.4988 101.397 85.6959C101.343 85.8873 101.258 86.0619 101.15 86.2195C101.039 86.3744 100.897 86.5123 100.726 86.6278C100.559 86.7432 100.368 86.8389 100.147 86.9149L101.923 89.505H100.022ZM99.7856 85.0624В85.0709C99.7856 85.1863 99.7629 85.2933 99.7231 85.389C99.689 85.4763 99.6293 85.5551 99.5469 85.6255C99.4644 85.6931 99.3564 85.7437 99.2256 85.7775C99.0949 85.8113 98.9471 85.8282 98.7822 85.8282H97.9124В84.3558H98.7822C98.9613 84.3558 99.112 84.3755 99.237 84.4149C99.3621 84.4515 99.4644 84.5022 99.5469 84.5698C99.6293 84.6317 99.689 84.7077 99.7231 84.795C99.7629 84.8766 99.7856 84.9667 99.7856 85.0624Z"
                    fill="black"
                  />
                </symbol>

                <mask id="hole-mask">
                  {/* WHITE BG */}
                  <rect width="100%" height="100%" fill="white" />
                  {/* black logo centered, fixed size 143×96 */}
                  <use
                    href="#hc-logo"
                    x="50%"
                    y="50%"
                    width="143"
                    height="96"
                    transform="translate(-71.5 -48)"
                    fill="black"
                  />
                </mask>
              </defs>

              {/* layer that covers everything but with a "hole" */}
              <rect width="100%" height="100%" fill="white" mask="url(#hole-mask)" />
            </svg>
          </div>

          {/* Title and Subtitle - centered */}
          <div className="absolute inset-0 z-20 max-w-[1126px] mx-auto flex flex-col items-center justify-center pointer-events-none">
            <p
              ref={titleRef}
              className="text-text-light text-center text-[140px] font-baikal-extracondensed-bold leading-[87%] tracking-[0] mb-[28px] opacity-0 transform translate-y-8"
            >
              {block.preloader_title}
            </p>
            <p
              ref={subtitleRef}
              className="text-text-light text-[20px] font-baikal-light opacity-0 transform translate-y-8 max-w-[743px] text-center"
            >
              {block.preloader_subtitle}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}