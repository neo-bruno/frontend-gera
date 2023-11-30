import { http } from "./httpService.js"

export function getMonedas() {
  return http().get(`/api/1.0/moneda`)
}