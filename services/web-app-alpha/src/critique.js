/*
Copyright [2018] [Matthew B White]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';
require('bulma/css/bulma.css');
const __r = require('rowinia');
const CFG = require('./config');

// CommonJS
const Croppr = require('croppr');

function setupCrop(){
    // let i =
    let imageEl = document.getElementById('img-a1');
    imageEl.setAttribute('crossOrigin', 'anonymous');
    imageEl.src = getBase64Image();
    R.hide(document.getElementById('canvas-a2'));
    R.show(imageEl);
    let croppr = new Croppr(imageEl, {
        startSize: [80, 80, '%']
    });
}


function setCanvasImg(){
    let ctx = document.getElementById('canvas').getContext('2d');
    let img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        ctx.beginPath();
        ctx.moveTo(30, 96);
        ctx.lineTo(70, 66);
        ctx.lineTo(103, 76);
        ctx.lineTo(170, 15);
        ctx.stroke();
    };
    img.src =  baseImg;
}

function moveCtrls(event){
    console.log(event.currentTarget.id);
    let type = event.currentTarget.id.replace('-btn','');
    if (type === 'adjustment'){
        R.addClass(event.currentTarget.parentNode,'is-active');
        R.removeClass(document.getElementById('crop-btn').parentNode,'is-active');
        R.removeClass(document.getElementById('marker-btn').parentNode,'is-active');
        R.show(document.getElementById('adjustment-ctrls'),'inline');
        R.hide(document.getElementById('crop-ctrls'));
        R.hide(document.getElementById('marker-ctrls'));
    } else if (type === 'crop'){
        R.addClass(event.currentTarget.parentNode,'is-active');
        R.removeClass(document.getElementById('adjustment-btn').parentNode,'is-active');
        R.removeClass(document.getElementById('marker-btn').parentNode,'is-active');
        R.show(document.getElementById('crop-ctrls'),'inline');
        R.hide(document.getElementById('marker-ctrls'));
        R.hide(document.getElementById('adjustment-ctrls'));

        setupCrop();

    } else if (type === 'marker'){
        R.addClass(event.currentTarget.parentNode,'is-active');
        R.removeClass(document.getElementById('adjustment-btn').parentNode,'is-active');
        R.removeClass(document.getElementById('crop-btn').parentNode,'is-active');
        R.show(document.getElementById('marker-ctrls'),'inline');
        R.hide(document.getElementById('crop-ctrls'));
        R.hide(document.getElementById('adjustment-ctrls'));
    } else {
        //errr
    }
}



function run(){
    // let e = document.getElementById('apply-btn');
    // let i = document.getElementById('imgsrc');
    // R.addEvent(e,'click',async function(){


    // });
    document.getElementById('adjustments-btn');
    __r.addEvent(document.getElementById('adjustment-btn'),'click',moveCtrls);
    __r.addEvent(document.getElementById('crop-btn'),'click',moveCtrls);
    __r.addEvent(document.getElementById('marker-btn'),'click',moveCtrls);
    setCanvasImg();


}

const axios = require('axios');
const req = axios.create({
    baseURL: 'http://localhost:8641/'
});

__r.eady(run);

// let img = getBase64Image(i);
// console.log(util.inspect(img));






