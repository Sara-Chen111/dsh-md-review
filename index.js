import { writeFileSync } from 'node:fs';

/**
 * Host half of dsh-md-review.
 *
 * The review UI itself is entirely client-side (document-preview extension +
 * slot + localStorage). This host row exists because the bundle declares one,
 * so each profile has a single plugin entry to enable/disable.
 *
 * For local end-to-end verification only: set DSH_MD_REVIEW_AUTH_FILE to a path
 * and the host writes the authenticated GUI URL there (owner-only permissions).
 * It is opt-in so a normal install never writes a session token to disk.
 */
export function apply(ctx) {
  const file = process.env?.DSH_MD_REVIEW_AUTH_FILE;
  if (typeof file !== 'string' || file.trim() === '') return;
  const target = file.trim();
  try {
    const origin = ctx.webServer.getOrigin();
    const url = ctx.connection.authenticatedUrl(`${origin}/`);
    writeFileSync(target, url, { encoding: 'utf8', mode: 0o600 });
  } catch (error) {
    try {
      writeFileSync(target, `ERROR ${error && error.message}`, { encoding: 'utf8', mode: 0o600 });
    } catch (_ignored) {
      /* never break the host composition for a dev helper */
    }
  }
}
