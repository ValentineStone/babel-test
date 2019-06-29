import App from '/App'
import { hMixin } from '/lib/cx'

window.h = hMixin(React.createElement)
window.Fragment = React.Fragment

ReactDOM.render(<App />, document.querySelector('#App'))