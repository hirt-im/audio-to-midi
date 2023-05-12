import { WaterfallSVGVisualizer } from "@magenta/music/es6";
import { useRef } from "react";

const container = <div id='visualizer'></div>;

export default function Visualizer(props){
    if(props.ns === undefined){return;}


    const vis = new WaterfallSVGVisualizer(props.ns, document.getElementById('canvas'))
    console.log(vis);
    return(
        vis
    );
}