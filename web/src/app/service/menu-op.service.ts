import { Injectable } from '@angular/core';
import { HttpClient,HttpClientJsonpModule} from '@angular/common/http';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class MenuOpService {

  constructor(public http: HttpClient) { }
  return_data:any;

  get_menu():Promise<any>{
    let url="/api/menu";
    return this.http.get(url,{observe: 'response'}).toPromise().then(data=>data);
  }

  update_Menu(data):Promise<any>{
    let url="/api/Menu/"+data.id;
    // console.log(JSON.stringify(data));
    return this.http.put(url,JSON.stringify(data)).toPromise().then(data=>data);
  }

  update_MenuDetail(data):Promise<any>{
    let url="/api/MenuDetail/"+data.id;
    // console.log(JSON.stringify(data));
    return this.http.put(url,JSON.stringify(data)).toPromise().then(data=>data);
  }
  

  Add_MenuDetail(data):Promise<any>{
    let url="/api/menu/MenuDetail";
    // console.log(JSON.stringify(data));
    return this.http.post(url,JSON.stringify(data)).toPromise().then(data=>data);
  }

  Add_Menu(data):Promise<any>{
    let url="/api/menu/Menu";
    // console.log(JSON.stringify(data));
    return this.http.post(url,JSON.stringify(data)).toPromise().then(data=>data);
  }

  Delet_MenuDetail(id):Promise<any>{
    let url="/api/menu/MenuDetail/"+id;
    // console.log(JSON.stringify(data));
    return this.http.delete(url).toPromise().then(data=>data);
  }

  Delet_Menu(id):Promise<any>{
    let url="/api/menu/Menu/"+id;
    // console.log(JSON.stringify(data));
    return this.http.delete(url).toPromise().then(data=>data);
  }

  // get_menu_detail(id):Promise<any>{
  //   let url="/api/menu_detail/"+id;
  //   return this.http.get(url,{observe: 'response'}).toPromise().then(data=>data);
  // }
}
