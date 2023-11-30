<template>
  <v-container fluid style="background-color: #EAE6D7;">
    <v-row>
      <v-col lg="7" cols="12">
        <v-alert border="start" border-color="primary" elevation="2">
          <div class="text-h4">Registro de Nueva Habitacion.</div>
        </v-alert>
        <RegistrarHabitacion :habitacion="habitacion" :key="key_habitacion" v-on:guardarDatos="guardarDatosHabitacion"></RegistrarHabitacion>

      </v-col>
      <v-col lg="5">
        <v-expansion-panels class="mb-6">
          <v-expansion-panel style="background-color: #EEEEEE;">
            <v-expansion-panel-title expand-icon="mdi-menu-down" @click="abrirCategoria">
              <v-icon class="text-primary" icon="mdi-bed"></v-icon> <strong class="ms-4 text-primary">Categoria de
                Habitaciones</strong>
                <template v-slot:actions="{ expanded }">
                <v-icon :color="!expanded ? 'teal' : ''" :icon="expanded ? 'mdi-pencil' : 'mdi-check'"></v-icon>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container fluid>

                <v-row>
                  <v-col lg="8">
                    <v-text-field ref="nombre_categoria" v-model="nombre_categoria" @keyup="getNombreCategoriaMayuscula"
                      hide-details prepend-inner-icon="mdi-format-list-bulleted-type" label="nombre categoria"
                      variant="underlined"></v-text-field>
                  </v-col>
                  <v-col lg="4">
                    <v-text-field v-model="abreviado_categoria" @keyup="getAbreviadoCategoriaMayuscula" hide-details
                      prepend-inner-icon="mdi-format-list-text" label="abreviado" variant="underlined"
                      v-on:keyup.enter="guardarNuevaCategoria"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="6">
                    <v-btn block color="primary" append-icon="mdi-check" @click="guardarNuevaCategoria">registrar</v-btn>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-card>
                      <v-card-text>
                        <v-list>
                          <v-list-subheader color="primary" class="text-h6">LISTA DE CATEGORIAS</v-list-subheader>

                          <v-list-item v-for="(item, i) in categorias" :key="i" :value="item" color="primary"
                            rounded="shaped">

                            <template v-slot:prepend>
                              <v-icon icon="mdi-check"></v-icon>
                            </template>

                            <v-list-item-title v-text="item.nombre + ' (' + item.tipo + ')'"></v-list-item-title>
                            <template v-slot:append>
                              <v-btn color="grey-lighten-1" icon="mdi-pencil" variant="text"
                                @click="abrirDialgoCategoria(item)"></v-btn>
                            </template>
                          </v-list-item>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel style="background-color: #EEEEEE;">
            <v-expansion-panel-title expand-icon="mdi-menu-down" @click="abrirPrecio">
              <v-icon class="text-primary" icon="mdi-cash"></v-icon> <strong class="ms-4 text-primary">Precios de
                Habitaciones</strong>
                <template v-slot:actions="{ expanded }">
                <v-icon :color="!expanded ? 'teal' : ''" :icon="expanded ? 'mdi-pencil' : 'mdi-check'"></v-icon>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container fluid>

                <v-row>
                  <v-col lg="8">
                    <v-select v-model="id_moneda" hide-details prepend-inner-icon="mdi-cash" label="Tipo Moneda"
                      :items="items_monedas" variant="underlined"></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col lg="8">
                    <v-text-field ref="seleccionar_moneda" v-model="nombre_precio" @keyup="getNombrePrecioMayuscula"
                      hide-details prepend-inner-icon="mdi-format-list-bulleted-type" label="Tipo de Precio"
                      variant="underlined"></v-text-field>
                  </v-col>
                  <v-col lg="4">
                    <v-text-field v-model="valor_precio" @keyup="getAbreviadoPrecioMayuscula" hide-details
                      prepend-inner-icon="mdi-format-list-text" type="number" label="Precio" variant="underlined"
                      v-on:keyup.enter="guardarNuevaPrecio"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="6">
                    <v-btn block color="primary" append-icon="mdi-check" @click="guardarNuevaPrecio">registrar</v-btn>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-card>
                      <v-card-text>
                        <v-list>
                          <v-list-subheader color="primary" class="text-h6">LISTA DE PRECIOS</v-list-subheader>

                          <v-list-item v-for="(item, i) in precios" :key="i" :value="item" color="primary"
                            rounded="shaped">

                            <template v-slot:prepend>
                              <v-icon icon="mdi-check"></v-icon>
                            </template>

                            <v-list-item-title
                              v-text="item.nombre_precio + ' (' + item.valor_precio + ')'"></v-list-item-title>
                            <template v-slot:append>
                              <v-btn color="grey-lighten-1" icon="mdi-pencil" variant="text"
                                @click="abrirDialgoPrecio(item)"></v-btn>
                            </template>
                          </v-list-item>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel style="background-color: #EEEEEE;">
            <v-expansion-panel-title expand-icon="mdi-menu-down" @click="abrirIcono">
              <v-icon class="text-primary" icon="mdi-format-list-bulleted-type"></v-icon> <strong              
                class="ms-4 text-primary">Caracteristicas de la Habitacion</strong>
                <template v-slot:actions="{ expanded }">
                <v-icon :color="!expanded ? 'teal' : ''" :icon="expanded ? 'mdi-pencil' : 'mdi-check'"></v-icon>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container>
                <v-row>
                  <v-col lg="12" cols="12">
                    <v-text-field ref="caracteristica" v-model="caracteristica" density="compact" variant="underlined"
                      label="caracteristica" prepend-inner-icon='mdi-pencil' single-line hide-details></v-text-field>
                  </v-col>
                  <v-col lg="7" cols="12">
                    <v-text-field v-model="nombre_icono" density="compact" variant="underlined" label="Icono"
                      prepend-inner-icon='mdi-pencil' single-line hide-details prefix="mdi-"
                      v-on:keyup.enter="agregarIcono"></v-text-field>
                  </v-col>
                  <v-col lg="5" cols="12">
                    <v-btn block color="primary" class="mt-2" prepend-icon="mdi-plus"
                      @click="agregarIcono">agregar</v-btn>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-list>
                      <v-list-subheader color="primary" class="text-h6">CARACTERISTICAS</v-list-subheader>

                      <v-list-item v-for="(item, i) in iconos" :key="i" :value="item" color="primary" rounded="shaped">

                        <template v-slot:prepend>
                          <v-icon :icon="item.tipo"></v-icon>
                        </template>

                        <v-list-item-title v-text="item.nombre"></v-list-item-title>
                        <template v-slot:append>
                          <v-btn color="grey-lighten-1" icon="mdi-close" variant="text"
                            @click="eliminarIcono(item)"></v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel style="background-color: #EEEEEE;">
            <v-expansion-panel-title expand-icon="mdi-menu-down" @click="abrirArchivos">
              <v-icon class="text-primary" icon="mdi-image-area"></v-icon> <strong class="ms-4 text-primary">Imagenes de
                la Habitacion</strong>
                <template v-slot:actions="{ expanded }">
                <v-icon :color="!expanded ? 'teal' : ''" :icon="expanded ? 'mdi-pencil' : 'mdi-check'"></v-icon>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container>
                <v-row align="end">
                  <v-col lg="7" cols="12">
                    <v-img class="border" max-width="250" height="150" :src="urlArchivo"></v-img>
                  </v-col>
                  <v-col lg="5" cols="12">
                    <input class="custom-file-input" type="file" @change="changeArchivo">
                  </v-col>
                </v-row>

                <v-row>
                  <v-col lg="7" cols="12">
                    <v-text-field class="mt-2" v-model="nombreArchivo" density="compact" variant="underlined"
                      label="Nombre Imagen (opcional)" prepend-inner-icon='mdi-image-edit' single-line
                      hide-details></v-text-field>
                  </v-col>
                  <v-col lg="5" cols="12">
                    <v-btn color="primary" class="mt-4" block prepend-icon="mdi-plus"
                      @click="agregarArchivoHabitacion">agregar</v-btn>
                  </v-col>
                </v-row>

                <v-row justify="end">
                </v-row>

                <v-row>
                  <v-col v-for="(archivo, index) in archivos" :key="index" class="d-flex child-flex" cols="4">
                    <v-img :src="archivo.url" :lazy-src="archivo.url" aspect-ratio="1" cover class="bg-grey-lighten-2">
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                      <div class="d-flex justify-end">
                        <v-icon color="white" @click="eliminarArchivoHabitacion(archivo)">mdi-close</v-icon>
                      </div>
                    </v-img>
                  </v-col>
                </v-row>

              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel style="background-color: #EEEEEE;">
            <v-expansion-panel-title expand-icon="mdi-menu-down">
              <v-icon class="text-primary" icon="mdi-video-box"></v-icon> <strong class="ms-4 text-primary">Video de la
                Habitacion</strong>
              <template v-slot:actions="{ expanded }">
                <v-icon :color="!expanded ? 'teal' : ''" :icon="expanded ? 'mdi-pencil' : 'mdi-check'"></v-icon>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container>                
                <v-row>
                  <v-col lg="12">
                    <v-text-field class="mt-2" v-model="habitacion.url_video" density="compact" variant="underlined"
                      label="Url de video" prepend-inner-icon='mdi-image-edit' single-line hide-details :append-inner-icon="habitacion.url_video ? 'mdi-close' : ''" @click:append-inner="habitacion.url_video = ''"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <div class="video-responsive">
                      <iframe :src="habitacion.url_video" frameborder="0"
                        allowfullscreen="allowfullscreen"></iframe>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-snackbar color="dark" v-model="snackbar" :timeout="4000" vertical elevation-7>
        <div class="text-subtitle-1 pb-2">Error al Registrarse</div>

        <p>{{ mensaje }}</p>

        <template v-slot:actions>
          <v-btn variant="text" color="warning" @click="snackbar = false">
            cerrar
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>

  <v-dialog v-model="dialog_modificar_categoria" persistent width="500">
    <v-card>

      <v-toolbar color="primary">
        <v-toolbar-title>Modificar Categoria</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="cerrarDialogoCategoria">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col lg="8">
              <v-text-field ref="modificar_nombre" v-model="categoria.nombre" hide-details
                prepend-inner-icon="mdi-format-list-bulleted-type" label="nombre categoria" variant="underlined"
                @keyup="getNombreCategoriaMayuscula"></v-text-field>
            </v-col>
            <v-col lg="4">
              <v-text-field v-model="categoria.tipo" hide-details prepend-inner-icon="mdi-format-list-text"
                label="abreviado" variant="underlined" v-on:keyup.enter="modificarCategoria"
                @keyup="getAbreviadoCategoriaMayuscula"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="6">
              <v-btn block color="primary" append-icon="mdi-check" @click="modificarCategoria">modificar</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <!-- <v-card-actions>
        <v-btn color="primary" block @click="dialog_modificar_categoria = false" click="modificarCategoria">Close
          Dialog</v-btn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialog_modificar_precio" persistent width="500">
    <v-card>

      <v-toolbar color="primary">
        <v-toolbar-title>Modificar Precio</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="cerrarDialogoPrecio">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col lg="8">
              <v-text-field ref="modificar_precio" v-model="precio.nombre_precio" hide-details
                prepend-inner-icon="mdi-format-list-bulleted-type" label="Nombre Precio" variant="underlined"
                @keyup="getNombrePrecioMayuscula"></v-text-field>
            </v-col>
            <v-col lg="4">
              <v-text-field v-model="precio.valor_precio" hide-details prepend-inner-icon="mdi-format-list-text"
                label="Precio" variant="underlined" v-on:keyup.enter="modificarPrecio"
                @keyup="getAbreviadoPrecioMayuscula"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="6">
              <v-btn block color="primary" append-icon="mdi-check" @click="modificarPrecio">modificar</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <!-- <v-card-actions>
        <v-btn color="primary" block @click="dialog_modificar_categoria = false" click="modificarCategoria">Close
          Dialog</v-btn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>

import { getCategorias, saveCategoria, modifyCategoria, getLastCategoria } from '@/services/categoriaService'
import { getPrecios, savePrecio, modifyPrecio, getLastPrecio } from '@/services/precioService'
import { getMonedas } from '@/services/monedaService'
import { deleteIconoHabitacion, saveIconoHabitacion, getIconosHabitacion, updateIconoHabitacion } from '@/services/iconoService'
import { getArchivosHabitacion, saveArchivoHabitacion, deleteArchivoHabitacion, updateArchivoHabitacion } from '@/services/archivoService'
import { saveHabitacion, getLastHabitacion } from '@/services/habitacionService'

import RegistrarHabitacion from '@/components/RegistrarHabitacion.vue'
import { nextTick } from 'vue'

export default {
  components: {
    RegistrarHabitacion
  },
  data() {
    return {
      habitacion: { id_habitacion: 0, cap_adultos: 1, cap_ninos: 0, estado: 0, publicar: 0, sofa_cama: 0, detalle_cama: '', piso: 1, noche_boda: 0, detalle_noche_boda: '', detalle_corto: '', descripcion: '', url_video: '', valoracion: 0},
      key_habitacion: 1,

      //categorias
      categorias: [],
      categoria: {},
      nombre_categoria: '',
      abreviado_categoria: '',
      dialog_modificar_categoria: false,

      //precios
      id_moneda: 1,
      monedas: [],
      items_monedas: [],
      precios: [],
      precio: {},
      nombre_precio: '',
      valor_precio: '',
      dialog_modificar_precio: false,

      //caracteristicas
      iconos: [],
      icono: {},
      caracteristica: '',
      nombre_icono: '',

      //imagenes
      archivos: [],
      archivo: {},
      file: null,
      urlArchivo: '',
      nombreArchivo: '',

      //video
      urlVideo: '',

      //mensaje error
      mensaje: '',
      snackbar: false,
    }
  },
  methods: {

    //categoria
    abrirCategoria() {
      nextTick(() => {
        this.$refs.nombre_categoria.focus()
        this.$refs.nombre_categoria.select()
      })
    },
    getNombreCategoriaMayuscula() {
      if (this.nombre_categoria)
        this.nombre_categoria = this.nombre_categoria.toUpperCase()
      if (this.categoria.nombre)
        this.categoria.nombre = this.categoria.nombre.toUpperCase()
    },
    getAbreviadoCategoriaMayuscula() {
      if (this.abreviado_categoria)
        this.abreviado_categoria = this.abreviado_categoria.toUpperCase()
      if (this.categoria.tipo)
        this.categoria.tipo = this.categoria.tipo.toUpperCase()
    },
    abrirDialgoCategoria(item) {
      this.categoria = item
      this.dialog_modificar_categoria = true
      nextTick(() => {
        this.$refs.modificar_nombre.focus()
        this.$refs.modificar_nombre.select()
      })
    },
    cerrarDialogoCategoria() {
      this.dialog_modificar_categoria = false
      this.obtenerCategorias().then(() => this.abrirCategoria())
    },
    async obtenerCategorias() {
      try {
        let res = await getCategorias()
        if (res.status == 201 && res.data.data.length > 0) {
          this.categorias = res.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async guardarNuevaCategoria() {
      try {
        if (this.nombre_categoria != '' && this.abreviado_categoria != '') {
          let res = await getLastCategoria()
          let ultimaCategoria = null
          res.status == 201 && res.data.data.length > 0 ? ultimaCategoria = res.data.data[0] : ultimaCategoria = { numero_categoria: 0 }

          res = await saveCategoria({
            numero_categoria: ultimaCategoria.numero_categoria + 1,
            nombre: this.nombre_categoria,
            tipo: this.abreviado_categoria,
            estado_categoria: 1
          })
          if (res.status == 200) {
            this.key_habitacion++
            this.obtenerCategorias().then(() => this.cerrarCategoria())
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async modificarCategoria() {
      try {
        let res = await modifyCategoria(this.categoria)
        if (res.status == 200) {
          this.key_habitacion++
          this.obtenerCategorias().then(() => this.cerrarCategoria())
        }
      } catch (error) {
        console.log(error)
      }
    },
    cerrarCategoria() {
      this.nombre_categoria = ''
      this.abreviado_categoria = ''
      this.dialog_modificar_categoria = false
      this.abrirCategoria()
    },


    //Precio
    abrirPrecio() {
      nextTick(() => {
        this.$refs.seleccionar_moneda.focus()
        this.$refs.seleccionar_moneda.select()
      })
    },
    getNombrePrecioMayuscula() {
      if (this.nombre_precio)
        this.nombre_precio = this.nombre_precio.toUpperCase()
      if (this.precio.nombre_precio)
        this.precio.nombre_precio = this.precio.nombre_precio.toUpperCase()
    },
    getAbreviadoPrecioMayuscula() {
      if (this.valor_precio)
        this.valor_precio = this.valor_precio.toUpperCase()
      if (this.precio.tipo)
        this.precio.tipo = this.precio.tipo.toUpperCase()
    },
    abrirDialgoPrecio(item) {
      this.precio = item
      this.dialog_modificar_precio = true
      nextTick(() => {
        this.$refs.modificar_precio.focus()
        this.$refs.modificar_precio.select()
      })
    },
    cerrarDialogoPrecio() {
      this.dialog_modificar_precio = false
      this.obtenerPrecios().then(() => this.abrirPrecio())
    },
    async obtenerMonedas() {
      try {
        this.items_monedas = []
        let res = await getMonedas()
        if (res.status == 201 && res.data.data.length > 0) {
          this.monedas = res.data.data
          this.monedas.forEach(item => {
            this.items_monedas.push({
              title: item.nombre_moneda,
              value: item.id_moneda
            })
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async obtenerPrecios() {
      try {
        let res = await getPrecios()
        if (res.status == 201 && res.data.data.length > 0) {
          this.precios = res.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async guardarNuevaPrecio() {
      try {
        if (this.nombre_precio != '' && this.valor_precio > 0 && this.id_moneda > 0) {
          let res = await getLastPrecio()
          let ultimoPrecio = null
          res.status == 201 && res.data.data.length > 0 ? ultimoPrecio = res.data.data[0] : ultimoPrecio = { numero_precio: 0 }
          res = await savePrecio({
            numero_precio: ultimoPrecio.numero_precio + 1,
            nombre_precio: this.nombre_precio,
            valor_precio: this.valor_precio,
            estado_precio: 1,
            id_moneda: this.id_moneda
          })
          if (res.status == 200) {
            this.key_habitacion++
            this.obtenerPrecios().then(() => this.cerrarPrecio())
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async modificarPrecio() {
      try {
        let res = await modifyPrecio(this.precio)
        if (res.status == 200) {
          this.key_habitacion++
          this.obtenerPrecios().then(() => this.cerrarPrecio())
        }
      } catch (error) {
        console.log(error)
      }
    },
    cerrarPrecio() {
      this.nombre_precio = ''
      this.valor_precio = ''
      this.dialog_modificar_precio = false
      this.abrirPrecio()
    },

    //caracteristicas
    abrirIcono() {
      this.obtenerIconosHabitacion()
      this.$nextTick(() => {
        this.$refs.caracteristica.focus()
        this.$refs.caracteristica.select()
      })
    },
    async eliminarIcono(item) {
      try {
        let res = await deleteIconoHabitacion(this.habitacion.id_habitacion, item.id_icono)
        if (res.status == 201) {
          this.obtenerIconosHabitacion()
          this.$nextTick(() => this.$refs.caracteristica.focus())
        }
      } catch (error) {
        console.log(error)
      }
    },
    async obtenerIconosHabitacion() {
      try {
        let res = await getIconosHabitacion(this.habitacion.id_habitacion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.iconos = res.data.data
        } else {
          this.iconos = []
        }
      } catch (error) {
        console.log(error)
      }
    },
    async agregarIcono() {
      try {
        if (this.caracteristica && this.nombre_icono != '') {
          let res = await saveIconoHabitacion({
            nombre: this.caracteristica,
            tipo: 'mdi-' + this.nombre_icono,
            id_habitacion: this.habitacion.id_habitacion
          })
          if (res.status == 200) {
            this.caracteristica = ''
            this.nombre_icono = ''
            this.obtenerIconosHabitacion()
          }
        }
        this.$nextTick(() => {
          this.$refs.caracteristica.focus()
          this.$refs.caracteristica.select()
        })
      } catch (error) {
        console.log(error)
      }
    },


    //galeria imagenes
    async obtenerArchivosHabitacion() {
      try {
        let res = await getArchivosHabitacion(this.habitacion.id_habitacion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.archivos = res.data.data
        } else {
          this.archivo = []
        }
      } catch (error) {
        console.log(error)
      }
    },
    abrirArchivos() {
      this.obtenerArchivosHabitacion()
    },
    changeArchivo(event) {
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.urlArchivo = fileData
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },
    async agregarArchivoHabitacion() {
      try {
        if (this.urlArchivo) {
          let res = await saveArchivoHabitacion({
            nombre: this.nombreArchivo,
            url: this.urlArchivo,
            link: '',
            id_habitacion: this.habitacion.id_habitacion,
          })
          if (res.status == 200) {
            this.urlArchivo = ''
            this.nombreArchivo = ''
            this.obtenerArchivosHabitacion()
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async eliminarArchivoHabitacion(archivo) {
      try {
        let res = await deleteArchivoHabitacion(this.habitacion.id_habitacion, archivo.id_archivo)
        if (res.status == 200) {
          this.urlArchivo = ''
          this.nombreArchivo = ''
          this.obtenerArchivosHabitacion()
        }
      } catch (error) {
        console.log(error)
      }
    },
    // async actualizarGaleriaHotel() {
    //   try {
    //     let res = await updateGaleria(this.panelGaleria)
    //     if (res.status == 200) {
    //       this.obtenerSeccionHotel()
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    // cerrarDialogoArchivoGaleriaHotel() {
    //   this.dialogo_imagenes_galeria = false
    //   this.urlArchivo = ''
    //   this.linkImagenGaleria = null
    //   this.obtenerSeccionHotel()
    // },
    async guardarDatosHabitacion(datos){
      try {        
        if(this.validarDatosHabitacion()){
          let res = await saveHabitacion(datos)
          if(res.status == 200){
            let res1 = await getLastHabitacion()
            if(res1.status == 201 && res1.data.data.length > 0){
              let room = res1.data.data[0]
              
              this.iconos.forEach(async item => {
                await updateIconoHabitacion(room.id_habitacion, item.id_icono)
              })

              this.archivos.forEach(async item => {
                await updateArchivoHabitacion(room.id_habitacion, item.id_archivo)
              })
            }
            this.$swal('La Habitacion se Guardo Correctamente!',
                'se creo una nueva habitacion para la venta.',
                'success').then(() => this.$router.go(0))
          }          
        }          
      } catch (error) {
        console.log(error)  
        this.snackbar = true
        this.mensaje = error      
      }
    },
    validarDatosHabitacion(){
      let respuesta = false
      if(this.iconos.length > 0 && this.archivos.length > 0)
        respuesta = true
      else{
        this.snackbar = true
        this.mensaje = 'Error: Debe agregar Obligatoriamente las CARACTERISTICAS y las IMAGENES, al menos 1 de cada SERVICIO'
      }
      return respuesta
    }
  },

  mounted() {
    this.obtenerCategorias().then(() => this.obtenerPrecios().then(() => this.obtenerMonedas().then(() => this.obtenerIconosHabitacion().then(() => this.obtenerArchivosHabitacion()))))
  }
}
</script>

<style lang="scss" scoped>
.custom-file-input {
  color: transparent;
  max-width: 10rem;
  max-height: 2rem;
}

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}

.custom-file-input::before {
  content: 'subir imagen';
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 100%;
  font-weight: 300;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 3px;
  margin: 0;
  size: .4rem;
  background-color: #585030;
  transition: all 0.3s linear;
  cursor: pointer;
}

.custom-file-input:hover::before {
  background-color: #EAE6D7;
  /* #1e3552; */
  color: #585030;
}

.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}

// @media (max-width: 1500px) {
//   .custom-file-input, .custom-file-input::before {
//     content: 'agregar';
//     width: 5rem;
//     margin-left: 1.5rem;
//     margin-top: 1rem;
//   }
// }

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
}</style>