import { Component } from '@angular/core';
import { CategoryRepository } from 'src/app/core/ports/category.repository';
import { Category } from 'src/app/core/models/category.model';

@Component({
  standalone: true,
  selector: 'app-categories',
  templateUrl: './categories.page.html',
})
export class CategoriesPage {

  categories: Category[] = [];

  constructor(private repo: CategoryRepository) {}

  async ionViewWillEnter() {
    this.categories = await this.repo.getAll();
  }

  async addCategory() {
    const newCategory: Category = {
      id: Date.now(),
      name: 'Nueva categoría',
      color: '#3498db'
    };

    await this.repo.save(newCategory);
    this.categories = await this.repo.getAll();
  }
}
