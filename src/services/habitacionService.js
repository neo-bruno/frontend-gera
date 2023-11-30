import { http } from "./httpService.js"

export function getAllHabitaciones() {
  return http().get(`/api/1.0/habitacion`)
}
export function getHabitacion(id_habitacion){
  return http().get(`/api/1.0/habitacion/${id_habitacion}`)
}
export function getLastHabitacion(){
  return http().get(`/api/1.0/habitacion/get/last`)
}
export function saveHabitacion(data){
  return http().post('/api/1.0/habitacion', data)
}