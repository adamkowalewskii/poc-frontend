import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {

  }

  onLogoutClick(){
    this.loginService.logout().subscribe();
  }

}
