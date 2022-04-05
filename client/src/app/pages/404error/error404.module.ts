import { NgModule } from '@angular/core'
import { Error404Component } from './error404.component'
import { MatButtonModule } from '@angular/material/button'
import { AppRoutingModule } from '../../app-routing.module'

@NgModule({
  declarations: [Error404Component],
  imports: [MatButtonModule, AppRoutingModule],
  providers: []
})
export class Error404Module {}
