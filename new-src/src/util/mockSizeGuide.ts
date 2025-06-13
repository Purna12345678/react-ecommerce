// @ts-expect-error TS(2307): Cannot find module 'mockjs' or its corresponding t... Remove this comment to see the full error message
import Mock,{ Random } from 'mockjs';
import "react";

let images = Random.dataImage('126x278','SIZE GUIDE')

Mock.mock('/sizeguide',
  {
    "data": [{
      "image": images,
      "des": "@paragraph(2)"
    }]
  }
)