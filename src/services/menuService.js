import { http } from "./httpService.js"

export function getMenu() {
  return http().get(`/api/1.0/menu`)
}