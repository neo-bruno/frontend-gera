import { http } from "./httpService.js"

export function findHuespedes(dato, tipo) {
  return http().get(`/api/1.0/huesped/${dato}/${tipo}`)
}