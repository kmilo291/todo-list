import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-category-create-modal',
  templateUrl: './category-create-modal.component.html',
  styleUrls: ['./category-create-modal.component.scss'],
  standalone: false
})
export class CategoryCreateModalComponent {
  name: string = '';
  color: string = '#A3CEF1';

  pastelColors: string[] = [
    '#A3CEF1', '#FFB4B4', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#B5EAD7', '#a9d4e3', '#C9C9FF', '#E7C6FF', '#FFB5E8', '#FFDAC1', '#B6DCFE', '#C4FAF8'
  ];

  constructor(private modalCtrl: ModalController) {}

  confirm() {
    this.modalCtrl.dismiss({ name: this.name, color: this.color });
  }

  close() {
    this.modalCtrl.dismiss(null);
  }
}
