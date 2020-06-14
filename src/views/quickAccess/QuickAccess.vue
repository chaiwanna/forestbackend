<template>
  <div>
    <!-- <font-awesome-icon style="width:100%;height:100px" icon="user-circle" /> -->
    <br />
    <div data-cy="nav-bar-welcome-text">
      <div style="width:100%;text-align: center;">
        <h1>ยินดีต้อนรับ</h1>
        <h3 v-if="user">{{ user.first_name }}</h3>
        <h3>ท่านกำลังลงชื่อเข้าใช้ {{forestDetail[0].name}}</h3>
        <div class="row justify-content-md-center">
          <h2 v-if="!user">โปรด log in เพื่อ ใช้งานระบบ</h2>
        </div>
        <br />
        <div class="row justify-content-md-center">
          <router-link class="col-sm-1" :to="{path : '/login?qa=true'}" v-if="!user">
            <button class="btn btn-primary col-sm-12" v-if="!user">ลงชื่อเข้าใช้</button>
          </router-link>
          <router-link class="col-sm-1" :to="{path : '/map'}" v-if="user">
            <button class="btn btn-danger">ออกจากระบบ</button>
          </router-link>
        </div>
      </div>
    </div>
    <br />
    <br />
    <div class="row justify-content-md-center">
      <router-link
        class="col-sm-3"
        :to="{path : `/registerForest?forest_id=${forest_id}`}"
        :disabled="!user"
      >
        <button class="btn btn-success col-sm-12" :disabled="!user">ลงชื่อเข้าใช้ป่า</button>
      </router-link>
      <div class="col-sm-1"></div>
      <button
        class="btn btn-warning col-sm-3"
        :disabled="!user"
        v-on:click="onClickCheckOut()"
      >ลงชื่อออกจากป่า</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import forestAccessService from '../../services/forestAccessService';
import forestDetailService from '../../services/forestDetailService';

export default {
  components: {},
  data() {
    return {
      forest_id: null,
      forestDetail:null
    };
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    init() {
      if (this.$route.query.forest_id) {
        localStorage.forest_id = this.$route.query.forest_id;
      }
      this.forest_id = localStorage.forest_id;
      forestDetailService.getById(this.forest_id).then(res=>{
          this.forestDetail = res.data
      })
    },
    checkOut(id) {
      forestAccessService.updateById(id, { status_id: 2 }).then(() => {
        this.makeToast('ลงชื่อออกสำเร็จ','success');
      });
    },
    onClickCheckOut() {
      let data = localStorage.forestAccessByQuickAccess;
      if (data) {
          data = data.split(',');
          data.forEach(element => {
            this.checkOut(element);
          });
          localStorage.forestAccessByQuickAccess = '';
      }else{
          this.makeToast('ไม่มีการลงทะเบียนเข้าใช้','danger')
      }
    },
    makeToast(massage, variant = null) {
      const config = {
        title: `ข้อความ`,
        variant,
        solid: true
      };
      this.$bvToast.toast(massage, config);
    }   
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
</style>