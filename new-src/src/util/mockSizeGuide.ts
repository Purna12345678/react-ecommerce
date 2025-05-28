// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(2307): Cannot find module 'mockjs' or its corresponding t... Remove this comment to see the full error message
import Mock,{ Random } from 'mockjs';

let images = Random.dataImage('126x278','SIZE GUIDE')

Mock.mock('/sizeguide',
  {
    "data": [{
      "image": images,
      "des": "@paragraph(2)"
    }]
  }
)