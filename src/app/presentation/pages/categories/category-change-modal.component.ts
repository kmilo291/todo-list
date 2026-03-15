import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/core/models/shared/category.model';

@Component({
  selector: 'app-category-change-modal',
  templateUrl: './category-change-modal.component.html',
  styleUrls: ['./category-change-modal.component.scss'],
  standalone: false
})
export class CategoryChangeModalComponent {

  @Input() categories: Category[] = [];
  @Input() selectedCategoryId!: number | null;
  @Input() completed!: boolean;
  @Input() isNew: boolean = false;
  @Input() categoryTitle: string = '';
  @Input() categoryColor: string = '#A3CEF1';

  name: string = '';
  color: string = '#A3CEF1';

  pastelColors: string[] = [
    '#A3CEF1', '#FFB4B4', '#FFD6A5', '#FDFFB6', '#CAFFBF',
    '#B5EAD7', '#a9d4e3', '#C9C9FF', '#E7C6FF', '#FFB5E8',
    '#FFDAC1', '#B6DCFE', '#C4FAF8'
  ];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(){
    if (!this.isNew && this.categoryTitle) {
      this.name = this.categoryTitle;
      this.color = this.categoryColor;
    }
  }

  confirm() {
    this.modalCtrl.dismiss({ name: this.name, color: this.color });
  }

  close() {
    this.modalCtrl.dismiss(null);
  }
}
