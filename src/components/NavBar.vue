<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
      <b-navbar-brand class="logo">ระบบลงทะเบียนผู้เข้าใช้พื้นที่เขตรักษาพันธุ์สัตว์ป่าเวียงลอ</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <template v-for="item in  manu">
            <span :key="item">
              <b-nav-item v-if="auth(item.auth)" :to="{ path: item.route }" data-cy="item.cy">
                <font-awesome-icon :icon="item.icon" class="mr-1" />
                {{item.name}}
              </b-nav-item>
            </span>
          </template>
          <!-- <b-container v-for="item in  manu" v-bind:key="item.name">
            <b-nav-item v-if="auth(item.auth)" :to="{ path: item.route }" data-cy="item.cy">
              <font-awesome-icon :icon="item.icon" class="mr-1" />
              {{item.name}}
            </b-nav-item>
          </b-container>-->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            :to="{ path: '/information' }"
            v-if="user"
            data-cy="nav-bar-welcome-text"
          >Welcome, {{ user.first_name }}</b-nav-item>

          <b-nav-item
            :to="{ path: '/logout' }"
            link-classes="btn btn-grey mx-1"
            data-cy="nav-bar-logout"
          >
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="mr-1" />Logout
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';
import User from '../model/user';

export default {
  name: 'NavBar',
  data() {
    return {
      manu: [
        {
          name: 'หน้าหลัก',
          route: '/',
          auth: [99],
          cy: 'nav-bar-dashboard',
          icon: ['fas', 'tachometer-alt']
        },
        {
          name: 'ดูข้อมูลส่วนตัว',
          route: '/information',
          auth: [50, 99],
          cy: 'nav-bar-todo',
          icon: ['fas', 'list-alt']
        },
        {
          name: 'ลงทะเบียนเข้าป่าไม้',
          route: '/registerForest',
          auth: [50],
          cy: 'nav-bar-todo',
          icon: ['fas', 'list-alt']
        },
        {
          name: 'รายงาน',
          route: '/report',
          auth: [99],
          cy: 'nav-bar-todo',
          icon: ['fas', 'list-alt']
        },
        {
          name: 'แผนที่',
          route: '/map',
          auth: [99],
          cy: 'nav-bar-todo',
          icon: ['fas', 'list-alt']
        },
        {
          name: 'ประวัติการเข้าป่าไม้',
          route: '/history',
          auth: [50,99],
          cy: 'nav-bar-todo',
          icon: ['fas', 'list-alt']
        }
      ]
    };
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    showNavigation(permissionKey) {
      if (this.user.role === User.userRole.administrator) {
        return true;
      }

      return _.includes(this.user.permission_keys, permissionKey);
    },
    auth(allowId) {
      if (allowId.indexOf(this.user.role) < 0) {
        return false;
      }
      return true;
    }
  }
};
</script>
<style scoped>
/* .logo{
  width: 10%;
} */
</style>