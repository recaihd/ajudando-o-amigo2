const img = new Image();
img.src = "./img/template.webp"; 
const canvas = document.getElementById("pintoCanvas");
const ctx = canvas.getContext("2d");

const rSlider = document.getElementById("Red");
const gSlider = document.getElementById("Green");
const bSlider = document.getElementById("Blue");

let currentSize = 300; 

img.onload = () => {
  drawPinto();
};

function drawPinto() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(img, 0, 0, currentSize, currentSize);

  
  const imageData = ctx.getImageData(0, 0, currentSize, currentSize);
  const data = imageData.data;

  const r = parseInt(rSlider.value);
  const g = parseInt(gSlider.value);
  const b = parseInt(bSlider.value);

  for (let i = 0; i < data.length; i += 4) {
  
    if (data[i + 3] > 0) {
      data[i] = (data[i] * r) / 255;     
      data[i + 1] = (data[i + 1] * g) / 255; 
      data[i + 2] = (data[i + 2] * b) / 255; 
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

[rSlider, gSlider, bSlider].forEach(slider => {
  slider.addEventListener("input", drawPinto);
});


function CheckTheBox(IsSelected) {
  const checkboxes = document.getElementsByName("box1");
  checkboxes.forEach((checkbox) => {
    if (checkbox !== IsSelected) {
      checkbox.checked = false;
    } else {
      switch (checkbox.id) {
        case "S":
          currentSize = 120;
          break;
        case "M":
          currentSize = 210;
          break;
        case "G":
          currentSize = 300;
          break;
      }
      canvas.width = currentSize;
      canvas.height = currentSize;
      drawPinto();
    }
  });
}
