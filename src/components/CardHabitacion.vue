<template>
  <div class="card">
    <div class="imgBox">
      <img :src="habitacion.imagen_principal" @click="abrirCarrusel">
    </div>
    <div class="details">
      <div class="textContent">
        <!-- <div class="text-h6">{{ getEstado() }}</div> -->
        <h3>{{ getEstado() }}</h3>
        <div class="price">{{ habitacion.valor_precio }}</div>
      </div>
      <h4>adultos: <v-badge color="primary" class="me-6" :content="habitacion.cap_adultos" floating></v-badge> <span class="ms-6">niños:
          <v-badge color="primary" :content="habitacion.cap_ninos" floating></v-badge></span></h4>
      <ul>
        <li><v-icon icon="mdi-cart-plus"></v-icon></li>
        <li><router-link :to="`/productos/editar/${1}`" class="router-link"><v-icon
              icon="mdi-pencil"></v-icon></router-link></li>
        <li><v-icon icon="mdi-eye"></v-icon></li>
        <li><router-link :to="`/kardex/${1}`" class="router-link"><v-icon icon="mdi-alpha-k-box"></v-icon></router-link>
        </li>
        <li @click=""><v-icon icon="mdi-barcode"></v-icon></li>
      </ul>
      <button @click=""><v-icon icon="mdi-bed" class="mx-3"></v-icon>reservar habitacion</button>
    </div>

    <div class="description">
      <div class="icon">{{ habitacion.titulo }}</div>
      <div class="contents">
        <div class="text-h6 text-center">{{ habitacion.nombre }}</div>        
        <div class="text-h7">piso: <strong class="ms-2">{{ habitacion.piso }}</strong></div>
        <div class="text-h7">cap. adultos: <strong class="ms-2">{{ habitacion.cap_adultos }}</strong> </div>
        <div class="text-h7">cap. niños: <strong class="ms-2">{{ habitacion.cap_ninos }}</strong> </div>
        <div class="text-h7">dimension: <strong class="ms-2">{{ habitacion.dimension }} </strong> mts²</div>                
        <div class="text-h7">telefono: <strong class="ms-2">{{ habitacion.telefono }}</strong></div>
        <div class="text-h7">check in: <strong class="ms-2">{{ habitacion.check_in }}</strong> am</div>
        <div class="text-h7">check out: <strong class="ms-2">{{ habitacion.check_out }}</strong> pm</div>
        <div class="text-h7">publicado: <strong class="ms-2">{{ habitacion.publicar == 1 ? 'SI' : 'NO'}}</strong></div>
        <div class="text-h7">precio: <strong class="ms-2">{{ habitacion.valor_precio }}</strong> {{ habitacion.nombre_moneda }}</div>
      </div>
    </div>
    <v-row>
      <v-snackbar v-model="snackbar">
        {{ mensaje }}
        <template v-slot:actions>
          <v-btn color="error" style="color: white !important;" variant="text" @click="snackbar = false">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </div>
  <v-dialog v-model="dialog" width="700">
    <v-card>
      <v-toolbar :title="'Hab.: ' + habitacion.nombre"></v-toolbar>
      <v-card-text class="pa-0 ma-0">
        <v-carousel show-arrows="hover">
          <v-carousel-item v-for="archivo in habitacion.archivos" :src="archivo.url" cover></v-carousel-item>
        </v-carousel>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
  
<script>

export default {
  name: 'CardHabitacion',
  props: {
    habitacion: {}
  },
  data() {
    return {

      snackbar: false,
      mensaje: '',
      dialog: false,

    }
  },
  methods: {
    abrirCarrusel() {
      this.dialog = true
    },
    getEstado() {
      let estado = ''
      switch (this.habitacion.estado) {
        case 0:
          estado = 'VACANTE'
          break;
        case 1:
          estado = 'OCUPADO'
          break;
        case 2:
          estado = 'SALIDA'
          break;
        case 3:
          estado = 'LIMPIEZA'
          break;
        case 4:
          estado = 'INHABILITADO'
          break;
      }
      return estado
    },

  },
  mounted() {
  },
}
</script>
  
<style lang="css" scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap'); */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* font-family: 'Poppins', sans-serif; */
  text-decoration: none;
}

.router-link {
  display: block;
  color: #333;
}

.card {
  width: 290px;
  height: 315px;
  background: #f4f4f4;
  position: relative;
  border-radius: 10px;
  box-shadow: 0;
  transform: scale(0.95);
  transition: box-shadow .5s ease-in-out, transform .5s ease-in-out;
  overflow: hidden;
}

.card:hover {
  transform: scale(1);
  box-shadow: 5px 20px 30px rgba(0, 0, 0, .3);
}

.imgBox {
  width: 100%;
  height: 80%;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
}

.details {
  position: absolute;
  width: 100%;
  height: 50%;
  background: #f4f4f4be;
  padding: 10px 20px;
  bottom: -30%;
  transition: .5s;
}

.details:hover {
  bottom: 0;
  height: 55%;
}

.textContent {
  position: relative;
  margin-top: 10px;
  color: #555;
}

h3 {
  font-size: 20px;
  padding: 0px 0;
  width: 17rem;
}

.price {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 30px;
}

h4 {
  font-size: 18px;
  margin-top: 15px;
  padding: 10px 0;
  color: #555;
}

ul {
  display: flex;
}

ul li {
  list-style: none;
  width: 15px;
  height: 15px;
  margin-left: 13px;
  margin-right: 13px;
  cursor: pointer;
}

ul li:nth-child(1) {
  cursor: pointer;
}

ul li:nth-child(2) {
  cursor: pointer;
}

ul li:nth-child(3) {
  cursor: pointer;
}

ul li:nth-child(4) {
  cursor: pointer;
}

ul li:nth-child(5) {
  cursor: pointer;
}

button {
  width: 100%;
  padding: 5px 0;
  margin: 15px 0;
  background: #585030;
  color: #fff;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
}

button:hover {
  background: #EAE6D7;
  color: #585030;
}

.description {
  background: #585030;
  position: absolute;
  width: 110%;
  height: 120px;
  top: -70px;  
  right: -10px;
  border-radius: 200px 200px 20px 20px;
  transition: all .5s, border-radius 1s, top 1s;
}

.description .icon {
  position: absolute;
  font-size: 1.2rem;
  top: 85px;
  right: 50px;
  left: 50px;
  color: #fff;
  opacity: 1;
}

.description:hover {
  width: 100%;
  height: 80%;
  right: 0;
  top: 0;
  font-size: .97rem;
  border-radius: 0;
}

.description:hover .icon {
  opacity: 0;
}

.description .contents {
  color: #fff;
  padding: 5%;
  transform: scale(0.5);
  transform: translateY(-200%);
  transition: opacity .2s, transform .8s;
  opacity: 0;
}

.description:hover .contents {
  transform: scale(1);
  opacity: 1;
  transform: translateY(0);
}

.contents h3 {
  width: 100%;
}

.description h2 {
  margin: 0 0;
  text-align: center;
}
</style>