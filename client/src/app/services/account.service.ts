import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'

const AUTH_API = 'http://localhost:3000/api/account/'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public activeAccountId$ = new BehaviorSubject<string>('')

  setActiveAccountId(id: string) {
    this.activeAccountId$.next(id)
  }
}
