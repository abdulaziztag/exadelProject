import { Component, OnDestroy, OnInit } from '@angular/core'
import { UserService } from '../../services/user.service'
import { TokenStorageService } from '../../services/token-storage.service'
import { HomeService } from '../../services/home.service'
import { Subscription } from 'rxjs'
import { AccountService } from '../../services/account.service'
import { DrawerService } from '../../services/drawer.service'
import { json } from 'express'

interface Cards {
  cash: number
  currency: string
  classes: [string]
  title: string
  _id: string
}

@Component({
  selector: 'app-gradient-card',
  templateUrl: './gradient-card.component.html',
  styleUrls: ['./gradient-card.component.scss']
})
export class GradientCardComponent implements OnInit, OnDestroy {
  cards: any = []
  elCards: any = ''
  subscription!: Subscription
  subscriptionX!: Subscription
  activeAccountId: string = ''

  constructor(
    private userService: UserService,
    private tokenService: TokenStorageService,
    private homeService: HomeService,
    private accountService: AccountService,
    private drawer: DrawerService
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
    this.subscriptionX?.unsubscribe()
  }

  ngOnInit(): void {
    const userId: string = this.tokenService.getUser().id
    this.subscription = this.userService.getAccounts(userId).subscribe(data => {
      this.userService.setAccountList(data)
      this.requestTransactionList(this.cards[0]._id)
      this.accountService.setActiveAccountId(this.cards[0]._id)
    })
    this.subscriptionX = this.userService.accountsList$.subscribe(data => {
      this.cards = data.map((key: Cards) => {
        return { ...key, classes: ['card'] }
      })
      if (data.length !== 0 && this.activeAccountId === '') {
        this.activeAccountId = data[0]._id
      }
      this.cards.forEach((key: any, index: number) => {
        if (key._id === this.activeAccountId) {
          this.cards[index].classes = ['card', 'active']
        }
      })
    })
  }

  requestTransactionList(_id: string): void {
    this.subscription?.unsubscribe()
    this.subscription = this.homeService
      .requestTransactionList(_id)
      .subscribe(data => {
        this.homeService.setTransactionsList(data)
      })
  }

  changeCard(index: number, event: any): void {
    this.activeAccountId = this.cards[index]._id
    this.subscription?.unsubscribe()
    if (event.target.parentElement.classList.toString().includes('active')) {
      this.getAccountInfo()
    } else {
      this.subscription = this.homeService
        .requestTransactionList(this.cards[index]._id)
        .subscribe(data => {
          return this.homeService.setTransactionsList(data)
        })
      this.cards.forEach((key: Cards) => {
        key.classes = ['card']
      })
      this.accountService.setActiveAccountId(this.cards[index]._id)
      this.cards[index].classes = ['card', 'active']
    }
  }

  getAccountInfo(): void {
    this.drawer.setDrawer(true, 'about-account')
    this.accountService
      .requestAccountInfo(this.activeAccountId)
      .subscribe(data => {
        this.accountService.setAccountInfo(data)
      })
  }
}
