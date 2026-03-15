import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/core/models/shared/category.model';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
  standalone: false
})
export class CategoryModalComponent {
  @Input() categories: Category[] = [];
  @Input() selectedCategoryId!: number | null;
  @Input() completed!: boolean;
  @Input() isNew: boolean = false;
  @Input() todoTitle: string = '';

  title: string = '';
  showNewCategory: boolean = false;
  newCategoryName: string = '';
  newCategoryColor: string = '#2196f3';

  selectedId!: number | null;
  selectedCompleted!: boolean;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.selectedId = this.selectedCategoryId;
    this.selectedCompleted = this.completed;
    if (!this.isNew && this.todoTitle) {
      this.title = this.todoTitle;
    }
  }

  selectCategory(id: number) {
    this.selectedId = id;
  }

  confirm() {
    this.modalCtrl.dismiss({
      title: this.title,
      categoryId: this.selectedId,
      completed: this.selectedCompleted
    });
  }

  close() {
    this.modalCtrl.dismiss(null);
  }
}
