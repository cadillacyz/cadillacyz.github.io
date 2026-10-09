# Sourcing Playbook: Situations, Red Flags, and Scenarios

Companion to `deal-sourcing-build-plan.md`. This is the rulebook the scoring engine and the
operator follow. Every situation below should map to a **signal** (how we detect it), a
**tag** stored on the business, and an **action** (what we do about it).

---

## 1. Principle: separate *temporary shocks* from *structural problems*

A business hit by a temporary shock (tariffs, a bad year, a road closure) can be a **bargain**.
A business with a structural problem (shrinking market, disrupted by AI, lease ending) is a
**trap**. The engine must never treat one as the other.

- Value businesses on **normalized earnings**: weighted 3–5 year average SDE, with the
  shock year flagged and explained, not on the latest year alone.
- Tag every negative signal as `transitory`, `structural`, or `unknown`.
- `transitory` + good fundamentals → **opportunity** (owner is discouraged, price is depressed).
- `structural` → down-rank or exclude, regardless of how cheap it looks.

### Tariffs specifically
Tariffs may well be temporary, but the timing is uncertain (CUSMA review, politics). So we
**do not exclude** tariff-exposed businesses. We model them with operator-set scenarios:

| Scenario | Example probability (operator sets) | Effect on exposed firm's earnings |
|---|---|---|
| Tariffs removed within 12 months | 20% | Back to normalized earnings |
| Tariffs persist 1–3 years | 50% | Earnings stay depressed, then recover |
| Tariffs escalate | 30% | Further decline; some firms fail |

Weights updated Oct 2026 after the August talks collapse and 50% U.S. tariffs — see
`market-and-regulation-review-2026-10.md`. Also model the **upside** side: Canadian
counter-tariffs (15–50% on many U.S. goods) favour domestic substitutes.

The engine reports an **expected value and a downside case** for exposed businesses. A
tariff-hit business whose price already reflects the bad scenario is a buy signal, not a
red flag. Buyers hold 5–10+ years; a 1–2 year shock matters less than the price paid.

---

## 2. Seller situations (why they are selling)

The reason drives urgency, price flexibility, tone of outreach, and sensitivity.

| Situation | Signals | Action |
|---|---|---|
| Planned retirement | Business age 25+, owner tenure, stale website, "since 19xx" | Standard letter; patient follow-up over months |
| Health crisis / death of owner | Reduced hours, "temporarily closed", obituary, estate/executor contact | Very gentle approach to family/executor; never aggressive; often fast timeline |
| Burnout / fatigue | Declining reviews about service, reduced hours, owner posts | Emphasize easy transition; seller financing to keep them engaged |
| Partner dispute / divorce | Change in registered officers, legal notices | Confidential; may require both parties' consent; deal can collapse |
| Financial distress | Tax liens, CRA arrears, lawsuits, unpaid supplier complaints | Possible bargain but high risk; involve lawyer early; check liens (PPSA search) |
| Owner relocating / returning to home country | Community word-of-mouth, listing language | Time pressure → good price; ensure proper transition period |
| Next generation declined | Children in other professions | Most common succession case; owner wants legacy preserved |
| "Testing the market" | Unrealistic price, no urgency | Low priority; check back in 6–12 months |

---

## 3. Business situations (red flags and their fixes)

| Area | Red flag | How detected | Treatment |
|---|---|---|---|
| **Owner dependence** | Owner is the only salesperson/technician/licence holder | Website names only owner; reviews mention owner by name | Longer transition, earn-out, retention bonus for staff |
| **Customer concentration** | One customer >20–25% of revenue | Diligence (customer list) | Price discount, earn-out tied to retention |
| **Key employee** | One person runs operations | Diligence interviews | Retention agreement before closing |
| **Lease** | <5 years left, no renewal option, demolition/redevelopment clause, landlord consent needed | Lease review | Get lease extension/assignment as a closing condition |
| **Licences/permits** | Not transferable (e.g. certain inspection, liquor, health licences) | Regulator rules per niche | Buyer must qualify; build into timeline |
| **Environmental** | Dry cleaners, auto repair, gas, metal finishing, printing | NAICS code | Phase I Environmental Site Assessment required; can kill deals |
| **Real estate** | Owned vs leased; property worth more than business | Title search | Separate valuation; may sell property separately or lease back |
| **Equipment / capex** | Old equipment, deferred maintenance | Diligence, site visit | Adjust price for upcoming capex |
| **Unreported income** | "It makes more than the books show" | Seller statements; cash-heavy niche | **Only value reported, documented income.** Never help misrepresent; banks won't lend on it |
| **Tax / liens** | CRA arrears, HST problems, PPSA liens | PPSA search, tax clearance | Asset sale or holdback; lawyer handles |
| **Litigation / WSIB** | Pending claims | Court search, WSIB clearance | Indemnity, holdback |
| **Franchise** | Franchisor approval, transfer fee, right of first refusal | Franchise agreement | Check early — franchisor can block or take the deal |
| **Unionized workforce** | Collective agreement | Diligence | Agreement transfers with the business; factor in |
| **Employees on sale** | Ontario ESA successor-employer rules (service may carry over) | Employee list, tenure | Account for severance liability in price |
| **Supplier / platform dependence** | One supplier, one marketplace (e.g. Amazon), one licence | Diligence | Discount; diversification plan |
| **Seasonality** | Big swings by month | Monthly revenue | Value on 12-month trailing; plan working capital |
| **Declining trend** | Revenue down 3+ years with no transitory cause | Financials, review volume trend | Structural → exclude unless turnaround thesis |
| **AI / technology disruption** | Translation, basic bookkeeping, print shops, travel agencies, some call-centre work | Niche classification | **Disruption risk score**; heavy discount or exclude. Conversely, businesses where AI *cuts the buyer's costs* score higher |

---

## 4. Macro situations (Ontario-specific, 2026)

| Factor | Why it matters | How the engine handles it |
|---|---|---|
| Tariffs | Hits manufacturing, auto, steel, cross-border trucking | Scenario model (section 1); normalized earnings |
| Interest rates | Determines buyer financing capacity → price | Debt-service coverage check at current rates in valuation |
| Population growth slowing (immigration cuts) | Lowers demand for consumer-facing and rental-heavy businesses | Down-weight niches dependent on population growth |
| Housing slowdown, mortgage renewals | Squeezes household spending; hurts renovation, furniture, discretionary | Consumer-discretionary flag |
| Minimum wage / labour costs | Hurts labour-heavy, low-margin businesses | Labour-cost share by niche |
| Regulatory change | E.g. inspection rules, licensing changes | Niche config notes, reviewed quarterly |

Data sources for these: Statistics Canada (input-output tables for trade exposure; industry
revenue for cyclicality in 2008–09 and 2020), Ontario FAO reports, Bank of Canada.

---

## 5. Deal-structure situations

| Situation | What to know |
|---|---|
| **Asset vs share sale** | Sellers prefer share sales (Lifetime Capital Gains Exemption on qualified small business shares). Buyers prefer asset sales (step-up, fewer hidden liabilities). Price differs by structure — model both. |
| **Seller financing (vendor take-back)** | Essential when banks are strict. Typical 10–30% of price. Keeps seller invested in transition. |
| **Earn-out** | Bridges price gaps when future is uncertain (e.g. tariff-exposed). |
| **Transition period** | 3–12 months of seller support; written into agreement. |
| **Non-compete / non-solicit** | Must be reasonable to be enforceable; get legal advice. |
| **Working capital** | Define what stays with the business (inventory, receivables). |
| **Financing available** | BDC, bank loans, Canada Small Business Financing Program (asset purchases), seller financing. |

---

## 6. Buyer situations

| Situation | Treatment |
|---|---|
| First-time buyer | Needs education; slower; higher fall-through risk |
| Experienced operator / holdco | Faster, more reliable; prioritize |
| Financing not confirmed | Pre-qualify before introductions |
| Overseas funds | FINTRAC KYC and source-of-funds verification before any match |
| Immigration-motivated | Do not present businesses as immigration pathways; refer to licensed consultants |
| Foreign buyers | Investment Canada Act notification may apply; rarely an issue at small size but check |

---

## 7. Ethics and compliance situations

| Situation | Rule |
|---|---|
| Elderly seller with signs of cognitive decline | Stop; involve family/power of attorney and their lawyer. Never pressure. |
| Representing both buyer and seller | TRESA rules on multiple representation apply — written consent, disclosure. |
| Confidentiality | Never reveal a seller's identity before NDA + owner consent. |
| Deceased owner | Outreach only through executor/family, with care and delay. |
| Do-not-contact requests | Honored immediately and permanently. |

---

## 8. Data-quality situations (false positives)

| Problem | Check |
|---|---|
| Business already sold / closed | Google "permanently closed", recent registry changes, phone disconnected |
| Owner is actually young (website old because they don't care) | Recent ownership change, new officers in registry |
| Duplicate businesses / multiple locations | Entity resolution; group locations under one owner |
| Franchise location (owner can't freely sell) | Brand-name matching against franchise list |
| Subsidiary of a larger company | Registry parent; exclude |
| Home-based / sole proprietor too small | Size estimate below threshold → exclude |

---

## 9. How this changes the score

Final ranking = **Retirement likelihood × Quality × Resilience**, with hard exclusions:

- **Resilience score (new):** recession resistance (cyclicality), tariff scenario expected
  value, AI disruption risk, population-sensitivity, labour-cost share.
- **Hard exclusions:** franchise locations (unless franchisor-friendly), subsidiaries,
  closed/sold, structural decline, do-not-contact.
- **Opportunity boost:** good fundamentals + transitory shock (e.g. tariff-hit but
  normalized earnings healthy) → flagged `depressed_value_opportunity`.
