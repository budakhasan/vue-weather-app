<template lang="pug">
  div.app-wrapper
    main.app-content
      nuxt
    AppFooter

</template>

<script>
export default {
};
</script>

<style lang="scss">
:root {
  --footer-height: 76px;
}
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  // app-content
  &-content {
    width: 100%;
    height: calc(100vh - var(--footer-height));
    padding-bottom: 16px;
    overflow: auto;
  }
  &-footer {
    display: flex;
    flex: 1 1 0;
    flex-direction: row;
    background-color: var(--primary-dark-color);
    height: var(--footer-height);
    max-height: var(--footer-height);
    min-height: var(--footer-height);
    justify-content: flex-end;
    padding: .5rem
  }
}
</style>
