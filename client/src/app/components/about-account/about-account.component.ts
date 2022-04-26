import { Component, OnInit } from '@angular/core'
import { AccountService } from '../../services/account.service'
import { DrawerService } from '../../services/drawer.service'
import { MatDialog } from '@angular/material/dialog'
import { ModalWindowComponent } from '../modal-window/modal-window.component'
import { Account } from '../../models/account.model'

@Component({
  selector: 'app-about-account',
  templateUrl: './about-account.component.html',
  styleUrls: ['./about-account.component.scss']
})
export class AboutAccountComponent implements OnInit {
  accountInfo?: Account
  constructor(
    private accountService: AccountService,
    public drawer: DrawerService,
    public dialog: MatDialog
  ) {}

  deleteAccount(): void {
    this.dialog.open(ModalWindowComponent, {
      data: {
        purpose: 'deleteAccount',
        _id: this.accountInfo?._id
      },
      disableClose: true,
      panelClass: 'custom-modal'
    })
  }
  editAccount(): void {
    this.drawer.setDrawer(false)
    setTimeout(() => {
      this.drawer.setDrawer(true, 'edit-account')
    }, 300)
  }
  ngOnInit(): void {
    this.accountService.accountInfo$.subscribe((data: Account) => {
      this.accountInfo = data
    })
  }
}
