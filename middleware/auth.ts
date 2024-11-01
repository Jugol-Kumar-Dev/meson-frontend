export default defineNuxtRouteMiddleware((to, from) => {
    // @ts-ignore
    const {isLogin, authUser} = useTokenStore();
    if (!isLogin) {
        to.meta.layout = 'authfront'
        return navigateTo(`/login?redirect=${to.path}`)
    }

    // if(isLogin && authUser?.email_verified_at === null) return navigateTo(`/verification?redirect=${to.path}`)
})