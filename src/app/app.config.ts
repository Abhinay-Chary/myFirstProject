import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './interceptors/auth.service';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { cr } from './actions/reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppService } from './app.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),AppService,importProvidersFrom(HttpClientModule), provideAnimationsAsync(), { provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true }, provideStore({st:cr}), provideEffects(), provideStoreDevtools({maxAge:10})]
};
