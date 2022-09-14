import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewUser } from './new-user';


const API = environment.apiURL;
@Injectable({
  providedIn: 'root'
})
export class NewUserService {

  constructor(private http: HttpClient) {}

  registerNewUser(newUser: NewUser) {
    return this.http.post(`${API}register`, newUser);
  }
}
