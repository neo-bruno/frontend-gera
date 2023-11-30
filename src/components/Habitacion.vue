<template>  
  <v-container fluid>
    <v-row>
      <v-col lg="7" md="12" cols="12">
        <v-carousel show-arrows="hover">
          <v-carousel-item v-for="archivo in habitacion.archivos" :src="archivo.url" cover></v-carousel-item>
        </v-carousel>        
      </v-col>
      <v-col lg="5" md="12" cols="12">
        <v-container>
          <v-row>
            <v-col cols="12">
              <div class="text-h3 text-center text-wrap">{{ habitacion.nombre }}</div>
              <div class="text-h7 text-justify pa-5">
                <p>{{ habitacion.descripcion }}</p>
              </div>
            </v-col>
            <v-divider color="primary"></v-divider>
          </v-row>

          <v-row>
            <v-col class="ma-0 pa-0" lg="6" sm="6" cols="12" v-for="(icono, index) in habitacion.iconos" :key="index">
              <v-chip :prepend-icon="icono.tipo_icono" variant="text">{{ icono.nombre_icono }}</v-chip>
            </v-col>
          </v-row>
          <v-row class="my-8">
            <v-col lg="6" md="6" sm="3" cols="12">
              <div class="text-h5">precio: <strong>{{ habitacion.valor_precio }} </strong><span class="ms-2">x noche</span></div>
            </v-col>
            <v-col lg="6" md="6" sm="7" cols="12">
              <router-link :to="`/habitacion/${habitacion.id_habitacion}`" style="text-decoration: none;">
                <v-btn variant="elevated" append-icon="mdi-arrow-right-drop-circle" color="primary" block>Ver Mas</v-btn>
                <!-- <a class='flotante'>
                </a> -->
              </router-link>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props:{
    habitacion: {},    
  },
  data(){
    return{

    }
  },
  methods: {
    irHabitacion(){
      console.log('la habitacion es: ', this.habitacion)
      this.$router.push({name: 'habitacion'})  
    }
  }
}
</script>

<style lang="css" scoped>

.slider {
  width: 100%;
  height: auto;
  max-height: 40rem;
  overflow: hidden;
}

.slider ul {
  display: flex;
  animation: cambio 15s infinite alternate linear;
  width: 400%;
}

.slider li {
  width: 100%;
  list-style: none;
}

.slider img {
  width: 100%;
  height: 100%;
}

@keyframes cambio {
  0% {
    margin-left: 0;
  }

  20% {
    margin-left: 0;
  }

  25% {
    margin-left: -100%;
  }

  45% {
    margin-left: -100%;
  }

  50% {
    margin-left: -200%;
  }

  70% {
    margin-left: -200%;
  }

  75% {
    margin-left: -300%;
  }

  100% {
    margin-left: -300%;
  }
}

@media screen and (max-width:800px) {
  .fondo-titulo {
    min-width: 80%;
    top: 40%;
  }
}

@media screen and (max-width:600px) {
  
}
</style>