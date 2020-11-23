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
                :class="{current: (index - 1) == currentSlideIndex}"
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
            this.changePage()
        },
        nextSlide() {
            if (this.currentSlideIndex >= (this.dataCarousel.length / 4) - 1) this.currentSlideIndex = 0
            else this.currentSlideIndex++
            this.changePage()
        },
        goto(index){
            this.currentSlideIndex = index - 1
            this.changePage()
        },
        getInfo() {
            this.dataCarousel.length = 0
            axios
            .get(`http://api.openweathermap.org/data/2.5/onecall?lat=${this.$route.query.lat}&lon=${this.$route.query.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=bf9bdc2f20c8f72608b22c412062526f`)
            .then(response => (response.data.daily.forEach(element => this.dataCarousel.push(element))))
            this.currentSlideIndex = this.$route.query.page
        },
        async changePage(){
            console.log(this.$route.query.lat,this.$route.query.lon,this.$route.query.page)
            let routerParams = this.$route.query
            let RouterParams = Object.assign({page:this.currentSlideIndex}, ...routerParams)
            await this.$router.push(RouterParams)
            // await this.$router.push(Object.assign({
            //     page: this.currentSlideIndex
            // }, routerParams))
            console.log(this.$route.query.lat,this.$route.query.lon,this.$route.query.page)
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
        this.getInfo()
    },

    beforeRouteUpdate() {
        this.getInfo()
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