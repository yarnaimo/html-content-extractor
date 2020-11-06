import { getDepthScore } from './depth'
import { getSizeScore } from './size'

const defaultExcludedSelector = 'aside'

const getAllElements = () => [...document.body.getElementsByTagName('*')]

export const getScore = ({
  element,
  excludedElements,
  heightCutoff,
}: {
  element: HTMLElement
  excludedElements: Element[]
  heightCutoff: number
}) => {
  const sizeScore = getSizeScore(element, excludedElements, heightCutoff)

  return {
    sizeScore,
    getDetailedScores: () => {
      const depthScore = getDepthScore(element)
      const score = sizeScore * depthScore
      return { sizeScore, depthScore, score }
    },
  }
}

export const getHigherScoreElements = (
  excludedSelector = defaultExcludedSelector,
) => {
  const excludedElements = excludedSelector
    ? [...document.body.querySelectorAll(excludedSelector)]
    : []

  const heightCutoff = document.body.offsetHeight * 0.675

  return getAllElements()
    .flatMap((element) => {
      if (!(element instanceof HTMLElement)) {
        return []
      }
      const { sizeScore, getDetailedScores } = getScore({
        element,
        excludedElements,
        heightCutoff,
      })
      if (sizeScore < 0.5) {
        return []
      }
      return [{ element, ...getDetailedScores() }]
    })
    .sort((a, b) => b.score - a.score)
}

export const extractMainContent = (
  excludedSelector = defaultExcludedSelector,
) => {
  const topElements = getHigherScoreElements(excludedSelector)
  const topElement = topElements[0] as typeof topElements[0] | undefined
  return topElement?.element.innerText
}
