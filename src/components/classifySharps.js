let whiteWidth = Math.round(window.innerWidth / 65);
let blackWidth = Math.round(whiteWidth * (5 / 9));

export default function classifySharps(vis){
    let rects = vis.svg.children;
    for (let i = 0; i < rects.length; i++){
        let width = rects[i].attributes[4].value;
        if (width == blackWidth){
            rects[i].classList.add('sharp');
        }
    }
}
