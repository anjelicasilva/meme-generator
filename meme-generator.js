let topTextInput, bottomTextInput, imageInput, generateMemeBtn, canvas, ctx;

// Create a function that generates a meme
function generateMeme (img, topText, bottomText) {
    canvas.width = img.width;
    canvas.height = img.height;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the image
    ctx.drawImage(img, 0, 0);

    let fontSize = canvas.width / 15;
    ctx.font = fontSize + 'px Impact';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = fontSize / 15;
    ctx.textAlign = 'center';

    // Draw top text 
    ctx.textBaseline = 'top';
    topText.split('\n').forEach(function (txt, idx) {
        ctx.fillText(txt, canvas.width / 2, idx * fontSize, canvas.width);
        ctx.strokeText(txt, canvas.width / 2, idx * fontSize, canvas.width);
    });
    
     // Draw bottom text 
     // Must reverse array, subtracting each index will cause it to start writing from the bottom
    ctx.textBaseline = 'bottom';
    bottomText.split('\n').reverse().forEach(function (txt, idx) {
        ctx.fillText(txt, canvas.width / 2, canvas.height - idx * fontSize, canvas.width);
        ctx.strokeText(txt, canvas.width / 2, canvas.height - idx * fontSize, canvas.width);
    });
}


// Create an initialization function
function init () {
    topTextInput = document.getElementById("top-text");
    bottomTextInput = document.getElementById("bottom-text")
    imageInput = document.getElementById("image-input");
    generateMemeBtn = document.getElementById("generate-meme-btn");
    canvas = document.getElementById("meme-canvas");

    ctx = canvas.getContext('2d');

    // Set canvas width and height to zero so it disappears.
    // Reset width and height each time we generate a new meme
    // and base it off of the width and height of the image
    // that the user selects
    canvas.width = canvas.height = 0;

    generateMemeBtn.addEventListener('click', function () {
        console.log('did it work?')
        let reader = new FileReader();
        console.log('what does the reader look like?', reader)
        reader.onload = function () {
            let img = new Image;
            img.src = reader.result;
            generateMeme(img, topTextInput.value, bottomTextInput.value);
        };
        reader.readAsDataURL(imageInput.files[0]);
    });
}

init();