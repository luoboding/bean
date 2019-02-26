// EventTarget是Node的父类
/**
 * EventTarget -> Node -> Element          \
 *                     |                    \
 *                     ----> Document        \
 *                                            ->  HTMLElement
 *                                           /
 * GlobalEventHandlers                      /
 */
const EventTarget = function() {
  this.listeners = {};
}
EventTarget.prototype.listeners = null;
EventTarget.prototype.addEventListener = function(type, callback) {
  if (!(type in this.listeners)) {
    this.listeners[type] = [];
  }
  this.listeners[type].push(callback);
};
EventTarget.prototype.removeEventListener = function(type, callback) {
  if (!(type in this.listeners)) {
    return;
  }
  const listeners = this.listeners[type];
  for (let i = 0, length = listeners.length; i < length; i++) {
    if (listeners[i] === callback) {
      listeners.splice(i, 1);
      return this.removeEventListener(type, callback);
    }
  }
}

EventTarget.prototype.dispatchEvent = function(event) {
  if (!(event.type in this.listeners)) {
    return;
  }
  const listeners = this.listeners[event.type];
  for(let i = 0, length = listeners.length; i < length; i++) {
    listeners[i].call(this, event);
  }
}
