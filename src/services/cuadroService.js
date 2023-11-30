import { http } from "./httpService.js"

export function getCuadro(numero_cuadro) {
  return http().get(`/api/1.0/cuadro/${numero_cuadro}`)
}