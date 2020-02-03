import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TurnoPage } from './turno.page';

describe('TurnoPage', () => {
  let component: TurnoPage;
  let fixture: ComponentFixture<TurnoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TurnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
