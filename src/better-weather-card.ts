import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';
import { BetterWeatherCardConfig, WeatherEntityState, ForecastItem } from './types';
import { CARD_VERSION, WEATHER_ICON_MAP } from './const';

console.info(
  `%c  BETTER-WEATHER-CARD  \n%c  Version ${CARD_VERSION}  `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray'
);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'better-weather-card',
  name: 'Better Weather Card',
  description: 'A beautiful weather card with Mushroom-inspired design',
});

@customElement('better-weather-card')
export class BetterWeatherCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: BetterWeatherCardConfig;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement('better-weather-card-editor') as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<BetterWeatherCardConfig> {
    return {
      entity: '',
      show_current: true,
      show_forecast: true,
      forecast_days: 5,
      forecast_type: 'daily',
    };
  }

  public getCardSize(): number {
    return 3;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._fetchForecast();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._forecastSubscription) {
      this._forecastSubscription();
      this._forecastSubscription = undefined;
    }
  }

  public setConfig(config: BetterWeatherCardConfig): void {
    const oldConfig = this.config;
    this.config = {
      show_current: true,
      show_forecast: true,
      forecast_days: 5,
      forecast_type: 'daily',
      ...config,
    };

    // Refetch forecast if entity or type changed
    if (oldConfig && (
      oldConfig.entity !== this.config.entity ||
      oldConfig.forecast_type !== this.config.forecast_type
    )) {
      this._forecast = [];
      if (this._forecastSubscription) {
        this._forecastSubscription();
        this._forecastSubscription = undefined;
      }
      if (this.hass) {
        this._fetchForecast();
      }
    }
  }

  private _forecastSubscription?: () => void;

  private async _fetchForecast(): Promise<void> {
    if (!this.hass || !this.config.entity) {
      return;
    }

    const forecastType = this.config.forecast_type || 'daily';

    try {
      // Try to get forecast from attributes first (old method, before 2023.9)
      const weather = this.weatherEntity;
      if (weather?.attributes?.forecast) {
        this._forecast = weather.attributes.forecast;
        this.requestUpdate();
        return;
      }

      // For HA 2023.9+, use the weather.get_forecasts action with response data
      // Format according to HA documentation
      try {
        const result = await this.hass.callWS<Record<string, { forecast: ForecastItem[] }>>({
          type: 'execute_script',
          sequence: [
            {
              action: 'weather.get_forecasts',
              data: {
                type: forecastType,
              },
              target: {
                entity_id: this.config.entity,
              },
              response_variable: 'forecast_data',
            },
          ],
        });

        // Extract forecast from response_variable
        if (result) {
          const forecasts = (result as any).forecast_data;
          if (forecasts && forecasts[this.config.entity]?.forecast) {
            this._forecast = forecasts[this.config.entity].forecast;
            this.requestUpdate();
            return;
          }
        }
      } catch (wsError: any) {
        // execute_script method failed
      }

      // Try direct service call approach
      try {
        // Some integrations return the data directly from the service
        const serviceData = await this.hass.callWS({
          type: 'call_service',
          domain: 'weather',
          service: 'get_forecasts',
          service_data: {
            type: forecastType,
          },
          target: {
            entity_id: this.config.entity,
          },
          return_response: true,
        });

        if (serviceData && typeof serviceData === 'object') {
          const data = serviceData as any;

          // Check multiple possible response formats
          // Format 1: response["weather.entity"].forecast
          const entityForecast = data.response?.[this.config.entity]?.forecast ||
                                 data[this.config.entity]?.forecast;

          if (entityForecast && Array.isArray(entityForecast)) {
            this._forecast = entityForecast;
            this.requestUpdate();
            return;
          }
        }
      } catch (serviceError: any) {
        // Service call failed
      }

      // Fallback: Check for separate hourly/daily forecast attributes
      if (weather?.attributes) {
        const attrs = weather.attributes as any;
        const forecastAttr = forecastType === 'hourly' ? attrs.forecast_hourly : attrs.forecast_daily;
        if (forecastAttr && Array.isArray(forecastAttr)) {
          this._forecast = forecastAttr;
          this.requestUpdate();
          return;
        }
      }

      // No forecast available
      this._forecast = [];
      this.requestUpdate();
    } catch (error) {
      this._forecast = [];
      this.requestUpdate();
    }
  }

  protected updated(changedProps: Map<string, any>): void {
    super.updated(changedProps);

    // Fetch forecast when hass becomes available
    if (changedProps.has('hass') && this.hass && !this._forecast.length && this.config?.show_forecast) {
      this._fetchForecast();
    }
  }

  private get weatherEntity(): WeatherEntityState | undefined {
    return this.hass.states[this.config.entity] as unknown as WeatherEntityState;
  }

  private getWeatherIcon(condition: string): string {
    return WEATHER_ICON_MAP[condition] || 'mdi:weather-cloudy';
  }

  private formatTemperature(temperature: number): string {
    return `${Math.round(temperature)}°`;
  }

  private formatDay(datetime: string): string {
    const date = new Date(datetime);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const isHourly = this.config.forecast_type === 'hourly';

    if (isHourly) {
      // For hourly forecast, show time
      return date.toLocaleTimeString(undefined, { hour: 'numeric', hour12: true });
    }

    // For daily forecast
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    return date.toLocaleDateString(undefined, { weekday: 'short' });
  }

  private handleAction(actionConfig: any): void {
    if (actionConfig) {
      fireEvent(this, 'hass-action' as any, { config: this.config, action: actionConfig });
    }
  }

  protected render(): TemplateResult {
    if (!this.config || !this.hass) {
      return html``;
    }

    if (!this.config.entity) {
      return html`
        <ha-card>
          <div class="warning">Please select a weather entity in the card configuration</div>
        </ha-card>
      `;
    }

    const weather = this.weatherEntity;
    if (!weather) {
      return html`
        <ha-card>
          <div class="warning">Entity not found: ${this.config.entity}</div>
        </ha-card>
      `;
    }

    const forecast = this._forecast.slice(0, this.config.forecast_days || 5);

    return html`
      <ha-card>
        <div class="card-content compact">
          ${this.config.show_current ? this.renderCompactCurrent(weather) : ''}
          ${this.config.show_forecast ? this.renderForecast(forecast) : ''}
        </div>
      </ha-card>
    `;
  }

  @state() private _forecast: ForecastItem[] = [];

  private renderCompactCurrent(weather: WeatherEntityState): TemplateResult {
    const name = this.config.name || weather.attributes.friendly_name || 'Weather';
    const condition = weather.state;
    const temperature = weather.attributes.temperature;
    const humidity = weather.attributes.humidity;

    return html`
      <div class="compact-weather">
        <div class="compact-main">
          <div class="icon-container">
            <ha-icon .icon=${this.getWeatherIcon(condition)}></ha-icon>
          </div>
          <div class="compact-info">
            <div class="name">${name}</div>
            <div class="condition">${this.getConditionText(condition)}</div>
          </div>
          <div class="compact-temp">${this.formatTemperature(temperature)}</div>
          <div class="compact-humidity">
            <ha-icon icon="mdi:water-percent"></ha-icon>
            <span>${humidity}%</span>
          </div>
        </div>
      </div>
    `;
  }

  private renderForecast(forecast: ForecastItem[]): TemplateResult {
    if (!forecast || forecast.length === 0) {
      return html``;
    }

    return html`
      <div class="forecast">
        ${forecast.map(
          (day) => html`
            <div class="forecast-day">
              <div class="day-name">${this.formatDay(day.datetime)}</div>
              <ha-icon .icon=${this.getWeatherIcon(day.condition)}></ha-icon>
              <div class="temperature">${this.formatTemperature(day.temperature)}</div>
              ${day.templow !== undefined
                ? html`<div class="temp-low">${this.formatTemperature(day.templow)}</div>`
                : ''}
            </div>
          `
        )}
      </div>
    `;
  }

  private getConditionText(condition: string): string {
    const conditions: Record<string, string> = {
      'clear-night': 'Clear night',
      'cloudy': 'Cloudy',
      'fog': 'Foggy',
      'hail': 'Hail',
      'lightning': 'Lightning',
      'lightning-rainy': 'Lightning & rain',
      'partlycloudy': 'Partly cloudy',
      'pouring': 'Pouring',
      'rainy': 'Rainy',
      'snowy': 'Snowy',
      'snowy-rainy': 'Snow & rain',
      'sunny': 'Sunny',
      'windy': 'Windy',
      'windy-variant': 'Windy',
      'exceptional': 'Exceptional',
    };
    return conditions[condition] || condition;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --spacing: 12px;
        --border-radius: 12px;
        --icon-size: 40px;
      }

      ha-card {
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: var(--ha-card-border-radius, var(--border-radius));
        box-shadow: var(
          --ha-card-box-shadow,
          0px 2px 1px -1px rgba(0, 0, 0, 0.2),
          0px 1px 1px 0px rgba(0, 0, 0, 0.14),
          0px 1px 3px 0px rgba(0, 0, 0, 0.12)
        );
      }

      ha-card {
        padding: 0;
        height: auto;
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: 0;
        padding: 12px 16px;
      }

      .compact-weather {
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      /* Add margin only when forecast is shown */
      .compact-weather:not(:last-child) {
        margin-bottom: 12px;
      }

      .compact-main {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 0;
      }

      .compact-main .icon-container {
        width: 40px;
        height: 40px;
        background: var(--primary-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .compact-main .icon-container ha-icon {
        --mdc-icon-size: 24px;
        color: white;
      }

      .compact-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .compact-info .name {
        font-weight: 500;
        font-size: 14px;
        color: var(--primary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .compact-info .condition {
        font-size: 12px;
        color: var(--secondary-text-color);
        opacity: 0.7;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .compact-temp {
        font-size: 24px;
        font-weight: 300;
        color: var(--primary-text-color);
        margin-right: 8px;
      }

      .compact-humidity {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;
        color: var(--secondary-text-color);
      }

      .compact-humidity ha-icon {
        --mdc-icon-size: 16px;
      }

      .forecast {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
        gap: 8px;
      }

      .forecast-day {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 8px 4px;
        background: var(--secondary-background-color, rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.05));
        border-radius: 12px;
        text-align: center;
        transition: background 0.2s;
      }

      .day-name {
        font-size: 11px;
        font-weight: 500;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.1px;
      }

      .forecast-day ha-icon {
        --mdc-icon-size: 24px;
        color: var(--primary-color);
      }

      .forecast-day .temperature {
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .temp-low {
        font-size: 13px;
        color: var(--secondary-text-color);
        opacity: 0.6;
        font-weight: 400;
      }

      .warning {
        display: block;
        color: var(--error-color, #f44336);
        padding: 16px;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'better-weather-card': BetterWeatherCard;
  }
}
