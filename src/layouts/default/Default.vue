<template>
  <v-app>

    <v-card>
    <v-layout>
      <default-bar />
      <v-navigation-drawer
        expand-on-hover
        rail
      >
     
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
          <v-list-item @click="logout" prepend-icon="mdi-logout" title="Logout" value="logout"></v-list-item>
        </v-list>
      
     
      </v-navigation-drawer>

      <v-main >
        <default-view />
      </v-main>
    </v-layout>
  </v-card>
   

   
  </v-app>
</template>

<script lang="ts" >
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import { useAppStore } from '@/store/app';

  export default {
    components: {
      DefaultBar,
      DefaultView
    },
    methods: {
      logout() {
        useAppStore().logout()
      }
    }
  }

</script>
