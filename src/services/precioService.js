import { http } from "./httpService.js"

export function getPrecios() {
  return http().get(`/api/1.0/precio`)
}
export function getPrecio(numero_precio){
  return http().get(`/api/1.0/precio/get/room/${numero_precio}`)
}

export function getAllPrecios() {
    return http().get(`/api/1.0/precio/get/all`)
  }

export function getLastPrecio(){
    return http().get(`/api/1.0/precio/last`)
}

export function savePrecio(data){
    return http().post('/api/1.0/precio', data)
}

export function modifyPrecio(data){
    return http().put('/api/1.0/precio', data)
}