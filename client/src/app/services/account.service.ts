import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { TokenStorageService } from './token-storage.service'
import { Account } from '../models/account.model'

const AUTH_API = 'http://localhost:3000/api/account/'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public activeAccountId$ = new BehaviorSubject<string>('')
  public accountInfo$ = new BehaviorSubject<Account>({
    title: '',
    currency: '$',
    cash: 0,
    description: '',
    _id: ''
  })

  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) {}

  requestAccountInfo(_id: string): Observable<any> {
    return this.http.post(AUTH_API + 'get', { _id }, httpOptions)
  }

  addAccount(
    title: string,
    description: string,
    currency: string,
    cash?: number
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'add',
      {
        title,
        cash,
        description,
        currency,
        userId: this.tokenService.getUser().id
      },
      httpOptions
    )
  }

  deleteAccount(userId: string, _id: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'delete',
      {
        userId,
        _id
      },
      httpOptions
    )
  }

  editAccount(_id: string, data: Account): Observable<any> {
    return this.http.post(
      AUTH_API + 'edit',
      {
        _id,
        data
      },
      httpOptions
    )
  }

  setAccountInfo(account: Account): void {
    this.accountInfo$.next(account)
  }

  setActiveAccountId(id: string): void {
    this.activeAccountId$.next(id)
  }
}
