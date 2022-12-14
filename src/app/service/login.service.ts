import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import{User} from "../model/user"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private ROOT_URL = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  onSubmit(submittedForm: any): Observable<User>{
    submittedForm.value["password"] = JSON.stringify(submittedForm.value["password"]);
    return this.http.post<User>(this.ROOT_URL + '/login', JSON.stringify(submittedForm.value), this.httpOptions);
  }

}
