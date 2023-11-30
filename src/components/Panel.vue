<template>
  <v-container fluid>
    <v-row>
      <v-col lg="5" cols="12">
        <v-row>
          <v-col cols="12">
            <div class="text-h3 text-center mt-7">{{ panel.titulo }}</div>
          </v-col>
          <v-col cols="12">
            <div class="text-h5 text-center my-0">{{ panel.subtitulo }}</div>
          </v-col>
          <v-col cols="12">
            <div class="text-6 text-justify ma-5 mt-0">{{ panel.descripcion }}</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="6" md="6" sm="6" cols="12" v-for="(icono, index) in panel.iconos" :key="index">
            <v-chip :prepend-icon="icono.tipo" variant="text">{{ icono.nombre }}</v-chip>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="7" md="6" sm="8" cols="12">
            <v-btn append-icon="mdi-arrow-right-drop-circle" color="primary">{{ panel.nombre_url }}</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col lg="7" cols="12">
        <v-carousel interval="2000" cycle hide-delimiter-background show-arrows="hover">
          <v-carousel-item v-for="(archivo, index) in panel.archivos" :key="index" :src="archivo.url" cover></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
  <v-row>
    <v-parallax v-if="panel.paralax" height="700" scale=".3" cover :src="panel.paralax"></v-parallax>
  </v-row>
  
</template>

<script>
export default {
  props: {
    panel: {},
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

<style lang="scss" scoped></style>