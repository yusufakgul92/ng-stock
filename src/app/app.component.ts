import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from './dataservice.service';
import { UserLocal } from './Interface/UserLocal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private router: Router,private service: DataserviceService) { }
  
  // userLocal:UserLocal;
   userLocal : UserLocal ={
    loggedIn:false,
    data:''
  };

  ngOnInit():void{
   
    this.userLocal=this.service.getLocal();
  if(this.userLocal && this.userLocal.loggedIn){
        this.router.navigate(['home']);
      }
      else  {
            this.router.navigate(['login']);
          }
  }
  // isErr = false;
  // userLocal:any;
  // constructor(private router: Router) { }
  // ngOnInit(): void {
  //   this.getLocal();
  //   if(this.userLocal && this.userLocal.loggedIn){
  //     this.router.navigate(['home']);
  //   }
  //   else  {
  //     this.router.navigate(['login']);
  //   }
  // }
  // getLocal(){
  //   //--get localStorage
  //   this.userLocal = JSON.parse(localStorage.getItem("userLocal")??"{}");
  //   console.log('this.userLocal->>', this.userLocal);
  // }
}
