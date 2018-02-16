# preact-fela-simple
<p align="center" style="margin-top: 15px">
  <img alt="Fela" src="https://cldup.com/cB6srJGgDY.png">
</p>
<p align="center">
  <strong>Simple and tiny preact bindings for fela</strong>
  <br>
  <br>
  <img src="https://img.shields.io/npm/v/preact-fela-simple.svg?style=flat-square" alt="npm">
  <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-~350b-brightgreen.svg">
  <img alt="npm downloads" src="https://img.shields.io/npm/dm/preact-fela-simple.svg">
</p>

### Motivation

Why not use preact-fela official bindings? <br/>
First of all official bindings are about 2.5KB while this package is about 300B.<br />
At the same time I think it has a simpler and more straight-forward API.<br />


### Usage

If you are already familiar with preact-fela you can take a look at the following gists:<br /> 
[preact-fela basic usage](https://gist.github.com/pshev/888b8a7c33f2850fe67516f7aac2337d) and 
[preact-fela-simple basic usage](https://gist.github.com/pshev/e1fd6d5e2be6fd29308252a8f24c74c4).
<br />
#### API
The API has two parts: `Provider` to put fela's renderer and your custom theme on the context 
and `style` higher-order component (HOC) to style Preact components.

##### Provider

Wrap your root component in a `Provider` to put fela's `renderer` on the context. <br/>
You can also give it a `theme` property to make it available for the components styled with the `style` HOC.

```js
import Preact, {h} from 'preact'
import createRenderer from 'fela'
import {Provider} from 'preact-fela-simple'

const htmlRenderer = Preact.render
const styleRenderer = createRenderer()

const theme = {
  mainColor: 'peachpuff',
  fontFamily: 'Comic Sans MS'
}

htmlRenderer((
  <Provider renderer={styleRenderer} theme={theme}>
    <Root />
  </Provider>
), document.getElementById('root'))
```

##### style

`style` is a HOC that is used to add styling to Preact components.<br/>
It takes either a styles object or a function that returns a styles object given the current component's `props`.

###### basic use

```js
import {h} from 'preact'
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
import {h} from 'preact'
import {style} from 'preact-fela-simple'

const Button = ({styles}) => 
  <button className={styles.button}>
    Hello world
  </button>

export default style(({theme}) => ({
  button: {
    padding: '10px',
    color: theme.mainColor
  }
}))(Button)
```

###### accessing props

```js
import {h} from 'preact'
import {style} from 'preact-fela-simple'

const Button = ({styles}) => 
  <button className={styles.button}>
    Hello world
  </button>

export default style(({primary}) => ({
  button: {
    fontSize: primary ? '15px' : '12px',
    padding: '10px',
    color: 'cornsilk'
  }
}))(Button)
```