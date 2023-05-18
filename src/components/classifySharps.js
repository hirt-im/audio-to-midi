export default function classifySharps(vis, blackWidth){
    let rects = vis.svg.children;
    for (let i = 0; i < rects.length; i++){
        let width = rects[i].attributes[4].value;
        if (width == blackWidth){
            rects[i].classList.add('sharp');
        }
    }
}
