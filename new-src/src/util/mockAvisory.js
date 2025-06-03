import Mock from 'mockjs';
import "react";

Mock.mock('/avisory',{
  "data|3-8": [{
    "title": "@title(6)",
    "content": "@paragraph(1,3)"
  }]
})