cvvb   x
<script setup>
import {ref, onMounted, onBeforeUnmount, watch} from 'vue';
import {onBeforeRouteLeave} from '#app';
const {authUser} = useTokenStore();
const answare = useAnswererStore();
const data = ref(null);
const givenAns = ref([]);
const questions = ref([]);
const examToken = ref(null);
const loading = ref(false);
const countdownInterval = ref(null);

definePageMeta({
  layout: 'student',
  middleware: ['auth']
});

const hanelUnloadListner = (event) => {
  event.preventDefault();
  event.returnValue = '';
};

const currentPage = ref(2);
const changePage = async (path) => {
  loading.value = true;
  // if (!Array.isArray(givenAns.value)) {
  answare.addaAnswer(givenAns.value);
  const {
    data: response,
    error,
    status
  } = await useApiFetch(`/mocktest-enrolled/${useRoute()?.params.exam_id}`,{
    method: 'POST',
    params: {
      qId: givenAns.value?.id,
      qAns: givenAns.value?.answare,
      mockId: data.value?.id,
      token: examToken.value,
      page:currentPage.value
    },
  });

  if (response.value?.data) loading.value = false
  currentPage.value++
  questions.value?.data?.push(...response.value?.data?.data);// = response.value?.data;

  localStorage.setItem('lastPage', 'page=' + response.data?.current_page);
  data.value = response.value?.mock;
  if (error.value) {
    localStorage.removeItem('countDownDate');
    localStorage.removeItem('lastPage');
    push.error(error.value?.data[0]);
    navigateTo("/student/exam/practiceexam", {replace: true, open: false});
  }


  givenAns.value = [];

  answare.clearanswer();
  // } else {
  //   alert('Please Select An Answer...');
  // }
};

const finishExam = async () => {
  // if (!Array.isArray(givenAns.value)) {
    answare.addaAnswer(givenAns.value);
    await saveExam();
    // localStorage.setItem('lastPage', 'page=' + response.data.data?.current_page);
    // console.log("finish exam", 'called for replace student/mock-test');
  // } else {
  //   alert('Please Select An Answer...');
  // }
};

const saveExam = async () => {
  loading.value = true
  const {data: response} = await useApiFetch('/finish-mocktest', {
    method: 'POST',
    params: {
      qId: givenAns.value?.id,
      qAns: givenAns.value?.answare,
      mockId: data.value?.id,
      token: examToken.value
    },
    body: {question: questions.value.data},
    headers: {
      "Authorization": `Bearer ${authUser?.token}`
    }
  });
  questions.value = null
  answare.clearanswer();
  localStorage.removeItem('countDownDate');
  localStorage.removeItem('lastPage');
  window.removeEventListener('beforeunload', hanelUnloadListner, {capture: true});
  window.removeEventListener('scroll', function () {
    onScrollLoad()
  });

  if (response.value) {
    push.success('Exam Successfully Done.');
  } else {
    push.warning('Exam Already Given.');
  }

  if (response.value?.data) loading.value = false

  navigateTo("/student/exam/practiceexam", {replace: true, open: false});
};

onMounted(async () => {
  loading.value = true
  if (import.meta.client) {
    window.addEventListener('beforeunload', hanelUnloadListner, {capture: true});


    if (localStorage.getItem('exam_token_for' + authUser.id)) {
    const getToken = localStorage.getItem('exam_token_for' + authUser.id);
    if (getToken) {
      examToken.value = getToken;
      localStorage.removeItem('exam_token_for' + authUser.id);
    }
    const {
      data: response,
      error,
      status
    } = await useApiFetch(`/mocktest-enrolled/${useRoute()?.params.exam_id}?${localStorage.getItem('lastPage')}`, {
      method: 'POST'
    });

    if (response.value?.data) loading.value = false
      questions.value = response.value?.data;

    localStorage.setItem('lastPage', 'page=' + response.data?.current_page);

    data.value = response.value?.mock;

    if (error.value) {
      localStorage.removeItem('countDownDate');
      localStorage.removeItem('lastPage');
      // alert(error.value?.data[0]);
      navigateTo("/student/exam/practiceexam", {replace: true, open: false});
    }
    } else {
      answare.clearanswer();
      localStorage.removeItem('countDownDate');
      localStorage.removeItem('lastPage');
      alert('Successfully Finished Your Exam...');
      window.removeEventListener('beforeunload', hanelUnloadListner, { capture: true });
      navigateTo("/student/exam/practiceexam", { replace: true, open: false });
    }
  }

  window.addEventListener('scroll', function () {
    onScrollLoad()
  });
});

// onBeforeRouteLeave((to, from, next) => {
//   if (examToken.value !== null) {
//     if (confirm("Going to another page will end your exam right now") === true) {
//       window.removeEventListener('beforeunload', hanelUnloadListner, { capture: true });
//       answare.clearanswer();
//       localStorage.removeItem('countDownDate');
//       localStorage.removeItem('lastPage');
//       next();
//     } else {
//       next(false);
//     }
//   } else {
//     next();
//   }
// });

watch(data, () => updateCountdown());
const fillup = ref(0)
watch(questions, ()=> fillup.value= questions.value?.data?.filter( item =>item?.userAns && item?.userAns !== null).length, {deep:true})



function updateCountdown() {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value);
  }

  let countDownDate = localStorage.getItem('countDownDate');
  if (!countDownDate) {
    countDownDate = new Date().getTime() + (data.value?.duration * 60 * 1000);
    localStorage.setItem('countDownDate', countDownDate);
  } else {
    countDownDate = parseInt(countDownDate);
  }

  countdownInterval.value = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const minutes = Math.floor(distance / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById("minutes")) {
      document.getElementById("minutes").innerText = minutes;
    }
    if (document.getElementById("seconds")) {
      document.getElementById("seconds").innerText = seconds;
    }

    if (distance < 0) {
      clearInterval(countdownInterval.value);
      localStorage.removeItem('countDownDate');
      localStorage.removeItem('lastPage');
      navigateTo("/student/exam/practiceexam", {replace: true, open: false});
    }
  }, 1000);
}

onBeforeUnmount(() => {
  if(questions.value) saveExam()
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value);
  }
  window.removeEventListener('beforeunload', hanelUnloadListner, {capture: true});
  localStorage.removeItem('countDownDate');
  localStorage.removeItem('lastPage');
  window.removeEventListener('scroll', function () {
    onScrollLoad()
  });
});

const onScrollLoad = (event)=> {
  if ((window.innerHeight + window.scrollY + 2000) > document.body.offsetHeight && !loading.value && currentPage.value <= questions.value?.last_page) {
    changePage(currentPage.value);
  }
}


</script>


<template>
  <div v-if="examToken">
    <div class="sticky top-16 z-50 w-full mb-5">
      <div class="bg-white shadow-md backdrop-blur-xl rounded-lg overflow-hidden">
        <div class="p-2 lg:p-4">
          <div class="flex items-center justify-between flex-col lg:flex-row gap-3">
            <div class="flex justify-between w-full lg:w-auto lg:flex-col">
              <h2 class="text-xl font-bold">Time : {{ data?.duration }} Min</h2>
              <h3 class="text-lg font-semibold">
                <span id="minutes"></span> : <span id="seconds"></span>
              </h3>
            </div>
            <div class="flex items-center gap-5 w-full lg:w-auto justify-between">
              <Icon name="svg-spinners:ring-resize" size="15" v-if="loading"/>
              <button
                  class="px-3 py-1.5 bg-primary-800 text-primary-100 rounded-md flex items-center gap-2"
                  @click="finishExam"
                  v-show="!loading"
              >
                <Icon name="solar:check-circle-bold-duotone" size="15" class="text-white"/>
                <span>Finish Exam</span>
              </button>
              <h3 class="text-lg font-semibold">{{ fillup }} / {{ questions?.total }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

<!--    <template v-if="loading">-->
<!--      <div>-->
<!--        <h1 class="text-center text-xl font-bold">Loading.......</h1>-->
<!--      </div>-->
<!--    </template>-->
      <div class="space-y-5">
        <div class="border-4 border-primary-300 p-5 rounded-lg bg-white shadow-md"
             v-for="(singleQ, qIndex) in questions?.data">
          <div class="bg-white border-l-4 border-primary-800 shadow-md rounded-lg overflow-hidden">
            <div class="p-4 flex items-start gap-2">
              <p> {{ qIndex+1 }})</p>
              <h4 v-html="singleQ?.title" class="text-lg font-semibold"></h4>
            </div>
          </div>
          <div class="mt-5 space-y-2">
            <label v-for="(option, index) in ['a', 'b', 'c', 'd']" :key="index"
                   :for="`ans${qIndex+'_'+index}`"
                   class="block p-4 border rounded-md cursor-pointer shadow-md transition-all duration-200"
                   :class="singleQ.userAns === option ? 'border-blue-500 bg-primary-800 text-white' : 'bg-white border-primary-300'">
              <input class="hidden"
                     :id="`ans${qIndex+'_'+index}`"
                     type="radio"
                     v-model="singleQ.userAns"
                     :value="option"
                     :name="`ans${qIndex+'_'+index}`">
              <div class="flex items-center gap-5">
                <div v-if="singleQ.userAns === option">
                  <Icon name="solar:check-circle-bold-duotone" size="25" class="text-white"/>
                </div>
                <div v-else>
                  <Icon name="solar:check-circle-line-duotone" size="25" class="text-primary-400"/>
                </div>
                <div class="capitalize font-semibold text-sm" v-html="singleQ[option]"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
  </div>

  <div v-else>
    <div class="flex justify-center">
      <div class="w-full max-w-lg bg-white shadow-md rounded-lg">
        <div class="p-6 flex flex-col gap-2">
          <h1 class="text-2xl font-bold">Exam Completed.</h1>
          <p>Dear Student,</p>
          <p>
            The exam has concluded as you have exited the portal. We wish you all the best in your endeavors and good
            luck with your continued preparation.
          </p>
          <div>
            <NuxtLink to="/student/exam/practiceexam" class="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg"
            >Go Back
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<!--          <div class="mt-5 space-y-2">
            &lt;!&ndash; Answer Option A &ndash;&gt;
            <label for="ans1" class="block p-4 border border-primary-300 bg-white rounded-md cursor-pointer shadow-md transition-all duration-200"
                   :class="{'border-blue-500' : givenAns.text === singleQ.a}">
              <input class="hidden" id="ans1" type="radio" v-model="givenAns"
                     :value="{id: singleQ.id, answare:'a', text:singleQ.a}" name="ans">
              <div class="flex items-center gap-5">
                <div v-if="givenAns.text === singleQ.a">
                  <Icon name="solar:check-circle-bold-duotone" size="25" class="text-primary-500" />
                </div>
                <div v-else>
                  <Icon name="solar:check-circle-line-duotone"  size="25" class="text-primary-400" />
                </div>
                <div class="capitalize font-semibold text-sm" v-html="singleQ.a"></div>
              </div>
            </label>

            &lt;!&ndash; Answer Option B &ndash;&gt;
            <label for="answer_b" class="block p-4 border border-primary-300 bg-white rounded-md cursor-pointer shadow-md transition-all duration-200"
                   :class="{'border-blue-500' : givenAns.text === singleQ.b}">
              <input class="hidden" id="answer_b" type="radio" v-model="givenAns"
                     :value="{id: singleQ.id, answare:'b', text:singleQ.b}" name="ans">
              <div class="flex items-center gap-5">
                <div v-if="givenAns.text === singleQ.b">
                  <Icon name="solar:check-circle-bold-duotone" size="25" class="text-primary-500" />
                </div>
                <div v-else>
                  <Icon name="solar:check-circle-line-duotone"  size="25" class="text-primary-400" />
                </div>
                <div class="capitalize font-semibold text-sm" v-html="singleQ.b"></div>
              </div>
            </label>

            &lt;!&ndash; Answer Option C &ndash;&gt;
            <label for="answer_c" class="block p-4 border border-primary-300 bg-white rounded-md cursor-pointer shadow-md transition-all duration-200"
                   :class="{'border-blue-500' : givenAns.text === singleQ.c}">
              <input class="hidden" id="answer_c" type="radio" v-model="givenAns"
                     :value="{id: singleQ.id, answare:'c', text:singleQ.c}" name="ans">
              <div class="flex items-center gap-5">
                <div v-if="givenAns.text === singleQ.c">
                  <Icon name="solar:check-circle-bold-duotone" size="25" class="text-primary-500" />
                </div>
                <div v-else>
                  <Icon name="solar:check-circle-line-duotone"  size="25" class="text-primary-400" />
                </div>
                <div class="capitalize font-semibold text-sm" v-html="singleQ.c"></div>
              </div>
            </label>

            &lt;!&ndash; Answer Option D &ndash;&gt;
            <label for="answer_d" class="block p-4 border border-primary-300 bg-white rounded-md cursor-pointer shadow-md transition-all duration-200"
                   :class="{'border-blue-500' : givenAns.text === singleQ.d}">
              <input class="hidden" id="answer_d" type="radio" v-model="givenAns"
                     :value="{id: singleQ.id, answare:'d', text:singleQ.d}" name="ans">
              <div class="flex items-center gap-5">
                <div v-if="givenAns.text === singleQ.d">
                  <Icon name="solar:check-circle-bold-duotone" size="25" class="text-primary-500" />
                </div>
                <div v-else>
                  <Icon name="solar:check-circle-line-duotone"  size="25" class="text-primary-400" />
                </div>
                <div class="capitalize font-semibold text-sm" v-html="singleQ.d"></div>
              </div>
            </label>
          </div>-->

<!--          <div class="mt-5">
              <button class="px-3 py-2 bg-primary-800 rounded-lg text-white w-full h-full shadow-md" v-if="questions?.next_page_url"
                      @click="changePage(questions?.next_page_url, 'next')">Next
              </button>
          </div>-->