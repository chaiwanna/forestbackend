<template>
  <div class="page-class page-home">
    <b-container class=" text-center my-5">
        <b-button href="/information">ดูข้อมูลส่วนตัว</b-button>
        <b-button href="/registerForest">ลงทะเบียนเข้าป่าไม้</b-button>
  
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  metaInfo: {
    title: 'Home',
    meta: [
      {
        name: 'description',
        content: 'Welcome to Vue.js backend.'
      }
    ]
  }
};
</script>
