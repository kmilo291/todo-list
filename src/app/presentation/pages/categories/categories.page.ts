import { GetCategories } from 'src/app/core/use-cases/get-categories.use-case';
import { CreateCategory } from 'src/app/core/use-cases/create-category.use-case';
import { Category } from 'src/app/core/models/shared/category.model';
import { Component } from '@angular/core';
import { DeleteCategory } from 'src/app/core/use-cases/delete-category.use-case';
import { ToastService } from '../../services/toast.service';



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
    private deleteCategory: DeleteCategory,
    private toastSrv: ToastService
  ) {}

  async ionViewWillEnter() {
    this.categories = await this.getCategories.execute();
  }

  async loadCategories() {
    this.categories = await this.getCategories.execute();
  }

  async addCategory() {

    await this.createCategory.execute({
      name: 'Nueva categoría ' + crypto.randomUUID().replace(/-/g, '').slice(-6), //FIXME - arreglar formato fecha
      color: '#3498db'
    });
    this.categories = await this.getCategories.execute();

    console.log("categorias", this.categories);
  }

    async delete(idCategory: number){
    const result = await this.deleteCategory.execute({ id: idCategory });

    if (!result.success) {
      console.error(result.error);
      this.toastSrv.error(result.error ?? "Error general");
      return;
    }

    await this.loadCategories();
  }
}
