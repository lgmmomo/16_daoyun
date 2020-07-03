import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TeacherInfoService {

  constructor(private http: HttpClient) { }

  getdata():Promise<any>{
    let url = "api/teach";
    return this.http.get(url,{observe: 'response'}).toPromise().then(data=>data);
  }
  

  delete(id):Promise<any>{
    let url ='api/teacher/delete/' + id;
    return this.http.delete(url).toPromise().then(data => data);
  }
  insert(data):Promise<any>{
    let url = 'api/teacher/insert';
    return this.http.post(url,JSON.stringify(data)).toPromise().then(data=>data); 
  }
  update(data):Promise<any>{
    let url = 'api/teacher/updataInfo';
    return this.http.put(url,JSON.stringify(data)).toPromise().then(data=>data); 
  }

}
