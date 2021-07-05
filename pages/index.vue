<template lang="pug">
  div.w-list
    div.container.w-list-search-wrapper
      LocationInput
    div.container.w-list-wrapper
      LocationCard.w-list-wrapper__list-item(v-for="(location, i) in locations" :key="i", :location="location")
</template>

<script>
import { mapState } from 'vuex'
import { getForecastByQuery } from '~/services/weather'

export default {
  layout: 'default',
  computed: {
    ...mapState('weather', ['locations', 'language']),
  },
  mounted() {
    this.$store.commit('weather/SET_LANGUAGE', this.$i18n.locale)
    if (this.locations.length === 0) {
      this.loadDefaultCities()
    }
  },
  methods: {
    loadDefaultCities() {
      const defaultCites = [
        'İstanbul',
        'Ankara',
        'New York',
        'Berlin',
        'Hong Kong',
      ]
      defaultCites.forEach((cityName) =>
        getForecastByQuery(cityName, this.language).then((response) => {
          this.$store.commit('weather/ADD_LOCATION', response)
        })
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
