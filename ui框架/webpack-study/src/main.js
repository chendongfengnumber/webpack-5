
import './style/main.css'



// import * as React from 'react';
// import { Component } from 'react';
// import { render } from 'react-dom';

// class Button extends Component {
//   render() {
//     return <h1>Hello,Webpack, React</h1>
//   }
// }

// render(<Button/>, window.document.getElementById('app'));

/*
  vue接入
*/
import Vue from 'vue'
import router from '@/router'
import App from '@/App'

new Vue({
  el:'#app',
  router,
  render: h => h(App)
})
