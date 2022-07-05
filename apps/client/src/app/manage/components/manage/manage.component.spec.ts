import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageModule } from '../../manage.module';
import { ManageComponent } from './manage.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManageComponent', () => {
  let component: ManageComponent;
  let fixture: ComponentFixture<ManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
