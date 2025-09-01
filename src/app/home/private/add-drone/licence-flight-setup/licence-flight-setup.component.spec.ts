import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LicenceFlightSetupComponent } from './licence-flight-setup.component';

describe('LicenceFlightSetupComponent', () => {
  let component: LicenceFlightSetupComponent;
  let fixture: ComponentFixture<LicenceFlightSetupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenceFlightSetupComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LicenceFlightSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
