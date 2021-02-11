/**
 * @private
 */
export function Notifier(): void;
export class Notifier {
    setSelector: (selector: any, ...args: any[]) => void;
    clear: (...args: any[]) => void;
    resetStatus: (...args: any[]) => void;
    resetStatusQuick: (...args: any[]) => void;
    setSuccess: (status: any, timeToShow: any, ...args: any[]) => void;
    setInfo: (status: any, timeToShow: any, ...args: any[]) => void;
    setError: (error: any, ...args: any[]) => void;
}
