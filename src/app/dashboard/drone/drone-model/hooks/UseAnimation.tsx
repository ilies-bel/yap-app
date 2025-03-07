import * as THREE from 'three';


export const useAnimation = (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    mainBody: THREE.Group,
    eyeLight: THREE.PointLight,
    eyeGroup: any,
) => {
    let animationId: number;

    const animate = () => {
        animationId = requestAnimationFrame(animate);

        const time = Date.now() * 0.001;

        // Get eye components
        const eye = eyeGroup.children[0];
        const innerEye = eyeGroup.children[1];
        const outerEye = eyeGroup.children[2];

        // Pulsing eye rings - make them pulse slightly out of sync
        eye.material.emissiveIntensity = 2.5 + Math.sin(time * 2) * 0.5;
        innerEye.material.emissiveIntensity = 0.5 + Math.sin(time * 2 + 1) * 0.2;
        outerEye.material.emissiveIntensity = 2.0 + Math.sin(time * 2 - 0.5) * 0.7;

        // Pulsing eye light
        eyeLight.intensity = 2.0 + Math.sin(time * 2) * 0.5;

        // Hover animation
        mainBody.position.y = Math.sin(time) * 0.05;

        renderer.render(scene, camera);
    };

    const cancelAnimation = () => {
        cancelAnimationFrame(animationId);
    };

    return {animate, cancelAnimation};
};