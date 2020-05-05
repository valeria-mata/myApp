import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Device} from '@ionic-native/device/ngx';
import {NetworkInterface} from '@ionic-native/network-interface/ngx';
import {environment} from '../../../../environments/environment';
import {IPreferenceDevice} from '../../../interface/interfaces-funtional';

@Injectable({
    providedIn: 'root'
})
export class PreferenceService implements IPreferenceDevice {

    constructor(private nativeStorage: NativeStorage, private device: Device, private networkInterface: NetworkInterface) {

    }

    initPreference(user: string = environment.empty, role: string = environment.empty): void {
        this.savePreference(environment.preference.user, user);
        this.savePreference(environment.preference.role, role);
        this.savePreference(environment.preference.uuid, this.device.uuid);
        this.networkInterface.getWiFiIPAddress()
            .then(ipWifi => this.savePreference(environment.preference.ipWifi, ipWifi))
            .catch(error => this.savePreference(environment.preference.ipWifi, error.message));
    }

    ipWifiAddress(): Observable<string> {
        return this.getPreference<string>(environment.preference.ipWifi);
    }

    uuidDevice(): Observable<string> {
        return this.getPreference<string>(environment.preference.uuid);
    }

    roles(): Observable<string> {
        return this.getPreference<string>(environment.preference.role);
    }

    user(): Observable<string> {
        return this.getPreference<string>(environment.preference.user);
    }

    savePreference(reference: string, value: any): Observable<any> {
        return fromPromise(this.nativeStorage.setItem(reference, value));
    }

    getPreference<T>(reference: string): Observable<T> {
        return fromPromise<T>(this.nativeStorage.getItem(reference));
    }
}
