import { Injectable } from '@angular/core';
import { HttpClient,HttpClientJsonpModule} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CourseOpService {

  constructor(public http: HttpClient) { }
  get_corse():Promise<any>{
    let url="/api/course";
    return this.http.get(url,{observe: 'response'}).toPromise().then(data=>data);
  }

  add_course(data):Promise<any>{
    let url="/api/course";
    return this.http.post(url,JSON.stringify(data)).toPromise().then(data=>data);
  }

  up_course(data):Promise<any>{
    let url="/api/course";
    return this.http.put(url,JSON.stringify(data)).toPromise().then(data=>data);
  }

  delet_course(data):Promise<any>{
    let url="/api/course/"+data.CourseId;
    return this.http.delete(url).toPromise().then(data=>data);
  }





}
