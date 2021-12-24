import Login from '../view/Login.vue'
import Console from '../view/Console.vue'
import Dashboard from '../view/console/Dashboard.vue'

export default [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/console',
        meta: {
            requireAdmin: true,
        },
        component: Console,
        children: [
            {
                path: '',
                component: Dashboard,
            }
        ]
    }
]