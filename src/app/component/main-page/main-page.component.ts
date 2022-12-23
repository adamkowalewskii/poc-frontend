import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  private token : string |undefined

  constructor(private loginService : LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.token = history.state.data
  }

  onLogoutClick(){
    this.loginService.logout().subscribe(() => {
      this.router.navigate(['login'])
    });
  }

  getAll(){
    console.log(this.token)
    this.loginService.getUsers().subscribe((users) => {
      console.log(users)
    }, _error => {
      if(_error.status === 403){
        this.loginService.getRefreshToken().subscribe((token) => {
          this.token = token.toString()
        })
      }
    });
  }

}
