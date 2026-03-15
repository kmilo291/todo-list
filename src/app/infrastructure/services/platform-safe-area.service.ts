import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlatformSafeAreaService {

  constructor(private platform: Platform) {}

  async applySafeArea(): Promise<void> {

    await this.platform.ready();

    const root = document.documentElement;

    if (this.platform.is('android')) {
      root.style.setProperty('--ion-safe-area-top', '0px');
      return;
    }

    if (this.platform.is('ios')) {
      root.style.setProperty('--ion-safe-area-top', '45px');
      return;
    }

    root.style.setProperty('--ion-safe-area-top', '0px');
  }
}
