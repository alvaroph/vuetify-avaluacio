<template>
  <v-app id="inspire">
    <!-- Main content -->
    <v-main class="grey lighten-3">  
      <template v-if="logged">
        <router-view></router-view>  
      </template>
      <template v-else>
         <login> </login>
       </template>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app';
import Login from '@/views/Login.vue';


export default{
  name: "App",

  components: {
    Login
  },

  data: () => ({
   
  }),
  computed: {
    logged() {
      return useAppStore().usuarioLogueado;
    },
  },
};
</script>
<style>
</style>