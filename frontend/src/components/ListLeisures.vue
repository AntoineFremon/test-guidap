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
import { mapState, mapActions } from 'vuex';
import LeisureCard from "./LeisureCard.vue";

export default {
  name: "ListLeisures",
  data() {
    return {
      activity: null,
      interval: null,
      inputText: ''
    }
  },
  computed: mapState({
    listActivities: state => state.activities.all,
    listLeisures: state => state.leisures.all,
    loading: state => state.leisures.loading
  }),
  methods: {
    getLeisures() {
      console.log('before dispatch', this.activity, this.inputText)
      this.$store.dispatch('leisures/getLeisures', { activityId: this.activity, inputText: this.inputText });
    },
    onActivityClick(activityId) {
      this.activity = activityId;
      this.getLeisures();
    },
    onSearchInput(inputText) {
      this.inputText = inputText;
      clearTimeout(this.interval);
      this.interval = setTimeout(() => {
        this.getLeisures()
      },
          1000
      );
    }
  },
  created() {
    this.$store.dispatch('activities/getAllActivites');
    this.$store.dispatch('leisures/getLeisures', {});
  },
  components: {
    LeisureCard
  }
}
</script>

<style scoped>

</style>
