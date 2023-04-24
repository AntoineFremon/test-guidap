<template>
  <b-card v-on:click="select" :border-variant="border">
    <b-card-title>
      <b-row>
        <b-col cols="10">{{leisure.name}}</b-col>
        <b-col cols="2">
          <img :src="`http://openweathermap.org/img/wn/${leisure.weatherIcon}@2x.png`" :style="{ 'height': '40px', 'width': '40px' }" :id="`popover-target-${leisure.id}`">
          <b-popover :target="`popover-target-${leisure.id}`" triggers="hover" placement="top">
            {{leisure.weatherDescription}}
          </b-popover>
        </b-col>
      </b-row>
    </b-card-title>
    <b-card-text>{{leisure.description}}</b-card-text>
    <b-button v-if="leisure.webLink" :href="leisure.webLink" variant="link" target="_blank">Accédez au site web</b-button>
    <b-badge v-for="a in leisure.Activities">{{a.name}}</b-badge>
  </b-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "LeisureCard",
  props: ['leisure'],
  data() {
    return {
      border: 'secondary'
    }
  },
  methods: {
    select() {
      this.$store.dispatch('leisures/selectLeisure', this.leisure);
    }
  },
  computed: mapState({
    selectedLeisureId: state => state.leisures.selectedLeisure?.id
  }),
  watch: {
    selectedLeisureId(updatedLeisure) {
      if(updatedLeisure === this.leisure.id && this.border === 'secondary') {
        this.border = 'primary';
      } else if(updatedLeisure !== this.leisure.id && this.border === 'primary') {
        this.border = 'secondary';
      }
    }
  }
}
</script>

<style scoped>

</style>
