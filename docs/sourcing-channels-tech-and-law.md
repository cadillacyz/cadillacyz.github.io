# Sourcing Channels, Technology, and What the Law Allows (Ontario)

Companion to `deal-sourcing-build-plan.md`, `sourcing-playbook.md`, and
`market-and-regulation-review-2026-10.md`.

Legend: ✅ allowed (follow the notes) · ⚠️ allowed with conditions / grey area — get advice ·
❌ do not do it.

> Not legal advice. Items marked **(verify)** rest on secondary sources; confirm with a lawyer,
> RECO, the CRTC, or the Office of the Privacy Commissioner (OPC) before relying on them.

---

## 1. Seven rules that decide almost everything

1. **Business data is easy; personal data is regulated.** Facts about a *business* (name,
   address, licence date, products) are low-risk. Facts about a *person* (age, health,
   family, ethnicity, home address) fall under PIPEDA and need an appropriate purpose and
   usually consent.
2. **"Public on the internet" ≠ "publicly available" under privacy law.** The OPC (Clearview
   AI findings, 2021) and BC and Alberta courts read the exception narrowly: directories,
   registries, and traditional publications — **not** social media or general web content.
3. **Platform Terms of Service are contracts.** If a site forbids scraping (LinkedIn,
   RedNote/Xiaohongshu, WeChat, Facebook, BizBuySell, etc.), use it manually or not at all.
4. **Outreach channels have their own laws.** Email → CASL. Phone → CRTC Unsolicited
   Telecommunications Rules. Mail → largely unrestricted (still no deception).
5. **Until you are RECO-registered, you don't "trade."** No acting for a buyer or seller, no
   negotiating, no deal-contingent pay. Once registered, all advertising (including RedNote
   posts) must clearly and prominently name your brokerage.
6. **Never target by inferred ethnicity, age, or health.** Don't build models that guess a
   person's ethnicity from their name, or their health from obituaries/court records. Use
   business-level signals and self-declared preferences.
7. **Consent unlocks the best data.** With the owner's written consent you can connect to
   their accounting system, bank feeds, and documents — far better than anything scraped.

---

## 2. Channel catalogue

### A. Open government data — the backbone (✅)

| Source | What it gives | Signal | Tech | Status |
|---|---|---|---|---|
| **City business-licence open data** (e.g. Toronto Municipal Licensing & Standards; check Ottawa, Mississauga, Hamilton, etc.) | Operating name, category, address, **issue date**, cancel date | Business age; closures | CSV/API → ingest | ✅ Open Government Licence — follow attribution |
| **Corporations Canada (federal)** | Federal corps: incorporation date, status, directors | Age; officer changes | Open data / per-company lookup | ⚠️ Terms reportedly prohibit *systematic bulk downloading* of the search tool — use official open-data files only **(verify)** |
| **Ontario Business Registry** | Ontario corps: status, officers, filings | Age; officer/ownership changes | Free basic search; paid profile reports (~$8); authorized-integrator APIs | ⚠️ No confirmed bulk download — per-company lookups for shortlisted targets only; read OBR terms |
| **StatCan Open Database of Businesses** | Business names/addresses/NAICS (some municipalities) | Universe building | Open data | ✅ |
| **Canadian Importers Database (ISED / CBSA)** | Major importers by product (HS code), city, country of origin | Who imports from the U.S. (now counter-tariffed → hurt) vs. from elsewhere; distributor discovery | Open data | ✅ |
| **CanadaBuys contract history / award notices** | Federal contract winners, values, dates | Government/defence suppliers (Buy Canadian beneficiaries); revenue quality | Open data CSV | ✅ |
| **Ontario Tenders Portal / municipal awards** | Provincial/municipal suppliers | Same as above | Manual / open data where offered | ✅ (check terms) |
| **CIPO trademark database** | Trademark owners, filing & first-use dates | Brand age; owner entity | Open data bulk | ✅ |
| **Licensing-body public registers** — TSSA (elevators, boilers, fuels), Electrical Safety Authority (licensed electrical contractors), and similar bodies | Licensed contractors | Niche universe for mandated-service businesses; licence holder = key person | Public search; manual or permitted export | ⚠️ Check each register's terms before automating |
| **PPSA search (Ontario)** | Registered liens on business assets | Distress; financing structure | Paid per search | ✅ For shortlisted targets / diligence |
| **Court and tribunal records** | Business litigation | Risk flag | Manual | ✅ Business disputes only; ❌ don't mine for personal health/family matters |
| **Internet Archive (Wayback CDX API)** | First-seen date of a website | Business age; staleness | API, polite rate | ✅ |

### B. Commercial data (✅/⚠️ — read the licence)

| Source | Use | Status |
|---|---|---|
| Google Places API | Name, category, ratings, review count, hours, website | ⚠️ You may cache `place_id`; other content has caching limits — store derived scores, re-fetch details when needed **(verify current Places caching policy)** |
| OpenStreetMap (Overpass) | Business points of interest | ✅ ODbL — attribution; share-alike applies to derived *databases* |
| Private-company databases (Grata, Inven, D&B, etc.) | Firmographics, size estimates | ✅ Within licence; check Canadian coverage |
| B2B contact data (Apollo, ZoomInfo) | Business emails/phones | ⚠️ Having an email ≠ CASL consent; use for **mail/phone**, not cold email |
| **Consumer data brokers / age-append services** | Owner age, household data | ❌ for this purpose — sensitive personal profiling; poor PIPEDA purpose fit |

### C. Platforms with restrictive terms — manual only

| Platform | Legitimate use | Do not |
|---|---|---|
| **RedNote (Xiaohongshu)**, WeChat, Facebook groups, LinkedIn | Post your own content; read; respond to inbound; manually note public *business* listings | ❌ Automated scraping; ❌ harvesting personal profiles; ❌ bulk DMs |
| BizBuySell, BusinessesForSale, broker sites | Manual review; manual CSV of key fields for market statistics | ❌ Scraping where the terms forbid it |
| 51.ca, Yorkbbs (生意转让) | Market price data | ⚠️ Automate **only** if terms and `robots.txt` permit; otherwise manual import |
| Google Street View / imagery | Look at a storefront manually | ❌ Automated download or ML on imagery (Maps terms) |
| Online reviews (Google/Yelp) | Counts and ratings via official APIs | ❌ Scraping review text at scale outside the API; ❌ ever writing fake reviews |

### D. Relationship channels — where most good deals come from (✅)

Owners tell their **trusted advisors** before anyone else. Build referral relationships with:

| Partner | Why they know first | How to engage | Legal note |
|---|---|---|---|
| Accountants / CPAs (esp. Chinese-speaking CPAs in Markham, Richmond Hill, Scarborough) | Owners discuss retirement at tax time | Co-host succession seminars; give them your research report | ⚠️ Pre-registration: no lead payments to or from them; post-registration: referral fees only within TRESA rules |
| Estate & business lawyers | Wills, shareholder agreements, estate sales | Same | Same |
| Bankers and BDC account managers | Loan renewals for older owners | Share market data | Same |
| Wealth managers, insurance advisors | Retirement planning, buy-sell agreements | Joint client events | Same |
| **Commercial landlords** | Know whose lease is ending and who won't renew | Offer tenant-succession help that keeps their units leased | ✅ |
| Suppliers' sales reps and distributors | Know which customers are winding down | Relationship over coffee | ✅ |
| Industry associations & trade shows | Concentrations of owners | Speak, sponsor, publish data | ✅ |
| Chinese business associations and chambers in the GTA | Trust network for Chinese-speaking owners | Bilingual seminars on succession, tax and Employee Ownership Trusts | ✅ |
| **Business brokers (incl. RedNote brokers)** | Unsold or expired listings, buyers looking | See §7 | ⚠️ See §7 |

### E. Inbound channels — owners and buyers come to you (✅)

| Channel | Tech | Legal note |
|---|---|---|
| **Bilingual succession report** (annual) | Pipeline M10 | ✅ Cite data honestly |
| RedNote / WeChat Official Account / LinkedIn / YouTube content | AI-assisted drafting; *you* review every post | ✅ Pre-registration: education only, no listings. Post-registration: brokerage name in every post (RECO advertising rules) |
| **"What's my business worth?" estimator** on your website | Pricing model (M9) behind a form | ⚠️ Privacy policy, explicit consent checkbox, CASL consent for follow-up email; label it an estimate, not an appraisal |
| Owner succession survey | Mail + online form | ✅ Must be genuine research; disclose who you are and why |
| Seminars/webinars with CPAs and lawyers | — | ✅ |
| Buyer intake form (criteria, financing, language) | Dashboard M6 | ✅ Consent + KYC once registered |

### F. Owner-consented data — diligence superpowers (✅ with written consent)

| Data | Tech | Benefit |
|---|---|---|
| Accounting systems (QuickBooks, Xero, Sage) | Read-only API connection, owner-authorized | Real financials in hours; auto-normalized SDE |
| Bank transactions | Open-banking aggregator with owner consent | Verifies revenue; catches inflated books |
| Tax returns, financial statements, leases, contracts | Document AI (LLM extraction) into the data room | Red-flag report in minutes |
| Customer/supplier lists | Secure virtual data room | Concentration analysis |

Store in a secure data room (access logs, watermarking, Canadian or disclosed hosting). Do not
put client financials into consumer chat apps, including WeChat.

---

## 3. Signals the AI can use — and how to get each one lawfully

| Signal | Lawful source |
|---|---|
| Business age | Licence issue date, incorporation date, trademark first-use, Wayback first-seen, "since 19xx" on the business's own site |
| Owner tenure | Officer/director history in corporate registries (business filings) |
| Website staleness | Your crawler on the business's own site (respect `robots.txt`) |
| Succession intent | Owner's own statements, survey replies, referrals, a hiring post for a "general manager" read manually |
| **Expired / withdrawn listings** (tried to sell, didn't) | Your own historical record of listings collected lawfully, plus broker partners — very strong motivation signal |
| Tariff exposure | Canadian Importers Database (country of origin) + StatCan input-output tables by industry |
| Government revenue | CanadaBuys and Ontario tender awards |
| Distress | PPSA liens; licence cancellations; "permanently closed" status (business-level) |
| Customer base size | Review counts via official APIs |
| Licence-dependent key person | Public licensing registers (business-level use only) |

**Signals not to use:** guessed personal age or ethnicity from names or photos; health
(illness, obituaries) for targeting; family-court records; scraped personal social profiles;
purchased consumer data.

Exception, by hand only: if an owner has died and the business is in an estate, you may
respectfully contact the executor or the estate's lawyer, found via business channels.
Never automate this.

---

## 4. Outreach: what is allowed

| Method | Status | Conditions |
|---|---|---|
| **Personalized letters (mail)** | ✅ Primary channel | Truthful; identify yourself; opt-out honoured; once registered, include brokerage name |
| **Live phone calls by you** | ✅/⚠️ | Follow CRTC Telemarketing Rules: identify yourself, reasonable hours, keep an internal do-not-call list. Whether the National DNCL applies to calls to businesses — **(verify)** |
| **AI voice agents / robocalls / pre-recorded messages** | ❌ | Automatic dialing-announcing devices need **prior express consent**; regulators are moving to treat AI voices the same way (CRTC consultation 2026-132) |
| **Cold email** | ⚠️ Mostly avoid | CASL B2B exemption is narrow (needs a real relationship); "conspicuous publication" only if the message fits the recipient's published role (*CompuFinder*, 2020). One working unsubscribe link, clear identification |
| Email after consent (form, survey opt-in, card exchanged with permission) | ✅ | Keep consent records |
| RedNote / WeChat DMs | ⚠️ | Manual, personal, low volume; no bulk automation (platform terms); no listings before registration |
| Recording / AI-transcribing calls and meetings | ⚠️ | Tell participants at the start, state the purpose, store securely |
| Door-to-door visits to businesses | ✅ | Courteous; leave literature |
| Paid ads (Google, Meta, RedNote) | ✅ | No discriminatory targeting; once registered, brokerage name in the ad |

---

## 5. Technology stack by stage

| Stage | Tech |
|---|---|
| Universe building | Open-data ingesters (CSV/API), Google Places API (within terms), Overpass, ISED importer data, CanadaBuys data |
| Entity resolution | `rapidfuzz`, address normalization (postal code), phone E.164; PostGIS for geography |
| Enrichment | Polite async crawler (`httpx`, `robots.txt`), Wayback CDX, LLM extraction (Claude) of business-level facts |
| Scoring | Hazard/survival models (`lifelines`), pricing regression (`statsmodels`), resilience score (StatCan tables), explainable reasons |
| Market data | Lawful listing collection + LLM normalization (EN/中文) |
| CRM & compliance | Pipeline, do-not-contact list, consent records, append-only audit log (build plan) |
| Outreach | Jinja2 + WeasyPrint letters; print-and-mail API (e.g. PostGrid); call logging; no auto-dialers |
| Content | AI drafts in EN/中文 → human edit → post; report generator (M10) |
| Diligence (with consent) | Accounting-system APIs, open-banking aggregator, document AI, virtual data room, e-signature for NDAs |
| Security | Encryption at rest, role-based access, Canadian or disclosed hosting, breach-response plan (PIPEDA breach reporting) |

---

## 6. Hard "no" list

1. ❌ Scraping LinkedIn, RedNote, WeChat, Facebook, BizBuySell, or any site whose terms forbid it.
2. ❌ Building personal profiles of owners (age, health, family, ethnicity) from web or social data.
3. ❌ Buying consumer data or "age appends" to target owners.
4. ❌ Inferring ethnicity or language from names to decide who to target.
5. ❌ Mining obituaries, medical, or family-court information for leads.
6. ❌ AI voice or robocall outreach without prior express consent.
7. ❌ Cold email blasts without a CASL basis; misleading subject lines or sender identity.
8. ❌ Pretexting — posing as a buyer, customer, or researcher to extract information.
9. ❌ Fake reviews, fake testimonials, fake "sold" claims, or bait listings (Competition Act deceptive marketing; RECO rules).
10. ❌ Posting or sharing an identifiable business for sale without the owner's written consent.
11. ❌ Before registration: representing a party, negotiating, or taking deal-contingent pay.
12. ❌ Using MLS or broker data outside its licence.
13. ❌ Marketing businesses as an immigration pathway.

---

## 7. Approaching RedNote (Xiaohongshu) business brokers

### 7.1 Vet them first (10 minutes each)
1. **RECO Registrant Search:** are they registered? Which brokerage? Any discipline history?
2. Do their posts **name their brokerage** clearly? If not, they're not following RECO
   advertising rules — a warning sign.
3. Do they mostly sell restaurants and convenience stores, or do they also do B2B, service or
   distribution businesses? You want the latter, or someone who wants to move into it.
4. Deal evidence: real closed deals, a professional process (NDA, data room), and no
   immigration-pathway marketing.

**Partner only with registered brokers.** Paying or being paid by an unregistered "broker" for
deals is a legal risk for you as well as them.

### 7.2 What you offer (pre-registration, flat-fee or free samples — confirm with your lawyer)
- **Data-backed valuation memo** for one of their current listings: comparable asking
  multiples, normalized SDE, expected time to sell. Free as a sample.
- **Co-branded Chinese-language market content** from your data (e.g.
  "2026年安省生意转让价格数据"). They get authority; you get distribution.
- **Buyer-side analysis** for their buyer clients (red-flag report), billed per report at a
  flat fee, not tied to closing.
- **The long game:** they (or their brokerage) **sponsor your registration**. Once you're
  registered, you bring the AI-sourced owner pipeline and split commissions inside the
  brokerage.

### 7.3 What not to do with them
- Don't hand over your target lists or model before an agreement exists (NDA first).
- Don't accept "referral fees" per deal before you're registered.
- Don't let them post your sourced owners' businesses without written owner consent.

### 7.4 Opening message (RedNote DM / WeChat) — edit to your voice

> 您好，我是[姓名]，经济学博士，专注安省中小企业交易的数据分析。关注您很久了，您在生意买卖方面的内容很专业。
>
> 我正在建立一个AI数据平台，用于分析安省生意转让的定价（年利润倍数、成交周期、行业风险等），同时在进修安省RECO执照课程。
>
> 想冒昧请教是否有兴趣合作：我可以免费为您目前的一个挂牌生意做一份数据估值分析，供您参考。如果觉得有价值，我们可以再聊长期合作（包括联合发布中文市场数据报告）。
>
> 方便的话，期待约个15分钟电话或咖啡。谢谢！

(English gist: I'm an econ PhD building an AI pricing and analytics platform for Ontario
business sales and doing my RECO courses. I'd like to offer a free data-driven valuation memo
on one of your current listings; if it's useful, let's talk about a longer collaboration and a
joint Chinese-language market report.)

---

## 8. Grey areas to take to a lawyer (one consult, about an hour)

1. Does surveying owners about succession, or building lists of likely sellers, count as
   "acts in furtherance of a trade" under TRESA before you're registered?
2. Can you sell flat-fee analytics to registered brokers before you're registered? Are there
   limits?
3. Whether the National DNCL and Telemarketing Rules apply to calls to businesses, and how to
   document compliance.
4. The CASL basis for any email follow-up; wording for consent checkboxes.
5. Privacy policy and consent language for the valuation estimator and the survey.
6. Terms for 51.ca, Yorkbbs, OBR, and Corporations Canada data use.

---

## Sources

- OPC — Clearview AI joint findings (PIPEDA-2021-001): https://priv.gc.ca/en/opc-actions-and-decisions/investigations/investigations-into-businesses/2021/pipeda-2021-001
- Gowling WLG — Alberta court on publicly available info: https://gowlingwlg.com/en/insights-resources/articles/2025/alberta-court-clarifies-consent-and-publicly-available-info
- Coast Reporter — BC court upholds order: https://www.coastreporter.net/bc-news/bc-court-upholds-ban-against-us-company-collecting-peoples-data-10023745
- Torys — CASL / CompuFinder: https://www.torys.com/insights/publications/2020/06/fca-confirms-casl-is-constitutional-but-limits-business-communications-exemption
- BLG — CASL interpretive guidance: https://www.blg.com/en/insights/2020/07/federal-court-of-appeal-rules-casl-constitutionally-valid-and-provides-interpretive-guidance
- M3AAWG comments on CRTC 2026-132 (ADAD and AI voice): https://www.m3aawg.org/sites/default/files/doc_files/m3aawg-crtc-2026-132-comments-july-24-2026.pdf
- CRTC 2013-140 (ADAD consent background): https://crtc.gc.ca/eng/archive/2013/2013-140.htm
- RECO Bulletin 5.1 — Advertising requirements: https://www.reco.on.ca/getmedia/fc6d0358-a8a1-4e6b-bfaa-2b8c312e1c3b/RECO-Bulletin-5-1-Advertising-requirements.pdf
- RECO Bulletin 5.3 — Advertising online: https://reco.on.ca/getmedia/398b2b0c-2c20-4bec-a8d9-d88fc9e03d18/RECO-Bulletin-5-3-Advertising-online.pdf
- ISED — Canadian Importers Database: https://ised-isde.canada.ca/site/ised/en/canadian-importers-database
- Open Canada — CanadaBuys contract history: https://open.canada.ca/data/en/dataset/4fe645a1-ffcd-40c1-9385-2c771be956a4
- CanadaBuys datasets documentation: https://donnees-data.tpsgc-pwgsc.gc.ca/ba2/ac-cb/soutien-support-eng.html
- Toronto business licences (mirror of City open data): https://opengovca.com/toronto-business/V02-5324783
- Kyckr — Canada registry search guide: https://kyckr.com/guides-and-reports/canada-business-registry-search-guide-2025
- Business Data Guide — Canada company search: https://businessdataguide.com/blog/jurisdictions/canada-company-search-guide
- Global Database — Canadian registries: https://www.globaldatabase.com/inside-our-mission-to-source-company-data-across-all-13-canadian-jurisdictions
- Google Maps Platform service terms: https://cloud.google.com/maps-platform/terms/maps-service-terms?hl=es-419
