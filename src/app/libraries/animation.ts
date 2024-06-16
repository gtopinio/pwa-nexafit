import {
  trigger,
  transition,
  style,
  query,
  animate,
  stagger,
  keyframes, state
} from '@angular/animations';

export let fade1s = trigger('fade1s', [transition('void => *', [
  style({opacity: 0}), animate(1000, style({opacity: 1}))
  ])
]);

export const shake = trigger('shake', [
  state('inactive', style({
    transform: 'translateX(0)'
  })),
  state('active', style({
    transform: 'translateX(0)'
  })),
  transition('inactive => active', animate('500ms ease-in', keyframes([
    style({ transform: 'translateX(0)', offset: 0 }),
    style({ transform: 'translateX(-10px)', offset: 0.1 }),
    style({ transform: 'translateX(10px)', offset: 0.2 }),
    style({ transform: 'translateX(-10px)', offset: 0.3 }),
    style({ transform: 'translateX(10px)', offset: 0.4 }),
    style({ transform: 'translateX(-10px)', offset: 0.5 }),
    style({ transform: 'translateX(10px)', offset: 0.6 }),
    style({ transform: 'translateX(-10px)', offset: 0.7 }),
    style({ transform: 'translateX(10px)', offset: 0.8 }),
    style({ transform: 'translateX(-10px)', offset: 0.9 }),
    style({ transform: 'translateX(0)', offset: 1.0 })
  ]))),
  transition('active => inactive', animate('500ms ease-out'))
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
