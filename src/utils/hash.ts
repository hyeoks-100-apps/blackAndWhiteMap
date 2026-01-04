const HASH_PREFIX = '#/';

export const readIdFromHash = (): string | null => {
  if (typeof window === 'undefined') return null;
  const current = window.location.hash;
  if (current.startsWith(HASH_PREFIX)) {
    const id = current.slice(HASH_PREFIX.length);
    return id ? decodeURIComponent(id) : null;
  }
  return null;
};

export const writeHash = (id: string | null) => {
  if (typeof window === 'undefined') return;
  if (!id) {
    window.history.replaceState(null, '', '#');
    return;
  }
  const encoded = encodeURIComponent(id);
  if (window.location.hash !== `${HASH_PREFIX}${encoded}`) {
    window.location.hash = `${HASH_PREFIX}${encoded}`;
  }
};
