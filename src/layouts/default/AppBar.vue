<template>
  
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />   
        <router-link to="/"><v-btn>Portada</v-btn></router-link>
        <router-link to="/graella"> <v-btn >Graella notes</v-btn></router-link>
        <router-link to="/alumnes"><v-btn >Gestió alumnes</v-btn></router-link>
        <router-link to="/resultats"><v-btn >Resultats</v-btn></router-link>
      </v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
  //
</script>
