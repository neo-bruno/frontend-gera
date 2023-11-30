<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-h3 text-center">Hab: {{ habitacion.nombre }}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="6">
        <v-row>
          <v-col cols="12">
            <v-carousel hide-delimiters>
              <v-carousel-item :src="habitacion.imagen_principal" cover></v-carousel-item>
              <v-carousel-item v-for="(archivo) in archivos" :key="archivo.id_archivo" :src="archivo.url"
                cover></v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-col>
      <v-col lg="6">
        <v-row>
          <v-col cols="12">
            {{ habitacion.descripcion }}
          </v-col>
          <v-divider></v-divider>
        </v-row>
        <v-row>
          <v-col lg="6">
            <v-list>
              <v-list-subheader color="primary" class="text-h6">CARACTERISTICAS</v-list-subheader>

              <v-list-item color="primary" rounded="shaped">
                <template v-slot:prepend>
                  <v-icon icon="mdi-bed"></v-icon>
                </template>
                <v-list-item-title v-text="habitacion.dimension + ' mts.'"></v-list-item-title>
                <template v-slot:append>
                </template>
              </v-list-item>


              <v-list-item color="primary" rounded="shaped">
                <template v-slot:prepend>
                  <v-icon icon="mdi-human-male-female"></v-icon>
                </template>
                <v-list-item-title v-text="habitacion.cap_adultos + ' adultos.'"></v-list-item-title>
                <template v-slot:append>
                </template>
              </v-list-item>

              <v-list-item color="primary" rounded="shaped">
                <template v-slot:prepend>
                  <v-icon icon="mdi-human-queue"></v-icon>
                </template>
                <v-list-item-title v-text="habitacion.cap_ninos + ' niños.'"></v-list-item-title>
                <template v-slot:append>
                </template>
              </v-list-item>

              <v-list-item color="primary" rounded="shaped">
                <template v-slot:prepend>
                  <v-icon icon="mdi-bed-single"></v-icon>
                </template>
                <v-list-item-title
                  v-text="habitacion.sofa_cama == 1 ? ' CON (sofa cama)' : 'NO (sofa cama)'"></v-list-item-title>
                <template v-slot:append>
                </template>
              </v-list-item>

              <v-list-item color="primary" rounded="shaped">
                <template v-slot:prepend>
                  <v-icon icon="mdi-cash"></v-icon>
                </template>
                <v-list-item-title
                  v-text="habitacion.valor_precio + '  (' + habitacion.unidad_moneda + '/noche)'"></v-list-item-title>
                <template v-slot:append>
                </template>
              </v-list-item>

            </v-list>
          </v-col>
          <v-col lg="6">
            <v-list>
              <v-list-subheader color="primary" class="text-h6">SERVICIOS</v-list-subheader>

              <v-list-item v-for="(item, i) in iconos" :key="i" :value="item" color="primary" rounded="shaped">

                <template v-slot:prepend>
                  <v-icon :icon="item.tipo_icono"></v-icon>
                </template>

                <v-list-item-title v-text="item.nombre_icono"></v-list-item-title>
                <template v-slot:append>
                  <!-- <v-btn color="grey-lighten-1" icon="mdi-close" variant="text"
                    @click="eliminarPanelIconoHotel(item)"></v-btn> -->
                </template>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="6" v-if="habitacion.url_video != ''">
        <div class="video-responsive">
          <iframe :src="habitacion.url_video" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
        </div>
      </v-col>
      <v-col v-else>
        <v-img :src="habitacion.imagen_principal"></v-img>
      </v-col>
      <v-col lg="6">
        <v-row>
          <v-col lg="6" cols="12">        
            <div class="text-center">
              <v-rating v-model="habitacion.valoracion" readonly color="secondary" active-color="primary"></v-rating>
            </div>    
            {{ habitacion.detalle_corto }}            
          </v-col>
          <v-col lg="6" cols="12">
            <v-list>
              <v-list-subheader color="primary" class="text-h6">Check in - Check Out</v-list-subheader>

              <v-list-item color="primary" rounded="shaped">

                <template v-slot:prepend>
                  <v-icon icon="mdi-calendar"></v-icon>
                </template>

                <v-list-item-title v-text="habitacion.check_in + ' AM'"></v-list-item-title>
                <template v-slot:append>
                </template>
              </v-list-item>

              <v-list-item color="primary" rounded="shaped">

                <template v-slot:prepend>
                  <v-icon icon="mdi-calendar"></v-icon>
                </template>

                <v-list-item-title v-text="habitacion.check_out + ' PM'"></v-list-item-title>
                <template v-slot:append>
                </template>
              </v-list-item>

              <!-- valoracion de la habitacion -->
            </v-list>
          </v-col>          
        </v-row>
        <v-row>
          <v-col>
            <router-link to="/habitaciones" style="text-decoration: none;">
              <v-btn color="secondary" prepend-icon="mdi-arrow-left-drop-circle" block>VOLVER INICIO</v-btn>
            </router-link>
          </v-col>
          <v-col lg="6">
            <router-link to="/reservas/simple" style="text-decoration: none;">
              <v-btn color="primary" append-icon="mdi-arrow-right-drop-circle" block>RESERVAR HABITACION</v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>

import { getHabitacion } from '@/services/habitacionService'
import { getArchivosHabitacion } from '@/services/archivoService'
import { getIconosHabitacion } from '@/services/iconoService'
import { getPrecio } from '@/services/precioService'

export default {
  data() {
    return {
      id_habitacion: this.$route.params.id_habitacion,
      habitacion: {},
      archivos: [],
      iconos: []
    }
  },
  methods: {
    async obtenerHabitacion() {
      try {
        let res = await getHabitacion(this.id_habitacion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.habitacion = res.data.data[0]
        }
      } catch (error) {
        console.log(error)
      }
    },
    async obtenerArchivosHabitacion() {
      try {
        let res = await getArchivosHabitacion(this.id_habitacion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.archivos = res.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async obtenerIconosHabitacion() {
      try {
        let res = await getIconosHabitacion(this.id_habitacion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.iconos = res.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async obtenerPrecioHabitacion() {
      try {
        let res = await getPrecio(this.habitacion.numero_precio)
        if (res.status == 201 && res.data.data.length > 0) {
          this.habitacion.precio = res.data.data[0]
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    this.obtenerHabitacion().then(() => this.obtenerIconosHabitacion().then(() => this.obtenerArchivosHabitacion()))
  }
}
</script>

<style lang="scss" scoped>
.video-responsive {
  position: relative;
  padding-bottom: 56.25%;
  /* 16/9 ratio */
  padding-top: 30px;
  /* IE6 workaround*/
  height: 0;
  overflow: hidden;
}

.video-responsive iframe,
.video-responsive object,
.video-responsive embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>