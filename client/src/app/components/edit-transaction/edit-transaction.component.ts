import { Component, Inject, OnInit } from '@angular/core'
import { DrawerService } from '../../services/drawer.service'
import { FormControl } from '@angular/forms'
import { Subscription } from 'rxjs'
import { Categories } from '../../models/categories.model'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core'
import { HomeService } from '../../services/home.service'
import { AccountService } from '../../services/account.service'
import { NotificationService } from '../../services/notification.service'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss']
})
export class EditTransactionComponent implements OnInit {
  toggleButton: string = 'income'
  title: string = ''
  amount: number = 0
  payee: string = ''
  description: string = ''
  date = new FormControl(new Date())
  accountId: string = ''
  subscription?: Subscription
  selectedCategory: [string] = ['Home']
  categories: Categories[] = []
  _id: string = ''

  activeAcc: string = ''
  changeDate(event: MatDatepickerInputEvent<Date>) {
    this.date.setValue(event.value)
  }

  constructor(
    public drawer: DrawerService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private homeService: HomeService,
    private accountService: AccountService,
    private notification: NotificationService,
    private userService: UserService
  ) {}

  editTransaction(): void {
    this.accountService.activeAccountId$
      .subscribe(data => {
        this.accountId = data
      })
      .unsubscribe()
    this.homeService
      .editTransaction(this._id, this.accountId, {
        title: this.title,
        cash: this.amount,
        category: this.selectedCategory,
        dateOfTransaction: this.date.value.getTime(),
        payee: this.payee === '' ? 'No description' : this.payee,
        description:
          this.description === '' ? 'No description' : this.description,
        _id: this._id,
        typeOfTransaction: this.toggleButton
      })
      .subscribe(
        data => {
          this.homeService.setTransactionsList(data)
          this.drawer.setDrawer(false)
          this.notification.openSnackBar('Successfully edited!')
        },
        error => {
          this.drawer.setDrawer(false)
          this.notification.openSnackBar(error.error.message)
        }
      )
  }
  ngOnInit(): void {
    this._locale = 'jp'
    this._adapter.setLocale(this._locale)
    this.subscription = this.drawer.transaction$.subscribe(data => {
      this.title = data.title
      this.toggleButton = data.typeOfTransaction
      this.selectedCategory = data.category
      this.amount = data.cash
      this.date.setValue(new Date(data.dateOfTransaction))
      this.payee = data.payee
      this.description = data.description
      this._id = data._id
    })
    this.subscription.unsubscribe()
    this.subscription = this.userService.categories$.subscribe(data => {
      this.categories = data
    })
    this.subscription.unsubscribe()
  }
}
