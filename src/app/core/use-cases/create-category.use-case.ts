import { Injectable } from '@angular/core';
import { CategoryRepository } from '../ports/category.repository';
import { Category } from '../models/shared/category.model';
import { CreateCategoryDto } from '../models/dtos/create-category.dto';

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
