/**
 *
 * @this Segment
 *
 * @flow
 * ------------------------
 *
 */

'use strict'
import rversion from './rversion'

const Segment = rversion(() => {
  return require('./sg/Segment_17_after.js')
}, () => {
  return require('./sg/Segment.js')
})

export default Segment
