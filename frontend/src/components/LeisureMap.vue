<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script>
import { mapState } from 'vuex';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default {
  name: "LeisureMap",
  data() {
    return {
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      map: null,
      markers: []
    };
  },
  computed: mapState({
    listLeisures: state => state.leisures.all,
  }),
  watch: {
    listLeisures(updatedLeisures) {
      this.markers.forEach((m) => {
        m.remove();
      });
      updatedLeisures.forEach((l) => {
        let existingMarker = this.markers.find((m) => m.getLngLat() === l.coordinates.split(','));
        if(!existingMarker) {
          existingMarker = new mapboxgl.Marker()
              .setLngLat(l.coordinates.split(','));
          this.markers.push(existingMarker);
        }

        existingMarker.addTo(this.map);
      })
    }
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;

    this.map = new mapboxgl.Map({
      container: 'mapContainer', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [1.429763, 43.611663], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
  },
};
</script>

<style scoped>
.basemap {
  width: 100%;
  height: 500px;
}
</style>
