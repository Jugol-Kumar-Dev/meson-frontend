import { defineStore } from "pinia";


export const useAnswererStore = defineStore('answer', {

    state: () => ({
        answer: []
    }),

    actions: {
        addaAnswer(ans) {
            const index = this.answer.findIndex(item => {
                return item?.id === ans?.id
            });
            if (index > -1) {
                this.answer[index]  = ans
            } else {
                this.answer.push(ans);
            }
            this.setInLocalStorage();
        },

        setInLocalStorage() {
            localStorage.setItem('answer', JSON.stringify(this.answer));
        },

        initanswer() {
            const storedanswer = localStorage.getItem('answer');
            if (storedanswer) {
                this.answer = JSON.parse(storedanswer);
            }
        },
        clearanswer() {
            this.answer = [];
            localStorage.removeItem("answer");
            this.initanswer();
        }
    },

    getters: {
        getanswerItems() {
            return this.answer;
        }
    }

})