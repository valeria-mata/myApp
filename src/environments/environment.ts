// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {AdvertisingParams} from '@ionic-native/bluetooth-le/ngx';

export const environment = {
  production: false,
  statusbarColor: '#005b9f',
  empty: '',
  transitions:{
    left:'left',
    right:'right',
    down:'down',
    up:'up',
    duration: 250,
    slowdownfactor: -1,
    slidePixels: 0,
    iosdelay: 20,
    androiddelay: 0,
    fixedPixelsTop: 0,
    fixedPixelsBottom: 60
  },
  preference:{
    uuid: 'uuid',
    ipWifi: 'ipWifi',
    role: 'role',
    user: 'user'
  },
  logger:{
    debug: 3,
    error: 6,
    info: 4,
    warn:5
  },
  bluetoothle: {
    serviceUUID:'1234',
    restoreKey:'cobit-2020',
    timeoutAdvertising:0,
    msgErrorInitialize:'error initialize bluetooth',
    msgErrorPermissionLocation:'error getting location permissions',
    msgErrorLocation:'error getting location',
    msgSuccessInitialize:'initialize bluetooth',
    msgSuccessPermissionLocation:'get location permission',
    msgSuccessLocation:'get location'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
