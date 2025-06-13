import "react";

const Scroll = function(target = 290,duration = 300){
  // @ts-expect-error TS(2339): Property '__scrollMove' does not exist on type 'Wi... Remove this comment to see the full error message
  if (window.__scrollMove) return;
  const begin = document.documentElement.scrollTop || document.body.scrollTop;
  const change = target - begin;
  const start = Date.now();
  (function fn(){
      // @ts-expect-error TS(2339): Property '__scrollMove' does not exist on type 'Wi... Remove this comment to see the full error message
      window.__scrollMove = window.requestAnimationFrame(fn);
      var nowTime = Date.now() - start;
      if(nowTime >= duration){
        nowTime = duration;
        // @ts-expect-error TS(2339): Property '__scrollMove' does not exist on type 'Wi... Remove this comment to see the full error message
        window.cancelAnimationFrame(window.__scrollMove);
        // @ts-expect-error TS(2339): Property '__scrollMove' does not exist on type 'Wi... Remove this comment to see the full error message
        window.__scrollMove = null;
      }
      setScrollTop(change / duration * nowTime + begin);
    })();
  function setScrollTop(t: any){
    return document.documentElement.scrollTop = document.body.scrollTop = t;
  }
}

export default Scroll;