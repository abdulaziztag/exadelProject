import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { TokenStorageService } from './token-storage.service'
import { Categories } from '../models/categories.model'
import { type } from 'os'

interface Cards {
  cash: number
  currency: string
  classes: [string]
  title: string
  _id: string
}

const AUTH_API = 'http://localhost:3000/api/user/'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public accountsList$ = new BehaviorSubject<Cards[]>([])
  public categories$ = new BehaviorSubject<Categories[]>([])
  public user$ = new Subject<{
    surname: string
    name: string
    email: string
    role: string
  }>()

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}
  getAccounts(userId: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'accounts',
      {
        userId
      },
      httpOptions
    )
  }

  getCategories(): Observable<any> {
    return this.http.post(
      AUTH_API + 'getCategories',
      {
        userId: this.tokenStorage.getUser().id
      },
      httpOptions
    )
  }

  deleteCategory(_id: string): Observable<any> {
    return this.http.post(AUTH_API + 'deleteCategory', {
      userId: this.tokenStorage.getUser().id,
      _id
    })
  }

  addCategory(typeOfCategory: string, categoryName: string): Observable<any> {
    return this.http.post(AUTH_API + 'addCategory', {
      userId: this.tokenStorage.getUser().id,
      category: {
        type: typeOfCategory,
        categoryName
      }
    })
  }

  setCategories(categories: Categories[]) {
    this.categories$.next(categories)
  }

  setUser(user: {
    surname: string
    name: string
    email: string
    role: string
  }) {
    this.user$.next(user)
  }
  setAccountList(lisOfAccounts: Cards[]) {
    this.accountsList$.next(lisOfAccounts)
  }
}
