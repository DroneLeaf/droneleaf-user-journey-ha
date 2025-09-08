import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RCSetupSwitchBComponent } from './rc-setup-switch-b.component';

describe('RCSetupSwitchBComponent', () => {
  let component: RCSetupSwitchBComponent;
  let fixture: ComponentFixture<RCSetupSwitchBComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RCSetupSwitchBComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RCSetupSwitchBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
