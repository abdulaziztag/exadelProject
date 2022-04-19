import { Component, OnDestroy, OnInit } from '@angular/core'
import { DrawerService } from '../../services/drawer.service'
import { FormControl, Validators } from '@angular/forms'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { DateAdapter } from '@angular/material/core'
import { Categories } from '../../models/categories.model'
import { categories } from '../../helpers/categories.data'
import { AccountService } from '../../services/account.service'
import { Subscription } from 'rxjs'
import { HomeService } from '../../services/home.service'
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit, OnDestroy {
  toggleButton: string = 'income'
  categories = new FormControl()
  title: string = ''
  amount: number = 0
  payee: string = ''
  description: string = ''
  date: number = new Date().getTime()
  accountId: string = ''

  subscription?: Subscription

  categoriesList: Categories[] = categories
  changeDate(event: MatDatepickerInputEvent<Date>) {
    this.date = new Date(`${event.value}`).getTime()
  }
  constructor(
    public drawer: DrawerService,
    private dateAdapter: DateAdapter<Date>,
    private accountService: AccountService,
    private homeService: HomeService,
    private notification: NotificationService
  ) {
    this.dateAdapter.setLocale('en-GB')
  }

  addTransaction() {
    this.homeService
      .addTransaction({
        typeOfTransaction: this.toggleButton,
        title: this.title,
        payee: this.payee,
        description: this.description,
        cash: this.amount,
        dateOfTransaction: +new Date(this.date).getTime(),
        _id: this.accountId,
        category: this.categories.value.map(
          (key: { category: string }) => key.category
        )
      })
      .subscribe(
        data => {
          this.homeService.setTransactionsList(data)
          this.drawer.setDrawer(false, '')
          this.notification.openSnackBar('Successfully added!')
        },
        error => {
          this.notification.openSnackBar(error.error.message)
        }
      )
  }

  ngOnInit(): void {
    this.subscription = this.accountService.activeAccountId$.subscribe(data => {
      this.accountId = data
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
