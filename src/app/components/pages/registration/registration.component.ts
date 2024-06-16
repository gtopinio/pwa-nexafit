import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { NetworkService } from "../../../services/network.service";
import { FormGroup } from "@angular/forms";

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
    private _networkService: NetworkService,
  ) {
    this.isOnline = this._networkService.getInitialStatus();
    this.subscribeToNetworkObservable();
  }

  ngOnInit(): void {
    console.log(`Initial Internet connection: ${this.isOnline ? 'Online' : 'Offline'}`);
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

}
