import { TestBed } from '@angular/core/testing';

import { AttachmentStyle } from './attachment-style';

describe('AttachmentStyle', () => {
  let service: AttachmentStyle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttachmentStyle);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
