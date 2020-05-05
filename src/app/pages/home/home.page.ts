import {Component} from '@angular/core';
import {BaseApp} from '../../base/base-app';
import {ICallbackStatus} from '../../interface/interfaces-funtional';
import {SqliteService} from '../../service/storage/sqlite-service/sqlite.service';
import {BluetoothService} from '../../service/native/bluetooth-service/bluetooth.service';
import {ScanStatus} from '@ionic-native/bluetooth-le/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends BaseApp {
    addres: any;

    constructor(private sqliteService: SqliteService,
                private bluetoothService: BluetoothService) {
        super();
        this.sqliteService.initDataBase();
    }


    sendData() {
        this.bluetoothService.readLE(this.addres);
    }

    conecta() {
        this.bluetoothService.conecte(this.addres);
    }

    readData() {
        this.bluetoothService.writeLE(this.addres);
    }


    activeReceptor() {
        this.bluetoothService.startAdvertisingBL().subscribe(advertiseMode =>
                console.log('startAdvertisingBL', advertiseMode)
            , error => console.log('error startAdvertisingBL', error));
    }

    toOnboarding() {
        this.bluetoothService.scanBL().subscribe((dataScan: ScanStatus) => {
            console.log('infoScan', dataScan.status);
            if (dataScan.status === 'scanResult') {
                console.log('infoScanAddress', dataScan);
            }
        }, error => console.log('error dat', error));
    }

    onErrorOnboarding: ICallbackStatus<any> = (error) => {

    };

    onSuccessOnboarding: ICallbackStatus<any> = (data) => {
    };

    bound() {
        this.bluetoothService.boundBL(this.addres);
    }

    stop() {
        this.bluetoothService.stopScanLE();
    }
}

/*     this.bluetoothService.initPeripheral().subscribe(next => {
         console.log('peripheral', next.address);
     });*/

/*    let user = new User();
    user.id = 1;
    user.active = 0;
    user.data = 'archumon';
await this.sqliteService.insert<User>(user).then(user => console.log('success',user)).catch(error => console.log('error', error));

    let userUp = new User();
   userUp.id = 1;
   userUp.active = 9;
   userUp.data = 'archumonpx';
await this.sqliteService.update<User>(userUp).then(user => console.log('successUp',user)).catch(error => console.log('errorUp', error));
*/

/*   this.transitionService.downTransition();
        this.router.navigateByUrl('/onboarding')
            .then(data => this.onSuccessOnboarding(data))
            .then(error => this.onErrorOnboarding(error));*/
