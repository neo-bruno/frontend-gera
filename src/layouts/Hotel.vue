<template>
  <v-app id="inspire">
    <v-app-bar flat density="compact">

      <template v-slot:image>
        <v-img gradient="to top right, rgba(234,230,215,.8), rgba(88, 80, 48,.8)"></v-img>
      </template>

      <v-spacer></v-spacer>

      <v-tabs v-model="tab" color="primary">
        <v-tab fixed v-for="(menu, index) in menus" :key="index" :value="menu.nivel" :prepend-icon="menu.tipo"
          @click="abrirTab(tab)">{{ menu.nombre }}</v-tab>
      </v-tabs>

      <v-spacer></v-spacer>

    </v-app-bar>


    <v-main class="bg-grey-lighten-3">
      <v-window v-model="tab">
        <v-window-item :value="1">
          <!-- pagina principal y cuadro de reservas del hotel -->
          <Seccion :seccion="seccionHotel"></Seccion>

          <!-- servicios del hotel -->
          <Panel :panel="panelHotel"></Panel>

          <!-- galeria de fotos del hotel -->
          <Galeria :galeria="galeriaHotel"></Galeria>

          <!-- testimonios sobre el hotel -->
          <Testimonio :testimonios="testimoniosHotel"></Testimonio>

          <!-- footer -->
          <Footer :pie="pieHotel"></Footer>

        </v-window-item>


        <v-window-item :value="2">
          <Seccion :seccion="seccion_habitaciones"></Seccion>

          <Habitacion v-for="(habitacion, index) in habitaciones" :key="index" :habitacion="habitacion"></Habitacion>

          <Footer :pie="pieHotel"></Footer>
        </v-window-item>

        <v-window-item :value="3">
          <Seccion :seccion="seccion_servicios"></Seccion>

          <Panel :panel="panelHotelCafeteria">{{ panelHotelCafeteria }}</Panel>
          <Galeria :galeria="galeriaHotelCafeteria"></Galeria>

          <Panel :panel="panelHotelSalon"></Panel>
          <Galeria :galeria="galeriaHotelSalon"></Galeria>

          <Footer :pie="pieHotel"></Footer>
        </v-window-item>

        <v-window-item :value="4">
          reservas
          <Footer :pie="pieHotel"></Footer>
        </v-window-item>

        <v-window-item :value="5">
          <Login :key="tab"></Login>
        </v-window-item>

      </v-window>

    </v-main>

    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row justify="space-around">
              <v-date-picker color="primary"></v-date-picker>
            </v-row>
          </v-container>
        </v-card-text>
        <!-- <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>

import Habitacion from '@/components/Habitacion.vue'
import Panel from '@/components/Panel.vue'
import Galeria from '@/components/Galeria.vue'
import Testimonio from '@/components/Testimonio.vue'
import Footer from '@/components/Footer.vue'
import Seccion from '@/components/Seccion.vue'

import Login from '@/components/Login.vue'

import { getMenu } from '@/services/menuService'
import { getSeccion } from '@/services/seccionService'
import { getPanel } from '@/services/panelService'
import { getCuadro } from '@/services/cuadroService'
import { getIconosPanel } from '@/services/iconoService'
import { getArchivosPanel } from '@/services/archivoService'
import { getGaleria, getArchivosGaleria } from '@/services/galeriaService'
import { getTestimonios } from '@/services/testimonioService'
import { getPie, getPieIconos } from '@/services/pieService'

import { getAllHabitaciones } from '@/services/habitacionService'
import { getArchivosHabitacion } from '@/services/archivoService'
import { getIconosHabitacion } from '@/services/iconoService'


export default {
  components: {
    Habitacion,
    Testimonio,
    Footer,
    Seccion,
    Panel,
    Galeria,
    Login
  },
  data: () => ({
    tab: null,
    dialog: false,

    menus: [],

    seccionHotel: {},
    panelHotel: {},
    galeriaHotel: {},
    testimoniosHotel: [],
    pieHotel: {},

    panel: {
      tipo: 'servicios',
      paralax: 'https://w0.peakpx.com/wallpaper/999/97/HD-wallpaper-man-made-room-bed-bedroom-furniture.jpg',
      estado: 1,
      mostrar_galeria: 0,
      numero_cuadro: 1,
      numero_seccion: 1,
      cuadro: {
        numero_cuadro: 1,
        titulo: 'Titulo Servicio',
        subtitulo: '',
        descripcion: 'Descubra la magia de Barcelona como nunca antes, deje que le guiemos con un tour privado por los lugares más icónicos de la ciudad condal y disfrute de un menú especial Picasso en el restaurante Informal de nuestro chef con estrella michelín Marc Gascons.',
        link: '',
        nombre_link: 'MAS INFORMACION',
      },
      iconos: [
        {
          nombre: 'mdi-food',
          tipo: 'Merienda a media mañana'
        },
        {
          nombre: 'mdi-food-variant',
          tipo: 'Almuerzo a medio dia'
        },
        {
          nombre: 'mdi-safe-square',
          tipo: 'Caja fuerte en habitaciones'
        },
        {
          nombre: 'mdi-elevator-passenger',
          tipo: 'Ascensor a todos los pisos'
        },
        {
          nombre: 'mdi-account-clock',
          tipo: 'Despertador las 24/7'
        },
      ],
      archivos: [
        { nombre: '', url: 'https://hoteldelizia.com/wp-content/uploads/2019/10/HD-Camere-2.jpg', link: '' },
        { nombre: '', url: 'https://p4.wallpaperbetter.com/wallpaper/837/534/538/bedroom-bed-architecture-interior-design-high-resolution-images-wallpaper-preview.jpg', link: '' },
        { nombre: '', url: 'https://urbanlarcohotel.com/wp-content/uploads/2017/07/superior-queenUrban-Larco-Hotel-Habitaciones-v4-13.jpg', link: '' },
        { nombre: '', url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/77/c3/f1/hotel-hd.jpg?w=700&h=-1&s=1', link: '' }
      ],
    },

    galeria: {
      tipo: 'galeria',
      estado: 1,
      numero_seccion: 1,
      cuadro: {
        numero_cuadro: 1,
        titulo: 'Galeria de Fotos',
        subtitulo: 'Todas las Habitaciones',
        descripcion: '',
        link: '',
        nombre_link: 'MAS INFORMACION',
      },
      archivos: [
        { nombre: '', url: 'https://hoteldelizia.com/wp-content/uploads/2019/10/HD-Camere-2.jpg', link: '' },
        { nombre: '', url: 'https://p4.wallpaperbetter.com/wallpaper/837/534/538/bedroom-bed-architecture-interior-design-high-resolution-images-wallpaper-preview.jpg', link: '' },
        { nombre: '', url: 'https://urbanlarcohotel.com/wp-content/uploads/2017/07/superior-queenUrban-Larco-Hotel-Habitaciones-v4-13.jpg', link: '' },
        { nombre: '', url: 'https://hoteldelizia.com/wp-content/uploads/2019/10/HD-Camere-2.jpg', link: '' },
        { nombre: '', url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/77/c3/f1/hotel-hd.jpg?w=700&h=-1&s=1', link: '' },
        { nombre: '', url: 'https://img.lovepik.com/photo/20211123/medium/lovepik-post-modern-hotel-standard-effect-map-picture_500845052.jpg', link: '' },
        { nombre: '', url: 'https://img.lovepik.com/photo/50180/9814.jpg_wh860.jpg', link: '' },
        { nombre: '', url: 'https://www.mobiliariohd.com/wp-content/uploads/2020/12/dormitorio-moderno-madeira-600x400.jpg', link: '' },
        { nombre: '', url: 'https://img.lovepik.com/photo/50094/9285.jpg_wh860.jpg', link: '' },
        { nombre: '', url: 'https://p4.wallpaperbetter.com/wallpaper/113/581/306/hotel-room-bed-furniture-wallpaper-preview.jpg', link: '' },
        { nombre: '', url: 'https://w0.peakpx.com/wallpaper/998/898/HD-wallpaper-beautiful-bedroom-architecture-interior-architecture-homes-rooms.jpg', link: '' },
        { nombre: '', url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFiaXRhY2lvbmVzfGVufDB8fDB8fHww&w=1000&q=80', link: '' },
        { nombre: '', url: 'https://media.admagazine.com/photos/624dbbb7d597900007432063/16:9/w_2560%2Cc_limit/Rainbow20Getaway_001.jpg', link: '' },
        { nombre: '', url: 'https://www.hotelpalermosuite.net/wp-content/uploads/2017/06/habitacion-ejecutiva.jpg', link: '' },
        { nombre: '', url: 'https://p4.wallpaperbetter.com/wallpaper/837/534/538/bedroom-bed-architecture-interior-design-high-resolution-images-wallpaper-preview.jpg', link: '' },
      ],
    },

    // habitaciones
    seccion_habitaciones: {},
    habitaciones: [],

    // servicios
    seccion_servicios: {},
    panelHotelCafeteria: {},
    galeriaCafeteria: {},
    galeriaHotelCafeteria: {},

    panelHotelSalon: {},
    galeriaHotelSalon: {},


  }),
  methods: {
    async obtenerMenu() {
      try {
        let res = await getMenu()
        if (res.status == 201 && res.data.data.length > 0) {
          this.menus = res.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },

    abrirTab(tab) {
      switch (tab) {
        case 1:
          this.obtenerSeccionHotel()
          break;
        case 2:
          this.obtenerSeccionHabitaciones()
          break;
        case 3:
          this.obtenerSeccionServicios()
          break;
      }
    },

    async obtenerSeccionHotel() {
      try {
        let res = await getSeccion(this.tab)
        if (res.status == 201 && res.data.data.length > 0) {
          this.seccionHotel = res.data.data[0]
        }
      } catch (error) {
        console.log(error)
      }
    },
    async obtenerPanelHotel() {
      try {
        let res = await getPanel(this.seccionHotel.numero_seccion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.panelHotel = res.data.data[0]

          if (this.panelHotel.numero_cuadro > 0) {
            let res1 = await getCuadro(this.panelHotel.numero_cuadro)
            if (res1.status == 201 && res1.data.data.length > 0) {
              this.panelHotel.cuadro = res1.data.data[0]
            }
          }
          if (this.panelHotel.id_panel > 0) {
            let res2 = await getIconosPanel(this.panelHotel.id_panel)
            if (res2.status == 201 && res2.data.data.length > 0) {
              this.panelHotel.iconos = res2.data.data
              let res3 = await getArchivosPanel(this.panelHotel.id_panel)
              if (res3.status == 201 && res3.data.data.length > 0) {
                this.panelHotel.archivos = res3.data.data
              }
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async obtenerGaleriaHotel() {
      try {
        let res = await getGaleria(this.seccionHotel.numero_seccion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.galeriaHotel = res.data.data[0]
          if (this.galeriaHotel.numero_galeria > 0) {
            let res2 = await getArchivosGaleria(this.galeriaHotel.id_galeria)
            if (res2.status == 201 && res2.data.data.length > 0) {
              this.galeriaHotel.archivos = res2.data.data
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async obtenerTestimoniosHotel() {
      try {
        let res = await getTestimonios(this.seccionHotel.numero_seccion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.testimoniosHotel = res.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async obtenerPieHotel() {
      try {
        let res = await getPie(this.seccionHotel.numero_seccion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.pieHotel = res.data.data[0]
          if (this.pieHotel.id_pie > 0) {
            let res1 = await getPieIconos(this.pieHotel.id_pie)
            if (res1.status == 201 && res1.data.data.length > 0) {
              this.pieHotel.iconos = res1.data.data
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

    //servicios

    async obtenerSeccionServicios() {
      try {
        let res = await getSeccion(this.tab)
        if (res.status == 201 && res.data.data.length > 0) {
          this.seccion_servicios = res.data.data[0]
          this.obtenerPanelHotelCafeteria()
          this.obtenerGaleriaHotelCafeteria()
          this.obtenerPanelHotelSalon()
          this.obtenerGaleriaHotelSalon()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async obtenerPanelHotelCafeteria() {
      try {
        let res = await getPanel(this.seccion_servicios.numero_seccion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.panelHotelCafeteria = res.data.data[0]

          if (this.panelHotelCafeteria.numero_cuadro > 0) {
            let res1 = await getCuadro(this.panelHotelCafeteria.numero_cuadro)
            if (res1.status == 201 && res1.data.data.length > 0) {
              this.panelHotelCafeteria.cuadro = res1.data.data[0]
            }
          }
          if (this.panelHotelCafeteria.id_panel > 0) {
            let res2 = await getIconosPanel(this.panelHotelCafeteria.id_panel)
            if (res2.status == 201 && res2.data.data.length > 0) {
              this.panelHotelCafeteria.iconos = res2.data.data
              let res3 = await getArchivosPanel(this.panelHotelCafeteria.id_panel)
              if (res3.status == 201 && res3.data.data.length > 0) {
                this.panelHotelCafeteria.archivos = res3.data.data
              }
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async obtenerGaleriaHotelCafeteria() {
      try {
        let res = await getGaleria(this.seccion_servicios.numero_seccion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.galeriaHotelCafeteria = res.data.data[0]
          if (this.galeriaHotelCafeteria.numero_galeria > 0) {
            let res2 = await getArchivosGaleria(this.galeriaHotelCafeteria.id_galeria)
            if (res2.status == 201 && res2.data.data.length > 0) {
              this.galeriaHotelCafeteria.archivos = res2.data.data
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

    async obtenerPanelHotelSalon() {
      try {
        let res = await getPanel(this.seccion_servicios.numero_seccion)
        if (res.status == 201 && res.data.data.length > 0) {
          console.log(res)
          this.panelHotelSalon = res.data.data[1]

          if (this.panelHotelSalon.numero_cuadro > 0) {
            let res1 = await getCuadro(this.panelHotelSalon.numero_cuadro)
            if (res1.status == 201 && res1.data.data.length > 0) {
              this.panelHotelSalon.cuadro = res1.data.data[0]
            }
          }
          if (this.panelHotelSalon.id_panel > 0) {
            let res2 = await getIconosPanel(this.panelHotelSalon.id_panel)
            if (res2.status == 201 && res2.data.data.length > 0) {
              this.panelHotelSalon.iconos = res2.data.data
              let res3 = await getArchivosPanel(this.panelHotelSalon.id_panel)
              if (res3.status == 201 && res3.data.data.length > 0) {
                this.panelHotelSalon.archivos = res3.data.data
              }
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async obtenerGaleriaHotelSalon() {
      try {
        let res = await getGaleria(this.seccion_servicios.numero_seccion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.galeriaHotelSalon = res.data.data[1]
          if (this.galeriaHotelSalon.numero_galeria > 0) {
            let res2 = await getArchivosGaleria(this.galeriaHotelSalon.id_galeria)
            if (res2.status == 201 && res2.data.data.length > 0) {
              this.galeriaHotelSalon.archivos = res2.data.data
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

    //habitaciones
    async obtenerSeccionHabitaciones() {
      try {
        let res = await getSeccion(this.tab)
        if (res.status = 201 && res.data.data.length > 0) {
          this.seccion_habitaciones = res.data.data[0]
        }
      } catch (error) {
        console.log(error)
      }
    },
    async obtenerHabitaciones() {
      try {
        let res = await getAllHabitaciones()
        if (res.status == 201 && res.data.data.length > 0) {
          this.habitaciones = res.data.data

          this.habitaciones = this.habitaciones.filter(item => item.publicar == 1)

          this.habitaciones.forEach(async item => {

            let res1 = await getArchivosHabitacion(item.id_habitacion)
            if (res1.status == 201 && res1.data.data.length > 0) {
              item.archivos = res1.data.data
            }
            let res2 = await getIconosHabitacion(item.id_habitacion)
            if (res2.status == 201 && res2.data.data.length > 0) {
              item.iconos = res2.data.data
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
    },

  },
  mounted() {
    this.obtenerMenu().then(() => this.obtenerSeccionHotel().then(() => this.obtenerPanelHotel().then(() => this.obtenerGaleriaHotel().then(() => this.obtenerTestimoniosHotel().then(() => this.obtenerPieHotel())))).then(() => this.obtenerSeccionHabitaciones().then(() => this.obtenerHabitaciones())))
  }
}
</script>
<style>
* {
  font-family: 'Quicksand', sans-serif !important;
}

.text-h1,
.text-h2,
.text-h3,
.text-h4,
.text-h5,
.text-h6,
.text-h7,
.text-h8,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Quicksand', sans-serif !important;
}</style>