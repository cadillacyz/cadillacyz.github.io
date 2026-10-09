# Ontario Market & Regulation Review — October 2026

Purpose: ground the deal-sourcing strategy in current facts before committing time and money.
Scope: Ontario, small businesses (~$250K–$1.5M SDE), operator is pre-licence for the next
few months.

> Not legal or tax advice. Items marked **(verify)** come from secondary sources and must be
> confirmed with RECO, a lawyer, or the official source before acting.

---

## 1. Key findings in one page

1. **Tariffs are escalating, not ending.** U.S.–Canada talks collapsed in late August 2026; the
   U.S. imposed 50% tariffs on many Canadian goods under Section 338; Canada retaliated with
   15–50% counter-tariffs on C$27.6B of U.S. imports from Sept 8 and suspended trade-deal
   negotiations. CUSMA was not extended at the July 1 review and now faces annual reviews.
   → Treat tariffs as a **multi-year base case**, not a short blip.
2. **Counter-tariffs + Buy Canadian create real domestic winners.** U.S. goods now cost more
   in Canada; federal Buy Canadian preferences apply to procurements ≥$5M since June 2026;
   BDC launched a $6B Defence Platform for SMEs; Ontario's Together Trade Fund is $150M for
   reshoring/interprovincial expansion.
3. **Ontario's population is shrinking** (−0.9% in the 12 months to April 2026), driven by
   fewer temporary residents and international students. Businesses that depend on
   population growth or on students/temporary residents are structurally weaker.
4. **Financing is reasonable.** Bank of Canada rate held at 2.25% (Sept 2026) — far cheaper
   than 2023–24, which helps buyers. Inflation ticked up to 3% (gasoline-driven).
5. **Seller supply is large and getting more motivated.** ~$2T of business assets in
   play over a decade; only ~9% of owners have a formal succession plan; small-business
   sales growth fell sharply in late 2025; small firms are the least optimistic. Business
   insolvencies are *not* surging (−7.5% y/y in Q1 2026) — this is a motivated-seller
   market, not a fire sale.
6. **Exit alternatives for sellers improved.** The $10M Employee Ownership Trust capital
   gains exemption was made permanent (Bill C-30, June 2026) **(verify)**. The Lifetime
   Capital Gains Exemption is ~$1.25M+ (2026 indexed figure — **verify**).
7. **Immigration-driven buyers are shrinking.** All old OINP streams, including
   Entrepreneur, were revoked May 30, 2026; a redesigned stream is not confirmed open.
   Do not build the buyer pipeline around immigration buyers.
8. **Licensing gap is real and binding.** Until registered with RECO, you should not take
   any deal-contingent pay or act for buyers/sellers. Referral fees generally flow only
   between registered brokerages **(verify)**.

---

## 2. Tariffs: what the evidence says vs. "it won't last long"

| Fact | Source |
|---|---|
| CUSMA not extended July 1, 2026; annual reviews; agreement runs to 2036 unless terminated | Global Affairs Canada, White & Case, RBC |
| Late Aug 2026: talks collapse; U.S. 50% tariffs (Section 338) | PBS, NPR |
| Canada counter-tariffs 15/25/50% on C$27.6B from Sept 8; $7.5B support package | Finance Canada |
| Canada suspended comprehensive trade-deal talks | CBC, PBS |
| Bank of Canada: GDP ~1.5% below pre-tariff path by end-2026 | Bank of Canada MPR |

**Implication.** It may still end sooner than expected — politics can turn fast (e.g. after
U.S. midterms). But the scoring engine should **not** assume it. Suggested starting scenario
weights for `config/scenarios.yaml` (operator can change):

| Scenario | Weight |
|---|---|
| Tariffs substantially removed within 12 months | 20% |
| Persist 1–3 years at roughly current levels | 50% |
| Escalate further | 30% |

Your view that tariffs are temporary becomes an **opportunity filter**, not a blanket
assumption: look for strong businesses priced as if tariffs were permanent.

---

## 3. Where the opportunity is now (ranked)

### Tier 1 — benefits from tariffs / downturn, or immune

| Niche | Why now | Watch-outs |
|---|---|---|
| **Distributors & wholesalers of Canadian-made or non-U.S. goods** (industrial supplies, packaging, building products, food ingredients) | Counter-tariffs make U.S. competitors' goods 15–50% dearer; buyers switching suppliers | Check if *their* inputs come from the U.S. (they'd be hurt too) |
| **Repair, refurbishment, used equipment** (industrial equipment repair, commercial refrigeration, appliance/auto repair, used machinery dealers) | Tariffs raise cost of new equipment → fix instead of replace; downturn reinforces this | Parts availability if parts are U.S.-sourced |
| **Customs brokerage, trade compliance, freight forwarding** | Tariff complexity and trade diversification (EU/Asia) drive demand | Some volume tied to cross-border flows that are shrinking |
| **Defence & government supply chain** (machine shops, fabricators, electronics assembly with quality certs / Controlled Goods registration) | BDC $6B Defence Platform; Defence Investment Agency; Buy Canadian preferences | Must not depend on U.S. exports; certifications take time; lumpy contracts |
| **Mandated inspection & compliance** (fire/life safety, backflow, elevator, environmental testing, commercial pest control) | Legally required, recurring, non-discretionary | Licensing transferability; some U.S.-style roll-up interest beginning |
| **Aging-population health services** (home care, physio/rehab, hearing, mobility aids) | Demographics + public/insurance funding | Regulatory and staffing intensity |
| **Insurance-funded restoration** (water/fire damage, auto body) | Payer is the insurer, not the squeezed consumer | Insurer panel relationships must transfer |

### Tier 2 — stable, check details

- **Payroll/HR/compliance services for small businesses** — steady demand; prefer over
  basic bookkeeping, which carries AI-disruption risk.
- **Education & tutoring serving permanent-resident families** — resilient spending; avoid
  businesses dependent on international students.
- **Food processing / co-packing for Canadian brands** — benefits from "buy Canadian"
  consumer sentiment; check U.S. input exposure.

### Avoid (for now)

- Manufacturers exporting to the U.S. — auto parts, steel, aluminum, lumber.
- Cross-border trucking.
- Businesses relying on international students or temporary residents (student housing
  services, ESL schools, some immigration-adjacent services, campus-area food).
- Discretionary consumer (restaurants, luxury, renovation tied to housing).
- Businesses whose main inputs are now counter-tariffed U.S. goods.

**For the Chinese-community focus specifically:** the shrinking international-student and
temporary-resident population hurts many newer Chinese-community consumer businesses.
Favour established B2B businesses and services for settled families; that is where both
the quality and the retiring owners are.

---

## 4. Regulation that binds you

### 4.1 Licensing (TRESA / RECO)
- Trading in real estate without registration is an offence; most business sales involve
  a lease assignment or property, which brings them under TRESA **(verify scope with RECO)**.
- You cannot register independently; a registered brokerage must sponsor you.
- Referral fees/remuneration generally only flow between registered brokerages; paying an
  unregistered "bird dog" for leads is not permitted **(verify)**.
- Education: Humber Salesperson Program — Pre-Registration ~ $4,110 (5 courses, 4 exams,
  2 simulations), Post-Registration ~ $655; typical completion 4–6 months, max 24;
  all-in incl. registration and insurance roughly $7.5K–$10K **(verify current fees — program
  was updated)**. Post-registration courses due within 24 months of registering.

### 4.2 What you can likely do *before* you are registered (confirm with a lawyer)
| Activity | Likely OK? | Notes |
|---|---|---|
| Build the AI tool, collect public data, model markets | Yes | Respect source ToS and PIPEDA |
| Publish research (succession report, price data) | Yes | Content marketing; builds inbound |
| Survey owners for research ("succession survey") | Probably | Must be genuine research — not soliciting listings or representing anyone |
| Work at a brokerage as a salaried/hourly analyst or assistant | Yes, within limits | No trading activities; no commission |
| Sell flat-fee data/analytics to brokerages or buyers | Unclear | Lead lists of specific sellers may be "acts in furtherance of a trade" — **ask a lawyer** |
| Exit-readiness / valuation analysis for owners, flat fee | Probably | Can't use "CBV" title; avoid advising on the sale transaction itself |
| Introduce buyer to seller, negotiate, take a success fee | **No** | Wait for registration |

### 4.3 Outreach (CASL / PIPEDA)
- CASL's business-to-business exemption is narrow (requires a real relationship between
  the organizations); "conspicuous publication" requires the message to match the
  recipient's published role (*CompuFinder v. CRTC*, FCA 2020).
- → Keep owner outreach to **mail and phone**; email only with consent or a clearly
  relevant published-address basis, always with a working single unsubscribe.

### 4.4 Other regulation to build into diligence
- FINTRAC: identity and source-of-funds checks once registered.
- Ontario ESA successor-employer rules (employee service may carry over).
- Environmental (Phase I ESA for higher-risk sites).
- Investment Canada Act (rarely triggered at this size; check foreign buyers).
- Immigration: OINP Entrepreneur stream revoked May 30, 2026 — never market a business as an
  immigration pathway.

---

## 5. Revised 6-month plan (pre-licence period)

| Month | Licensing | Product | Market |
|---|---|---|---|
| 0 | Email RECO (scope of "trade" for business sales; pre-registration limits; referral rules). 1-hour lawyer consult on §4.2. Enroll at Humber. | Give Codex the build plan; start M0–M3 + M12 (resilience) | Pick 2 Tier-1 niches × 2 regions |
| 1–2 | Courses 1–2 | Ingestion, scoring, resilience scores for chosen niches | Approach 5–8 brokerages for sponsorship + part-time analyst role |
| 2–3 | Courses 3–4 | Listings + pricing model (M8–M9) | Run a genuine *succession survey* to ~300 owners (mail) |
| 3–4 | Course 5, exams | Succession report (M10) | Publish bilingual report; media/LinkedIn/RedNote/WeChat |
| 4–6 | Register with RECO under sponsoring brokerage | Outreach letters (M5) | Convert warm survey relationships into listing conversations |

**Kill / pivot criteria (decide at month 4):** if survey response < 1%, or no brokerage willing
to sponsor and use the tool, revisit the niche or the model (e.g. pure data/analytics business
for brokerages).

---

## 6. Open questions to resolve

1. RECO: does a share/asset sale with **no** lease or property require registration?
2. Lawyer: can a flat-fee seller-lead list be sold pre-registration?
3. Humber: current program fees and timeline after the 2025 update.
4. CRA: exact 2026 LCGE amount; EOT conditions under Bill C-30.
5. Ontario: status of the redesigned OINP Entrepreneur stream (only to avoid misleading buyers).

---

## Sources

- Global Affairs Canada — CUSMA news: https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/cusma-aceum/news-nouvelles.aspx?lang=eng
- Statement following CUSMA joint review (Jul 2026): https://www.canada.ca/en/global-affairs/news/2026/07/statement-by-minister-leblanc-following-trilateral-cusma-joint-review-meeting.html
- White & Case — USMCA 2026 Joint Review: https://www.whitecase.com/insight-alert/usmca-2026-joint-review-united-states-declines-extend-agreement-triggering-annual
- RBC — Navigating the CUSMA Joint Review: https://www.rbc.com/en/economics/canadian-analysis/featured-analysis/insights/navigating-the-cusma-joint-review-where-we-go-from-here/
- Bank of Canada — CUSMA review (MPR Jan 2026): https://www.bankofcanada.ca/publications/mpr/mpr-2026-01-28/in-focus-2/
- The Hub — CUSMA deadline passed: https://thehub.ca/2026/07/02/cusma-renewal-deadline-passed-u-s-tariffs-remain-what-it-means-for-canada-and-its-economy/
- PBS — talks collapse, new tariffs: https://www.pbs.org/newshour/world/u-s-imposes-50-tariffs-on-20-billion-worth-of-canadian-products-canada-says-it-will-retaliate
- NPR — Canada hits back: https://www.npr.org/2026/08/25/nx-s1-5944240/canada-us-tariffs
- Finance Canada — countermeasures (Aug 2026): https://www.canada.ca/en/department-finance/news/2026/08/canada-announces-targeted-countermeasures-and-substantive-support-for-workers-and-businesses-in-response-to-us-tariffs.html
- Bank of Canada — Sept 2026 rate announcement: https://www.bankofcanada.ca/2026/09/bank-of-canada-interest-rate-announcement-2026-09-2/
- CTV — BoC holds at 2.25%: https://www.ctvnews.ca/business/article/bank-of-canada-holds-key-rate-at-225-once-again/
- Toronto Life — Ontario population decline: https://torontolife.com/city/canadas-population-declined-last-year-and-ontario-felt-it-hard/
- Global News — population decrease: https://globalnews.ca/news/11736461/canadian-population-decreases-2026-statcan/amp/
- CFIB — $2T succession: https://www.cfib-fcei.ca/en/media/over-2-trillion-in-business-assets-are-at-stake-as-majority-of-small-business-owners-plan-to-exit-their-business-over-the-next-decade
- Xero Small Business Index (Mar 2026): https://www.xero.com/us/media-releases/canada-xsbi-march-2026/
- StatCan — small businesses Q2 2026: https://www150.statcan.gc.ca/n1/pub/11-621-m/11-621-m2026008-eng.htm
- MPA — insolvency filings: https://www.mpamag.com/ca/mortgage-industry/industry-trends/insolvency-filings-push-canada-toward-a-historic-breaking-point/585757
- Bennett Jones — EOT exemption permanent: https://www.bennettjones.com/Insights/Blogs/2026/07/Capital-Gains-Exemption-Made-Permanent-for-Employee-Ownership-Trusts
- KPMG — OINP streams revoked: https://kpmg.com/xx/en/our-insights/gms-flash-alert/2026/flash-alert-2026-139.html
- Clark Hill — OINP redesign: https://www.clarkhill.com/news-events/news/canada-oinp-streams-revoked-program-redesign/
- Buy Canadian Policy (newswire): https://www.newswire.ca/news-releases/government-of-canada-implements-buy-canadian-policy-to-strengthen-canada-s-economy-and-support-homegrown-industries-880455439.html
- Fasken — Canada 2026: https://www.fasken.com/en/knowledge/2026/03/canada-2026-all-canada-all-the-time
- PSPC — small business procurement (Jul 2026): https://www.canada.ca/en/public-services-procurement/news/2026/07/simplifying-federal-procurement-for-canadian-small-businesses.html
- Ontario Together Trade Fund: https://www.ontario.ca/page/ontario-together-trade-fund-program-guidelines
- Desjardins — Ontario outlook: https://coop.desjardins.com/content/dam/pdf/en/personal/savings-investment/economic-studies/ontario-economic-outlook-27-november-2025.pdf
- RECO — becoming an agent: https://www.reco.on.ca/agents-and-brokerages/becoming-a-real-estate-agent/
- Humber — become a salesperson: https://humber.ca/realestate/become-a-salesperson.html
- Crossbridge Business Brokers FAQ (TRESA & business sales): https://crossbridgebb.com/faq.html
- Referral agents (blog, TRESA referral rules): https://filipesells.ca/what-is-a-referral-agent-in-real-estate-agent/
- Torys — CASL / CompuFinder: https://www.torys.com/insights/publications/2020/06/fca-confirms-casl-is-constitutional-but-limits-business-communications-exemption
