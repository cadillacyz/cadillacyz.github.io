# Build Plan: AI Deal-Sourcing Engine (Canada, retiring-owner businesses)

> Hand-off spec for a coding agent. Build this as a **new, separate repository**
> (suggested name: `dealsource`), not inside the personal website repo.

## 1. What we are building

A tool that:

1. Finds small Canadian businesses likely owned by someone near retirement.
2. Scores them on **retirement likelihood**, **business quality**, and **fit** for a niche.
3. Generates personalized outreach **letters** (mailed, not emailed) to the top owners.
4. Tracks every owner conversation in a lightweight CRM.
5. Keeps a registry of **buyers** and their criteria, and matches qualified sellers to buyers.
6. Generates **anonymized teasers** — only after the owner has approved in writing.

The operator (a single person) uses it to run outreach, then hands interested owners to a
licensed business broker partner (or handles them directly once licensed).

**MVP target:** one province, two or three niches, ~5,000 businesses ingested, top 300 scored
and ready for a letter campaign.

## 2. Non-negotiable constraints (build these in from day one)

| Constraint | What the code must do |
|---|---|
| **CASL** (Canada anti-spam law) | Email outreach to owners is **disabled by default**. Primary channel is physical mail. Keep a global do-not-contact list checked before *any* outreach. |
| **PIPEDA** (privacy) | Store only business-related data. No scraping of personal social profiles, no purchased consumer data. Every record keeps a `source` and `retrieved_at`. Support deleting an owner on request. |
| **Confidentiality** | A business can never appear in a teaser, export, or buyer match unless `owner_consent_at` is set. Teasers must be anonymized (no name, address, phone, URL, or exact revenue). |
| **Broker licensing** | The system does not compute or track success fees/commissions in MVP. Fee logic is out of scope until legal review. |
| **Source ToS** | Respect `robots.txt`, rate-limit crawlers, and obey each API's storage rules (e.g. Google Places: persist only `place_id` long-term; re-fetch details when needed). |
| **Auditability** | Append-only `audit_log` table for every outreach, status change, consent, and export. |

## 3. Tech stack

- **Language:** Python 3.12, `uv` for dependency management.
- **DB:** SQLite via SQLAlchemy 2.x + Alembic migrations (keep Postgres-compatible).
- **HTTP/crawl:** `httpx` (async), `selectolax` or `beautifulsoup4`, `tenacity` for retries.
- **LLM:** Anthropic Claude API (`anthropic` SDK). Use a cheap/fast model (Haiku class) for bulk
  classification and a stronger model (Sonnet class) for letters and teasers. Model IDs live in
  config, not code. Use structured (JSON) outputs validated with Pydantic.
- **Dashboard:** Streamlit (single-user, local).
- **PDF letters:** Jinja2 templates → WeasyPrint.
- **Mail sending (optional, M5):** PostGrid print-and-mail API (Canadian), behind an interface.
- **CLI:** Typer. **Config:** `pydantic-settings` + YAML. **Tests:** pytest. **Lint:** ruff, mypy.

## 4. Repository layout

```
dealsource/
  pyproject.toml
  config/
    default.yaml          # province, niches, weights, model IDs, rate limits
    niches/
      industrial_distribution.yaml
      fire_safety_inspection.yaml
  dealsource/
    cli.py                # Typer entrypoint
    settings.py
    db/
      models.py
      session.py
      migrations/
    sources/              # one adapter per data source, common interface
      base.py
      open_data_licences.py   # municipal business-licence open data (CSV/API)
      federal_corps.py        # Corporations Canada open data (incorporation dates)
      google_places.py
      osm_overpass.py
    resolve/
      dedupe.py           # entity resolution
    enrich/
      website.py          # crawl homepage + about page
      wayback.py          # Internet Archive CDX: first-seen date of domain
      signals.py          # feature extraction
    score/
      features.py
      llm_classify.py
      scorer.py
    outreach/
      letters.py
      templates/letter_v1.html.j2
      mail_provider.py    # interface + PostGrid impl + "dry-run" impl
    crm/
      pipeline.py
    buyers/
      registry.py
      matcher.py
      teaser.py
    compliance/
      dnc.py
      audit.py
    analysis/
      niche_scan.py       # competition / opportunity ranking per niche+region
  app/
    dashboard.py          # Streamlit
  tests/
```

## 5. Data model (SQLAlchemy)

- **business**: `id, legal_name, operating_name, niche, naics_code, address, city, province,
  postal_code, phone, website, place_id, incorporation_date, licence_issue_date,
  first_seen_web_date, employee_estimate, created_at, updated_at`
- **source_record**: `id, business_id, source, external_id, raw_json, retrieved_at`
  (raw payloads kept only where the source's ToS allows)
- **signal**: `id, business_id, name, value_num, value_text, evidence, computed_at`
  (e.g. `years_in_business=31`, `site_copyright_year=2011`, `has_https=false`)
- **score**: `id, business_id, retirement_score, quality_score, fit_score, total_score,
  reasons_json, model_version, scored_at`
- **contact**: `id, business_id, name, role, mailing_address, phone, source, notes`
  (business contact info only)
- **outreach**: `id, business_id, channel(mail|phone|email), template_version, sent_at,
  provider_id, status`
- **pipeline**: `id, business_id, stage, updated_at, next_action, next_action_at`
  Stages: `new → scored → queued → contacted → replied → conversation → interested →
  consented → referred_to_broker → under_loi → closed_won | closed_lost | not_now | dnc`
- **consent**: `id, business_id, type(teaser|share_financials|buyer_intro), granted_at,
  evidence_path, revoked_at`
- **buyer**: `id, name, type(searcher|holdco|pe|individual|broker), email, provinces,
  niches, min_sde, max_sde, max_price, financing_status, nda_signed_at, notes`
- **match**: `id, business_id, buyer_id, match_score, reasons_json, status, created_at`
- **dnc**: `id, business_id_or_phone_or_address, reason, added_at`
- **audit_log**: `id, actor, action, entity, entity_id, payload_json, at` (append-only)

## 6. Scoring model

All scores 0–100. Every score stores human-readable `reasons` (the dashboard shows them).

**Retirement likelihood (weight 0.45)**
- Years in business (incorporation / licence date / Wayback first-seen; take earliest) — strongest signal; 25+ years scores high.
- Website staleness: old copyright year, no HTTPS, no mobile viewport, no online booking, Flash/table layouts.
- No website at all but strong reviews (established, offline business).
- LLM read of "About" page: founder story with a founding year, "family owned since 19xx", no sign of a next generation in leadership.

**Quality (weight 0.40)**
- Review count and rating (volume = established customer base).
- Recurring/contract revenue indicators (service agreements, inspections, maintenance plans, B2B accounts).
- Low owner dependence (multiple staff named, multiple locations/trucks).
- Low capital intensity for the niche (from niche config).

**Fit (weight 0.15)**
- Matches niche config (NAICS + keyword classification by LLM, with confidence).
- Within target geography.
- Estimated size band (employee estimate as proxy for $250K–$1.5M SDE).

**LLM usage rules**
- The LLM only *classifies and extracts* from text we already fetched; it does not invent facts.
- Output schema validated with Pydantic; invalid output → retry once → mark `needs_review`.
- Cache LLM results by content hash so re-runs are cheap.
- Hard budget cap per run in config (e.g. `max_llm_cost_cad: 50`).

## 7. Milestones and acceptance criteria

### M0 — Skeleton (½ day)
- Repo, `uv`, ruff, mypy, pytest, Alembic, Typer CLI, settings loading, CI (GitHub Actions running lint + tests).
- ✅ `dealsource --help` works; CI green.

### M1 — Ingestion (2–3 days)
- `sources/base.py` interface: `fetch(region, niche) -> Iterable[RawBusiness]`.
- Implement: municipal business-licence open data (start with one city, e.g. Toronto/Ottawa/Calgary/Edmonton/Vancouver — whichever matches the chosen province), Corporations Canada open data, OpenStreetMap Overpass, Google Places Text Search (API key optional; skip if absent).
- Entity resolution: normalize name (strip Inc/Ltd/Ltée), phone (E.164), address (postal code); fuzzy match with `rapidfuzz`; merge into one `business`.
- ✅ `dealsource ingest --province ON --niche industrial_distribution` loads ≥1,000 deduplicated businesses; duplicate rate on a 100-row manual sample < 5%.

### M2 — Enrichment (2–3 days)
- Async website crawler (homepage + about/contact page, max 3 pages/site, robots.txt honoured, 1 req/sec/domain).
- Extract signals: copyright year, HTTPS, viewport meta, CMS/tech hints, founding year mentions, staff names count.
- Wayback CDX first-capture date per domain.
- ✅ `dealsource enrich` populates `signal` rows for ≥90% of businesses that have websites; failures logged, never crash the run.

### M3 — Scoring (2 days)
- Feature computation + LLM classification (niche fit, recurring revenue, succession signals) + weighted scorer from config.
- ✅ `dealsource score` writes scores with reasons; `dealsource top --n 50` prints a ranked table; unit tests cover each feature function; scoring is deterministic given cached LLM outputs.

### M4 — Dashboard + CRM (2–3 days)
- Streamlit pages: **Prospects** (filter/sort by score, niche, city; view reasons and signals), **Business detail** (signals, score breakdown, notes, stage changes, consent records), **Pipeline** (kanban-style counts per stage), **Buyers**, **Audit log**.
- Stage changes write to `audit_log`.
- ✅ Operator can move a business from `scored` to `contacted` to `conversation` and see history.

### M5 — Outreach letters (2 days)
- Jinja2 letter template: short, personal, no pressure ("thinking about what's next for the business?"), references one true specific detail (years in business, niche), includes opt-out instructions and operator contact.
- LLM drafts the one personalized paragraph; operator approves in dashboard before PDF generation.
- `mail_provider.py`: `DryRunProvider` (writes PDFs to `out/letters/`) and `PostGridProvider`.
- DNC check before generation and before sending.
- ✅ `dealsource letters --campaign c1 --top 200 --dry-run` produces 200 PDFs + a CSV manifest; DNC entries are excluded; each send logged.

### M6 — Buyers, matching, teasers (2–3 days)
- Buyer registry CRUD (dashboard + CSV import).
- Matcher: hard filters (province, niche, size band, NDA signed) + weighted score; reasons stored.
- Teaser generator: anonymized one-pager (region, niche, years operating, size band, highlights). **Blocked unless a `teaser` consent exists.** Post-generation check rejects any output containing the business name, street, phone, URL, or postal code.
- ✅ Attempting to generate a teaser without consent raises an error and is audit-logged; tests prove the anonymization check catches leaked identifiers.

### M7 — Niche/competition scan (1–2 days)
- `analysis/niche_scan.py`: per niche × region, report: business count, share with 25+ years, median retirement score, (optional, manually imported) count of active marketplace listings and recent PE/roll-up deals.
- ✅ `dealsource niche-scan --province ON` outputs a ranked CSV + Markdown summary of niches by opportunity (many old businesses, few listings, few roll-up deals).

## 8. Config example (`config/default.yaml`)

```yaml
province: ON
cities: [Ottawa, Kingston, London, Windsor, Sudbury]
niches: [industrial_distribution, fire_safety_inspection]
weights: { retirement: 0.45, quality: 0.40, fit: 0.15 }
llm:
  classify_model: <haiku-class model id>
  write_model: <sonnet-class model id>
  max_cost_cad_per_run: 50
crawl: { per_domain_rps: 1, max_pages_per_site: 3, timeout_s: 15 }
outreach: { email_enabled: false, default_channel: mail }
```

## 9. Testing

- Unit tests for every source adapter using recorded fixtures (no live network in CI).
- Unit tests for normalization, dedupe, each signal extractor, scorer weighting.
- LLM calls mocked in tests; one optional `-m live` smoke test.
- Compliance tests: DNC exclusion, consent gating, teaser anonymization, audit log written.

## 10. Rough running costs (MVP)

| Item | Estimate |
|---|---|
| LLM scoring 5,000 businesses (cached) | ~$20–60 CAD |
| Google Places (optional) | free tier to ~$50 CAD |
| Letters via print-mail API | ~$1.50–2.50 CAD each → 200 letters ≈ $300–500 |
| Hosting | $0 (runs locally) |

## 11. Out of scope for MVP

- Commission/success-fee tracking (pending legal review of provincial broker licensing).
- Cold email automation to owners.
- Public website / buyer-facing portal (later: simple landing page + buyer intake form).
- Financial diligence parsing (next phase: upload P&L/tax returns → normalized SDE + red flags).
- Multi-user auth.

## 12. Definition of done (MVP)

1. One command sequence runs end to end:
   `ingest → enrich → score → top → letters --dry-run`.
2. Dashboard shows ranked prospects with explainable reasons and a working pipeline.
3. All compliance tests pass; CI green.
4. README documents setup, API keys, and the legal guardrails above.
