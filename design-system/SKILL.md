---
name: acesso-catolico-design
description: Use this skill to generate well-branded interfaces and assets for the Acesso Católico portal and management platform, either for production or throwaway prototypes/mocks. Contains the brand foundations — colors, typography, fonts, brand tokens, logo, iconography and tone of voice.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files (styles.css, tokens/, assets/, cards/).

Acesso Católico is a free public Catholic portal (masses, events, communities, regional content) backed by a management platform for parishes and communities. Tone: "católica, mas moderna e convidativa" — welcoming, generous, transparent, never commercial. Data freshness (`atualizado_em`, "reportar erro") is part of the identity.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and create static HTML files that link `styles.css` and use the semantic aliases (`--brand`, `--accent`, `--text-body`, `--font-display`, `--font-sans`, `--font-mono`, `--radius-lg`, etc.). If working on production code, copy assets and read the rules here to become an expert designing with this brand.

Only foundations are defined so far (colors, type, tokens, logo, voice) — no UI kit or reusable components yet. If the user invokes this skill without other guidance, ask what they want to build, ask a few focused questions, and act as an expert designer who outputs HTML artifacts or production code.
