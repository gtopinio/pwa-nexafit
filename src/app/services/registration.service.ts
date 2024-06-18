import { Injectable } from '@angular/core';
import { SwUpdate } from "@angular/service-worker";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private readonly CACHE_NAME = 'nexaFitRegistrationCache';

  constructor(
    private swUpdate: SwUpdate
  ) { }

  cacheRegistrationForm(registrationForm: any) {
    try {
      localStorage.setItem(this.CACHE_NAME, JSON.stringify(registrationForm));
      console.log('Data cached:', registrationForm);
    } catch (e) {
      console.error('Error caching data:', e);
    }
  }

  getCachedData() {
    const cachedData = localStorage.getItem(this.CACHE_NAME);
    console.log('Data retrieved:', cachedData);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  removeCachedData() {
    localStorage.removeItem(this.CACHE_NAME);
    console.log('Data removed.');
  }

  sendRegistrationData(registrationForm: any) {
    // Simulates sending data to the server
    setTimeout(() => {
      console.log('Data sent:', registrationForm);
    }, 2000);
  }
}
