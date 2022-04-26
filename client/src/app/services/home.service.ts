import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'
import { Transaction } from '../models/transaction.model'

const AUTH_API = 'http://localhost:3000/api/transaction/'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public transactionsList$ = new Subject<Transaction[]>()
  public sortByType$ = new Subject<string>()

  constructor(private http: HttpClient) {}

  requestTransactionList(_id: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'get',
      {
        _id
      },
      httpOptions
    )
  }

  addTransaction(transaction: Transaction): Observable<any> {
    return this.http.post(
      AUTH_API + 'add',
      {
        ...transaction
      },
      httpOptions
    )
  }

  deleteTransaction(_id: string, transactionId: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'delete',
      {
        _id,
        transactionId
      },
      httpOptions
    )
  }

  editTransaction(
    transactionId: string,
    _id: string,
    data: Transaction
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'edit',
      {
        transactionId,
        _id,
        data
      },
      httpOptions
    )
  }

  setSortByType(type: string) {
    this.sortByType$.next(type)
  }

  setTransactionsList(transactions: Transaction[]) {
    this.transactionsList$.next(transactions)
  }
}
