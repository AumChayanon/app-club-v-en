<template>
  <div class="home">
    <div>
      <Menu />
    </div>
    <div class="div_home">

      <div>
        <h2 style="color: #123B8E;">Club Volleyball EN</h2>
      </div>
      <div v-if="status_div_showAllUser === 'default'" style="text-align: left; padding-top: 10px">
        <b>เลือกตัวผู้เล่น </b>
        <!-- <div>
          <b-form-radio-group
            v-model="selected"
            :options="options"
            class="mb-3"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-radio-group>
          <div class="mt-3"></div>
        </div> -->
        <carousel :pagination-enabled="false" :per-page-custom="[[360, 2.5], [700, 4],[1199, 6]] ">
          <slide v-for="item in partDataUser" :key="item.id">
            <div v-on:click="selectUser(item)">
              <div class="button_select">
                <img
                  :src="item.photo"
                  :alt="item.name"
                  style="border-radius: 50%; width: 2.5rem; height: 2.5rem"
                />
                <p style="padding-top: 10px;" class="text">
                  {{ item.name }}
                </p>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
      <div v-if="this.dataUserSelect.length > 0">
        <br />
        <b>ผู้เล่นที่ถูกเลือก</b>
        <carousel :pagination-enabled="false" :per-page-custom="[[360, 4.5], [700, 6],[1199, 8]] ">
          <slide v-for="index in dataUserSelect" :key="index.id">
            <div
              class="button button3"
              id="status_load"
              v-on:click="delUserSelect(index.uid)"
            >
              <img
                :src="index.photo"
                :alt="index.name"
                style="border-radius: 50%; width: 2.5rem; height: 2.5rem"
              />
            </div>
            <p class="text">{{ index.name }}</p>
          </slide>
        </carousel>
        <button
          type="button"
          class="btn_home btn-outline-success"
          v-on:click="userSelected"
          v-if="this.status_btn_userSelected === 'default'"
        >
          ตกลง
        </button>
      </div>
      <div v-if="this.user_Selected.length > 0">
        <div style="text-align: left;">
<b>เริ่มเก็บข้อมูลผู้เล่น</b>
        </div>

        <div
          class="row"
          id="divOneUesr"
          v-for="index in user_Selected"
          :key="index.id"
        >
          <div>
            <img
              :src="index.photo"
              alt="index.name"
              style="border-radius: 50%; width: 2.5rem; height: 2.5rem"
            />
          </div>
          <div class="col" style="max-width: 10%">
            <p>{{ index.name }}</p>
          </div>
          <carousel
            class="col"
            :pagination-enabled="false"
            :per-page="3.5"
            :auto-play-direction="forward"
          >
            <slide>
              <h6>Set</h6>
              <h5>{{ index.set }}</h5>
              <span class="minus" v-on:click="minus(index, opt.set)">-</span
              ><span class="plus" v-on:click="plus(index, opt.set)">+</span>
            </slide>
            <slide>
              <h6>Spikes</h6>
              <h5>{{ index.spikes }}</h5>
              <span class="minus" v-on:click="minus(index, opt.spikes)">-</span
              ><span class="plus" v-on:click="plus(index, opt.spikes)">+</span>
            </slide>
            <slide>
              <h6>Blocks</h6>
              <h5>{{ index.blocks }}</h5>
              <span class="minus" v-on:click="minus(index, opt.blocks)">-</span
              ><span class="plus" v-on:click="plus(index, opt.blocks)">+</span>
            </slide>
            <slide>
              <h6>Digs</h6>
              <h5>{{ index.digs }}</h5>
              <span class="minus" v-on:click="minus(index, opt.digs)">-</span
              ><span class="plus" v-on:click="plus(index, opt.digs)">+</span>
            </slide>
            <slide>
              <h6>Aces</h6>
              <h5>{{ index.aces }}</h5>
              <span class="minus" v-on:click="minus(index, opt.aces)">-</span
              ><span class="plus" v-on:click="plus(index, opt.aces)">+</span>
            </slide>
            <slide>
              <h6>Service Error</h6>
              <h5>{{ index.serviceError }}</h5>
              <span class="minus" v-on:click="minus(index, opt.serviceError)"
                >-</span
              ><span class="plus" v-on:click="plus(index, opt.serviceError)"
                >+</span
              >
            </slide>
          </carousel>
        </div>
        <div>
          <b-button type="button" class="btn_home" v-on:click="save"
          >บันทึก</b-button>
          <br>
          <a v-on:click="cancel">ยกเลิก</a>
        </div>
        <br>
      </div>
      <div v-else style="padding-top:50%;">
      <!-- <img src="../assets/sun copy.svg" alt=""> -->
  <a-empty :description="false" />
  <p>ไม่มีข้อมูล</p>
    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import 'ant-design-vue/lib/date-picker/style/css'; // for css
import firebase from "firebase";
import Menu from "../components/Menu";
// import carousel from "vue-owl-carousel";
import { Carousel, Slide } from "vue-carousel";
import Swal from "sweetalert2";
var database = firebase.database();
export default {
  name: "Home",
  data() {
    return {
      dataUser: [],
      partDataUser: [],
      selected: "A",
      options: [
        { item: "all", name: "ทั้งหมด" },
        { item: "man", name: "ชาย" },
        { item: "female", name: "หญิง" },
      ],
      dataUserSelect: [],
      user_Selected: [],
      opt: {
        set: "set",
        spikes: "spikes",
        blocks: "blocks",
        digs: "digs",
        aces: "aces",
        serviceError: "serviceError",
      },
      status_btn_userSelected:"default",
      status_div_showAllUser:"default",
    };
  },
  components: {
    Menu,
    // carousel,
    Carousel,
    Slide,
  },
  async created() {
    var dataRef = database.ref("/Users/");
    await firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.dataUser = firebaseUser;
    });
    var status = 0;
    await dataRef.on("child_added", (snapshot) => {
      this.partDataUser.push(snapshot.val());
      if (snapshot.val().email === this.dataUser.email) {
        return (status = 1);
      }
    });

    //console.log("num_page", this.num_page );
    setTimeout(() => this.gatSevDay(status), 3000);
  },
  methods: {
    gatSevDay(status) {
      var dataRef = database.ref("/Users/");
      //console.log("status", status);
      if (status === 0) {
        dataRef.push({
          name: this.dataUser.displayName,
          email: this.dataUser.email,
          photo: this.dataUser.photoURL,
          uid: this.dataUser.uid,
        });
      }
    },
    test() {
      //console.log("partUser", this.partUser);
    },

    selectUser(e) {
      if (this.dataUserSelect.length > 0) {
        if (this.dataUserSelect.includes(e) === false) {
          this.dataUserSelect.push(e);
        }
        //console.log(this.dataUserSelect.includes(e));
      } else {
        this.dataUserSelect.push(e);
      }

      //console.log("uid: ", this.dataUserSelect);
    },
    userSelected() {
      this.user_Selected = [];
      for (let index = 0; index < this.dataUserSelect.length; index++) {
        this.user_Selected.push({
          email: this.dataUserSelect[index].email,
          name: this.dataUserSelect[index].name,
          photo: this.dataUserSelect[index].photo,
          uid: this.dataUserSelect[index].uid,
          set: 0,
          spikes: 0,
          blocks: 0,
          digs: 0,
          aces: 0,
          serviceError: 0,
        });
      }
      //console.log(this.user_Selected);
      this.status_btn_userSelected = "close"
      this.status_div_showAllUser = "close"
    },
    delUserSelect(e) {
      if(this.user_Selected.length > 0){
      //   Swal.fire({
      //   text: "ไม่สามารถลบผู้เล่นในขณะกำลังเก็บข้อมูลผู้เล่นได้?",
      //   icon: "info",
      //   confirmButtonColor: "rgb(126, 199, 66)",
      //   confirmButtonText: "ยกเลิก",
      // })
      //console.log("ลบผู้เล่นไม่ได้");
      }
      else{
        Swal.fire({
        title: "ลบผู้เล่น?",
        text: "คุณแน่ในที่จะลบตัวผู้เล่นคนนี้!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "rgb(126, 199, 66)",
        cancelButtonColor: "#353535",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          const del = this.dataUserSelect.find((mgs) => mgs.uid == e);
          //console.log("del", del);
          const index = this.dataUserSelect.indexOf(del);
          //console.log("index", index);
          this.dataUserSelect.splice(index, 1);
          Swal.fire("ลบสำเร็จ!", "ลบตัวผู้เล่นที่คุณเลือกสำเร็จ.", "success");
        }
      });
      }

    },
    minus(number, opt) {
      if (number[opt] > 0) {
        number[opt] = number[opt] - 1;
      } else {
        number[opt] = 0;
      }
    },
    plus(number, opt) {
      number[opt] = number[opt] + 1;
    },
    save(){
      const today = new Date();
      var date =
        today.getMonth() +
        1 +
        "/" +
        today.getDate() +
        "/" +
        today.getFullYear();
      for (let i = 0; i < this.user_Selected.length; i++) {
        var dataRef = database.ref("/PersonalData/" + this.user_Selected[i].uid + "/");
        dataRef.push({
          name: this.dataUserSelect[i].name,
          set: this.user_Selected[i].set,
          spikes: this.user_Selected[i].spikes,
          blocks: this.user_Selected[i].blocks,
          digs: this.user_Selected[i].digs,
          aces: this.user_Selected[i].aces,
          serviceError: this.user_Selected[i].serviceError,
          uid: this.user_Selected[i].uid,
          date:date});
        var date2 = today.getMonth() + 1 + ":" + today.getDate() + ":" + today.getFullYear();
        var dataRefToData = database.ref("/DataToDay/" + date2 + "/");
        if(i === 0){
          dataRefToData.push({
          status:"start",
          name: this.dataUserSelect[i].name,
          set: this.user_Selected[i].set,
          spikes: this.user_Selected[i].spikes,
          blocks: this.user_Selected[i].blocks,
          digs: this.user_Selected[i].digs,
          aces: this.user_Selected[i].aces,
          serviceError: this.user_Selected[i].serviceError,
          photo: this.dataUserSelect[i].photo,
          date:date});
        }else{
          dataRefToData.push({
            status:"null",
          name: this.dataUserSelect[i].name,
          set: this.user_Selected[i].set,
          spikes: this.user_Selected[i].spikes,
          blocks: this.user_Selected[i].blocks,
          digs: this.user_Selected[i].digs,
          aces: this.user_Selected[i].aces,
          serviceError: this.user_Selected[i].serviceError,
          photo: this.dataUserSelect[i].photo,
          date:date});
        }

      }




      // //console.log("save",this.user_Selected);
      this.dataUserSelect = [],
      this.user_Selected = []
      this.status_btn_userSelected="default"
      this.status_div_showAllUser="default"
    },
    cancel(){
      this.dataUserSelect = [],
      this.user_Selected = [],
      this.status_btn_userSelected="default"
      this.status_div_showAllUser="default"
    }
  },
};
</script>
<style>
.div_home {
  margin: 0px 16px 0px 16px;
}
.button {
  background-color: #f9f9f9;
  border-radius: 50%;
  color: #123B8E;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada;
}
.button_select {
  background-color: #f9f9f9;
  border-radius: 10px;
  color: #474747;
  padding: 14px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px 2px;
  box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada;
}
.text {
  font-size: 12px;
  display: block;
  width: 70px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.button_select:hover {
  background-color: #4979DC;
  border-radius: 10px;
  color: #f9f9f9;
  padding: 14px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px 2px;
  box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada;
}
.btn_home {
  width: 80%;
  background-color:#123B8E; /* Green */
  border: none;
  color: rgb(255, 255, 255);
  padding: 16px 16px 16px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 9px 5px;
  border-radius: 8px;
  cursor: pointer;
}
#divUesrSelected {
  background-color: #f5f5f5;
  border-radius: 10px;
  color: #333333;
  padding: 14px;
  font-size: 16px;
  margin: 5px 2px;
  box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada;
}
#divOneUesr {
  background-color: #f5f5f5;
  border-radius: 10px;
  color: #333333;
  padding: 10px;
  font-size: 14px;
  margin: 10px 2px;
  box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada;
}
.minus {
  background-color: rgb(255, 255, 255);
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
}
.plus {
  background-color: rgb(255, 255, 255);
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
}
span:hover{
  background-color: #4979DC;
  color: #ffffff;
}
</style>
