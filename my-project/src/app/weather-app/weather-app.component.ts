import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../service/weather.service";
import {Store} from "@ngxs/store";
import {GetWeather, GetWeatherDays} from "../state/app.actions";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppState} from "../state/app.state";
import {get} from 'lodash' ;
import * as moment from "moment";
import emojioneQA from '@iconify/icons-emojione/flag-for-flag-united-arab-emirates';
import emojioneUK from '@iconify/icons-emojione/flag-for-flag-united-kingdom';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss']
})
export class WeatherAppComponent implements OnInit {
  searchForm: FormGroup;
  result: any;
  resultDays: any[];
  resultDaysHumidity: any[];
  resultDaysWind: any[];
  isSunSet: boolean;
  isSearched = false;
  emojioneUK = emojioneUK;
  emojioneQA = emojioneQA;
  languages: any[] = [{
    id: 0,
    label: 'English',
    icon: this.emojioneUK,
    lang: 'en'
  }, {
    id: 1,
    label: 'العربية  ',
    icon: this.emojioneQA,
    lang: 'ar'
  }];
  constructor(private weatherService: WeatherService,
              private fb: FormBuilder,
              private store: Store,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.initForms();
  }

  initForms(): void {
    this.searchForm = this.fb.group({
      city: [null],
    });
  }
  useLanguage(language: string): void {
    this.translateService.use(language);
  }
  onSubmit() {
    const formValue = this.searchForm.value;
    const value = formValue.city;
    this.store.dispatch([new GetWeather(value),
      new GetWeatherDays(value)]).subscribe(res => {
        this.result = this.store.selectSnapshot(AppState.result);
        this.resultDays = get(this.store.selectSnapshot(AppState.resultDays), 'list', []).map((item: any) => ({
          arg: item.dt_txt,
          val: (item.main?.temp || 0) - 273.15
        }));
        this.resultDaysHumidity = get(this.store.selectSnapshot(AppState.resultDays), 'list', []).map((item: any) => ({
          arg: item.dt_txt,
          val: item.main?.humidity
        }));
        this.resultDaysWind = get(this.store.selectSnapshot(AppState.resultDays), 'list', []).map((item: any) => ({
          arg: item.dt_txt,
          val: item.wind?.speed
        }));
      this.setIsSunSet();
        this.isSearched = true;
      }
    )

  }

  setIsSunSet(time?: any) {
    const sunsetTime = time ? moment(time) : moment().hour(18).minute(16);
    this.isSunSet = moment().isAfter(sunsetTime);
  }

  customizeText(args: any) {
    console.log(new Date(args.value));
    return moment(args.value).format('ddd');
  }


}
