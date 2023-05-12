import { WaterfallSVGVisualizer } from "@magenta/music/es6";
import { useRef } from "react";

const container = <div></div>;

export default function Visualizer(props){
    if(props.ns === undefined){return;}


    const vis = new WaterfallSVGVisualizer(props.ns, container)
    console.log(vis);
    return(
        {container}
    );
}