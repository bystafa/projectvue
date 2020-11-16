<template>
    <div>
        <div class="wrapper">
            <div class="arrow left"></div>
            <div class="carousel">
                <carouselItem v-for="(item, index) in dataCarousel" 
                :visibleSlide="visibleSlide"
                :index="index" 
                :key="item.dt" 
                :itemData="item"/>
            </div>
            <div class="arrow right" @click="next"></div>
        </div>
    </div>
</template>


<script>
import carouselItem from '@/components/Carousel-item.vue'
export default {
    components: {
        carouselItem
    },
    props: {
        dataCarousel: {
            type: Array,
            default: () => []
        },
        visibleSlide: 0
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
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    .arrow {
    position: relative;
    top: 60px;
    border: solid grey;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    height: 0;
    }
    .right {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }
    .left {
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
    }
    .carousel {
        display: flex;
    }
}

</style>