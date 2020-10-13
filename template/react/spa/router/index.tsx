import React from 'react'

export const routeConfig = [
    {
        path: '/about',
        component: require('../pages/about/index').default,
    },
    {
        path: '/home',
        component: require('../pages/home/index').default,
    },
    {
        path: '*',
        component: () => <div>404</div>,
    },
]