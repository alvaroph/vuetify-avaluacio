<template>
    <v-container>
      <h1>Gestió d'alumnes</h1>
      <v-row>
        <v-col sm="12">
          <v-alert v-if="responseSuccess" dense  type="success">
          Has afegit un alumne amb èxit
          </v-alert>
        </v-col>
        <v-col sm="4">
          <h3>Crea un alumno</h3>
          
          <v-text-field
          v-model="nuevoAlumno.nombre"
          label="First name"
        ></v-text-field>
        <v-text-field
          v-model="nuevoAlumno.apellidos"
          label="Last name"
        ></v-text-field>
      
          <v-autocomplete
            :items="modulos"
            color="white"
            item-value="id"
            item-title="nombre"
            label="Mòdul"
            v-model="nuevoAlumno.idModulo"
          ></v-autocomplete>
          <v-btn color="primary" v-on:click="addAlumno">
          Dar de alta
        </v-btn>
          
        </v-col>
        <v-col sm="8">
          <h3>Alumnes</h3>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    ID
                  </th>
                  <th class="text-left">
                    Nom
                  </th>
                  <th class="text-left">
                    Cognoms
                  </th>
                  <th class="text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="alumno in alumnos" :key="alumno.id">
                  <td>{{ alumno.id }}</td>
                  <td>{{ alumno.nombre }}</td>
                  <td>{{ alumno.apellidos }}</td>
                  <td>
                    <v-btn icon color="pink" v-on:click="removeAlumnos(alumno.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </template>
  <script lang="ts">
  import {api} from "@/service/avaluacio.api";
  import {TAlumno, TModulo} from "@/service/interfaces";
  
  export default {
    name: "Dashboard",
    data() {
      return {
        nuevoAlumno: {
          id: 0,
          nombre: "",
          apellidos: "",
          idModulo: 0,
        },
        modulos: [] as TModulo[],
        alumnos: [] as TAlumno[],
        selectedBooks: [],
        responseSuccess: false,
      };
    },
    methods: {  
          readModuls: async function() {
          const data = await api.getModulos();
          this.modulos = data.records;
        },
          readAlumnos: async function() {
          const data = await api.getAlumnos();
          this.alumnos = data.records;
        },

        addAlumno: async function(){
          console.log("Añado alumno" + this.nuevoAlumno.nombre);
          await api.createAlumno(this.nuevoAlumno);
          this.readAlumnos();
          this.responseSuccess = true;
        },
        updateAlumno: function(){},
        removeAlumnos:async function(id:number){
          console.log("Borro al alumno" + id);
      
          await api.removeAlumno(id);
          this.readAlumnos();
      },
    },
    mounted() {
      this.readAlumnos();
      this.readModuls();
     
    },
  };
  </script>