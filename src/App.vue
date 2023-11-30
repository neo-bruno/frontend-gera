<template>
  <v-app id="inspire">
      <AppBar v-if="$route.meta.requireAuth"></AppBar>
    <v-main>
      <router-view />      
    </v-main>
  </v-app>
  
</template>

<script>

import AppBar from './components/AppBar.vue';

export default{
  components: {
    AppBar
  }
}  
</script>

<style>
  /* @import url('https://fonts.googleapis.com/css2?family=Mooli&display=swap'); */
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
  *{
    /* font-family: 'Mooli', sans-serif; */
    font-family: 'Quicksand', sans-serif !important;
  }  
</style>
