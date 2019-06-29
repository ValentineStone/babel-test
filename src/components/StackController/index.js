import StackView from '/components/StackView'
import stylize from '/lib/stylize'

stylize('StackController', `
  .StackController {
    height: 100vh;
    display: flex;
    padding: .125rem;
  }
`)

export default class StackController extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      leftmostView: 0,
      visibleViewCount: this.getVisibleViewCount()
    }

    window.addEventListener('resize', () => this.setState({
      visibleViewCount: this.getVisibleViewCount()
    }), { passive: true })
  }


  getVisibleViewCount = (vw = window.innerWidth) => {
    let count = 0
    if (vw < 640)
      count = 1
    else if (vw < 960)
      count = 2
    else if (vw < 1440)
      count = 3
    else
      count = 4
    return Math.min(count, React.Children.count(this.props.children))
  }

  render() {
    let from = this.state.leftmostView
    let to = this.state.leftmostView + this.state.visibleViewCount
    return (
      <div className="StackController">
        {React.Children.toArray(this.props.children).map((child, i) =>
          <StackView hidden={i < from || i >= to} key={i}>
            {child}
          </StackView>
        )}
      </div>
    )
  }

  componentWillMount() {
    this.setState = super.setState
  }

  setState(stateDiff) {
    Object.assign(this.state, stateDiff)
  }
}