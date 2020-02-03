import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoriaClinicaNuevoPage } from './historia-clinica-nuevo.page';

describe('HistoriaClinicaNuevoPage', () => {
  let component: HistoriaClinicaNuevoPage;
  let fixture: ComponentFixture<HistoriaClinicaNuevoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriaClinicaNuevoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoriaClinicaNuevoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
