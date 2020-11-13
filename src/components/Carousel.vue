<template>
    <div>
        <h4> {{convertTimestamp(day[cnt])}} </h4>
        <div class="wrapper">
            <div class="arrow left"></div>
            <div class="carousel">
                <carouselItem v-for="item in dataCarousel" :key="item.id" :itemData="item"/>
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
    data() {
        return {
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            cnt: 0
        }
    },
    props: {
        dataCarousel: {
            type: Array,
            default: () => []
        },
        day: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        convertTimestamp(timestamp) {
            let d = new Date(timestamp * 1000),
                yyyy = d.getFullYear(),
                mm = ('0' + (d.getMonth())).slice(-2), 
                dd = ('0' + d.getDate()).slice(-2),
                time = new Date(yyyy,mm,dd);
            return this.days[time.getDay()];
        },
        next() {
            if (this.cnt > 6) {
                this.cnt = 0
            }
            this.cnt++
        }
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