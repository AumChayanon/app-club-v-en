<template>
  <div class="div_error">
    <div class="row" id="divError" v-for="index in data" :key="index.id">
        <div class="col" style="max-width:20%;">
          <img
            :src="index.photo"
            alt="index.name"
            style="border-radius: 50%; width: 2.5rem; height: 2.5rem"
          />
          <p class="text_about">{{ index.name }}</p>
        </div>
        <div
          class="col"
          :pagination-enabled="false"
          :per-page="3.5"
          style="max-width:80%;"
        >
            <h6>Error</h6>
            <h4>{{ index.serviceError }}</h4>
        </div>
        <br>
      </div>
  </div>
</template>

<script>
export default {
  props:["data"]

}
</script>

<style scoped>
.div_error{
  margin: 0px 16px 0px 16px;
}
#divError{
  background-color: #f5f5f5;
  border-radius: 10px;
  color: #333333;
  padding: 10px;
  font-size: 14px;
  margin: 10px 5px;
  box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada;
}
.row {
  margin-bottom: 16px;
}
</style>
