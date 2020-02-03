import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PacienteBuscarPage } from './paciente-buscar.page';

describe('PacienteBuscarPage', () => {
  let component: PacienteBuscarPage;
  let fixture: ComponentFixture<PacienteBuscarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteBuscarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteBuscarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
