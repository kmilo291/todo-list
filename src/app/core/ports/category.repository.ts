import { Category } from '../models/entities/category.model';

export abstract class CategoryRepository {
  abstract getAll(): Promise<Category[]>;
  abstract save(category: Category): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
