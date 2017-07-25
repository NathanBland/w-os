/* Application definition manifest.
*
* Each Application should have the following:
* - name
* - ui
* - category
* - component
* Any state that they need outside their component, should be set to the vuex store and file system.
*
* 'Do one thing, and do it well'
*
*/
import * as core from './core'
import * as web from './web'
export default [
  {
    name: 'useradd',
    ui: false,
    category: 'core',
    component: 'core/useradd.js'
  }
]
export { core, web }

