// --- external types -----------------------------------------------

declare ComponentType external

// --- API ----------------------------------------------------------

export function functionalComponent(config: FunctionalComponentConfig<Props>): {
  (props: Props): VirtualElement,
  readonly displayName: string,
  readonly defaultProps?: { [key in Props]: Props[key] }
  readonly propTypes?: PropTypes
}

export function classComponent(config: ClassComponentConfig<Props>): {
  new(props: Props): Component<Props>,
  readonly displayName: string,
  readonly defaultProps: { [key in Props]: Props[key] } | null,
  readonly propTypes: PropTypes | null
}

export function context(config: ContextConfig<T>): Context<T>

export function connectToContext<Props>(type: ComponentType<Props>, ctxConnections: ContextConnectionConfig<Prop>): ComponentType<Prop>

export function isElement(it: any): boolean

export function isElementOfType(type: ComponentType<any> | ComponentType<any>[], it: any): boolean
export function isElementOfType(type: ComponentType<any> | ComponentType<any>[]): (it: any) => boolean

export function isElementsOfType(type: ComponentType<any> | ComponentType<any>[], it: any): boolean
export function isElementsOfType(type: ComponentType<any> | ComponentType<any>[]): (it: any) => boolean

export function isNode(it: any): boolean

// --- configuration types ------------------------------------------

export interface FunctionalComponentConfig<Props> {
  displayName: string,
  properties?: PropertiesConfig<Props>,
  validate?: (props: Props) => Error | null,
  render(props: Props): VirtualNode
}

export interface ClassCompoenentConfiga<Props> {
  displayName: string,
  properties?: PropertiesConfig<T>,
  validate?: (props: Props) => Error | null,
  methods?: string[],
  base: { new(props: Props): Component }
}

export interface ContextConfig<T> {
  displayName: string,
  type: any, 
  defaultValue?: T,
  constraint?: (value: T) => Error | null | boolean
}

interface PropertiesConfig<Props> {
  [key in Props]: PropertyConfig<Props[key]>
}

interface PropertyConfig<T> {
  type?: any,
  constraint?: (value: T) => null | Error | boolean,
  nullable?: boolean,
  optional?: true,
  defaultValue?: T
}

interface ContextConnectionConfig<Prop> {
  [key in Props]: {
    context: Conntext<T>,
    map?: (value: T) => Props[key]
  }
}