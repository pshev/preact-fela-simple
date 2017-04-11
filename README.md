# preact-fela-simple

### Usage

The API has to parts: `Provider` mostly to put fela's renderer on the context 
and `style` higher-order component (HOC) to style Preact components.

##### Provider

Wrap your root component in a `Provider` to put fela's `renderer` on the context.
This is identical or similar to how you would do it with `react-fela` or `preact-fela`.

```js
import createRenderer from 'fela'
import Provider from 'preact-fela-simple'

const htmlRenderer = Preact.render
const styleRenderer = createRenderer()

const htmlMountNode = document.getElementById('root')
const styleMountNode = document.getElementById('stylesheet')

htmlRenderer((
	<Provider renderer={styleRenderer} mountNode={styleMountNode}>
		<Root />
	</Provider>
), htmlMountNode, root)
```

##### style

`style` is a HOC that is used to add styling to existing Preact components.<br/>
It takes a styles object where values are either rules or functions that take in `props` and return rules.

###### basic use

```js
import { h } from 'preact'
import {style} from 'preact-fela-simple'

const Button = ({styles}) => 
	<button className={styles.button}>
		Hello world
	</button>

export default style({
  button: {
    padding: '10px',
    color: 'red'
  }
})(Button)
```

###### accessing props

```js
import { h } from 'preact'
import {style} from 'preact-fela-simple'

const Button = ({styles}) => 
	<button className={styles.button}>
		Hello world
	</button>

export default style({
  button: props => ({
    fontSize: props.primary ? '15px' : '12px',
    padding: '10px',
    color: 'red'
  })
})(Button)
```