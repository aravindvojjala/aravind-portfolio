'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import styles from '../styles/VideoIntro.module.css'

const CinematicLayer = dynamic(() => import('./CinematicLayer'), { ssr: false })

export default function VideoIntro() {
  const heroRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const bgVideoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLButtonElement>(null)

  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);
  /* const [videoSrc, setVideoSrc] = useState(""); */
  const videoSrc = "./video/intro.mp4";

  // Auto-hide sound hint after 4s
  useEffect(() => {
    const t = setTimeout(() => setShowSoundHint(false), 4000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
  console.log("GSAP EFFECT");

  console.log("content", contentRef.current);
  console.log("tagline", taglineRef.current);
  console.log("name", nameRef.current);
  console.log("role", roleRef.current);

}, []);

  // GSAP entrance animation
  useEffect(() => {
  if (!contentRef.current) return;

  const ctx = gsap.context(() => {
    const chars =
      nameRef.current?.querySelectorAll("[data-char]") || [];

    gsap.set([
      taglineRef.current,
      roleRef.current,
      controlsRef.current,
      ...Array.from(chars)
    ], {
      opacity: 1
    });

    const tl = gsap.timeline({ delay: 0.5 });

    tl.from(taglineRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8
    });

    tl.from(chars, {
      y: 80,
      opacity: 0,
      stagger: 0.05,
      duration: 1
    }, "-=0.4");

    tl.from(roleRef.current, {
      y: 24,
      opacity: 0,
      duration: 0.8
    }, "-=0.5");

    tl.from(controlsRef.current, {
      y: 16,
      opacity: 0,
      duration: 0.6
    }, "-=0.5");
  }, contentRef);

  return () => ctx.revert();
}, []);

  // Fade-in hero on load
  useEffect(() => {
    gsap.from(heroRef.current, { opacity: 0, duration: 1.4, ease: 'power2.inOut' })
  }, [])

  // Enable audio after first user interaction
  useEffect(() => {
      const enableAudio = () => {
          const video = videoRef.current;

          if (video) {
              video.muted = false;
              video.play().catch(console.error);
              setMuted(false);
          }

          window.removeEventListener("click", enableAudio);
      };

      window.addEventListener("click", enableAudio);

      return () => {
          window.removeEventListener("click", enableAudio);
      };
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
    setShowSoundHint(false)
  }, [])

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    const bg = bgVideoRef.current
    if (!v) return
    if (v.paused) {
      v.play(); bg?.play()
      setPlaying(true)
    } else {
      v.pause(); bg?.pause()
      setPlaying(false)
    }
  }, [])

  const scrollToNext = useCallback(() => {
    const next = document.getElementById('about')
    if (next) next.scrollIntoView({ behavior: 'smooth' })
    else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
  }, [])

  const nameChars = ['ARAVIND', 'VOJJALA']


   return (
     <section ref={heroRef} className={styles.hero}>
       { /* Background ambient blur video */}
       <div className={styles.bgVideoWrap}>
       {videoSrc && (
         <video
           ref={bgVideoRef}
           className={styles.bgVideo}
           src={videoSrc}
           autoPlay loop muted playsInline
         />
         )}
         <div className={styles.bgBlur} />
       </div>

       { /* Gradient overlays */}
       <div className={styles.gradientOverlay} />
       <div className={styles.gradientBottom} />
       <div className={styles.gradientSides} />
       <div className={styles.vignetteTop} />

      { /* Three.js cinematic particles */}
      <CinematicLayer />

      { /* Foreground video */}
      <div className={styles.videoWrap}>
      {videoSrc && (
        <video
          ref={videoRef}
          className={styles.video}
          src={videoSrc}
          autoPlay loop muted playsInline
        />
        )}
        { /* Film grain overlay */}
        <div className={styles.filmGrain} />
        {/* Soft rim light below video for grounding */}
        <div className={styles.rimLight} />
      </div>

      { /* Overlay content */}
      <div ref={contentRef} className={styles.content}>
        <p ref={taglineRef} className={styles.tagline}>
          <span className={styles.taglineDash} />
          Generative AI Engineer
        </p>

        <div ref={nameRef} className={styles.nameStack}>
          {nameChars.map((word, wi) => (
            <div key={wi} className={styles.nameLine}>
              {word.split('').map((ch, ci) => (
                <span key={ci} data-char className={styles.nameChar}>{ch}</span>
              ))}
            </div>
          ))}
        </div>

        <div ref={roleRef} className={styles.roleBlock}>
          <p className={styles.roleText}>
            LangChain · CrewAI · Agentic AI · RAG Pipelines · LLMs · FastAPI · Docker
          </p>
          <p className={styles.roleSubtext}>
            Generative AI Engineer | AI Engineer | Building production-grade AI systems
          </p>
        </div>
      </div>

      { /* Controls */}
      <div ref={controlsRef} className={styles.controls}>
        <button className={styles.glassBtn} onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        <button className={styles.glassBtn} onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.7 8.7 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>

        {showSoundHint && (
          <div className={styles.soundHint}>
            <span className={styles.soundDot} />
            Tap for sound
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <button ref={scrollRef} className={styles.scrollIndicator} onClick={scrollToNext} aria-label="Scroll down">
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollPulse} />
        </div>
      </button>
    </section>
  )
}