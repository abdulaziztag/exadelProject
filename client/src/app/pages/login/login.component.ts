import { Component } from '@angular/core'
import { LoginService } from './services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}
  login() {
    this.loginService.login('d', 's').subscribe(data => {
      console.log(data)
    })
  }
  changeVisibility() {
    this.visibility = !this.visibility
  }
  visibility: boolean = false
}
