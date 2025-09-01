import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetupFunctionalSwitchComponent } from './setup-functional-switch.component';

describe('SetupFunctionalSwitchComponent', () => {
  let component: SetupFunctionalSwitchComponent;
  let fixture: ComponentFixture<SetupFunctionalSwitchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupFunctionalSwitchComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetupFunctionalSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
