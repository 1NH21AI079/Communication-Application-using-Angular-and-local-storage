import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsManagement } from './docs-management';

describe('DocsManagement', () => {
  let component: DocsManagement;
  let fixture: ComponentFixture<DocsManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocsManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
