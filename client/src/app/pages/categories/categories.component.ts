import { Component } from '@angular/core'

interface Categories {
  type: string
  category: string
}
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: Categories[] = [
    {
      type: 'expenses',
      category: 'Home'
    },
    {
      type: 'income',
      category: 'Salary'
    },
    {
      type: 'income',
      category: 'Debt'
    },
    {
      type: 'expenses',
      category: 'Shopping'
    },
    {
      type: 'income',
      category: 'Fun'
    },
    {
      type: 'expenses',
      category: 'Pet food'
    },
    {
      type: 'expenses',
      category: 'Subscriptions'
    },
    {
      type: 'expenses',
      category: 'Cinema'
    },
    {
      type: 'expenses',
      category: 'Music'
    }
  ]
}
