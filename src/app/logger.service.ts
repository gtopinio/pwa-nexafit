import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private isLoggingEnabled = !environment.production;

  constructor() { }

  log(message: any, ...optionalParams: any[]): void {
    if (this.isLoggingEnabled) {
      console.log(message, ...optionalParams);
    }
  }

  enableLogging(): void {
    this.isLoggingEnabled = true;
  }

  disableLogging(): void {
    this.isLoggingEnabled = false;
  }
}
