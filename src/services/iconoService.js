import { http } from "./httpService.js"

export function getIconosPanel(id_panel) {
  return http().get(`/api/1.0/icono/panel/${id_panel}`)
}
export function saveIconoPanel(data){
  return http().post('/api/1.0/icono', data)
}
export function deleteIconoPanel(id_panel, id_icono, id_pie){
  return http().delete(`/api/1.0/icono/${id_panel}/${id_icono}/${id_pie}`)
}


export function getIconosHabitacion(id_habitacion) {
  return http().get(`/api/1.0/icono/${id_habitacion}`)
}
export function saveIconoHabitacion(data){
  return http().post('/api/1.0/icono/habitacion', data)
}
export function deleteIconoHabitacion(id_habitacion, id_icono){
  return http().delete(`/api/1.0/icono/eliminar/habitacion/${id_habitacion}/${id_icono}`)
}
export function updateIconoHabitacion(id_habitacion, id_icono){
  return http().put(`/api/1.0/icono/${id_habitacion}/${id_icono}`)
}