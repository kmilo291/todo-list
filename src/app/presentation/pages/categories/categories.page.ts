import { GetCategories } from 'src/app/core/use-cases/get-categories.use-case';
import { CreateCategory } from 'src/app/core/use-cases/create-category.use-case';
import { Category } from 'src/app/core/models/shared/category.model';
import { Component } from '@angular/core';
import { DeleteCategory } from 'src/app/core/use-cases/delete-category.use-case';
import { ToastService } from '../../services/toast.service';
import { ModalController } from '@ionic/angular';
import { CategoryChangeModalComponent } from './category-change-modal.component';
import { UpdateCategory } from 'src/app/core/use-cases/update-category.use-case';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  standalone: false
})
export class CategoriesPage {

  categories: Category[] = [];
  searchTerm: string = '';
  filteredCategories: Category[] = [];

  constructor(
    private getCategories: GetCategories,
    private createCategory: CreateCategory,
    private deleteCategory: DeleteCategory,
    private updateCategory: UpdateCategory,
    private toastSrv: ToastService,
    private modalCtrl: ModalController
  ) {}

  async ionViewWillEnter() {
    this.categories = await this.getCategories.execute();
    this.filteredCategories = this.categories;
  }

  async loadCategories() {
    this.categories = await this.getCategories.execute();
    this.filterCategories();
  }

  filterCategories() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCategories = this.categories.filter(cat =>
      cat.name.toLowerCase().includes(term)
    );
  }

  async addCategory() {
    const modal = await this.modalCtrl.create({
      component: CategoryChangeModalComponent,
      componentProps: {
          categories: this.categories,
          isNew: true
        }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data && data.name && data.color) {
      await this.createCategory.execute({ name: data.name, color: data.color });
      await this.loadCategories();
    }
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

  async openUpdateCategoryModal(category: Category) {

    const modal = await this.modalCtrl.create({
      component: CategoryChangeModalComponent,
      componentProps: {
        categories: this.categories,
        selectedCategoryId: category.id,
        categoryTitle: category.name,
        categoryColor: category.color,
        isNew: false
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (!data) return;

    const result = await this.updateCategory.execute({
      id: category.id,
      name: data.name,
      color: data.color
    });

    if (!result.success) {
      this.toastSrv.error(result.error ?? "Error general");
      return;
    }

    await this.loadCategories();
  }
}
