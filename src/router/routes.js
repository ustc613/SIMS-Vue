import Login from '../view/Login.vue'
import Console from '../view/Console.vue'
import SystemOverview from '../view/console/SystemOverview.vue'
import SchoolManagement from "../view/console/school/SchoolManagement.vue"
import SchoolTable from "../view/console/school/SchoolTable.vue"
import SchoolEditor from "../view/console/school/SchoolEditor.vue"
import StudentManagement from "../view/console/student/StudentManagement.vue"
import StudentTable from "../view/console/student/StudentTable.vue"
import StudentEditor from "../view/console/student/StudentEditor.vue"
import CourseManagement from "../view/console/course/CourseManagement.vue"
import CourseTable from "../view/console/course/CourseTable.vue"
import CourseEditor from "../view/console/course/CourseEditor.vue"
import ManagerManagement from "../view/console/manager/ManagerManagement.vue"
import ManagerTable from "../view/console/manager/ManagerTable.vue"
import ManagerEditor from "../view/console/manager/ManagerEditor.vue"

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
            {
                path: 'course',
                component: CourseManagement,
                children: [
                    {
                        path: '',
                        name: 'CourseTable',
                        component: CourseTable,
                    },
                    {
                        path: 'editor',
                        name: 'CourseEditor',
                        component: CourseEditor,
                    },
                ]
            },
            {
                path: 'manager',
                component: ManagerManagement,
                children: [
                    {
                        path: '',
                        name: 'ManagerTable',
                        component: ManagerTable,
                    },
                    {
                        path: 'editor',
                        name: 'ManagerEditor',
                        component: ManagerEditor,
                    },
                ]
            },
        ]
    }
]