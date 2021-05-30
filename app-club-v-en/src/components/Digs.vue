<template>
  <div class="div_max" style="padding-bottom:10px;">
      <div class="row" id="divToday" v-for="(index, count) in data" :key="index.id">
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
        <div class="col" id="divCenter">
          <img
            :src="index.photo"
            alt="index.name"
            style="border-radius: 50%; width: 2.5rem; height: 2.5rem;"
          />
        </div>
        <div class="col" id="divCenter">
          <p class="text_max">{{ index.name }}: </p>
        </div>
        <div class="col" id="divCenter">
          <h2>{{ index.maxDigs }}</h2>
        </div>
        <br>
      </div>
  </div>
</template>

<script>
export default {
    props:["data"],
    components: {
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
#divCenter{
  max-width:20%; 
  text-align: center; 
  margin:auto;
}
</style>
