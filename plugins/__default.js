import * as cleanupAttrs from './cleanupAttrs'
import * as cleanupEnableBackground from './cleanupEnableBackground'
import * as cleanupIDs from './cleanupIDs'
import * as cleanupNumericValues from './cleanupNumericValues'
import * as collapseGroups from './collapseGroups'
import * as convertColors from './convertColors'
import * as convertEllipseToCircle from './convertEllipseToCircle'
import * as convertPathData from './convertPathData'
import * as convertShapeToPath from './convertShapeToPath'
import * as convertStyleToAttrs from './convertStyleToAttrs'
import * as convertTransform from './convertTransform'
import * as inlineStyles from './inlineStyles'
import * as mergePaths from './mergePaths'
import * as minifyStyles from './minifyStyles'
import * as moveElemsAttrsToGroup from './moveElemsAttrsToGroup'
import * as moveGroupAttrsToElems from './moveGroupAttrsToElems'
import * as removeComments from './removeComments'
import * as removeDesc from './removeDesc'
import * as removeDoctype from './removeDoctype'
import * as removeEditorsNSData from './removeEditorsNSData'
import * as removeEmptyAttrs from './removeEmptyAttrs'
import * as removeEmptyContainers from './removeEmptyContainers'
import * as removeEmptyText from './removeEmptyText'
import * as removeHiddenElems from './removeHiddenElems'
import * as removeMetadata from './removeMetadata'
import * as removeNonInheritableGroupAttrs from './removeNonInheritableGroupAttrs'
import * as removeTitle from './removeTitle'
import * as removeUnknownsAndDefaults from './removeUnknownsAndDefaults'
import * as removeUnusedNS from './removeUnusedNS'
import * as removeUselessDefs from './removeUselessDefs'
import * as removeUselessStrokeAndFill from './removeUselessStrokeAndFill'
import * as removeViewBox from './removeViewBox'
import * as removeXMLProcInst from './removeXMLProcInst'
import * as sortDefsChildren from './sortDefsChildren'

const PLUGINS_DEFAULT_LIST = [ // list only have the default active ones
  cleanupAttrs,
  cleanupEnableBackground,
  cleanupIDs,
  cleanupNumericValues,
  collapseGroups,
  convertColors,
  convertEllipseToCircle,
  convertPathData,
  convertShapeToPath,
  convertStyleToAttrs,
  convertTransform,
  inlineStyles,
  mergePaths,
  minifyStyles,
  moveElemsAttrsToGroup,
  moveGroupAttrsToElems,
  removeComments,
  removeDesc,
  removeDoctype,
  removeEditorsNSData,
  removeEmptyAttrs,
  removeEmptyContainers,
  removeEmptyText,
  removeHiddenElems,
  removeMetadata,
  removeNonInheritableGroupAttrs,
  removeTitle,
  removeUnknownsAndDefaults,
  removeUnusedNS,
  removeUselessDefs,
  removeUselessStrokeAndFill,
  removeViewBox,
  removeXMLProcInst,
  sortDefsChildren
]

export { PLUGINS_DEFAULT_LIST }
