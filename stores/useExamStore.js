import { defineStore } from 'pinia'

export const useExamStore = defineStore('exam', {
    state: () => {
        return {
            examToken: null,
        }
    },

    actions:{
        setToken(data){
            this.token = data
        },
        removeToken(token){
            this.token = null
        }
    },
    getters:{
        getToken(){
            return this.examToken
        }
    },

    persist: true,
})