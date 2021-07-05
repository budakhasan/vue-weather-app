<template lang="pug">
  div.w-list
    div.container.w-list-search-wrapper
      LocationInput
    div.container.w-list-wrapper
      LocationCard.w-list-wrapper__list-item(v-for="(location, i) in locations" :key="i", :location="location")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getForecastByQuery } from '~/services/weather'

export default {
  layout: 'default',
  computed: {
    ...mapState({
      locations: (state) => state.weather.locations,
      language: (state) => state.settings.language,
    }),
  },
  async mounted() {
    await this.loadLocaleStorage()
    if (this.locations.length === 0) {
      this.loadDefaultCities()
    }
  },
  methods: {
    ...mapActions('weather', ['loadLocaleStorage']),
    ...mapActions('settings', ['setLang', 'loadSettingsFromLocaleStorage']),
    loadDefaultCities() {
      const defaultCites = [
        'Seattle',
        'Berlin',
        'Hong Kong',
        'İstanbul',
        'Ankara',
      ]
      defaultCites.forEach((cityName) =>
        getForecastByQuery(cityName, this.language || this.$i18n.locale).then(
          (response) => {
            this.$store.commit('weather/ADD_LOCATION', response)
          }
        )
      )
    },
  },
}
</script>

<style lang="scss">
.w-list {
  width: 100%;
  // w-list-search-wrapper
  &-search-wrapper {
  }
  // w-list-wrapper
  &-wrapper {
    padding: 12px 4px;
    display: grid;
    grid-gap: 32px 20px;
    grid-template-columns: repeat(4, 1fr);
    &__list-item {
      margin: 0.5rem;
    }
  }
}
@media (max-width: 1000px) {
  .w-list-wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 700px) {
  .w-list-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 500px) {
  .w-list-wrapper {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
