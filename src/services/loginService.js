import { http } from "./httpService.js"

export function loginAccess(loginData) {
  return http().post("/api/1.0/auth/login", loginData)
}

export function verificaAuthToken(){
  return http().get('/api/verificar')
}

export function registerUser(user){
  return http().post(`/api/1.0/auth/register`, user)
}