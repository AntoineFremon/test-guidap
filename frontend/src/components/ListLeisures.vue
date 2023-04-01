<template>
  <b-container fluid class="align-content-center">
    <b-form>
      <b-form-input id="search" v-on:input="onSearchInput" placeholder="Rechercher une base de loisir"/>
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
    </b-form>

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
      loading: false,
      activity: null,
      interval: null,
      inputText: ''
    }
  },
  methods: {
    onActivityClick(activityId) {
      this.listLeisures = [];
      this.activity = activityId;
      this.getLeisures(2,0);
    },
    getLeisures(pageSize, offset) {
      this.loading = true;
      let query = `http://localhost:8000/leisures?pageSize=${pageSize}&offset=${offset}`;
      if (this.activity) {
        query += `&activityId=${this.activity}`
      }

      if (this.inputText) {
        query += `&search=${this.inputText}`;
      }
      axios
          .get(query)
          .then((response) => {
            this.listLeisures.push(...response.data.leisures);
            if (response.data.leisures.length === pageSize) {
              this.getLeisures(pageSize, offset+pageSize);
            } else {
              this.loading = false;
            }
          });
    },
    onSearchInput(inputText) {
      this.inputText = inputText;
      clearTimeout(this.interval);
      this.interval = setTimeout(() => {
        this.listLeisures = [];
        this.getLeisures(2, 0)
      },
          1000
      );
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
