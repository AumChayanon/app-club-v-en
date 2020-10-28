<template>
  <div class="div_profile">
    <div>
      <Menu />
    </div>
    <div class="row">
        <div class="col" style="max-width: 30%;">
            <img
            :src="datapro.photo"
            alt="index.name"
            style="border-radius: 50%; width: 5rem; height: 5rem"
          />
        </div>
        <div class="col" style="max-width: 70%;  text-align: left;"><h5>{{datapro.name}}</h5><p style="color: rgb(145, 145, 145);">{{datapro.email}}</p></div>
    </div>
    <div class="row">
        <div class="col">
        <b-button type="button" class="div_btn" v-on:click="logout"
          >ออกจากระบบ</b-button
        >
      </div>
    </div>
    <hr>
    <div class="row">
        <div><h5>ศักยภาพ</h5></div>
        <canvas class="chart" id="my-chart-Weight" height="450"></canvas>
    </div>
    <div class="row">
        <div><h5>ประวัติ</h5></div>
        <div class="row" id="div_his" v-for="index in allData" :key="index.id">
            <div>
                <h6>{{ index.date }}</h6>
            </div>
            <div class="row" id="div_ele">
            <div class="col">
                <p>Set</p>
                <b>{{ index.set }}</b>
            </div>
            <div class="col">
                <p>spikes</p>
                <b>{{ index.spikes }}</b>
            </div>
            <div class="col">
                <p>blocks</p>
                <b>{{ index.blocks }}</b>
            </div>
            <div class="col">
                <p>digs</p>
                <b>{{ index.digs }}</b>
            </div>
            <div class="col">
                <p>aces</p>
                <b>{{ index.aces }}</b>
            </div>
            <div class="col">
                <p>Error</p>
                <b>{{ index.serviceError }}</b>
            </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Menu from "../components/Menu";
import firebase from "firebase";
import Chart from "chart.js";
var database = firebase.database();
export default {
  components: {
    Menu,
  },
  data() {
      return {
          dataUid:[],
          datapro:[],
          potential:[],
          allData:[]
      }
  },
  async created() {
    var dataRef = database.ref("/Users/");
    await firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.dataUid = firebaseUser.uid;
    });
    await dataRef.on("child_added", (snapshot) => {
      if(snapshot.val().uid === this.dataUid){
          this.datapro = snapshot.val()
      }
    });
    this.graphWeight() 
    this.getData()
    //console.log(this.datapro);
  },methods: {
      async getData(){
          var dataRef = database.ref("/PersonalData/" + this.dataUid + "/");
          var set = 0;
        var spikes = 0;
        var blocks = 0;
        var digs = 0;
        var aces = 0;
        var serviceError = 0;
        this.potential = []
        await dataRef.on("child_added", (snapshot) => {
          set = snapshot.val().set + set;
          spikes = snapshot.val().spikes + spikes;
          blocks = snapshot.val().blocks + blocks;
          digs = snapshot.val().blocks + blocks;
          aces = snapshot.val().aces + aces;
          serviceError = snapshot.val().serviceError + serviceError;
          this.allData.push(snapshot.val())
        });
        await this.potential.push(set)
        await this.potential.push(spikes)
        await this.potential.push(blocks)
        await this.potential.push(digs)
        await this.potential.push(aces)
        await this.potential.push(serviceError)
        await //console.log(this.allData);
        setTimeout(() => this.graphWeight() , 2000);
      },
      logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.status = "default";
          window.location.reload();
        });
    },
    graphWeight() {
      var ctx = document.getElementById("my-chart-Weight");
      Chart.defaults.line.spanGaps = true;
      var myLineChartWeight = new Chart(ctx, {
        type: "radar",
        data: {
          labels:["Set", "Spikes", "Blocks", "Digs", "Aces", "Error"],
          datasets: [
            {
              label: "ศักยภาพ",
              data: this.potential,
              backgroundColor: ['rgba(54, 162, 235, 0.2)'],
              borderColor: ['rgba(54, 162, 235, 1)'],
            },
          ],
        },
        options: {
          elements: {
            line: {
              tension: 0, // disables bezier curves
            },
          },
        },
      });
      // this.get_all_cal();
      console.log(myLineChartWeight);
    },
  },
};
</script>

<style>
.div_profile {
  margin: 0px 32px 0px 32px;
  
}
#div_his{
    margin: 0px 10px 0px 10px;
}
#div_ele{
    background-color:#f9f9f9;
    padding: 6px;
}
 .chart {
    height: 1700px;
  }
  .col{
      padding: 0px 10px;
  }
</style>