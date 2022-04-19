import { Component, OnInit } from '@angular/core'
import { TokenStorageService } from './services/token-storage.service'
import { NotificationService } from './services/notification.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client'

  constructor(
    private tokenService: TokenStorageService,
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
    this.user.role === 'user' && this.menuItems.pop()
    this.notification.openSnackBar('Good job! lorem10')
  }
}
