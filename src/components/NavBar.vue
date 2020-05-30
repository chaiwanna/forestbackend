<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
      <b-navbar-brand class="logo" :to="{ path: '/' }">
        ระบบลงทะเบียนผู้เข้าใช้พื้นที่เขตรักษาพันธุ์สัตว์ป่าเวียงลอ
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ path: '/' }" data-cy="nav-bar-dashboard">
            <font-awesome-icon :icon="['fas', 'tachometer-alt']" class="mr-1" />Dashboard
          </b-nav-item>
            <b-nav-item :to="{ path: '/registerForest' }" data-cy="nav-bar-todo">
            <font-awesome-icon :icon="['fas', 'list-alt']" class="mr-1" />ลงทะเบียนเข้าป่าไม้
          </b-nav-item>
          <b-nav-item :to="{ path: '/history' }" data-cy="nav-bar-todo">
            <font-awesome-icon :icon="['fas', 'list-alt']" class="mr-1" />ประวัติการเข้าป่าไม้
          </b-nav-item>
          <b-nav-item :to="{ path: '/user' }" v-if="showNavigation('manageUser')" data-cy="nav-bar-user">
            <font-awesome-icon :icon="['fas', 'portrait']" class="mr-1" />รายงาน
          </b-nav-item>
          <b-nav-item :to="{ path: '/staff' }" v-if="showNavigation('manageStaff')" data-cy="nav-bar-staff">
            <font-awesome-icon :icon="['fas', 'user']" class="mr-1" />Staffs
          </b-nav-item>
          <b-nav-item-dropdown right v-if="showNavigation('manageSetting')" data-cy="nav-bar-manage-setting">
            <template v-slot:button-content>
              <font-awesome-icon :icon="['fas', 'cog']" class="mr-1" />Settings
            </template>
            <b-dropdown-item
              :to="{ path: '/setting' }"
              v-if="showNavigation('manageSetting')"
              data-cy="nav-bar-general-settings"
            >
              General Settings
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{ path: '/information' }" v-if="user" data-cy="nav-bar-welcome-text">Welcome, {{ user.first_name }}</b-nav-item>

          <b-nav-item :to="{ path: '/logout' }" link-classes="btn btn-grey mx-1" data-cy="nav-bar-logout">
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
  computed: {
    ...mapState('auth', ['user'])
    
  },
  methods: {
    showNavigation(permissionKey) {
      if (this.user.role === User.userRole.administrator) {
      
        
        return true;
      }

      return _.includes(this.user.permission_keys, permissionKey);
    }
  }
};
</script>
<style scoped>
/* .logo{
  width: 10%;
} */
</style>