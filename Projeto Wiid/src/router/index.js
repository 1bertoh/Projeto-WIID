import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import telaLogada from '@/components/telaLogada';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/user',
      name: 'telaLogada',
      component: telaLogada,
    },
  ],
});
