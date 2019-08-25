import helloWorld from './demos/hello-world'
import helloWorldAlt from './demos/hello-world-alt'
import simpleCounter from './demos/simple-counter'
import simpleCounterAlt from './demos/simple-counter-alt'
import complexCounter from './demos/complex-counter'
import complexCounterAlt from './demos/complex-counter-alt'
import stopWatch from './demos/stop-watch'
import clock from './demos/clock'
import i18n from './demos/i18n'
import i18nAlt from './demos/i18n-alt'
import performanceTest from './demos/performance-test'

const demos: [string, any][] = [
  ['Hello world', helloWorld],
  ['Hello world (alternative)', helloWorldAlt],
  ['Simple counter', simpleCounter],
  ['Simple counter (alternative)', simpleCounterAlt],
  ['Complex counter', complexCounter],
  ['Complex counter (alternative)', complexCounterAlt],
  ['Stop watch', stopWatch],
  ['Clock', clock],
  ['Internationalization', i18n],
  ['Internationalization (alternative)', i18nAlt],
  ['Performance test', performanceTest],
]

export default demos
