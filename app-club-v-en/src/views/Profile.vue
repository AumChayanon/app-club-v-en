<template>
  <div class="div_profile">
    <div>
      <Menu />
    </div>
    <div class="row">
      <div v-if="this.status === 'default'" class="col" style="max-width: 30%">
        <img
          :src="datapro.photo"
          alt="index.name"
          style="border-radius: 50%; width: 5rem; height: 5rem"
        />
      </div>
      <div v-if="this.status === 'edit'">
        <div class="col" style="max-width: 30%">
          <img
            :src="imageData"
            alt="index.name"
            style="
              border-radius: 50%;
              width: 5rem;
              height: 5rem;
              border: 5px solid #123b8e;
            "
          />
        </div>
        <br>
        <label for="file-upload" class="custom-file-upload">
          <i class="fa fa-cloud-upload"></i>อัปโหลด
        </label>
        <input id="file-upload" type="file" @change="getImg" accept="image/*"/>
      </div>
      <div
        v-if="this.status === 'default'"
        class="col"
        style="max-width: 70%; text-align: left"
      >
        <h5>{{ datapro.name }}</h5>
        <p style="color: rgb(145, 145, 145)"><b>เพศ: </b>{{ datapro.sex }}</p>
        <p style="color: rgb(145, 145, 145)">
          <b>E-mail: </b>{{ datapro.email }}
        </p>
      </div>
      <div
        v-if="this.status === 'edit'"
        class="col"
        style="max-width: 70%; text-align: left"
      >
        <b for="exampleInputEmail1">ชื่อ</b
        ><input
          type="email"
          class="form-control"
          v-model="nameUser"
          placeholder="กรุณากรอกชื่อ"
        /><b for="exampleInputEmail1">เพศ</b
        ><input
          type="email"
          class="form-control"
          v-model="sexUser"
          placeholder="กรุณากรอกเพศ (ภาษาไทย)"
        />
        <p style="color: rgb(145, 145, 145)">
          <b>E-mail: </b>{{ datapro.email }}
        </p>
      </div>
      <div class="row"></div>
    </div>
    <div>
      <div v-if="this.status === 'default'">
        <a v-on:click="editUser(datapro.uid)">แก้ไข</a>
      </div>
      <div v-if="this.status === 'edit'">
        <b-button type="button" class="div_btn" v-on:click="updateUser"
          >อัปเดท</b-button
        >
        <br />
        <a v-on:click="cancel">ยกเลิก</a>
        <hr />
      </div>
      <div>
        <b-button type="button" class="div_btn" v-on:click="logout"
          >ออกจากระบบ</b-button
        >
      </div>
    </div>
    <hr />
    <div class="row">
      <div><h5>ศักยภาพ</h5></div>
      <canvas class="chart" id="my-chart-Weight" height="450"></canvas>
    </div>
    <div class="row">
      <div><h5>ประวัติ</h5></div>
      <div class="row" id="div_his" v-for="index in allData" :key="index.id">
        <div class="row">
          <h6>set: {{ index.setNumber }} <b v-if="index.statusScore === 'win'" style="color:#a2b54d;">{{ index.statusScore }}</b> <b  v-if="index.statusScore === 'lose'" style="color:#CC0000;">{{ index.statusScore }}</b> score: {{ index.scoreMe }}:{{ index.scoreHis }}  ({{ index.date }})</h6>
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
import Swal from "sweetalert2";
var database = firebase.database();
export default {
  components: {
    Menu,
  },
  data() {
    return {
      dataUid: [],
      datapro: [],
      potential: [],
      allData: [],
      nameUser: "",
      sexUser: "",
      status: "default",
      key_user: "",
      imageData: null,
      fileImg: null,
      urlImg: "",
    };
  },
  async created() {
    var dataRef = database.ref("/Users/");
    await firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.dataUid = firebaseUser.uid;
    });
    await dataRef.on("child_added", (snapshot) => {
      if (snapshot.val().uid === this.dataUid) {
        this.datapro = snapshot.val();
      }
    });
    this.graphWeight();
    this.getData();
    //console.log(this.datapro);
  },
  methods: {
    async getData() {
      var dataRef = database.ref("/PersonalData/" + this.dataUid + "/");
      var set = 0;
      var spikes = 0;
      var blocks = 0;
      var digs = 0;
      var aces = 0;
      var serviceError = 0;
      this.potential = [];
      await dataRef.on("child_added", (snapshot) => {
        set = snapshot.val().set + set;
        spikes = snapshot.val().spikes + spikes;
        blocks = snapshot.val().blocks + blocks;
        digs = snapshot.val().blocks + blocks;
        aces = snapshot.val().aces + aces;
        serviceError = snapshot.val().serviceError + serviceError;
        this.allData.push(snapshot.val());
      });
      await this.potential.push(set);
      await this.potential.push(spikes);
      await this.potential.push(blocks);
      await this.potential.push(digs);
      await this.potential.push(aces);
      await this.potential.push(serviceError);
      await //console.log(this.allData);
      await this.graphWeight();
      setTimeout(() => this.graphWeight(), 3000);
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
          labels: ["Set", "Spikes", "Blocks", "Digs", "Aces", "Error"],
          datasets: [
            {
              label: "ศักยภาพ",
              data: this.potential,
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["#4979DC"],
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
    async editUser(e) {
      this.status = "edit";
      this.imageData = this.datapro.photo;
      this.urlImg = this.datapro.photo;
      this.nameUser = this.datapro.name;
      this.sexUser = this.datapro.sex;
      var dataRef = database.ref("/Users/");
      this.key_user = "";
      await dataRef.on("child_added", (snapshot) => {
        if (snapshot.val().uid === e) {
          this.key_user = snapshot.key;
        }
      });
      await console.log("key_user", this.key_user);
    },
    async updateUser() {
      // await this.uploadImg()
      database.ref("/Users/" + this.key_user).set({
        email: this.datapro.email,
        name: this.nameUser,
        photo: this.urlImg,
        sex: this.sexUser,
        uid: this.datapro.uid,
      });
      console.log(
        this.datapro.email,
        this.nameUser,
        this.datapro.photo,
        this.sexUser,
        this.datapro.uid,
        this.key_user
      );
      console.log("url ", this.urlImg);

      this.status = "default";
    },
    cancel() {
      this.status = "default";
    },
    getImg(event) {
      this.fileImg = null;
      this.fileImg = event.target.files[0];
      this.imageData = URL.createObjectURL(this.fileImg);
      console.log("img", this.imageData);
      this.uploadImg();
    },
    uploadImg() {
      this.showload();
      const storageRef = firebase
        .storage()
        .ref(`${this.fileImg.name}`)
        .put(this.fileImg);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.urlImg = url;
          });
        }
      );
    },
    showload(){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'กำลังอัปโหลดรูป'
      })
    }
  },
};
</script>

<style>
.div_profile {
  margin: 0px 32px 0px 32px;
}
.div_btn {
  width: 80%;
  background-color: #123b8e; /* Green */
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
#div_his {
  margin: 0px 10px 0px 10px;
}
#div_ele {
  background-color: #f9f9f9;
  padding: 6px;
}
.chart {
  height: 1700px;
}
.col {
  padding: 0px 10px;
}
input[type="file"] {
    display: none;
}
.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}
</style>
