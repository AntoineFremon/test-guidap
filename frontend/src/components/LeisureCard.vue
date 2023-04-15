<template>
  <b-card v-on:click="select" :border-variant="border">
    <b-card-title>{{leisure.name}}</b-card-title>
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
      this.$store.dispatch('leisures/selectLeisure', this.leisure.id);
    }
  },
  computed: mapState({
    selectedLeisureId: state => state.leisures.selectedLeisureId
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
