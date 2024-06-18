import { Injectable } from '@angular/core';
import { Subscription } from "rxjs";
import { SwUpdate } from "@angular/service-worker";

@Injectable({
  providedIn: 'root'
})
export class VersionCheckerService {
    isNewVersionAvailable: boolean = false;
    newVersionSubscription!: Subscription;
    constructor(
      private _swUpdate: SwUpdate
    ) {
      this.checkForUpdate();
    }
    checkForUpdate(): void {
      this.newVersionSubscription?.unsubscribe();
      if (!this._swUpdate.isEnabled) {
        return;
      }
      this.newVersionSubscription = this._swUpdate.versionUpdates.subscribe(evt => {
        switch (evt.type) {
          case 'VERSION_DETECTED':
            console.log(`Downloading new app version: ${evt.version.hash}`);
            break;
          case 'VERSION_READY':
            console.log(`Current app version: ${evt.currentVersion.hash}`);
            console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
            this.isNewVersionAvailable = true;
            break;
          case 'VERSION_INSTALLATION_FAILED':
            console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
            break;
        }
      });
    }

  applyUpdate(): void {
    // Reload the page to update to the latest version after the new version is activated
    this._swUpdate.activateUpdate()
      .then(() => document.location.reload())
      .catch(error => console.error('Failed to apply updates:', error));
  }
}
