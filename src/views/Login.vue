<template>
    <div>
      <v-img
        class="mx-auto my-6"
        max-width="228"
        src="@/assets/logo.jpg"
      ></v-img>
  
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Usuari</div>
  
        <v-text-field
          density="compact"
          placeholder="Usuari"
          prepend-inner-icon="mdi-user-outline"
          variant="outlined"
          v-model="userData.username"
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Contrassenya
  
          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Te n'has oblidat?</a>
        </div>
  
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Posa la teva contrassenya"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="userData.password"
        ></v-text-field>
  
        <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
        >
         
        </v-card>
  
        <v-btn
          block
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          @click="loginUser"
        >
          Accedir
        </v-btn>
  
        <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Dona't d'alta<v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </div>
  </template>
  <script lang="ts">
  import {api} from '@/service/avaluacio.api';
  import { useAppStore } from '@/store/app';
    export default {
      data: () => ({
        visible: false,
        userData: {
          username: '',
          password: '',
        },
      }),
      methods: {
        loginUser: async function(){
          console.log(this.userData.username, this.userData.password);
           /*  const data= await api.login(this.userData);
            console.log(data);
            if (data.status == 200) {
            
              const store = useAppStore();
              store.login(data);
              this.$router.push('/dashboard');
            }       */
            api.login(this.userData).then((data) => {
              console.log(data);
              console.log("aqui llego");
              
              if (data.code == undefined) {
                console.log("aqui lno");
                
                const store = useAppStore();
                store.login(data);
               // this.$router.push('/dashboard');
              }
            });     
      }
    }
}
  </script>