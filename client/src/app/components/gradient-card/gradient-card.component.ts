import { Component, OnDestroy, OnInit } from '@angular/core'
import { UserService } from '../../services/user.service'
import { TokenStorageService } from '../../services/token-storage.service'
import { HomeService } from '../../services/home.service'
import { Subscription } from 'rxjs'
import { AccountService } from '../../services/account.service'

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

  constructor(
    private userService: UserService,
    private tokenService: TokenStorageService,
    private homeService: HomeService,
    private accountService: AccountService
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  ngOnInit(): void {
    const userId: string = this.tokenService.getUser().id
    this.subscription = this.userService.getAccounts(userId).subscribe(data => {
      this.cards = data.map((key: Cards) => {
        return { ...key, classes: ['card'] }
      })
      this.cards[0].classes.push('active')
      this.requestTransactionList(this.cards[0]._id)
      this.accountService.setActiveAccountId(this.cards[0]._id)
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

  changeCard(index: number): void {
    this.subscription?.unsubscribe()
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
