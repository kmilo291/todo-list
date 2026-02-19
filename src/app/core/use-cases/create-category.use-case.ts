import { Injectable } from '@angular/core';
import { CategoryRepository } from '../ports/category.repository';
import { Category } from '../models/category.model';

export interface CreateCategoryDto {
  name: string;
  color: string;
}

@Injectable({ providedIn: 'root' })
export class CreateCategory {

  constructor(private repo: CategoryRepository) {}

  async execute(data: CreateCategoryDto): Promise<void> {

    const category: Category = {
      id: Date.now(),
      ...data
    };

    await this.repo.save(category);
  }
}
