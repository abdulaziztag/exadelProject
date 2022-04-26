import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Transaction } from '../models/transaction.model'

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  public drawer$ = new Subject<boolean>()
  public component$ = new Subject<string>()
  public transaction$ = new BehaviorSubject<any>('')
  constructor() {}

  setDrawer(drawer: boolean, component?: string, transaction?: Transaction) {
    this.drawer$.next(drawer)
    if (component) {
      this.component$.next(component)
    }
    if (transaction) {
      this.transaction$.next(transaction)
    }
  }
}
