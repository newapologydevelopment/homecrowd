'use client'

import { useRef } from 'react'
import { PreloaderBlock as PreloaderBlockType } from '@/types'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface PreloaderBlockProps {
  block: PreloaderBlockType
  onComplete: () => void
}

const isSafari = () => {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  return /safari/i.test(ua) && !/chrome|chromium|crios|edg|opr/i.test(ua)
}

export function PreloaderBlock({ block, onComplete }: PreloaderBlockProps) {
  const maskRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const shouldRenderMask = true

  useGSAP(() => {
    const mm = gsap.matchMedia()
    const SAFARI = isSafari()
    const logo = '#logoUse'
    const baseLogoH = 98
    const getVH = () => (window.visualViewport?.height ?? window.innerHeight) || 0
    const targetScale = () => Math.max(0, getVH() - 20) / baseLogoH

    if (!shouldRenderMask) {
      document.body.style.height = 'auto'
      document.body.style.overflow = 'unset'
      gsap.fromTo([titleRef.current, subtitleRef.current], { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1, stagger: 0.5, ease: 'power2.out' })
      return () => mm.revert()
    }

    document.body.style.height = '100vh'
    document.body.style.overflow = 'hidden'

    const cleanupBody = () => {
      document.body.style.height = 'auto'
      document.body.style.overflow = 'unset'
    }

    const chromeDesktop = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.()
          cleanupBody()
        }
      })
      tl.to({}, { duration: 0.5 })
        .to(logo, { scale: targetScale, duration: 1.2, ease: 'expo.inOut' })
        .to({}, { duration: 0.5 })
        .to(maskRef.current, { scale: 100, duration: 1.2, ease: 'expo.inOut', transformOrigin: '50% 50%', force3D: true })
        .to(maskRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.5')
        .set(maskRef.current, { display: 'none' })
        .to([titleRef.current, subtitleRef.current], { opacity: 1, y: 0, duration: 1, stagger: 0.5, ease: 'power2.out' }, '-=0.3')

      const onResize = () => gsap.set(logo, { scale: targetScale() })
      window.addEventListener('resize', onResize, { passive: true })
      return () => window.removeEventListener('resize', onResize)
    }

    const safariDesktop = () => {
      gsap.set(maskRef.current, { transformOrigin: '50% 50%', force3D: true, willChange: 'transform' })
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.()
          cleanupBody()
        }
      })
      tl.to({}, { duration: 0.5 })
        .to(maskRef.current, { scale: 100, duration: 1.1, ease: 'expo.inOut' })
        .to(maskRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.5')
        .set(maskRef.current, { display: 'none' })
        .to([titleRef.current, subtitleRef.current], { opacity: 1, y: 0, duration: 1, stagger: 0.5, ease: 'power2.out' }, '-=0.3')
      return () => {}
    }

    const mobileSimple = () => {
      gsap.set(maskRef.current, { transformOrigin: '50% 50%', force3D: true, willChange: 'transform' })
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.()
          cleanupBody()
        }
      })
      tl.to({}, { duration: 0.5 })
        .to(maskRef.current, { scale: 2.5, duration: 1.2, ease: 'expo.inOut' })
        .to({}, { duration: 0.5 })
        .to(maskRef.current, { scale: 100, duration: 1.2, ease: 'expo.inOut' })
        .to(maskRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.5')
        .set(maskRef.current, { display: 'none' })
        .to([titleRef.current, subtitleRef.current], { opacity: 1, y: 0, duration: 1, stagger: 0.5, ease: 'power2.out' }, '-=0.3')
      return () => {}
    }

    const disposeFns: Array<() => void> = []

    mm.add('(min-width: 768px)', () => {
      if (SAFARI) {
        disposeFns.push(safariDesktop())
      } else {
        disposeFns.push(chromeDesktop())
      }
      return () => disposeFns.forEach(fn => fn?.())
    })

    mm.add('(max-width: 767px)', () => {
      disposeFns.push(mobileSimple())
      return () => disposeFns.forEach(fn => fn?.())
    })

    return () => mm.revert()
  })

  const bg = block.backgroundMedia

  return (
    <section className="relative inset-0 z-50 w-screen h-[100dvh] md:h-screen">
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
          <video className="w-screen h-screen object-cover" autoPlay muted loop playsInline>
            <source src={bg.video.asset.url ?? ''} type="video/mp4" />
          </video>
        )}
      </div>

      {shouldRenderMask && (
        <div ref={maskRef} className="absolute inset-0 z-10 pointer-events-none will-change-transform [contain:paint]">
          <svg className="w-full h-full">
            <defs>
              <symbol id="hc-logo" viewBox="0 0 143 96">
                <path d="M98.5577 38.6066L102.583 19.9044H58.1431L62.4182 0H12.3307L0 57.3934H46.6026L42.3247 77.2978H90.0018L85.9853 96H130.672L143 38.6066H98.5577ZM30.9377 54.015L34.9257 35.4478H24.5932L20.6024 54.015H4.21257L15.0908 3.3784H31.4806L27.4926 21.9089H37.8279L41.8159 3.3784H58.2057L47.3275 54.015H30.9377ZM65.6359 74.2825C57.2051 74.2825 51.1961 71.9993 47.9358 67.3624L56.4149 27.9394C60.9288 24.4849 66.8241 23.1336 74.1918 23.1336C87.8813 23.1336 96.2552 29.0007 93.9983 43.1168H77.5033C78.3049 37.2834 76.8865 35.5239 72.9156 35.5239C68.2937 35.5239 65.7809 38.2857 63.9219 46.8781L63.1942 50.158C61.3751 58.4069 62.5035 61.8923 67.4921 61.8923C71.2044 61.8923 73.4272 59.8202 75.0645 54.091H91.5595C87.8813 68.207 79.3254 74.2825 65.6359 74.2825ZM105.118 86.3519C105.118 87.219 104.956 88.0242 104.632 88.7674C104.308 89.5107 103.865 90.161 103.299 90.7128C102.742 91.2674 102.08 91.701 101.315 92.0135C100.55 92.3288 99.7259 92.4837 98.8448 92.4837C97.9636 92.4837 97.1478 92.3288 96.3832 92.0135C95.6242 91.6925 94.9591 91.259 94.3877 90.7128C93.8221 90.161 93.3786 89.5107 93.0546 88.7674C92.7362 88.0242 92.5799 87.219 92.5799 86.3519V86.3321C92.5799 85.4707 92.7362 84.6683 93.0546 83.925C93.3786 83.1818 93.8221 82.5315 94.3877 81.9796C94.9591 81.4278 95.6242 80.9915 96.3832 80.679C97.1478 80.358 97.9721 80.1975 98.8533 80.1975C99.7345 80.1975 100.547 80.358 101.304 80.679C102.068 80.9915 102.733 81.4278 103.299 81.9796C103.865 82.5315 104.308 83.1818 104.632 83.925C104.956 84.6683 105.118 85.4707 105.118 86.3321В86.3519ZM..." fill="black" />
              </symbol>

              <mask id="hole-mask">
                <rect width="100%" height="100%" fill="white" />
                <use
                  id="logoUse"
                  href="#hc-logo"
                  x="50%" y="50%"
                  width="143" height="96"
                  transform="translate(-71.5 -48)"
                  fill="black"
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                />
              </mask>
            </defs>

            <rect width="100%" height="100%" fill="white" mask="url(#hole-mask)" />
          </svg>
        </div>
      )}

      <div className="absolute inset-0 z-20 max-w-[1126px] mx-auto flex flex-col items-center justify-center pointer-events-none px-[30px] md:px-0">
        <p ref={titleRef} className="text-text-light text-center md:text-[140px] text-[42px] font-baikal-extracondensed-bold leading-[87%] tracking-[0] md:mb-[28px] mb-[14px] opacity-0 translate-y-8">
          {block.preloader_title}
        </p>
        <p ref={subtitleRef} className="text-text-light md:text-[20px] text-[14px] font-baikal-light opacity-0 translate-y-8 max-w-[743px] text-center">
          {block.preloader_subtitle}
        </p>
      </div>
    </section>
  )
}
