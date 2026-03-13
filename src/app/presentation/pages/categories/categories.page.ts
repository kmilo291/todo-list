import { GetCategories } from 'src/app/core/use-cases/get-categories.use-case';
import { CreateCategory } from 'src/app/core/use-cases/create-category.use-case';
import { Category } from 'src/app/core/models/shared/category.model';
import { Component } from '@angular/core';
import { DeleteCategory } from 'src/app/core/use-cases/delete-category.use-case';
import { ToastService } from '../../services/toast.service';
import { ModalController } from '@ionic/angular';
import { CategoryCreateModalComponent } from './category-create-modal.component';



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
      component: CategoryCreateModalComponent
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
}
