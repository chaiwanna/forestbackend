<template>
  <div>
    <!-- <input type="date" name id />
    <input type="date" name id />
    <button type="submit">submit</button>-->
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-xl-12">
          <div id="app">
            <longdo-map :center="center" :zoom="10" :lastView="false">
              <longdo-map-marker
                v-for="(item, i) in markers"
                :key="i"
                :location="item.location"
                :title="item.title"
                :detail="item.detail"
              />
            </longdo-map>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { LongdoMap, LongdoMapMarker } from 'longdo-map-vue';
import forestService from '../../services/forestDetailService';

export default {
  name: 'map',
  component: {
    'longdo-map': LongdoMap,
    LongdoMapMarker
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  data() {
    return {
      markers: [],
      center: {
        lon: 19.1,
        lat: 100.1
      }
    };
  },
  methods: {
    async getForest() {
      const map = (await forestService.getAll()).data;
      map.forEach(element => {
        this.markers.push({
          location: { lon: element.longitude, lat: element.latitude },
          title: element.name,
          detail: 'จำนวนคน'
        });
      });
    }
  },
  mounted() {
    this.getForest();
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 600px;
}
</style>