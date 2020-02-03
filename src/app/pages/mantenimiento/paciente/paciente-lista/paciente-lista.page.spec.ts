import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PacienteListaPage } from './paciente-lista.page';

describe('PacienteListaPage', () => {
  let component: PacienteListaPage;
  let fixture: ComponentFixture<PacienteListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteListaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
