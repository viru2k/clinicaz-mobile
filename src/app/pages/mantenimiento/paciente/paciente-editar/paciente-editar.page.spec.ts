import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PacienteEditarPage } from './paciente-editar.page';

describe('PacienteEditarPage', () => {
  let component: PacienteEditarPage;
  let fixture: ComponentFixture<PacienteEditarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteEditarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
