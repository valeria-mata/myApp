import {Injectable} from '@angular/core';
import {ILogger} from '../../../interface/interfaces-funtional';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class LoggerService  {

    constructor() {
    }
/*
private firebaseCrashlytics: FirebaseCrashlytics
    init(){
      this.firebaseCrashlytics.initialise();
    }

  debug(tag: string, message: string): void {
        this.firebaseCrashlytics.logPriority(environment.logger.debug, tag, message);
    }

    error(tag: string, message: string, throwable: any): void {
        this.firebaseCrashlytics.logPriority(environment.logger.error, tag, message);
        this.firebaseCrashlytics.logException(throwable.toString());
    }

    info(tag: string, message: string): void {
        this.firebaseCrashlytics.logPriority(environment.logger.info, tag, message);
    }

    warn(tag: string, message: string): void {
        this.firebaseCrashlytics.logPriority(environment.logger.warn, tag, message);
    }
*/

}
