# Deploying Beauty of Beads — Cloudflare (₹2000/year budget)

This replaces the old Hostinger guide. To fit a ₹2000/year budget, the whole
stack now runs on Cloudflare's free tier plus a couple of other free
services — the only real cost is your domain name (roughly ₹800–1500/year
depending on the `.com`/`.in`/`.shop` etc. you pick). Nothing here needs a
paid server.

## The pieces

| Piece | What it is | Where it runs | Cost |
|---|---|---|---|
| Storefront (customer site) | React build | Cloudflare Pages | Free |
| Admin panel | React build (same repo, `admin.html`) | Cloudflare Pages (same deploy) | Free |
| Backend API | Hono app in `beauty-of-beads-worker/` | Cloudflare Workers | Free (100k requests/day) |
| Database | Turso (SQLite-compatible) | Turso cloud | Free tier |
| Images/videos | Cloudflare R2 | Cloudflare | Free (10GB storage) |
| Order/review emails | Resend | Resend cloud | Free tier (3,000 emails/month) |
| Domain | Your choice of registrar | — | ~₹800–1500/year |

You'll need free accounts on: **Cloudflare**, **Turso**, and **Resend**. All
three sign up with just an email/GitHub login, no card required for the free
tiers used here.

---

## Step 1 — Create the Turso database

1. Install the Turso CLI and log in (see turso.tech for the current install
   command for your OS) — or use the Turso web dashboard, both work.
2. Create one database for production:
   ```bash
   turso db create beauty-of-beads
   turso db show beauty-of-beads --url
   turso db tokens create beauty-of-beads
   ```
3. Save the URL (starts with `libsql://...`) and the token — you'll paste
   both into Cloudflare in Step 3.

(Optional but recommended: create a second database, e.g.
`beauty-of-beads-dev`, so you can test changes without touching real
customer data.)

## Step 2 — Create the R2 bucket

From the `beauty-of-beads-worker` folder:

```bash
npm install
npx wrangler login
npx wrangler r2 bucket create beauty-of-beads-media
```

To let uploaded product photos load directly from Cloudflare's CDN (faster,
recommended), go to the Cloudflare dashboard → R2 → `beauty-of-beads-media`
→ Settings → enable public access ("r2.dev" URL is fine to start), then copy
that public URL for Step 3. If you skip this, uploaded images still work —
the Worker will serve them itself via a `/media/*` route — just a little
slower.

## Step 3 — Configure and deploy the backend (Worker)

Still in `beauty-of-beads-worker/`:

```bash
npx wrangler secret put TURSO_AUTH_TOKEN
# paste the token from Step 1

npx wrangler secret put JWT_SECRET
# paste any long random string (customer login sessions)

npx wrangler secret put ADMIN_JWT_SECRET
# paste a DIFFERENT long random string (admin login sessions)

npx wrangler secret put ADMIN_SETUP_KEY
# paste a third random string — this is a one-time-use key to create your
# first admin account in Step 5, then you should rotate/remove it

npx wrangler secret put GOOGLE_CLIENT_ID
# your Google OAuth Client ID (same one used before, from Google Cloud Console)

npx wrangler secret put RESEND_API_KEY
# your Resend API key (from resend.com dashboard, after verifying a sending domain)
```

Edit `wrangler.toml` and fill in the non-secret values:

```toml
[vars]
TURSO_URL = "libsql://your-db-url-from-step-1.turso.io"
CORS_ORIGIN = "https://your-real-storefront-domain.com"   # no trailing slash
COOKIE_SECURE = "true"                                      # "true" once you're on https
MEDIA_PUBLIC_BASE_URL = "https://your-r2-public-url"        # from Step 2, or leave "" to use the Worker's own /media route
```

Also set `EMAIL_FROM` and `STOREFRONT_URL` as secrets (or add them to
`[vars]` since they aren't sensitive):

```bash
npx wrangler secret put EMAIL_FROM
# e.g. "Beauty of Beads <orders@yourdomain.com>" — must be on a domain verified in Resend

npx wrangler secret put STOREFRONT_URL
# e.g. https://your-real-storefront-domain.com — used inside email templates for links
```

Then deploy:

```bash
npm run deploy
```

Wrangler prints your live Worker URL, e.g.
`https://beauty-of-beads-api.<your-subdomain>.workers.dev`. That's your
`VITE_API_BASE` for Step 4. (You can later map a custom domain like
`api.yourdomain.com` to it from the Cloudflare dashboard → Workers → your
Worker → Settings → Triggers → Custom Domains — free, and nicer than the
`workers.dev` URL.)

## Step 4 — Seed your existing product catalog (optional)

If you want the 21 products currently hardcoded on the site loaded into the
real database as a starting point (rather than adding all products fresh
from the admin panel):

```bash
TURSO_URL="libsql://your-db-url" TURSO_AUTH_TOKEN="your-token" node scripts/seed-products.mjs
```

You can also just skip this and add products directly through the admin
panel — either way works.

## Step 5 — Create your first admin login

Once the Worker is deployed, run this once (replace the placeholders):

```bash
curl -X POST https://your-worker-url/api/admin/auth/setup \
  -H "Content-Type: application/json" \
  -d '{
    "setupKey": "the-ADMIN_SETUP_KEY-you-set-in-step-3",
    "name": "Your Name",
    "email": "you@example.com",
    "password": "choose-a-strong-password-min-8-chars"
  }'
```

This creates your admin account and is a **one-time** operation — running it
again with a different email will still work (it only blocks duplicate
emails), so afterwards it's worth rotating `ADMIN_SETUP_KEY` to a new value
you don't reuse, via `npx wrangler secret put ADMIN_SETUP_KEY` again, so a
stranger can't use the old key to create their own admin account.

## Step 6 — Configure and build the frontend

Back in the main `beauty-of-beads/` folder:

```bash
cp .env.production.example .env.production
# edit .env.production and fill in:
#   VITE_API_BASE=https://your-worker-url-from-step-3
#   VITE_GOOGLE_CLIENT_ID=your-google-client-id

npm install
npm run build
```

This produces a `dist/` folder containing **two** pages: `index.html` (the
storefront) and `admin.html` (the admin panel) — both are static files from
the same build.

## Step 7 — Deploy the frontend to Cloudflare Pages

Easiest path — connect your Git repo:

1. Push this project to a GitHub repo (or GitLab).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Build settings: Framework preset "Vite", build command `npm run build`,
   output directory `dist`.
4. Add the same two environment variables from Step 6
   (`VITE_API_BASE`, `VITE_GOOGLE_CLIENT_ID`) under Pages → your project →
   Settings → Environment variables, so Cloudflare's own build picks them up.
5. Deploy. Cloudflare gives you a `*.pages.dev` URL immediately, and you can
   attach your real domain under Pages → your project → Custom domains
   (free, includes automatic HTTPS).

(No Git? You can instead run `npx wrangler pages deploy dist` directly from
this folder after `npm run build` — same result, just a manual upload each
time instead of auto-deploying on every push.)

Once your domain is attached, the admin panel is reachable at
`https://yourdomain.com/admin.html` — bookmark that; it's not linked from
anywhere in the public storefront on purpose (`noindex, nofollow`, no nav
link), since it's meant only for you.

## Step 8 — Update Google Cloud Console

In your Google OAuth Client ID settings, add your real storefront domain to
**Authorized JavaScript origins** (e.g. `https://yourdomain.com`). Without
this, "Sign in with Google" will fail on the live site.

## Step 9 — Point your domain's DNS at Cloudflare

If your domain isn't already on Cloudflare: add it as a site in the
Cloudflare dashboard (free plan), update your registrar's nameservers to the
two Cloudflare gives you, then attach it to your Pages project (Step 7) and,
optionally, your Worker (Step 3) as custom domains. This also gives you free
SSL/HTTPS automatically.

## Step 10 — Test on the live site

- Open the live domain, confirm products load (this confirms the Worker +
  Turso connection is working).
- Try "Sign in with Google".
- Add something to cart, place a test order, confirm it appears under
  "Track Your Order".
- Log into `/admin.html` with the email/password from Step 5. Add a test
  product with a real photo, confirm it appears on the storefront within a
  few seconds (no rebuild needed — the storefront fetches live from the
  Worker on every page load).
- Update a test order's status to "Delivered" from the admin Orders tab and
  confirm the delivered + review-request emails arrive (check your Resend
  dashboard's logs if they don't — the most common cause is `EMAIL_FROM`
  not matching a domain verified in Resend).

If something doesn't work, the most common causes are: `VITE_API_BASE`
(frontend) not matching the real Worker URL, `CORS_ORIGIN` (backend) not
matching the real frontend domain exactly (including `https://`, no
trailing slash), or a secret that wasn't actually set (`npx wrangler secret
list` shows which secret *names* exist, though not their values).

## Ongoing costs

Everything above stays within the free tiers for a store this size —
Workers (100k requests/day), Pages (unlimited requests), R2 (10GB), Turso
(500 databases / generous row-read allowance on the free tier), Resend
(3,000 emails/month). The only recurring cost is renewing your domain name
each year. If the store outgrows a free tier (e.g. very high traffic or
thousands of order emails a month), each service has its own paid tier you
can upgrade individually — nothing here locks you into an all-or-nothing
plan.

## A note on the single-file "artifact" version

The `bundle.html` file you've been previewing in this chat (and its
`bundle-artifact.sh`/`fix-viewport.sh` build scripts) is a special all-in-one
version made only for previewing inside this conversation — it can never
reach any backend (the preview sandbox blocks that), so it always shows the
built-in placeholder catalog rather than your real live products. It is
**not** what goes live. Use the `npm run build` → `dist/` folder from Step 6
for the real deployment.

## The old Node/Express/SQLite backend

`beauty-of-beads-backend/` (the original backend, before this Cloudflare
migration) is left in the project untouched but is no longer used — Steps
1–5 above (`beauty-of-beads-worker/`) fully replace it with equivalent
features plus the new admin panel. It's safe to ignore or delete once
you've confirmed the new backend is working live.
