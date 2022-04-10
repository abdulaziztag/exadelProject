import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

const AUTH_API = 'http://localhost:3000/api/user/'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  getAccounts(userId: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'accounts',
      {
        userId
      },
      httpOptions
    )
  }
}
