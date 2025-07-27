import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentTest } from './attachment-test';

describe('AttachmentTest', () => {
  let component: AttachmentTest;
  let fixture: ComponentFixture<AttachmentTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachmentTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachmentTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
