// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(2307): Cannot find module 'mockjs' or its corresponding t... Remove this comment to see the full error message
import Mock from 'mockjs';

Mock.mock('/avisory',{
  "data|3-8": [{
    "title": "@title(6)",
    "content": "@paragraph(1,3)"
  }]
})