<template lang="pug">
  footer.app-footer
    button.app-footer-item-wrapper.app-footer__btn(v-tooltip="$t('change_theme')", @click="changeTheme()")
        i.material-icons
          | {{ activeTheme === 'light' ? 'light_mode' : 'dark_mode' }}
    v-popover.app-footer-item-wrapper.accent-selector
      button.app-footer__btn(v-tooltip="$t('choose_accent')")
        span.accent-selector__current
      template.accent-selector-list(slot="popover")
        div.accent-selector-list__item(
          v-for="color in availableAccentColors"
          :key="color"
          @click="changeAccentColor(color)"
        )
          span.accent-selector__selectable-color(
            :class="`accent-selector__selectable-color--${color}`"
          )
          | {{ color }}

    v-popover.app-footer-item-wrapper.app-footer__lang-selector
      button.app-footer__btn(v-tooltip="$t('choose_language')")
        i.app-footer__btn-icon.material-icons translate
        span.app-footer__btn-text {{ activeLocaleName }}
      template.available-lang-list(slot="popover")
        div.available-lang-list__lang(
          v-for="locale in availableLocales"
          :key="locale.code"
        )
          nuxt-link(:to="switchLocalePath(locale.code)")
            button.app-footer__btn.app-footer__btn-locale-btn(v-close-popover)
              | {{ locale.name }}
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      activeTheme: '',
      accentColor: 'green',
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(({ code }) => code !== this.$i18n.locale)
    },
    activeLocaleName() {
      return this.$i18n.locales.find(({ code }) => code === this.$i18n.locale)
        .name
    },
    availableAccentColors() {
      return [
        'blue',
        'green',
        'teal',
        'indigo',
        'purple',
        'orange',
        'pink',
        'red',
        'yellow',
      ]
    },
  },
  methods: {
    changeTheme() {
      const htmlElement = document.querySelector('html')
      if (this.activeTheme) htmlElement.classList.remove(this.activeTheme)
      if (this.activeTheme === 'light') this.activeTheme = 'dark'
      else this.activeTheme = 'light'
      htmlElement.classList.add(this.activeTheme)
    },
    changeAccentColor(color) {
      const htmlElement = document.querySelector('html')
      htmlElement.setAttribute('data-accent', color)
      this.accentColor = color
    },
  },
}
</script>

<style lang="scss">
.app-footer {
  padding: 0 2rem;
  &-item-wrapper {
    display: inline-flex;
    align-self: center;
    & + & {
      margin-left: 1rem;
    }
  }

  &__btn {
    padding: 0;
    color: var(--secondary-color);
    background-color: transparent;
    &:hover {
      color: var(--secondary-color);
    }
    &-icon {
      margin-right: 0.5rem;
    }

    &-text {
    }

    &-locale-btn {
      flex: 1 1 0%;
      margin: 0;
      padding: 0.5rem;
      justify-content: flex-start;
      text-align: left;
    }
  }
}
.accent-selector {
  &-list__item {
    display: flex;
    flex-direction: row;
    justify-self: flex-start;
    align-content: center;
    margin: 1rem 0;
    padding: 4px;
    border-radius: var(--input-radius);
    cursor: pointer;
    &:hover {
      background-color: var(--primary-light-color);
    }
  }
  &__current {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--accent-color);
  }
  &__selectable-color {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: inline-flex;
    justify-self: center;
    align-self: center;
    margin-right: 0.5rem;
  }
}

$accent-colors: (
  'blue',
  'green',
  'teal',
  'indigo',
  'purple',
  'orange',
  'pink',
  'red',
  'yellow'
);
@each $color in $accent-colors {
  .accent-selector__selectable-color--#{$color} {
    background-color: #{$color};
  }
}
</style>
