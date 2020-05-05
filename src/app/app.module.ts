import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SQLite } from '@ionic-native/sqlite/ngx';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomePage} from './pages/home/home.page';
import {OnboardingPage} from './pages/onboarding/onboarding.page';
import {NativePageTransitions} from '@ionic-native/native-page-transitions/ngx';
import {ApiService} from './service/api/api-service/api.service';
import {TransitionService} from './service/native/transition-service/transition.service';
import {PreferenceService} from './service/storage/preference-service/preference.service';
import {SqliteService} from './service/storage/sqlite-service/sqlite.service';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {Device} from '@ionic-native/device/ngx';
import {NetworkInterface} from '@ionic-native/network-interface/ngx';
import {HttpClientModule} from '@angular/common/http';
import {BluetoothLE} from '@ionic-native/bluetooth-le/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import { BLE } from '@ionic-native/ble/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [AppComponent, HomePage, OnboardingPage],
    entryComponents: [HomePage, OnboardingPage],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        ApiService,
        TransitionService,
        NativePageTransitions,
        PreferenceService,
        SqliteService,
        NativeStorage,
        Device,
        NetworkInterface,
        SQLite,
        BluetoothLE,
        AndroidPermissions,
        BLE,
        UniqueDeviceID
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
