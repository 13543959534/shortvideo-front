import { createRouter, createWebHistory } from "vue-router";
import { routes } from 'vue-router/auto-routes'
import type { EnhancedRouteLocation } from './types.ts'
import useRouteCacheStore from '@/store/modules/routeCache.ts'
// 路由
const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to: EnhancedRouteLocation, from, next) => {
    const routeCacheStore = useRouteCacheStore()
    // Route cache
    routeCacheStore.addRoute(to)
    next()
  })
// 导出
export default router 