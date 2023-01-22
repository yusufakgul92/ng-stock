import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';
import { Greeting } from '../Interface/Greeting';
import { UserLocal } from '../Interface/UserLocal';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { webSocket } from "rxjs/webSocket";
import { SocketMessage } from '../Interface/SocketMessage';
import { delay, retryWhen, tap, timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    

  constructor(private service:DataserviceService,private router:Router,private modalService: NgbModal){
   
  }

  greeting : Greeting = { data:'',
  status:0,
  error:''};

   source = timer(1000, 2000);

   cycle = 0;

  ngOnInit(): void {
    const subject = webSocket<SocketMessage>('ws://66.70.229.82:8181/?'+this.service.getLocal().data);
    const subscribe = this.source.subscribe(val =>
      {
        console.log(this.cycle.toString());
        subject.subscribe({
          next: msg => {
            if(msg.MessageType==1){
              this.onClick();
              }
              else{
               this.cycle--;
              }
          },
          error: err => {
            this.onClick();
          }, 
          complete: () =>{
            this.cycle++;
            if(this.cycle > 1){
              this.onClick();
            }
            console.log('complete')
           } 
         });
      }
      );

  
    this.GetSubscribe();
  }

  GetSubscribe(){
    this.service.getGreeting().subscribe(a=>{
      this.greeting=a;
    });
  }

  onClick(){
    let _tmp : UserLocal ={
      loggedIn:false,
      data:''
    };
    this.service.setLocal(_tmp);
    this.router.navigate(['login']);
  }

}