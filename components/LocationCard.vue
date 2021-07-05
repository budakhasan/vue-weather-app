<template lang="pug">
  div
    div.location-card(v-if="location.weather")
      h2.location-name
        span.location-name__location-text {{location.name}}
        sup.location-name__country-code {{ location.sys.country }}
      div.location-temp
        span.location-temp__temp_value {{ Math.round(location.main.temp) }}
        sup.location-temp__temp_unit °C
      figure.location-temp__weather
        img.location-temp__weather-icon(:src="locationIcon", :alt="location.weather[0].description")
        figcaption.location-temp__weather-text {{location.weather[0].description}}
    div.location-card(v-else)
      h2.location-name
        span.location-name__location-text
        sup.location-name__country-code
      div.location-temp
        span.location-temp__temp_value
        sup.location-temp__temp_unit
      figure.location-temp__weather
        img.location-temp__weather-icon(src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/01n.svg", alt="CLEAR SKY")
        figcaption.location-temp__weather-text CLEAR SKY
</template>

<script>
export default {
  name: 'LocationCard',
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  computed: {
    locationIcon() {
      if (this.location.weather) {
        return `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${this.location.weather[0].icon}.svg`
      }
      return ''
    },
  },
  mounted() {
    // eslint-disable-next-line
    console.log('*** thislocation ', this.location)
  },
}
</script>

<style lang="scss">
html.light .location-temp__weather-icon {
  filter: invert(1);
}
.location {
  &-card {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;
    position: relative;
    padding: 40px 10%;
    border-radius: 20px;
    background-color: var(--secondary-color);
    color: var(--primary-color);
    transition: box-shadow 0.25s ease-in-out;

    &:after {
      content: '';
      width: 90%;
      height: 50px;
      position: absolute;
      bottom: -12px;
      left: 5%;
      z-index: -1;
      opacity: 0.3;
      border-radius: 20px;
      background: var(--secondary-light-color);
      transition: bottom 0.2s linear;
    }
    &:hover {
      cursor: pointer;
      box-shadow: 0 10px 13px -6px rgba(var(--secondary-box-shadow-rgb), 0.2),
        0 21px 33px 3px rgba(var(--secondary-box-shadow-rgb), 0.14),
        0 8px 40px 7px rgba(var(--secondary-box-shadow-rgb), 0.12) !important;
      &:after {
        bottom: 0;
      }
    }
  }
  // location-name
  &-name {
    margin: 0;
    &__location-text {
      display: inline-flex;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      max-width: 165px;
    }
    &__country-code {
      color: var(--primary-color);
      background-color: var(--accent-color);
      font-size: 0.75rem;
      top: -1em;
      padding: 4px;
      margin-left: 4px;
      border-radius: 8px;
    }
  }
  // location-temp
  &-temp {
    margin-top: 10px;
    &__temp_value {
      font-size: 3rem;
      font-weight: 700;
    }
    &__temp_unit {
      font-size: 1.75rem;
    }
  }
  // location-temp__weather
  &-temp__weather {
    margin: 10px 0;
    &-icon {
    }
    &-text {
      margin-top: 5px;
      text-transform: uppercase;
      opacity: 0.81;
    }
  }
}
</style>
