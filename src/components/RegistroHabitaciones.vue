<template>
  <v-card class="ma-1">
    <div class="d-flex flex-row">
      <v-tabs v-model="tab" direction="vertical" color="primary">
        <v-tab v-for="piso in pisos" :value="piso"  @click="obtenerHabitacionesPiso(piso)"> <v-icon size="30" start> mdi-numeric-{{ piso }}-circle </v-icon>
          Piso {{piso}}
        </v-tab>        
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item v-for="piso in pisos" :value="piso">
          <v-card flat>
            <v-card-text class="contenedor">
              <CardHabitacion v-for="(habitacion) in rooms" :habitacion="habitacion" :key="habitacion.id_habitacion"></CardHabitacion>              
            </v-card-text>
          </v-card>
        </v-window-item>        
      </v-window>
    </div>
  </v-card>
  
</template>

<script>

import { getAllHabitaciones } from '@/services/habitacionService'
import { getArchivosHabitacion } from '@/services/archivoService'
import CardHabitacion from '@/components/CardHabitacion.vue'
import { getIconosHabitacion } from '@/services/iconoService'

export default {
  components: {
    CardHabitacion
  },
  data: () => ({
    tab: '1',
    habitaciones: [],    
    rooms: [],
    pisos: [],
  }),
  methods: {
    obtenerHabitacionesPiso(piso){
      this.rooms = this.habitaciones.filter(item => item.piso == piso)
      console.log(this.rooms)
    },
    async obtenerTodasHabitaciones(){
      try {
        let res = await getAllHabitaciones()
        if(res.status == 201 && res.data.data.length > 0){
          this.habitaciones = res.data.data
          
          this.habitaciones.forEach(async item => {
            this.pisos.push(item.piso)

            let res1 = await getArchivosHabitacion(item.id_habitacion)
            if(res1.status == 201 && res1.data.data.length > 0){
              item.archivos = res1.data.data
            }
            let res2 = await getIconosHabitacion(item.id_habitacion)
            if(res2.status == 201 && res2.data.data.length > 0){
              item.iconos = res2.data.data
            }
          })          
          this.pisos = [...new Set(this.pisos)]
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted(){
    this.obtenerTodasHabitaciones().then(() => this.obtenerHabitacionesPiso(1))
  }
}
</script>

<style scoped>
.contenedor {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #EAE6D7;
  font-family: sans-serif;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.v-card-text {
  padding: 0;
}

</style>