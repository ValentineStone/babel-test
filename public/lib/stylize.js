const imported = new Set()

export default (url, content) => {
  if (!imported.has(url)) {
    imported.add(url)
    const style = document.createElement('style')
    style.innerHTML = content ? content : `@import url(${url});`
    document.head.appendChild(style)
  }
  else
    console.warn('attempted styles reimport for', url)
}