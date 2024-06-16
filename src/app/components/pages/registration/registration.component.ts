import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { NetworkService } from "../../../services/network.service";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit, OnDestroy{
  private onlineOfflineSubscription!: Subscription;
  isOnline!: boolean;

  registrationForm!: FormGroup;

  constructor(
    private _networkService: NetworkService,
  ) {
    this.isOnline = navigator.onLine;
  }

  ngOnInit(): void {
    this.networkHandler();
  }

  ngOnDestroy(): void {
    if (this.onlineOfflineSubscription) {
      this.onlineOfflineSubscription.unsubscribe();
    }
  }

  networkHandler() {
    this.onlineOfflineSubscription = this._networkService.createNetworkObservable().subscribe(
      (isOnline) => {
        this.isOnline = isOnline;
        console.log(`Internet connection: ${isOnline ? 'Online' : 'Offline'}`);
      }
    );
  }

  onFormChange(form: FormGroup) {
    this.registrationForm = form;
    console.log("Form changed: ", form.value);
  }

}
