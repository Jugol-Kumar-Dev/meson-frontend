import moment from "moment";
export default defineNuxtPlugin((nuxtApp)=>{
    return {
        provide:{
            moment :(time:any, format:any) => moment(time).from(format)
        }
    }
})