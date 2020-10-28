<template>
  <div class="div_his">
    
    <div class="row" v-for="item in data" :key="item.id">
      <br />
      <p>{{item[0].date}}</p>
      <div class="row" id="divToday" v-for="index in item" :key="index.id">
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
          <slide>
            <h6>Set</h6>
            <h5>{{ index.set }}</h5>
          </slide>
          <slide>
            <h6>Spikes</h6>
            <h5>{{ index.spikes }}</h5>
          </slide>
          <slide>
            <h6>Blocks</h6>
            <h5>{{ index.blocks }}</h5>
          </slide>
          <slide>
            <h6>Digs</h6>
            <h5>{{ index.digs }}</h5>
          </slide>
          <slide>
            <h6>Aces</h6>
            <h5>{{ index.aces }}</h5>
          </slide>
          <slide>
            <h6>Error</h6>
            <h5>{{ index.serviceError }}</h5>
          </slide>
        </carousel>
      </div>
      
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  props:["data"],
  components:{
    Carousel,
    Slide,
  }
}
</script>

<style>
.div_his{
  margin: 0px 16px 0px 16px;
}
</style>
