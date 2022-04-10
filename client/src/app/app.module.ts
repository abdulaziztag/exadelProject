import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http'
import { authInterceptorProviders } from './helpers/auth.interceptor'

// Components
import { Error404Component } from './pages/404error/error404.component'
import { LoginComponent } from './pages/login/login.component'
import { CategoriesComponent } from './pages/categories/categories.component'
import { ObligatoryComponent } from './pages/obligatory/obligatory.component'
import { StatisticsComponent } from './pages/statistics/statistics.component'
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component'
import { MatCardModule } from '@angular/material/card'
import { GradientCardComponent } from './components/gradient-card/gradient-card.component'
import { HomeComponent } from './pages/home/home.component'
import { TransactionListComponent } from './components/transaction-list/transaction-list.component'
import { HandlersComponent } from './components/handlers/handlers.component'

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    LoginComponent,
    CategoriesComponent,
    ObligatoryComponent,
    StatisticsComponent,
    GradientCardComponent,
    HomeComponent,
    SubscriptionsComponent,
    TransactionListComponent,
    HandlersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatCardModule
  ],
  providers: [authInterceptorProviders],
  exports: [GradientCardComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
