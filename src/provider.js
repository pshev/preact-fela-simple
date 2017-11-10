import {Component} from 'preact'
import {render, rehydrate} from 'fela-dom'

function hasDOM(renderer) {
  return !renderer.isNativeRenderer && typeof window !== 'undefined'
}

export class Provider extends Component {
  constructor(props, context) {
    super(props, context)

    if (props.rehydrate && hasDOM(props.renderer)) {
      rehydrate(props.renderer)
    }
  }

  getChildContext() {
    return {
      renderer: this.props.renderer,
      theme: this.props.theme
    }
  }

  componentDidMount() {
    const {renderer} = this.props
    if (hasDOM(renderer))
      render(renderer)
  }

  render() {
    return this.props.children[0]
  }
}
