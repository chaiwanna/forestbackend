<template>
  <div class="history">
    <Layout>
      <div class="row">
        <div class="col-xl-12">
          <div class="form-group row">
            <label for="inputsubdistricts" class="col-sm-2 col-form-label">เลือกช่วงเวลา :</label>
            <div class="col-sm-4">
              <date-picker v-model="form.time3" range></date-picker>
            </div>
            <b-button
              class="col-sm-2"
              type="submit"
              size="sm"
              variant="success"
              v-on:click="loadList()"
            >
              <font-awesome-icon :icon="['fas', 'save']" class="mr-1" />ค้นหา
            </b-button>
          </div>

          <div class="form-group row">
            <label for="inputsubdistricts" class="col-sm-2 col-form-label">ค้นหา :</label>
            <div class="col-sm-4">
              <input type="text" v-model="form.search" />
            </div>
          </div>

          <div class="form-group row" v-if="user.role === 99">
            <label for="inputsubdistricts" class="col-sm-2 col-form-label">ค้นหาตามบุคคล :</label>
            <div class="col-sm-3">
              <select v-model="form.user_id" class="form-control">
                <option
                  v-for="item in userList"
                  :key="item.id"
                  v-bind:value="item.id"
                >{{item.first_name}} {{item.last_name}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <br />
      <div class="card">
        <h1 class="card-header">
          ประวัติการเข้าป่าไม้
          <b-button size="sm" variant="primary" v-on:click="onDownload()">
            <font-awesome-icon icon="download" class="mr-1" />ดาวน์โหลด Excel
          </b-button>
        </h1>
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
                <th v-if="user.role === 99">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dataPaginate" :key="index">
                <td>{{item.user.first_name}} {{item.user.last_name}}</td>
                <td>{{item.user.numreg}}</td>
                <td>
                  <p
                    v-if="item.user.province_data && item.user.district_data && item.user.subdistrict_data"
                  >เลขที่ {{item.user.numhome}} หมู่ {{item.user.nummoo}} {{item.user.province_data.name_in_thai}} {{item.user.district_data.name_in_thai}} {{item.user.subdistrict_data.name_in_thai}} {{item.user.subdistrict_data.zip_code}}</p>
                </td>
                <td>{{item.objective}}</td>
                <td>{{formateDate(item.time)}}</td>
                <td>{{formateTime(item.time)}}</td>
                <td v-if="user.role === 99">
                  <b-button size="sm" variant="danger" v-on:click="onDelete(item.id)">
                    <font-awesome-icon icon="trash" class="mr-1" />
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
         <div class="row justify-content-md-center">
                <b-button size="sm" variant="primary" v-on:click="addLimit()">โหลดเพิ่มเติม</b-button>
              </div>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/es/th';
import moment from 'moment';
import Layout from '../../components/Layout.vue';
import forestAccessService from '../../services/forestAccessService';
import userService from '../../services/newUserService';
import reportService from '../../services/reportService';

export default {
  name: 'History',
  components: {
    Layout,
    DatePicker
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  data() {
    return {
      form: {
        search: null,
        time3: null
      },
      dataPaginate: [],
      userList: [],
      limit : 10
    };
  },
  methods: {
    async getDataPaginate(filter = {}) {
      this.dataPaginate = (await forestAccessService.getPaginate(filter)).data.data;
    },
    async loadUserList() {
      const data = await userService.getAll();
      this.userList = data.data;
    },
    async deleteRow(id) {
      const res = await forestAccessService.deleteById(id);
      return res;
    },
    async onDelete(id) {
      await this.deleteRow(id);
      await this.getDataPaginate(this.createFilter());
    },
    formateDate(date) {
      return moment(String(date)).format('MM/DD/YYYY');
    },
    formateTime(date) {
      return moment(String(date)).format('hh:mm');
    },
    showTime() {
      console.log(this.form);
    },
    onDownload() {
      let a;
      if (this.user.role === 99) {
        reportService.getExcel(JSON.stringify(this.createFilter())).then(res => {
          window.open(res);
        });
      } else {
        reportService.getExcel(JSON.stringify(this.createFilter())).then(res => {
          window.open(res);
        });
      }
      return a;
    },
    createFilter() {
      const filter = {};
      filter.filter = {};
      if (this.form.time3) {
        const [one, two] = this.form.time3;
        if (one) {
          const date = new Date(one);
          filter.filter.date_from = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:01`;
        }
        if (two) {
          const date = new Date(two);
          filter.filter.date_too = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`;
        }
      }
      if (this.user.role !== 99) {
        filter.user_id = this.user.id;
        return { filter };
      }
      if (this.form.user_id) {
        filter.filter.user_id = this.form.user_id;
      }
      if (this.form.search) {
        filter.search = this.form.search
      }
      filter.limit = this.limit
      return filter;
    },
    loadList() {
      if (this.user.role === 99) {
        this.getDataPaginate(this.createFilter());
      } else {
        this.getDataPaginate(this.createFilter());
      }
    },
    addLimit(){
      this.limit += 10
      this.loadList()
    }
  },
  created() {},
  mounted() {
    this.loadUserList();
    this.createFilter();
    this.loadList();
  },

  watch: {}
};
</script>
<style>
.card-header {
  font-size: 20px;
}
</style>
