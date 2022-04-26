import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AboutTransactionComponent } from './about-transaction.component'

describe('AboutTransactionComponent', () => {
  let component: AboutTransactionComponent
  let fixture: ComponentFixture<AboutTransactionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutTransactionComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutTransactionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
