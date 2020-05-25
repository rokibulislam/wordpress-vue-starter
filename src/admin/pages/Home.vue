<template>
  <div class="home">
    <span>{{ msg }}</span>

    <TestFields />
  </div>
</template>

<script>
import TestFields from "../components/test-fields/index.vue";
export default {
  name: "Home",
  components: {
    TestFields
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js Admin App",
      customers: []
    };
  },

  created() {},

  mounted() {},

  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
