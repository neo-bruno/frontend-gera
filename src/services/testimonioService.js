import { http } from "./httpService.js"

export function getTestimonios(numero_seccion) {
  return http().get(`/api/1.0/testimonio/${numero_seccion}`)
}

export function getTestimonio(id_huesped){
  return http().get(`/api/1.0/testimonio/find/${id_huesped}`)
}

export function updateTestimonio(data){
  return http().put('/api/1.0/testimonio', data)
}