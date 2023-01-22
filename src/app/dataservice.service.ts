import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Greeting } from './Interface/Greeting';
import { UserLocal } from './Interface/UserLocal';
import { LoginResponse} from './Interface/LoginResponse';
import { LoginRequest} from './Interface/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
  };


  constructor(private http:HttpClient) { }
 _url='http://66.70.229.82:8181/Authorize';
  login(loginRequest:LoginRequest):Observable<LoginResponse>
  {
    var raw = JSON.stringify(loginRequest);
    return this.http.post<LoginResponse>(this._url,raw,this.httpOptions);
  }
  getGreeting():Observable<Greeting>
  {
    const local=this.getLocal();
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-user-token':local.data
      })
    };
    
    return this.http.get<Greeting>(this._url,this.httpOptions);
  }
  getLocal():UserLocal{
    const loc= JSON.parse(localStorage.getItem("userLocal")??"{}") as UserLocal;
    return loc;
  }
  setLocal(userLocal:UserLocal){
    localStorage.setItem("userLocal",JSON.stringify(userLocal));
  }
}

  
