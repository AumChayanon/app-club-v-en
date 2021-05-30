<template>
  <div class="div_his">

    <div class="row" v-for="item in data" :key="item.id">
      <br />
      <h6>set: {{ item[0].setNumber }} <b v-if="item[0].statusScore === 'win'" style="color:#a2b54d;">{{ item[0].statusScore }}</b> <b  v-if="item[0].statusScore === 'lose'" style="color:#CC0000;">{{ item[0].statusScore }}</b> score: {{ item[0].scoreMe }}:{{ item[0].scoreHis }}  ({{ item[0].date }})</h6>
      <div class="row" id="divHis" v-for="index in item" :key="index.id">
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
        <br>
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
  },
  created() {
    console.log("data",this.data);
  },
}
</script>

<style scoped>
.div_his{
  margin: 0px 16px 0px 16px;
}
#divHis {
  background-color: #f5f5f5;
  border-radius: 10px;
  color: #333333;
  padding: 10px;
  font-size: 14px;
  margin: 5px 5px;
  box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada;
}
.row {
  margin-bottom: 16px;
}
</style>
