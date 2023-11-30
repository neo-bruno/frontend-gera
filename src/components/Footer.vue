<template>
  <v-container fluid class="pa-0">
    <footer>
      <div class="container__footer">
  
        <v-container fluid>
          <v-row>
            <v-col lg="8" cols="12" class="box__footer">
              <h2>Ubicacion en Google Maps</h2>
              <div class="embed-container"><iframe :src="pie.url_mapa" width="700" height="auto" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
              <div class="text-white text-center">
                <p>{{ pie.direccion }}</p>
                <p>{{ pie.telefonos }}</p>
                <p>{{ pie.lugar }}</p>
              </div>
            </v-col>
            <v-col lg="4" cols="12" class="box__footer">
              <h2>Redes Sociales</h2>
              <v-container>
                <v-row>
                  <v-col cols="12" v-for="(icono, index) in pie.iconos" :key="index">
                    <v-chip style="font-size: 1.3rem;" class="text-white" :prepend-icon="icono.tipo" variant="text">{{ icono.nombre }}</v-chip>
                  </v-col>                
                </v-row>
              </v-container>            
            </v-col>
          </v-row>
        </v-container>
      </div>
  
      <div class="box__copyright">
        <hr>
        <p>Todos los Derechos son Reservados © Copyright 2023 <b>Rudolf Felipez Mancilla</b></p>
        <!-- <p>Todos los derechos reservados © 2021 <b>MagtimusPro</b></p> -->
      </div>
    </footer>
  </v-container>
</template>

<script>
export default {
  props:{
    pie: {},
  },
  data(){
    return{

    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  margin-top: 2rem;
  padding: 50px 0px;
  background-image: url('../assets/background-footer.svg');
  background-size: cover;
}

.container__footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: auto;
  margin: auto;
  margin-top: 100px;
}

.box__footer {
  display: flex;
  flex-direction: column;
  padding: 40px;
}

.box__footer h2 {
  color: #fff;
  font-weight: 700;
}

.box__footer > v-chip {
  margin-top: 10px;
  color: #fff;
  font-weight: 600;
}

.box__copyright {
  max-width: 1200px;
  margin: auto;
  text-align: center;
  padding: 0px 40px;
}

.box__copyright p {
  margin-top: 20px;
  color: #fff;
}

.box__copyright hr {
  border: none;
  height: 1px;
  background-color: #fff;
}

.embed-container {
  position: relative;
  padding-bottom: 50%;  
  overflow: hidden;
}

.embed-container iframe {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  height: 90%;
}
</style>