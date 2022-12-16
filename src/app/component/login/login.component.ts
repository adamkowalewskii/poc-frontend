import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userFormGroup: FormGroup;
  constructor(private fromBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private snackBar: MatSnackBar) {
   }

  ngOnInit(): void {
    this.userFormGroup = this.fromBuilder.group({
      username: [''],
      password: [''],
    })
  }

  onSubmit(submittedForm: any): void {
    this.loginService.onSubmit(submittedForm).subscribe((user) => {
      console.log(user);
      this.router.navigate(['success'])
    }, _error => {
      this.router.navigate(['error'])
      if(_error.status === 403){
        console.log("Error 403")
      }
    })
  }
  getAll(){
    this.loginService.getUsers().subscribe();
  }
}
