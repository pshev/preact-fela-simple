import {h} from 'preact'
import mapValues from 'map-values'

export function connect(rules) {
	const finalRules = props => {
		const rulesObj = typeof rules === 'function' ? rules(props) : rules
    // wrap rule objects in a function call because that's how fela's "renderRule" function expects them
    return mapValues(rulesObj, rule => (() => rule))
	}

	return WrappedComponent => (props, context) => {
		const propsWithTheme = Object.assign({}, props, {theme: context.theme || {}})

		return h(WrappedComponent, Object.assign({}, props, {
      styles: mapValues(finalRules(propsWithTheme), rule => context.renderer.renderRule(rule))
    }))
  }
}
