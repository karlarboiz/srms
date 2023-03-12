"use strict";

const img = document.querySelector('input[name="img"]');
const imgOutput = document.getElementById('img-output');
img.addEventListener('change',()=>{
    const file = img.files;

    if(!file || file === '') return;

    const pickedImage = file[0];
    imgOutput.src = URL.createObjectURL(pickedImage)
})


