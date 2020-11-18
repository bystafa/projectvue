<template>
    <div class="main">
        <div class="arrow left" @click="prevSlide"></div>
        <div class="wrapper">
            <div class="carousel" :style="{'margin-left': '-' + (100 * currentSlideIndex) + '%'}">
                <carouselItem v-for="item in dataCarousel" 
                :key="item.dt" 
                :itemData="item"/>
            </div>
            <div class="lines">
                <div class="line" v-for="index in lines" :key="index" 
                :class="{current: currentSlideIndex === (index - 1)}"
                @click="goto(index)"></div>
            </div>
        </div>
        <div class="arrow right" @click="nextSlide"></div>
    </div>
</template>


<script>
const axios = require('axios')
import carouselItem from '@/components/Carousel-item.vue'
export default {
    components: {
        carouselItem
    },
    methods: {
        prevSlide() {
            if (this.currentSlideIndex > 0) this.currentSlideIndex--
            else this.currentSlideIndex = (this.dataCarousel.length / 4) - 1
        },
        nextSlide() {
            if (this.currentSlideIndex >= (this.dataCarousel.length / 4) - 1) this.currentSlideIndex = 0
            else this.currentSlideIndex++
        },
        goto(index){
            this.currentSlideIndex = index - 1
        }
    },
    data() {
        return {
            dataCarousel: [],
            currentSlideIndex: 0,
            lines: 2
        }
    },
    created() {
        this.dataCarousel.length = 0
        console.log(this.$router.query)
        // axios
        // .get(`http://api.openweathermap.org/data/2.5/onecall?lat=${this.$router.query.lat}&lon=${this.$router.query.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=868fe0c7e6c079dcb21957bd7909a29a`)
        // .then(response => (response.data.daily.forEach(element => this.dataCarousel.push(element))));
    }
}
</script>

<style lang="scss">
h4 {
    font-weight: 1;
    text-align: center;
    color: #ffffff;
}
.wrapper {
    margin: 100px auto 0;
    overflow: hidden;
    width: 800px;
}

.main {
    display: flex;
    justify-content: space-between;
    .arrow {
    position: relative;
    top: 200px;
    border: solid grey;
    border-width: 0 6px 6px 0;
    display: inline-block;
    padding: 10px;
    height: 0;
    cursor: pointer;
    }

    .right {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }
    .left {
        left: 10px;
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
    }
}
.carousel {
    display: flex;
    transition: all ease .5s;
}
.lines {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.line {
    margin: 25px 10px;
    border: 2px solid #808080;
    width: 40px;
    cursor: pointer;
}
.current {
    border-color: #ffffff;
    transition: all ease .5s;
}

@media screen and (max-width: 1200px){
    .wrapper {
        width: 650px;
    }
}
</style>