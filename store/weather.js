export const state = () => ({
  language: 'en',
  locations: [],
})

export const getters = {}

export const actions = {
  setLang({ commit }, lang) {
    commit('SET_LANGUAGE', lang)
  },
}

export const mutation = {
  SET_LANGUAGE(state, langCode) {
    state.language = langCode
  },
  ADD_LOCATION(state, newLocation) {
    state.locations = [newLocation, ...state.locations]
  },
}
