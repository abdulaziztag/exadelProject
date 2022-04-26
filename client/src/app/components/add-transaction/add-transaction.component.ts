import { Component, OnDestroy, OnInit } from '@angular/core'
import { DrawerService } from '../../services/drawer.service'
import { FormControl, Validators } from '@angular/forms'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { DateAdapter } from '@angular/material/core'
import { Categories } from '../../models/categories.model'
import { AccountService } from '../../services/account.service'
import { Subscription } from 'rxjs'
import { HomeService } from '../../services/home.service'
import { NotificationService } from '../../services/notification.service'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit, OnDestroy {
  accountsList: any = []

  toggleButton: string = 'income'
  categories = new FormControl([], Validators.required)
  title = new FormControl('', [Validators.required])
  amount = new FormControl(1, Validators.required)
  payee: string = ''
  description: string = ''
  accountId: string = ''
  subscription?: Subscription

  categoriesList: Categories[] = []

  date = new FormControl(new Date())
  changeDate(event: MatDatepickerInputEvent<Date>) {
    this.date.setValue(event.value)
  }
  constructor(
    public drawer: DrawerService,
    private dateAdapter: DateAdapter<Date>,
    private accountService: AccountService,
    private homeService: HomeService,
    private notification: NotificationService,
    private userService: UserService
  ) {
    this.dateAdapter.setLocale('jp')
  }

  addTransaction() {
    this.homeService
      .addTransaction({
        typeOfTransaction: this.toggleButton,
        title: this.title.value,
        payee: this.payee === '' ? 'No payee' : this.payee,
        description:
          this.description === '' ? 'No description' : this.description,
        cash: this.amount.value,
        dateOfTransaction: +new Date(this.date.value).getTime(),
        _id: this.accountId,
        category: this.categories.value.map(
          (key: { categoryName: string }) => key.categoryName
        )
      })
      .subscribe(
        data => {
          this.homeService.setTransactionsList(data)
          this.drawer.setDrawer(false)
          this.notification.openSnackBar('Successfully added!')
          this.accountsList.forEach((key: any, index: number) => {
            if (key._id === this.accountId) {
              this.toggleButton === 'income'
                ? (this.accountsList[index].cash += this.amount.value)
                : (this.accountsList[index].cash -= this.amount.value)
              this.userService.setAccountList(this.accountsList)
            }
          })
          this.title.setValue('')
          this.amount.setValue(1)
          this.categories.setValue([])
          this.description = ''
          this.payee = ''
        },
        error => {
          this.notification.openSnackBar(error.error.message)
        }
      )
  }

  ngOnInit(): void {
    this.date.setValue(new Date())
    this.subscription = this.accountService.activeAccountId$.subscribe(data => {
      this.accountId = data
    })
    this.userService.accountsList$.subscribe(data => {
      this.accountsList = data
    })
    this.userService.categories$.subscribe(data => {
      this.categoriesList = data
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
