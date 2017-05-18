# preact-fela-simple

### Usage

The API has two parts: `Provider` to put fela's renderer and your custom theme on the context 
and `style` higher-order component (HOC) to style Preact components.

##### Provider

Wrap your root component in a `Provider` to put fela's `renderer` on the context. <br/>
You can also give it a `theme` property to make it available for the components styled with the `style` HOC.

```js
import createRenderer from 'fela'
import Provider from 'preact-fela-simple'

const htmlRenderer = Preact.render
const styleRenderer = createRenderer()

const htmlMountNode = document.getElementById('root')
const styleMountNode = document.getElementById('stylesheet')

const theme = {
  mainColor: 'peachpuff',
  fontFamily: 'Comic Sans MS'
}

htmlRenderer((
	<Provider renderer={styleRenderer} theme={theme} mountNode={styleMountNode}>
		<Root />
	</Provider>
), htmlMountNode, root)
```

##### style

`style` is a HOC that is used to add styling to existing Preact components.<br/>
It takes either a styles object or a function that returns a styles object given your `theme` and current component's `props`.

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

###### using a theme

```js
import { h } from 'preact'
import {style} from 'preact-fela-simple'

const Button = ({styles}) => 
	<button className={styles.button}>
		Hello world
	</button>

export default style((theme) => ({
  button: {
    padding: '10px',
    color: theme.mainColor
  }
}))(Button)
```

###### accessing props

```js
import { h } from 'preact'
import {style} from 'preact-fela-simple'

const Button = ({styles}) => 
	<button className={styles.button}>
		Hello world
	</button>

export default style((theme, props) => ({
  button: {
    fontSize: props.primary ? '15px' : '12px',
    padding: '10px',
    color: theme.mainColor
  }
}))(Button)
```