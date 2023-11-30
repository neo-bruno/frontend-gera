<template>
  <v-row>
    <v-col cols="12" v-show="galeria.titulo" class="pb-0"><div class="text-h3 text-center mt-6">{{ galeria.titulo }}</div></v-col>
    <v-col cols="12" v-show="galeria.subtitulo" class="pa-0"><div class="text-h5 text-center">{{ galeria.subtitulo }}</div></v-col>    
    <v-col cols="12" v-show="galeria.descripcion"><div class="text-justify mx-5">{{ galeria.descripcion }}</div></v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <div class="container-img">
        <div class="box-img" v-for="(archivo, index) in galeria.archivos" :key="index">
          <a href="#">
            <figure>
              <img :src="archivo.url" alt="img-galeria">
            </figure>
          </a>
        </div>
      </div>
    </v-col>    
  </v-row>
</template>

<script>
export default {
  props: {  
    galeria: {},
  },
  data() {
    return {
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.container-img {
  width: 100%;
  max-width: 98%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 250px;
  grid-gap: 20px;
}

.container-img .box-img figure {
  width: 100%;
  height: 100%;
}

.container-img .box-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.container-img .box-img:nth-child(2) {
  grid-column-start: span 2;
}

.container-img .box-img:nth-child(4) {
  grid-row-start: span 2;
}

.container-img .box-img:nth-child(6) {
  grid-column-start: span 2;
}

.container-img .box-img:nth-child(8) {
  grid-row-start: span 2;
}

@media screen and (max-width:800px) {
   .container-img {
    width: 95%;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    grid-template-rows: 200px;
  }

  .container-img .box-img:nth-child(2) {
    grid-column-start: span 1;
  }

  .container-img .box-img:nth-child(4) {
    grid-column-start: span 1;
  }

  .container-img .box-img:nth-child(6) {
    grid-column-start: span 1;
  }

  .container-img .box-img:nth-child(8) {
    grid-column-start: span 1;
  }
}

@media screen and (max-width:600px) {
   .container-img {
    width: 90%;
    grid-template-columns: repeat(1, 1fr);
  }

  .container-img .box-img img {
    height: 200px;
  }
}
</style>