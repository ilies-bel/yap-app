import * as THREE from "three";

const createMaterial = ({emissiveIntensity, opacity}: { emissiveIntensity: number, opacity: number }) => {
    return new THREE.MeshStandardMaterial({
        color: 0x00CED1,
        emissive: 0x00CED1,
        emissiveIntensity,
        transparent: true,
        opacity,
        side: THREE.DoubleSide
    });
};

const createEyeComponents = (eyeGroup: THREE.Group) => {
    // Eye interface - middle ring
    const eyeGeometry = new THREE.RingGeometry(0.2, 0.3, 32);
    const eyeMaterial = createMaterial({
        emissiveIntensity: 2.5,
        opacity: 0.9,
    });

    const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeGroup.add(eye);

    // Add inner eye glow
    const innerEyeGeometry = new THREE.CircleGeometry(0.18, 32);
    const innerEyeMaterial = createMaterial({
        emissiveIntensity: 0.5,
        opacity: 0.3,
    });

    const innerEye = new THREE.Mesh(innerEyeGeometry, innerEyeMaterial);
    eyeGroup.add(innerEye);


    const irisEyeGeometry = new THREE.CircleGeometry(0.05, 0.3);
    const irisEyeMaterial = createMaterial({
        emissiveIntensity: 0.5,
        opacity: 0.3,
    });

    const irisEye = new THREE.Mesh(irisEyeGeometry, irisEyeMaterial);
    eyeGroup.add(irisEye);

    // Add fixed outer eye ring
    const outerEyeGeometry = new THREE.RingGeometry(0.34, 0.37, 32);
    const outerEyeMaterial = createMaterial({
        emissiveIntensity: 3.0,
        opacity: 0.9,
    });
    const outerEye = new THREE.Mesh(outerEyeGeometry, outerEyeMaterial);
    eyeGroup.add(outerEye);

    return {eye, innerEye, outerEye};
};

export default createEyeComponents