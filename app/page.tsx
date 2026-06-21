'use client'
import dynamic from 'next/dynamic'
import styles from './styles/Page.module.css'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'

const VideoIntro = dynamic(() => import('./components/VideoIntro'), { ssr: false })

export default function Home() {
  return (
    <main>
      <VideoIntro />

      <section id="about" className={styles.about}>
        <div className={styles.aboutInner}>
          <p className={styles.sectionTag}>
            <span className={styles.tagLine} />
            About
          </p>

          <h2 className={styles.aboutHeading}>
            AI systems that<br />
            <em>actually ship.</em>
          </h2>

          <div className={styles.aboutGrid}>
            <div className={styles.bioBlock}>
              <p className={styles.bio}>
                Generative AI Engineer with hands-on expertise in building
                end-to-end AI applications using LangChain, CrewAI,
                Retrieval-Augmented Generation (RAG), and Large Language Models.

                Experienced in developing production-grade Python pipelines,
                containerized deployments with Docker, FastAPI microservices,
                and AI-powered applications including marketing automation,
                news research systems, and intelligent assistants.
              </p>
              <a href="#contact" className={styles.contactLink}>
                Get in touch →
              </a>
            </div>

            <div className={styles.skillsBlock}>
              {[
                { label: 'LLMs & Generative AI', items: ['LangChain', 'CrewAI', 'Agentic AI', 'RAG', 'LiteLLM', 'Prompt Engineering'] },
                { label: 'Programming', items: ['Python', 'FastAPI', 'SQL', 'Docker', 'Streamlit'] },
                { label: 'Infrastructure', items: ['FastAPI', 'Docker', 'Streamlit', 'GCP'] },
                { label: 'Machine Learning & Deep Learning', items: ['TensorFlow', 'Keras', 'Hugging Face', 'Scikit-learn', 'CNNs'] },
                { label: 'Vector Databases', items: ['FAISS', 'ChromaDB', 'Semantic Search', 'Embedding Models'] },
                { label: 'Cloud & Deployment', items: ['GCP', 'Docker', 'REST APIs', 'Model Deployment'] }
              ].map(group => (
                <div key={group.label} className={styles.skillGroup}>
                  <p className={styles.skillLabel}>{group.label}</p>
                  <div className={styles.skillTags}>
                    {group.items.map(s => (
                      <span key={s} className={styles.tag}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Projects />

      <Experience />

      <Contact />

    </main>
  )
}
