const About = { template: '<div><p>説明用のページです</p></div>'}
const Works = { 
  template: `
  <div>
  <p>{{ hello }}</p>
  <p>名前：{{name}}</p>
  </div>
  `,
  data(){
    return {
      name: "AAAさん",
      hello: "こんにちは"
    }
  }
}
const Skill = { template: '<div><p>skillのページです</p></div>'}

//VueRouterインスタンスの生成
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/about/',
      component: About
    },
    {
      path: '/works/',
      component: Works
    },
    {
      path: '/skill/',
      component: Skill
    }
  ]
})

//Vueインスタンスの生成
const app = new Vue({
  router
}).$mount('#app')