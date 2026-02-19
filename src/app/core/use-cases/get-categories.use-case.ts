import { Injectable } from '@angular/core';
import { CategoryRepository } from '../ports/category.repository';
import { Category } from '../models/shared/category.model';

@Injectable({ providedIn: 'root' })
export class GetCategories {

  constructor(private repo: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    return this.repo.getAll();
  }
}
