const deepcopy = value => {
  if (value && typeof value === 'object')
    if (Array.isArray(value))
      return value.map(v => deepcopy(v))
    else {
      const object = {}
      for (let key in value)
        object[key] = deepcopy(value[key])
      return object
    }
  else
    return value
}

export default deepcopy