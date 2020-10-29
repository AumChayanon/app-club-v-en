<template>
  <div class="div_max">
      <div class="row" id="divToday" v-for="index in data" :key="index.id">
        <div class="col" style="max-width:20%;">
          <img
            :src="index.photo"
            alt="index.name"
            style="border-radius: 50%; width: 2.5rem; height: 2.5rem"
          />
          <p class="text_about">{{ index.name }}</p>
        </div>
        <carousel
          class="col"
          :pagination-enabled="false"
          :per-page="3.5"
          style="max-width:80%;"
        >
        <slide style="padding-right:10px;">
            <h6>All</h6>
            <h4>{{ index.all }}</h4>
          </slide>
          <slide>
            <p>Set</p>
            <b>{{ index.set }}</b>
          </slide>
          <slide>
            <p>Spikes</p>
            <b>{{ index.spikes }}</b>
          </slide>
          <slide>
            <p>Blocks</p>
            <b>{{ index.blocks }}</b>
          </slide>
          <slide>
            <p>Digs</p>
            <b>{{ index.digs }}</b>
          </slide>
          <slide>
            <p>Aces</p>
            <b>{{ index.aces }}</b>
          </slide>
          <slide>
            <p>Error</p>
            <b>{{ index.serviceError }}</b>
          </slide>

        </carousel>
        <br>
      </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
    props:["data"],
    components: {
    Carousel,
    Slide,
  },
    data() {
        return {
            dataMax:[],
        }
    },


}
</script>

<style scoped>
.div_max{
    margin: 0px 16px 0px 16px;
}
#divToday {
  background-color: #f5f5f5;
  border-radius: 10px;
  color: #333333;
  padding: 10px;
  font-size: 14px;
  margin: 10px 5px;
  box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada;
}
</style>
