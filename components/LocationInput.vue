<template lang="pug">
  div.location-input-container
    input.location-input__search-input(
      v-model="searchText",
      type="search",
      @keydown="searchByInput(true)"
      @keydown.enter="searchByInput"
      :placeholder="$t('search_input_placeholder')"
    )
    button.location-input__search-input-submit-btn(@click="searchByInput()")
      | {{ $t('search_input_btn') }}
</template>

<script>
import { mapMutations } from 'vuex'
import { getForecastByQuery } from '~/services/weather'

export default {
  name: 'LocationInput',
  data() {
    return {
      searchText: '',
      searchTimeout: null,
    }
  },
  methods: {
    ...mapMutations('ADD_LOCATION'),
    searchByInput(delay = false) {
      if (this.searchTimeout) clearTimeout(this.searchTimeout)
      if (this.searchText.length === 0) return
      if (delay) {
        this.searchTimeout = setTimeout(this._search, 500)
        return
      }
      this._search()
    },
    async _search() {
      const response = await getForecastByQuery(this.searchText)
      // eslint-disable-next-line
      console.log(response)
      this.searchText = ''
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
  }

  &__btn-current-location {
    margin: var(--btn-margin);
    padding: var(--btn-padding);
  }
}
</style>
