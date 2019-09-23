import helloWorld from './demos/hello-world'
import simpleCounter1 from './demos/simple-counter-1'
import simpleCounter2 from './demos/simple-counter-2'
import complexCounter from './demos/complex-counter'
import stopWatch from './demos/stop-watch'
import clock from './demos/clock'
import i18n from './demos/i18n'
import performanceTest from './demos/performance-test'

const demos: [string, any][] = [
  ['Hello world', helloWorld],
  ['Simple counter-1', simpleCounter1],
  ['Simple counter-2', simpleCounter2],
  ['Complex counter', complexCounter],
  ['Stop watch', stopWatch],
  ['Clock', clock],
  ['Internationalization', i18n],
  ['Performance test', performanceTest],
]

export default demos
