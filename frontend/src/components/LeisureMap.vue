<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script>
import { mapState } from 'vuex';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const compareLngLat = (coordObject, coordArray) => {
  return String(coordObject.lng) === coordArray[0]
      && String(coordObject.lat) === coordArray[1];
}

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
    selectedLeisure: state => state.leisures.selectedLeisure
  }),
  watch: {
    listLeisures(updatedLeisures) {
      this.markers.forEach((m) => {
        m.remove();
      });
      updatedLeisures.forEach((l) => {
        let existingMarker = this.markers.find((m) => compareLngLat(m.getLngLat(), l.coordinates.split(',')));
        if(!existingMarker) {
          existingMarker = new mapboxgl.Marker()
              .setLngLat(l.coordinates.split(','));
          this.markers.push(existingMarker);
        }

        existingMarker.addTo(this.map);
      })
    },
    selectedLeisure(updatedLeisure, oldLeisure) {
      this.markers.forEach((marker, i) => {
        if(compareLngLat(marker.getLngLat(), updatedLeisure.coordinates.split(','))) {
          marker.remove();
          const newMarker = new mapboxgl.Marker({color: '#5ece3f', scale: 1.25})
              .setLngLat(updatedLeisure.coordinates.split(','))
              .addTo(this.map);
          this.markers.splice(i, 1, newMarker);
        }
        if(oldLeisure && compareLngLat(marker.getLngLat(), oldLeisure.coordinates.split(','))) {
          marker.remove();
          const newMarker = new mapboxgl.Marker()
              .setLngLat(oldLeisure.coordinates.split(','))
              .addTo(this.map);
          this.markers.splice(i, 1, newMarker);
        }
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
