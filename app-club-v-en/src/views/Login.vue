<template>
  <div class="div_login">
    <div class="bg-image"></div>
    <div class="bg-text">
    <div class="center" style="width: 100%; height: 80%">
      <div style="padding-top: 16rem">
        <h1 style="text-align: center">Club V EN</h1>
      </div>
    </div>
    <div class="center" style="width: 100%; height: 20%">
      <b-button variant="success" v-on:click="socialGoogleLogin()">
        <!--ion-icon name="logo-google"></ion-icon-->เข้าสู่ระบบด้วย Google mail
      </b-button>
    </div>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
export default {
  methods: {
    socialGoogleLogin() {
      const provide = new firebase.auth.GoogleAuthProvider().addScope("email");
      firebase
        .auth()
        .signInWithPopup(provide)
        .then(
          (user) => {
            console.log(user.displayName);
            this.$router.replace("/home");
          },
          (err) => {
            alert(err.message);
          }
        );
    },
  },
};
</script>

<style>
.div_login {
  text-align: center;
  margin: 0;
  height: 100%; 
}
.center {
  padding: auto;
  text-align: center;
}
.btn {
  width: 80%;
  background-color: rgb(126, 199, 66); /* Green */
  border: none;
  color: rgb(255, 255, 255);
  padding: 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 9px 5px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 2;
}
.bg-image{
height: 100%;  
  background-image: url("../assets/bg.jpg");
  filter: brightness(0.40) blur(3px);

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
h1{
  color: aliceblue;
}
.bg-text {
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 100%;
  text-align: center;
}
</style>