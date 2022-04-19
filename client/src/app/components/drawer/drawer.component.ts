import { Component, OnDestroy, OnInit } from '@angular/core'
import { DrawerService } from '../../services/drawer.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit, OnDestroy {
  drawerComponent: boolean = false
  component: string = ''
  subscription?: Subscription
  subscriptionX?: Subscription
  constructor(public drawer: DrawerService) {}

  ngOnInit(): void {
    this.subscription = this.drawer.drawer$.subscribe((data: boolean) => {
      this.drawerComponent = data
    })
    this.subscriptionX = this.drawer.component$.subscribe((data: string) => {
      this.component = data
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
    this.subscriptionX?.unsubscribe()
  }
}
