import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ObrasocialPage } from './obrasocial.page';

describe('ObrasocialPage', () => {
  let component: ObrasocialPage;
  let fixture: ComponentFixture<ObrasocialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObrasocialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ObrasocialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
