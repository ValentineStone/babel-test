import stylize from '/lib/stylize'

stylize('StackView', `
  .StackView-socket {
    display: flex;
    flex: 1;
    border: 1px solid lightblue;
    overflow: auto;
    padding: .5rem;
    margin: .125rem;
  }

  .StackView {
    display: flex;
    flex: 1;
    border: 1px solid lightblue;
    padding: .5rem;
    max-width: 100%;
  }

  .StackView-hidden {
    display: none;
  }

  .StackView > * {
    flex: 1;
  }
`)

export default props => {
  return (
    <div className={props.hidden
      ? 'StackView-socket StackView-hidden'
      : 'StackView-socket'
    }>
      <section className="StackView">
        {props.children}
      </section>
    </div>
  )
}