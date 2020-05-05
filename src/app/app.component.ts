import {Component, Injector} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {environment} from '../environments/environment';
import {LoggerService} from './service/native/logger-service/logger.service';
import {BluetoothService} from './service/native/bluetooth-service/bluetooth.service';
import {ScanStatus} from '@ionic-native/bluetooth-le/ngx';

export let AppInject: Injector;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})

export class AppComponent {

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private bluetoothService: BluetoothService,
        inject: Injector) {
        AppInject = inject;
        this.platform.ready().then(() => {
            this.statusBar.styleLightContent();
            this.statusBar.backgroundColorByHexString(environment.statusbarColor);
            this.splashScreen.hide();
            this.bluetoothService.initBL();

        });

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleLightContent();
            this.statusBar.backgroundColorByHexString(environment.statusbarColor);
            this.splashScreen.hide();
        });
    }
}
