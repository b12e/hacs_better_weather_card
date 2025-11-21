import { noChange } from 'lit';
import { AttributePart, directive, Directive, DirectiveParameters } from 'lit/directive.js';

interface ActionHandlerOptions {
  hasHold?: boolean;
  hasDoubleClick?: boolean;
}

interface ActionHandlerDetail {
  action: 'hold' | 'tap' | 'double_tap';
}

interface ActionHandlerElement extends HTMLElement {
  holdTime: number;
  bind(element: Element, options: ActionHandlerOptions): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'better-weather-action-handler': ActionHandlerElement;
  }
}

class ActionHandler extends HTMLElement implements ActionHandlerElement {
  public holdTime = 500;

  protected timer?: number;
  protected held = false;
  private dblClickTimeout?: number;

  constructor() {
    super();
    this.ripple = document.createElement('mwc-ripple');
  }

  public connectedCallback(): void {
    Object.assign(this.style, {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      overflow: 'hidden',
    });

    this.appendChild(this.ripple);
    this.ripple.primary = true;

    [
      'touchcancel',
      'mouseout',
      'mouseup',
      'touchmove',
      'mousewheel',
      'wheel',
      'scroll',
    ].forEach((ev) => {
      document.addEventListener(
        ev,
        () => {
          clearTimeout(this.timer);
          this.stopAnimation();
          this.timer = undefined;
        },
        { passive: true }
      );
    });
  }

  public bind(element: Element, options: ActionHandlerOptions): void {
    if (options.hasHold) {
      element.addEventListener('contextmenu', (ev: Event) => {
        const e = ev || window.event;
        if (e.preventDefault) {
          e.preventDefault();
        }
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
      });
    }

    element.addEventListener('touchstart', (ev: Event) => this.handleStart(ev, options), {
      passive: true,
    });
    element.addEventListener('touchend', (ev: Event) => this.handleEnd(ev, options), {
      passive: true,
    });
    element.addEventListener('touchcancel', () => {
      clearTimeout(this.timer);
      this.stopAnimation();
      this.timer = undefined;
    });

    element.addEventListener('mousedown', (ev: Event) => this.handleStart(ev, options), {
      passive: true,
    });
    element.addEventListener('click', (ev: Event) => this.handleEnd(ev, options));
  }

  private handleStart(ev: Event, options: ActionHandlerOptions): void {
    this.held = false;
    let x = 0;
    let y = 0;
    if ((ev as TouchEvent).touches) {
      x = (ev as TouchEvent).touches[0].pageX;
      y = (ev as TouchEvent).touches[0].pageY;
    } else {
      x = (ev as MouseEvent).pageX;
      y = (ev as MouseEvent).pageY;
    }
    this.timer = window.setTimeout(() => {
      this.startAnimation(x, y);
      this.held = true;
    }, this.holdTime);
  }

  private handleEnd(ev: Event, options: ActionHandlerOptions): void {
    if (['touchend', 'touchcancel'].includes(ev.type) && this.timer === undefined) {
      return;
    }
    clearTimeout(this.timer);
    this.stopAnimation();
    this.timer = undefined;
    if (this.held) {
      fireEvent(this, 'action', { action: 'hold' } as ActionHandlerDetail);
    } else if (options.hasDoubleClick) {
      if ((ev.type === 'click' && (ev as MouseEvent).detail < 2) || !this.dblClickTimeout) {
        this.dblClickTimeout = window.setTimeout(() => {
          this.dblClickTimeout = undefined;
          fireEvent(this, 'action', { action: 'tap' } as ActionHandlerDetail);
        }, 250);
      } else {
        clearTimeout(this.dblClickTimeout);
        this.dblClickTimeout = undefined;
        fireEvent(this, 'action', { action: 'double_tap' } as ActionHandlerDetail);
      }
    } else {
      fireEvent(this, 'action', { action: 'tap' } as ActionHandlerDetail);
    }
  }

  private ripple: any;

  private startAnimation(x: number, y: number): void {
    Object.assign(this.ripple.style, {
      left: `${x}px`,
      top: `${y}px`,
      display: null,
    });
    this.ripple.disabled = false;
    this.ripple.active = true;
    this.ripple.unbounded = true;
  }

  private stopAnimation(): void {
    this.ripple.active = false;
    this.ripple.disabled = true;
    this.ripple.style.display = 'none';
  }
}

const CUSTOM_TYPE_PREFIX = 'better-weather';

if (!customElements.get(`${CUSTOM_TYPE_PREFIX}-action-handler`)) {
  customElements.define(`${CUSTOM_TYPE_PREFIX}-action-handler`, ActionHandler);
}

const getActionHandler = (): ActionHandlerElement => {
  const body = document.body;
  const existingHandler = body.querySelector(`${CUSTOM_TYPE_PREFIX}-action-handler`);
  if (existingHandler) {
    return existingHandler as ActionHandlerElement;
  }

  const actionhandler = document.createElement(`${CUSTOM_TYPE_PREFIX}-action-handler`) as ActionHandlerElement;
  body.appendChild(actionhandler);

  return actionhandler;
};

function fireEvent(
  element: Element,
  type: string,
  detail: ActionHandlerDetail,
  options?: { bubbles?: boolean; composed?: boolean; cancelable?: boolean }
): Event {
  options = options || {};
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed,
  });
  (event as any).detail = detail;
  element.dispatchEvent(event);
  return event;
}

export class ActionHandlerDirective extends Directive {
  update(part: AttributePart, [options]: DirectiveParameters<this>) {
    this.render(options);
    return noChange;
  }

  render(options?: ActionHandlerOptions) {
    return (element: Element): void => {
      const actionHandler = getActionHandler();
      actionHandler.bind(element, options || {});
    };
  }
}

export const actionHandler = directive(ActionHandlerDirective);
