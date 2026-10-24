/** Make images in public/ work on both root domains and GitHub Pages subpaths. */
export function assetUrl(path) {
  if (!path || typeof path !== 'string') return '';
  if (/^(data:|blob:|https?:\/\/)/i.test(path)) return path;
  if (path.startsWith('/')) return `${import.meta.env.BASE_URL}${path.slice(1)}`;
  return path;
}
