import { Component, OnDestroy, OnInit } from '@angular/core'
import { DrawerService } from '../../services/drawer.service'
import { Subscription } from 'rxjs'
import { Transaction } from '../../models/transaction.model'
import { MatDialog } from '@angular/material/dialog'
import { ModalWindowComponent } from '../modal-window/modal-window.component'

@Component({
  selector: 'app-about-transaction',
  templateUrl: './about-transaction.component.html',
  styleUrls: ['./about-transaction.component.scss']
})
export class AboutTransactionComponent implements OnInit, OnDestroy {
  subscription?: Subscription
  transaction?: Transaction
  constructor(public drawer: DrawerService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.subscription = this.drawer.transaction$.subscribe(data => {
      this.transaction = data
    })
  }

  editTransaction(): void {
    this.drawer.setDrawer(false)
    setTimeout(() => {
      this.drawer.setDrawer(true, 'edit-transaction', this.transaction)
    }, 300)
  }

  deleteTransaction(): void {
    this.dialog.open(ModalWindowComponent, {
      data: {
        purpose: 'deleteTransaction',
        _id: this.transaction?._id,
        type: this.transaction?.typeOfTransaction,
        amount: this.transaction?.cash
      },
      disableClose: true,
      panelClass: 'custom-modal'
    })
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
