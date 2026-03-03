import { Injectable } from '@angular/core';
import { HeavyTaskPort } from 'src/app/core/ports/heavy-task.port';

@Injectable()
export class WorkerHeavyTaskAdapter implements HeavyTaskPort {

  calculateSqrt(
    n: number,
    onProgress?: (value: number) => void
  ): Promise<number> {

    return new Promise((resolve) => {

      const worker = new Worker(
        new URL('./sqrt.worker', import.meta.url),
        { type: 'module' }
      );

      worker.onmessage = ({ data }) => {

        if (data.progress !== undefined) {
          onProgress?.(data.progress);
        }

        if (data.done) {
          resolve(data.result);
          worker.terminate();
        }
      };

      worker.postMessage(n);
    });
  }
}
