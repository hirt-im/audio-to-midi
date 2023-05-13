
const SHARP_NOTES = [70,73,75,78,80,82,85,87,90,92,94,97,99,102,104,106,
    68,66,63,61,58,56,54,51,49,46,44,42,39,37,34,32,30,27,25,22];

const WHITE_KEY_FILL = '8, 41, 64';
const BLACK_KEY_FILL = '0, 204, 197';
const BLACK_ACTIVE = '235, 171, 52';
const WHITE_ACTIVE = '255, 215, 18';

const BLACK_KEY_COLOR = 'rgba(0, 204, 197, 0.79)';
let whiteWidth = Math.round(window.innerWidth / 65);
let blackWidth = Math.round(whiteWidth * (5 / 9));

export default function colorBlackKeys(vis){
    let rects = vis.svg.children;
    for (let i = 0; i < rects.length; i++){
        let width = rects[i].attributes[4].value;
        if (width == blackWidth){
            rects[i].attributes.fill.value = (BLACK_KEY_COLOR);
        }
    }
}



function classifySharps(vis){
    let rects = vis.svg.children;
    for (let i = 0; i < rects.length; i++){
        let width = rects[i].attributes[4].value;
        if (width == blackWidth){
            rects[i].classList.add('sharp');
        }
    }
}

export {classifySharps}