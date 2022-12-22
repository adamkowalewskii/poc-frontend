import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, shareReplay } from 'rxjs';
import{User} from "../model/user"
import { Token } from '../model/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private ROOT_URL = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',
                              'Authorization' : `Bearer`})
  }

  constructor(private http: HttpClient) { }

  onSubmit(submittedForm: any): Observable<Token>{
    //submittedForm.value["password"] = JSON.stringify(submittedForm.value["password"]);
    console.log(submittedForm.value.password)
    return this.http.post<Token>(this.ROOT_URL + '/login', JSON.stringify(submittedForm.value), {withCredentials:true});
  }

  getUsers() : Observable<User[]>{
    return this.http.get<User[]>(this.ROOT_URL + '/users/all', this.httpOptions);
  }

}
