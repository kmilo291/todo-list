export abstract class HeavyTaskPort {
  abstract calculateSqrt(
    n: number,
    onProgress?: (value: number) => void
  ): Promise<number>;
}
