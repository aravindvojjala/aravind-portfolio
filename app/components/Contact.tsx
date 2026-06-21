'use client'
import { useEffect, useRef } from 'react'
import styles from '../styles/Contact.module.css'

const links = [
  {
    label: 'Email',
    value: 'aravindvojjala123@gmail.com',
    href: 'mailto:aravindvojjala123@gmail.com',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11Z"/>
        <path d="m3.5 6 8.5 6.5L20.5 6"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/vojjala-aravind',
    href: 'https://www.linkedin.com/in/vojjala-aravind/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.025-3.04-1.85-3.04-1.855 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.475-.9 1.635-1.85 3.365-1.85 3.6 0 4.27 2.37 4.27 5.455v6.275ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/aravindvojjala',
    href: 'https://github.com/aravindvojjala',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(styles.visible)
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className={styles.section}>
      <div className={styles.glow} />

      <div className={styles.inner}>
        <p className={styles.sectionTag}>
          <span className={styles.tagLine} />
          Contact
        </p>

        <h2 className={styles.heading}>
          Let&apos;s build<br />
          <em>something.</em>
        </h2>

        <p className={styles.subheading}>
          Open to fresher-level Generative AI, AI/ML, and LLM Engineer roles in Hyderabad.
          Reach out — I reply fast.
        </p>

        <div className={styles.linkGrid}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label === 'Email' ? undefined : '_blank'}
              rel={link.label === 'Email' ? undefined : 'noopener noreferrer'}
              className={styles.linkCard}
            >
              <span className={styles.linkIcon}>{link.icon}</span>
              <span className={styles.linkText}>
                <span className={styles.linkLabel}>{link.label}</span>
                <span className={styles.linkValue}>{link.value}</span>
              </span>
              <span className={styles.linkArrow}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17 17 7M7 7h10v10"/>
                </svg>
              </span>
            </a>
          ))}
        </div>

        <p className={styles.footer}>
          Vojjala Aravind · Hyderabad, Telangana, India
        </p>
      </div>
    </section>
  )
}
