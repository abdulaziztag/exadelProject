import { Component, OnInit } from '@angular/core'
import { DrawerService } from '../../services/drawer.service'
import { FormControl, Validators } from '@angular/forms'
import { NotificationService } from '../../services/notification.service'
import { AccountService } from '../../services/account.service'
import { Subscription } from 'rxjs'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  title = new FormControl('', Validators.required)
  description: string = ''
  cash: number = 0
  public currency = new FormControl('$')
  public currencyList: string[] = ['$', '€', '₽', '₴', '₿', 'UZS']
  _id: string = ''
  accountsList: any = []
  subscription?: Subscription

  constructor(
    public drawer: DrawerService,
    private notification: NotificationService,
    private accountService: AccountService,
    private userService: UserService
  ) {}

  editAccount(): void {
    this.accountService
      .editAccount(this._id, {
        cash: this.cash,
        currency: this.currency.value,
        title: this.title.value,
        description:
          this.description === '' ? 'No description' : this.description,
        _id: this._id
      })
      .subscribe(data => {
        const accountIndex = this.accountsList.findIndex((key: any) => {
          return key._id === data._id
        })
        this.accountsList[accountIndex] = data
        this.userService.setAccountList(this.accountsList)
        this.drawer.setDrawer(false)
        this.notification.openSnackBar('Successfully edited!')
      })
  }
  ngOnInit(): void {
    this.subscription = this.accountService.accountInfo$.subscribe(data => {
      this.cash = data.cash
      this.description = data.description
      this.title.setValue(data.title)
      this._id = data._id
      this.currency.setValue(data.currency)
    })
    this.userService.accountsList$.subscribe(data => {
      this.accountsList = data
    })
    this.subscription.unsubscribe()
  }
}
