import { Injectable } from '@angular/core';
import { IdGeneratorPort } from 'src/app/core/ports/id-generator.port';

@Injectable()
export class DateIdGeneratorService implements IdGeneratorPort {

  generate(): number {
    return Date.now();
  }

}
