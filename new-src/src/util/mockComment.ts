// @ts-expect-error TS(2307): Cannot find module 'mockjs' or its corresponding t... Remove this comment to see the full error message
import Mock from 'mockjs';
import "react";

Mock.mock('/comment',
  {
    "data|1-10": [{
      "id": "@id",
      "urlAvatar": "../../src/data/avatar/@pick(['christian','elliot','helen','jenny','joe','justen','laura','matt','stevie']).jpg",
      "username": "@name",
      "date": '@datetime',
      "rating": '@natural(0,5)',
      "content": '@sentence'
    }]
  }
)
