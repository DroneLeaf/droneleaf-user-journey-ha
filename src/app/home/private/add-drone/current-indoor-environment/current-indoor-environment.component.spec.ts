import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CurrentIndoorEnvironmentComponent } from './current-indoor-environment.component';

describe('CurrentIndoorEnvironmentComponent', () => {
  let component: CurrentIndoorEnvironmentComponent;
  let fixture: ComponentFixture<CurrentIndoorEnvironmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentIndoorEnvironmentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentIndoorEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
