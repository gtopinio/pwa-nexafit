import {
  trigger,
  transition,
  style,
  query,
  animate,
  stagger,
  keyframes
} from '@angular/animations';

export let fade1s = trigger('fade1s', [transition('void => *', [
  style({opacity: 0}), animate(1000, style({opacity: 1}))
  ])
]);

export let visibilityDelay2s = trigger('visibilityDelay2s', [
  transition('void => *', [
    animate('.2s ease-in', keyframes([
      style({opacity: 0, offset: 0}),
      style({opacity: .5, offset: 0.5}),
      style({opacity: 1, offset: 1}),
    ]))
  ])
]);

export let dropY1s = trigger('dropY1s', [
  transition('void => *', [
    animate('.5s ease-in', keyframes([
      style({opacity: 0, transform: 'translateY(-10px)', offset: 0}),
      style({opacity: .5, transform: 'translateY(5px)', offset: 0.5}),
      style({opacity: 1, transform: 'translateY(0)', offset: 1}),
    ]))
  ])
]);

export let dropY1sBy1 = trigger('dropY1sBy1', [
  transition('* => *', [
    query(':enter', style({opacity: 0}), {optional: true}),
    query(':enter', stagger('50ms', [
      animate('.5s ease-in', keyframes([
        style({opacity: 0, transform: 'translateY(-10px)', offset: 0}),
        style({opacity: .5, transform: 'translateY(5px)', offset: .5}),
        style({opacity: 1, transform: 'translateY(0)', offset: 1}),
      ]))
    ]), {optional: true})
  ])
]);

export let dropX1sBy1 = trigger('dropX1sBy1', [
  transition('* => *', [
    query(':enter', style({opacity: 0}), {optional: true}),
    query(':enter', stagger('50ms', [
      animate('.5s ease-in', keyframes([
        style({opacity: 0, transform: 'translateX(-10px)', offset: 0}),
        style({opacity: .5, transform: 'translateX(5px)', offset: .5}),
        style({opacity: 1, transform: 'translateX(0)', offset: 1}),
      ]))
    ]), {optional: true})
  ])
]);

export let tableTdDropY = trigger('tableTdDropY', [
  transition('* => *', [
    query(':enter', style({opacity: 0}), {optional: true}),
    query(':enter', stagger('50ms', [
      animate('.5s ease-in', keyframes([
        style({opacity: 0, transform: 'translateY(-10px)', offset: 0}),
        style({opacity: .5, transform: 'translateY(5px)', offset: .5}),
        style({opacity: 1, transform: 'translateY(0)', offset: 1}),
      ]))
    ]), {optional: true})
  ])
]);
