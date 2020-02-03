import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoriaClinicaBuscarPage } from './historia-clinica-buscar.page';

describe('HistoriaClinicaBuscarPage', () => {
  let component: HistoriaClinicaBuscarPage;
  let fixture: ComponentFixture<HistoriaClinicaBuscarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriaClinicaBuscarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoriaClinicaBuscarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
