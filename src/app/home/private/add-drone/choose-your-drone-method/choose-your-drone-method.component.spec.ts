import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChooseYourDroneMethodComponent } from './choose-your-drone-method.component';

describe('ChooseYourDroneMethodComponent', () => {
  let component: ChooseYourDroneMethodComponent;
  let fixture: ComponentFixture<ChooseYourDroneMethodComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseYourDroneMethodComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseYourDroneMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
