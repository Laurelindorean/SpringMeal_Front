import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {

  private api = 'http://localhost:6752/api';
  private token: string;
  private httpHeaders: { headers: HttpHeaders };

  constructor(private http: HttpClient, private cookie:CookieService) {
    this.token = this.cookie.get('token');
    this.httpHeaders = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }

  login(user: any): Observable<any> {
    return this.http.post('http://localhost:6752/api/auth/signin', user);
  }
  register(user:any):Observable<any>{
    return this.http.post('http://localhost:6752/api/auth/signup', user, {responseType: 'text'});
  }
  get(id:string): Observable<any> {
    console.log(`${this.api}/users/${id}`);
       
    return this.http.get(`${this.api}/users/${id}`, this.httpHeaders);
  }
  update(id:string, user:any): Observable<any> {
    return this.http.put('http://localhost:6752/api/users/'+id, user, {headers : this.getHeaders()});
  }

  setUserID(id:string) {
    this.cookie.set("userid",id)
  }
  getUserID(){
    return this.cookie.get("userid");
  }

  setToken(token:string){
    this.cookie.set("token", token);
  }

  // returns the token
  getToken(){
    return this.cookie.get("token");
  }

  setRole(roleName:string){
    this.cookie.set("roleName", roleName);
  }

  getRole(){
    return this.cookie.get("roleName");
  }

  getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }


}
