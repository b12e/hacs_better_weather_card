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
      layout: 'compact',
    };
  }

  public getCardSize(): number {
    return 3;
  }

  public connectedCallback(): void {
    super.connectedCallback();
  }

  public setConfig(config: BetterWeatherCardConfig): void {
    this.config = {
      show_current: true,
      show_forecast: true,
      forecast_days: 5,
      layout: 'compact',
      ...config,
    };
  }

  private async _fetchForecast(): Promise<ForecastItem[]> {
    if (!this.hass || !this.config.entity) {
      return [];
    }

    try {
      // Try to get forecast from attributes first (old method)
      const weather = this.weatherEntity;
      if (weather?.attributes?.forecast) {
        return weather.attributes.forecast;
      }

      // Try the new weather.get_forecasts service
      const response = await this.hass.callWS<any>({
        type: 'weather/subscribe_forecast',
        forecast_type: 'daily',
        entity_id: this.config.entity,
      });

      return response?.forecast || [];
    } catch (error) {
      console.error('Error fetching forecast:', error);
      return [];
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

    const isCompact = this.config.layout === 'compact';

    return html`
      <ha-card>
        <div class="card-content ${isCompact ? 'compact' : ''}">
          ${this.config.show_current
            ? isCompact
              ? this.renderCompactCurrent(weather)
              : this.renderCurrent(weather)
            : ''}
          ${this.config.show_forecast ? this.renderForecastAsync() : ''}
        </div>
      </ha-card>
    `;
  }

  private renderForecastAsync(): TemplateResult {
    this._fetchForecast().then((forecast) => {
      this._forecast = forecast.slice(0, this.config.forecast_days || 5);
      this.requestUpdate();
    });

    return this.renderForecast(this._forecast || []);
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

  private renderCurrent(weather: WeatherEntityState): TemplateResult {
    const name = this.config.name || weather.attributes.friendly_name || 'Weather';
    const condition = weather.state;
    const temperature = weather.attributes.temperature;
    const humidity = weather.attributes.humidity;

    return html`
      <div class="current-weather">
        <div class="current-header">
          <div class="icon-container">
            <ha-icon .icon=${this.getWeatherIcon(condition)}></ha-icon>
          </div>
          <div class="current-info">
            <div class="name">${name}</div>
            <div class="condition">${this.getConditionText(condition)}</div>
          </div>
        </div>
        <div class="current-details">
          <div class="temperature">${this.formatTemperature(temperature)}</div>
          <div class="humidity">
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
        padding: var(--spacing);
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
      }

      .card-content.compact {
        gap: 8px;
      }

      /* Compact Mode Styles */
      .compact-weather {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .compact-main {
        display: flex;
        align-items: center;
        gap: 12px;
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

      /* Default Mode Styles */
      .current-weather {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
        padding: var(--spacing);
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: var(--border-radius);
      }

      .current-header {
        display: flex;
        align-items: center;
        gap: var(--spacing);
      }

      .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--icon-size);
        height: var(--icon-size);
        background: var(--primary-color);
        border-radius: 50%;
        color: var(--primary-text-color, #fff);
        flex-shrink: 0;
      }

      .icon-container ha-icon {
        --mdc-icon-size: 24px;
      }

      .current-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .name {
        font-weight: 500;
        font-size: 16px;
        color: var(--primary-text-color);
      }

      .condition {
        font-size: 14px;
        color: var(--secondary-text-color);
        opacity: 0.7;
      }

      .current-details {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 8px;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      }

      .temperature {
        font-size: 32px;
        font-weight: 300;
        color: var(--primary-text-color);
      }

      .humidity {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;
        color: var(--secondary-text-color);
      }

      .humidity ha-icon {
        --mdc-icon-size: 18px;
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
        gap: 8px;
        padding: 12px 8px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: var(--border-radius);
        text-align: center;
      }

      .day-name {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
        text-transform: uppercase;
      }

      .forecast-day ha-icon {
        --mdc-icon-size: 28px;
        color: var(--primary-color);
      }

      .forecast-day .temperature {
        font-size: 18px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .temp-low {
        font-size: 14px;
        color: var(--secondary-text-color);
        opacity: 0.7;
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
