import { TestBed } from '@angular/core/testing';

import { DbpediaServiceService } from './dbpedia-service.service';

describe('DbpediaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbpediaServiceService = TestBed.get(DbpediaServiceService);
    expect(service).toBeTruthy();
  });
});
