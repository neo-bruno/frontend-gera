<template>  
  <div class="fondo" :style="' background-image: linear-gradient(rgba(88, 80, 48, .4), rgba(234, 230, 215, .4)), url('+seccion.url+');'">
    <div class="fondo-titulo">
      <div class="text-h2">{{ seccion.titulo }}</div>
      <div class="text-h5">{{ seccion.subtitulo }}</div>
    </div>
    <CuadroReservas v-if="seccion.estado_cuadro == 1"></CuadroReservas>
  </div>

  <v-parallax v-if="seccion.paralax" height="700" :src="seccion.paralax" scale=".1" cover></v-parallax>  
</template>

<script>
import CuadroReservas from '@/components/CuadroReservas.vue';

export default {
  components:{
    CuadroReservas,
  },
  props:{
    seccion: {}
  },
  data(){
    return{      
    }
  },
  methods:{

  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
.fondo {
  width: auto;
  min-height: 93.5vh;
  max-height: auto;
  position: relative;
  overflow: hidden;
  background-size: cover;
}
.fondo-titulo {
  position: absolute;
  min-width: 70%;
  text-align: center;
  top: 40%;
  left: 50%;  
  transform: translate(-50%, -50%);
}

@media screen and (max-width:800px) {
  .fondo-titulo {
    min-width: 80%;
    top: 15%;
  }
}
@media screen and (max-width:600px) {
  .fondo-titulo {
    min-width: 80%;
    top: 13%;
  }
}
</style>