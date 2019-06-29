import EventEmmiter from '/lib/tiny-events'

const getState = () => ({
  hash: location.hash,
  host: location.host,
  hostname: location.hostname,
  href: location.href,
  origin: location.origin,
  pathname: location.pathname,
  port: location.port,
  protocol: location.protocol,
  search: location.search,
  meta: history.state
})

const shalowEqual = (a, b) => {
  if (Object.keys(a).length !== Object.keys(b).length)
    return false
  for (let key in a)
    if (a[key] != b[key])
      return false
  return true
}

const router = new class Router extends EventEmmiter {
  constructor() {
    super()
    this.initialState = getState()
    this.currentState = this.initialState
    window.addEventListener('popstate', this.__onChangeStateState.bind(this))
  }

  pushState(href, state) {
    history.pushState(state, null, href)
    this.__onChangeStateState()
  }

  replaceState(href, state) {
    history.replaceState(state, null, href)
    this.__onChangeStateState()
  }

  __onChangeStateState() {
    const prev = this.currentState
    this.currentState = getState()
    //if (JSON.stringify(this.currentState) !== JSON.stringify(prev))
    if (!shalowEqual(this.currentState, prev))
      this.emit('state', this.currentState, prev)
  }
}

export default router