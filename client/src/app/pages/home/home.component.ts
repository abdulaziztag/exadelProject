import { Component, OnDestroy, OnInit } from '@angular/core'
import { TokenStorageService } from '../../services/token-storage.service'
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription?: Subscription

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const token = this.tokenStorage.getToken()
    if (token === null) {
      this.router.navigate(['/login'])
    }
    this.subscription = this.userService.getCategories().subscribe(data => {
      this.userService.setCategories(data)
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
