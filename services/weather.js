export const BASE_API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.API_KEY}`
export async function getForecastByCoordinate(
  latitude,
  longitude,
  lang = 'en'
) {
  const response = await fetch(
    `${BASE_API_URL}&latitude=${latitude}&longitude=${longitude}&lang=${lang}`
  )

  return response.json()
}

export async function getForecastByQuery(query) {
  const response = await fetch(`${BASE_API_URL}&q=${query}`)

  return response.json()
}
