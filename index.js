const hex = document.getElementById("color-hex");
const inputColor = document.getElementById("input-color");
const inputColorText = document.getElementById("input-color-text");
const alteredColor = document.getElementById("altered-color");
const alteredColorText = document.getElementById("altered-color-text");
const slider = document.getElementById("color-perc-slider");
const sliderText = document.getElementById("slider-text");
const toggleButton = document.getElementById("toggleBtn");
const darkenText = document.getElementById("darkenText");
const lightenText = document.getElementById("lightenText");
const hexErrortext = document.getElementById("hexError");

hex.addEventListener("keyup", () => {
    const checkedHex = checkHexValue();
    if (checkedHex) {
        inputColor.style.backgroundColor = "#" + checkedHex;
        inputColorText.innerText = `Input color #${checkedHex}`;
        hexErrortext.style.display = "none";
    }
    else if (hex.value.length === 0) {
        hexErrortext.style.display = "none";
    }
    else {
        cleanColorData();
        hexErrortext.style.display = "inline";
        console.log(checkedHex);
    }
})

toggleButton.addEventListener("click", () => {
    if (toggleButton.classList.contains("toggled")){
        toggleButton.classList.remove("toggled");
        lightenText.classList.remove("unselected");
        darkenText.classList.add("unselected");
        adjustColorWithSlider();
    }
    else {
        toggleButton.classList.add("toggled");
        darkenText.classList.remove("unselected");
        lightenText.classList.add("unselected");
        adjustColorWithSlider();
    }
})

slider.addEventListener('input', () => {
    adjustColorWithSlider();
})

function adjustColorWithSlider (){
    const checkedHex = checkHexValue();
    if (!checkedHex) return;
    sliderText.innerText = slider.value + "%";
    const newColor = alterColor(checkedHex, slider.value);
    alteredColor.style.backgroundColor = newColor;
    alteredColorText.innerText = `Altered color ${newColor}`;
}

function cleanColorData (){
    inputColor.style.backgroundColor = "#ffffff";
    inputColorText.innerText = "Input color";
    alteredColorText.innerText = `Altered color`;
    alteredColor.style.backgroundColor = "#ffffff";
    sliderText.innerText = "0%";
    slider.value = 0;
}

function checkHexValue (){
    hexValue = hex.value;
    const cleanHex = hexValue.replace("#", "");
    const allowedChar = /^[0-9A-F]{6}$/i;
    if (allowedChar.test(cleanHex)) {
        console.log(cleanHex);
        return cleanHex;
    }
}

function convertHexToRgb (hex) {
    const hexR = hex.substring(0,2);
    const hexG = hex.substring(2,4);
    const hexB = hex.substring(4,6);
    const r = parseInt(hexR, 16);
    const g = parseInt(hexG, 16);
    const b = parseInt(hexB, 16);
    return {r,g,b}
}

function convertRgbToHex (r,g,b) {
    let firstHexPair = checkRgbPairLength(r.toString(16)); 
    let secondHexPair = checkRgbPairLength(g.toString(16));
    let thirdHexPair = checkRgbPairLength(b.toString(16));
    const convertedHex = "#"+ firstHexPair + secondHexPair + thirdHexPair;
    return convertedHex
}

function checkRgbPairLength (hexPair) {
    if(hexPair.length === 1) 
        hexPair = "0" + hexPair;
    return hexPair
}

function alterColor (hex, percent) {
    const rgb = convertHexToRgb(hex);
    const increase = Math.floor((percent/100) * 255);
    newR = increaseWithinRange(rgb.r, increase);
    newG = increaseWithinRange(rgb.g, increase);
    newB = increaseWithinRange(rgb.b, increase);
    const convertedToHex = convertRgbToHex(newR,newG,newB);
    return convertedToHex
}

function increaseWithinRange (value, increase){
    const valueAdition = toggleButton.classList.contains("toggled") ? -increase : increase;
    let newValue = value + valueAdition;
    if (newValue > 255) return 255;
    if (newValue < 0) return 0;
    
    return newValue
}
