import { Marked } from 'marked'
import guide from '../../content/how-to-live-better.md?raw'
import './life-tips.css'

type Theme = 'light' | 'dark'

// Same slug rules as GitHub, so the guide's #anchors work on both.
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s/g, '-')
}

const marked = new Marked({
  gfm: true,
  renderer: {
    heading({ tokens, depth, text }) {
      const id = slugify(text)
      return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`
    },
    link({ href, title, tokens }) {
      const label = this.parser.parseInline(tokens)
      const external = /^https?:\/\//.test(href)
      const titleAttr = title ? ` title="${title}"` : ''
      const target = external ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${href}"${titleAttr}${target}>${label}</a>`
    },
  },
})

const root = document.getElementById('guide')!
root.innerHTML = marked.parse(guide) as string

const toggle = document.querySelector<HTMLButtonElement>('.theme-toggle')!

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#071427' : '#f7fbff')
  toggle.textContent = theme === 'dark' ? 'Light' : 'Dark'
  toggle.setAttribute('aria-label', theme === 'dark' ? 'Use light theme' : 'Use dark theme')
}

const saved = window.localStorage.getItem('joe-theme')
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
applyTheme(saved === 'light' || saved === 'dark' ? saved : systemDark ? 'dark' : 'light')

toggle.addEventListener('click', () => {
  const next: Theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
  window.localStorage.setItem('joe-theme', next)
  applyTheme(next)
})

if (window.location.hash) {
  document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView()
}
