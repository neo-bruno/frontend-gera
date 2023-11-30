import { http } from "./httpService.js"

export function getSeccion(numero_menu) {
  return http().get(`/api/1.0/seccion/${numero_menu}`)
}

export function updateSeccion(data){
  return http().put(`/api/1.0/seccion`, data)
}