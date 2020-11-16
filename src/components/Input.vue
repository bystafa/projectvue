<template>
    <div>
        <div class="search">
            <input @keyup="getCity" type="search" v-model="place" placeholder="Введите город">
            <div :class="{up}" class="arrow"></div>
        </div>
        <div class="lst">
            <p :class="{display}">Введите минимум три символа, либо попробуйте изменить запрос</p>
            <p v-for="(place, index) in foundPlaces" :key="index" @click="choose(index)">{{place}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        foundPlaces: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            place: '',
            up: false,
            display: true
        }
    },
    methods: {
        choose(id){
            this.foundPlaces.length = 0
            this.$emit("id", id)
        },
        getCity() {
            if ((this.place.length >= 1 && !this.up) || (this.up && this.place.length === 0)) this.up = !this.up
            if (this.place.length >= 1 && this.place.length < 3) this.display = false
            else this.display = true
            this.$emit("place", this.place)
        }
    }
}
</script>

<style lang="scss">
    body {
        padding: 200px 400px;
    }
    input {
        border: 1px solid black;
        padding: 20px 10px;
        height: 10px;
        width: 100%;
        border-radius: 5px;
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
        border-radius: 5px;
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