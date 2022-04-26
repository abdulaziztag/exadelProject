import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { TokenStorageService } from './services/token-storage.service'
import { Router } from '@angular/router'
import { UserService } from './services/user.service'
import { fadeAnimation } from './helpers/animations'
import { NotificationService } from './services/notification.service'
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'client'
  subscription?: Subscription
  constructor(
    private tokenService: TokenStorageService,
    public router: Router,
    private userService: UserService,
    private notification: NotificationService
  ) {}
  user: { surname: string; name: string; email: string; role: string } = {
    name: '',
    surname: '',
    email: '',
    role: ''
  }
  menuItems = [
    {
      title: 'Categories',
      link: '/categories'
    },
    {
      title: 'Subscriptions',
      link: '/subscriptions'
    },
    {
      title: 'Obligatory',
      link: '/obligatory'
    },
    {
      title: 'Statistics',
      link: '/statistics'
    },
    {
      title: 'Admin',
      link: '/admin'
    }
  ]

  ngOnInit(): void {
    this.user = this.tokenService.getUser()
    this.userService.user$.subscribe(data => {
      this.user = data
      data.role === 'user' && this.menuItems.pop()
    })
    this.user.role === 'user' && this.menuItems.pop()
  }

  logout(): void {
    this.tokenService.signOut()
    this.router.navigate(['/login'])
    this.notification.openSnackBar('Logged out!')
  }
  ngAfterViewInit() {
    /*this.user = this.tokenService.getUser()
    this.user.role === 'user' && this.menuItems.pop()*/
  }
}
