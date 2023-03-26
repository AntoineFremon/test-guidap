<template>
  <b-container fluid class="align-content-center">
    <h1>Liste des Bases de loisir</h1>
    <b-dropdown text="Filtrer par activité">
      <b-dropdown-item
          v-for="a in listActivities"
          :activity="a"
          :key="a.id"
          v-on:click="onActivityClick(a.id)"
      >
        {{a.name}}
      </b-dropdown-item>
    </b-dropdown>
    <b-card-group columns>
      <LeisureCard
          v-for="(l, index) in listLeisures"
          :leisure="l"
          :index="index"
          :key="l.id"
      />
    </b-card-group>
    <b-spinner v-if="loading" label="Loading..."></b-spinner>
  </b-container>
</template>

<script>
import LeisureCard from "./LeisureCard.vue";
import axios from 'axios';

export default {
  name: "ListLeisures",
  data() {
    return {
      listLeisures: [],
      listActivities: [],
      loading: false
    }
  },
  methods: {
    onActivityClick(activityId) {
      this.listLeisures = [];
      this.getLeisures(2,0, activityId);
    },
    getLeisures(pageSize, offset, activityId) {
      this.loading = true;
      let query = `http://localhost:8000/leisures?pageSize=${pageSize}&offset=${offset}`;
      if (activityId) {
        query += `&activityId=${activityId}`
      }
      axios
          .get(query)
          .then((response) => {
            this.listLeisures.push(...response.data.leisures);
            if (response.data.leisures.length === pageSize) {
              this.getLeisures(pageSize, offset+pageSize, activityId);
            } else {
              this.loading = false;
            }
          });
    }
  },
  mounted() {
    this.getLeisures(2, 0);
    axios
        .get(`http://localhost:8000/activities`)
        .then((response) => {
          this.listActivities = response.data.activities;
        });
  },
  components: {
    LeisureCard
  }
}
</script>

<style scoped>

</style>
