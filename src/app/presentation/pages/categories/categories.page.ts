import { GetCategories } from 'src/app/core/use-cases/get-categories.use-case';
import { CreateCategory } from 'src/app/core/use-cases/create-category.use-case';
import { Category } from 'src/app/core/models/category.model';

export class CategoriesPage {

  categories: Category[] = [];

  constructor(
    private getCategories: GetCategories,
    private createCategory: CreateCategory
  ) {}

  async ionViewWillEnter() {
    this.categories = await this.getCategories.execute();
  }

  async addCategory() {

    await this.createCategory.execute({
      name: 'Nueva categoría',
      color: '#3498db'
    });
    this.categories = await this.getCategories.execute();
  }
}
