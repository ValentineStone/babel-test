import stylize from '/lib/stylize'
import cx from '/lib/cx'
stylize('Monaco', `
  .Monaco {
    overflow: hidden;
  }
`)

export default class Monaco extends React.PureComponent {
  constructor(props) {
    super(props)
    this.editor = null
    this.state = {
      monacoLoaded: false,
      monacoReady: false,
    }
    this.rootDivRef = React.createRef()
  }

  render() {
    console.log('render')
    if ('value' in this.props)
      if (this.editor) {
        if (this.editor.getValue() !== this.props.value)
          this.editor.setValue(this.props.value)
      }
      else
        this.initialValue = this.props.value
    return (
      <div
        className={cx('Monaco', this.props.className)}
        ref={this.rootDivRef}
      />
    )
  }

  mountMonaco(element) {
    require(['vs/editor/editor.main'], () => {
      this.editor = monaco.editor.create(element, {
        theme: 'vs-dark',
        language: this.props.language || 'text',
        automaticLayout: true,
        value: this.initialValue || this.props.defaultValue || ''
      })
      this.editor.getModel().updateOptions({ tabSize: 2 })
      this.editor.onDidChangeModelContent(() => {
        if (typeof this.props.onInput === 'function')
          this.props.onInput(this.editor.getValue())
      })
      if (this.props.focused)
        this.editor.focus()
    })
  }

  componentDidMount() {
    require(['vs/editor/editor.main'], () =>
      this.setState({ monacoLoaded: true })
    )
  }

  componentDidUpdate() {
    if (this.state.monacoLoaded && !this.state.monacoReady) {
      this.mountMonaco(this.rootDivRef.current)
      this.setState({ monacoReady: true })
    }
  }
}