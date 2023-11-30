import { http } from "./httpService.js"

export function getGaleria(numero_seccion) {
  return http().get(`/api/1.0/galeria/${numero_seccion}`)
}

export function getArchivosGaleria(id_galeria) {
  return http().get(`/api/1.0/galeria/archivos/${id_galeria}`)
}

export function updateGaleria(data){
  return http().put('/api/1.0/galeria', data)
}