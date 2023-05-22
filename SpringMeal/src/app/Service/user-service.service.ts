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
  get(id:string): Observable<any> {    
    return this.http.get('http://localhost:6752/api/users/'+id, {headers : this.getHeaders()});
  }
  update(id:string, user:any): Observable<any> {
    return this.http.put('http://localhost:6752/api/users/'+id, user, {headers : this.getHeaders()});
  }

  setUserID(id:string) {
    this.cookies.set("userid",id)
  }
  getUserID(){
    return this.cookies.get("userid");
  }

  setToken(token:string){
    this.cookies.set("token", token);
  }

  // returns the token
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
