import { Injectable } from '@angular/core';
import { IdGeneratorPort } from 'src/app/core/ports/id-generator.port';

@Injectable()
export class UuidIdGeneratorService implements IdGeneratorPort {

  generate(): number {

    const uuid = crypto.randomUUID();

    // Convertimos parte del UUID a número
    return parseInt(uuid.replace(/-/g, '').substring(0, 12), 16);

  }

}
