import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(public http:HttpClient) { }

  getInformation(data):Promise<any>{
    let url="/api/updatapsw";
    return this.http.put(url,JSON.stringify(data)).toPromise().then(data=>data); 
  }

  updateLoginname(data):Promise<any>{
    let url="/api/updataLoginname";
    console.log(data);
    return this.http.put(url,JSON.stringify(data)).toPromise().then(data=>data); 
  }
}

