import { Injectable } from '@angular/core';
import { HeavyTaskPort } from 'src/app/core/ports/heavy-task.port';


@Injectable()
export class WorkerHeavyTaskAdapter implements HeavyTaskPort {

  calculateSqrt(n: number): Promise<number> {

    return new Promise((resolve) => {

      const worker = new Worker(
        new URL('./sqrt.worker', import.meta.url)
      );

      worker.onmessage = ({ data }) => {
        resolve(data);
        worker.terminate();
      };

      worker.postMessage(n);
    });
  }
}
