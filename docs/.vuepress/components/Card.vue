<template>
    <section class="card">
        <router-link :to="item.link" class="card-img" :style="imageStyle">
            <div class="date">
                <div class="month">{{ item.date | moment("MMM") }}</div>
                <div class="day">{{ item.date | moment("Do") }}</div>
            </div>
        </router-link>
        <div class="card-content">
            <router-link :to="item.link" class="card-title">{{ item.title }}</router-link>
            <p class="card-text">{{ item.description }}</p>
            <div class="post-meta">
              <span class="timestamp"><i class="far fa-clock"></i> {{ item.date }}</span>
            </div>
        </div>
    </section>
</template>

<script>
import Vue from 'vue'
import VueMoment from 'vue-moment'
Vue.use(VueMoment)
export default {
  props: {
    item: {
      required: true
    }
  },
  computed: {
    imageStyle() {
        if (this.item.image) {
            return `background-image: url('${this.item.image}'); background-position: 50% 50% !important;`
        } else {
            return `background-image: url('/no-image.jpg'); background-position: 50% 50% !important;`
        }
    }
  }
}
</script>

<style>
.card {
  margin: .5rem;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}
.card-img {
  border-radius: 5px 5px 0 0;
  max-width: 100%;
  display: block;
  height: 12rem;
  position: relative;
  -webkit-background-size: cover;
  background-size: cover;
}
.card-img .date {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
    background: #42b983;
    width: 3.5rem;
    height: 3.5rem;
    padding: .6rem 0;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    color: #FFFFFF;
    font-weight: 700;
    text-align: center;
    -webkti-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.card-content {
  padding: 20px;
}
.card-title {
  display: block;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #3a5169;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis; 
}
.card-text {
  color: #777;
  font-size: 14px;
  line-height: 1.5;
}
.post-meta {
  color: #777;
}
.timestamp {
  font-size: .8rem;
}
</style>

