import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { cr } from './actions/reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppService } from './app.service';
import { authinterceptor } from './interceptors/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),AppService,provideHttpClient(withInterceptors([authinterceptor])), provideStore({st:cr}), provideEffects(), provideStoreDevtools({maxAge:10})]
};
