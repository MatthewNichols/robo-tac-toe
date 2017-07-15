import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSettingsDialogComponent } from './app-settings-dialog.component';

describe('AppSettingsDialogComponent', () => {
  let component: AppSettingsDialogComponent;
  let fixture: ComponentFixture<AppSettingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSettingsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
