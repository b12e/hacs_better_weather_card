import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';
import { BetterWeatherCardConfig } from './types';

@customElement('better-weather-card-editor')
export class BetterWeatherCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: BetterWeatherCardConfig;

  public setConfig(config: BetterWeatherCardConfig): void {
    this.config = config;
  }

  private getWeatherEntities(): string[] {
    if (!this.hass) {
      return [];
    }
    return Object.keys(this.hass.states).filter((entity) => entity.startsWith('weather.'));
  }

  private valueChanged(ev: CustomEvent): void {
    const target = ev.target as any;
    let value: any;

    if (target.checked !== undefined) {
      value = target.checked;
    } else if (target.type === 'number') {
      value = target.value === '' ? 5 : parseInt(target.value, 10);
    } else {
      value = target.value;
    }

    if (this.config[target.configValue] === value) {
      return;
    }

    const newConfig = {
      ...this.config,
      [target.configValue]: value,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    const entities = this.getWeatherEntities();

    return html`
      <div class="card-config">
        <div class="option">
          <label for="entity">Entity (Required)</label>
          <select
            id="entity"
            .value=${this.config.entity || ''}
            .configValue=${'entity'}
            @change=${this.valueChanged}
          >
            <option value="">Select a weather entity</option>
            ${entities.map(
              (entity) => html`
                <option value=${entity} ?selected=${entity === this.config.entity}>
                  ${this.hass.states[entity]?.attributes?.friendly_name || entity}
                </option>
              `
            )}
          </select>
        </div>

        <div class="option">
          <label for="name">Name (Optional)</label>
          <input
            id="name"
            type="text"
            .value=${this.config.name || ''}
            .configValue=${'name'}
            @input=${this.valueChanged}
            placeholder="Leave empty to use entity name"
          />
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${this.config.show_current !== false}
              .configValue=${'show_current'}
              @change=${this.valueChanged}
            />
            Show current weather
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${this.config.show_forecast !== false}
              .configValue=${'show_forecast'}
              @change=${this.valueChanged}
            />
            Show forecast
          </label>
        </div>

        <div class="option">
          <label for="forecast-type">Forecast type</label>
          <select
            id="forecast-type"
            .value=${this.config.forecast_type || 'daily'}
            .configValue=${'forecast_type'}
            @change=${this.valueChanged}
          >
            <option value="daily">Daily</option>
            <option value="hourly">Hourly</option>
          </select>
        </div>

        <div class="option">
          <label for="forecast-days">Forecast ${this.config.forecast_type === 'hourly' ? 'hours' : 'days'}</label>
          <input
            id="forecast-days"
            type="number"
            min="1"
            max="48"
            .value=${this.config.forecast_days || 5}
            .configValue=${'forecast_days'}
            @input=${this.valueChanged}
          />
        </div>

        <div class="option">
          <label for="layout">Layout</label>
          <select
            id="layout"
            .value=${this.config.layout || 'compact'}
            .configValue=${'layout'}
            @change=${this.valueChanged}
          >
            <option value="compact">Compact (Mushroom style)</option>
            <option value="default">Default</option>
          </select>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }

      .option {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .option label {
        font-weight: 500;
        color: var(--primary-text-color);
        font-size: 14px;
      }

      .option input[type='checkbox'] {
        margin-right: 8px;
        cursor: pointer;
      }

      .option label:has(input[type='checkbox']) {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .option input[type='text'],
      .option input[type='number'],
      .option select {
        padding: 8px 12px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 4px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 14px;
        font-family: inherit;
        outline: none;
        transition: border-color 0.2s;
      }

      .option input[type='text']:focus,
      .option input[type='number']:focus,
      .option select:focus {
        border-color: var(--primary-color);
      }

      .option input[type='number'] {
        width: 120px;
      }

      .option select {
        cursor: pointer;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'better-weather-card-editor': BetterWeatherCardEditor;
  }
}
