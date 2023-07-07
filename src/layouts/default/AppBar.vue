<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />
      <v-btn >
        <router-link to="/">Portada</router-link>
    </v-btn>
    <v-btn >
      <router-link to="/graella">Graella notes</router-link>
    </v-btn>
    <v-btn >
      <router-link to="/alumnes">Gestió alumnes</router-link>
    </v-btn>
    <v-btn >
      <router-link to="/resultats">Resultats</router-link>
    </v-btn>
      </v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
  //
</script>
