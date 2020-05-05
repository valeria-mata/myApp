import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  sendFile(){
    let formData =  new FormData();
    //  formData.append()
   return this.http.post('endPoint', formData);
  }
}
