export const state = () => ({
  locations: [],
})

export const actions = {
  async loadLocaleStorage({ commit }) {
    const savedLocations = await localStorage.getItem('W_LOCATIONS')
    if (savedLocations) {
      commit('SET_LOCATIONS', JSON.parse(savedLocations))
    }
  },
}

export const mutations = {
  SET_LOCATIONS(state, locations) {
    state.locations = locations
  },
  ADD_LOCATION(state, newLocation) {
    state.locations = [newLocation, ...state.locations]
    localStorage.setItem('W_LOCATIONS', JSON.stringify(state.locations))
  },
}
