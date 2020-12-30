import './components/component'
import './css/style.css'
import './scss/main.scss'
import json from './assets/data.json'
import facebook from './assets/facebook.png'
import './index.html'

// add(5, 6);

console.log('index');
console.log(json);
console.log(facebook);
alert('test')
let body = document.querySelector('body');
let div = document.createElement('div');
div.style.backgroundImage = `url("${facebook}")`;
div.style.width = '150px';
div.style.height = '150px';

body.appendChild(div)