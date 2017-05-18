import { Component } from 'preact'
import { render } from 'fela-dom'

export class Provider extends Component {
	getChildContext() {
		return {
			renderer: this.props.renderer,
			theme: this.props.theme
		}
	}

	componentDidMount() {
    const { mountNode, renderer } = this.props

    if (mountNode)
      render(renderer, mountNode)
	}

	render() {
		return this.props.children[0]
	}
}
