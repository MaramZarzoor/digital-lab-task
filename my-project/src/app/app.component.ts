import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {filter, startWith} from 'rxjs/operators';
import {environment} from "../environments/environment";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {GetWeather} from "./state/app.actions";
import {Store} from "@ngxs/store";
import config from 'devextreme/core/config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    Location, {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ]
})
export class AppComponent implements OnInit {
  location: any;
  routerSubscription: any;
  constructor(
    private router: Router,
    private store:Store,
    private translateService: TranslateService,
  ) {
    config({
      rtlEnabled: false
    });
    translateService.setDefaultLang('en');
    translateService.use('en');
  }

  ngOnInit(): void {
     // this.recallJsFuntions();
  }


}
