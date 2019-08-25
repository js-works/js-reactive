import React, { FunctionComponent, ReactNode, RefAttributes } from 'react'
import Props from './../internal/types/Props'
import Methods from './../internal/types/Methods'


type ComponentRef<M extends Methods> = { current: M } | ((ref: M) => void)

export default function component<P extends Props = {}, M extends Methods = {}>(displayName: string) {
  return new ComponentBuilder<P, M>(displayName)
}


// --- private ------------------------------------------------------

type Renderer<P extends Props, M extends Methods> = (props: P, ref?: ComponentRef<M>) => ReactNode

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

class ComponentBuilder<P extends Props, M extends Methods = {}> {
  private _attrs: BuilderAttrs<P>

  constructor(displayName: string) {
    this._attrs = new BuilderAttrs()
    this._attrs.displayName = displayName 
  }

  validate(validator: (props: P) => boolean | null | Error): ValidateBuilder<P, M> {
    return new ValidateBuilder<P, M>(validator, this._attrs)
  }

  memoize(value: boolean = true): MemoizeBuilder<P, M> {
    return new MemoizeBuilder<P, M>(value, this._attrs)
  }

  defaultProps<D extends Partial<PickOptionalProps<P>>>(defaultProps: D): DefaultPropsBuilder<P, M, D> {
    return new DefaultPropsBuilder<P, M, D>(defaultProps, this._attrs)
  }

  render(renderer: Renderer<P, M>): FunctionComponent<P> {
    return createComponent<P, M>(renderer, this._attrs)
  }
}

class ValidateBuilder<P extends Props, M extends Methods> {
  private _attrs: BuilderAttrs<P>

  constructor(validator: PropsValidator<P>, attrs: BuilderAttrs<P>) {
    this._attrs = attrs.copy()
    this._attrs.validate = validator
  }

  memoize(value: boolean = true): MemoizeBuilder<P, M> {
    return new MemoizeBuilder<P, M>(value, this._attrs)
  }

  defaultProps<D extends Partial<PickOptionalProps<P>>>(defaultProps: D): DefaultPropsBuilder<P, M, D> {
    return new DefaultPropsBuilder(defaultProps, this._attrs)
  }
  
  render(renderer: Renderer<P, M>): FunctionComponent<P & RefAttributes<M>> {
    return createComponent(renderer, this._attrs)
  }
}


class MemoizeBuilder<P extends Props, M extends Methods> {
  private _attrs: BuilderAttrs<P>

  constructor(value: boolean = true, attrs: BuilderAttrs<P>) {
    this._attrs = attrs.copy()
    this._attrs.memoize = value
  }
  
  defaultProps<D extends Partial<PickOptionalProps<P>>>(defaultProps: D): DefaultPropsBuilder<P, M, D> {
    return new DefaultPropsBuilder<P, M, D>(defaultProps, this._attrs)
  }

  render(renderer: Renderer<P, M>): FunctionComponent<P> {
    return createComponent(renderer, this._attrs)
  }
}


class DefaultPropsBuilder<P extends Props, M extends Methods, D extends Partial<PickOptionalProps<P>>> {
  private _attrs: BuilderAttrs<P>

  constructor(defaultProps: D, attrs: BuilderAttrs<P>) {
    this._attrs = attrs.copy()
    this._attrs.defaultProps = defaultProps
  }

  render(renderer: Renderer<P, M>): FunctionComponent<P> {
    return createComponent(renderer as any, this._attrs)
  }
}

function createComponent<P extends Props, M extends Methods, D extends Partial<PickOptionalProps<P>> = {}>(render: (props: P, ref: ComponentRef<M>) => any, attrs: BuilderAttrs<P>): (props: P) => any { // TODO
  const
    defaultProps =
      attrs.defaultProps && Object.keys(attrs.defaultProps).length > 0
        ? attrs.defaultProps
        : null

  let ret: any = (props: P, ref?: ComponentRef<M>) => {
    if (defaultProps) {
      props = Object.assign({}, defaultProps, props)
    }

    return render(props, ref)
  }

  if (render.length > 1) {
    ret = React.forwardRef(ret)
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

  if (attrs.memoize === true) {
    ret = React.memo(ret)
  }

  return ret
}
