import { h } from 'preact'
import mapValues from 'map-values'

export function connect(rules) {
	// if a rule is a plain object, wrap it in a function for fela
	const finalRules = mapValues(rules, rule => typeof rule === 'function' ? rule : () => rule)

	return WrappedComponent => (props, context) => {
		const newProps = {
			...props,
			styles: mapValues(finalRules, rule => context.renderer.renderRule(rule.bind(null, props, context.theme || {})))
		}

		return <WrappedComponent {...newProps} />
	}
}
