import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {}

  async show(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });

    await toast.present();
  }

  async success(message: string) {
    await this.show(message, 'success');
  }

  async error(message: string) {
    await this.show(message, 'danger');
  }

  async warning(message: string) {
    await this.show(message, 'warning');
  }

  async info(message: string) {
    await this.show(message, 'primary');
  }
}
