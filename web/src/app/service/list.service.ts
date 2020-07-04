import { Injectable } from '@angular/core';
import { HttpClient,HttpClientJsonpModule} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(public http: HttpClient) { }

  // Menus = [
  //   {
  //     text: '用户信息管理',
  //     link: '/function/use_message_manage',
  //     icon: '',
  //     children: []
  //   },
  //   {
  //     text: '课程信息管理',
  //     link: '/function/course_message_manage',
  //     icon: '',
  //     children: []
  //   },
  //   {
  //     text: '数据字典',
  //     link: '/function/direction/show_dictionary',
  //     icon: '',
  //     children: []
  //   },
  //   {
  //     text: '角色管理',
  //     link: '/function/role_manage',
  //     icon: '',
  //     children: []
  //   },
    
  // ];
  getMenus() {
    var roleid=sessionStorage.getItem('roleid');
    var url='/api/menu/'+roleid;
    return this.http.get(url,{observe: 'response'}).toPromise().then(data=>data);
  }
}
