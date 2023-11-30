<template>
  <v-container fluid>
    <v-row>
      <v-col lg="9">
        <Hotel style="height: 100rem !important;" v-scroll.self="onScroll" class="overflow-y-auto" :key="contador">
        </Hotel>
      </v-col>
      <v-col lg="3">
        <div class="text-h5">HOTEL</div>
        <v-expansion-panels class="mb-6">
          <v-expansion-panel>
            <v-expansion-panel-title expand-icon="mdi-menu-down" @click="abrirSeccion">
              Seccion Principal
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container fluid>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-img class="border" :max-width="230" :min-width="230" :height="130" :src="seccionHotel.url"></v-img>
                    <input class="custom-file-input mt-3" type="file" @change="changeUrl">
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-img class="border" :max-width="230" :min-width="230" :height="130"
                      :src="seccionHotel.paralax"></v-img>
                    <input class="custom-file-input mt-3" type="file" @change="changeParalax">
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field ref="titulo" v-model="seccionHotel.titulo" density="compact" variant="underlined"
                      label="Titulo"
                      :append-inner-icon="seccionHotel.titulo == titulo ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarSeccion" single-line hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="seccionHotel.subtitulo" density="compact" variant="underlined"
                      label="Sub Titulo"
                      :append-inner-icon="seccionHotel.subtitulo == subtitulo ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarSeccion" single-line hide-details></v-text-field>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="12">
                    <v-checkbox single-line hide-details v-model="estado_cuadro" @change="cambiarEstadoReservas"
                      label="Cuadro Reservas"></v-checkbox>
                  </v-col>
                </v-row>
                <!-- <v-row no-gutters>
                  <v-col cols="12">
                    <v-checkbox single-line hide-details v-model="estado_seccion" @change="estado_seccion"
                      label="Estado Seccion"></v-checkbox>
                  </v-col>
                </v-row> -->
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title expand-icon="mdi-menu-down" @click="abrirPanel">
              Servicio Hotel
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field ref="titulo" v-model="panelHotel.titulo" density="compact" variant="underlined"
                      :append-inner-icon="panelHotel.titulo == titulo_panel ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPanelHotel" label="Titulo" single-line hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="panelHotel.subtitulo" density="compact" variant="underlined" label="Sub Titulo"
                      :append-inner-icon="panelHotel.subtitulo == subtitulo_panel ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPanelHotel" single-line hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea label="descripcion" v-model="panelHotel.descripcion" :model-value="panelHotel.descripcion"
                      auto-grow variant="outlined" rows="3" row-height="25"
                      :append-inner-icon="panelHotel.descripcion == descripcion_panel ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPanelHotel" shaped single-line hide-details></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="panelHotel.nombre_url" density="compact" variant="underlined"
                      label="nombre boton"
                      :append-inner-icon="panelHotel.nombre_url == nombre_url_panel ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPanelHotel" single-line hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="panelHotel.url" density="compact" variant="underlined" label="direccion boton"
                      :append-inner-icon="panelHotel.url == url_panel ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPanelHotel" single-line hide-details></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn block color="primary" class="font-weight-thin" prepend-icon="mdi-plus" density="comfortable"
                      @click="abrirPanelIconos">iconos</v-btn>
                  </v-col>
                  <v-col cols="12">
                    <v-btn block color="primary" class="font-weight-thin" prepend-icon="mdi-plus" density="comfortable"
                      @click="abrirPanelArchivos">imagenes</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-img class="border" cover :max-width="230" :min-width="230" :height="130"
                      :src="panelHotel.paralax"></v-img>
                    <input class="custom-file-input mt-3" type="file" @change="changePanelParalaxHotel">
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title expand-icon="mdi-menu-down">
              Galeria Fotos
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <v-text-field ref="titulo" v-model="panelGaleria.titulo" density="compact" variant="underlined"
                      :append-inner-icon="panelGaleria.titulo == titulo_galeria ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarGaleriaHotel" label="Titulo" single-line hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="panelGaleria.subtitulo" density="compact" variant="underlined"
                      label="Sub Titulo"
                      :append-inner-icon="panelGaleria.subtitulo == subtitulo_galeria ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarGaleriaHotel" single-line hide-details></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12">
                    <v-textarea label="descripcion" v-model="panelGaleria.descripcion" :model-value="panelGaleria.descripcion" auto-grow variant="outlined"
                      rows="3" row-height="25" :append-inner-icon="panelGaleria.descripcion == descripcion_galeria ? 'mdi-pencil' : 'mdi-content-save'"
                    @click:append-inner="actualizarPanelHotel" shaped single-line hide-details></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="panelGaleria.nombre_url" density="compact" variant="underlined"
                      label="nombre boton" :append-inner-icon="panelGaleria.nombre_url == nombre_url_galeria ? 'mdi-pencil' : 'mdi-content-save'"
                    @click:append-inner="actualizarPanelHotel"  single-line hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="panelGaleria.url" density="compact" variant="underlined" label="direccion boton"
                    :append-inner-icon="panelGaleria.url == url_galeria ? 'mdi-pencil' : 'mdi-content-save'"
                    @click:append-inner="actualizarPanelHotel" single-line hide-details></v-text-field>
                  </v-col> -->
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn block color="primary" class="font-weight-thin" prepend-icon="mdi-plus" density="comfortable"
                      @click="abrirGaleriaPanelHotel">imagenes</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title expand-icon="mdi-menu-down" @click="abrirTestimonios">
              Testimonios
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="texto" :loading="loading" ref="buscar" density="compact" variant="solo"
                      label="buscar huesped" append-inner-icon="mdi-magnify" single-line hide-details
                      @click:append-inner="onClick" v-on:keyup.enter="onClick"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-card max-width="auto" width="350" min-width="auto">
                    <v-list>
                      <v-list-item v-for="huesped in huespedes" :key="huesped"
                        :prepend-avatar="huesped.url ? huesped.url : 'https://cdn4.iconfinder.com/data/icons/social-media-3/512/User_Follower-512.png'">

                        <v-list-item-title v-text="huesped.nombre + ' ' + huesped.apellidos"></v-list-item-title>
                        <v-list-item-subtitle v-text="huesped.posicion"></v-list-item-subtitle>
                        <template v-slot:append>
                          <v-btn color="grey-lighten-1" icon="mdi-eye" variant="text"
                            @click="mostrarTestimonio(huesped)"></v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-row>

              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title expand-icon="mdi-menu-down">
              Informacion Final
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <div class="embed-container"><iframe :src="pie.url_mapa" height="auto" style="border:0;"
                        allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea label="ubitacion en el mapa" v-model="pie.url_mapa" :model-value="pie.url_mapa" auto-grow
                      variant="outlined" rows="3" row-height="25"
                      :append-inner-icon="pie.url_mapa == url_mapa ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPieHotel" shaped single-line hide-details></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-textarea label="ubitacion en el mapa" v-model="pie.direccion" :model-value="pie.direccion"
                      auto-grow variant="outlined" rows="3" row-height="25"
                      :append-inner-icon="pie.direccion == direccion_pie ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPieHotel" shaped single-line hide-details></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea label="telefonos" v-model="pie.telefonos" :model-value="pie.telefonos" auto-grow
                      variant="outlined" rows="2" row-height="25"
                      :append-inner-icon="pie.telefonos == telefonos_pie ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPieHotel" shaped single-line hide-details></v-textarea>
                  </v-col>
                  <v-col>
                    <v-textarea label="lugar" v-model="pie.lugar" :model-value="pie.lugar" auto-grow variant="outlined"
                      rows="2" row-height="25"
                      :append-inner-icon="pie.lugar == lugar_pie ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPieHotel" shaped single-line hide-details></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn block color="primary" class="font-weight-thin" prepend-icon="mdi-plus"
                      @click="abrirPieHotel">iconos</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <div class="text-h5">HABITACIONES</div>
        <v-expansion-panels class="mb-6">
          <v-expansion-panel>
            <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
              Seccion Habitaciones
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container fluid>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-img class="border" :max-width="230" :min-width="230" :height="130" :src="seccionHabitacion.url"></v-img>
                    <input class="custom-file-input mt-3" type="file" @change="changeUrlHabitacion">
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-img class="border" :max-width="230" :min-width="230" :height="130"
                      :src="seccionHabitacion.paralax"></v-img>
                    <input class="custom-file-input mt-3" type="file" @change="changeParalaxHabitacion">
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field ref="titulo" v-model="seccionHabitacion.titulo" density="compact" variant="underlined"
                      label="Titulo"
                      :append-inner-icon="seccionHabitacion.titulo == titulo_habitacion ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarSeccionHabitacion" single-line hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="seccionHabitacion.subtitulo" density="compact" variant="underlined"
                      label="Sub Titulo"
                      :append-inner-icon="seccionHabitacion.subtitulo == subtitulo_habitacion ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarSeccionHabitacion" single-line hide-details></v-text-field>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="12">
                    <v-checkbox single-line hide-details v-model="estado_cuadro_habitacion" @change="cambiarEstadoReservasHabitaciones"
                      label="Cuadro Reservas"></v-checkbox>
                  </v-col>
                </v-row>
                <!-- <v-row no-gutters>
                  <v-col cols="12">
                    <v-checkbox single-line hide-details v-model="estado_seccion" @change="estado_seccion"
                      label="Estado Seccion"></v-checkbox>
                  </v-col>
                </v-row> -->
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>
          
        </v-expansion-panels>

        <div class="text-h5">SERVICIOS</div>
        <v-expansion-panels class="mb-6">
          <v-expansion-panel>
            <v-expansion-panel-title expand-icon="mdi-menu-down">
              Seccion Servicios
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container fluid>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-img class="border" :max-width="230" :min-width="230" :height="130"
                      :src="seccionServicioHotel.url"></v-img>
                    <input class="custom-file-input mt-3" type="file" @change="changeUrlServicio">
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-img class="border" :max-width="230" :min-width="230" :height="130"
                      :src="seccionServicioHotel.paralax"></v-img>
                    <input class="custom-file-input mt-3" type="file" @change="changeParalaxServicio">
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field ref="titulo" v-model="seccionServicioHotel.titulo" density="compact"
                      variant="underlined" label="Titulo"
                      :append-inner-icon="seccionServicioHotel.titulo == servicio_titulo ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarSeccionServicio" single-line hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="seccionServicioHotel.subtitulo" density="compact" variant="underlined"
                      label="Sub Titulo"
                      :append-inner-icon="seccionServicioHotel.subtitulo == servicio_subtitulo ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarSeccionServicio" single-line hide-details></v-text-field>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="12">
                    <v-checkbox single-line hide-details v-model="servicio_estado_cuadro"
                      @change="cambiarEstadoReservasServicios" label="Cuadro Reservas"></v-checkbox>
                  </v-col>
                </v-row>
                <!-- <v-row no-gutters>
                  <v-col cols="12">
                    <v-checkbox single-line hide-details v-model="estado_seccion" @change="estado_seccion"
                      label="Estado Seccion"></v-checkbox>
                  </v-col>
                </v-row> -->
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title expand-icon="mdi-menu-up">
              Cafeteria
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field ref="titulo" v-model="panelHotelCafeteria.titulo" density="compact" variant="underlined"
                      :append-inner-icon="panelHotelCafeteria.titulo == titulo_panel_cafeteria ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPanelHotelCafeteria" label="Titulo" single-line
                      hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="panelHotelCafeteria.subtitulo" density="compact" variant="underlined"
                      label="Sub Titulo"
                      :append-inner-icon="panelHotelCafeteria.subtitulo == subtitulo_panel_cafeteria ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPanelHotelCafeteria" single-line hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea label="descripcion" v-model="panelHotelCafeteria.descripcion"
                      :model-value="panelHotelCafeteria.descripcion" auto-grow variant="outlined" rows="3" row-height="25"
                      :append-inner-icon="panelHotelCafeteria.descripcion == descripcion_panel_cafeteria ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPanelHotelCafeteria" shaped single-line hide-details></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="panelHotelCafeteria.nombre_url" density="compact" variant="underlined"
                      label="nombre boton"
                      :append-inner-icon="panelHotelCafeteria.nombre_url == nombre_url_panel_cafeteria ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPanelHotelCafeteria" single-line hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="panelHotelCafeteria.url" density="compact" variant="underlined"
                      label="direccion boton"
                      :append-inner-icon="panelHotelCafeteria.url == url_panel_cafeteria ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPanelHotelCafeteria" single-line hide-details></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn block color="primary" class="font-weight-thin" prepend-icon="mdi-plus" density="comfortable"
                      @click="abrirPanelIconosCafeteria">iconos</v-btn>
                  </v-col>
                  <v-col cols="12">
                    <v-btn block color="primary" class="font-weight-thin" prepend-icon="mdi-plus" density="comfortable"
                      @click="abrirPanelArchivosCafeteria">imagenes</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-img class="border" cover :max-width="230" :min-width="230" :height="130"
                      :src="panelHotelCafeteria.paralax"></v-img>
                    <input class="custom-file-input mt-3" type="file" @change="changePanelParalaxHotelCafeteria">
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title expand-icon="mdi-menu-up">
              Fotos Cafeteria
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <v-text-field ref="titulo" v-model="panelGaleriaCafeteria.titulo" density="compact" variant="underlined"
                      :append-inner-icon="panelGaleriaCafeteria.titulo == titulo_galeria_cafeteria ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarGaleriaHotelCafeteria" label="Titulo" single-line hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="panelGaleriaCafeteria.subtitulo" density="compact" variant="underlined"
                      label="Sub Titulo"
                      :append-inner-icon="panelGaleriaCafeteria.subtitulo == subtitulo_galeria_cafeteria ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarGaleriaHotelCafeteria" single-line hide-details></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn block color="primary" class="font-weight-thin" prepend-icon="mdi-plus" density="comfortable"
                      @click="abrirGaleriaPanelHotelCafeteria">imagenes</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title expand-icon="mdi-menu-up">
              Salon de Eventos
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field ref="titulo" v-model="panelHotelSalon.titulo" density="compact" variant="underlined"
                      :append-inner-icon="panelHotelSalon.titulo == titulo_panel_salon ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPanelHotelSalon" label="Titulo" single-line
                      hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="panelHotelSalon.subtitulo" density="compact" variant="underlined"
                      label="Sub Titulo"
                      :append-inner-icon="panelHotelSalon.subtitulo == subtitulo_panel_salon ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPanelHotelSalon" single-line hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea label="descripcion" v-model="panelHotelSalon.descripcion"
                      :model-value="panelHotelSalon.descripcion" auto-grow variant="outlined" rows="3" row-height="25"
                      :append-inner-icon="panelHotelSalon.descripcion == descripcion_panel_salon ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPanelHotelSalon" shaped single-line hide-details></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="panelHotelSalon.nombre_url" density="compact" variant="underlined"
                      label="nombre boton"
                      :append-inner-icon="panelHotelSalon.nombre_url == nombre_url_panel_salon ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPanelHotelSalon" single-line hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="panelHotelSalon.url" density="compact" variant="underlined"
                      label="direccion boton"
                      :append-inner-icon="panelHotelSalon.url == url_panel_salon ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarPanelHotelSalon" single-line hide-details></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn block color="primary" class="font-weight-thin" prepend-icon="mdi-plus" density="comfortable"
                      @click="abrirPanelIconosSalon">iconos</v-btn>
                  </v-col>
                  <v-col cols="12">
                    <v-btn block color="primary" class="font-weight-thin" prepend-icon="mdi-plus" density="comfortable"
                      @click="abrirPanelArchivosSalon">imagenes</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-img class="border" cover :max-width="230" :min-width="230" :height="130"
                      :src="panelHotelSalon.paralax"></v-img>
                    <input class="custom-file-input mt-3" type="file" @change="changePanelParalaxHotelSalon">
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title expand-icon="mdi-menu-up">
              Fotos Salon de Eventos
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <v-text-field ref="titulo" v-model="panelGaleriaSalon.titulo" density="compact" variant="underlined"
                      :append-inner-icon="panelGaleriaSalon.titulo == titulo_galeria_salon ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarGaleriaHotelSalon" label="Titulo" single-line hide-details></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="panelGaleriaSalon.subtitulo" density="compact" variant="underlined"
                      label="Sub Titulo"
                      :append-inner-icon="panelGaleriaSalon.subtitulo == subtitulo_galeria_salon ? 'mdi-pencil' : 'mdi-content-save'"
                      @click:append-inner="actualizarGaleriaHotelSalon" single-line hide-details></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn block color="primary" class="font-weight-thin" prepend-icon="mdi-plus" density="comfortable"
                      @click="abrirGaleriaPanelHotelSalon">imagenes</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>


        </v-expansion-panels>


      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="dialogo_iconos_hotel" width="500" persistent transition="dialog-top-transition">
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title>Gestionar los Iconos</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="cerrarDialogoIconosPanelHotel">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col lg="12" cols="12">
                  <v-text-field ref="detalle" v-model="nombre" density="compact" variant="underlined"
                    label="Detalle Icono" prepend-inner-icon='mdi-pencil' single-line hide-details></v-text-field>
                </v-col>
                <v-col lg="6" cols="12">
                  <v-text-field v-model="icono" density="compact" variant="underlined" label="Nombre Icono"
                    prepend-inner-icon='mdi-pencil' single-line hide-details prefix="mdi-"
                    v-on:keyup.enter="agregarIconoListaPanelHotel"></v-text-field>
                </v-col>
                <v-col lg="6" cols="12">
                  <v-btn color="primary" class="mt-2" prepend-icon="mdi-plus" @click="agregarIconoListaPanelHotel">agregar
                    a lista</v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-list>
                    <v-list-subheader color="primary" class="text-h6">LISTA DE ICONOS</v-list-subheader>

                    <v-list-item v-for="(item, i) in panelHotel.iconos" :key="i" :value="item" color="primary"
                      rounded="shaped">

                      <template v-slot:prepend>
                        <v-icon :icon="item.tipo"></v-icon>
                      </template>

                      <v-list-item-title v-text="item.nombre"></v-list-item-title>
                      <template v-slot:append>
                        <v-btn color="grey-lighten-1" icon="mdi-close" variant="text"
                          @click="eliminarPanelIconoHotel(item)"></v-btn>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="elevated" color="primary" block @click="cerrarDialogoIconosPanelHotel">Salir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row>
      <v-dialog v-model="dialogo_imagenes_hotel" width="700" persistent transition="dialog-top-transition">
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title>Gestionar las Imagenes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="cerrarDialogoArchivoPanelHotel">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row align="end">
                <v-col lg="6" cols="12">
                  <v-img class="border" :max-width="230" :min-width="230" :height="130" :src="urlImagen"></v-img>
                </v-col>
                <v-col lg="6" cols="12">
                  <input class="custom-file-input" type="file" @change="changePanelUrlHotel">
                </v-col>
              </v-row>

              <v-row>
                <v-col lg="6" cols="12">
                  <v-select v-model="linkImagen" prepend-inner-icon="mdi-link" label="Link de la Imagen (opcional)"
                    variant="underlined" :items="items" single-line hide-details></v-select>
                </v-col>
                <!-- <v-col lg="6" cols="12">
                  <v-text-field class="mt-2" v-model="nombreImagen" density="compact" variant="underlined" label="Nombre Imagen (opcional)"
                    prepend-inner-icon='mdi-image-edit' single-line hide-details></v-text-field>
                </v-col> -->
                <v-col lg="6" cols="12">
                  <v-btn color="primary" class="mt-4" block prepend-icon="mdi-plus"
                    @click="agregarArchivoListaPanelHotel">agregar a la lista</v-btn>
                </v-col>
              </v-row>

              <v-row justify="end">
              </v-row>

              <v-row>
                <v-col v-for="(archivo, index) in panelHotel.archivos" :key="index" class="d-flex child-flex" cols="4">
                  <v-img :src="archivo.url" :lazy-src="archivo.url" aspect-ratio="1" cover class="bg-grey-lighten-2">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                    <div class="d-flex justify-end">
                      <v-icon color="white" @click="eliminarPanelArchivoHotel(archivo)">mdi-close</v-icon>
                      <!-- <v-icon color="white" icon="mdi-close" @click="dialogo_imagenes_hotel"></v-icon> -->
                    </div>
                  </v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="elevated" color="primary" block @click="cerrarDialogoArchivoPanelHotel">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row>
      <v-dialog v-model="dialogo_imagenes_galeria" width="700" persistent transition="dialog-top-transition">
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title>Gestionar la Galeria de Imagenes</v-toolbar-title>
            <v-btn icon @click="cerrarDialogoArchivoGaleriaHotel">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row align="end">
                <v-col lg="6" cols="12">
                  <v-img class="border" :max-width="230" :min-width="230" :height="130" :src="urlImagenGaleria"></v-img>
                </v-col>
                <v-col lg="6" cols="12">
                  <input class="custom-file-input" type="file" @change="changeImagenGaleria">
                </v-col>
              </v-row>

              <v-row>
                <v-col lg="6" cols="12">
                  <v-select v-model="linkImagenGaleria" prepend-inner-icon="mdi-link" label="Link de la Imagen (opcional)"
                    variant="underlined" :items="items" single-line hide-details></v-select>
                </v-col>
                <!-- <v-col lg="6" cols="12">
                  <v-text-field class="mt-2" v-model="nombreImagen" density="compact" variant="underlined" label="Nombre Imagen (opcional)"
                    prepend-inner-icon='mdi-image-edit' single-line hide-details></v-text-field>
                </v-col> -->
                <v-col lg="6" cols="12">
                  <v-btn color="primary" class="mt-4" block prepend-icon="mdi-plus"
                    @click="agregarArchivoListaGaleriaHotel">agregar a la lista</v-btn>
                </v-col>
              </v-row>

              <v-row justify="end">
              </v-row>

              <v-row>
                <v-col v-for="(archivo, index) in panelGaleria.archivos" :key="index" class="d-flex child-flex" cols="4">
                  <v-img :src="archivo.url" :lazy-src="archivo.url" aspect-ratio="1" cover class="bg-grey-lighten-2">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                    <div class="d-flex justify-end">
                      <v-icon color="white" @click="eliminarGaleriaArchivoHotel(archivo)">mdi-close</v-icon>
                      <!-- <v-icon color="white" icon="mdi-close" @click="dialogo_imagenes_hotel"></v-icon> -->
                    </div>
                  </v-img>
                </v-col>
              </v-row>

            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="elevated" color="primary" block @click="cerrarDialogoArchivoGaleriaHotel">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row>
      <v-dialog v-model="dialogo_testimonio_hotel" persistent width="auto">
        <v-toolbar color="primary">
          <v-toolbar-title>Gestionar el Testimonio</v-toolbar-title>
          <v-btn icon @click="cerrarDialogoTestimonioHotel">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-table density="compact">
                    <tbody>
                      <tr>
                        <td><strong>Avantar: </strong></td>
                        <td><v-avatar
                            :image="testimonio.url ? testimonio.url : 'https://cdn4.iconfinder.com/data/icons/social-media-3/512/User_Follower-512.png'"
                            size="70"></v-avatar></td>
                      </tr>

                      <tr>
                        <td><strong>Nombre: </strong></td>
                        <td>{{ testimonio.nombre ? testimonio.nombre : testimonio.nombres }}</td>
                      </tr>
                      <tr>
                        <td><strong>Cargo: </strong></td>
                        <td>{{ testimonio.posicion }}</td>
                      </tr>

                      <tr>
                        <td><strong>Testimonio: </strong></td>
                        <td> {{ testimonio.id_testimonio ? 'Si Tiene' : 'No Tiene' }} <v-icon class="mb-1"
                            :icon="testimonio.id_testimonio ? 'mdi-check' : 'mdi-close'"></v-icon></td>
                      </tr>
                      <tr v-if="testimonio.id_testimonio">
                        <td><strong>Estado</strong></td>
                        <td><v-checkbox v-model="model" :label="model ? 'HABILITAR' : 'DESHABILITAR'" color="primary"
                            hide-details @change="actualizarTestimonio"></v-checkbox></td>
                      </tr>

                      <tr>
                        <td><strong>Titulo: </strong></td>
                        <td>{{ testimonio.titulo }}</td>
                      </tr>
                      <tr>
                        <td><strong>Descripcion: </strong></td>
                        <td width="400">{{ testimonio.descripcion }}</td>
                      </tr>
                      <tr>
                        <td><strong>Valoracion</strong></td>
                        <td><v-rating v-model="testimonio.valoracion" hover readonly></v-rating></td>
                      </tr>

                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" variant="elevated" block @click="cerrarDialogoTestimonioHotel">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row>
      <v-dialog v-model="dialogo_icono_pie" width="500" persistent transition="dialog-top-transition">
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title>Gestionar los Iconos</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="cerrarDialogoIconosPieHotel">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col lg="12" cols="12">
                  <v-text-field ref="detalle" v-model="nombre" density="compact" variant="underlined"
                    label="Detalle Icono" prepend-inner-icon='mdi-pencil' single-line hide-details></v-text-field>
                </v-col>
                <v-col lg="6" cols="12">
                  <v-text-field v-model="icono" density="compact" variant="underlined" label="Nombre Icono"
                    prepend-inner-icon='mdi-pencil' single-line hide-details prefix="mdi-"
                    v-on:keyup.enter="agregarIconoListaPielHotel"></v-text-field>
                </v-col>
                <v-col lg="6" cols="12">
                  <v-btn color="primary" class="mt-2" prepend-icon="mdi-plus" @click="agregarIconoListaPieHotel">agregar a
                    lista</v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-list>
                    <v-list-subheader color="primary" class="text-h6">LISTA DE ICONOS</v-list-subheader>

                    <v-list-item v-for="(item, i) in pie.iconos" :key="i" :value="item" color="primary" rounded="shaped">

                      <template v-slot:prepend>
                        <v-icon :icon="item.tipo"></v-icon>
                      </template>

                      <v-list-item-title v-text="item.nombre"></v-list-item-title>
                      <template v-slot:append>
                        <v-btn color="grey-lighten-1" icon="mdi-close" variant="text"
                          @click="eliminarPielIconoHotel(item)"></v-btn>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="elevated" color="primary" block @click="cerrarDialogoIconosPieHotel">Salir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- servicios -->
    <v-row>
      <v-dialog v-model="dialogo_iconos_hotel_cafeteria" width="500" persistent transition="dialog-top-transition">
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title>Gestionar los Iconos</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="cerrarDialogoIconosPanelHotelCafeteria">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col lg="12" cols="12">
                  <v-text-field ref="detalle" v-model="nombre_cafeteria" density="compact" variant="underlined"
                    label="Detalle Icono" prepend-inner-icon='mdi-pencil' single-line hide-details></v-text-field>
                </v-col>
                <v-col lg="6" cols="12">
                  <v-text-field v-model="icono_cafeteria" density="compact" variant="underlined" label="Nombre Icono"
                    prepend-inner-icon='mdi-pencil' single-line hide-details prefix="mdi-"
                    v-on:keyup.enter="agregarIconoListaPanelHotelCafeteria"></v-text-field>
                </v-col>
                <v-col lg="6" cols="12">
                  <v-btn color="primary" class="mt-2" prepend-icon="mdi-plus"
                    @click="agregarIconoListaPanelHotelCafeteria">agregar
                    a lista</v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-list>
                    <v-list-subheader color="primary" class="text-h6">LISTA DE ICONOS</v-list-subheader>

                    <v-list-item v-for="(item, i) in panelHotelCafeteria.iconos" :key="i" :value="item" color="primary"
                      rounded="shaped">

                      <template v-slot:prepend>
                        <v-icon :icon="item.tipo"></v-icon>
                      </template>

                      <v-list-item-title v-text="item.nombre"></v-list-item-title>
                      <template v-slot:append>
                        <v-btn color="grey-lighten-1" icon="mdi-close" variant="text"
                          @click="eliminarPanelIconoHotelCafeteria(item)"></v-btn>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="elevated" color="primary" block @click="cerrarDialogoIconosPanelHotelCafeteria">Salir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row>
      <v-dialog v-model="dialogo_imagenes_hotel_cafeteria" width="700" persistent transition="dialog-top-transition">
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title>Gestionar las Imagenes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="cerrarDialogoArchivoPanelHotelCafeteria">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row align="end">
                <v-col lg="6" cols="12">
                  <v-img class="border" :max-width="230" :min-width="230" :height="130" :src="urlImagenCafeteria"></v-img>
                </v-col>
                <v-col lg="6" cols="12">
                  <input class="custom-file-input" type="file" @change="changePanelUrlHotelCafeteria">
                </v-col>
              </v-row>

              <v-row>
                <v-col lg="6" cols="12">
                  <v-select v-model="linkImagenCafeteria" prepend-inner-icon="mdi-link"
                    label="Link de la Imagen (opcional)" variant="underlined" :items="items" single-line
                    hide-details></v-select>
                </v-col>
                <!-- <v-col lg="6" cols="12">
                  <v-text-field class="mt-2" v-model="nombreImagen" density="compact" variant="underlined" label="Nombre Imagen (opcional)"
                    prepend-inner-icon='mdi-image-edit' single-line hide-details></v-text-field>
                </v-col> -->
                <v-col lg="6" cols="12">
                  <v-btn color="primary" class="mt-4" block prepend-icon="mdi-plus"
                    @click="agregarArchivoListaPanelHotelCafeteria">agregar a la lista</v-btn>
                </v-col>
              </v-row>

              <v-row justify="end">
              </v-row>

              <v-row>
                <v-col v-for="(archivo, index) in panelHotelCafeteria.archivos" :key="index" class="d-flex child-flex"
                  cols="4">
                  <v-img :src="archivo.url" :lazy-src="archivo.url" aspect-ratio="1" cover class="bg-grey-lighten-2">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                    <div class="d-flex justify-end">
                      <v-icon color="white" @click="eliminarPanelArchivoHotelCafeteria(archivo)">mdi-close</v-icon>
                      <!-- <v-icon color="white" icon="mdi-close" @click="dialogo_imagenes_hotel"></v-icon> -->
                    </div>
                  </v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="elevated" color="primary" block
              @click="cerrarDialogoArchivoPanelHotelCafeteria">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row>
      <v-dialog v-model="dialogo_imagenes_galeria_cafeteria" width="700" persistent transition="dialog-top-transition">
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title>Gestionar la Galeria de Imagenes</v-toolbar-title>
            <v-btn icon @click="cerrarDialogoArchivoGaleriaHotelCafeteria">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row align="end">
                <v-col lg="6" cols="12">
                  <v-img class="border" :max-width="230" :min-width="230" :height="130" :src="urlImagenGaleriaCafeteria"></v-img>
                </v-col>
                <v-col lg="6" cols="12">
                  <input class="custom-file-input" type="file" @change="changeImagenGaleriaCafeteria">
                </v-col>
              </v-row>

              <v-row>
                <v-col lg="6" cols="12">
                  <v-select v-model="linkImagenGaleriaCafeteria" prepend-inner-icon="mdi-link" label="Link de la Imagen (opcional)"
                    variant="underlined" :items="items" single-line hide-details></v-select>
                </v-col>
                <!-- <v-col lg="6" cols="12">
                  <v-text-field class="mt-2" v-model="nombreImagen" density="compact" variant="underlined" label="Nombre Imagen (opcional)"
                    prepend-inner-icon='mdi-image-edit' single-line hide-details></v-text-field>
                </v-col> -->
                <v-col lg="6" cols="12">
                  <v-btn color="primary" class="mt-4" block prepend-icon="mdi-plus"
                    @click="agregarArchivoListaGaleriaHotelCafeteria">agregar a la lista</v-btn>
                </v-col>
              </v-row>

              <v-row justify="end">
              </v-row>

              <v-row>
                <v-col v-for="(archivo, index) in panelGaleriaCafeteria.archivos" :key="index" class="d-flex child-flex" cols="4">
                  <v-img :src="archivo.url" :lazy-src="archivo.url" aspect-ratio="1" cover class="bg-grey-lighten-2">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                    <div class="d-flex justify-end">
                      <v-icon color="white" @click="eliminarGaleriaArchivoHotelCafeteria(archivo)">mdi-close</v-icon>
                      <!-- <v-icon color="white" icon="mdi-close" @click="dialogo_imagenes_hotel"></v-icon> -->
                    </div>
                  </v-img>
                </v-col>
              </v-row>

            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="elevated" color="primary" block @click="cerrarDialogoArchivoGaleriaHotelCafeteria">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>


    <v-row>
      <v-dialog v-model="dialogo_iconos_hotel_salon" width="500" persistent transition="dialog-top-transition">
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title>Gestionar los Iconos</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="cerrarDialogoIconosPanelHotelSalon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col lg="12" cols="12">
                  <v-text-field ref="detalle" v-model="nombre_salon" density="compact" variant="underlined"
                    label="Detalle Icono" prepend-inner-icon='mdi-pencil' single-line hide-details></v-text-field>
                </v-col>
                <v-col lg="6" cols="12">
                  <v-text-field v-model="icono_salon" density="compact" variant="underlined" label="Nombre Icono"
                    prepend-inner-icon='mdi-pencil' single-line hide-details prefix="mdi-"
                    v-on:keyup.enter="agregarIconoListaPanelHotelSalon"></v-text-field>
                </v-col>
                <v-col lg="6" cols="12">
                  <v-btn color="primary" class="mt-2" prepend-icon="mdi-plus"
                    @click="agregarIconoListaPanelHotelSalon">agregar a lista</v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-list>
                    <v-list-subheader color="primary" class="text-h6">LISTA DE ICONOS</v-list-subheader>

                    <v-list-item v-for="(item, i) in panelHotelSalon.iconos" :key="i" :value="item" color="primary"
                      rounded="shaped">

                      <template v-slot:prepend>
                        <v-icon :icon="item.tipo"></v-icon>
                      </template>

                      <v-list-item-title v-text="item.nombre"></v-list-item-title>
                      <template v-slot:append>
                        <v-btn color="grey-lighten-1" icon="mdi-close" variant="text"
                          @click="eliminarPanelIconoHotelSalon(item)"></v-btn>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="elevated" color="primary" block @click="cerrarDialogoIconosPanelHotelSalon">Salir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row>
      <v-dialog v-model="dialogo_imagenes_hotel_salon" width="700" persistent transition="dialog-top-transition">
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title>Gestionar las Imagenes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="cerrarDialogoArchivoPanelHotelSalon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row align="end">
                <v-col lg="6" cols="12">
                  <v-img class="border" :max-width="230" :min-width="230" :height="130" :src="urlImagenSalon"></v-img>
                </v-col>
                <v-col lg="6" cols="12">
                  <input class="custom-file-input" type="file" @change="changePanelUrlHotelSalon">
                </v-col>
              </v-row>

              <v-row>
                <v-col lg="6" cols="12">
                  <v-select v-model="linkImagenSalon" prepend-inner-icon="mdi-link"
                    label="Link de la Imagen (opcional)" variant="underlined" :items="items" single-line
                    hide-details></v-select>
                </v-col>
                <!-- <v-col lg="6" cols="12">
                  <v-text-field class="mt-2" v-model="nombreImagen" density="compact" variant="underlined" label="Nombre Imagen (opcional)"
                    prepend-inner-icon='mdi-image-edit' single-line hide-details></v-text-field>
                </v-col> -->
                <v-col lg="6" cols="12">
                  <v-btn color="primary" class="mt-4" block prepend-icon="mdi-plus"
                    @click="agregarArchivoListaPanelHotelSalon">agregar a la lista</v-btn>
                </v-col>
              </v-row>

              <v-row justify="end">
              </v-row>

              <v-row>
                <v-col v-for="(archivo, index) in panelHotelSalon.archivos" :key="index" class="d-flex child-flex"
                  cols="4">
                  <v-img :src="archivo.url" :lazy-src="archivo.url" aspect-ratio="1" cover class="bg-grey-lighten-2">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                    <div class="d-flex justify-end">
                      <v-icon color="white" @click="eliminarPanelArchivoHotelSalon(archivo)">mdi-close</v-icon>
                      <!-- <v-icon color="white" icon="mdi-close" @click="dialogo_imagenes_hotel"></v-icon> -->
                    </div>
                  </v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="elevated" color="primary" block
              @click="cerrarDialogoArchivoPanelHotelSalon">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row>
      <v-dialog v-model="dialogo_imagenes_galeria_salon" width="700" persistent transition="dialog-top-transition">
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title>Gestionar la Galeria de Imagenes</v-toolbar-title>
            <v-btn icon @click="cerrarDialogoArchivoGaleriaHotelSalon">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row align="end">
                <v-col lg="6" cols="12">
                  <v-img class="border" :max-width="230" :min-width="230" :height="130" :src="urlImagenGaleriaSalon"></v-img>
                </v-col>
                <v-col lg="6" cols="12">
                  <input class="custom-file-input" type="file" @change="changeImagenGaleriaSalon">
                </v-col>
              </v-row>

              <v-row>
                <v-col lg="6" cols="12">
                  <v-select v-model="linkImagenGaleriaSalon" prepend-inner-icon="mdi-link" label="Link de la Imagen (opcional)"
                    variant="underlined" :items="items" single-line hide-details></v-select>
                </v-col>
                <!-- <v-col lg="6" cols="12">
                  <v-text-field class="mt-2" v-model="nombreImagen" density="compact" variant="underlined" label="Nombre Imagen (opcional)"
                    prepend-inner-icon='mdi-image-edit' single-line hide-details></v-text-field>
                </v-col> -->
                <v-col lg="6" cols="12">
                  <v-btn color="primary" class="mt-4" block prepend-icon="mdi-plus"
                    @click="agregarArchivoListaGaleriaHotelSalon">agregar a la lista</v-btn>
                </v-col>
              </v-row>

              <v-row justify="end">
              </v-row>

              <v-row>
                <v-col v-for="(archivo, index) in panelGaleriaSalon.archivos" :key="index" class="d-flex child-flex" cols="4">
                  <v-img :src="archivo.url" :lazy-src="archivo.url" aspect-ratio="1" cover class="bg-grey-lighten-2">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                    <div class="d-flex justify-end">
                      <v-icon color="white" @click="eliminarGaleriaArchivoHotelSalon(archivo)">mdi-close</v-icon>
                      <!-- <v-icon color="white" icon="mdi-close" @click="dialogo_imagenes_hotel"></v-icon> -->
                    </div>
                  </v-img>
                </v-col>
              </v-row>

            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="elevated" color="primary" block @click="cerrarDialogoArchivoGaleriaHotelSalon">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

  </v-container>
</template>

<script>
import Hotel from '../../layouts/Hotel'
import { getMenu } from '@/services/menuService'
import { getPanel, updatePanel } from '@/services/panelService'
import { getGaleria, getArchivosGaleria, updateGaleria } from '@/services/galeriaService'
import { getSeccion, updateSeccion } from '@/services/seccionService'
import { getCuadro } from '@/services/cuadroService'
import { getIconosPanel, saveIconoPanel, deleteIconoPanel } from '@/services/iconoService'
import { getArchivosPanel, saveArchivo, deleteArchivoPanel } from '@/services/archivoService'
import { getTestimonios, getTestimonio, updateTestimonio } from '@/services/testimonioService'
import { findHuespedes } from '@/services/huespedService'
import { getPie, getPieIconos, updatePie } from '@/services/pieService'

export default {
  components: {
    Hotel
  },
  data() {
    return {
      items: [
        { title: 'HOTEL', value: '#', },
      ],
      scrollInvoked: 0,
      menus: [],

      seccionHotel: {},
      urls: ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAU1QTFRFNjtAQEVK////bG9zSk9T/v7+/f39/f3+9vf3O0BETlJWNzxB/Pz8d3t+TFFVzM3O1NXX7u/vUldbRElNs7W3v8HCmZyeRkpPW19j8vLy7u7vvsDC9PT1cHR3Oj9Eo6WnxsjJR0tQOD1Bj5KVgYSHTVFWtri50dLUtLa4YmZqOT5D8vPzRUpOkZOWc3Z64uPjr7Gzuru95+jpX2NnaGxwPkNHp6mrioyPlZeadXh8Q0hNPEBFyszNh4qNc3d6eHx/OD1Cw8XGXGBkfoGEra+xxcbIgoaJu72/m52ggoWIZ2tu8/P0wcLE+vr7kZSXgIOGP0NIvr/BvL6/QUZKP0RJkpWYpKaoqKqtVVldmJqdl5qcZWhstbe5bHB0bnJ1UVVZwsTF5ubnT1RYcHN3oaSm3N3e3NzdQkdLnJ+h9fX1TlNX+Pj47/DwwsPFVFhcEpC44wAAAShJREFUeNq8k0VvxDAQhZOXDS52mRnKzLRlZmZm+v/HxmnUOlFaSz3su4xm/BkGzLn4P+XimOJZyw0FKufelfbfAe89dMmBBdUZ8G1eCJMba69Al+AABOOm/7j0DDGXtQP9bXjYN2tWGQfyA1Yg1kSu95x9GKHiIOBXLcAwUD1JJSBVfUbwGGi2AIvoneK4bCblSS8b0RwwRAPbCHx52kH60K1b9zQUjQKiULbMDbulEjGha/RQQFDE0/ezW8kR3C3kOJXmFcSyrcQR7FDAi55nuGABZkT5hqpk3xughDN7FOHHHd0LLU9qtV7r7uhsuRwt6pEJJFVLN4V5CT+SErpXt81DbHautkpBeHeaqNDRqUA0Uo5GkgXGyI3xDZ/q/wJMsb7/pwADAGqZHDyWkHd1AAAAAElFTkSuQmCC"],
      file: null,
      estado_cuadro: false,
      estado_seccion: true,
      contador: 1,
      titulo: '',
      subtitulo: '',

      panelHotel: {},

      dialogo_iconos_hotel: false,
      nombre: '',
      icono: '',

      dialogo_imagenes_hotel: false,
      nombreImagen: '',
      urlImagen: '',
      linkImagen: null,
      titulo_panel: '',
      subtitulo_panel: '',
      descripcion_panel: '',
      nombre_url_panel: '',
      url_panel: '',

      panelGaleria: {},

      dialogo_imagenes_galeria: false,

      titulo_galeria: '',
      subtitulo_galeria: '',
      descripcion_galeria: '',
      nombre_url_galeria: '',
      url_galeria: '',

      urlImagenGaleria: '',
      linkImagenGaleria: null,

      testimonios: [],
      testimonio: {},

      loaded: false,
      loading: false,
      texto: '',
      model: 'no',
      huespedes: [],

      dialogo_testimonio_hotel: false,

      pie: {},
      url_mapa: '',
      direccion_pie: '',
      telefonos_pie: '',
      lugar_pie: '',

      dialogo_icono_pie: false,


      //seccion de habitaciones
      seccionHabitacion: {},
      titulo_habitacion: '',
      subtitulo_habitacion: '',
      estado_cuadro_habitacion: false,


      //servicios cafeteria y salon
      seccionServicioHotel: {},
      servicio_urls: ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAU1QTFRFNjtAQEVK////bG9zSk9T/v7+/f39/f3+9vf3O0BETlJWNzxB/Pz8d3t+TFFVzM3O1NXX7u/vUldbRElNs7W3v8HCmZyeRkpPW19j8vLy7u7vvsDC9PT1cHR3Oj9Eo6WnxsjJR0tQOD1Bj5KVgYSHTVFWtri50dLUtLa4YmZqOT5D8vPzRUpOkZOWc3Z64uPjr7Gzuru95+jpX2NnaGxwPkNHp6mrioyPlZeadXh8Q0hNPEBFyszNh4qNc3d6eHx/OD1Cw8XGXGBkfoGEra+xxcbIgoaJu72/m52ggoWIZ2tu8/P0wcLE+vr7kZSXgIOGP0NIvr/BvL6/QUZKP0RJkpWYpKaoqKqtVVldmJqdl5qcZWhstbe5bHB0bnJ1UVVZwsTF5ubnT1RYcHN3oaSm3N3e3NzdQkdLnJ+h9fX1TlNX+Pj47/DwwsPFVFhcEpC44wAAAShJREFUeNq8k0VvxDAQhZOXDS52mRnKzLRlZmZm+v/HxmnUOlFaSz3su4xm/BkGzLn4P+XimOJZyw0FKufelfbfAe89dMmBBdUZ8G1eCJMba69Al+AABOOm/7j0DDGXtQP9bXjYN2tWGQfyA1Yg1kSu95x9GKHiIOBXLcAwUD1JJSBVfUbwGGi2AIvoneK4bCblSS8b0RwwRAPbCHx52kH60K1b9zQUjQKiULbMDbulEjGha/RQQFDE0/ezW8kR3C3kOJXmFcSyrcQR7FDAi55nuGABZkT5hqpk3xughDN7FOHHHd0LLU9qtV7r7uhsuRwt6pEJJFVLN4V5CT+SErpXt81DbHautkpBeHeaqNDRqUA0Uo5GkgXGyI3xDZ/q/wJMsb7/pwADAGqZHDyWkHd1AAAAAElFTkSuQmCC"],
      servicio_file: null,
      servicio_estado_cuadro: false,
      servicio_estado_seccion: true,
      servicio_contador: 1,
      servicio_titulo: '',
      servicio_subtitulo: '',

      //panel de cafeteria
      panelHotelCafeteria: {},

      dialogo_iconos_hotel_cafeteria: false,
      nombre_cafeteria: '',
      icono_cafeteria: '',

      dialogo_imagenes_hotel_cafeteria: false,
      nombreImagenCafeteria: '',
      urlImagenCafeteria: '',
      linkImagenCafeteria: null,
      titulo_panel_cafeteria: '',
      subtitulo_panel_cafeteria: '',
      descripcion_panel_cafeteria: '',
      nombre_url_panel_cafeteria: '',
      url_panel_cafeteria: '',

      //galeria de fotos cafeteria
      panelGaleriaCafeteria: {},

      dialogo_imagenes_galeria_cafeteria: false,

      titulo_galeria_cafeteria: '',
      subtitulo_galeria_cafeteria: '',
      descripcion_galeria_cafeteria: '',
      nombre_url_galeria_cafeteria: '',
      url_galeria_cafeteria: '',

      urlImagenGaleriaCafeteria: '',
      linkImagenGaleriaCafeteria: null,

      //panel del Salon Eventos
      panelHotelSalon: {},

      dialogo_iconos_hotel_salon: false,
      nombre_salon: '',
      icono_salon: '',

      dialogo_imagenes_hotel_salon: false,
      nombreImagenSalon: '',
      urlImagenSalon: '',
      linkImagenSalon: null,
      titulo_panel_salon: '',
      subtitulo_panel_salon: '',
      descripcion_panel_salon: '',
      nombre_url_panel_salon: '',
      url_panel_salon: '',

      //galeria de fotos del Salon Eventos
      panelGaleriaSalon: {},

      dialogo_imagenes_galeria_salon: false,

      titulo_galeria_salon: '',
      subtitulo_galeria_salon: '',
      descripcion_galeria_salon: '',
      nombre_url_galeria_salon: '',
      url_galeria_salon: '',

      urlImagenGaleriaSalon: '',
      linkImagenGaleriaSalon: null,
    }
  },
  methods: {
    onScroll() {
      this.scrollInvoked++
    },
    onClick() {
      this.loading = true

      setTimeout(async () => {
        this.loading = false
        this.loaded = true
        if (this.texto) {
          let res = await findHuespedes(this.texto, 1)
          if (res.status == 201 && res.data.data.length > 0) {
            this.huespedes = res.data.data
          }
        } else {
          let res = await findHuespedes(' ', 0)
          if (res.status == 201 && res.data.data.length > 0) {
            this.huespedes = res.data.data
          }
        }
      }, 1000)
    },
    async obtenerMenu() {
      try {
        let res = await getMenu()
        if (res.status == 201 && res.data.data.length > 0) {
          this.menus = res.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },


    async obtenerSeccionHotel() {
      try {
        this.menus.forEach(async item => {
          switch (item.numero_menu) {
            case 1:
              let res = await getSeccion(item.numero_menu)
              if (res.status == 201 && res.data.data.length > 0) {
                this.seccionHotel = res.data.data[0]
                this.titulo = this.seccionHotel.titulo
                this.subtitulo = this.seccionHotel.subtitulo
                this.estado_cuadro = this.seccionHotel.estado_cuadro == 1 ? true : false
                this.obtenerPanelHotel()
                this.obtenerGaleriaPanelHotel()
                this.obtenerTestimoniosHotel()
                this.obtenerHuespedesHotel()
                this.obtenerPieHotel()
              }
              break;
            case 2:
              let res2 = await getSeccion(item.numero_menu)
              if(res2.status == 201 && res2.data.data.length > 0){
                this.seccionHabitacion = res2.data.data[0]                
                this.titulo_habitacion = this.seccionHabitacion.titulo
                this.subtitulo_habitacion = this.seccionHabitacion.subtitulo
                this.estado_cuadro_habitacion = this.seccionHabitacion.estado_cuadro == 1 ? true : false
              }
            break;
            case 3:
              let res3 = await getSeccion(item.numero_menu)
              if (res3.status == 201 && res3.data.data.length > 0) {
                this.seccionServicioHotel = res3.data.data[0]
                this.servicio_titulo = this.seccionServicioHotel.titulo
                this.servicio_subtitulo = this.seccionServicioHotel.subtitulo
                this.servicio_estado_cuadro = this.seccionServicioHotel.estado_cuadro == 1 ? true : false
                this.obtenerPanelHotelCafeteria()
                this.obtenerGaleriaPanelHotelCafeteria()
                this.obtenerPanelHotelSalon()
                this.obtenerGaleriaPanelHotelSalon()
              }
              break;
          }
        });
        this.contador++
      } catch (error) {
        console.log(error)
      }
    },
    async actualizarSeccion() {
      try {
        let res = await updateSeccion(this.seccionHotel)
        if (res.status == 200) {
          this.obtenerSeccionHotel()
        }
      } catch (error) {
        console.log(error)
      }
    },
    changeUrl(event) {      
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.seccionHotel.url = fileData
          this.actualizarSeccion()
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },
    abrirSeccion() {
      this.$nextTick(() => {
        this.$refs.titulo.focus()
        this.$refs.titulo.select()
        this.contador = 1
      })
    },
    changePanelParalax(event) {
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.seccionHotel.url = fileData
          this.actualizarSeccion()
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },
    changeParalax(event) {
      console.log(event)
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.seccionHotel.paralax = fileData
          this.actualizarSeccion()
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },
    cambiarEstadoReservas() {
      this.estado_cuadro == 1 ? true : false      
      this.seccionHotel.estado_cuadro = this.estado_cuadro ? 1 : 0
      this.actualizarSeccion()
    },

    async obtenerPanelHotel() {
      try {
        let res = await getPanel(this.seccionHotel.numero_seccion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.panelHotel = res.data.data[0]
          this.titulo_panel = this.panelHotel.titulo
          this.subtitulo_panel = this.panelHotel.subtitulo
          this.descripcion_panel = this.panelHotel.descripcion
          this.nombre_url_panel = this.panelHotel.nombre_url
          this.url_panel = this.panelHotel.url_panel

          if (this.panelHotel.numero_cuadro > 0) {
            let res1 = await getCuadro(this.panelHotel.numero_cuadro)
            if (res1.status == 201 && res1.data.data.length > 0) {
              this.panelHotel.cuadro = res1.data.data[0]
            }
          }
          if (this.panelHotel.id_panel > 0) {
            let res2 = await getIconosPanel(this.panelHotel.id_panel)
            if (res2.status == 201 && res2.data.data.length > 0) {
              this.panelHotel.iconos = res2.data.data
              let res3 = await getArchivosPanel(this.panelHotel.id_panel)
              if (res3.status == 201 && res3.data.data.length > 0) {
                this.panelHotel.archivos = res3.data.data
              }
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async actualizarPanelHotel() {
      try {
        let res = await updatePanel(this.panelHotel)
        if (res.status == 200) {
          this.obtenerSeccionHotel()
        }
      } catch (error) {
        console.log(error)
      }
    },
    abrirPanelIconos() {
      this.dialogo_iconos_hotel = true
      this.$nextTick(() => {
        this.$refs.detalle.focus()
        this.$refs.detalle.select()
      })
    },
    async eliminarPanelIconoHotel(item) {
      try {
        let res = await deleteIconoPanel(this.panelHotel.id_panel, item.id_icono, 0)
        if (res.status == 201) {
          this.$nextTick(() => this.$refs.detalle.focus())
          this.obtenerPanelHotel()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async agregarIconoListaPanelHotel() {
      try {
        if (this.nombre && this.icono != '') {
          let res = await saveIconoPanel({
            nombre: this.nombre,
            tipo: 'mdi-' + this.icono,
            id_panel: this.panelHotel.id_panel,
            id_pie: 0,
          })
          if (res.status == 200) {
            this.nombre = ''
            this.icono = ''
            this.obtenerPanelHotel()
          }
        }
        this.$nextTick(() => {
          this.$refs.detalle.select()
          this.$refs.detalle.focus()
        })
      } catch (error) {
        console.log(error)
      }
    },
    cerrarDialogoIconosPanelHotel() {
      this.dialogo_iconos_hotel = false
      this.obtenerSeccionHotel()
    },


    abrirPanelArchivos() {
      this.dialogo_imagenes_hotel = true
      this.urlImagen = ''
      this.linkImagen = null
    },
    async eliminarPanelArchivoHotel(archivo) {
      try {
        let res = await deleteArchivoPanel(this.panelHotel.id_panel, archivo.id_archivo, 0)
        if (res.status == 201) {
          this.urlImagen = ''
          this.linkImagen = null
          this.obtenerPanelHotel()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async agregarArchivoListaPanelHotel() {
      try {
        if (this.urlImagen) {
          let res = await saveArchivo({
            nombre: '',
            url: this.urlImagen,
            link: this.linkImagen == null ? '' : '',
            id_panel: this.panelHotel.id_panel,
            id_galeria: 0,
          })
          if (res.status == 200) {
            this.urlImagen = ''
            this.linkImagen = null
            this.obtenerPanelHotel()
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    cerrarDialogoArchivoPanelHotel() {
      this.dialogo_imagenes_hotel = false
      this.urlImagen = ''
      this.linkImagen = null
      this.obtenerSeccionHotel()
    },
    changePanelUrlHotel(event) {
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.urlImagen = fileData
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },
    changePanelParalaxHotel(event) {
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.panelHotel.paralax = fileData
          this.actualizarPanelHotel()
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },


    async obtenerGaleriaPanelHotel() {
      try {
        let res = await getGaleria(this.seccionHotel.numero_seccion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.panelGaleria = res.data.data[0]
          this.titulo_galeria = this.panelGaleria.titulo
          this.subtitulo_galeria = this.panelGaleria.subtitulo
          this.descripcion_gatitulo_galeria = this.panelGaleria.descripcion
          this.nombre_url_gatitulo_galeria = this.panelGaleria.nombre_url
          this.url_gatitulo_galeria = this.panelGaleria.url_panel
          if (this.panelGaleria.numero_galeria > 0) {
            let res2 = await getArchivosGaleria(this.panelGaleria.id_galeria)
            if (res2.status == 201 && res2.data.data.length > 0) {
              this.panelGaleria.archivos = res2.data.data
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    abrirGaleriaPanelHotel() {
      this.dialogo_imagenes_galeria = true
    },
    changeImagenGaleria() {
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.urlImagenGaleria = fileData
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },
    async agregarArchivoListaGaleriaHotel() {
      try {
        if (this.urlImagenGaleria) {
          let res = await saveArchivo({
            nombre: '',
            url: this.urlImagenGaleria,
            link: this.linkImagenGaleria == null ? '' : '',
            id_panel: 0,
            id_galeria: this.panelGaleria.id_galeria
          })
          if (res.status == 200) {
            this.urlImagenGaleria = ''
            this.linkImagenGaleria = null
            this.obtenerGaleriaPanelHotel()
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async eliminarGaleriaArchivoHotel(archivo) {
      try {
        let res = await deleteArchivoPanel(0, archivo.id_archivo, this.panelGaleria.id_galeria)
        if (res.status == 201) {
          this.urlImagenGaleria = ''
          this.linkImagenGaleria = null
          this.obtenerGaleriaPanelHotel()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async actualizarGaleriaHotel() {
      try {
        let res = await updateGaleria(this.panelGaleria)
        if (res.status == 200) {
          this.obtenerSeccionHotel()
        }
      } catch (error) {
        console.log(error)
      }
    },
    cerrarDialogoArchivoGaleriaHotel() {
      this.dialogo_imagenes_galeria = false
      this.urlImagenGaleria = ''
      this.linkImagenGaleria = null
      this.obtenerSeccionHotel()
    },

    async obtenerTestimoniosHotel() {
      try {
        let res = await getTestimonios(this.seccionHotel.numero_seccion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.testimonios = res.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async obtenerHuespedesHotel() {
      try {
        let res = await findHuespedes(' ', 0)
        if (res.status == 201 && res.data.data.length > 0) {
          this.huespedes = res.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async mostrarTestimonio(huesped) {
      try {
        this.testimonio = null
        let res = await getTestimonio(huesped.id_huesped)
        if (res.status = 201 && res.data.data.length > 0) {
          this.testimonio = res.data.data[0]
          this.testimonio.estado_testimonio == 1 ? this.model = true : this.model = false
        } else {
          this.model = false
          this.testimonio = huesped
        }
        this.dialogo_testimonio_hotel = true
      } catch (error) {
        console.log(error)
      }
    },
    async actualizarTestimonio() {
      try {
        this.testimonio.estado_testimonio = this.model ? 1 : 0
        let res = await updateTestimonio(this.testimonio)
        if (res.status == 200) {
          this.obtenerHuespedesHotel()
        }
      } catch (error) {
        console.log(error)
      }
    },
    abrirTestimonios() {
      this.$nextTick(() => {
        this.$refs.buscar.focus()
        this.$refs.buscar.select()
      })
    },
    cerrarDialogoTestimonioHotel() {
      this.dialogo_testimonio_hotel = false
      this.obtenerSeccionHotel()
    },

    async obtenerPieHotel() {
      try {
        let res = await getPie(this.seccionHotel.numero_seccion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.pie = res.data.data[0]
          if (this.pie.id_pie > 0) {
            let res1 = await getPieIconos(this.pie.id_pie)
            if (res1.status == 201 && res1.data.data.length > 0) {
              this.pie.iconos = res1.data.data
            }
          }

          this.url_mapa = this.pie.url_mapa
          this.direccion_pie = this.pie.direccion
          this.telefonos_pie = this.pie.telefonos
          this.lugar_pie = this.pie.lugar
        }
      } catch (error) {
        console.log(error)
      }
    },
    async agregarIconoListaPieHotel() {
      try {
        if (this.nombre && this.icono != '') {
          let res = await saveIconoPanel({
            nombre: this.nombre,
            tipo: 'mdi-' + this.icono,
            id_panel: 0,
            id_pie: this.pie.id_pie
          })
          if (res.status == 200) {
            this.nombre = ''
            this.icono = ''
            this.obtenerPieHotel()
          }
        }
        this.$nextTick(() => {
          this.$refs.detalle.select()
          this.$refs.detalle.focus()
        })
      } catch (error) {
        console.log(error)
      }
    },
    async actualizarPieHotel() {
      try {
        let res = await updatePie(this.pie)
        if (res.status == 200) {
          this.obtenerSeccionHotel()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async eliminarPielIconoHotel(item) {
      try {
        let res = await deleteIconoPanel(0, item.id_icono, this.pie.id_pie)
        if (res.status == 201) {
          this.$nextTick(() => this.$refs.detalle.focus())
          this.obtenerPieHotel()
        }
      } catch (error) {
        console.log(error)
      }
    },
    abrirPieHotel() {
      this.dialogo_icono_pie = true
      this.$nextTick(() => {
        this.$refs.detalle.focus()
        this.$refs.detalle.select()
      })
    },
    cerrarDialogoIconosPieHotel() {
      this.dialogo_icono_pie = false
      this.obtenerSeccionHotel()
    },


    //habitaciones    
    cambiarEstadoReservasHabitaciones() {
      this.estado_cuadro_habitacion == 1 ? true : false      
      this.seccionHabitacion.estado_cuadro = this.estado_cuadro_habitacion ? 1 : 0
      this.actualizarSeccionHabitacion()
    },
    changeUrlHabitacion(event) {      
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.seccionHabitacion.url = fileData
          this.actualizarSeccionHabitacion()
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },
    changeParalaxHabitacion(event) {      
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.seccionHabitacion.paralax = fileData
          this.actualizarSeccionHabitacion()
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },
    async actualizarSeccionHabitacion(){
      try {
        let res = await updateSeccion(this.seccionHabitacion)
        if (res.status == 200) {
          this.obtenerSeccionHotel()
        }
      } catch (error) {
        console.log(error)
      }
    },

    //servicios
    changeUrlServicio(event) {
      console.log(event)
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.seccionServicioHotel.url = fileData
          this.actualizarSeccionServicio()
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },
    changeParalaxServicio(event) {
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.seccionServicioHotel.paralax = fileData
          this.actualizarSeccionServicio()
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },
    cambiarEstadoReservasServicios() {
      this.servicio_estado_cuadro == 1 ? true : false
      this.seccionServicioHotel.estado_cuadro = this.servicio_estado_cuadro ? 1 : 0
      this.actualizarSeccionServicio()
    },
    async actualizarSeccionServicio() {
      try {
        let res = await updateSeccion(this.seccionServicioHotel)
        if (res.status == 200) {
          this.obtenerSeccionHotel()
        }
      } catch (error) {
        console.log(error)
      }
    },

    //panel cafeteria
    async obtenerPanelHotelCafeteria() {
      try {
        let res = await getPanel(this.seccionServicioHotel.numero_seccion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.panelHotelCafeteria = res.data.data[0]
          this.titulo_panel_cafeteria = this.panelHotelCafeteria.titulo
          this.subtitulo_panel_cafeteria = this.panelHotelCafeteria.subtitulo
          this.descripcion_panel_cafeteria = this.panelHotelCafeteria.descripcion
          this.nombre_url_panel_cafeteria = this.panelHotelCafeteria.nombre_url
          this.url_panel_cafeteria = this.panelHotelCafeteria.url_panel

          if (this.panelHotelCafeteria.numero_cuadro > 0) {
            let res1 = await getCuadro(this.panelHotelCafeteria.numero_cuadro)
            if (res1.status == 201 && res1.data.data.length > 0) {
              this.panelHotelCafeteria.cuadro = res1.data.data[0]
            }
          }
          if (this.panelHotelCafeteria.id_panel > 0) {
            let res2 = await getIconosPanel(this.panelHotelCafeteria.id_panel)
            if (res2.status == 201 && res2.data.data.length > 0) {
              this.panelHotelCafeteria.iconos = res2.data.data
              let res3 = await getArchivosPanel(this.panelHotelCafeteria.id_panel)
              if (res3.status == 201 && res3.data.data.length > 0) {
                this.panelHotelCafeteria.archivos = res3.data.data
              }
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

    async actualizarPanelHotelCafeteria() {
      try {
        let res = await updatePanel(this.panelHotelCafeteria)
        if (res.status == 200) {
          this.obtenerSeccionHotel()
        }
      } catch (error) {
        console.log(error)
      }
    },
    abrirPanelIconosCafeteria() {
      this.dialogo_iconos_hotel_cafeteria = true
      this.$nextTick(() => {
        this.$refs.detalle.focus()
        this.$refs.detalle.select()
      })
    },
    cerrarDialogoIconosPanelHotelCafeteria() {
      this.dialogo_iconos_hotel_cafeteria = false
      this.obtenerSeccionHotel()
    },
    async agregarIconoListaPanelHotelCafeteria() {
      try {
        if (this.nombre_cafeteria && this.icono_cafeteria != '') {
          let res = await saveIconoPanel({
            nombre: this.nombre_cafeteria,
            tipo: 'mdi-' + this.icono_cafeteria,
            id_panel: this.panelHotelCafeteria.id_panel,
            id_pie: 0,
          })
          if (res.status == 200) {
            this.nombre_cafeteria = ''
            this.icono_cafeteria = ''
            this.obtenerPanelHotelCafeteria()
          }
        }
        this.$nextTick(() => {
          this.$refs.detalle.select()
          this.$refs.detalle.focus()
        })
      } catch (error) {
        console.log(error)
      }
    },
    async eliminarPanelIconoHotelCafeteria(item) {
      try {
        let res = await deleteIconoPanel(this.panelHotelCafeteria.id_panel, item.id_icono, 0)
        if (res.status == 201) {
          this.$nextTick(() => this.$refs.detalle.focus())
          this.obtenerPanelHotelCafeteria()
        }
      } catch (error) {
        console.log(error)
      }
    },

    async eliminarPanelArchivoHotelCafeteria(archivo) {
      try {
        let res = await deleteArchivoPanel(this.panelHotelCafeteria.id_panel, archivo.id_archivo, 0)
        if (res.status == 201) {
          this.urlImagenCafeteria = ''
          this.linkImagenCafeteria = null
          this.obtenerPanelHotelCafeteria()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async agregarArchivoListaPanelHotelCafeteria() {
      try {
        if (this.urlImagenCafeteria) {
          let res = await saveArchivo({
            nombre: '',
            url: this.urlImagenCafeteria,
            link: this.linkImagenCafeteria == null ? '' : '',
            id_panel: this.panelHotelCafeteria.id_panel,
            id_galeria: 0,
          })
          if (res.status == 200) {
            this.urlImagenCafeteria = ''
            this.linkImagenCafeteria = null
            this.obtenerPanelHotelCafeteria()
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    abrirPanelArchivosCafeteria() {
      this.dialogo_imagenes_hotel_cafeteria = true
      this.urlImagenCafeteria = ''
      this.linkImagenCafeteria = null
    },
    cerrarDialogoArchivoPanelHotelCafeteria() {
      this.dialogo_imagenes_hotel_cafeteria = false
      this.urlImagenCafeteria = ''
      this.linkImagenCafeteria = null
      this.obtenerSeccionHotel()
    },
    changePanelUrlHotelCafeteria(event) {
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.urlImagenCafeteria = fileData
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },
    changePanelParalaxHotelCafeteria(event) {
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.panelHotelCafeteria.paralax = fileData
          this.actualizarPanelHotelCafeteria()
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },

    //galeria cafeteria
    async obtenerGaleriaPanelHotelCafeteria() {
      try {
        let res = await getGaleria(this.seccionServicioHotel.numero_seccion)
        if (res.status == 201 && res.data.data.length > 0) {
          console.log('el salon es: ', res)
          this.panelGaleriaCafeteria = res.data.data[0]
          this.titulo_galeria_cafeteria = this.panelGaleriaCafeteria.titulo
          this.subtitulo_galeria_cafeteria = this.panelGaleriaCafeteria.subtitulo
          this.descripcion_gatitulo_galeria_cafeteria = this.panelGaleriaCafeteria.descripcion
          this.nombre_url_gatitulo_galeria_cafeteria = this.panelGaleriaCafeteria.nombre_url
          this.url_gatitulo_galeria_cafeteria = this.panelGaleriaCafeteria.url_panel
          if (this.panelGaleriaCafeteria.numero_galeria > 0) {
            let res2 = await getArchivosGaleria(this.panelGaleriaCafeteria.id_galeria)
            if (res2.status == 201 && res2.data.data.length > 0) {
              this.panelGaleriaCafeteria.archivos = res2.data.data
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    abrirGaleriaPanelHotelCafeteria() {
      this.dialogo_imagenes_galeria_cafeteria = true
    },
    changeImagenGaleriaCafeteria() {
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.urlImagenGaleriaCafeteria = fileData
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },
    async agregarArchivoListaGaleriaHotelCafeteria() {
      try {
        if (this.urlImagenGaleriaCafeteria) {
          let res = await saveArchivo({
            nombre: '',
            url: this.urlImagenGaleriaCafeteria,
            link: this.linkImagenGaleriaCafeteria == null ? '' : '',
            id_panel: 0,
            id_galeria: this.panelGaleriaCafeteria.id_galeria
          })
          if (res.status == 200) {
            this.urlImagenGaleriaCafeteria = ''
            this.linkImagenGaleriaCafeteria = null
            this.obtenerGaleriaPanelHotelCafeteria()
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async eliminarGaleriaArchivoHotelCafeteria(archivo) {
      try {
        let res = await deleteArchivoPanel(0, archivo.id_archivo, this.panelGaleriaCafeteria.id_galeria)
        if (res.status == 201) {
          this.urlImagenGaleriaCafeteria = ''
          this.linkImagenGaleriaCafeteria = null
          this.obtenerGaleriaPanelHotelCafeteria()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async actualizarGaleriaHotelCafeteria() {
      try {
        let res = await updateGaleria(this.panelGaleriaCafeteria)
        if (res.status == 200) {
          this.obtenerSeccionHotel()
        }
      } catch (error) {
        console.log(error)
      }
    },
    cerrarDialogoArchivoGaleriaHotelCafeteria() {
      this.dialogo_imagenes_galeria_cafeteria = false
      this.urlImagenGaleriaCafeteria = ''
      this.linkImagenGaleriaCafeteria = null
      this.obtenerSeccionHotel()
    },


    //panel salon
    async obtenerPanelHotelSalon() {
      try {
        let res = await getPanel(this.seccionServicioHotel.numero_seccion)
        if (res.status == 201 && res.data.data.length > 0) {
          this.panelHotelSalon = res.data.data[1]
          this.titulo_panel_salon = this.panelHotelSalon.titulo
          this.subtitulo_panel_salon = this.panelHotelSalon.subtitulo
          this.descripcion_panel_salon = this.panelHotelSalon.descripcion
          this.nombre_url_panel_salon = this.panelHotelSalon.nombre_url
          this.url_panel_salon = this.panelHotelSalon.url_panel

          if (this.panelHotelSalon.numero_cuadro > 0) {
            let res1 = await getCuadro(this.panelHotelSalon.numero_cuadro)
            if (res1.status == 201 && res1.data.data.length > 0) {
              this.panelHotelSalon.cuadro = res1.data.data[0]
            }
          }
          if (this.panelHotelSalon.id_panel > 0) {
            let res2 = await getIconosPanel(this.panelHotelSalon.id_panel)
            if (res2.status == 201 && res2.data.data.length > 0) {
              this.panelHotelSalon.iconos = res2.data.data
              let res3 = await getArchivosPanel(this.panelHotelSalon.id_panel)
              if (res3.status == 201 && res3.data.data.length > 0) {
                this.panelHotelSalon.archivos = res3.data.data
              }
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

    async actualizarPanelHotelSalon() {
      try {
        let res = await updatePanel(this.panelHotelSalon)
        if (res.status == 200) {
          this.obtenerSeccionHotel()
        }
      } catch (error) {
        console.log(error)
      }
    },
    abrirPanelIconosSalon() {
      this.dialogo_iconos_hotel_salon = true
      this.$nextTick(() => {
        this.$refs.detalle.focus()
        this.$refs.detalle.select()
      })
    },
    cerrarDialogoIconosPanelHotelSalon() {
      this.dialogo_iconos_hotel_salon = false
      this.obtenerSeccionHotel()
    },
    async agregarIconoListaPanelHotelSalon() {
      try {
        if (this.nombre_salon && this.icono_salon != '') {
          let res = await saveIconoPanel({
            nombre: this.nombre_salon,
            tipo: 'mdi-' + this.icono_salon,
            id_panel: this.panelHotelSalon.id_panel,
            id_pie: 0,
          })
          if (res.status == 200) {
            this.nombre_salon = ''
            this.icono_salon = ''
            this.obtenerPanelHotelSalon()
          }
        }
        this.$nextTick(() => {
          this.$refs.detalle.select()
          this.$refs.detalle.focus()
        })
      } catch (error) {
        console.log(error)
      }
    },
    async eliminarPanelIconoHotelSalon(item) {
      try {
        let res = await deleteIconoPanel(this.panelHotelSalon.id_panel, item.id_icono, 0)
        if (res.status == 201) {
          this.$nextTick(() => this.$refs.detalle.focus())
          this.obtenerPanelHotelSalon()
        }
      } catch (error) {
        console.log(error)
      }
    },

    async eliminarPanelArchivoHotelSalon(archivo) {
      try {
        let res = await deleteArchivoPanel(this.panelHotelSalon.id_panel, archivo.id_archivo, 0)
        if (res.status == 201) {
          this.urlImagenSalon = ''
          this.linkImagenSalon = null
          this.obtenerPanelHotelSalon()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async agregarArchivoListaPanelHotelSalon() {
      try {
        if (this.urlImagenSalon) {
          let res = await saveArchivo({
            nombre: '',
            url: this.urlImagenSalon,
            link: this.linkImagenSalon == null ? '' : '',
            id_panel: this.panelHotelSalon.id_panel,
            id_galeria: 0,
          })
          if (res.status == 200) {
            this.urlImagenSalon = ''
            this.linkImagenSalon = null
            this.obtenerPanelHotelSalon()
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    abrirPanelArchivosSalon() {
      this.dialogo_imagenes_hotel_salon = true
      this.urlImagenSalon = ''
      this.linkImagenSalon = null
    },
    cerrarDialogoArchivoPanelHotelSalon() {
      this.dialogo_imagenes_hotel_salon = false
      this.urlImagenSalon = ''
      this.linkImagenSalon = null
      this.obtenerSeccionHotel()
    },
    changePanelUrlHotelSalon(event) {
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.urlImagenSalon = fileData
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },
    changePanelParalaxHotelSalon(event) {
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.panelHotelSalon.paralax = fileData
          this.actualizarPanelHotelSalon()
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },

    //galeria Salon
    async obtenerGaleriaPanelHotelSalon() {
      try {
        let res = await getGaleria(this.seccionServicioHotel.numero_seccion)
        if (res.status == 201 && res.data.data.length > 0) {          
          this.panelGaleriaSalon = res.data.data[1]
          this.titulo_galeria_salon = this.panelGaleriaSalon.titulo
          this.subtitulo_galeria_salon = this.panelGaleriaSalon.subtitulo
          this.descripcion_gatitulo_galeria_salon = this.panelGaleriaSalon.descripcion
          this.nombre_url_gatitulo_galeria_salon = this.panelGaleriaSalon.nombre_url
          this.url_gatitulo_galeria_salon = this.panelGaleriaSalon.url_panel
          if (this.panelGaleriaSalon.numero_galeria > 0) {
            let res2 = await getArchivosGaleria(this.panelGaleriaSalon.id_galeria)
            if (res2.status == 201 && res2.data.data.length > 0) {
              this.panelGaleriaSalon.archivos = res2.data.data
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    abrirGaleriaPanelHotelSalon() {
      this.dialogo_imagenes_galeria_salon = true
    },
    changeImagenGaleriaSalon() {
      this.file = event.target.files[0]
      try {
        let reader = new FileReader()
        reader.onloadend = () => {
          let fileData = reader.result
          this.urlImagenGaleriaSalon = fileData
        }
        reader.readAsDataURL(this.file)
      } catch (error) {
        console.log(error)
      }
    },
    async agregarArchivoListaGaleriaHotelSalon() {
      try {
        if (this.urlImagenGaleriaSalon) {
          let res = await saveArchivo({
            nombre: '',
            url: this.urlImagenGaleriaSalon,
            link: this.linkImagenGaleriaSalon == null ? '' : '',
            id_panel: 0,
            id_galeria: this.panelGaleriaSalon.id_galeria
          })
          if (res.status == 200) {
            this.urlImagenGaleriaSalon = ''
            this.linkImagenGaleriaSalon = null
            this.obtenerGaleriaPanelHotelSalon()
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async eliminarGaleriaArchivoHotelSalon(archivo) {
      try {
        let res = await deleteArchivoPanel(0, archivo.id_archivo, this.panelGaleriaSalon.id_galeria)
        if (res.status == 201) {
          this.urlImagenGaleriaSalon = ''
          this.linkImagenGaleriaSalon = null
          this.obtenerGaleriaPanelHotelSalon()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async actualizarGaleriaHotelSalon() {
      try {
        let res = await updateGaleria(this.panelGaleriaSalon)
        if (res.status == 200) {
          this.obtenerSeccionHotel()
        }
      } catch (error) {
        console.log(error)
      }
    },
    cerrarDialogoArchivoGaleriaHotelSalon() {
      this.dialogo_imagenes_galeria_salon = false
      this.urlImagenGaleriaSalon = ''
      this.linkImagenGaleriaSalon = null
      this.obtenerSeccionHotel()
    },
  },

  computed: {
    //require(`http://62.72.31.141/products/${this.producto.imagen}`)    
    obtenerImagen: function () {
      return this.seccionHotel.url ? this.seccionHotel.url : 'https://www.livingspaces.com/globalassets/images/inspiration/rooms/living/boho-living-room-with-reid-grey-sofa_1.jpg?w=580&h=440&mode=pad'
    }
  },
  mounted() {
    this.obtenerMenu().then(() => this.obtenerSeccionHotel())
  }
}
</script>

<style scoped>
.custom-file-input {
  color: transparent;
  max-width: 10rem;
  max-height: 3rem;
}

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}

.custom-file-input::before {
  content: 'cambiar imagen';
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 100%;
  font-weight: 300;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 3px;
  margin: 0;
  size: .4rem;
  background-color: #585030;
  transition: all 0.3s linear;
  cursor: pointer;
}

.custom-file-input:hover::before {
  background-color: #EAE6D7;
  /* #1e3552; */
  color: #585030;
}

.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
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
}</style>