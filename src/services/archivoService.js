import { http } from "./httpService.js"

export function getArchivosPanel(id_panel) {
  return http().get(`/api/1.0/archivo/panel/${id_panel}`)
}
export function saveArchivo(data){
  return http().post('/api/1.0/archivo', data)
}
export function deleteArchivoPanel(id_panel, id_archivo, id_galeria){
  return http().delete(`/api/1.0/archivo/${id_panel}/${id_archivo}/${id_galeria}`)
}

export function getArchivosHabitacion(id_habitacion){
  return http().get(`/api/1.0/archivo/${id_habitacion}`)
} 
export function saveArchivoHabitacion(data){
  return http().post('/api/1.0/archivo/habitacion', data)
}
export function deleteArchivoHabitacion(id_habitacion, id_archivo){
  return http().delete(`/api/1.0/archivo/habitacion/eliminar/${id_habitacion}/${id_archivo}`)
}
export function updateArchivoHabitacion(id_habitacion, id_archivo){
  return http().put(`/api/1.0/archivo/${id_habitacion}/${id_archivo}`)
}