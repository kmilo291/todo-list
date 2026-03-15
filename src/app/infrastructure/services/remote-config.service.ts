import { Injectable } from '@angular/core';
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
  isSupported
} from "firebase/remote-config";

import { firebaseApp } from '../firebase/firebase.config';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {

  private remoteConfig: any;
  private ready: Promise<void>;

  constructor() {
    this.ready = this.init();
  }

  private async init(): Promise<void> {

    const supported = await isSupported();

    if (!supported) {
      console.warn('Remote Config no soportado');
      return;
    }

    this.remoteConfig = getRemoteConfig(firebaseApp);

    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 0,
      fetchTimeoutMillis: 60000
    };

    await fetchAndActivate(this.remoteConfig);

  }

  async getBoolean(key: string): Promise<boolean> {

    await this.ready;

    return getValue(this.remoteConfig, key).asBoolean();

  }

}
