<template>
  <v-navigation-drawer color="secondary" v-model="drawer">
    <div class="text-center">
      <img class="my-3" style="border-radius: 1rem;" src="../assets/logo.jpg" height="150" width="240">
      <p class="titulo">{{ nombre }}</p>
      <p class="mb-3">{{ posicion }}</p>
      <v-divider></v-divider>
    </div>

    <v-list class="mx-auto pa-2" density="compact">
      <v-list-item class="my-2" color="primary" elevation="7" rounded="shaped" variant="elevated"
        v-for="(item, i) in items" :key="i" :value="item" @click="presionoItem(item.text)"
        :active="estado === item.text ? true : false">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block elevation="7" rounded="lg" @click="cerrarSession">
          <v-icon icon="mdi-export" class="me-7"></v-icon>
          Cerrar
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-app-bar color="primary">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-app-bar-title>Application</v-app-bar-title>
    <!-- <v-toolbar-title>Sistema Itzel</v-toolbar-title> -->
  </v-app-bar>
</template>

<script>

export default {
  data() {
    return {
      drawer: null,
      items: [],
      estado: localStorage.ruta,
      nombre: localStorage.name,
      posicion: localStorage.position,
    }
  },
  methods: {
    presionoItem(item) {

      if (localStorage.level == 1) {

        this.items = [
          { text: 'Administrador', icon: 'mdi-home-account' },
          { text: 'Pagina Web', icon: 'mdi-web' },
          { text: 'Habitaciones', icon: 'mdi-bed' },
          { text: 'Reservas', icon: 'mdi-folder-file-outline' },
          { text: 'Cliente', icon: 'mdi-account-switch' },
        ]

        switch (item) {
          case 'Administrador':
            this.estado = 'Administrador'
            this.$router.push({ name: 'admin' })
            localStorage.ruta = this.estado
            break;
          case 'Pagina Web':
            this.estado = 'Pagina Web'
            this.$router.push({ name: 'pagina' })
            localStorage.ruta = this.estado
            break;
          case 'Habitaciones':
            this.estado = 'Habitaciones'
            this.$router.push({ name: 'habitaciones' })
            localStorage.ruta = this.estado
            break;
          case 'Reservas':
            this.estado = 'Reservas'
            this.$router.push({ name: 'reservas' })
            localStorage.ruta = this.estado
            break;
          case 'Cliente':
            this.estado = 'Cliente'
            this.$router.push({ name: 'cliente' })
            localStorage.ruta = this.estado
            break;

          default:
            this.estado = 'Administrador'
            this.$router.push({ name: 'admin' })
        }
      }
      if (localStorage.level == 2) {
        this.items = [
          { text: 'Huesped', icon: 'mdi-home-account' },          
        ]
        switch (item) {
          case 'Huesped':
            this.estado = 'Huesped'
            this.$router.push({ name: 'huesped' })
            localStorage.ruta = this.estado
            break;
          default:
            this.estado = 'huesped'
            this.$router.push({ name: 'huesped' })
        }
      }



    },
    cerrarSession() {
      console.log('se retiro')
      localStorage.clear()
      this.$router.push({ name: "hotel" })
    },
  },
  mounted() {
    console.log('este es el nivel: ', localStorage.name, localStorage.position)
    this.presionoItem(localStorage.position)
  }
}
</script>

<style lang="scss" scoped>
.titulo {
  text-align: center;
  color: #333;
  font-size: 1.5rem;
}
</style>