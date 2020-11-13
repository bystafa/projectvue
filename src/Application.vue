<template>
    <div>
        <h1>Погода</h1>
        <inputLine :foundPlaces="foundPlaces" @place="information" @id="weather"/>
    </div>
</template>

<script>
const axios = require('axios')
import inputLine from "@/components/Input.vue"
export default {
    components: {
        inputLine
    },
    data() {
        return {
            place: [],
            foundPlaces: [],
            coordinates: []
        }
    },
    methods: {
        information(input__data) {
            this.foundPlaces, this.coordinates = []
            axios
            .get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=ba2ffe99-a90a-4c7e-893a-d14cbc5b3dc7&geocode=${input__data}`)
            .then(response => (this.place = response.data.response.GeoObjectCollection.featureMember));
            this.place.forEach(element => 
            {
                this.foundPlaces.push(`${element.GeoObject.name}, ${element.GeoObject.description}`)
                this.coordinates.push(element.GeoObject.Point.pos.split(' '))
            })
        },
        weather(id) {
            // axios
            // .get(`http://api.openweathermap.org/data/2.5/onecall?lat=${this.coordinates[id][0]}&lon=${this.coordinates[id][1]}&exclude=current,minutely,hourly,alerts&appid=868fe0c7e6c079dcb21957bd7909a29a`)
            // .then(response => (response.data.daily.forEach(element => {
            //     this.weather.push(element)
            //     this.date.push(element.dt)
            // })));
        }
    }
}
</script>

<style>
h1 {
    font-weight: 1;
    text-align: center;
    color: #ffffff;
}
</style>