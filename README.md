# js-react-utils

A bundle of opinionated utility functions to simplify component development with React.
Currently the main purpose is to provide an alternative way to validate component props.

## Usage example

```tsx
import React, { useCallback, useState } from 'react'
import { render } from 'react-dom'
import { convertValidation } from 'js-react-utils'
import * as Spec from 'js-spec/validators' // 3rd-party validation library

type CounterProps = {
  initialValue?: number
  label?: string
}

function Counter({ initialValue = 0, label = 'Counter' }: CounterProps) {
  const [counter, setCounter] = useState(initialValue)
  const onClick = useCallback(() => setCounter((it) => it + 1), [])

  return (
    <button onClick={onClick}>
      {label}: {count}
    </button>
  )
}

const validateCounterProps = Spec.checkProps({
  optional: {
    initialValue: Spec.number,
    label: Spec.string
  }
})

Object.assign(Counter, {
  displayName: 'Counter',

  ...(process.env.NODE_ENV === ('development' as string) &&
    convertValidation(validateCounterProps))
})

render(<Counter />, document.getElementById('app'))
```

## Features

- Support for framework agnostic props validation.
  No need to use 'prop-types' library: As component properties and context values can be validated in a more general way, js-react-utils is not depending on a React specific or js-react-utils specific prop validation library.
  Instead a general and more sophisticated validation library like for example [js-spec](https://github.com/js-works/js-spec) can be used.

- Some additional useful helper functions

## Project status

This project is in alpha state.
