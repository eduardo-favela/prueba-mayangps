import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import API_URI from './API_URI'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(userdata: any) {
    return this.http.post(`${API_URI}/login/iniciarsesion`, userdata)
  }

  logOut(key: any) {
    return this.http.post(`${API_URI}/login/deleteSessionKey`, key)
  }

  setUser(userdata: any) {
    return this.http.post(`${API_URI}/login/setUser`, userdata)
  }

  checkKey(userdata: any) {
    return this.http.post(`${API_URI}/login/checkKey`, userdata)
  }

  setSessionKey(key: any) {
    return this.http.post(`${API_URI}/login/setSessionKey`, key)
  }

  deleteSessionKey(key: any) {
    return this.http.post(`${API_URI}/login/deleteSessionKey`, key)
  }
}
