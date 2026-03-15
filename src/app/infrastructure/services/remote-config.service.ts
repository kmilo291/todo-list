import { Injectable } from '@angular/core';
import { timer, switchMap, from, shareReplay } from 'rxjs';
import { getRemoteConfig, fetchAndActivate, getValue, isSupported } from "firebase/remote-config";
import { firebaseApp } from '../firebase/firebase.config';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {

  private remoteConfig: any;

  constructor() {}

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

  watchBoolean(key: string) {

    return timer(0, 20000).pipe(

      switchMap(() => from(this.fetchValue(key))),

      shareReplay(1)

    );

  }

  private async fetchValue(key: string): Promise<boolean> {

    if (!this.remoteConfig) {
      await this.init();
    }

    await fetchAndActivate(this.remoteConfig);

    return getValue(this.remoteConfig, key).asBoolean();

  }

}
