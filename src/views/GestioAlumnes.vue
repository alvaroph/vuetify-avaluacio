<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-data-table  :items="alumnos" :sort-by="[{ key: 'nombre', order: 'asc' }]" class="elevation-1">
      <template v-slot:top>
        <v-col sm="12">
          <v-alert v-if="responseSuccess" dense  type="success">
          Has afegit un alumne amb èxit
          </v-alert>
        </v-col>
        <v-toolbar flat>
          <v-toolbar-title>CRUD</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="props"
              >
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nom alumne"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.apellidos"
                        label="Cognoms"
                      ></v-text-field>
                    </v-col>
                  
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      
      <template v-slot:item.actions="{ item }">
        <v-icon
          size="small"
          class="me-2"
          @click="editItem(item.raw)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          @click="deleteItem(item.raw)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </template>

  <script lang="ts">

  import {api} from "@/service/avaluacio.api";
  import {TAlumno, TModulo} from "@/service/interfaces";
  

    export default {
      data: () => ({
        modulos: [] as TModulo[],
        alumnos: [] as TAlumno[],
        responseSuccess: false,
        dialog: false,
        dialogDelete: false,
        headers: [
          {
            title: 'Nom',
            align: 'start',
            sortable: false,
            key: 'name',
          },
          { title: 'Cognoms', key: 'calories' },
          { title: 'Mòduls', key: 'fat' },
          { title: 'Actions', key: 'actions', sortable: false },
        ] as any[],
        desserts: [],
        editedIndex: -1,

        editedItem: {
          id: '',
          nombre: "",
          apellidos: "",
          idModulo:0 ,
        },
        defaultItem: {
          id: '',
          nombre: '',
          apellidos: '',
          idModulo:0
        },
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
      },
  
      created () {
        this.initialize()

      },
  
      methods: {
        initialize () {
          //Llamada a la API y carga de datos
            this.readAlumnos();
            this.readModuls();
        },

        readModuls: async function() {
          const data = await api.getModulos();
          this.modulos = data.records;
        },
          readAlumnos: async function() {
          const data = await api.getAlumnos();
          this.alumnos = data.records;
        },

        addAlumno: async function(){
          console.log("Añado alumno" + this.editedItem.nombre);
          await api.createAlumno(this.editedItem);
          this.readAlumnos();
          this.responseSuccess = true;
        },
        updateAlumno: function(){},
        removeAlumnos:async function(id:number){
          console.log("Borro al alumno" + id);
      
          await api.removeAlumno(id);
          this.readAlumnos();
      },
  
        editItem (item: any) {
          this.editedIndex = this.alumnos.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem (item: any) {
          this.editedIndex = this.alumnos.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.desserts.splice(this.editedIndex, 1)
          this.closeDelete()
        },
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        save () {
          if (this.editedIndex > -1) {
            Object.assign(this.alumnos[this.editedIndex], this.editedItem)
          } else {
            this.alumnos.push(this.editedItem as any)
          }
          this.close()
        },
      },
    }
  </script>