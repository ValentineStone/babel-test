export default class Markdown extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.data === state.data)
      return null
    else
      return {
        data: props.data,
        markup: { __html: marked(props.data) }
      }
  }
  state = {}
  render() {
    return (
      <div
        dangerouslySetInnerHTML={this.state.markup}
      />
    )
  }
}