import * as THREE from "three";

const rotate90Degrees = (mesh: THREE.Mesh) => {
    mesh.rotation.z = Math.PI / 2;
};

const createSideComponents = (mainBody) => {
    // Side cylindrical components
    const cylinderGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.5, 12);
    const cylinderMaterial = new THREE.MeshStandardMaterial({
        color: 0xA9A9A9,
        metalness: 0.3,
    });

    const rightCylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    rightCylinder.position.set(1.0, 0, 0);
    rotate90Degrees(rightCylinder)
    mainBody.add(rightCylinder);

    const leftCylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    leftCylinder.position.set(-1, 0, 0);
    rotate90Degrees(leftCylinder)
    mainBody.add(leftCylinder);

    return {rightCylinder, leftCylinder};
};

export default createSideComponents