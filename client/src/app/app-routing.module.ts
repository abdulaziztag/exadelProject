import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { Error404Component } from './pages/404error/error404.component'
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component'
import { StatisticsComponent } from './pages/statistics/statistics.component'
import { ObligatoryComponent } from './pages/obligatory/obligatory.component'
import { CategoriesComponent } from './pages/categories/categories.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent
  },
  {
    path: 'obligatory',
    component: ObligatoryComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: '**',
    component: Error404Component
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
