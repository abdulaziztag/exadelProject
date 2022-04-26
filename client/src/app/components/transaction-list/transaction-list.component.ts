import { Component, OnDestroy, OnInit } from '@angular/core'
import { Transaction } from '../../models/transaction.model'
import { HomeService } from '../../services/home.service'
import { Subscription } from 'rxjs'
import { AccountService } from '../../services/account.service'
import { DrawerService } from '../../services/drawer.service'

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnDestroy {
  transactionList: any = []
  transactionListCopy: any = []
  search: string = ''
  subscription?: Subscription
  subscriptionX?: Subscription
  constructor(private homeService: HomeService, public drawer: DrawerService) {}

  ngOnInit(): void {
    this.subscription = this.homeService.transactionsList$.subscribe(
      (data: any) => {
        this.transactionList = data
        this.transactionListCopy = data
      }
    )
    this.subscriptionX = this.homeService.sortByType$.subscribe(
      (data: string) => {
        if (data === 'income') {
          this.transactionList = this.transactionListCopy
          this.transactionList = this.transactionList.filter(
            (key: any) => key.typeOfTransaction === 'income'
          )
        } else if (data === 'expenses') {
          this.transactionList = this.transactionListCopy
          this.transactionList = this.transactionList.filter(
            (key: any) => key.typeOfTransaction === 'expenses'
          )
        } else {
          this.transactionList = this.transactionListCopy
        }
      }
    )
  }

  searchHandler(): void {
    this.transactionList = this.transactionListCopy.filter(
      (key: { title: string }) => {
        return key.title.toLowerCase().includes(this.search.toLowerCase())
      }
    )
  }

  sortByDate(): void {
    this.transactionList = this.transactionList.reverse()
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
    this.subscriptionX?.unsubscribe()
  }
}
