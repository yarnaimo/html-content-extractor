const _getDepth = (e: HTMLElement, _baseDepth = 0): number => {
  if (e instanceof HTMLBodyElement) {
    return _baseDepth
  }
  return _getDepth(e.parentElement!, _baseDepth + 1)
}

export const getDepthScore = (e: HTMLElement) => {
  const depth = _getDepth(e)
  const score = depth ** 0.4
  return score
}
