import { TestBed } from '@angular/core/testing';

import { JeuServiceService } from './jeu-service.service';
import { VoteService } from './vote.service';

describe('JeuServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoteService = TestBed.get(JeuServiceService);
    expect(service).toBeTruthy();
  });
});
