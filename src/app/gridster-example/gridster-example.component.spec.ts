import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridsterExampleComponent } from './gridster-example.component';

describe('GridsterExampleComponent', () => {
  let component: GridsterExampleComponent;
  let fixture: ComponentFixture<GridsterExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridsterExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridsterExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
