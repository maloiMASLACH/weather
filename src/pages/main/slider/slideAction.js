export default class SlideAction {
  constructor(slider) {
    this.slider = slider;
  }

  slide() {
    this.slider.addEventListener(
      'mousewheel',
      (e) => {
        const ev = window.event || e;
        const delta = Math.max(-1, Math.min(1, ev.wheelDelta || -ev.detail));
        this.slider.scrollLeft -= delta * 10;
        setTimeout(() => {
          this.slider.scrollLeft -= delta * 10;
        }, 10);
        setTimeout(() => {
          this.slider.scrollLeft -= delta * 10;
        }, 20);
        setTimeout(() => {
          this.slider.scrollLeft -= delta * 10;
        }, 30);
        setTimeout(() => {
          this.slider.scrollLeft -= delta * 10;
        }, 40);
        ev.preventDefault();
      },
      false,
    );

    /* slider.addEventListener('mousedown',(event)=>{
          let start=event.clientX

          let cureentTransition=slider.children[0].style.transform.split('(')[1].split('p')[0]
          console.log(cureentTransition)
          slider.addEventListener('mousemove',(evn)=>{
            console.log(evn.clientX-start,slider.children[0].style.transform)
            console.log(typeof slider.children)
            slider.children[0].style.transform=`translateX(${cureentTransition+evn.clientX-start}px)`
          })
        }) */
  }
}
