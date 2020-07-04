import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleinfoService {
  constructor(public http: HttpClient) { }
  get_RoleInfo():Promise<any> {
    let url="/api/role";
    return this.http.get(url,{observe: 'response'}).toPromise().then(data=>data);
  }
  get_RightOfRole(id):Promise<any> {
    let url="/api/rightofrole/" + id;
    return this.http.get(url).toPromise().then(data=>data);
  }
  getRights():Promise<any> {
    let url="api/rights";
    return this.http.get(url,{observe: 'response'}).toPromise().then(data=>data);
  }
  insertRoleInfo(data):Promise<any>{
    let url = "api/insertRole";
    return this.http.post(url,JSON.stringify(data)).toPromise().then(data=>data); 
  }
  delete_single_role(id):Promise<any>{
    let url="/api/role/delete_singleOne/"+id;
    return this.http.delete(url).toPromise().then(data=>data);
  }
  updateInfo(data):Promise<any>{
    let url = 'api/role/updataInfo';
    return this.http.put(url,JSON.stringify(data)).toPromise().then(data=>data); 
  }
}
