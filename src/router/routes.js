export default [
    {
        path: '/auth/register',
        name: 'Register',
        component: () => import('@/views/auth/Register')
    },
    {
        path: "/forecast",
        name: "Forecast",
        component: () => import('@/views/Forecast')
    },
    {
        path: '/',
        name: 'Home',
        alias: '/topics',
        component: () => import('@/views/Home')
    },
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@/views/auth/Login')
    },
    {
        path: '/users/1/edit',
        component: () => import('@/views/users/Edit.vue'),
        children: [
            {
                path: '',
                name: 'First',
                component: () => import('@/views/users/First.vue'),
                meta: {auth: true}
            },
            {
                path: '/users/1/edit_mid',
                name: 'Mid',
                component: () => import('@/views/users/Mid.vue'),
                meta: {auth: true}
            },
            {
                path: '/users/1/edit_third',
                name: 'Third',
                component: () => import('@/views/users/Third.vue'),
                meta: {auth: true}
            },
            {
                path: '/users/1/edit_annual',
                name: 'Annual',
                component: () => import('@/views/users/Annual.vue'),
                meta: {auth: true}
            }
        ]
    },
]