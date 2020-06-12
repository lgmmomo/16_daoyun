import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private localStorageService: LocalStorageService) {
    let theme = this.localStorageService.get('data-theme', 'light');
    document.body.setAttribute('data-theme', theme);
  }

}
