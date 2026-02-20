import { GetCategories } from 'src/app/core/use-cases/get-categories.use-case';
import { CreateCategory } from 'src/app/core/use-cases/create-category.use-case';
import { Category } from 'src/app/core/models/shared/category.model';
import { Component } from '@angular/core';
import { DeleteCategory } from 'src/app/core/use-cases/delete-category.use-case';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  standalone: false
})
export class CategoriesPage {

  categories: Category[] = [];

  constructor(
    private getCategories: GetCategories,
    private createCategory: CreateCategory,
    private deleteCategory: DeleteCategory
  ) {}

  async ionViewWillEnter() {
    this.categories = await this.getCategories.execute();
  }

  async loadCategories() {
    this.categories = await this.getCategories.execute();
  }

  async addCategory() {

    await this.createCategory.execute({
      name: 'Nueva categoría',
      color: '#3498db'
    });
    this.categories = await this.getCategories.execute();
  }

    async delete(idCategory: number){
    const result = await this.deleteCategory.execute({ id: idCategory });

    if (!result.success) {
      console.error(result.error);
      return;
    }

    await this.loadCategories();
  }
}
