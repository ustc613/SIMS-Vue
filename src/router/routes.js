import Login from '../view/Login.vue'
import Admin from '../view/Admin.vue'
import Dashboard from '../view/admin/Dashboard.vue'

export default [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/admin',
        meta: {
            requireAdmin: true,
        },
        component: Admin,
        children: [
            {
                path: 'dashboard',
                component: Dashboard,
            }
        ]
    }
]