import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { WeatherAppComponent } from './weather-app/weather-app.component';
import {WeatherService} from "./service/weather.service";
import {AppState} from "./state/app.state";
import {NgxsModule} from "@ngxs/store";
import { KelvinToCelsiusPipe } from './pipes/kelvin-to-celsius.pipe';
import { WeatherIconPipe } from './pipes/weather-icon.pipe';
import { DxChartModule } from "devextreme-angular";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    WeatherAppComponent,
    KelvinToCelsiusPipe,
    WeatherIconPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DxChartModule,
    MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgxsModule.forRoot([
      AppState,
    ]),
  ],
  exports:[TranslateModule],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}
