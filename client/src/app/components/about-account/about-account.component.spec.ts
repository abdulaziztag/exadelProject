import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AboutAccountComponent } from './about-account.component'

describe('AboutAccountComponent', () => {
  let component: AboutAccountComponent
  let fixture: ComponentFixture<AboutAccountComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutAccountComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutAccountComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
