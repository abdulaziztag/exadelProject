import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { TokenStorageService } from '../../services/token-storage.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = ''
  password: string = ''
  errorMessage: string = ''
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['/'])
    }
  }
  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token)
        this.tokenStorage.saveUser(data)
        this.router.navigate(['/'])
      },
      error => {
        console.log(error)
      }
    )
  }
  changeVisibility() {
    this.visibility = !this.visibility
  }
  visibility: boolean = false
}
