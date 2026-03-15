import { Component, OnInit } from '@angular/core';
import { RemoteConfigService } from 'src/app/infrastructure/services/remote-config.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  standalone: false
})
export class TabsPage implements OnInit {

  showSettings = false;

  constructor(private remoteConfig: RemoteConfigService) {}

  ngOnInit() {

    this.remoteConfig
      .watchBoolean('enable_config_settings')
      .subscribe(value => {

        this.showSettings = value;

      });

  }

}
