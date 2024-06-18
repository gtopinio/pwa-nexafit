import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from "rxjs";
import { NetworkService } from "../../../services/network.service";
import { FormGroup } from "@angular/forms";
import { RegistrationService } from "../../../services/registration.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { VersionCheckerService } from "../../../services/version-checker.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  onlineOfflineSubscription!: Subscription;
  offlineSubscription!: Subscription;
  isOnline!: boolean;

  registrationForm!: FormGroup;
  clearForm = new Subject<void>();


  constructor(
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _networkService: NetworkService,
    private _registrationService: RegistrationService,
    private _versionCheckerService: VersionCheckerService
  ) {
    this.isOnline = this._networkService.getInitialStatus();
    this.subscribeToNetworkObservable();
  }

  async ngOnInit(): Promise<void> {
    this.checkUpdates();
    console.log(`Initial Internet connection: ${this.isOnline ? 'Online' : 'Offline'}`);
    const cachedData = this._registrationService.getCachedData();
    if (this.isOnline && cachedData) {
      this._confirmationService.confirm({
        message: 'You have unsent data. Do you want to submit it now?',
        accept: () => {
          if (this.isOnline) {
            this.sendCachedData(cachedData);
          } else {
            this._messageService.add({severity: 'error', summary: 'Error', detail: `Data not sent. You're still offline`})
          }
        }
      });
    } else {
      console.log('No unsent data.');
    }
  }

  ngOnDestroy(): void {
    if (this.onlineOfflineSubscription) {
      this.onlineOfflineSubscription.unsubscribe();
    }

    if (this.offlineSubscription) {
      this.offlineSubscription.unsubscribe();
    }
  }

  subscribeToNetworkObservable() {
    this.onlineOfflineSubscription = this._networkService.networkObservable$.subscribe(
      (isOnline) => {
        this.isOnline = isOnline;
        console.log(`Internet connection: ${isOnline ? 'Online' : 'Offline'}`);
        this.showNetworkStatus();
        if (isOnline) {
          this.checkFormCache();
        }
      }
    );
  }

  showNetworkStatus() {
    if (this.isOnline) {
      this._messageService.add({severity: 'success', summary: 'Online', detail: 'You are now online.'});
    } else {
      this._messageService.add({severity: 'warn', summary: 'Offline', detail: 'You are now offline.'});
    }
  }

  checkUpdates(){
    if (this._versionCheckerService.isNewVersionAvailable) {
      this._confirmationService.confirm({
        message: 'A new version is available. Do you want to reload the page to update?',
        accept: () => {
          this._versionCheckerService.applyUpdate();
        }
      });
    }
  }

  checkFormCache() {
    const cachedData = this._registrationService.getCachedData();
    if (cachedData) {
      this._confirmationService.confirm({
        message: 'You have unsent data. Do you want to submit it now?',
        accept: () => {
          if (this.isOnline) {
            this.sendCachedData(cachedData);
          } else {
            this._messageService.add({severity: 'error', summary: 'Error', detail: `Data not sent. You're still offline`})
          }
        }
      });
    } else {
      console.log('No unsent data.');
    }
  }

  onFormChange(form: FormGroup) {
    this.registrationForm = form;
  }

  onFormSubmit() {
    const formCopy = {...this.registrationForm.value};
    console.log('Submitting form:', formCopy);

    if (this.isOnline) {
      console.log('Sending data...');
      const cachedRegistrationForm = this._registrationService.getCachedData();
      if (cachedRegistrationForm) {
        this._confirmationService.confirm({
          message: 'You have unsent data. Do you want to proceed?',
          accept: () => {
            this.sendCachedData(cachedRegistrationForm);
          }
        });
      } else {
        this._registrationService.sendRegistrationData(formCopy);
        this._messageService.add({severity: 'success', summary: 'Success', detail: 'Data sent.'});
        this.resetForm();
      }
    } else {
      this._confirmationService.confirm({
        message: "You are offline. Do you want to submit it for later?",
        accept: () => {
          console.log('No internet connection. Saving data...');
          this._registrationService.cacheRegistrationForm(formCopy);
          this._messageService.add({severity: 'success', summary: 'Success', detail: 'Once you are online, please reload the page to send the data.'});
          this.resetForm();
        }
      })
    }
  }

  sendCachedData(cachedData: any) {
    this._registrationService.sendRegistrationData(cachedData);
    this._registrationService.removeCachedData();
    this._messageService.add({severity: 'success', summary: 'Success', detail: 'Data sent.'});
    this.resetForm();

  }

  resetForm() {
    this.clearForm.next();
  }

}
