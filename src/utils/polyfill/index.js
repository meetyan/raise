import * as web from './web'
import * as electron from './electron'
import {isElectron} from '@/config'

export default isElectron ? electron : web
