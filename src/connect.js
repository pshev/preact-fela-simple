import {h} from 'preact'
import mapValues from 'map-values'

export function connect(rules) {
	const finalRules = (theme, props) => {
		const rulesObj = typeof rules === 'function' ? rules(theme, props) : rules
    // wrap rule objects in a function call because that's how fela's "renderRule" function expects them
    return mapValues(rulesObj, rule => (() => rule))
	}

	return WrappedComponent => (props, context) => {
		const newProps = {
			...props,
			styles: mapValues(finalRules(context.theme || {}, props), rule => context.renderer.renderRule(rule))
		}

		return <WrappedComponent {...newProps} />
	}
}
