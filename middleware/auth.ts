export default defineNuxtRouteMiddleware((to, from) => {
    // @ts-ignore
    const {isLogin} = useTokenStore();
    if (!isLogin) return navigateTo(`/login?redirect=${to.path}`)
})