import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoriaClinicaPage } from './historia-clinica.page';

describe('HistoriaClinicaPage', () => {
  let component: HistoriaClinicaPage;
  let fixture: ComponentFixture<HistoriaClinicaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriaClinicaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoriaClinicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
