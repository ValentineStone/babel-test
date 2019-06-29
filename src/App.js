import stylize from '/lib/stylize'
import Monaco from '/components/Monaco'
import StackController from '/components/StackController'
import JSONTree from '/components/JSONTree'
import Markdown from '/components/Markdown'

stylize('App', `
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    height: 100vh;
  }

  html {
    font-size: 16px;
    height: 100vh;
  }

  .some-class: {
    border: 1px solid black;
  }

  @media (min-width:1920px) {
    html {
      font-size: calc(16 * 100vw / 1920);
    }
  }
`)

const parseSafe = json => {
  try {
    return JSON.parse(json)
  }
  catch (e) {
    return undefined
  }
}

const data = `{
  "plugins": [
    "@babel/plugin-syntax-jsx",
    ["@babel/plugin-transform-react-jsx", {
      "pragma": "h",
      "pragmaFrag": "Fragment",
      "useBuiltIns": true
    }],    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ]
}`

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      jsonText: data,
      jsonData: JSON.parse(data),
      markdown: ''
    }
  }

  handleInput = value => this.setState(state => ({
    jsonText: value,
    jsonData: parseSafe(value) || state.jsonData
  }))

  handleInputMd = value => this.setState({ markdown: value })

  render() {
    return (
      <StackController>
        <Monaco
          defaultValue={data}
          onInput={this.handleInput}
          language="json"
        />
        <JSONTree data={this.state.jsonData} />
        <Monaco onInput={this.handleInputMd} />
        <Markdown data={this.state.markdown} />
      </StackController>
    )
  }
}