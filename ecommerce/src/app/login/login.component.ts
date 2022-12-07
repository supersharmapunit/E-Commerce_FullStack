import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserapiService } from '../services/userapi.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials = {
    username: '',
    password: ''
  }

  currUser!: User;

  loginForm!: FormGroup;

  constructor(private userApiService: UserapiService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "userEmail": new FormControl("", Validators.required),
      "userPassword": new FormControl("", Validators.required),
    });
  }

  handleLogin(email: string, password: string): void{
    // console.log("inside handle login with values " + email + " and " + password);
    // if(this.generateTokenForUser(email, password)) return;
    this.userApiService.getUserByEmail(email.toLowerCase()).subscribe({
      next: (data)=>{
        this.currUser = data;
        if(this.currUser != null){
          if(this.currUser.password == password){
            // console.log("Successful login");
            this.toast.success({detail: "Logged In", summary: "Logged in Successfully", duration: 5000});
            this.userApiService.setUserLoggedIn(this.currUser);
            this.router.navigate(['/home']);
          } else {
            // console.log("password is incorrect");
            this.toast.error({detail: "Wrong Credentials", summary: "Pleast try again.", duration: 5000});
            this.loginForm.reset();
          }
        } else {
          this.loginForm.reset();
          // console.log(email+" user does not exist. Please register");
          this.toast.warning({detail: " Please register", summary: `${email} does not exist.`, duration: 5000});
        }
      },
      error: (error)=>{
        this.loginForm.reset();
        // console.log(error);
        this.toast.error({detail: "Server Error", summary: "Please try again later", duration: 6000});
      }
    })
  }

  onLoginSubmit(){
    // console.log("inside onloginsubmit with values");
    // console.log(this.loginForm.value);
    this.handleLogin(this.loginForm.value.userEmail!, this.loginForm.value.userPassword!);
  }

  generateTokenForUser(username:string, password:string): boolean{
    let flag = false;
    this.userApiService.generateToken(username, password).subscribe({
      next: (response)=>{
        console.log(response);
        this.userApiService.loginUser(response);
        flag = true;
        return true;
      },
      error: (err)=>{
        console.log(err);
        flag = false;
        return false;
      }
    })
    return flag;
  }
}
