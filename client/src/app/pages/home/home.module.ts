import { NgModule } from '@angular/core'
import { HomeComponent } from './home.component'
import { MatButtonModule } from '@angular/material/button'
import { GradientCardComponent } from '../../components/gradient-card/gradient-card.component'

@NgModule({
  declarations: [HomeComponent, GradientCardComponent],
  imports: [MatButtonModule],
  providers: [HomeModule]
})
export class HomeModule {}
