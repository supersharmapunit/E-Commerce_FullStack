import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserapiService {
  baseUrl: string = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]>{
    let url = `${this.baseUrl}/user`;
    return this.httpClient.get<User[]>(url);
  }

  getUserByEmail(email: string): Observable<User>{
    let url = `${this.baseUrl}/user/${email}`;
    return this.httpClient.get<User>(url);
  }

  saveUser(user: User): Observable<User>{
    let url = `${this.baseUrl}/user`;
    return this.httpClient.post<User>(url, user);
  }

  setUserLoggedIn(user: User){
    // console.log(JSON.stringify(user));
    localStorage.setItem('user', JSON.stringify(user));
  }

  setUserLoggedOut(){
    localStorage.removeItem('user');
  }

  checkUserLoggedIn(){
    let cUser = JSON.parse(localStorage.getItem('user')!);
    // console.log(cUser.email, cUser.password);
    if(cUser == undefined || cUser.email == undefined || cUser.password == undefined || cUser ==null || cUser.password == null || cUser.email == null || cUser.email.length == 0 || cUser.password.length == 0){
      return false;
    } else return true;
  }

  generateToken(username: string, password: string){
    return this.httpClient.post(`${this.baseUrl}/token`,{ "username": username, "password": password});
  }

  loginUser(token:any){
    localStorage.setItem('token', token);
    return true;
  }

  isLoggedIn(){
    let token = localStorage.getItem('token');
    if(token == null || token.length == 0 || token == undefined){
      return false;
    } else {
      return true;
    }
  }

  logout(){
    localStorage.removeItem('token');
    return true;
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
