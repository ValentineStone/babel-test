export default class EventEmmiter {
  constructor() {
    this.events = new Map()
  }

  __getEventController(name) {
    if (!this.events.has(name))
      this.events.set(name, {
        on: new Set(),
        once: new Set()
      })
    return this.events.get(name)
  }

  on(name, listener) {
    if (typeof listener !== 'function') return;
    this.__getEventController(name).on.add(listener)
  }

  once(name, listener) {
    if (typeof listener !== 'function') return;
    this.__getEventController(name).once.add(listener)
  }

  remove(name, listener, type) {
    if (type !== 'on')
      this.__getEventController(name).once.delete(listener)
    if (type !== 'once')
      this.__getEventController(name).on.delete(listener)
  }

  emit(name, ...args) {
    let controller = this.__getEventController(name)
    let once = controller.once
    if (once.size)
      [controller.once, once] = [new Set(), controller.once]
    once.forEach(listener => listener(...args))
    controller.on.forEach(listener => listener(...args))
  }
}