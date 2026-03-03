import { Injectable } from '@angular/core';
import { HeavyTaskPort } from '../ports/heavy-task.port';


@Injectable({ providedIn: 'root' })
export class ExecuteHeavyTask {

  constructor(private heavyTask: HeavyTaskPort) {}

  async execute(n: number): Promise<number> {
    return this.heavyTask.calculateSqrt(n);
  }
}
