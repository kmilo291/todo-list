import { Component, OnInit } from '@angular/core';
import { RemoteConfigService } from 'src/app/infrastructure/services/remote-config.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: false
})
export class TabsPage implements OnInit {

  showSettings = false;

  constructor(private remoteConfig: RemoteConfigService) { }

  async ngOnInit() {

  this.showSettings =
  await this.remoteConfig.getBoolean('enable_config_settings');
  }

}
