// Composables
import { createRouter, createWebHistory } from 'vue-router'

import Hotel from '@/layouts/Hotel'

import Administrador from '@/views/administracion/Administrador'

import Pagina from '@/views/paginaWeb/Pagina'

import Habitaciones from '@/views/habitaciones/Habitaciones'
import NuevaHabitacion from '@/views/habitaciones/NuevaHabitacion'
import Habitacion from '@/views/habitaciones/Habitacion'

import Reservas from '@/views/reservas/Reservas'
import ReservaSimple from '@/views/reservas/ReservaSimple'

import Huesped from '@/views/huespedes/Huesped'

function authGuard(to, from, next) {
  try {
    const authToken = JSON.parse(localStorage.getItem('token'))
    if (authToken) {
      next()
    } else {
      next({ name: 'hotel' })
    }
  } catch (error) {
    localStorage.clear()
    next({ name: 'hotel' })
  }
}

const routes = [
  {
    path: '/',
    name: 'hotel',
    component: Hotel,    
  },
  {
    path: '/habitacion/:id_habitacion',
    name: 'habitacion',
    component: Habitacion,
    // beforeEnter: authGuard, meta: { requireAuth: true },
  },

  {
    path: '/admin',
    name: 'admin',
    component: Administrador,
    beforeEnter: authGuard, meta: { requireAuth: true },
  },
  {
    path: '/pagina',
    name: 'pagina',
    component: Pagina,
    beforeEnter: authGuard, meta: { requireAuth: true },
  },
  {
    path: '/habitaciones',
    name: 'habitaciones',
    component: Habitaciones,
    beforeEnter: authGuard, meta: { requireAuth: true },
  },
  {
    path: '/habitaciones/nuevaH',
    name: 'NuevaHabitacion',
    component: NuevaHabitacion,
    beforeEnter: authGuard, meta: { requireAuth: true },
  },

  {
    path: '/reservas',
    name: 'reservas',
    component: Reservas,
    beforeEnter: authGuard, meta: { requireAuth: true },
  },
  {
    path: '/reservas/simple',
    name: 'reserva_simple',
    component: ReservaSimple,    
  },

  {
    path: '/huesped',
    name: 'huesped',
    component: Huesped,
    beforeEnter: authGuard, meta: { requireAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
