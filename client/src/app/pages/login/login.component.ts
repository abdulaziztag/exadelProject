import { Component, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
@Injectable()
export class LoginComponent {
  constructor(private http: HttpClient) {}
  login() {
    let data = this.http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe()
    console.log(data)
  }
}
