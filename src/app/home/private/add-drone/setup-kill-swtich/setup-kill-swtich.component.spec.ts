import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetupKillSwtichComponent } from './setup-kill-swtich.component';

describe('SetupKillSwtichComponent', () => {
  let component: SetupKillSwtichComponent;
  let fixture: ComponentFixture<SetupKillSwtichComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupKillSwtichComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetupKillSwtichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
