import { Injectable } from '@angular/core';
import { HeavyTaskPort } from '../ports/heavy-task.port';


@Injectable({ providedIn: 'root' })
export class ExecuteHeavyTask {

  constructor(private heavyTask: HeavyTaskPort) {}

  async execute(
    n: number,
    onProgress?: (value: number) => void
  ): Promise<number> {

    return this.heavyTask.calculateSqrt(n, onProgress);
  }
}
