export function getTmdbUrl(path: string, params: Record<string, string | number | undefined> = {}) {
  const config = useRuntimeConfig()
  const apiKey = config.tmdbApiKey

  const searchParams = new URLSearchParams({ api_key: apiKey })
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined)
      searchParams.set(key, String(value))
  }

  return `https://api.themoviedb.org/3${path}?${searchParams.toString()}`
}
export async function getAccountId(sessionId: string): Promise<number> {
  const url = getTmdbUrl('/account', { session_id: sessionId })
  const account = await $fetch(url) as TMDBAccount
  return account.id
}
