import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import{FormControl,FormGroup,Validators} from '@angular/forms'
import { DataserviceService } from '../dataservice.service';
import { LoginRequest } from '../Interface/LoginRequest';
import { LoginResponse } from '../Interface/LoginResponse';
import { UserLocal } from '../Interface/UserLocal';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service:DataserviceService,private router:Router){

  }

  loginForm=new FormGroup({
    Email:new FormControl(''),
    Password:new FormControl('')
  })

  userLocal : UserLocal ={
    loggedIn:false,
    data:''
  };


  onSubmit(){
    let loginRequest:LoginRequest={
      email:this.loginForm.value.Email?.toString()??'',
      password:this.loginForm.value.Password?.toString()??'',
    }
   this.service.login(loginRequest).subscribe(a=>{
    if(a.data!=null && a.data.token!=null){
      this.userLocal={loggedIn: true, data: a.data.token};
      this.service.setLocal(this.userLocal);
      this.router.navigate(['home']);
    }
    else{
      Swal.fire('Incorrect email or password.');
    }
   });
  }

}
