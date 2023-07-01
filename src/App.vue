<template>
  <v-app id="inspire">
    <!-- Main content -->
    <v-main class="grey lighten-3">  
        <router-view></router-view>  
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default{
  name: "App",

  components: {
  },

  data: () => ({
  }),
};
</script>
<style>
</style>