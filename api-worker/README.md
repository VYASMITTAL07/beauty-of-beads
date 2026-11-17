# Beauty of Beads API Worker

This is the current Cloudflare Worker bundle for `beauty-of-beads-api`, captured from the active deployment baseline (`9b1970f`) so future API changes remain versioned alongside the admin frontend.

Deploy from the repository root with:

```sh
npx wrangler deploy --config api-worker/wrangler.jsonc --keep-vars --message "Describe the API change"
```

`--keep-vars` is required because production environment variables and secrets are managed in the Cloudflare dashboard. Do not add secrets to this repository.
