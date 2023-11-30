import { http } from "./httpService.js"

export function findPosition(id) {
  return http().get(`/api/1.0/empleado/${id}`)
}