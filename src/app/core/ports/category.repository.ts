import { Category } from '../models/shared/category.model';

export abstract class CategoryRepository {
  abstract getAll(): Promise<Category[]>;
  abstract save(category: Category): Promise<void>;
  abstract delete(id: number): Promise<void>;
  abstract update(category: Category): Promise<void>;
}
