import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeManagerDialogComponent } from './code-manager-dialog.component';

describe('CodeManagerDialogComponent', () => {
  let component: CodeManagerDialogComponent;
  let fixture: ComponentFixture<CodeManagerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeManagerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeManagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
