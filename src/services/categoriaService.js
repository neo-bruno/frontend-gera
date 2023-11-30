import { http } from "./httpService.js"

export function getCategorias() {
  return http().get(`/api/1.0/categoria`)
}

export function getLastCategoria(){
    return http().get(`/api/1.0/categoria/last`)
}

export function saveCategoria(data){
    return http().post('/api/1.0/categoria', data)
}

export function modifyCategoria(data){
    return http().put('/api/1.0/categoria', data)
}