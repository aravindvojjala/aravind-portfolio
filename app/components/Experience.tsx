'use client'
import { useEffect, useRef } from 'react'
import styles from '../styles/Experience.module.css'

const internship = {
  role: 'Artificial Intelligence Intern',
  company: 'AENEXZ',
  period: 'Nov 2024 – Jan 2025',
  location: 'Hyderabad, India',
  bullets: [
    'Completed a structured internship focused on Artificial Intelligence, Machine Learning, and Deep Learning concepts',
    'Built and evaluated ML models using Python (Scikit-learn), including data preprocessing, feature engineering, and performance optimization',
    'Implemented Deep Learning models using TensorFlow/Keras for image classification tasks (CNNs)',
    'Applied NLP techniques for text processing and analysis, including tokenization and feature extraction',
    'Worked on end-to-end mini projects, improving model accuracy and understanding real-world AI workflows',
  ],
}

const education = [
  {
    institution: "Avanthi's Scientific Technological & Research Academy",
    degree: 'Bachelor of Computer Science',
    year: '2025',
    gpa: '7.5',
  },
  {
    institution: 'Sri Gayatri Junior College',
    degree: 'XII — TSBIE',
    year: '2021',
    gpa: '8.5',
  },
  {
    institution: 'S.T. Mary\'s High School',
    degree: 'Secondary Board of Education',
    year: '2019',
    gpa: '8.0',
  },
]

const certifications = [
  {
    title: 'Artificial Intelligence Internship',
    issuer: 'Academy Accreditation',
    icon: '◈',
  },
  {
    title: 'Generative AI Fundamentals',
    issuer: 'Databricks — Academy Accreditation',
    icon: '◈',
  },
  {
    title: 'Generative AI Learning Plan for Decision Makers',
    issuer: 'AWS Training & Certification',
    icon: '◈',
  },
]

export default function Experience() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(styles.visible)
        })
      },
      { threshold: 0.1 }
    )
    itemsRef.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.inner}>

        {/* ── Internship ──────────────────────────────────────── */}
        <div
          ref={(el) => { itemsRef.current[0] = el }}
          className={styles.block}
        >
          <p className={styles.sectionTag}>
            <span className={styles.tagLine} />
            Experience
          </p>

          <h2 className={styles.heading}>
            Where I've<br /><em>worked.</em>
          </h2>

          <div className={styles.internshipCard}>
            <div className={styles.internshipLeft}>
              <span className={styles.internPeriod}>{internship.period}</span>
              <div className={styles.internTimeline}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineLine} />
              </div>
            </div>

            <div className={styles.internshipRight}>
              <div className={styles.internHeader}>
                <h3 className={styles.internRole}>{internship.role}</h3>
                <div className={styles.internMeta}>
                  <span className={styles.internCompany}>{internship.company}</span>
                  <span className={styles.internDivider}>·</span>
                  <span className={styles.internLocation}>{internship.location}</span>
                </div>
              </div>

              <ul className={styles.bullets}>
                {internship.bullets.map((b, i) => (
                  <li key={i} className={styles.bullet}>
                    <span className={styles.bulletDot} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Education ───────────────────────────────────────── */}
        <div
          ref={(el) => { itemsRef.current[1] = el }}
          className={styles.block}
        >
          <p className={styles.sectionTag}>
            <span className={styles.tagLine} />
            Education
          </p>

          <h2 className={styles.heading}>
            Where I've<br /><em>studied.</em>
          </h2>

          <div className={styles.eduGrid}>
            {education.map((edu, i) => (
              <div key={i} className={styles.eduCard}>
                <div className={styles.eduYear}>{edu.year}</div>
                <div className={styles.eduBody}>
                  <p className={styles.eduDegree}>{edu.degree}</p>
                  <p className={styles.eduInstitution}>{edu.institution}</p>
                  <div className={styles.gpaRow}>
                    <span className={styles.gpaLabel}>GPA</span>
                    <span className={styles.gpaValue}>{edu.gpa}</span>
                    <div className={styles.gpaBar}>
                      <div
                        className={styles.gpaFill}
                        style={{ width: `${(parseFloat(edu.gpa) / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.eduGlow} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Certifications ──────────────────────────────────── */}
        <div
          ref={(el) => { itemsRef.current[2] = el }}
          className={styles.block}
        >
          <p className={styles.sectionTag}>
            <span className={styles.tagLine} />
            Certifications
          </p>

          <div className={styles.certGrid}>
            {certifications.map((cert, i) => (
              <div key={i} className={styles.certCard}>
                <span className={styles.certIcon}>{cert.icon}</span>
                <div>
                  <p className={styles.certTitle}>{cert.title}</p>
                  <p className={styles.certIssuer}>{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
