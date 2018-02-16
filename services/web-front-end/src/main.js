'use strict';


require('bulma/css/bulma.css');

const _ = require('lodash');
const util = require('util');


const axios = require('axios');
const req = axios.create({
    baseURL: 'http://localhost:8641/'
});





async function component() {


    let table = document.getElementById('photographers');

    // let resp = await req.get('photographers', {});
    // let people = resp.data;
    // console.log(util.inspect(people));
    // for (let p =0; p<people.length; p++){
    //     let person = people[p];
    //     let newEl = document.createElement('tr');
    //     newEl.innerHTML =  `<td>${person.firstName}</td> <td>${person.lastName}</td>`;
    //     insertAfter(newEl, table);
    //     console.log(newEl.innerHTML);
    // }
    // //console.log(people);


    let element = document.createElement('div');
    addClass(element,'container');

    let btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'Webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;

}
(async function(){
    //await component();
    document.body.appendChild(await component());
})();
