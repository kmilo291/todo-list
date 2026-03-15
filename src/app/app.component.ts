import { Component } from '@angular/core';
import { RemoteConfigService } from './infrastructure/services/remote-config.service';
import { PlatformSafeAreaService } from './infrastructure/services/platform-safe-area.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private remoteConfig: RemoteConfigService,
    private safeArea: PlatformSafeAreaService) {
    this.safeArea.applySafeArea();
  }



}
