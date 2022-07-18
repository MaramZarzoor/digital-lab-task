import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {
  }


  getWeather(city: string): Observable<any> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', '1c6b8e56f3cbde7a4cce30cd734982ac');
    return this.http.get(environment.getWeather, {params});
  }
  getWeatherDays(city: string): Observable<any> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', '1c6b8e56f3cbde7a4cce30cd734982ac');
    return this.http.get(environment.getWeatherDays, {params});
  }
}
