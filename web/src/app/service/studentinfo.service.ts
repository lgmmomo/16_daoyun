import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StudentinfoService {
  constructor(public http: HttpClient) { }

  get_StudentInfo():Promise<any>{
    let url="/api/student";
    return this.http.get(url,{observe: 'response'}).toPromise().then(data=>data);
  }

  Add_Student(data):Promise<any>{
    let url="/api/student/add_newone";
    return this.http.post(url,JSON.stringify(data)).toPromise().then(data=>data); 
  }

  delete_single_stu(id):Promise<any>{
    let url="/api/student/delete_singleOne/"+id;
    return this.http.delete(url).toPromise().then(data=>data);
  }
  update_Student(data):Promise<any>{
    let url="/api/student/updateInfo";
    return this.http.put(url,JSON.stringify(data)).toPromise().then(data=>data); 
  }

}
