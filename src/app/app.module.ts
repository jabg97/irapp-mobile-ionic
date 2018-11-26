import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ListPage } from '../pages/list/list';
import { ConfigPage } from '../pages/config/config';
import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DataProvider } from '../providers/data/data';
import { WebServiceProvider } from '../providers/web-service/web-service';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { Network } from '@ionic-native/network';
import { ConfigProvider } from '../providers/config/config';
@NgModule({
  declarations: [
    MyApp,
    ListPage,
    ConfigPage,
    MapPage,
    LoginPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    ConfigPage,
    MapPage,
    LoginPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundGeolocation,
    Geolocation,
    LocationTrackerProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WebServiceProvider,
    DataProvider,
    GoogleMapsProvider,
    ConnectivityServiceProvider,
    Network,
    HttpClient,
    ConfigProvider
    
  ]
})
export class AppModule {}
