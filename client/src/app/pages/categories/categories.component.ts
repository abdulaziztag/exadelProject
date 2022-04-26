import { Component, OnDestroy, OnInit } from '@angular/core'
import { Categories } from '../../models/categories.model'
import { UserService } from '../../services/user.service'
import { Subscription } from 'rxjs'
import { NotificationService } from '../../services/notification.service'
import { DrawerService } from '../../services/drawer.service'
import { MatDialog } from '@angular/material/dialog'
import { ModalWindowComponent } from '../../components/modal-window/modal-window.component'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Categories[] = []
  categoriesCopy: Categories[] = []
  search: string = ''
  sortButtons: string = ''
  subscription?: Subscription
  subscriptionX?: Subscription

  constructor(
    private userService: UserService,
    public drawer: DrawerService,
    public dialog: MatDialog
  ) {}

  deleteCategory(_id: string) {
    this.dialog.open(ModalWindowComponent, {
      data: {
        purpose: 'deleteCategory',
        _id
      },
      disableClose: true,
      panelClass: 'custom-modal'
    })
  }

  sortByType(type: string) {
    if (this.sortButtons === type) {
      this.sortButtons = ''
      this.categories = this.categoriesCopy
    } else {
      this.sortButtons = type
      this.categories = this.categoriesCopy.filter((key: any) => {
        return key.typeOfCategory === type
      })
    }
  }

  searchHandler(): void {
    this.categories = this.categoriesCopy.filter(
      (key: { categoryName: string }) => {
        return key.categoryName
          .toLowerCase()
          .includes(this.search.toLowerCase())
      }
    )
  }

  ngOnInit(): void {
    this.subscription = this.userService.categories$.subscribe(data => {
      this.categories = data
      this.categoriesCopy = data
    })
    this.subscriptionX = this.userService.getCategories().subscribe(data => {
      this.userService.setCategories(data)
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
    this.subscriptionX?.unsubscribe()
  }
}
