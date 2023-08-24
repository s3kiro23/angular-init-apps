import { style, animate, animation } from '@angular/animations';

export const slideAndFaceAnimation = animation([
    style({
        transform: 'translateX(-100%)',
        opacity: 0,
        'background-color': '{{ startColor }}',
    }),
    animate(
        '{{ time }} ease-in-out',
        style({
            transform: 'translateX(0)',
            opacity: 1,
            'background-color': 'white',
        })
    ),
]);
