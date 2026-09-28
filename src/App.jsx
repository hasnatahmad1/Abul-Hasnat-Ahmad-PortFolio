import { useEffect, useRef, useState } from 'react'
import {
  profile,
  stats,
  experience,
  projects,
  projectFilters,
  skills,
  education,
  languages,
} from './data.js'

const YEAR = new Date().getFullYear()
const SECTIONS = ['about', 'experience', 'projects', 'skills', 'education', 'contact']

/* ---------- Icons ---------- */

const Icon = ({ d, size = 20, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    {d}
  </svg>
)
const GithubIcon = (p) => (
  <Icon {...p} d={<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />} />
)
const LinkedinIcon = (p) => (
  <Icon {...p} d={<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>} />
)
const MailIcon = (p) => (
  <Icon {...p} d={<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>} />
)
const DownloadIcon = (p) => (
  <Icon {...p} d={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" /></>} />
)
const PinIcon = (p) => (
  <Icon {...p} d={<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>} />
)
const SunIcon = (p) => (
  <Icon {...p} d={<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></>} />
)
const MoonIcon = (p) => <Icon {...p} d={<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />} />
const MenuIcon = (p) => <Icon {...p} d={<path d="M4 6h16M4 12h16M4 18h16" />} />
const CloseIcon = (p) => <Icon {...p} d={<path d="M18 6 6 18M6 6l12 12" />} />
const CopyIcon = (p) => (
  <Icon {...p} d={<><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>} />
)
const ArrowIcon = (p) => <Icon {...p} d={<path d="M5 12h14M12 5l7 7-7 7" />} />

/* ---------- Helpers ---------- */

function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'shown' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved) return saved
    } catch { /* storage unavailable */ }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch { /* storage unavailable */ }
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return active
}

function useTypewriter(words) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const word = words[i % words.length]
    let delay = deleting ? 40 : 80
    if (!deleting && text === word) delay = 1800
    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setI((n) => n + 1)
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, i, words])
  return text
}

const SectionTitle = ({ index, title, subtitle }) => (
  <Reveal className="section-title">
    <span className="section-index">{index}</span>
    <h2>{title}</h2>
    {subtitle && <p>{subtitle}</p>}
  </Reveal>
)

/* ---------- Sections ---------- */

function Nav({ theme, toggleTheme }) {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark">AH</span>
          <span className="logo-text">Abul Hasnat</span>
        </a>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>
              {id}
            </a>
          ))}
          <a className="btn btn-small btn-primary nav-cv" href={profile.cv} download>
            <DownloadIcon size={16} /> CV
          </a>
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle color theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const typed = useTypewriter(profile.roles)
  return (
    <section className="hero" id="top">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="grid-bg" />
      <div className="container hero-inner">
        <div className="hero-text">
          <Reveal>
            <span className="badge">
              <span className="pulse" /> Open to Software Engineer roles
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1>
              Hi, I&apos;m <span className="gradient-text">{profile.firstName}</span>
              <br />
              Ahmad.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="hero-role">
              <span className="mono">&gt;</span> {typed}
              <span className="caret" />
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="hero-tagline">{profile.tagline}</p>
          </Reveal>
          <Reveal delay={320} className="hero-cta">
            <a className="btn btn-primary" href="#projects">
              View my work <ArrowIcon size={18} />
            </a>
            <a className="btn btn-ghost" href={profile.cv} download>
              <DownloadIcon size={18} /> Download CV
            </a>
          </Reveal>
          <Reveal delay={400} className="hero-social">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><MailIcon /></a>
            <span className="hero-location"><PinIcon size={16} /> {profile.location}</span>
          </Reveal>
        </div>

        <Reveal delay={200} className="hero-visual">
          <div className="code-card">
            <div className="code-head">
              <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              <span className="code-file">Engineer.java</span>
            </div>
            <pre className="code-body">
<span className="k">public class</span> <span className="t">Engineer</span> {'{'}{'\n'}
{'  '}<span className="t">String</span> name = <span className="s">&quot;{profile.name}&quot;</span>;{'\n'}
{'  '}<span className="t">String</span> base = <span className="s">&quot;Lahore, PK&quot;</span>;{'\n'}
{'  '}<span className="t">String</span>[] stack = {'{'}{'\n'}
{'    '}<span className="s">&quot;Java&quot;</span>, <span className="s">&quot;Spring Boot&quot;</span>,{'\n'}
{'    '}<span className="s">&quot;React&quot;</span>, <span className="s">&quot;Django&quot;</span>{'\n'}
{'  '}{'}'};{'\n'}
{'  '}<span className="t">int</span> monthsExperience = <span className="n">13</span>;{'\n'}
{'  '}<span className="t">boolean</span> openToWork = <span className="k">true</span>;{'\n'}
{'\n'}
{'  '}<span className="t">void</span> <span className="f">ship</span>() {'{'}{'\n'}
{'    '}<span className="c">// build, deploy, fix, repeat</span>{'\n'}
{'  '}{'}'}{'\n'}
{'}'}
            </pre>
          </div>
          <div className="float-chip chip-1"><i style={{ background: '#f59e0b' }} /> Java</div>
          <div className="float-chip chip-2"><i style={{ background: '#22d3ee' }} /> React</div>
          <div className="float-chip chip-3"><i style={{ background: '#22c55e' }} /> Spring Boot</div>
        </Reveal>
      </div>
      <a href="#about" className="scroll-hint" aria-label="Scroll to about">
        <span />
      </a>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionTitle index="01" title="About me" />
        <div className="about-grid">
          <Reveal className="about-text">
            {profile.about.map((p, i) => <p key={i}>{p}</p>)}
            <div className="about-langs">
              <span className="muted">Speaks:</span>
              {languages.map((l) => <span key={l} className="chip">{l}</span>)}
            </div>
          </Reveal>
          <div className="stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="stat card">
                <span className="stat-value gradient-text">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionTitle index="02" title="Experience" subtitle="Where I've been building." />
        <div className="timeline">
          {experience.map((job, i) => (
            <Reveal key={job.role} delay={i * 100} className="timeline-item">
              <span className="timeline-dot" />
              <div className="card job">
                <div className="job-head">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="job-company">{job.company}</p>
                  </div>
                  <span className="job-duration mono">{job.duration}</span>
                </div>
                <ul>
                  {job.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
                <div className="tags">
                  {job.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? projects : projects.filter((p) => p.category === filter)
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionTitle index="03" title="Projects" subtitle="Production systems and things I've built." />
        <Reveal className="filters">
          {projectFilters.map((f) => (
            <button key={f.key} className={`filter ${filter === f.key ? 'active' : ''}`} onClick={() => setFilter(f.key)}>
              {f.label}
            </button>
          ))}
        </Reveal>
        <div className="projects-grid" key={filter}>
          {shown.map((p, i) => (
            <Reveal key={p.title} delay={i * 60} className={`card project ${p.category === 'production' ? 'featured' : ''}`}>
              <div className="project-top">
                <span className={`project-cat cat-${p.category}`}>
                  {projectFilters.find((f) => f.key === p.category)?.label}
                </span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="tags">
                {p.stack.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="projects-more">
          <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
            <GithubIcon size={18} /> More on GitHub
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionTitle index="04" title="Skills" subtitle="The tools I use to get things done." />
        <div className="skills-grid">
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={i * 70} className="card skill-group">
              <h3>{s.group}</h3>
              <div className="skill-items">
                {s.items.map((it) => <span key={it} className="chip">{it}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionTitle index="05" title="Education" />
        <div className="edu-grid">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 90} className="card edu">
              <span className="edu-score mono">{e.score}</span>
              <h3>{e.degree}</h3>
              <p>{e.school}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard unavailable */ }
  }
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal className="contact-card">
          <span className="section-index">06</span>
          <h2>
            Let&apos;s build something <span className="gradient-text">together.</span>
          </h2>
          <p>
            I&apos;m looking for a Software Engineer role on a product-focused team. If you have an opportunity or just
            want to talk tech, my inbox is open.
          </p>
          <div className="contact-actions">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              <MailIcon size={18} /> Say hello
            </a>
            <button className="btn btn-ghost" onClick={copy}>
              <CopyIcon size={18} /> {copied ? 'Copied!' : profile.email}
            </button>
          </div>
          <div className="contact-social">
            <a href={profile.github} target="_blank" rel="noreferrer"><GithubIcon size={18} /> GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon size={18} /> LinkedIn</a>
            <a href={profile.cv} download><DownloadIcon size={18} /> Resume</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <p>
            &copy; {YEAR} {profile.name}. Built with React.
          </p>
        </div>
      </footer>
    </>
  )
}
