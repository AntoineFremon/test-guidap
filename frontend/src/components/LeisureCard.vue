<template>
  <b-card>
    <b-card-title>{{leisure.name}}</b-card-title>
    <b-card-text>{{leisure.description}}</b-card-text>
    <b-button v-if="leisure.webLink" :href="leisure.webLink" variant="link" target="_blank">Accédez au site web</b-button>
    <b-badge v-for="a in leisure.Activities">{{a.name}}</b-badge>
  </b-card>
</template>

<script>
export default {
  name: "LeisureCard",
  props: ['leisure']
}
</script>

<style scoped>

</style>
