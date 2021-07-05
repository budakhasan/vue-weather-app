<template lang="pug">
  div
    div.location-input-container
      input.location-input__search-input(
        v-model="searchText",
        type="search",
        @keydown="searchByInput(true)"
        @keydown.enter="searchByInput"
        :placeholder="$t('search_input_placeholder')"
      )
      button.location-input__search-input-submit-btn(@click="searchByInput()" :disabled="!!isLoading")
        span {{ isLoading ? $t('btn_is_loading') : $t('search_input_btn') }}
    p(v-if="notFound") {{ $t('search_city_not_found') }}
    p(v-else-if="errorMsg") {{ errorMsg }}

</template>

<script>
import { mapState } from 'vuex'
import { getForecastByQuery } from '~/services/weather'

export default {
  name: 'LocationInput',
  data() {
    return {
      isLoading: false,
      notFound: false,
      searchTimeout: null,
      searchText: '',
      errorMsg: '',
    }
  },
  computed: {
    ...mapState({
      locations: (state) => state.weather.locations,
      language: (state) => state.settings.language,
    }),
  },
  methods: {
    resetSearchErrors() {
      this.notFound = false
      this.errorMsg = ''
    },
    searchByInput(delay = false) {
      if (this.isLoading) return
      this.resetSearchErrors()
      if (this.searchTimeout) clearTimeout(this.searchTimeout)
      if (this.searchText.length === 0) return
      if (delay) {
        this.searchTimeout = setTimeout(this._search, 750)
        return
      }
      this._search()
    },
    async _search() {
      this.isLoading = true
      const response = await getForecastByQuery(this.searchText, this.language)
      // set loading to disable next fetch
      this.isLoading = false
      // clear search text after server-response
      this.searchText = ''
      // check if city/state is exists
      if (response.cod === 404 || response.cod === '404') {
        this.notFound = true
        return
      } else if (response.cod !== 200) {
        this.errorMsg = response.message
        return
      }
      if (!this.locations.find(({ id }) => id === response.id))
        this.$store.commit('weather/ADD_LOCATION', response)
    },
  },
}
</script>

<style lang="scss">
.location-input {
  &-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
  }

  &__search-input {
    border-radius: var(--input-radius);
    &-submit-btn {
      border-radius: var(--input-radius);
      margin-left: 3px;
    }
  }

  &__btn-current-location {
    margin: var(--btn-margin);
    padding: var(--btn-padding);
  }
}
</style>
