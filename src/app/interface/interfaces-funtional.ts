import {Observable} from 'rxjs';

export interface ICallbackStatus<T> {
    (obj: T, parameter?: any): void;
}

export interface IPreferenceDevice {
    user(): Observable<string>

    ipWifiAddress(): Observable<string>

    uuidDevice(): Observable<string>

    roles(): Observable<string>

    savePreference(reference: string, value: any): Observable<any>

    getPreference<T>(reference: string): Observable<T>

// se inizialisa despues al momento de hacer loguin
    initPreference(): void;
}

export interface ISocialMedia {
    google(): Observable<any>

    facebook(): Observable<any>
}

export interface ILogger {
    debug(tag:string, message: string): void;

    error(tag:string, message: string,throwable:any): void;

    info(tag:string, message: string): void;

    warn(tag:string, message: string): void;
}


export interface ITransition {
    upTransition(): void;

    rightTransition(): void;

    leftTransition(): void;

    downTransition(): void;
}

export interface ISqlPersistence {

    initDataBase(): void;

    insert<T>(sqlModel: any): Promise<T>;

    insertAll<T>(sqlModel: any[]): Promise<Array<T>>;

    update<T>(sqlModel: any): Promise<T>;

    findAll<T>(sqlNameTable: string): Promise<Array<T>>;

    findById<T>(sqlNameTable: string, id: number): Promise<T>;

    modelQuery<T>(sqlModels: any): Promise<Array<T>>;

    customQuery<T>(sqlSentence: string, ...params: any[]): Promise<Array<T>>;
}

export interface ISqlModel {
    id: number;
    active: number;
}
