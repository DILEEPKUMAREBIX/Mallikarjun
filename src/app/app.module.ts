import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms'

import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EmployeeInfo } from '../pages/employee-information/employee-info';
import { RegisterEmployee } from '../pages/register-employee/register-employee.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AF } from './services/af'


// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyCv2Yzhq2Of8HXt5WAMPTo256fpKiJZN2A',
  authDomain: 'mallikarjuna-gas.firebaseapp.com',
  databaseURL: 'https://mallikarjuna-gas.firebaseio.com',
  storageBucket: 'mallikarjuna-gas.appspot.com',
  messagingSenderId: '397777618624'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EmployeeInfo,
    RegisterEmployee
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EmployeeInfo,
    RegisterEmployee
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AF,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
