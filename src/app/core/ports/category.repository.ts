import { Category } from '../models/category.model';

export abstract class CategoryRepository {
  abstract getAll(): Promise<Category[]>;
  abstract save(category: Category): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
