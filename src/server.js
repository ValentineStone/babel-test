import deepcopy from '/lib/deepcopy'

class User {
  constructor() {

  }

  getMeta() {
    return {
      webClient: {
        openedViews: [
          {
            type: 'InitialView',
            searching: 'clients',
            search: 'Старушка'
          },
          {
            type: 'ClientView',
            clientId: '1337'
          },
          { type: 'PlaceholderView', n: 2 },
          { type: 'PlaceholderView', n: 3 }
        ],
        leftmostView: 2
      }
    }
  }
}




export default new class {
  constructor() {
    this.user = new User()
  }

  getUser() {
    return this.user
  }

  on(event, callback) {
    if (event === 'user.config.webClient')
      callback(deepcopy(this.user.getMeta().webClient))
  }
}