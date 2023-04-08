<template>
  <LeisureMap/>
  <ListLeisures/>
</template>

<script>
import ListLeisures from "@/components/ListLeisures.vue";
import LeisureMap from "@/components/LeisureMap.vue";
export default {
  name: 'Home',
  components: {
    LeisureMap,
    ListLeisures
  }
}
</script>
