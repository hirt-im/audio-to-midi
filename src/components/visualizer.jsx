import { useRef } from "react";

export default function Visualizer(props){
    if(props.ns === undefined){return;}

    const canvas = useRef();
    // const vis = new Visualizer(props.ns, canvas)
    return(
        <canvas ref={canvas}></canvas>
    );
}