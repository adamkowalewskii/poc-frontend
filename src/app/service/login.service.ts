import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, shareReplay } from 'rxjs';
import{User} from "../model/user"
import { Token } from '../model/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public token = "";
  private ROOT_URL = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
  }

  constructor(private http: HttpClient) {

   }

  onSubmit(submittedForm: any): Observable<Token>{
    //submittedForm.value["password"] = JSON.stringify(submittedForm.value["password"]);
    console.log(submittedForm.value.password)
    return this.http.post<Token>(this.ROOT_URL + '/login', JSON.stringify(submittedForm.value), {withCredentials:true});
  }

  getUsers() : Observable<User[]>{
    console.log("Token", this.token)
    this.httpOptions.headers = this.httpOptions.headers.delete("Authorization")
    this.httpOptions.headers = this.httpOptions.headers.append("Authorization", "Bearer " + this.token)
    return this.http.get<User[]>(this.ROOT_URL + '/users/all', this.httpOptions);
  }

  logout() {
    this.httpOptions.headers = this.httpOptions.headers.delete("Authorization")
    this.httpOptions.headers = this.httpOptions.headers.append("Authorization", "Bearer " + this.token)
    return this.http.get(this.ROOT_URL + '/logout', this.httpOptions)
  }

  getRefreshToken() : Observable<Token>{
    return this.http.get<Token>(this.ROOT_URL + '/users/refresh-token', {withCredentials:true})
  }

}
