import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DrawerService } from './drawer.service'

describe('DrawerService', () => {
  let service: DrawerService
  let fixture: ComponentFixture<DrawerService>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawerService]
    })
  })

  it('opening drawer', () => {
    let drawerService = TestBed.get(DrawerService)

    spyOn(drawerService, 'getData').and.callThrough()

    let a = drawerService.setDrawer(true, 'add-transaction')

    expect(a).toBe(drawerService.drawer$ === true, 'should be false')
  })
})
