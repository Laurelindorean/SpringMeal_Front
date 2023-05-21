import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {

  constructor(private http: HttpClient, private cookies:CookieService) {}

  login(user: any): Observable<any> {
    return this.http.post('http://localhost:6752/api/auth/signin', user);
  }
  register(user:any):Observable<any>{
    return this.http.post('http://localhost:6752/api/auth/signup', user, {responseType: 'text'});
  }

  setToken(token:string){
    this.cookies.set("token", token);
  }

  getToken(){
    return this.cookies.get("token");
  }

  setRole(roleName:string){
    this.cookies.set("roleName", roleName);
  }

  getRole(){
    return this.cookies.get("roleName");
  }

  getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }


}
