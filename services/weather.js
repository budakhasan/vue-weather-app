const API_KEY = `${process.env.API_KEY || 'b9baca56aa96c2081319148084846a37'}`
export const BASE_API_URL = `https://api.openweathermap.org/data/2.5/weather`
export const API_URL = `${BASE_API_URL}?appid=${API_KEY}&units=metric`

export async function getForecastByCoordinate(
  latitude,
  longitude,
  lang = 'en'
) {
  const response = await fetch(
    `${API_URL}&latitude=${latitude}&longitude=${longitude}&lang=${lang}`
  )
  return response.json()
}

export async function getForecastByQuery(query, lang = 'en') {
  const response = await fetch(`${API_URL}&q=${query}&lang=${lang}`)
  return response.json()
}
