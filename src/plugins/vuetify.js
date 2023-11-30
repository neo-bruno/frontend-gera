/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// calendario
import { VDatePicker } from 'vuetify/labs/VDatePicker'

import 'vuetify/styles'
import '@/styles/main.scss'


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDatePicker,
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#585030',
          secondary: '#EAE6D7',
        },
      },
    },
  },
})