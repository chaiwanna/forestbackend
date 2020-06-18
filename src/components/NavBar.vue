<template>
  <div>
    <b-navbar fixed="top" style="background-color:#056539">
      <font-awesome-icon v-b-toggle.sidebar-no-header icon="bars" style="color:white" class="mr-3" />

      <b-navbar-brand class="logo" style="color:white">
        <b>ระบบลงทะเบียนผู้เข้าใช้พื้นที่เขตรักษาพันธุ์สัตว์ป่าเวียงลอ</b>
      </b-navbar-brand>
    </b-navbar>
    <b-sidebar
      id="sidebar-no-header"
      aria-labelledby="sidebar-no-header-title"
      text-variant="dark"
      no-header
      :backdrop-variant="variant"
      backdrop
      shadow
    >
      <template>
        <div class="p-3">
          <nav class="mb-3">
            <b-nav vertical>
              <font-awesome-icon style="width:100%;height:100px" icon="user-circle" />
              <br />
              <b-nav-item :to="{ path: '/information' }" v-if="user" data-cy="nav-bar-welcome-text">
                <div style="width:100%;text-align: center;">
                  <h4>ยินดีต้อนรับ</h4>
                  <h3>{{ user.first_name }}</h3>
                </div>
              </b-nav-item>

              <template v-for="item in  manu">
                <span :key="item">
                  <template v-if="item.route">
                    <b-nav-item v-if="auth(item.auth)" :to="{ path: item.route }" data-cy="item.cy">
                      <font-awesome-icon :icon="item.icon" class="mr-1" />
                      {{item.name}}
                    </b-nav-item>
                  </template>
                  <template v-if="!item.route">
                    <b-nav-item
                      v-if="auth(item.auth)"
                      :to="{ path: item.route }"
                      data-cy="item.cy"
                      :class="visible ? null : 'collapsed'"
                      :aria-expanded="visible ? 'true' : 'false'"
                      aria-controls="collapse-4"
                      @click="visible = !visible"
                    >
                      <font-awesome-icon :icon="item.icon" class="mr-1" />
                      {{item.name}}
                    </b-nav-item>
                  </template>
                  <template v-if="item.child">
                    <b-collapse
                      style="padding-left:20px"
                      id="collapse-4"
                      v-model="visible"
                      class="mt-2"
                    >
                      <template v-for="child in  item.child">
                        <span span :key="child">
                          <b-nav-item
                            v-if="auth(child.auth)"
                            :to="{ path: child.route }"
                            data-cy="child.cy"
                          >
                            <font-awesome-icon :icon="child.icon" class="mr-1" />
                            {{child.name}}
                          </b-nav-item>
                        </span>
                      </template>
                    </b-collapse>
                  </template>
                </span>
              </template>

              <br />
              <b-nav-item
                :to="{ path: '/logout' }"
                link-classes="btn btn-grey mx-1"
                data-cy="nav-bar-logout"
                style="background-color: #e0e0e0;"
              >
                <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="mr-1" />ออกจากระบบ
              </b-nav-item>
            </b-nav>
          </nav>
          <!-- <b-button variant="primary" block @click="hide">Close Sidebar</b-button> -->
        </div>
      </template>
    </b-sidebar>
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
      visible: true,
      manu: [
        {
          name: 'หน้าหลัก',
          route: '/',
          auth: [99],
          cy: 'nav-bar-dashboard',
          icon: ['fas', 'home']
        },
        {
          name: 'ดูข้อมูลส่วนตัว',
          route: '/information',
          auth: [50, 99],
          cy: 'nav-bar-todo',
          icon: ['fas', 'user']
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
          route: '/history',
          auth: [99],
          cy: 'nav-bar-todo',
          icon: ['fas', 'list-alt']
        },
        {
          name: 'แผนที่',
          route: '/map',
          auth: [99],
          cy: 'nav-bar-todo',
          icon: ['fas', 'map-marked-alt']
        },
        {
          name: 'กราฟ',
          auth: [99],
          cy: 'nav-bar-todo',
          icon: ['fas', 'chart-bar'],
          child: [
            {
              name: 'จำนวนคนเข้าป่า',
              route: '/report',
              auth: [99],
              cy: 'nav-bar-todo'
             
            },
            {
              name: 'วัตถุประสงเข้าป่า',
              route: '/report/obj',
              auth: [99],
              cy: 'nav-bar-todo'
             
            }
          ]
        },
        {
          name: 'ประวัติการเข้าป่าไม้',
          route: '/history',
          auth: [50],
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
a {
  color: black;
}
a:hover {
  color: #0056b3;
}
</style>