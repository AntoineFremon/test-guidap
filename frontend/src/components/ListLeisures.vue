<template class="align-content-center">
  <h1>Liste des Bases de loisir</h1>
  <b-card-group columns>
    <LeisureCard
        v-for="(l, index) in list"
        :leisure="l"
        :index="index"
        :key="l.id"
    />
  </b-card-group>
  <b-spinner v-if="loading" label="Loading..."></b-spinner>
</template>

<script>
import LeisureCard from "./LeisureCard.vue";
import axios from 'axios';

export default {
  name: "ListLeisures",
  data() {
    return {
      list: [],
      loading: false
    }
  },
  mounted() {
    const getLeisures = (pageSize, offset) => {
      this.loading = true;
      axios
          .get(`http://localhost:8000/leisures?pageSize=${pageSize}&offset=${offset}`)
          .then((response) => {
            this.list.push(...response.data.leisures);
            if (response.data.leisures.length === pageSize) {
              setTimeout(() => getLeisures(pageSize, offset+pageSize), 1000);
              // getLeisures(list, pageSize, offset);
            } else {
              this.loading = false;
            }
          });
    }
    getLeisures(2, 0)
  },
  components: {
    LeisureCard
  }
}
</script>

<style scoped>

</style>
