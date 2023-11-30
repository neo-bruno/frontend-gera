<template>
  <div class="fondo-reserva">
    <v-container>
      <v-row>
        <v-col lg="8" md="9" sm="9" cols="12">
          <v-row>
            <v-col lg="3" md="4" sm="5" cols="12">
              <v-text-field type="date" :min="fecha_llegada" v-model:model-value="fecha_llegada" label="fecha ingreso"
                hint="ingrese fecha llegada" hide-details variant="outlined"></v-text-field>
            </v-col>
            <v-col lg="3" md="4" sm="4" cols="12">
              <v-text-field type="date" readonly v-model:model-value="fecha_salida" label="fecha salida"
                hint="ingrese fecha salida" hide-details variant="outlined"></v-text-field>
            </v-col>

            <v-col lg="2" md="3" sm="3" cols="12">
              <v-text-field type="number" v-model:model-value="noches" label="dias" hint="nro noches" hide-details
                variant="outlined" append-inner-icon="mdi-white-balance-sunny"></v-text-field>
            </v-col>
            <v-col lg="2" md="3" sm="4" cols="12">
              <v-text-field type="number" v-model:model-value="adultos" label="adultos" hint="nro personas" hide-details
                variant="outlined" append-inner-icon="mdi-account-multiple"></v-text-field>
            </v-col>
            <v-col lg="2" md="3" sm="4" cols="12">
              <v-text-field type="number" v-model:model-value="ninos" label="niños" hint="nro niños" hide-details
                variant="outlined" append-inner-icon="mdi-account-group"></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col lg="4" md="3" sm="3" cols="12">
          <v-btn height="55" color="primary" prepend-icon="mdi-magnify" block>buscar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      // reservas
      noches: 1,
      adultos: 1,
      ninos: 0,
      fecha_llegada: moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD'),
      fecha_salida: moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD'),
    }
  },
  methods:{

  },
  mounted(){

  }
}
</script>

<style lang="css" scoped>
.fondo-reserva {
  position: absolute;
  min-width: 90%;
  text-align: center;
  top: 85%;
  left: 50%;
  /* border: 1px solid black; */
  border-radius: 1rem;
  transform: translate(-50%, -50%);
  background: linear-gradient(rgba(234, 230, 215, .9), rgba(88, 80, 48, .9));
}
@media screen and (max-width:800px) {
  .fondo-reserva {
    min-width: 95%;
    top: 85%;
  }
}
@media screen and (max-width:600px) {
  .fondo-reserva {
    min-width: 80%;
    top: 62%;
  }
}
</style>