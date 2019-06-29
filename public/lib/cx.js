const extract = (from, to = []) => {
  if (typeof from === 'string' || from instanceof String)
    to.push(from)
  else if (from && typeof from === 'object')
    if (typeof from[Symbol.iterator] === 'function')
      for (let item of from)
        extract(item, to)
    else
      for (let key in from)
        if (from[key])
          to.push(key)
  return to
}

const cx = (...args) => {
  return extract(args).join(' ')
}

export default cx

export const hMixin = h => (name, props, ...childs) => {
  if (props && typeof props.className === 'object')
    props.className = cx(props.className)
  return h(name, props, ...childs)
}