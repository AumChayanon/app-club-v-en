<template>
  <div class="about">
    <div>
      <Menu />
    </div>
    <div class="div_about">
      <h1 style="color: #123b8e">คะแนนของผู้เล่น</h1>
      <carousel
        :pagination-enabled="false"
        :per-page-custom="[
          [360, 4.5],
          [700, 6],
          [1199, 8],
        ]"
      >
        <slide>
          <div
            class="button_about button3"
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
            class="button_about button3"
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
            class="button_about button3"
            id="status_load"
            style="border-radius: 50%; width: 3rem; height: 3rem"
            v-on:click="maxAces"
          >
            <img src="../assets/Aces.svg" alt="Kiwi standing on oval" />
          </div>
          <p>Aces</p>
        </slide>
        <slide>
          <div
            class="button_about button3"
            id="status_load"
            style="border-radius: 50%; width: 3rem; height: 3rem"
            v-on:click="maxBlocks"
          >
            <img src="../assets/Blocks.svg" alt="Kiwi standing on oval" />
          </div>
          <p>Blocks</p>
        </slide>
        <slide>
          <div
            class="button_about button3"
            id="status_load"
            style="border-radius: 50%; width: 3rem; height: 3rem"
            v-on:click="maxDigs"
          >
            <img src="../assets/Digs.svg" alt="Kiwi standing on oval" />
          </div>
          <p>Digs</p>
        </slide>
        <slide>
          <div
            class="button_about button3"
            id="status_load"
            style="border-radius: 50%; width: 3rem; height: 3rem"
            v-on:click="maxSet"
          >
            <img src="../assets/Set.svg" alt="Kiwi standing on oval" />
          </div>
          <p>Set</p>
        </slide>
        <slide>
          <div
            class="button_about button3"
            id="status_load"
            style="border-radius: 50%; width: 3rem; height: 3rem"
            v-on:click="maxSpikes"
          >
            <img src="../assets/Spikes.svg" alt="Kiwi standing on oval" />
          </div>
          <p>Spikes</p>
        </slide>
        <slide>
          <div
            class="button_about button3"
            id="status_load"
            style="border-radius: 50%; width: 3rem; height: 3rem"
            v-on:click="history"
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
      <div v-if="this.status === 'aces'">
        <div style="text-align: left"><h3>Maximus Aces</h3></div>
        <Aces :data="this.dataMax" />
      </div>
      <div v-if="this.status === 'blocks'">
        <div style="text-align: left"><h3>Maximus Blocks</h3></div>
        <Blocks :data="this.dataMax" />
      </div>
      <div v-if="this.status === 'digs'">
        <div style="text-align: left"><h3>Maximus Digs</h3></div>
        <Digs :data="this.dataMax" />
      </div>
      <div v-if="this.status === 'set'">
        <div style="text-align: left"><h3>Maximus Set</h3></div>
        <Set :data="this.dataMax" />
      </div>
      <div v-if="this.status === 'spikes'">
        <div style="text-align: left"><h3>Maximus Spikes</h3></div>
        <Spikes :data="this.dataMax" />
      </div>
      <div v-if="this.status === 'history'">
        <div style="text-align: left"><h3>History</h3></div>
        <History :data="this.dataHistory" />
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
import Aces from "../components/Aces";
import Blocks from "../components/Blocks";
import Digs from "../components/Digs";
import Set from "../components/Set";
import Spikes from "../components/Spikes";
import History from "../components/History"
var database = firebase.database();
export default {
  components: {
    Menu,
    Carousel,
    Slide,
    Today,
    Max,
    History,
    Aces,
    Blocks,
    Digs,
    Set,
    Spikes
  },
  data() {
    return {
      status: "today",
      datatoday: [],
      dataMax: [],
      dataHistory: [],
    };
  },
  async created() {
    await this.computeToday();
    this.computeMax();
    this.computeHistory();
    setTimeout(() => this.computeToday(), 1000);
    // this.computeMax();
    //console.log(this.datatoday);
  },
  methods: {
    async computeToday() {
      const today = new Date();
      var date =
        today.getMonth() +
        1 +
        ":" +
        today.getDate() +
        ":" +
        today.getFullYear();
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
    },
    async computeMax(status) {
      var dataUsers = database.ref("/Users/");
      var user = [];
      this.dataMax = [];
      await dataUsers.on("child_added", (snapshot) => {
        user.push(snapshot.val());
        // //console.log("user",snapshot.val())
      });
      user.forEach((element) => {
        var dataRefSumScore = database.ref("/sumSore/" + element.uid + "/");
        dataRefSumScore.on("child_added", (snapshot) => {
          this.dataMax.push({
            name: element.name,
            photo: element.photo,
            max: snapshot.val().max,
            maxSet: snapshot.val().maxSet,
            maxSpikes: snapshot.val().maxSpikes,
            maxBlocks: snapshot.val().maxBlocks,
            maxDigs: snapshot.val().maxDigs,
            maxAces: snapshot.val().maxAces,
          });
        });
      });
      if(status === "max"){
        await this.dataMax.sort((t1, t2) => (t1.max > t2.max ? -1 : 1));
      }
      else if(status === "aces"){
        await this.dataMax.sort((t1, t2) => (t1.maxAces > t2.maxAces ? -1 : 1));
      }
      else if(status === "blocks"){
        await this.dataMax.sort((t1, t2) => (t1.maxBlocks > t2.maxBlocks ? -1 : 1));
      }
      else if(status === "digs"){
        await this.dataMax.sort((t1, t2) => (t1.maxDigs > t2.maxDigs ? -1 : 1));
      }
      else if(status === "set"){
        await this.dataMax.sort((t1, t2) => (t1.maxSet > t2.maxSet ? -1 : 1));
      }
      else if(status === "spikes"){
        await this.dataMax.sort((t1, t2) => (t1.maxSpikes > t2.maxSpikes ? -1 : 1));
      }
      var data_max = [];
      for (let index = 0; index < 10; index++) {
        data_max.push(this.dataMax[index]);
      }
      this.dataMax = data_max;
      //console.log("this.dataMax",this.dataMax);
    },
    async computeHistory() {
      var dataUserHis = [];
      this.dataHistory = [];
      var today = new Date();
      var count = -1;
      for (let i = 0; i < 3; i++) {
        var afterDay = new Date(today.setDate(today.getDate() - 1));
        var date =
          afterDay.getMonth() +
          1 +
          ":" +
          afterDay.getDate() +
          ":" +
          afterDay.getFullYear();
        // //console.log(date);

        var dataRef = database.ref("/DataToDay/" + date + "/");
        await dataRef.on("child_added", (snapshot) => {
          //console.log(date);
          if (snapshot.val().status === "start") {
            dataUserHis = [];
            count = count + 1;
          } else {
            count = count + 0;
          }
          dataUserHis.push(snapshot.val());
          this.dataHistory[count] = dataUserHis;
          // console.log("dataHistory", this.dataHistory);
        });
        //console.log(this.dataHistory);
      }
    },
    today() {
      this.status = "today";
    },
    max() {
      this.status = "max";
      this.computeMax("max");
    },
    async history() {
      this.status = "history";
      // this.computeHistory()
    },
    maxAces(){
      this.status = "aces";
      this.computeMax("aces");
    },
    maxBlocks(){
      this.status = "blocks";
      this.computeMax("blocks");
    },
    maxDigs(){
      this.status = "digs";
      this.computeMax("digs");
    },
    maxSet(){
      this.status = "set";
      this.computeMax("set");
    },
    maxSpikes(){
      this.status = "spikes";
      this.computeMax("spikes");
    },
  },
};
</script>
<style>
.div_about {
  margin: 0px 16px 0px 16px;
}
.button_about {
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
.text_about {
  font-size: 12px;
  display: block;
  width: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.text_max {
  font-size: 12px;
  display: block;
  text-align: left;
  width: 90px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
