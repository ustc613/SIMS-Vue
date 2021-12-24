import Login from '../view/Login.vue'
import Console from '../view/Console.vue'
import SystemOverview from '../view/console/SystemOverview.vue'
import SchoolManagement from "../view/console/school/SchoolManagement.vue"
import SchoolTable from "../view/console/school/SchoolTable.vue"
import SchoolEditor from "../view/console/school/SchoolEditor.vue"
import StudentManagement from "../view/console/student/StudentManagement.vue"
import StudentTable from "../view/console/student/StudentTable.vue"
import StudentEditor from "../view/console/student/StudentEditor.vue"

export default [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/console',
        redirect: '/console/overview',
        component: Console,
        children: [
            {
                path: 'overview',
                name: 'SystemOverview',
                component: SystemOverview,
            },
            {
                path: 'school',
                component: SchoolManagement,
                children: [
                    {
                        path: '',
                        name: 'SchoolTable',
                        component: SchoolTable,
                    },
                    {
                        path: 'editor',
                        name: 'SchoolEditor',
                        component: SchoolEditor,
                    },
                ]
            },
            {
                path: 'student',
                component: StudentManagement,
                children: [
                    {
                        path: '',
                        name: 'StudentTable',
                        component: StudentTable,
                    },
                    {
                        path: 'editor',
                        name: 'StudentEditor',
                        component: StudentEditor,
                    },
                ]
            },
        ]
    }
]