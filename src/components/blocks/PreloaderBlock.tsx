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
    const baseLogoW = 143
    const baseLogoH = 98
    const getVH = () => (window.visualViewport?.height ?? window.innerHeight) || 0
    const getVW = () => (window.visualViewport?.width ?? window.innerWidth) || 0
    const targetScale = () => {
      const heightBased = Math.max(0, getVH() - 20) / baseLogoH
      const isMobile = getVW() <= 767
      const desiredWidth = isMobile ? Math.max(0, getVW() - 20) : Infinity
      const widthBased = desiredWidth === Infinity ? Number.POSITIVE_INFINITY : desiredWidth / baseLogoW
      return Math.min(heightBased, widthBased)
    }

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

    // Уніфікований спосіб масштабувати логотип через width/height+translate (стабільно в Safari/мобільних)
    const updateUseScale = (scale: number) => {
      const useEl = document.getElementById('logoUse') as SVGUseElement | null
      if (!useEl) return
      const w = 143 * scale
      const h = 96 * scale
      const cx = 71.5 * scale
      const cy = 48 * scale
      useEl.setAttribute('width', String(w))
      useEl.setAttribute('height', String(h))
      useEl.setAttribute('transform', `translate(${-cx} ${-cy})`)
    }
    // Окремі сценарії, як раніше
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
      const scaler = { s: 1 }
      tl.to({}, { duration: 0.5 })
        .to(scaler, { s: targetScale, duration: 1.2, ease: 'expo.inOut', onUpdate: () => updateUseScale(scaler.s) })
        .to({}, { duration: 0.5 })
        .to(maskRef.current, { scale: 100, duration: 1.2, ease: 'expo.inOut' })
        .to(maskRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.5')
        .set(maskRef.current, { display: 'none' })
        .to([titleRef.current, subtitleRef.current], { opacity: 1, y: 0, duration: 1, stagger: 0.5, ease: 'power2.out' }, '-=0.3')
      const onResize = () => updateUseScale(targetScale())
      window.addEventListener('resize', onResize, { passive: true })
      return () => window.removeEventListener('resize', onResize)
    }

    const mobileUnified = () => {
      gsap.set(maskRef.current, { transformOrigin: '50% 50%', force3D: true, willChange: 'transform' })
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.()
          cleanupBody()
        }
      })
      const scaler = { s: 1 }
      tl.to({}, { duration: 0.5 })
        .to(scaler, { s: targetScale, duration: 1.2, ease: 'expo.inOut', onUpdate: () => updateUseScale(scaler.s) })
        .to({}, { duration: 0.5 })
        .to(maskRef.current, { scale: 100, duration: 1.2, ease: 'expo.inOut' })
        .to(maskRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.5')
        .set(maskRef.current, { display: 'none' })
        .to([titleRef.current, subtitleRef.current], { opacity: 1, y: 0, duration: 1, stagger: 0.5, ease: 'power2.out' }, '-=0.3')
      const onResize = () => updateUseScale(targetScale())
      window.addEventListener('resize', onResize, { passive: true })
      return () => window.removeEventListener('resize', onResize)
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
      disposeFns.push(mobileUnified())
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
              {/* <symbol id="hc-logo" viewBox="0 0 143 96">
                <path d="M98.5577 38.6066L102.583 19.9044H58.1431L62.4182 0H12.3307L0 57.3934H46.6026L42.3247 77.2978H90.0018L85.9853 96H130.672L143 38.6066H98.5577ZM30.9377 54.015L34.9257 35.4478H24.5932L20.6024 54.015H4.21257L15.0908 3.3784H31.4806L27.4926 21.9089H37.8279L41.8159 3.3784H58.2057L47.3275 54.015H30.9377ZM65.6359 74.2825C57.2051 74.2825 51.1961 71.9993 47.9358 67.3624L56.4149 27.9394C60.9288 24.4849 66.8241 23.1336 74.1918 23.1336C87.8813 23.1336 96.2552 29.0007 93.9983 43.1168H77.5033C78.3049 37.2834 76.8865 35.5239 72.9156 35.5239C68.2937 35.5239 65.7809 38.2857 63.9219 46.8781L63.1942 50.158C61.3751 58.4069 62.5035 61.8923 67.4921 61.8923C71.2044 61.8923 73.4272 59.8202 75.0645 54.091H91.5595C87.8813 68.207 79.3254 74.2825 65.6359 74.2825ZM105.118 86.3519C105.118 87.219 104.956 88.0242 104.632 88.7674C104.308 89.5107 103.865 90.161 103.299 90.7128C102.742 91.2674 102.08 91.701 101.315 92.0135C100.55 92.3288 99.7259 92.4837 98.8448 92.4837C97.9636 92.4837 97.1478 92.3288 96.3832 92.0135C95.6242 91.6925 94.9591 91.259 94.3877 90.7128C93.8221 90.161 93.3786 89.5107 93.0546 88.7674C92.7362 88.0242 92.5799 87.219 92.5799 86.3519V86.3321C92.5799 85.4707 92.7362 84.6683 93.0546 83.925C93.3786 83.1818 93.8221 82.5315 94.3877 81.9796C94.9591 81.4278 95.6242 80.9915 96.3832 80.679C97.1478 80.358 97.9721 80.1975 98.8533 80.1975C99.7345 80.1975 100.547 80.358 101.304 80.679C102.068 80.9915 102.733 81.4278 103.299 81.9796C103.865 82.5315 104.308 83.1818 104.632 83.925C104.956 84.6683 105.118 85.4707 105.118 86.3321В86.3519ZM..." fill="black" />
              </symbol> */}

              <symbol id="hc-logo" viewBox="0 0 755 476">
                {/* масштабуємо оригінал 755×476 у 143×96 */}
                <g transform="scale(1)">
                  <path d="M549.484 407.477C547.28 405.156 544.649 403.348 541.62 402.038C538.591 400.727 535.278 400.058 531.694 400.058C528.11 400.058 524.84 400.727 521.811 402.038C518.782 403.348 516.137 405.156 513.904 407.477C511.686 409.784 509.965 412.475 508.728 415.551C507.491 418.627 506.865 421.917 506.865 425.448V425.548C506.865 429.108 507.491 432.411 508.728 435.487C509.965 438.563 511.686 441.24 513.904 443.519C516.137 445.797 518.782 447.605 521.811 448.958C524.84 450.268 528.139 450.923 531.694 450.923C535.249 450.923 538.591 450.268 541.62 448.958C544.649 447.605 547.28 445.797 549.484 443.519C551.717 441.24 553.466 438.563 554.703 435.487C555.94 432.411 556.566 429.108 556.566 425.548V425.448C556.566 421.917 555.94 418.627 554.703 415.551C553.466 412.475 551.717 409.784 549.484 407.477ZM537.581 441.497L529.675 429.222H527.03V441.497H518.967V408.816H532.263C534.396 408.816 536.259 409.058 537.852 409.542C539.458 410.026 540.795 410.724 541.833 411.621C542.857 412.475 543.625 413.529 544.109 414.768C544.62 416.021 544.876 417.402 544.876 418.912V419.026C544.876 420.165 544.734 421.233 544.464 422.23C544.194 423.198 543.767 424.081 543.227 424.878C542.672 425.662 541.961 426.359 541.108 426.943C540.269 427.527 539.316 428.011 538.207 428.396L547.095 441.497H537.581Z" fill="black" />
                  <path d="M535.206 416.534C534.794 416.192 534.282 415.936 533.656 415.751C533.031 415.551 532.277 415.452 531.381 415.452H527.03V422.899H531.381C532.206 422.899 532.945 422.814 533.6 422.643C534.254 422.472 534.794 422.216 535.206 421.874C535.619 421.518 535.917 421.119 536.088 420.678C536.287 420.194 536.401 419.652 536.401 419.069V419.026C536.401 418.542 536.287 418.086 536.088 417.673C535.917 417.232 535.619 416.847 535.206 416.534Z" fill="black" />
                  <path d="M524.313 185.22L543.867 92.6169H313.18L332.734 0H61.4045L0 290.781H253.909L234.355 383.397H482.448L462.895 476H693.595L755 185.22H524.313ZM171.7 273.693L190.84 182.343H125.824L106.669 273.693H21.0607L75.2412 17.088H160.863L141.708 108.267H206.739L225.88 17.088H311.687L257.492 273.693H171.7ZM468.526 314.22C459.795 326.979 449.542 337.545 437.781 345.918C426.021 354.291 412.767 360.613 398.035 364.857C383.302 369.1 367.204 371.236 349.741 371.236C335.364 371.236 322.153 369.798 310.094 366.922C298.035 364.045 287.341 359.83 278.013 354.262C271.983 350.674 266.522 346.615 261.645 342.087C261.005 341.503 260.735 340.606 260.92 339.766L306.539 124.045C306.696 123.333 307.151 122.72 307.791 122.378C315.399 118.32 323.504 114.974 332.108 112.311C348.376 107.284 366.195 104.778 385.563 104.778C403.026 104.778 419.067 106.871 433.686 111.058C448.29 115.244 460.776 121.496 471.1 129.812C481.438 138.142 489.459 148.609 495.161 161.239C500.864 173.87 503.423 188.808 502.826 206.038H417.645C417.289 199.702 416.308 194.433 414.701 190.246C413.094 186.045 410.776 182.699 407.747 180.179C404.718 177.672 401.092 175.821 396.883 174.625C392.659 173.429 387.824 172.816 382.363 172.816C377.841 172.816 373.504 173.244 369.352 174.084C365.185 174.924 361.246 176.291 357.492 178.213C353.752 180.122 350.282 182.614 347.068 185.661C343.868 188.708 340.868 192.51 338.066 197.067C335.279 201.61 332.79 206.822 330.586 212.688C328.382 218.555 326.633 225.248 325.325 232.795L324.087 238.363C322.651 245.426 321.826 251.92 321.585 257.843C321.343 263.767 321.67 269.193 322.566 274.091C323.462 279.004 324.884 283.276 326.846 286.936C328.809 290.581 331.269 293.572 334.241 295.907C337.213 298.242 340.711 300.036 344.75 301.29C348.789 302.557 353.183 303.184 357.947 303.184C363.407 303.184 368.37 302.642 372.821 301.56C377.273 300.492 381.411 298.726 385.208 296.263C389.004 293.814 392.517 290.467 395.717 286.209C398.93 281.966 401.718 276.427 404.093 269.606H489.459C484.226 286.608 477.258 301.475 468.526 314.22ZM563.079 425.548C563.079 429.934 562.268 434.006 560.647 437.766C559.026 441.525 556.808 444.814 553.978 447.605C551.19 450.411 547.877 452.604 544.052 454.184C540.226 455.779 536.102 456.562 531.694 456.562C527.286 456.562 523.204 455.779 519.379 454.184C515.582 452.561 512.254 450.368 509.396 447.605C506.566 444.814 504.348 441.525 502.727 437.766C501.134 434.006 500.352 429.934 500.352 425.548V425.448C500.352 421.091 501.134 417.032 502.727 413.273C504.348 409.514 506.566 406.224 509.396 403.433C512.254 400.642 515.582 398.435 519.379 396.854C523.204 395.231 527.328 394.419 531.737 394.419C536.145 394.419 540.212 395.231 543.995 396.854C547.82 398.435 551.148 400.642 553.978 403.433C556.808 406.224 559.026 409.514 560.647 413.273C562.268 417.032 563.079 421.091 563.079 425.448V425.548Z" fill="black" />
                </g>
              </symbol>


              <mask id="hole-mask">
                <rect width="100%" height="100%" fill="white" />
                <g id="logoWrap" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                  <use
                    id="logoUse"
                    href="#hc-logo"
                    x="50%" y="50%"
                    width="143" height="96"
                    transform="translate(-71.5 -48)"
                    fill="black"
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  />
                </g>
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
