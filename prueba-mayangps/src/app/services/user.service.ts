import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import API_URI from './API_URI'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  setUser(userdata: any) {
    return this.http.post(`${API_URI}/user/setUser`, userdata)
  }

  updateUser(userdata: any) {
    return this.http.post(`${API_URI}/user/updateUser`, userdata)
  }

  getUserInfo(key: any) {
    return this.http.post(`${API_URI}/user/getUserInfo`, key)
  }
}
