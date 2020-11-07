const parse = (str: string) => {
  const parsed = parseFloat(str)
  if (isNaN(parsed)) {
    return 0
  }
  return Math.max(0, parsed)
}

const _getOuterWidth = (e: HTMLElement) => {
  const { marginLeft, marginRight } = window.getComputedStyle(e)
  const width = e.offsetWidth + parse(marginLeft) + parse(marginRight)

  return Math.min(document.documentElement.scrollWidth, width)
}

const _getOuterHeight = (e: HTMLElement, heightCutoff: number) => {
  const { marginTop, marginBottom } = window.getComputedStyle(e)
  const height = e.offsetHeight + parse(marginTop) + parse(marginBottom)

  return Math.min(document.documentElement.scrollHeight, height, heightCutoff)
}

const _getOuterSize = (e: HTMLElement, heightCutoff: number) =>
  _getOuterWidth(e) * _getOuterHeight(e, heightCutoff)

export const getSizeScore = (
  e: HTMLElement,
  excludedElements: Element[],
  heightCutoff: number,
) => {
  const negativeSize = excludedElements.reduce((sum, curEx) => {
    if (e.contains(curEx) && curEx instanceof HTMLElement) {
      return sum + _getOuterSize(curEx, heightCutoff)
    }
    return sum
  }, 0)

  const elementOuterSize = Math.max(
    0,
    _getOuterSize(e, heightCutoff) - negativeSize,
  )

  const ratio = elementOuterSize / _getOuterSize(document.body, heightCutoff)
  const score = ratio ** 0.45
  return score
}
