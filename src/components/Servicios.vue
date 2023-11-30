<template>
  <div class="slider">
    <ul>
      <li>
        <v-img class="fondo"
          style="background-image: linear-gradient(rgba(88, 80, 48, .4), rgba(234, 230, 215, .4)), url('https://images7.alphacoders.com/463/463342.jpg');"
          cover>
          <div>
            <div id="fondo-titulo" class="fondo-titulo">
              <div class="text-h2">Servicios</div>
              <div class="text-h5">Su Amigo de Siempre...</div>
            </div>
          </div>
        </v-img>
      </li>
      <li>
        <v-img class="fondo"
          style="background-image: linear-gradient(rgba(88, 80, 48, .4), rgba(234, 230, 215, .4)), url('https://images.alphacoders.com/462/462267.jpg');"
          cover>
          <div>
            <div id="fondo-titulo" class="fondo-titulo">
              <div class="text-h2">Servicios</div>
              <div class="text-h5">Su Amigo de Siempre...</div>
            </div>
          </div>
        </v-img>
      </li>
      <li>
        <v-img class="fondo"
          style="background-image: linear-gradient(rgba(88, 80, 48, .4), rgba(234, 230, 215, .4)), url('https://images2.alphacoders.com/650/650971.jpg');"
          cover>
          <div>
            <div id="fondo-titulo" class="fondo-titulo">
              <div class="text-h2">Servicios</div>
              <div class="text-h5">Su Amigo de Siempre...</div>
            </div>
          </div>
        </v-img>
      </li>
      <li>
        <v-img class="fondo"
          style="background-image: linear-gradient(rgba(88, 80, 48, .4), rgba(234, 230, 215, .4)), url('https://images7.alphacoders.com/463/463342.jpg');"
          cover>
          <div>
            <div id="fondo-titulo" class="fondo-titulo">
              <div class="text-h2">Servicios</div>
              <div class="text-h5">Su Amigo de Siempre...</div>
            </div>
          </div>
        </v-img>
      </li>
    </ul>
  </div>
  <div>
    <v-parallax
      src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFiaXRhY2lvbmVzfGVufDB8fDB8fHww&w=1000&q=80"></v-parallax>
  </div>
  <v-container fluid>
    <v-row>
      <v-col lg="5" cols="12">
        <v-row>
          <v-col cols="12">
            <div class="text-h3 text-center mt-7">Titulo Servicios</div>
          </v-col>
          <v-col cols="12">
            <div class="text-6 text-justify ma-5">Descubra la magia de Barcelona como nunca antes, deje que le guiemos con
              un tour privado por los lugares más icónicos de la ciudad condal y disfrute de un menú especial Picasso en
              el restaurante Informal de nuestro chef con estrella michelín Marc Gascons.</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="6" cols="12"><v-chip prepend-icon="mdi-food" variant="text">Merienda a media mañana</v-chip></v-col>
          <v-col lg="6" cols="12"><v-chip prepend-icon="mdi-food-variant" variant="text">Almuerzo a medio
              dia</v-chip></v-col>
        </v-row>
        <v-row>
          <v-col lg="5" md="6" sm="8" cols="12">
            <v-btn append-icon="mdi-arrow-right-drop-circle" color="primary">mas informacion</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col lg="7" cols="12">
        <v-carousel>
          <v-carousel-item
            src="https://p4.wallpaperbetter.com/wallpaper/672/69/238/hotel-room-bed-furniture-wallpaper-preview.jpg"
            cover></v-carousel-item>

          <v-carousel-item
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3_Lxh6BOZKYTMokAQuyb7mR5RE-f4pumGD8ujpCIov5T3WI27j2eng2AgHTpk4gMrnMw&usqp=CAU"
            cover></v-carousel-item>

          <v-carousel-item
            src="https://2.bp.blogspot.com/-IWOzkQ7JRuE/UBgIRnDCG2I/AAAAAAAAEmY/-5PR3CyqAvk/s1600/Decoracio%CC%81n+de+un+Dormitorio+en+Blanco+y+Marro%CC%81n+1.jpg"
            cover></v-carousel-item>
        </v-carousel>
      </v-col>

    </v-row>
  </v-container>

  <!-- otro servicio -->
  <div>
    <v-parallax
      src="https://p4.wallpaperbetter.com/wallpaper/672/69/238/hotel-room-bed-furniture-wallpaper-preview.jpg"></v-parallax>
  </div>
  <v-container fluid>
    <v-row>
      <v-col lg="5" cols="12">
        <v-row>
          <v-col cols="12">
            <div class="text-h3 text-center mt-7">Titulo Servicio</div>
          </v-col>
          <v-col cols="12">
            <div class="text-6 text-justify ma-5">Descubra la magia de Barcelona como nunca antes, deje que le guiemos con
              un tour privado por los lugares más icónicos de la ciudad condal y disfrute de un menú especial Picasso en
              el restaurante Informal de nuestro chef con estrella michelín Marc Gascons.</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="6" md="6" sm="6" cols="12"><v-chip prepend-icon="mdi-food" variant="text">Merienda a media
              mañana</v-chip></v-col>
          <v-col lg="6" md="6" sm="6" cols="12"><v-chip prepend-icon="mdi-food-variant" variant="text">Almuerzo a medio
              dia</v-chip></v-col>
        </v-row>
        <v-row>
          <v-col lg="5" md="6" sm="8" cols="12">
            <v-btn append-icon="mdi-arrow-right-drop-circle" color="primary">mas informacion</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col lg="7" cols="12">
        <v-carousel>
          <v-carousel-item
            src="https://p4.wallpaperbetter.com/wallpaper/672/69/238/hotel-room-bed-furniture-wallpaper-preview.jpg"
            cover></v-carousel-item>

          <v-carousel-item
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3_Lxh6BOZKYTMokAQuyb7mR5RE-f4pumGD8ujpCIov5T3WI27j2eng2AgHTpk4gMrnMw&usqp=CAU"
            cover></v-carousel-item>

          <v-carousel-item
            src="https://2.bp.blogspot.com/-IWOzkQ7JRuE/UBgIRnDCG2I/AAAAAAAAEmY/-5PR3CyqAvk/s1600/Decoracio%CC%81n+de+un+Dormitorio+en+Blanco+y+Marro%CC%81n+1.jpg"
            cover></v-carousel-item>
        </v-carousel>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>
.fondo {
  width: auto;
  height: 93.5vh;
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
  /* border: 1px solid black; */
  transform: translate(-50%, -50%);
}

.slider {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.slider ul {
  display: flex;
  animation: cambio 20s infinite alternate linear;
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

@media screen and (max-width:600px) {}</style>