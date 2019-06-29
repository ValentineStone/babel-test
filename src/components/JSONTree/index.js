import stylize from '/lib/stylize'
stylize('/components/JSONTree/style.css')

const renderObject = object => (
  <dl className="object">
    {'{'}
    {Object.entries(object).map(([key, value], i, array) =>
      <div className="entry" key={key}>
        <dt className="key">{JSON.stringify(key)}</dt>{': '}
        <dd className="value">{renderValue(value)}</dd>
        {i < array.length - 1 ? ',' : ''}
      </div>
    )}
    {'}'}
  </dl>
)

const renderArray = array => (
  <ol className="array">
    [{array.map((value, i) =>
      <li key={i} className="item">
        {<>
          {renderValue(value)}
          {i < array.length - 1 ? ',' : ''}
        </>}
      </li>
    )}]
  </ol>
)

const renderValue = value => {
  const type = typeOf(value)
  switch (type) {
    case 'array':
      return renderArray(value)
    case 'object':
      return renderObject(value)
    case 'undefined':
      return <span className={'primitive ' + type}>undefined</span>
    default:
      return <span className={'primitive ' + type}>{JSON.stringify(value)}</span>
  }
}

export default props => {
  return <div className="JSONTree">
    {renderValue(props.data)}
  </div>
}

const typeOf = (value, type = typeof value) => {
  if (type === 'object')
    return !value
      ? 'null'
      : typeof value[Symbol.iterator] === 'function'
        ? 'array'
        : 'object'
  else
    return type
}