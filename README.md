# JSON Resume — Yuga Chang

Resume as structured JSON (schema: https://jsonresume.org/schema), rendered
locally with `@jsonresume/cli` (flat theme) and deployed to GitHub Pages.

Live URL: **https://iamyugachang.github.io/resume**

## Workflow

```bash
# Schema validation
npx @jsonresume/cli test

# Local preview (live reload)
npx @jsonresume/cli serve

# Export static HTML through the compatibility/print adapter
npm run render

# Generate a two-page PDF with Windows Chrome from WSL
npm run pdf
```

`render.js` adapts the current JSON Resume schema (`work.name` / `work.url`) to
the older flat theme (`company` / `website`), formats dates for display, and adds
print CSS.

## Deploy

GitHub Pages publishes the rendered root `index.html` directly from `main`.
Render before committing:

```bash
npm run validate && npm run render
git add -A && git commit -m "update resume" && git push
```

## Tips

- Fill in `resume.json` only — everything else is generated.
- Schema gotchas (old validator, resume-schema 0.0.18):
  - No `$schema` key at the top (rejected: "Additional properties not allowed")
  - Dates must be full ISO `YYYY-MM-DD` (e.g. `2023-01-01`) — no `Present`, no `YYYY-MM`
  - Empty `""` in uri-typed fields (url) fails validation — omit the field instead
- Tailor per-job content with the `resume-tailoring` Hermes skill; keep this
  `resume.json` as the master copy.
- Keywords matter for ATS — mirror JD language in `skills` / `work.highlights`.
