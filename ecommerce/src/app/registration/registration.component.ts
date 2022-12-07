import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserapiService } from '../services/userapi.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  currUser: User = {
    email: "",
      firstName: "",
      lastName: "",
      password: ""
  };
  registrationForm!: FormGroup;

  constructor(private userApiService: UserapiService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      userEmail: new FormControl("", Validators.required),
      userFirstName: new FormControl("", Validators.required),
      userLastName: new FormControl("", Validators.required),
      userPassword: new FormControl("", Validators.required),
      userCPassword: new FormControl("", Validators.required)
    });
  }

  onRegistrationSubmit(){
    // console.log("inside onregistrationSubmit with values" + this.registrationForm.value);
    if(this.registrationForm.value.userPassword != this.registrationForm.value.userCPassword){
      // console.log("passwords don't match");
      this.toast.warning({detail: "Careful", summary: "Passwords don't match", duration: 5000});
      this.registrationForm.reset();
    } else {
      this.currUser = {
        email: this.registrationForm.value.userEmail.toLowerCase(),
        firstName: this.registrationForm.value.userFirstName,
        lastName: this.registrationForm.value.userLastName,
        password: this.registrationForm.value.userPassword
      };
      // console.log(this.currUser);
      this.handleRegister(this.currUser);
    }
  }

  handleRegister(user: User){
    
    if(this.checkExistingUser(user.email)){
      // console.log("user already exists. Please login");
      this.toast.info({detail: "User Exists", summary: "Please LogIn", duration: 5000});
      this.registrationForm.reset();
    } else {
      this.userApiService.saveUser(user).subscribe({
        next: (data)=>{
          // console.log(data);
          // console.log("user added");
          this.toast.success({detail: "User Registered", summary: "Please LogIn", duration: 5000});
          this.router.navigate(['/login']);
        },
        error: (error)=>{
          // console.log(error);
          this.registrationForm.reset();
          // this.toast.error({detail: "Server Error", summary: "Please try again.", duration: 5000});
          this.toast.info({detail: "User Exists", summary: "Please LogIn", duration: 5000});
        }
      });
    }
  }

  checkExistingUser(email: string): boolean {
    let existingUser: User | null = null;
    let exist: boolean = false;

    this.userApiService.getUserByEmail(email.toLowerCase()).subscribe({
      next: (data)=>{
        existingUser = data;
        console.log(data);
        if(data === null || data.email == undefined || data.email.length == 0){
          exist = true;
        } else{
          exist = false;
        }
        
        // if(existingUser == null || existingUser.email == null || existingUser.email == undefined){
        //   exist = false;
        //   // return true;
        // } else {
        //   exist = true;
        //   // return false;
        // }
      },
      error: (error)=>{
        // console.log(error);
        
        // console.log("error with the servers" + error.message);
        this.toast.error({detail: "Server Error", summary: "Please try again.", duration: 5000});
      }
    });
    return exist;
  }
}
