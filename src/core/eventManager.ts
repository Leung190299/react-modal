import { randomId } from "../utils/funciton";

let eventManager: Map<string,Modal.ModalOptions> = new Map();
let listeners:Set<Function> = new Set();

function addEventListener() {
    listeners.forEach((callback) => {
        callback();
    });
}
function dispatchEvent<T= any>( options: Modal.ModalOptions<T>) {
    const id= options.id || randomId();
    eventManager.set(id, options);
    addEventListener();
}

function modal(options: Modal.ModalOptions) {
    return dispatchEvent(options);
}
modal.open = dispatchEvent;

export { eventManager, listeners, modal };

