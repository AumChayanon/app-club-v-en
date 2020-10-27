<template>
  <div class="today">
    <div v-if="this.data.length > 0">
    <div class="row" v-for="(item, count) in data" :key="item.id">
      <h5> set: {{ count + 1 }}</h5>
      <br />
      <div class="row" id="divToday" v-for="index in item" :key="index.id">
        <div class="col" style="max-width:20%;">
          <img
            :src="index.photo"
            alt="index.name"
            style="border-radius: 50%; width: 2.5rem; height: 2.5rem"
          />
          <p class="text">{{ index.name }}</p>
        </div>
        <carousel
          class="col"
          :pagination-enabled="false"
          :per-page="3.5"
          :auto-play-direction="forward"
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
      <hr>
    </div>
    </div>
    <div v-else style="padding-top:50%;">
      <!-- <img src="../assets/sun copy.svg" alt=""> -->
  <a-empty :description="false" />
  <p>ไม่มีข้อมูล</p>
    </div>
  </div>
</template>

<script>
// import DatePicker from 'ant-design-vue/lib/date-picker'; // for js
import 'ant-design-vue/lib/date-picker/style/css'; // for css
import { Carousel, Slide } from "vue-carousel";
export default {
  props: ["data"],
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      forward: "",
    };
  },
};
</script>

<style>
.today {
  margin: 0px 16px 0px 16px;
}
#divToday {
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