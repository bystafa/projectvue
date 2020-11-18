<template>
    <div>
        <h1>Погода</h1>
        <inputLine :foundPlaces="foundPlaces" @place="information" @id="weather_id"/>
        <!-- <carousel v-if="weather.length > 0" :dataCarousel="weather"/> -->
        <router-view />
    </div>
</template>

<script>
const axios = require('axios')
import inputLine from "@/components/Input.vue"
import carousel from "@/components/Carousel.vue"
export default {
    components: {
        inputLine, carousel
    },
    data() {
        return {
            place: [],
            foundPlaces: [],
            coordinates: [],
            weather:[]
        }
    },
    methods: {
        information(input__data) {
            this.coordinates.length = 0
            this.foundPlaces.length = 0
            if (input__data.length >= 3) {
                axios
                .get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=ba2ffe99-a90a-4c7e-893a-d14cbc5b3dc7&geocode=${input__data}`)
                .then(response => (this.place = response.data.response.GeoObjectCollection.featureMember.forEach(element => 
                {
                    this.foundPlaces.push(`${element.GeoObject.name}, ${element.GeoObject.description}`)
                    this.coordinates.push(element.GeoObject.Point.pos.split(' '))
                })))
            }
        },
        weather_id(id) {
            // this.weather.length = 0
            // axios
            // .get(`http://api.openweathermap.org/data/2.5/onecall?lat=${this.coordinates[id][0]}&lon=${this.coordinates[id][1]}&units=metric&exclude=current,minutely,hourly,alerts&appid=868fe0c7e6c079dcb21957bd7909a29a`)
            // .then(response => (response.data.daily.forEach(element => this.weather.push(element))));
            let lat= this.coordinates[id][0],
                lon = this.coordinates[id][1]
            this.$router.push({name:'Carousel', query: {lat: lat, lon: lon}}) 
            console.log(this.$router.query)
        }
    }
}
</script>

<style lang="scss">
body {
        padding: 200px 400px;
    }
h1 {
    font-weight: 1;
    text-align: center;
    color: #ffffff;
}

h4 {
    color: #ffffff;
}
@media screen and (max-width: 1670px){
    body {
        padding: 200px 300px;
    }
}
@media screen and (max-width: 1480px){
    body {
        padding: 200px;
    }
}
@media screen and (max-width: 1350px){
    body {
        padding: 200px 150px;
    }
}
</style>