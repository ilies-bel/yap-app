import React, {MutableRefObject, useEffect, useRef} from 'react';
import * as THREE from 'three';
import {createDroneModel} from './CreateDroneModel';
import {setupLights} from './SetupLights';
import {useInteractionHandler} from './hooks/UseInteractionHandler';
import {useAnimation} from './hooks/UseAnimation';

function DroneScene() {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const sphereRef: MutableRefObject<THREE.Mesh | null> = useRef(null);
    const eyeGroupRef: MutableRefObject<THREE.Group | null> = useRef(null);

    useEffect(() => {
        // Current ref for the div we'll mount our scene to
        const currentRef = mountRef.current;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#111827');

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            45,
            currentRef!.clientWidth / currentRef!.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 4;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(currentRef!.clientWidth, currentRef!.clientHeight);
        currentRef!.appendChild(renderer.domElement);

        // Create drone model
        const {mainBody, sphere, eyeGroup} = createDroneModel(scene);

        // Store references
        sphereRef.current = sphere;
        eyeGroupRef.current = eyeGroup;

        // Setup lights
        const {eyeLight} = setupLights(scene, eyeGroup);


        // Handle mouse movement for eye tracking
        const handleMouseMove = useInteractionHandler(
            currentRef!,
            camera,
            sphereRef,
            eyeGroupRef,
            mainBody
        );

        currentRef!.addEventListener('mousemove', handleMouseMove);

        // Handle window resize
        const handleResize = () => {
            camera.aspect = currentRef!.clientWidth / currentRef!.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentRef!.clientWidth, currentRef!.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        // Animation
        const {animate, cancelAnimation} = useAnimation(
            scene,
            camera,
            renderer,
            mainBody,
            eyeLight,
            eyeGroup,
        );

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            currentRef!.removeEventListener('mousemove', handleMouseMove);
            cancelAnimation();
            if (currentRef!.contains(renderer.domElement)) {
                currentRef!.removeChild(renderer.domElement);
            }
        };
    });

    return (
        <div
            ref={mountRef}
            className="w-full h-96 bg-gray-900 rounded-lg shadow-lg"
        ></div>
    );
}

export default DroneScene;