import { Component } from '@angular/core'
import { Categories } from '../../models/categories.model'
import { categories } from '../../helpers/categories.data'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: Categories[] = categories
}
