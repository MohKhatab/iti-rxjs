import {
  inject,
  runInInjectionContext,
  Injector,
  Injectable,
} from '@angular/core';
import { ConfirmationService } from '../services/confirmation.service';

export function Confirm(message: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // @ts-ignore
      const confirmed = await this.confiramtionService.notifyConfirm(message);

      if (confirmed) {
        return originalMethod.apply(this, args);
      }
      return null;
    };

    return descriptor;
  };
}
