'use client'
import { useEffect, useRef } from 'react'
import styles from '../styles/Projects.module.css'

const projects = [
  {
    number: '01',
    title: 'AI Marketing Automation Platform',
    role: 'Generative AI Engineer',
    period: 'Dec 2025',
    location: 'Hyderabad, India',
    summary: 'Multi-agent marketing platform that generates end-to-end structured marketing assets from a single product description — fully containerized and production-ready.',
    bullets: [
      'Orchestrated autonomous AI agents using CrewAI\'s multi-agent framework for intelligent task delegation and coordination',
      'Built interactive Streamlit UI where users input product details and instantly receive professional marketing copy',
      'Integrated RAG and agent reasoning to automate complex content workflows using LLMs',
      'Containerized and deployed as Dockerized microservices with LiteLLM proxy for LLM API access',
      'Wrote production-grade Python with type hints, performance monitoring, and clean architecture',
    ],
    tags: ['CrewAI', 'LangChain', 'RAG', 'Docker', 'Streamlit', 'LiteLLM', 'Python'],
    accent: '#E8722A',
    github: 'https://github.com/aravindvojjala/AI-Marketing-Automation-System_CrewAI',
  },
  {
    number: '02',
    title: 'AI News Research & Summarization',
    role: 'AI Engineer — LLMs & NLP',
    period: 'Nov 2025',
    location: 'Hyderabad, India',
    summary: 'Real-time news research platform with semantic search and LLM-powered summarization — built for efficient research workflows at scale.',
    bullets: [
      'Implemented automated web scraping and scalable ETL pipelines using Python and SQL for real-time news retrieval',
      'Built semantic processing and relevance ranking pipeline on top of scraped content',
      'Developed NLP summarization system using LLMs to generate concise, contextually accurate summaries',
      'Integrated RAG techniques with semantic search indexes to enhance information accuracy and topical relevance',
      'Designed Streamlit interface for parameterized search queries with instant organized news insights',
    ],
    tags: ['LLMs', 'RAG', 'NLP', 'Streamlit', 'ETL', 'Python', 'SQL', 'FAISS'],
    accent: '#4A9EDB',
    github: 'https://github.com/aravindvojjala/AI-Powered-News-Research-Tool',
  },
  {
    number: '03',
    title: 'Plant Disease Detection — CNN',
    role: 'Machine Learning Engineer — Deep Learning',
    period: 'Sep 2025',
    location: 'Hyderabad, India',
    summary: 'Deep learning computer vision system that classifies Potato and Tomato leaf diseases from images — built for real-world agricultural early detection.',
    bullets: [
      'Designed and trained CNN models using TensorFlow and Keras for multi-class leaf disease classification',
      'Performed image preprocessing, data augmentation, and model optimization to maximize prediction accuracy',
      'Built end-to-end ML pipeline covering data preparation, training, evaluation, and inference',
      'Implemented model evaluation across multiple disease classes with validation techniques',
      'Focused on real-world agricultural deployment for early disease detection and decision support',
    ],
    tags: ['TensorFlow', 'Keras', 'CNN', 'Deep Learning', 'Python', 'Computer Vision'],
    accent: '#7BC47A',
    github: 'http://github.com/aravindvojjala/Plant-Disease-Identification-System',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
          }
        })
      },
      { threshold: 0.12 }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className={styles.section}>
      <div className={styles.inner}>

        {/* Header */}
        <div className={styles.header}>
          <p className={styles.sectionTag}>
            <span className={styles.tagLine} />
            Projects
          </p>
          <h2 className={styles.heading}>
            Things I've<br />
            <em>built.</em>
          </h2>
          <p className={styles.subheading}>
            Self-driven projects — each one production-minded, end-to-end, and built to solve real problems.
          </p>
        </div>

        {/* Project cards */}
        <div className={styles.cards}>
          {projects.map((project, i) => (
            <div
              key={project.number}
              ref={(el) => { cardsRef.current[i] = el }}
              className={styles.card}
              style={{ '--accent': project.accent } as React.CSSProperties}
            >
              {/* Card top row */}
              <div className={styles.cardTop}>
                <span className={styles.cardNumber}>{project.number}</span>
                <div className={styles.cardMeta}>
                  <span className={styles.cardRole}>{project.role}</span>
                  <span className={styles.cardPeriod}>{project.period} · {project.location}</span>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.githubLink}
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              </div>

              {/* Divider */}
              <div className={styles.cardDivider} />

              {/* Title + summary */}
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardSummary}>{project.summary}</p>

              {/* Bullets */}
              <ul className={styles.bullets}>
                {project.bullets.map((b, bi) => (
                  <li key={bi} className={styles.bullet}>
                    <span className={styles.bulletDot} />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>

              {/* Accent glow */}
              <div className={styles.cardGlow} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
