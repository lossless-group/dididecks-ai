/**
 * Shared frontend API transport helpers.
 *
 * These functions are safe to import from browser code. They know how to call
 * the repo-local SvelteKit API during MVP development and can also honor a
 * public API base URL when the frontend is pointed at another backend.
 */
function resolveApiPath(path: string): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const base = (
    (import.meta.env.PUBLIC_DIDIDECKS_API_URL as string | undefined) ??
    (import.meta.env.PUBLIC_API_BASE_URL as string | undefined)
  )?.trim();

  if (!base) {
    if (normalizedPath.startsWith('/api/products/dididecks/')) {
      return normalizedPath.replace('/api/products/dididecks/', '/api/dididecks/');
    }
    return normalizedPath;
  }

  return `${base.replace(/\/$/, '')}${normalizedPath}`;
}

export async function apiGet<T>(path: string, fetcher: typeof fetch = fetch): Promise<T> {
  const response = await fetcher(resolveApiPath(path), {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`GET ${path} failed with ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function apiPost<T>(path: string, body: unknown, fetcher: typeof fetch = fetch): Promise<T> {
  const response = await fetcher(resolveApiPath(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`POST ${path} failed with ${response.status}`);
  }

  return (await response.json()) as T;
}
