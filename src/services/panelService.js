import { http } from "./httpService.js"

export function getPanel(numero_seccion) {
  return http().get(`/api/1.0/panel/${numero_seccion}`)
}

export function updatePanel(data){
  return http().put('/api/1.0/panel', data)
}