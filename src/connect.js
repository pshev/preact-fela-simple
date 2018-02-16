import {h} from 'preact'
import mapValues from 'map-values'

export const connect = rules => WrappedComponent => (props, context) => {
  const propsWithTheme = Object.assign({}, props, {theme: context.theme || {}})
  const rulesObj = typeof rules === 'function' ? rules(propsWithTheme) : rules
  // wrap every rule object in a function call because that's how fela's "renderRule" function expects them
  const styles = mapValues(rulesObj, rule => context.renderer.renderRule((() => rule)))

  return h(WrappedComponent, Object.assign({}, props, {styles}))
}
