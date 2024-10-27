import { ArcRotateCamera, Color3, Engine, HemisphericLight, MeshBuilder, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import { useEffect, useRef } from "react";

const SceneComponent = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const engine = new Engine(canvasRef.current, true);
        const scene = new Scene(engine);
        scene.clearColor = new Color3(0, 0, 0);

        const camera = new ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        camera.attachControl(canvasRef.current, true);

        new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

        const box = MeshBuilder.CreateBox("box",{ size: 1 });
        const material = new StandardMaterial("boxMat", scene);
        material.diffuseColor = new Color3(1, 1, 1);  // 흰색
        box.material = material;

        // 마우스 휠 이벤트 방지
        const preventScroll = (event) => event.preventDefault();
        canvasRef.current.addEventListener("wheel", preventScroll);

        engine.runRenderLoop(() => {
            scene.render();
        });

        window.addEventListener("resize", () => {
            engine.resize();
        });

        return () => {
            engine.dispose();
        };
    }, [])

    return (
        <div style={{ 
            width:"100dvw",
            height:"100dvh",
            display:"flex", 
            justifyContent:"center", 
            alignItems:"center",
            border:"1px solid black"
        }}>
            <canvas ref={canvasRef} style={{ width: "90%", height: "90vh" }} />
        </div>
    )
}

export default SceneComponent;