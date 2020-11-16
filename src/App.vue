<template>
    <div class="main">
        <h1> ПОГОДА </h1>
        <carousel  :dataCarousel="arr" :day="date"/>
    </div>
</template>

<script>
const axios = require('axios')
import inputLine from '@/components/Input.vue'
import carousel from '@/components/Carousel.vue'
export default {
    components: {
        inputLine, carousel
    },
    data() {
        return {
            place: null,
            weather: [],
            date: [],
            arr: [
                {id:1 ,name: 'img1', img: '1.jpg'},
                {id:2 ,name: 'img2', img: '2.jpg'},
                {id:3 ,name: 'img3', img: '3.jpg'},
                {id:4 ,name: 'img4', img: '4.jpg'}
            ]
        }
    },
    mounted() {
        axios
            .get('https://geocode-maps.yandex.ru/1.x/?format=json&apikey=ba2ffe99-a90a-4c7e-893a-d14cbc5b3dc7&geocode=Москва, улица Новый Арбат, дом 24')
            .then(response => (this.place = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point));
        axios
            .get('http://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=current,minutely,hourly,alerts&appid=868fe0c7e6c079dcb21957bd7909a29a')
            .then(response => (response.data.daily.forEach(element => {
                this.weather.push(element)
                this.date.push(element.dt)
            })));
    }
}
 

</script>

<style lang="scss">
    body {
        background: #000;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    h1{
        font-weight: 1;
        text-align: center;
        color: #ffffff;
    }
    .main {
        padding: 200px 500px 0;
    }
</style>