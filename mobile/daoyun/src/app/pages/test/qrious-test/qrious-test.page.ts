import { element } from 'protractor';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var QRious: any;

@Component({
  selector: 'app-qrious-test',
  templateUrl: './qrious-test.page.html',
  styleUrls: ['./qrious-test.page.scss'],
})
export class QriousTestPage implements OnInit {

  constructor() { }
  @ViewChild('qr', {static: true}) qr: ElementRef;


  ngOnInit() {
  }
  ionViewDidEnter(){
    var a = new QRious({
      element:this.qr.nativeElement, 
      value: "www.baidu.com"
    });
    console.log('1');
  }

}
