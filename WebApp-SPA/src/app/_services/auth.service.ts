import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl = 'https://localhost:44314/api/auth/';
jwtHelper = new JwtHelperService();
constructor(private http: HttpClient) { };
decodeToken: any;

login(model : any){
  return this.http.post(this.baseUrl + 'login', model).pipe(
    map((response: any) =>{
      const user = response;
      if(user){
        localStorage.setItem('token', user.token);
        this.decodeToken = this.jwtHelper.decodeToken(user.token);
        console.log(this.decodeToken);
      }
    })
  );
}

loggedIn()
{
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

register(model: any)
{
  return this.http.post(this.baseUrl + 'register', model);
}

}
