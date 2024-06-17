import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { NetworkService } from "../../../services/network.service";
import { FormGroup } from "@angular/forms";
import { RegistrationService } from "../../../services/registration.service";
import { ConfirmationService, MessageService } from "primeng/api";

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

  constructor(
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _networkService: NetworkService,
    private _registrationService: RegistrationService
  ) {
    this.isOnline = this._networkService.getInitialStatus();
    this.subscribeToNetworkObservable();
  }

  async ngOnInit(): Promise<void> {
    console.log(`Initial Internet connection: ${this.isOnline ? 'Online' : 'Offline'}`);
    const cachedData = this._registrationService.getCachedData();
    if (this.isOnline && cachedData) {
      this._confirmationService.confirm({
        message: 'You have unsent data. Do you want to submit it now?',
        accept: () => {
          this.sendCachedData(cachedData);
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
      }
    );
  }

  onFormChange(form: FormGroup) {
    this.registrationForm = form;
  }

  onFormSubmit() {
    if (this.isOnline) {
      console.log('Sending data...');
      const cachedRegistrationForm = this._registrationService.getCachedData();
      if (cachedRegistrationForm) {
        this._confirmationService.confirm({
          message: 'You have unsent data. Do you want to proceed?',
          accept: () => {
            this._registrationService.sendRegistrationData(cachedRegistrationForm);
            this._registrationService.removeCachedData();
            this._messageService.add({severity: 'success', summary: 'Success', detail: 'Data sent.'});
          }
        });
      } else {
        this._registrationService.sendRegistrationData(this.registrationForm.value);
        this._messageService.add({severity: 'success', summary: 'Success', detail: 'Data sent.'});
      }
    } else {
      console.log('No internet connection. Saving data...');
      this._registrationService.removeCachedData();
      this._registrationService.cacheRegistrationForm(this.registrationForm.value);
    }
  }

  sendCachedData(cachedData: any) {
    this._registrationService.sendRegistrationData(cachedData);
    this._registrationService.removeCachedData();
    this._messageService.add({severity: 'success', summary: 'Success', detail: 'Data sent.'});
  }

}
