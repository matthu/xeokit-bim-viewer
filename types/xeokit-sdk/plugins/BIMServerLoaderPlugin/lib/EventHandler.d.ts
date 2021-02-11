/**
 * @private
 */
export function EventHandler(): void;
export class EventHandler {
    handlers: {};
    on(evt: any, handler: any): void;
    off(evt: any, handler: any): void;
    fire(evt: any, args: any): void;
}
