export abstract class HeavyTaskPort {
  abstract calculateSqrt(n: number): Promise<number>;
}
