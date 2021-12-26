import { createRouter, createWebHashHistory } from "vue-router"
import routes from "./routes"

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export const loadingBarRef = {}

router.beforeEach(((to, from, next) => {
    if (!from || to.path !== from.path) {
        if (loadingBarRef.value) {
            loadingBarRef.value.start()
        }
    }
    next()
}))

router.afterEach(((to, from) => {
    if (!from || to.path !== from.path) {
        if (loadingBarRef.value) {
            loadingBarRef.value.finish()
        }
    }
}))
export default router