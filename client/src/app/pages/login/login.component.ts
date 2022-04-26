import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { TokenStorageService } from '../../services/token-storage.service'
import { Router } from '@angular/router'
import { NotificationService } from '../../services/notification.service'
import { UserService } from '../../services/user.service'
import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.minLength(6)])
  errorMessage: string = ''
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private notification: NotificationService,
    private userService: UserService
  ) {}
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value'
    }

    return this.email.hasError('email') ? 'Not a valid email' : ''
  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['/'])
    }
  }
  login(): void {
    this.authService.login(this.email.value, this.password.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token)
        this.tokenStorage.saveUser(data)
        this.notification.openSnackBar('Successfully logged in!')
        this.router.navigate(['/'])
        this.userService.setUser(data)
      },
      error => {
        this.notification.openSnackBar(error.error.message, 'warning')
      }
    )
  }
  changeVisibility() {
    this.visibility = !this.visibility
  }
  visibility: boolean = false
}
