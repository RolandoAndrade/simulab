import {mxgraph} from 'mxgraph';

export const mx: typeof mxgraph = require('mxgraph')({
    mxImageBasePath: '../../assets',
    mxBasePath: '.'
});
