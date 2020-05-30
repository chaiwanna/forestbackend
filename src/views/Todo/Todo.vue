<template>
  <div class="history">
    <Layout>
      <b-form @submit.stop.prevent="onSubmit">
        <b-form-group id="group-search " label-for="input-search ">
          <b-form-input
            id="input-search"
            v-model="form.search"
            type="text"
            placeholder="ค้นหาข้อมูล"
            
          ></b-form-input>
        </b-form-group>
        <date-picker v-model="form.time3" range></date-picker>
        <b-button type="submit" size="sm" variant="success" :disabled="loading">
          <span class="spinner spinner-white" v-if="loading"></span>
          <font-awesome-icon :icon="['fas', 'save']" class="mr-1" />ค้นหา
        </b-button>
      </b-form>
      <br />
      <div class="card">
        <h1 class="card-header">ประวัติการเข้าป่าไม้</h1>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>ชื่อ-นามสกุล</th>
                <th>เลขประจำตัวประชาชน</th>
                <th>ที่อยู่</th>
                <th>วัตถุประสงค์ในการเข้าไปในพื้นที่ป่า</th>
                <th>วันที่เข้าป่า</th>
                <th>เวลาที่เข้าป่า</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/es/th';
import { mapGetters, mapState } from 'vuex';
import User from '@/model/user';
import moment from 'moment';
import Layout from '../../components/Layout.vue';

export default {
  name: 'History',
  components: {
    Layout,
    DatePicker
  },
  data() {
    return {
      form: {
        search: null,
        time3: null
      }
    };
  },
  mounted() {
    this.$nextTick(async () => {
      // Code that will run only after the entire view has been re-rendered

      this.formLoaded = true;

      this.$v.$touch(); // Set initial validation
      this.$v.$reset(); // Reset $dirty
    });
  },
    computed: {
    metaDescription() {
      return this.formType === 'new' ? 'Add new user' : 'Update user';
    },
    ...mapGetters('alert', ['errorMessages']),
    ...mapState('user', ['loading', 'user']),
    showPermissions() {
      return this.userType === 'staff' && this.form.role === User.userRole.staff;
    }
  },

  watch: {
    // 'form.selected_subdistricts': function(val) {},
    user(_newValue, _oldValue) {
      if (!this.user.id) {
        return;
      }
      // Loaded user, assign to form

      this.form.username = this.user.username;
      this.form.email = this.user.email;
      this.form.firstName = this.user.firstName;
      this.form.lastName = this.user.lastName;
      this.form.nickname = this.user.nickname;
      this.form.numreg = this.user.numreg;
      this.form.tel = this.user.tel;
      this.form.numhome = this.user.numhome;
      this.form.nummoo = this.user.nummoo;
      this.form.selected_provinces = this.user.selected_provinces;
      this.form.selected_districts = this.user.selected_districts;
      this.form.selected_subdistricts = this.user.selected_subdistricts;
      this.form.postman = this.user.postman;
      this.form.password = this.user.password;
      this.form.confirmedAt = this.user.confirmedAt;
      this.form.blockedAt = moment(this.user.blockedAt).isValid() ? moment(this.user.blockedAt).toISOString() : null;
      this.form.role = this.user.role;
      this.form.enabled = this.user.enabled;

      this.formLoaded = true;
      this.setFormPermissions();

      this.$v.$touch(); // Set initial validation
      this.$v.$reset(); // Reset $dirty
    },
    permissions(_newValue, _oldValue) {
      this.setFormPermissions();
    }
  }
};
</script>
<style scoped>
.card-header {
  font-size: 20px;
}
</style>
