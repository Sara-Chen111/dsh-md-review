/**
 * Authenticated file URLs for images authored in a Markdown document.
 * Mirrors the builtin Markdown preview so relative images keep working.
 */

/** Whether a decoded path is absolute on the current platform family. */
function isAbsoluteWorkspacePath(path) {
  return path.startsWith('/') || /^[a-z]:[/\\]/iu.test(path);
}

/** Address one absolute path through the Host's authenticated file route. */
function fileMediaUrl(base, path) {
  if (
    (!/^https?:/u.test(base) && !base.startsWith('dsh-app://app/')) ||
    !isAbsoluteWorkspacePath(path) ||
    /^[/\\]{2}/u.test(path) ||
    /[\u0000-\u001f\u007f]/u.test(path)
  ) {
    return undefined;
  }
  return new URL(`api/file?path=${encodeURIComponent(path)}`, base).href;
}

/** Split a path into its directory prefix and final name. */
function pathPartsOf(path) {
  const trimmed = path.replace(/[/\\]+$/, '');
  if (trimmed === '') return { directory: '', name: path };
  const cut = Math.max(trimmed.lastIndexOf('/'), trimmed.lastIndexOf('\\')) + 1;
  return { directory: trimmed.slice(0, cut), name: trimmed.slice(cut) };
}

/**
 * Resolve one authored image destination.
 * @param {string} documentPath - absolute path of the previewed document, when known.
 * @param {string} destination - authored Markdown image URL.
 * @returns {string | undefined} a Web or Desktop file URL.
 */
export function resolveImageUrl(documentPath, destination) {
  const suffix = destination.search(/[?#]/u);
  let path;
  try {
    path = decodeURIComponent(suffix === -1 ? destination : destination.slice(0, suffix));
  } catch (_error) {
    return undefined;
  }
  if (path.length === 0) return undefined;
  if (!/^[a-z]:[/\\]/iu.test(path) && /^[a-z][a-z\d+.-]*:/iu.test(path)) return undefined;
  if (!isAbsoluteWorkspacePath(path)) {
    if (documentPath === undefined) return undefined;
    path = pathPartsOf(documentPath).directory + path;
  }
  return fileMediaUrl(document.baseURI, path);
}
