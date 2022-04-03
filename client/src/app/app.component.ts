import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuItems = [
    {
      title: 'Categories',
      link: '/categories'
    },
    {
      title: 'Subscriptions',
      link: '/subscriptions'
    },
    {
      title: 'Obligatory',
      link: '/obligatory'
    },
    {
      title: 'Statistics',
      link: '/statistics'
    },
    {
      title: 'Admin',
      link: '/admin'
    }
  ]
}
