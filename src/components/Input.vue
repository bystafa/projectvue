<template>
    <div class="mainInput">
        <div class="search">
            <input @keyup="getCity" type="search" v-model="place" placeholder="Введите город">
            <div :class="{up}" class="arrow"></div>
        </div>
        <div class="lst">
            <p :class="{display}">Введите минимум три символа, либо попробуйте изменить запрос</p>
            <p v-for="(place, index) in foundPlaces" :key="index" @click="choose(index)">
                {{place}}
            </p>
        </div>
    </div>
</template>

<script>
const axios = require('axios')
export default {
    data() {
        return {
            place: '',
            up: false,
            display: true,
            places: [],
            foundPlaces: [],
            coordinates: [],
            lat: 0,
            lon: 0
        }
    },
    watch: {
        $route() {
            if (this.$route.query.lat != this.lat && this.$route.query.lon != this.lon &&
            this.$route.query.lat && this.$route.query.lon)
            this.find([this.$route.query.lat, this.$route.query.lon])
        }
    },
    methods: {
        choose(id){
            this.up = false
            this.place = this.foundPlaces[id]
            this.lat= this.coordinates[id][0],
            this.lon = this.coordinates[id][1]
            this.clear()
            this.$router.push({name:'Carousel', query: {lat: this.lat, lon: this.lon, page: 0}})
        },
        getCity() {
            if ((this.place.length >= 1 && !this.up) || (this.up && this.place.length === 0)) this.up = !this.up
            if (this.place.length >= 1 && this.place.length < 3) this.display = false
            else this.display = true
            if (this.place.length >= 3) this.find(this.place)
            else this.clear()
        },
        find(info) {
            this.clear()
            axios
            .get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=ba2ffe99-a90a-4c7e-893a-d14cbc5b3dc7&geocode=${info}`)
            .then(response => (this.places = response.data.response.GeoObjectCollection.featureMember.forEach(element => 
            {   
                if (info instanceof Array) {
                    if (this.place.length === 0) this.place = `${element.GeoObject.name}, ${element.GeoObject.description}`
                } else {
                    this.foundPlaces.push(`${element.GeoObject.name}, ${element.GeoObject.description}`)
                    this.coordinates.push(element.GeoObject.Point.pos.split(' '))
                }
            })))
        },
        clear(){
            this.foundPlaces.length = 0
            this.coordinates.length = 0
        }
    }
}
</script>

<style lang="scss">
    .router-link {
        color: #000000;
        text-decoration: none;
    }
    input {
        padding: 20px 10px;
        height: 10px;
        width: 100%;
        position: relative;
        outline: none;
    }
    .search {
        display: flex;
        flex-direction: row;
    }
    .arrow {
        position: relative;
        right: 15px;
        top: 16px;
        transform: rotate(90deg);
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid #cdcdcd;
    }
    .up {
        transform: rotate(-90deg);
    }
    .lst {
        width: 99.5%;
    }
    p {
        margin: 0;
        background: #ffffff;
        padding: 10px 10px;
        cursor: pointer;
    }
    .display {
        display: none;
    }

    p:hover {
        background: rgb(32, 172, 90);
        color: #ffffff;
    }
    h1 {
        color: #ffffff;
        text-align: center;
        font-weight: 1;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 55px;
    }
</style>