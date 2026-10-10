import '../life-tips/life-tips.css'
import './checkup-trip.css'

// Paste the interest form link (e.g. a Tally or Google Form asking only name,
// email and state) here to switch on the sign-up button.
const INTEREST_FORM_URL = ''

type Theme = 'light' | 'dark'
type Age = 'u40' | '40to44' | '45to49' | '50to64' | '65to74' | '75plus'
type Kind = 'core' | 'guideline' | 'discuss' | 'optional' | 'caution'
type Tier = 'Essential' | 'Standard' | 'Comprehensive'

interface Answers {
  age: Age
  sex: 'f' | 'm' | 'x'
  smoker: 'never' | 'past' | 'current'
  focus: Set<string>
  family: Set<string>
  redFlag: boolean
  insurance: 'none' | 'hdhp' | 'regular' | 'medicare'
  days: 7 | 10 | 14
}

interface Item {
  name: string
  why: string
  kind: Kind
  scope?: boolean
}

const KIND_LABELS: Record<Kind, string> = {
  core: 'Included',
  guideline: 'US guideline',
  discuss: 'Ask the doctor',
  optional: 'Optional extra',
  caution: 'Usually skip',
}

// Sample ranges in USD, to be replaced with real partner quotes.
const PRICES: Record<Tier, { china: string; us: string }> = {
  Essential: { china: '$400–$700', us: '$1,500–$3,000' },
  Standard: { china: '$800–$1,500', us: '$3,000–$6,000' },
  Comprehensive: { china: '$1,600–$2,800', us: '$6,000–$12,000' },
}

const INSURANCE_NOTES: Record<Answers['insurance'], string> = {
  none: "You'd pay cash in the US too, so you'd save the full price difference.",
  hdhp:
    'Guideline screenings are usually free in-network, even on high-deductible plans. Extras like ultrasounds, heart scans and imaging usually count toward your deductible, so that is where you save.',
  regular:
    "Many guideline screenings are already free for you in the US. You'd save mainly on extras your plan won't cover without symptoms, and you'd get everything done in days instead of months.",
  medicare:
    "Medicare generally doesn't pay for care abroad, so this would be a cash purchase. Medicare already covers many screenings at home, so compare before you decide.",
}

const AGE_ORDER: Age[] = ['u40', '40to44', '45to49', '50to64', '65to74', '75plus']
const atLeast = (age: Age, min: Age) => AGE_ORDER.indexOf(age) >= AGE_ORDER.indexOf(min)
const below = (age: Age, max: Age) => AGE_ORDER.indexOf(age) < AGE_ORDER.indexOf(max)

function buildItems(a: Answers): Item[] {
  const items: Item[] = [
    { name: 'Doctor exam and vital signs', why: 'Blood pressure, weight, and a general physical.', kind: 'core' },
    {
      name: 'Blood work',
      why: 'Blood count, cholesterol, blood sugar (A1c), liver, kidney and thyroid, plus one-time hepatitis C and HIV tests.',
      kind: 'core',
    },
    { name: 'Urine test', why: 'Kidney and urinary health.', kind: 'core' },
    { name: 'ECG', why: 'Quick baseline check of heart rhythm.', kind: 'core' },
  ]

  const female = a.sex === 'f'
  const male = a.sex === 'm'
  const smoked = a.smoker !== 'never'

  if (female && atLeast(a.age, '40to44') && below(a.age, '75plus')) {
    items.push({ name: 'Mammogram', why: 'US guidelines: every 2 years from 40 to 74.', kind: 'guideline' })
  } else if (female && a.age === 'u40' && a.family.has('breast')) {
    items.push({
      name: 'Mammogram',
      why: 'Family history may mean starting before 40. The doctor confirms.',
      kind: 'discuss',
    })
  }
  if (female && below(a.age, '65to74')) {
    items.push({ name: 'Pap / HPV test', why: 'US guidelines: cervical screening up to age 65.', kind: 'guideline' })
  }
  if (female && atLeast(a.age, '65to74')) {
    items.push({ name: 'Bone density scan', why: 'US guidelines: women 65 and older.', kind: 'guideline' })
  }

  let colonoscopy = false
  if (atLeast(a.age, '45to49') && below(a.age, '75plus')) {
    items.push({ name: 'Colonoscopy', why: 'US guidelines: colon cancer screening from 45 to 75.', kind: 'guideline', scope: true })
    colonoscopy = true
  } else if (a.family.has('colon') && below(a.age, '45to49')) {
    items.push({
      name: 'Colonoscopy',
      why: 'Family history often means starting before 45. The doctor confirms.',
      kind: 'discuss',
      scope: true,
    })
    colonoscopy = true
  }

  if (smoked && atLeast(a.age, '50to64') && below(a.age, '75plus')) {
    items.push({
      name: 'Low-dose chest CT',
      why: 'US guidelines: lung screening for people 50–80 with a heavy smoking history. The doctor confirms you qualify.',
      kind: 'guideline',
    })
  }
  if (male && smoked && a.age === '65to74') {
    items.push({ name: 'Abdominal aorta ultrasound', why: 'US guidelines: one-time check for men 65–75 who ever smoked.', kind: 'guideline' })
  }
  if (male && (a.age === '50to64' || a.age === '65to74')) {
    items.push({
      name: 'PSA blood test',
      why: 'Prostate screening has pros and cons. US guidelines say to decide with your doctor.',
      kind: 'discuss',
    })
  }

  if ((a.focus.has('heart') || a.family.has('heart')) && atLeast(a.age, '40to44')) {
    items.push({ name: 'Coronary calcium score', why: 'Low-dose scan that helps estimate heart attack risk.', kind: 'optional' })
  }
  if (a.focus.has('heart')) {
    items.push({ name: 'Heart ultrasound (echo)', why: 'Looks at heart structure and valves.', kind: 'optional' })
  }
  if (a.focus.has('general')) {
    items.push({ name: 'Abdominal ultrasound', why: 'Liver, gallbladder, kidneys and pancreas.', kind: 'optional' })
    items.push({ name: 'Thyroid ultrasound', why: 'Very common in Chinese packages. Fast and no radiation.', kind: 'optional' })
  }
  if (a.focus.has('digestive')) {
    items.push({
      name: 'Upper endoscopy (gastroscopy)',
      why: 'Routine in China and inexpensive. Worth considering if you have reflux or a family history of stomach cancer.',
      kind: 'optional',
      scope: true,
    })
    if (!colonoscopy) {
      items.push({ name: 'Colonoscopy', why: 'Can be done in the same sedation as the gastroscopy.', kind: 'optional', scope: true })
    }
  }
  if (a.focus.has('cancer')) {
    if (!smoked) {
      items.push({
        name: 'Chest CT',
        why: "Often in Chinese packages, but US guidelines don't recommend it for non-smokers because it causes frequent false alarms and adds radiation. Add only after talking with the doctor.",
        kind: 'caution',
      })
    }
    items.push({
      name: 'Tumor marker blood tests',
      why: "Not recommended for screening because they often give false alarms. We leave them out by default.",
      kind: 'caution',
    })
  }

  return items
}

function pickTier(items: Item[]): Tier {
  const hasScope = items.some((i) => i.scope)
  const extras = items.filter((i) => i.kind === 'optional' && !i.scope).length
  if (hasScope && extras >= 2) return 'Comprehensive'
  if (hasScope || extras >= 1) return 'Standard'
  return 'Essential'
}

function buildItinerary(days: Answers['days'], hasScope: boolean): string[] {
  const plan = [
    'Fly to Shanghai. Airport pickup, check in, rest.',
    'Easy day to beat jet lag: a walk along the Bund. Fast from the evening if your checkup is tomorrow.',
    'Checkup morning (about half a day) with an English-speaking escort. Afternoon free.',
  ]
  if (hasScope) plan.push('Endoscopy under sedation in the morning (prep the evening before). Rest the rest of the day.')

  const sights = [
    'Shanghai: Yu Garden, old town, French Concession.',
    'Day trip to Suzhou: classical gardens and canals.',
    'Hangzhou by high-speed train: West Lake and tea villages.',
    'Hangzhou, day two, or a slow day in Shanghai.',
    'High-speed train to Beijing.',
    'Beijing: Forbidden City and hutongs.',
    'Great Wall at Mutianyu.',
    'Beijing: Temple of Heaven and a free afternoon.',
    'Free day for shopping and rest.',
  ]
  const free = days - plan.length - 2
  plan.push(...sights.slice(0, Math.max(free, 0)))
  plan.push('Results consultation with your English report and images. Copies go to your US follow-up doctor.')
  plan.push('Fly home. Your US doctor reviews your results in a follow-up video call.')
  return plan
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

function readAnswers(form: HTMLFormElement): Answers | null {
  const data = new FormData(form)
  const required = ['age', 'sex', 'smoker', 'redflag', 'insurance', 'days']
  if (required.some((k) => !data.get(k))) return null
  return {
    age: data.get('age') as Age,
    sex: data.get('sex') as Answers['sex'],
    smoker: data.get('smoker') as Answers['smoker'],
    focus: new Set(data.getAll('focus') as string[]),
    family: new Set(data.getAll('family') as string[]),
    redFlag: data.get('redflag') === 'yes',
    insurance: data.get('insurance') as Answers['insurance'],
    days: Number(data.get('days')) as Answers['days'],
  }
}

function renderStop(): string {
  return `
    <div class="card stop">
      <h2>Please see a doctor first</h2>
      <p>
        What you're describing should be checked by a doctor at home soon, not on a trip. If
        it's urgent, call 911 or go to the nearest emergency room.
      </p>
      <p>Once you've been seen, you're welcome to come back and plan a checkup trip.</p>
    </div>`
}

function renderResult(a: Answers): string {
  const items = buildItems(a)
  const tier = pickTier(items)
  const price = PRICES[tier]
  const itinerary = buildItinerary(a.days, items.some((i) => i.scope))
  const older = a.age === '75plus'

  const rows = items
    .map(
      (i) => `
      <li class="item item-${i.kind}">
        <span class="tag">${KIND_LABELS[i.kind]}</span>
        <strong>${esc(i.name)}</strong>
        <span class="why">${esc(i.why)}</span>
      </li>`,
    )
    .join('')

  const days = itinerary.map((d, n) => `<li><strong>Day ${n + 1}.</strong> ${esc(d)}</li>`).join('')

  const cta = INTEREST_FORM_URL
    ? `<a class="primary" href="${esc(INTEREST_FORM_URL)}" target="_blank" rel="noopener noreferrer">Join the interest list</a>`
    : `<button class="primary" type="button" disabled>Join the interest list</button>
       <p class="hint">Prototype: the interest form isn't connected yet.</p>`

  return `
    <div class="card">
      <p class="eyebrow">Your match</p>
      <h2>${tier} package</h2>
      <div class="prices">
        <div><span class="price-label">Sample China price</span><span class="price">${price.china}</span></div>
        <div><span class="price-label">Similar scope in the US (cash)</span><span class="price muted-price">${price.us}</span></div>
      </div>
      <p class="hint">
        Checkup only. Flights, hotel and the guided trip are priced separately. All figures are
        illustrative and vary by hospital and city.
      </p>
      <p class="insurance-note">${esc(INSURANCE_NOTES[a.insurance])}</p>
      ${older ? '<p class="insurance-note">At 75+, we would also check with your doctor that long-haul travel is comfortable for you.</p>' : ''}
    </div>

    <h2>What it would include</h2>
    <ul class="items">${rows}</ul>

    <h2>Sample ${a.days}-day itinerary</h2>
    <ol class="itinerary">${days}</ol>

    <div class="card next">
      <h2>What happens next</h2>
      <ol>
        <li>A short call to answer your questions. No health records needed yet.</li>
        <li>A licensed US doctor reviews your history and finalizes the package.</li>
        <li>We book the hospital, hotel and guide. You just show up.</li>
        <li>After the trip, a US doctor reviews your results with you.</li>
      </ol>
      ${cta}
      <p class="hint">The interest form asks only for your name, email and state. Never health details.</p>
    </div>`
}

const form = document.getElementById('match-form') as HTMLFormElement
const result = document.getElementById('result')!
const error = document.getElementById('form-error')!

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const answers = readAnswers(form)
  if (!answers) {
    error.textContent = 'Please answer every question. The checkbox questions can be left empty.'
    error.hidden = false
    return
  }
  error.hidden = true
  result.innerHTML = answers.redFlag ? renderStop() : renderResult(answers)
  result.hidden = false
  result.scrollIntoView({ behavior: 'smooth', block: 'start' })
})

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
