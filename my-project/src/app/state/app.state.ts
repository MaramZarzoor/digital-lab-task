import {Action, Actions, ofActionDispatched, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from "@angular/core";
import {WeatherService} from "../service/weather.service";
import {GetWeather, GetWeatherDays} from "./app.actions";
import {map, takeUntil, tap} from "rxjs/operators";
import {get} from 'lodash';
export class AppStateModel {
  oneDay: any;
  manyDays:any;
}

const defaults = {
  oneDay: null,
  manyDays: null
};
@State<AppStateModel>({
  name: 'app',
  defaults
})

@Injectable()
export class AppState {


  constructor(private actions$: Actions, private service: WeatherService) {
  }
  @Selector()
  static result(state: AppStateModel) {
    return get(state, 'oneDay');
  }
  @Selector()
  static resultDays(state: AppStateModel) {
    return get(state, 'manyDays');
  }
  @Action(GetWeather)
  getWeather(
    {getState, patchState, dispatch, setState}: StateContext<AppStateModel>,
    {city}: GetWeather
  ) {
    return this.service.getWeather(city).pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          oneDay: result
        });
      })
    );
  }

  @Action(GetWeatherDays)
  getWeatherDays(
    {getState, patchState, dispatch, setState}: StateContext<AppStateModel>,
    {city}: GetWeather
  ) {
    return this.service.getWeatherDays(city).pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          manyDays: result
        });
      })
    );
  }
}
