export const state = () => ({
  language: '',
  activeTheme: '',
  accentColor: '',
})

export const actions = {
  setLang({ commit }, lang) {
    commit('SET_LANGUAGE', lang)
  },
  async loadSettingsFromLocaleStorage({ commit }) {
    let savedSettings = await localStorage.getItem('W_SETTINGS')
    // eslint-disable-next-line
    console.log([
      '*** loadSettingsFromLocaleStorage fired',
      JSON.parse(savedSettings),
    ])
    if (savedSettings) {
      savedSettings = JSON.parse(savedSettings)
      await commit('SET_LANGUAGE', savedSettings.language)
      await commit('SET_ACCENT_COLOR', savedSettings.accentColor)
      await commit('SET_ACTIVE_THEME', savedSettings.activeTheme)
    }
  },
  updateStorage({ state }) {
    localStorage.setItem(
      'W_SETTINGS',
      JSON.stringify({
        language: state.language,
        accentColor: state.accentColor,
        activeTheme: state.activeTheme,
      })
    )
  },
}

export const mutations = {
  SET_LANGUAGE(state, langCode) {
    if (!langCode) return
    state.language = langCode
    document.querySelector('html').setAttribute('lang', langCode)
  },

  SET_ACCENT_COLOR(state, colorKey) {
    if (!colorKey) return
    state.accentColor = colorKey
    document.querySelector('html').setAttribute('data-accent', colorKey)
  },

  SET_ACTIVE_THEME(state, themeKey) {
    if (!themeKey) return
    const htmlElement = document.querySelector('html')
    if (state.activeTheme) htmlElement.classList.remove(state.activeTheme)
    // update state
    state.activeTheme = themeKey
    // add to html class
    htmlElement.classList.add(themeKey)
  },
}
