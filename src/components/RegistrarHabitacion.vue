<template>
  <v-container>
    <v-row>
      <v-col lg="6">        
        <v-img class="border" height="200" :src="habitacion.imagen_principal"></v-img>
        <input class="custom-file-input mt-1" type="file" @change="changeUrl">
      </v-col>
      <v-col lg="6">
        <v-row id="fila">
          <v-col class="texto" cols="12">
            <v-select v-model="habitacion.numero_categoria" hide-details prepend-inner-icon="mdi-bed" label="Tipo de Habitaciones (*)"
              :items="items"
              variant="underlined"></v-select>
          </v-col>
          <v-col class="texto" lg="6">
            <v-text-field v-model="habitacion.numero" hide-details prepend-inner-icon="mdi-format-list-numbered" type="number" label="Numero (*)"
              variant="underlined"></v-text-field>
          </v-col>
          <v-col class="texto" lg="6">
            <v-text-field v-model="habitacion.titulo" hide-details prepend-inner-icon="mdi-text-box-edit" label="Nombre Corto (*)"
              variant="underlined" @keyup="mayusculaTitulo"></v-text-field>
          </v-col>
          <v-col class="texto" cols="12">
            <v-text-field v-model="habitacion.nombre" hide-details prepend-inner-icon="mdi-text-box-edit" label="Nombre Habitacion (*)"
              variant="underlined" @keyup="mayusculaTitulo"></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- ² -->
    <v-row class="texto">
      <v-col class="texto" lg="3">
        <v-text-field v-model="habitacion.cap_adultos" hide-details prepend-inner-icon="mdi-human-male-female" type="number" label="Adultos (*)"
          suffix="pers." variant="underlined"></v-text-field>
      </v-col>
      <v-col class="texto" lg="3">
        <v-text-field v-model="habitacion.cap_ninos" hide-details prepend-inner-icon="mdi-human-queue" type="number" suffix="niños" label="Niños (*)"
          variant="underlined"></v-text-field>
      </v-col>
      <v-col class="texto" lg="3">
        <v-text-field v-model="habitacion.dimension" hide-details prepend-inner-icon="mdi-resize" suffix="mts" label="Dimension (*)"
          variant="underlined"></v-text-field>
      </v-col>
      <v-col class="texto" lg="3">
        <v-select v-model="habitacion.piso" hide-details prepend-inner-icon="mdi-arrow-expand-vertical" label="N° piso (*)" :items="items_pisos"
          variant="underlined" suffix="piso"></v-select>
        <!-- <v-text-field v-model="habitacion.piso" hide-details prepend-inner-icon="mdi-arrow-expand-vertical" type="number" label=""
          suffix="piso" variant="underlined"></v-text-field> -->
      </v-col>      
    </v-row>
        
    <v-row class="texto">
      <v-col class="texto" cols="2">
        <v-text-field v-model="habitacion.telefono" hide-details prepend-inner-icon="mdi-phone" label="Telefono" variant="underlined"></v-text-field>
      </v-col>
      <v-col class="texto" lg="3">
        <v-text-field v-model="habitacion.check_in" hide-details prepend-inner-icon="mdi-clock-start" type="time" suffix="am/pm" label="Check In"
          variant="underlined"></v-text-field>
      </v-col>
      <v-col class="texto" lg="3">
        <v-text-field v-model="habitacion.check_out" hide-details prepend-inner-icon="mdi-clock-end" type="time" suffix="am/pm" label="Check Out"
          variant="underlined"></v-text-field>
      </v-col>
      <v-col class="texto" lg="4">
        <v-select v-model="habitacion.estado" hide-details prepend-inner-icon="mdi-state-machine" label="Estado"
          :items="items_estado" variant="underlined"></v-select>
      </v-col>      
    </v-row>    

    <v-row class="texto">     
      <v-col class="texto" lg="2">
        <v-select v-model="habitacion.sofa_cama" hide-details prepend-inner-icon="mdi-bed-single" label="Cama (+)"
        :items="items_sofa_cama" variant="underlined"></v-select>
      </v-col>
      <v-col class="texto" lg="2">
        <v-select v-model="habitacion.publicar" hide-details prepend-inner-icon="mdi-web" label="Publicar" :items="items_sofa_cama"
          variant="underlined"></v-select>
      </v-col> 
      <v-col lg="5">
        <v-select v-model="habitacion.precio" hide-details prepend-inner-icon="mdi-cash-multiple" label="Tipo de Precio (*)" :items="items_precio"
          variant="underlined" @update:modelValue="changePrecio"></v-select>
      </v-col>
      <v-col lg="3">
        <v-text-field v-model="nombre_moneda" hide-details prepend-inner-icon="mdi-cash" readonly :suffix="habitacion.precio ? habitacion.precio.nombre_moneda : ''" label="Precio"
          variant="underlined"></v-text-field>
      </v-col>      
      <v-col v-if="habitacion.sofa_cama == 1" class="texto" lg="12">
        <v-text-field v-model="habitacion.detalle_cama" hide-details prepend-inner-icon="mdi-bed" label="Descripcion de Adicionar Cama" variant="underlined"></v-text-field>
      </v-col>      
    </v-row>

    <v-row class="texto">
      <v-col cols="12">
        <v-text-field v-model="habitacion.detalle_corto" hide-details prepend-inner-icon="mdi-comment-edit" label="Detalle Corto de la Habitacion (*)"
          variant="underlined"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea v-model="habitacion.descripcion" hide-details label="Descripcion de la Habitacion" prepend-inner-icon="mdi-text-box-edit" auto-grow variant="underlined" rows="3" row-height="15"></v-textarea>
      </v-col>
    </v-row>

    <v-row class="texto">      
      <v-col class="texto" lg="3">
        <v-select v-model="habitacion.noche_boda" hide-details prepend-inner-icon="mdi-bed-king" label="Bodas"
          :items="items_noche_bodas" variant="underlined"></v-select>
      </v-col>
      <v-col v-if="habitacion.noche_boda == 1" class="texto" lg="9">
        <v-textarea v-model="habitacion.detalle_noche_boda" hide-details label="Servicio Noche de Bocas" prepend-inner-icon="mdi-text-box-edit" auto-grow variant="underlined" rows="3" row-height="15"></v-textarea>        
      </v-col>
      <!-- <v-col class="texto" lg="12">
        <v-text-field hide-details prepend-inner-icon="mdi-youtube" label="Url de Video en Youtube" variant="underlined"></v-text-field>
      </v-col> -->
    </v-row>

    <v-row justify="center">
      <v-col lg="6">
        <v-btn variant="elevated" block color="#B4B1A5" prepend-icon="mdi-close" @click="salirRegistro">Salir del Registro</v-btn>
      </v-col>
      <v-col lg="6">
        <v-btn variant="elevated" block color="primary" prepend-icon="mdi-content-save" @click="guardarDatos">Guardar los datos</v-btn>
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
</template>

<script>

import { getCategorias } from '@/services/categoriaService'
import { getAllPrecios } from '@/services/precioService'

export default {
  props:{
    habitacion: {}
  },
  data(){
    return{
      file: null,      
      numero_categoria: null,
      categorias: [],
      items: [],
      items_precio: [],
      sofaCama: {title: 'NO', value: 0},
      items_sofa_cama: [{title: 'NO', value: 0}, {title: 'SI', value: 1}],
      items_noche_bodas: [{title: 'NO', value: 0}, {title: 'SI', value: 1}],
      items_estado: [{title: 'VACANTE', value: 0}, {title: 'OCUPADO', value: 1}, {title: 'LIMPIEZA', value: 2}, {title: 'FUERA SERVICIO', value: 3}],
      items_pisos: [{title: '1', value: 1}, {title: '2', value: 2}, {title: '3', value: 3}, {title: '4', value: 4}, {title: '4', value: 5}, {title: '6', value: 6}, {title: '7', value: 7}, {title: '8', value: 8}],
      url: 'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152644/The-Resort-at-Pedregal-1.jpg',
      precios: [],
      precio: null,
      nombre_moneda: '',

      mensaje: '',
      snackbar: false,
    }
  },
  methods:{
    mayusculaTitulo(){
      if (this.habitacion.titulo)
        this.habitacion.titulo = this.habitacion.titulo.toUpperCase()
      if (this.habitacion.nombre)
      this.habitacion.nombre = this.habitacion.nombre.toUpperCase()
    },
    changeUrl(event) {      
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.habitacion.imagen_principal = fileData          
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },
    changePrecio(){
      this.nombre_moneda = this.habitacion.precio.valor_precio      
    },
    async obtenerCategorias(){
      try {
        let res = await getCategorias()
        if(res.status == 201 && res.data.data.length > 0){
          this.categorias = res.data.data 
          this.items = []         
          this.categorias.forEach(item => {
            this.items.push({
              title: item.nombre,
              value: item.numero_categoria
            })
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async obtenerPrecios() {
      try {
        let res = await getAllPrecios()
        if (res.status == 201 && res.data.data.length > 0) {
          this.precios = res.data.data
          this.precios.forEach(item => {
            this.items_precio.push({
              title: item.nombre_precio,
              value: item,
              unidad: item.nombre_moneda
            })
          })
        }
      } catch (error) {
        console.log(error)
      }
    },

    //salir
    salirRegistro(){
      this.$router.push({name: 'habitaciones'})
    },
    guardarDatos(){     
      if(this.verificarDatosHabitacion()) 
        this.$emit('guardarDatos', this.habitacion)
    },
    verificarDatosHabitacion(){
      let respuesta = false
      if( this.habitacion.imagen_principal != '' && this.habitacion.numero_categoria > 0 && this.habitacion.numero != '' && this.habitacion.titulo != '' && this.habitacion.nombre != '' && this.habitacion.cap_adultos > 0 && this.habitacion.cap_ninos >= 0 && this.habitacion.piso > 0 && this.habitacion.precio != null && this.habitacion.detalle_corto != ''){
        this.habitacion.numero_precio = this.habitacion.precio.numero_precio
        respuesta = true
      }else{
        this.mensaje = 'Error: No puede haber campos obligatorios (*) VACIOS'
        this.snackbar = true
      }
      return respuesta
    }
  },
  mounted(){
    this.obtenerCategorias().then(() => this.obtenerPrecios())
  }
}
</script>

<style lang="scss" scoped>
.texto {
  margin-top: 5px;
  margin-bottom: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.custom-file-input {
  color: transparent;
  max-width: 10rem;
  max-height: 2rem;
}

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}

.custom-file-input::before {
  content: 'imagen principal (*)';
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
</style>