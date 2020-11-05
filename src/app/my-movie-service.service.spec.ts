import { TestBed } from '@angular/core/testing';

import { MyMovieServiceService } from './my-movie-service.service';

describe('MyMovieServiceService', () => {
  let service: MyMovieServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyMovieServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
