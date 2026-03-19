import { Category } from 'src/app/core/models/shared/category.model';
import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ModalController, AlertController } from '@ionic/angular';
import { CategoryChangeModalComponent } from './category-change-modal.component';
import { CategoriesFacade } from '../../facades/categories.facade';
import { TodoEventsService } from '../../services/todo-events.service';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  standalone: false
})
export class CategoriesPage {

  categories: Category[] = [];
  searchTerm: string = '';
  filteredCategories: Category[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private categoriesFacade: CategoriesFacade,
    private toastSrv: ToastService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private events: TodoEventsService
  ) {}

  async ionViewWillEnter() {
    console.log('Entering CategoriesPage, loading categories...');
    await this.loadCategories();

    this.events.tabChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadCategories();
      });
  }

  ionViewWillLeave() {
    console.log('Leaving CategoriesPage, cancelling requests and cleaning up...');
    this.events.cancelRequests();

    this.destroy$.next();
    this.destroy$.complete();
  }

  async loadCategories() {
    this.categories = await this.categoriesFacade.getAll();
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
      await this.categoriesFacade.create(data.name, data.color);
      await this.loadCategories();
    }
  }

  async delete(idCategory: number){

    const category = this.categories.find(c => c.id === idCategory);

    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Deseas eliminar la categoría ${category?.name}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {

            const result = await this.categoriesFacade.delete(idCategory);

            if (!result.success) {
              this.toastSrv.error(result.error ?? "Error general");
              return;
            }

            await this.loadCategories();
          }
        }
      ]
    });

    await alert.present();
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

    const result = await this.categoriesFacade.update({
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
