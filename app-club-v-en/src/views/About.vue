<template>
  <div class="about">
    <div>
      <Menu />
    </div>
    <div class="div_about">
      <h1 style="color: #123B8E;">คะแนนของผู้เล่น</h1>
      <carousel
        :auto-play-direction="forward"
        :pagination-enabled="false"
        :per-page="3"
      >
        <slide>
          <div
            class="button button3"
            id="status_load"
            style="border-radius: 50%; width: 3rem; height: 3rem"
            v-on:click="today"
          >
            <img src="../assets/sun.svg" alt="Kiwi standing on oval" />
          </div>
          <p>Today</p>
        </slide>
        <slide>
          <div
            class="button button3"
            id="status_load"
            style="border-radius: 50%; width: 3rem; height: 3rem"
            v-on:click="max"
          >
            <img src="../assets/trophy.svg" alt="Kiwi standing on oval" />
          </div>
          <p>Max</p>
        </slide>
        <slide>
          <div
            class="button button3"
            id="status_load"
            style="border-radius: 50%; width: 3rem; height: 3rem"
          >
            <img src="../assets/warning.svg" alt="Kiwi standing on oval" />
          </div>
          <p>Error</p>
        </slide>
        <slide>
          <div
            class="button button3"
            id="status_load"
            style="border-radius: 50%; width: 3rem; height: 3rem"
          >
            <img src="../assets/history.svg" alt="Kiwi standing on oval" />
          </div>
          <p>History</p>
        </slide>
      </carousel>
      <div v-if="this.status === 'today'">
        <div style="text-align: left"><h3>Today</h3></div>
        <Today :data="this.datatoday" />
      </div>
      <div v-if="this.status === 'max'">
        <div style="text-align: left"><h3>Maximus</h3></div>
        <Max :data="this.dataMax" />
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import Menu from "../components/Menu";
import { Carousel, Slide } from "vue-carousel";
import Today from "../components/Today";
import Max from "../components/Max";
var database = firebase.database();
export default {
  components: {
    Menu,
    Carousel,
    Slide,
    Today,
    Max,
  },
  data() {
    return {
      forward: "",
      status: "today",
      datatoday: [],
      dataMax: [],
    };
  },
  async created(){
    this.computeMax()
    const today = new Date();
    var date =
      today.getMonth() + 1 + ":" + today.getDate() + ":" + today.getFullYear();
    var dataRef = database.ref("/DataToDay/" + date + "/");
    var dataUserToday = [];
    var count = -1;
    await dataRef.on("child_added", (snapshot) => {
      if (snapshot.val().status === "start") {
        dataUserToday = [];
        count = count + 1;
      } else {
        count = count + 0;
      }
      dataUserToday.push(snapshot.val());
      this.datatoday[count] = dataUserToday;
    });
    console.log(this.datatoday);


  },
  methods: {
    async computeMax() {
      var dataUsers = database.ref("/Users/");
      var user = [];
      this.dataMax = [];
      await dataUsers.on("child_added", (snapshot) => {
        user.push(snapshot.val());
        // console.log("user",snapshot.val())
      });
      for (let i = 0; i < user.length; i++) {
        var dataRef = database.ref("/PersonalData/" + user[i].uid +"/");
        var set = 0;
        var spikes = 0;
        var blocks = 0;
        var digs = 0;
        var aces = 0;
        var serviceError = 0;
        var all = 0;
        var uid = "";
        dataRef.on("child_added", (snapshot) => {
          set = snapshot.val().set + set;
          spikes = snapshot.val().spikes + spikes;
          blocks = snapshot.val().blocks + blocks;
          digs = snapshot.val().blocks + blocks;
          aces = snapshot.val().aces + aces;
          serviceError = snapshot.val().serviceError + serviceError;
          uid = snapshot.val().uid
          all = set + spikes + blocks + digs + aces + all;
        });
        var d = {
          set: set,
          spikes: spikes,
          blocks: blocks,
          digs: digs,
          aces: aces,
          serviceError: serviceError,
          all: all,
          name: user[i].name,
          uid:uid,
          photo: user[i].photo,
        };
        if(uid === user[i].uid){
          this.dataMax.push(d);
        }
      }
      await this.dataMax.sort((t1, t2) => (t1.all > t2.all ? -1 : 1));
      await console.log("this.dataMax",this.dataMax);
    },
    today() {
      this.status = "today";
    },
    max() {
      this.status = "max";
      this.computeMax();
    },
  },
};
</script>
<style>
.div_about {
  margin: 0px 16px 0px 16px;
}
.button {
  background-color: #f9f9f9;
  border-radius: 50%;
  color: #528123;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  box-shadow: -5px -5px 5px #ffffff, 5px 5px 10px #dbdada;
}
.VueCarousel-slide {
  flex-basis: initial;
  padding-right: 5%;
}
.text {
  font-size: 12px;
  display: block;
  width: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
