import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(public http: HttpClient) { }
  getUserData():Promise<any> {
    let url="/api/user";
    return this.http.get(url,{observe: 'response'}).toPromise().then(data=>data);
  }
  resetPSW(data):Promise<any> {
    let url ="api/user/resetPSW";
    return this.http.put(url,JSON.stringify(data)).toPromise().then(data=>data);
  }
  
  getRoleData():Promise<any> {
    let url="/api/user/role";
    return this.http.get(url,{observe: 'response'}).toPromise().then(data=>data);
  }


  updateInfo(data):Promise<any>{
    let url = 'api/user/updataInfo';
    return this.http.put(url,JSON.stringify(data)).toPromise().then(data=>data); 
  }

  insertUserInfo(data):Promise<any>{
    let url = 'api/user/insert';
    return this.http.post(url,JSON.stringify(data)).toPromise().then(data=>data); 
  }
  deleteInfo(id):Promise<any>{
    let url ='api/user/delete/' + id;
    return this.http.delete(url).toPromise().then(data => data);
  }
}
