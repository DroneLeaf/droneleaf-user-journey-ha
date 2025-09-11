import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndoorPreFlightProcessComponent } from './indoor-pre-flight-process.component';

describe('IndoorPreFlightProcessComponent', () => {
  let component: IndoorPreFlightProcessComponent;
  let fixture: ComponentFixture<IndoorPreFlightProcessComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IndoorPreFlightProcessComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndoorPreFlightProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
