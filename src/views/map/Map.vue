<template>
<div>

<input type="date" name="" id="">
<input type="date" name="" id="">
<button type="submit">submit</button>
  <div id="app">
   <longdo-map :zoom="10" :lastView="false">         
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
</template>

<script>
import { mapState } from 'vuex';
import { LongdoMap,LongdoMapMarker  } from 'longdo-map-vue'

export default {
  name: 'map',
  component: {
      'longdo-map':LongdoMap,
      LongdoMapMarker
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  data() {
    return {
       markers: [
        {
          location: { lon: 100.58, lat: 13.761 },
          title: "Vue Marker",
          detail: "This is a detail"
        }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style>
#app{
    width: 80%;
    height: 500px;
}
</style>