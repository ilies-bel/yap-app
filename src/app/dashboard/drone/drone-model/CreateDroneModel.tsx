import * as THREE from "three";
import {Vector3} from "three";
import createEyeComponents from "@/app/dashboard/drone/drone-model/CreateEyeComponents";
import createSideComponents from "@/app/dashboard/drone/drone-model/CreateSideComponents";


const initialEyePosition = new Vector3(0, 0, 1.0)

export const createDroneModel = (scene: THREE.Scene) => {
    // Main body
    const mainBody = new THREE.Group();
    scene.add(mainBody);

    // Sphere body
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0x555555,        // Darker grey
        metalness: 0.8,         // High but not full metalness
        roughness: 0.3,         // Medium roughness for brushed look
        envMapIntensity: 0.7,
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    mainBody.add(sphere);

    const eyeGroup = new THREE.Group();
    mainBody.add(eyeGroup);

    // Create eye components
    createEyeComponents(eyeGroup);

    // Position the eye group on the front of the sphere initially
    eyeGroup.position.set(initialEyePosition.x, initialEyePosition.y, initialEyePosition.z)

    createSideComponents(mainBody);


    return {mainBody, sphere, eyeGroup};
};