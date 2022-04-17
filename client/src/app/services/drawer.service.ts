import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'

const AUTH_API = 'http://localhost:3000/api/transaction/'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  public drawer$ = new Subject<boolean>()
  public component$ = new Subject<string>()
  constructor(private http: HttpClient) {}

  setDrawer(drawer: boolean, component: string) {
    this.drawer$.next(drawer)
    this.component$.next(component)
  }
}
