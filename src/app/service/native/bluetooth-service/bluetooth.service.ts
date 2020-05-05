import {Injectable} from '@angular/core';
import {
    AdvertisingParams,
    BluetoothLE,
    DescriptorParams,
    ScanParams,
    WriteCharacteristicParams
} from '@ionic-native/bluetooth-le/ngx';
import {fromPromise} from 'rxjs/internal-compatibility';
import {environment} from '../../../../environments/environment';
import {UniqueDeviceID} from '@ionic-native/unique-device-id/ngx';


@Injectable({
    providedIn: 'root'
})
export class BluetoothService {

    //uuidDevice:string = environment.empty;
    constructor(private bluetoothle: BluetoothLE, private uniqueDeviceID: UniqueDeviceID) {
    }


    async uuidBL() {
        /* await  this.uniqueDeviceID.get()
              .then((uuid: any) => this.uuidDevice = uuid).catch(() => this.uuidDevice = environment.bluetoothle.serviceUUID );
          console.log('uuid',this.uuidDevice);*/
    }

    initBL() {
        let params = {request: true, statusReceiver: true, restoreKey: environment.bluetoothle.restoreKey};

        this.bluetoothle.initialize(params).subscribe(result => {
            console.log(environment.bluetoothle.msgSuccessInitialize, result);
            this.permission();
        }, error => this.onThrowable(environment.bluetoothle.msgErrorInitialize, error));

        this.bluetoothle.initializePeripheral({request: true, restoreKey: environment.bluetoothle.restoreKey})
            .subscribe( data => {
                console.log('initializePeripheral', data);

                console.log('initializePeripheral', data.status);

                this.addServiceLE();

                if (data.status === 'connected') {


                console.log('connect device+++++++++++++++++++++++');
                this.bluetoothle.connect({address: data.address}).subscribe(data => {

                    console.log('connect device+++++++++++++++++++++++', data);
                    this.readLE(data.address);

                }, error => {
                    console.log('error conect', error);
                });

            }
            });
    }

    scanBL() {
        let params: ScanParams = {
            services: [
                environment.bluetoothle.serviceUUID
            ],
            allowDuplicates: false,
            scanMode: this.bluetoothle.SCAN_MODE_LOW_LATENCY,
            matchMode: this.bluetoothle.MATCH_MODE_AGGRESSIVE,
            matchNum: this.bluetoothle.MATCH_NUM_MAX_ADVERTISEMENT,
            callbackType: this.bluetoothle.CALLBACK_TYPE_ALL_MATCHES,
            isConnectable: true
        };
        return this.bluetoothle.startScan(params);
    }

    startAdvertisingBL() {
        let params: AdvertisingParams = {
            service: environment.bluetoothle.serviceUUID,
            services: [],
            connectable: true,
            timeout: 0,
            includeDeviceName:true
        };
        return fromPromise(this.bluetoothle.startAdvertising(params));
    }

    permission() {
        this.bluetoothle.requestPermission()
            .then(isPermission => {
                console.log(environment.bluetoothle.msgSuccessPermissionLocation, isPermission.requestPermission);

                // if (!isPermission.requestPermission) {

                this.bluetoothle.requestLocation()
                    .then((isLocation) => console.log(environment.bluetoothle.msgSuccessLocation, isLocation.requestLocation))
                    .catch(throwable => this.onThrowable(environment.bluetoothle.msgErrorLocation, throwable));

                //  }

            }).catch(throwable => this.onThrowable(environment.bluetoothle.msgErrorPermissionLocation, throwable));
    }


     writeLE(address: any) {
        let string = 'Write Hello World';
        let bytes = this.bluetoothle.stringToBytes(string);
        let encodedString = this.bluetoothle.bytesToEncodedString(bytes);

        let params: WriteCharacteristicParams =
            {
                value: encodedString,
                service: environment.bluetoothle.serviceUUID,
                type: 'noResponse',
                address: address,
                characteristic: null
            };


        this.bluetoothle.write(params).then(dataRead => {
            console.log('bluetoothle write', dataRead);
        }).catch(error => console.log('error bluetoothle write', error));
    }


      conecte(address: any) {


       this.bluetoothle.isConnected({address:address}).then(dataConnect=>  {
           console.log('connect device+++++++++++++++++++++++',dataConnect);

           if (!dataConnect.isConnected){
               this.bluetoothle.connect({address: address,autoConnect:true}).subscribe(data => {

                   console.log('connect device+++++++++++++++++++++++', data);


               }, error => {
                   console.log('error conect', error);
               });
           }

       }).catch(errorConnect => {
           this.bluetoothle.connect({address: address,autoConnect:true}).subscribe(data => {

               console.log('connect device+++++++++++++++++++++++', data);


           }, error => {
               console.log('error conect', error);
           });

           console.log('error isConnect', errorConnect);
       });

    }

    readLE(address: string) {
        let params: DescriptorParams = {
            address: address, characteristic: null, service: environment.bluetoothle.serviceUUID

        };
        this.bluetoothle.read(params).then(dataRead => {
            console.log('data read', dataRead);
        }).catch(error => console.log('data read', error));
    }


    stopScanLE(){
        this.bluetoothle.stopScan().then(data => {
            console.log('stopScan',data);
        });
    }

    addServiceLE(){
        let params = {
            service: environment.bluetoothle.serviceUUID,
            characteristics: [
                {
                    uuid: "ABCD",
                    permissions: {
                        read: true,
                        write: true
                    },
                    properties : {
                        read: true,
                        writeWithoutResponse: true,
                        write: true,
                        notify: true,
                        indicate: true
                    }
                }
            ]
        };

        this.bluetoothle.addService(params).then(dataService => {
            console.log('addService', dataService);
        }).catch(error=>{
            console.log('errorService', error);
        });

    }

    boundBL(address:any){
        this.bluetoothle.bond({address: address}).subscribe(dataBound=>{
            console.log('dataBound', dataBound);
        }, error => {
            console.log('errorBound', error);
        })
    }


    onThrowable(message: string, throwable: any) {
        console.log(message, throwable);
    }

}
