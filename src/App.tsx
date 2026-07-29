import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  Camera,
  ChartNoAxesCombined,
  CircleUserRound,
  Home,
  Lightbulb,
  Moon,
  Play,
  Sparkles,
  Sun,
  Video,
} from 'lucide-react'
import { content } from './content'
import { siteCopy } from './site-copy'

type Theme = 'light' | 'dark'

const navItems = [
  { href: '#home', label: siteCopy.nav.home, icon: Home },
  { href: '#story', label: siteCopy.nav.story, icon: CircleUserRound },
  { href: '#focus', label: siteCopy.nav.focus, icon: Lightbulb },
  { href: '#work', label: siteCopy.nav.work, icon: Sparkles },
  { href: '#videos', label: siteCopy.nav.videos, icon: Play },
]

const focusIcons = [BrainCircuit, Camera, ChartNoAxesCombined]

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = window.localStorage.getItem('joe-theme')
    return saved === 'light' || saved === 'dark' ? saved : getSystemTheme()
  })
  const [hasThemeOverride, setHasThemeOverride] = useState(() =>
    Boolean(window.localStorage.getItem('joe-theme')),
  )
  const portraitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'dark' ? '#071427' : '#f7fbff',
    )
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (!hasThemeOverride) setTheme(media.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [hasThemeOverride])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    setHasThemeOverride(true)
    window.localStorage.setItem('joe-theme', nextTheme)
  }

  function movePortrait(event: React.PointerEvent<HTMLDivElement>) {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return
    }
    const box = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - box.left) / box.width - 0.5) * 10
    const y = ((event.clientY - box.top) / box.height - 0.5) * 10
    portraitRef.current?.style.setProperty('--portrait-x', `${x}px`)
    portraitRef.current?.style.setProperty('--portrait-y', `${y}px`)
  }

  function resetPortrait() {
    portraitRef.current?.style.setProperty('--portrait-x', '0px')
    portraitRef.current?.style.setProperty('--portrait-y', '0px')
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        {siteCopy.skipToContent}
      </a>

      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#home" aria-label={`${content.name}, home`}>
            J<span>.</span>
          </a>
          <nav className="nav-list" aria-label={siteCopy.navigation}>
            {navItems.map(({ href, label, icon: Icon }) => (
              <a key={href} className="nav-link" href={href}>
                <Icon aria-hidden="true" size={19} strokeWidth={1.9} />
                <span>{label}</span>
              </a>
            ))}
          </nav>
          <button
            className="theme-toggle"
            type="button"
            aria-label={theme === 'dark' ? siteCopy.theme.light : siteCopy.theme.dark}
            aria-pressed={theme === 'dark'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main id="main-content">
        <section className="hero section" id="home">
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy hero-enter">
              <div className="hero-kicker">
                <Sparkles aria-hidden="true" size={15} />
                <p className="eyebrow">{siteCopy.hero.eyebrow}</p>
              </div>
              <h1>{content.name}<span className="title-dot">.</span></h1>
              <p className="hero-role">{content.role}</p>
              <div className="hero-topics" aria-label="Joe's interests">
                {content.lenses.map((lens) => <span key={lens}>{lens}</span>)}
              </div>
              <p className="hero-intro">{content.introduction}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#story">
                  {siteCopy.hero.primaryAction}
                  <ArrowDown aria-hidden="true" size={18} />
                </a>
                <a className="button button-quiet" href="#work">
                  {siteCopy.hero.secondaryAction}
                  <ArrowUpRight aria-hidden="true" size={18} />
                </a>
              </div>
            </div>

            <div
              ref={portraitRef}
              className="portrait-wrap hero-enter"
              onPointerMove={movePortrait}
              onPointerLeave={resetPortrait}
            >
              <div className="portrait-ring" aria-hidden="true">
                {content.lenses.map((lens) => <span key={lens}>{lens}</span>)}
              </div>
              <div className="portrait-blob">
                <img
                  src={theme === 'dark' ? content.portrait.darkSrc : content.portrait.lightSrc}
                  alt={content.portrait.alt}
                  width="800"
                  height="1200"
                />
              </div>
              <div className="creator-badge">
                <Video aria-hidden="true" size={18} />
                <span>{siteCopy.hero.creatorBadge}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section story-section" id="story">
          <div className="container">
            <header className="section-heading" data-reveal>
              <p className="eyebrow">{siteCopy.story.eyebrow}</p>
              <h2>{siteCopy.story.title}</h2>
            </header>
            <div className="story-grid">
              <div className="story-copy" data-reveal>
                {content.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="lens-list" aria-label="Joe's areas of focus" data-reveal>
                {content.lenses.map((lens, index) => (
                  <div className="lens" key={lens}>
                    <span aria-hidden="true">0{index + 1}</span>
                    <strong>{lens}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section focus-section" id="focus">
          <div className="container">
            <header className="section-heading narrow" data-reveal>
              <p className="eyebrow">{siteCopy.focus.eyebrow}</p>
              <h2>{siteCopy.focus.title}</h2>
            </header>
            <div className="focus-grid">
              {content.focus.map((item, index) => {
                const Icon = focusIcons[index]
                return (
                  <article className="focus-card" key={item.title} data-reveal>
                    <div className="icon-tile"><Icon aria-hidden="true" /></div>
                    <span className="card-number">0{index + 1}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="container work-grid">
            <header className="section-heading" data-reveal>
              <p className="eyebrow">{siteCopy.work.eyebrow}</p>
              <h2>{siteCopy.work.title}</h2>
            </header>
            <article className="skill-card" data-reveal>
              <div className="skill-card-topline">
                <span className="status-pill"><span />{siteCopy.work.cardLabel}</span>
                <BookOpen aria-hidden="true" />
              </div>
              <h3>{content.featuredSkill.name}</h3>
              <p className="skill-summary">{content.featuredSkill.summary}</p>
              <p>{content.featuredSkill.detail}</p>
              <ol className="step-trail">
                {content.featuredSkill.steps.map((step, index) => (
                  <li key={step}>
                    <span>{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </section>

        <section className="section videos-section" id="videos">
          <div className="container video-card" data-reveal>
            <div className="video-mark" aria-hidden="true"><Play fill="currentColor" /></div>
            <div>
              <p className="eyebrow">{siteCopy.videos.eyebrow}</p>
              <h2>{content.videos.title}</h2>
              <p>{content.videos.description}</p>
            </div>
            <div className="camera-lines" aria-hidden="true">
              <span /><span /><span />
            </div>
          </div>
        </section>

        {content.visibility.links && content.links.length > 0 && (
          <section className="section" aria-label="Links">
            <div className="container">
              {content.links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
            </div>
          </section>
        )}

        {content.visibility.contact && content.contact.email && (
          <section className="section" aria-label="Contact">
            <div className="container"><a href={`mailto:${content.contact.email}`}>{content.contact.email}</a></div>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <strong>{content.name}<span>.</span></strong>
          <p>{siteCopy.footer.note}</p>
          <a href="#home">Back to top <ArrowUpRight aria-hidden="true" size={17} /></a>
        </div>
      </footer>
    </>
  )
}

export default App
