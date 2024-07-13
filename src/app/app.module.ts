import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment'; 

import { IonicStorageModule } from '@ionic/storage-angular';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// Asegúrate de tener esta importación
import { appReducers, metaReducers } from './store/app.reducers';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    IonicStorageModule.forRoot(),
    StoreModule.forRoot(appReducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
