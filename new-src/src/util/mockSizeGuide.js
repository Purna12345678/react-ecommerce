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