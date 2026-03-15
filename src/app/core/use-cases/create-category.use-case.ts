import { Injectable } from '@angular/core';
import { CategoryRepository } from '../ports/category.repository';
import { Category } from '../models/shared/category.model';
import { CreateCategoryDto } from '../models/dtos/create-category.dto';
import { IdGeneratorPort } from '../ports/id-generator.port';

@Injectable({ providedIn: 'root' })
export class CreateCategory {

  constructor(
    private repo: CategoryRepository,
    private idGenerator: IdGeneratorPort
  ) {}

  async execute(data: CreateCategoryDto): Promise<void> {

    if (!data.name.trim()) {
      throw new Error('Nombre inválido');
    }

    const category: Category = {
      id: this.idGenerator.generate(),
      ...data
    };

    await this.repo.save(category);
  }
}
