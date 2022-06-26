import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestButtonComponent } from './request-button.component';
import { SharedModule } from '../../shared.module';

describe('RequestButtonComponent', () => {
  let component: RequestButtonComponent;
  let fixture: ComponentFixture<RequestButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
