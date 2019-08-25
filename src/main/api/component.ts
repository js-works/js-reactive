import Props from './../internal/types/Props'
import { FunctionComponent, ReactNode } from 'react'

export default function component<P extends Props = {}>(displayName: string) {
  return new ComponentBuilder<P>(displayName)
}

// --- private ------------------------------------------------------

type Renderer<P extends Props> = (props: P) => ReactNode

type PickOptionalProps<T> = {
  [K in keyof T]-?: T extends Record<K, T[K]> ? never : T[K]
}

type PropsValidator<P extends Props> = (props: P) => boolean | null | Error

class BuilderAttrs<P extends Props> {
  displayName?: string
  memoize?: boolean
  validate?: PropsValidator<P>
  defaultProps?: Partial<PickOptionalProps<P>>
  
  copy(): BuilderAttrs<P> {
    const ret: BuilderAttrs<P> = new BuilderAttrs()

    ret.displayName = this.displayName
    ret.memoize = this.memoize
    ret.validate = this.validate
    ret.defaultProps = this.defaultProps

    return ret
  }
}

class ComponentBuilder<P extends Props> {
  private _attrs: BuilderAttrs<P>

  constructor(displayName: string) {
    this._attrs = new BuilderAttrs()
    this._attrs.displayName = displayName 
  }

  validate(validator: (props: P) => boolean | null | Error): ValidateBuilder<P> {
    return new ValidateBuilder<P>(validator, this._attrs)
  }

  memoize(value: boolean = true): MemoizeBuilder<P> {
    return new MemoizeBuilder(value, this._attrs)
  }

  defaultProps<D extends Partial<PickOptionalProps<P>>>(defaultProps: D): DefaultPropsBuilder<P, D> {
    return new DefaultPropsBuilder(defaultProps, this._attrs)
  }

  render(renderer: Renderer<P>): FunctionComponent<P> {
    return createComponent(renderer, this._attrs)
  }
}

class ValidateBuilder<P extends Props> {
  private _attrs: BuilderAttrs<P>

  constructor(validator: PropsValidator<P>, attrs: BuilderAttrs<P>) {
    this._attrs = attrs.copy()
    this._attrs.validate = validator
  }

  memoize(value: boolean = true): MemoizeBuilder<P> {
    return new MemoizeBuilder<P>(value, this._attrs)
  }

  defaultProps<D extends Partial<PickOptionalProps<P>>>(defaultProps: D): DefaultPropsBuilder<P, D> {
    return new DefaultPropsBuilder(defaultProps, this._attrs)
  }
  
  render(renderer: Renderer<P>): FunctionComponent<P> {
    return createComponent(renderer, this._attrs)
  }
}


class MemoizeBuilder<P extends Props> {
  private _attrs: BuilderAttrs<P>

  constructor(value: boolean = true, attrs: BuilderAttrs<P>) {
    this._attrs = attrs.copy()
    this._attrs.memoize = value
  }
  
  defaultProps<D extends Partial<PickOptionalProps<P>>>(defaultProps: D): DefaultPropsBuilder<P, D> {
    return new DefaultPropsBuilder(defaultProps, this._attrs)
  }

  render(renderer: Renderer<P>): FunctionComponent<P> {
    return createComponent(renderer, this._attrs)
  }
}


class DefaultPropsBuilder<P extends Props, D extends Partial<PickOptionalProps<P>>> {
  private _attrs: BuilderAttrs<P>

  constructor(defaultProps: D, attrs: BuilderAttrs<P>) {
    this._attrs = attrs.copy()
    this._attrs.defaultProps = defaultProps
  }

  render(renderer: Renderer<P & D>): FunctionComponent<P> {
    return createComponent(renderer as any, this._attrs)
  }
}

function createComponent<P extends Props, D extends Partial<PickOptionalProps<P>> = {}>(render: (props: P) => any, attrs: BuilderAttrs<P>): (props: P) => any { // TODO
  const
    defaultProps =
      attrs.defaultProps && Object.keys(attrs.defaultProps).length > 0
        ? attrs.defaultProps
        : null

  const ret = (props: P) => {
    if (defaultProps) {
      props = Object.assign({}, defaultProps, props)
    }

    return render(props)  
  }

  ret.displayName = attrs.displayName

  if (attrs.validate) {
    const validate = attrs.validate

    ret.propTypes = {
      '*'(props: any) {
        const
          result = validate(props),

          errorMsg =
            result === false
              ? 'Invalid value'
              : result instanceof Error
                ? result.message
                : null

        return !errorMsg
          ? null
          : new TypeError(
            'Props validation error for component '
            + `"${attrs.displayName}" => ${errorMsg}`)
      }
    }
  }

  return ret
}
