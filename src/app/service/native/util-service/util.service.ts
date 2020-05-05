import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor() {
    }

    utilSqlModelInsert(modelTbl: any) {
        let params = '';
        let values = Object.keys(modelTbl).map(reference => modelTbl[reference]);
        for (let i = 0; i < values.length; i++) {
            params = i + 1 === values.length ? ` ${params}?` : ` ${params}?,`;
        }
        return {params: params.trim(), value: values};
    }

    utilSqlModelUpdate(modelTbl: any) {
        let refsData: any = Object.keys(modelTbl).filter(reference => reference !== 'id' || modelTbl[reference] !== null).map(reference => reference);
        let values: any = [];
        let params = '';
        for (let i = 0; i < refsData.length; i++) {
            params = i + 1 === refsData.length ? ` ${params}${refsData[i]}= ?` : `${params}${refsData[i]}= ?,`;
            values.push(modelTbl[refsData[i]]);
        }
        return {references: params, values: values, id: modelTbl.id};
    }

    utilSqlNameTable(nameClass: string) {
        return `TBL${nameClass}`;
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    utilQueryResult<T>(res: any): Array<T> {
        let listItems: Array<T> = [];
        for (let i = 0; i < res.rows.length; i++) {
            listItems.push(res.rows.item(i));
        }
        return listItems;
    }

    queryModel(model: any) {
        let sentence = '';
        let valuesModels: Array<any> = [];
        let modelReferences = Object.keys(model).filter(filterModel => model[filterModel] !== null).map((mapModel) => {
            return {reference: mapModel, value: model[mapModel]};
        });
        for (let i = 0; i < modelReferences.length; i++) {
            sentence = i + 1 === modelReferences.length ? ` ${sentence}${modelReferences[i].reference} = ? ` : ` ${sentence}${modelReferences[i].reference} = ? AND `;
            valuesModels.push(modelReferences[i].value);
        }
        return {reference: sentence.trim(), value: valuesModels};
    }
}
