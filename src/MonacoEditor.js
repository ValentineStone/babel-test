import stylize from '/lib/stylize'
stylize('MonacoEditor', `
  .MonacoEditor {
    overflow: hidden;
  }
`)

export default class MonacoEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      monacoLoaded: false,
      monacoReady: false,
    }
    this.rootDivRef = React.createRef()
  }
  componentDidMount() {
    require(['vs/editor/editor.main'], () =>
      this.setState({ monacoLoaded: true })
    )
  }
  componentDidUpdate() {
    if (this.state.monacoLoaded && !this.state.monacoReady) {
      monaco.editor.create(this.rootDivRef.current, {
        language: 'javascript'
      })
      this.setState({ monacoReady: true })
    }
  }
  render() {
    return (
      <div
        className="MonacoEditor"
        ref={this.rootDivRef}
      />
    )
  }
}