import { AfterViewInit, Component, OnInit } from '@angular/core'
import { UserService } from '../../services/user.service'
import { TokenStorageService } from '../../services/token-storage.service'

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
export class GradientCardComponent implements OnInit {
  cards: any = []
  elCards: any = ''

  constructor(
    private userService: UserService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    const userId: string = this.tokenService.getUser().id
    this.userService.getAccounts(userId).subscribe(data => {
      this.cards = data.map((key: Cards) => {
        return { ...key, classes: ['card'] }
      })
      this.cards[0].classes.push('active')
    })
  }

  changeCard(index: number): void {
    console.log(this.cards)
    this.cards.forEach((key: Cards) => {
      key.classes = ['card']
    })
    this.cards[index].classes = ['card', 'active']
  }
}
