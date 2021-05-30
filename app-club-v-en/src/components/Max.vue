<template>
  <div class="div_max" style="padding-bottom:10px;">
      <div class="row" id="divToday" v-for="(index, count) in data" :key="index.id">
        <div style="max-width:15%; text-align: center; margin:auto;">
            <div v-if="count === 0" class="col" id="divCenter">
            <img src="../assets/s1.png" alt="Kiwi standing on oval" style="width: 2.5rem; height: 2.5rem"/>
          </div>
          <div v-if="count === 1" class="col" id="divCenter">
            <img src="../assets/s2.png" alt="Kiwi standing on oval" style="width: 2.5rem; height: 2.5rem"/>
          </div>
          <div v-if="count === 2" class="col" id="divCenter">
            <img src="../assets/s3.png" alt="Kiwi standing on oval" style="width: 2.5rem; height: 2.5rem"/>
          </div>
          <div v-if="count > 2" class="col" id="divCenter">
            <h4 style="color:#6d6d6d;">{{count + 1}}</h4>
          </div>
        </div>
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
          style="max-width:65%;"
        >
        <slide style="padding-right:10px;">
            <h6>All</h6>
            <h4>{{ index.max }}</h4>
          </slide>
          <slide>
            <p>Set</p>
            <b>{{ index.maxSet }}</b>
          </slide>
          <slide>
            <p>Spikes</p>
            <b>{{ index.maxSpikes }}</b>
          </slide>
          <slide>
            <p>Blocks</p>
            <b>{{ index.maxBlocks }}</b>
          </slide>
          <slide>
            <p>Digs</p>
            <b>{{ index.maxDigs }}</b>
          </slide>
          <slide>
            <p>Aces</p>
            <b>{{ index.maxAces }}</b>
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
    margin: 0px 10px 0px 10px;
}
#divToday {
  background-color: #f5f5f5;
  border-radius: 10px;
  color: #333333;
  padding: 5px;
  font-size: 14px;
  margin: 10px 5px;
  box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada;
}
</style>
