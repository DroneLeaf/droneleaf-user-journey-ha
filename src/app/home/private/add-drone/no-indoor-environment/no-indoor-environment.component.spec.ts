import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoIndoorEnvironmentComponent } from './no-indoor-environment.component';

describe('NoIndoorEnvironmentComponent', () => {
  let component: NoIndoorEnvironmentComponent;
  let fixture: ComponentFixture<NoIndoorEnvironmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NoIndoorEnvironmentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoIndoorEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
