import Vue from 'vue';
import App from './App.vue';

// function component() {
//   var element = document.createElement('div');
//   element.id = 'app';

//   return element;
// }

// document.body.appendChild(component());

// new Vue({
//   el: '#app',
//   template: '<div> {{ message }} </div>',
//   data: {
//     message: 'hello'
//   }
// });

new Vue({
  el: '#app',
  render: h => h(App),
});