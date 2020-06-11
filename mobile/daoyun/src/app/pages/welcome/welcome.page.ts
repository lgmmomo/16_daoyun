import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})

export class WelcomePage implements OnInit {

  showSkip = true;
  appConfig:any;

  @ViewChild('slides', { static: false }) slides: IonSlides;
  constructor(private localStorageService: LocalStorageService,
    private router: Router) {
    this.appConfig = this.localStorageService.get(APP_KEY, {
      hasRun: false,
      version: '1.0.0',
      isLogin: false
    });
  }
  ngOnInit() {
  }
  onSlideWillChange(event) {
    console.log(event);
    this.slides.isEnd().then((end) => {
      this.showSkip = !end;  //end=1,不显示跳过按钮
    });
  }
  onSkip() {  // 跳过按钮
    this.appConfig.hasRun=true;
    this.localStorageService.set(APP_KEY, this.appConfig);
    this.router.navigateByUrl('/login-in');
  }
  onLoginIn(){
    this.appConfig.hasRun=true;
    this.localStorageService.set(APP_KEY, this.appConfig);
    this.router.navigateByUrl('/login-in');
  }
  onSignUp(){
    this.appConfig.hasRun=true;
    this.localStorageService.set(APP_KEY, this.appConfig);
    this.router.navigateByUrl('/sign-up');
  }
}

export const APP_KEY: string = 'App';
