<template>
  <div>
    <div>
      <Menu />
    </div>
    <div class="div_people">
      <h1 style="color: #123b8e">สมาชิก</h1>
      <div
        class="search-wrapper panel-heading col-sm-12"
        style="padding: 0px 35px 25px 35px"
      >
        <input
          class="form-control"
          type="text"
          v-model="searchQuery"
          placeholder="ค้นหาชื่อ"
          style="
            box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada;
            border-radius: 50px;
            background-color: #f9f9f9;
          "
        />
      </div>
      <div style="text-align: left">
        <h4>สมาชิกทั้งหมด</h4>
      </div>

      <div>
        <table class="table table-hover" style="text-align: left">
          <thead>
            <tr>
              <th>รูป</th>
              <th>ชื่อ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in resultQuery" :key="item.id">
              <td v-on:click="showPeople(item)">
                <img
                  :src="item.photo"
                  alt="Paris"
                  style="border-radius: 50%; width: 2rem; height: 2rem"
                />
              </td>
              <td v-on:click="showPeople(item)">
                <a target="_blank">{{ item.name }}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Menu from "../components/Menu";
import Swal from "sweetalert2";
var database = firebase.database();
export default {
  data() {
    return {
      dataAllUser: [],
      searchQuery: null,
    };
  },
  components: {
    Menu,
  },
  async created() {
    var dataRef = database.ref("/Users/");
    await dataRef.on("child_added", (snapshot) => {
      this.dataAllUser.push(snapshot.val());
    });
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.dataAllUser.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.dataAllUser;
      }
    },
  },
  methods: {
    showPeople(item) {
      // console.log("data",item);
      Swal.fire({
        title: item.name,
        text: "เพศ: " + item.sex,
        imageUrl: item.photo,
        imageWidth: 400,
        imageHeight: 'auto',
        imageAlt: "Custom image",
        confirmButtonText: 'ปิด',
        confirmButtonColor: '#123b8e',
      });
    },
  },
};
</script>

<style>
.div_people {
  margin: 16px;
}
</style>
