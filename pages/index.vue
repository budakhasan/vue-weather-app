<template lang="pug">
  div.w-list
    div.container.w-list-search-wrapper
      LocationInput
    div.container.w-list-wrapper
      LocationCard.w-list-wrapper__list-item
      LocationCard.w-list-wrapper__list-item
      LocationCard.w-list-wrapper__list-item
      LocationCard.w-list-wrapper__list-item
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {}
  },
  methods: {
    getLocation() {
      // eslint-disable-next-line
      console.log("*** getLocation fired", window.navigator)
    }
  }
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
    display: grid;
    grid-gap: 32px 20px;
    grid-template-columns: repeat(4, 1fr);
    &__list-item {
      margin: .5rem
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
