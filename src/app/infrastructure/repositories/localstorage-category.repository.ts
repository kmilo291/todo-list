import { Injectable } from '@angular/core';
import { CategoryRepository } from 'src/app/core/ports/category.repository';
import { Category } from 'src/app/core/models/category.model';

@Injectable()
export class LocalStorageCategoryRepository implements CategoryRepository {

  private storageKey = 'categories';

  async getAll(): Promise<Category[]> {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  async save(category: Category): Promise<void> {
    const categories = await this.getAll();
    localStorage.setItem(
      this.storageKey,
      JSON.stringify([...categories, category])
    );
  }

  async delete(id: number): Promise<void> {
    const categories = await this.getAll();
    const filtered = categories.filter(c => c.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
  }
}
