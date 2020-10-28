<template>
  <div>
    <ul class="nav justify-content-center">
  <li class="nav-item">
    <router-link to="/home" style="color: #474747"><p>หน้าหลัก</p></router-link>
  </li>
  <li class="nav-item">
      <router-link to="/about" style="color: #474747"><p>คะแนน</p></router-link>
  </li>
  <li class="nav-item">
    <router-link to="/people" style="color: #474747"><p>สมาชิก</p></router-link>
  </li>
  <li class="nav-item">
    <router-link to="/profile" style="color: #474747"><p>โปรไฟล์</p></router-link>
  </li>
</ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
li{
    padding: 16px;
}
</style>
