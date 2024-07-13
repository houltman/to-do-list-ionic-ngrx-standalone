import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmDeleteTaskComponent } from './confirm-delete-task.component';

describe('ConfirmDeleteTaskComponent', () => {
  let component: ConfirmDeleteTaskComponent;
  let fixture: ComponentFixture<ConfirmDeleteTaskComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteTaskComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
