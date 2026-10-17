import { useEffect } from 'react'

function useScrollReveal(selector) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer = 'IntersectionObserver' in window && !prefersReducedMotion
      ? new IntersectionObserver(
        (entries, currentObserver) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              currentObserver.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08 },
      )
      : null

    const observeElements = (node) => {
      if (!(node instanceof Element)) return

      const elements = [
        ...(node.matches(selector) ? [node] : []),
        ...node.querySelectorAll(selector),
      ]

      elements.forEach((element) => {
        if (observer) observer.observe(element)
        else element.classList.add('visible')
      })
    }

    observeElements(document.body)
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach(observeElements)
      })
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer?.disconnect()
      mutations.disconnect()
    }
  }, [selector])
}

export default useScrollReveal
