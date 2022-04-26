import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { UserService } from '../../services/user.service'
import { Subscription } from 'rxjs'
import { AccountService } from '../../services/account.service'
import { TokenStorageService } from '../../services/token-storage.service'
import { NotificationService } from '../../services/notification.service'
import { HomeService } from '../../services/home.service'
import { DrawerService } from '../../services/drawer.service'

interface Cards {
  cash: number
  currency: string
  classes: [string]
  title: string
  _id: string
}

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit, OnDestroy {
  accountsList: Cards[] = []
  subscription?: Subscription
  subscriptionX?: Subscription
  subscriptionY?: Subscription
  subscriptionZ?: Subscription
  subscriptionZX?: Subscription
  subscriptionXY?: Subscription
  private activeAccountId: string = ''
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      purpose: string
      _id: string
      type: string
      amount: number
    },
    private userService: UserService,
    private accountService: AccountService,
    private tokenService: TokenStorageService,
    private notification: NotificationService,
    private homeService: HomeService,
    private drawer: DrawerService,
    private dialog: MatDialog
  ) {}

  deleteTransaction(): void {
    this.subscriptionXY = this.accountService.activeAccountId$.subscribe(
      data => {
        this.subscriptionZ = this.homeService
          .deleteTransaction(data, this.data._id)
          .subscribe(
            data => {
              this.notification.openSnackBar(data.message)
              this.drawer.setDrawer(false)
              this.dialog.closeAll()
              this.correctData()
            },
            error => {
              this.notification.openSnackBar(error.error.message)
              this.drawer.setDrawer(false)
              this.dialog.closeAll()
            }
          )
      }
    )
    this.subscriptionXY.unsubscribe()
  }

  correctData(): void {
    this.subscriptionZX = this.accountService.activeAccountId$.subscribe(
      data => {
        this.activeAccountId = data
        this.accountsList.forEach((key: any, index: number) => {
          if (key._id === this.activeAccountId) {
            this.data.type === 'income'
              ? (this.accountsList[index].cash -= this.data.amount)
              : (this.accountsList[index].cash += this.data.amount)
            this.userService.setAccountList(this.accountsList)
          }
        })
      }
    )
    this.requestTransactionList(this.activeAccountId)
  }
  deleteAccount(): void {
    this.subscriptionX = this.accountService
      .deleteAccount(this.tokenService.getUser().id, this.data._id)
      .subscribe(data => {
        this.notification.openSnackBar(data.message)
        this.userService.setAccountList(
          this.accountsList.filter(key => {
            return key._id !== this.data._id
          })
        )
        this.requestTransactionList(this.accountsList[0]._id)
        this.accountService.setActiveAccountId(this.accountsList[0]._id)
        this.drawer.setDrawer(false)
        this.dialog.closeAll()
      })
  }

  deleteCategory(): void {
    this.userService.deleteCategory(this.data._id).subscribe(data => {
      this.userService.setCategories(data)
      this.notification.openSnackBar('Successfully deleted!')
      this.dialog.closeAll()
    })
  }

  delete(): void {
    if (this.data.purpose === 'deleteAccount') {
      this.deleteAccount()
    } else if (this.data.purpose === 'deleteTransaction') {
      this.deleteTransaction()
    } else {
      this.deleteCategory()
    }
  }

  requestTransactionList(_id: string): void {
    this.subscriptionY?.unsubscribe()
    this.subscriptionY = this.homeService
      .requestTransactionList(_id)
      .subscribe(data => {
        this.homeService.setTransactionsList(data)
      })
  }

  ngOnInit(): void {
    this.subscription = this.userService.accountsList$.subscribe(data => {
      this.accountsList = data
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
    this.subscriptionX?.unsubscribe()
    this.subscriptionZ?.unsubscribe()
    this.subscriptionZX?.unsubscribe()
    this.subscriptionXY?.unsubscribe()
    this.subscriptionY?.unsubscribe()
  }
}
