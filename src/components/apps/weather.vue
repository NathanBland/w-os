<template>
  <w-app title='Weather' class='app--weather animated fadeInDown' 
  @keyup.up="monitorKeys('up')"
  @keyup.down="monitorKeys('down')"
  :has-sub-nav=false
  :loading=isLoadingWeather >
    <div slot='header' class='level'>
      <p v-if='city'>Weather for: {{city}}</p>
      <p v-else>Please input your location</p>
    </div>
    <div class='weather--output'>
      
      <div v-if="weather.temp !== ''">
        <p>It's currently <strong>{{weather.temp}}</strong>°F and <strong>{{weather.condition}}</strong></p>  
      </div>
      <div v-else>
        <span class="fa-stack fa-lg fa-4x has-text-centered">
          <i class="fa fa-cloud fa-stack-1x"></i>
          <i class="fa fa-ban fa-stack-2x is-danger"></i>
        </span>
        <p>No weather data at this time.</p>
      </div>
    </div>
    <form @submit.prevent='getWeather'>
      <label class="label">Zip Code:</label>
      <p class="control has-icon has-addons">
        <input @submit.prevent='getWeather' class="input" :class="{'is-disabled' : isLoadingWeather}" type="text" v-model='zip' placeholder="68506" autofocus>
        <i class="fa fa-map-marker"></i>
        <a @click.prevent='getWeather' class="button is-info" :class="{'is-loading is-disabled' : isLoadingWeather}">
          <i class="fa fa-search"></i>
        </a>
      </p>
    </form>
  </w-app>
</template>

<script>
import wApp from '../wApp'
const zipcodes = require('zipcodes')
const WeatherMan = require('weather-man')
export default {
  data () {
    return {
      zip: '',
      lat: '',
      lon: '',
      city: '',
      isLoadingWeather: false,
      weather: {
        temp: '',
        windChill: '',
        windSpeed: '',
        humidity: '',
        condition: '',
        sunrise: '',
        sunset: ''
      }
    }
  },
  components: {
    wApp
  },
  methods: {
    getWeather (e) {
      let result = zipcodes.lookup(this.$get('zip'))
      this.$set('lat', result.latitude)
      this.$set('lon', result.longitude)
      this.$set('city', result.city + ', ' + result.state)
      this.$set('isLoadingWeather', true)
      var wm = new WeatherMan(WeatherMan.OPENWEATHERMAP, '148a0f123b0f2801a07b9cb509f255b9')
      wm.getCurrent(this.$get('lat'), this.$get('lon'))
      .then((result) => {
        // If the result is for weather
        this.$set('weather.temp', result.getTemperature(WeatherMan.FAHRENHEIT))
        this.$set('weather.windCill', result.getWindChill(WeatherMan.FAHRENHEIT))
        // console.log('heat index', result.getHeatIndex(WeatherMan.FAHRENHEIT))
        this.$set('weather.windSpeed', result.getWindSpeed(WeatherMan.MILES)) // Or WeatherMan.KILOMETERS or WeatherMan.METERS
        this.$set('weather.humidity', result.getHumidity())
        this.$set('weather.condition', result.getCondition())
        this.$set('weather.sunrise', result.getSunrise())
        this.$set('weather.sunset', result.getSunset())
        this.$set('isLoadingWeather', false)
        console.log('got weather')
      })
      .catch((e) => {
        console.log('oh no. we made something angry')
      })
    }
  }
}
</script>

<style lang='sass' >
.card.app--weather
  color: black
  .level
    margin-left: 1em
  .weather--output
    margin-bottom: 5em
</style>
