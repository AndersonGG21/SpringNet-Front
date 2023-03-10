import { TestBed } from '@angular/core/testing';

import { PostDataBehaviorSubjectService } from './post-data-behavior-subject.service';

describe('PostDataBehaviorSubjectService', () => {
  let service: PostDataBehaviorSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostDataBehaviorSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
