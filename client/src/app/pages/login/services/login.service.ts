import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
    const params = new HttpParams().set('user', email).set('password', password)
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1', {
      params
    })
  }
}
