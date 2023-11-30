<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="secondary">
      <v-tab value="one">Registro Habitaciones</v-tab>
      <v-tab value="two">Habitaciones Publicadas</v-tab>
      <v-tab value="three">Habitaciones Reservadas</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <RegistroHabitaciones></RegistroHabitaciones>
          <router-link to="/habitaciones/nuevaH" style="text-decoration: none;">
            <a class='flotante' href=''><v-btn class="ma-2" color="primary" size="60" icon="mdi-plus"></v-btn></a>
          </router-link>
        </v-window-item>

        <v-window-item value="two">
          <HabitacionesPublicadas></HabitacionesPublicadas>
        </v-window-item>

        <v-window-item value="three">
          3
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>

import RegistroHabitaciones from '@/components/RegistroHabitaciones.vue'
import HabitacionesPublicadas from '@/components/HabitacionesPublicadas.vue';

export default {
  components: {
    RegistroHabitaciones,
    HabitacionesPublicadas
  },
  data: () => ({
    tab: null,
  })
}
</script>

<style lang="scss" scoped>
.v-card-text {
  padding: 0px;
}

.flotante {
  display: scroll;
  position: fixed;
  bottom: 10px;
  right: 0px;
}

@media (max-width: 570px) {
  .flotante {
    bottom: 2.5rem;
  }
}
</style>