import { Injectable } from '@angular/core';
import { CategoryRepository } from '../ports/category.repository';
import { TodoRepository } from '../ports/todo.repository';
import { IdGeneratorPort } from '../ports/id-generator.port';
import { Result } from '../models/shared/result.model';

@Injectable({ providedIn: 'root' })
export class SeedData {

  constructor(
    private categoryRepo: CategoryRepository,
    private todoRepo: TodoRepository,
    private idGenerator: IdGeneratorPort
  ) {}

  async execute(): Promise<Result<void>> {

    const existing = await this.categoryRepo.getAll();

    if (existing.length > 0) {
      return {
        success: false,
        error: 'Ya existen datos en el sistema'
      };
    }

    const categories = [
      { id: this.idGenerator.generate(), name: 'Trabajo', color: '#A3CEF1' },
      { id: this.idGenerator.generate(), name: 'Personal', color: '#FFB4B4' },
      { id: this.idGenerator.generate(), name: 'Estudio', color: '#C9C9FF' }
    ];

    for (const category of categories) {
      await this.categoryRepo.save(category);
    }

    const todos = [
      {
        id: this.idGenerator.generate(),
        title: 'Aprender Clean Architecture',
        completed: false,
        categoryId: categories[2].id
      },
      {
        id: this.idGenerator.generate(),
        title: 'Preparar reunión',
        completed: false,
        categoryId: categories[0].id
      },
      {
        id: this.idGenerator.generate(),
        title: 'Ir al gimnasio',
        completed: true,
        categoryId: categories[1].id
      }
    ];

    for (const todo of todos) {
      await this.todoRepo.save(todo);
    }

    return { success: true };
  }
}
