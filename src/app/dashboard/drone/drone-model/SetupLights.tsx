import * as THREE from "three";

interface SetupLightsReturn {
    ambientLight: THREE.AmbientLight;
    spotLight: THREE.SpotLight;
    pointLight: THREE.PointLight;
    eyeLight: THREE.PointLight;
}

export const setupLights = (
    scene: THREE.Scene,
    eyeGroup: THREE.Group
): SetupLightsReturn => {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Spot light
    const spotLight = new THREE.SpotLight(0xffffff, 23);
    spotLight.position.set(10, 10, 10);
    spotLight.angle = 0.15;
    spotLight.penumbra = 1;
    scene.add(spotLight);

    // Point light
    const pointLight = new THREE.PointLight(0xffffff, 20);
    pointLight.position.set(-10, -10, -10);
    scene.add(pointLight);

    // Eye light - move with the eye
    const eyeLight = new THREE.PointLight(0x00CED1, 2.5, 5);
    eyeLight.position.set(0, 0, 0.2);
    eyeGroup.add(eyeLight);

    return {ambientLight, spotLight, pointLight, eyeLight};
};