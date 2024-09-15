import {defineStore} from 'pinia'
import {useApiFetch} from "~/composables/useApiFetch";
import {useTokenStore} from "~/stores/useTokenStore";

export default defineStore('auth', ()=>{
    async function fetchUser(){
        return useApiFetch("/user", {
            method: "GET"
        });
    }


    async function login(credential: any){
        await $fetch(useRuntimeConfig().public.baseUrl+ '/sanctum/csrf-cookie',{
            credentials:'include'
        })
        return useApiFetch("/login", {
            method: "POST",
            body: credential,
            lazy: true
        });
    }

    async function signup(signupData: any){
        return useApiFetch("/register", {
            method: "POST",
            body: signupData,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    }

    // @ts-ignore
    async function logout(){
        const {data, error} = await useApiFetch("logout",{method:"POST"})
        if(data.value) {
            // @ts-ignore
            useTokenStore().removeToken()
            return navigateTo('/login')
        }
        if(error.value) {
            // @ts-ignore
            useTokenStore().removeToken()
            return navigateTo('/login')
        }
    }

    return { login,signup, logout, fetchUser}

})