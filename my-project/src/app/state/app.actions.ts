export class GetWeather{
  static readonly type= '[App] Get-Weather';
  constructor(public city: string) {
  }
}
export class GetWeatherDays{
  static readonly type= '[App] Get-Weather-days';
  constructor(public city: string) {
  }
}
