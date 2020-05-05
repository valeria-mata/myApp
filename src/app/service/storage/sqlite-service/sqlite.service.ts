import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {ICallbackStatus, ISqlPersistence} from '../../../interface/interfaces-funtional';
import {UtilService} from '../../native/util-service/util.service';
import {User} from '../../../model/sql-model';

@Injectable({
    providedIn: 'root'
})

export class SqliteService implements ISqlPersistence {

    nameAppVersion1 = {
        versionNumber: 1,
        name: 'nameDataBase.db',
        location: 'default',
        queryTables: [`CREATE TABLE IF NOT EXISTS ${this.utilService.utilSqlNameTable(User.name)} (id INTEGER PRIMARY KEY NOT NULL, active INTEGER, data VARCHAR(100))`],
        queries: {}
    };

    private instance: SQLiteObject;

    constructor(private sqlite: SQLite, private utilService: UtilService) {
    }

    initDataBase(): void {
        this.sqlite.create({name: this.nameAppVersion1.name, location: this.nameAppVersion1.location})
            .then((db: SQLiteObject) => {
                this.instance = db;
                this.nameAppVersion1.queryTables.forEach(table => {
                    this.instance.executeSql(table, [])
                        .then(status => this.onSuccessTable(status)).catch(throwable => this.onFailedTable(throwable));
                });
            });
    }

    findAll<T>(sqlNameTable: string): Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            this.instance.executeSql(`SELECT * FROM ${this.utilService.utilSqlNameTable(sqlNameTable)}`, [])
                .then(objs => resolve(this.utilService.utilQueryResult(objs)))
                .catch(throwable => reject(throwable));
        });
    }

    findById<T>(sqlNameTable: string, id: number): Promise<T> {
        return new Promise((resolve, reject) => {
            this.instance.executeSql(`SELECT * FROM ${this.utilService.utilSqlNameTable(sqlNameTable)} WHERE id = ?`, [id])
                .then(res => resolve(res.rows.item(0))).catch(throwable => reject(throwable));
        });
    }

    insert<T>(sqlModel: any): Promise<T> {
        let references = this.utilService.utilSqlModelInsert(sqlModel);
        return new Promise<T>((resolve, reject) => {
            this.instance.executeSql(`INSERT INTO ${this.utilService.utilSqlNameTable(sqlModel.constructor.name)} VALUES(${references.params})`, references.value)
                .then(() => {
                    this.instance.executeSql(` SELECT * FROM ${this.utilService.utilSqlNameTable(sqlModel.constructor.name)} ORDER BY id DESC LIMIT 1`, [])
                        .then(obj => resolve(obj.rows.item(0)))
                        .catch(throwable => reject(throwable));
                })
                .catch(throwable => reject(throwable));
        });
    }

    update<T>(sqlModel: any): Promise<T> {
        let references = this.utilService.utilSqlModelUpdate(sqlModel);
        return new Promise<T>((resolve, reject) => {
            this.instance.executeSql(`UPDATE ${this.utilService.utilSqlNameTable(sqlModel.constructor.name)} SET ${references.references}  WHERE id = ${references.id}`, references.values)
                .then(() => this.findById<T>(this.utilService.utilSqlNameTable(sqlModel.constructor.name), references.id).then(obj => resolve(obj)).catch(throwable => reject(throwable)))
                .catch(throwable => reject(throwable));
        });
    }

    customQuery<T>(sqlSentence: string, ...params: any[]): Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => this.instance.executeSql(sqlSentence, params)
            .then(objs => resolve(this.utilService.utilQueryResult(objs))).catch(throwable => reject(throwable)));
    }

    insertAll<T>(sqlModels: any[]): Promise<Array<T>> {
        let result: Array<T> = [];
        return new Promise(async (resolve, reject) => {
            await this.utilService.asyncForEach(sqlModels, async (model) =>
                await this.insert<T>(model).then(model =>
                    result.push(model)).catch(throwable => reject(throwable))).catch(throwable => reject(throwable));
            resolve(result);
        });
    }

    modelQuery<T>(sqlModel: any): Promise<Array<T>> {
        let result = this.utilService.queryModel(sqlModel);
        return new Promise<Array<T>>((resolve, reject) => {
            this.instance.executeSql(`SELECT * FROM ${this.utilService.utilSqlNameTable(sqlModel.constructor.name)} WHERE ${result.reference}`,result.value)
                .then(objs => resolve(objs)).catch(throwable => reject(throwable))
        });
    }

    private onSuccessTable: ICallbackStatus<any> = (status) => {
        console.log('status table', status);
    };

    private onFailedTable: ICallbackStatus<any> = (throwable) => {
        console.log('throwable table', throwable);
    };
}
