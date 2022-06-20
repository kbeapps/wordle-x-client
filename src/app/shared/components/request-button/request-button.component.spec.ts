import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/core';
import { RequestButtonComponent } from './request-button.component';

describe('RequestButtonComponent', () => {
  let component: RequestButtonComponent;
  let fixture: ComponentFixture<RequestButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [RequestButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
