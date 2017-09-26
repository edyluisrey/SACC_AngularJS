import { TestBed, inject } from '@angular/core/testing';

import { DbAnimalService } from './dbAnimal.service';

describe('DbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbAnimalService]
    });
  });

  it('should be created', inject([DbAnimalService], (service: DbAnimalService) => {
    expect(service).toBeTruthy();
  }));
});
