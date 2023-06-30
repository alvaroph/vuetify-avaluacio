<template>
  <router-view />
</template>

<script lang="ts" >
  
  import Calculos from './components/calculos';

 let calculo= new Calculos();
await calculo.getAlumnos();
calculo.mostrarAlumnos();

</script>
