import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
declare var QRious: any;

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  course_id = '';
  course_name = '';
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService) {
    let theme = this.localStorageService.get('data-theme', 'light');
    document.body.setAttribute('data-theme', theme);
  }
  
  @ViewChild('qr', { static: true }) qr: ElementRef;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((result) => {
      // console.log('传入的参数：', result);
      this.course_id = result.course_id;
      this.course_name = result.course_name;
    })
    //生成二维码
    var a = new QRious({
      element: this.qr.nativeElement,
      value: this.course_id,
      size: 255
    });
  }

  onBack() {
    // console.log('调用onback');
    this.router.navigateByUrl('/tabs/tabs/tab1');
  }

}
