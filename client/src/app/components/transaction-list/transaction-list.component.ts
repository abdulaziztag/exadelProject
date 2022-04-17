import { Component, OnDestroy, OnInit } from '@angular/core'
import { Transaction } from '../../models/transaction.model'
import { HomeService } from '../../services/home.service'
import { Subscription } from 'rxjs'
import { AccountService } from '../../services/account.service'

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnDestroy {
  transactionList: any = []
  subscription?: Subscription
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.subscription = this.homeService.transactionsList$.subscribe(
      (data: any) => {
        this.transactionList = data
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
