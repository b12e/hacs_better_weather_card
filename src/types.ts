import { LovelaceCardConfig, ActionConfig } from 'custom-card-helpers';

export interface BetterWeatherCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;
  name?: string;
  show_current?: boolean;
  show_forecast?: boolean;
  forecast_items?: number;
  forecast_type?: 'hourly' | 'daily';
  show_forecast_humidity?: boolean;
  colored_icons?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export interface WeatherEntityState {
  entity_id: string;
  state: string;
  attributes: {
    temperature: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
    wind_bearing: number;
    visibility: number;
    forecast?: ForecastItem[];
    friendly_name?: string;
  };
  last_changed: string;
  last_updated: string;
}

export interface ForecastItem {
  condition: string;
  datetime: string;
  temperature: number;
  templow?: number;
  precipitation?: number;
  precipitation_probability?: number;
  humidity?: number;
}
