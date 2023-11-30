import { http } from "./httpService.js"

export function getPie(numero_seccion) {
  return http().get(`/api/1.0/pie/${numero_seccion}`)
}

export function getPieIconos(id_pie) {
  return http().get(`/api/1.0/pie/iconos/${id_pie}`)
}

export function updatePie(data){
  return http().put('/api/1.0/pie', data)
}