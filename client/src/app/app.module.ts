import { NgModule, LOCALE_ID } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http'
import { authInterceptorProviders } from './helpers/auth.interceptor'

import { registerLocaleData } from '@angular/common'
import localeFr from '@angular/common/locales/fr'
registerLocaleData(localeFr)

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
import { DateFromNumberPipe } from './pipes/date.pipe'
import { DrawerComponent } from './components/drawer/drawer.component'
import { MatSidenavModule } from '@angular/material/sidenav'
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { AboutTransactionComponent } from './components/about-transaction/about-transaction.component'
import { AboutAccountComponent } from './components/about-account/about-account.component'
import { AddAccountComponent } from './components/add-account/add-account.component'
import { MatDialogModule } from '@angular/material/dialog'
import { ModalWindowComponent } from './components/modal-window/modal-window.component'
import { EditAccountComponent } from './components/edit-account/edit-account.component'
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component'
import { AddCategoryComponent } from './components/add-category/add-category.component'
import { MatTableModule } from '@angular/material/table'
import { MatMenuModule } from '@angular/material/menu'
import { MatFormFieldModule } from '@angular/material/form-field'
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
    HandlersComponent,
    DateFromNumberPipe,
    DrawerComponent,
    AddTransactionComponent,
    AboutTransactionComponent,
    AboutAccountComponent,
    AddAccountComponent,
    ModalWindowComponent,
    EditAccountComponent,
    EditTransactionComponent,
    AddCategoryComponent
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
    MatCardModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule
  ],
  providers: [
    authInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'en-EN' }
  ],
  exports: [GradientCardComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
