import * as THREE from "three";
import {MutableRefObject} from "react";

interface HandlerParams {
    currentRef: HTMLDivElement;
    raycaster: THREE.Raycaster;
    camera: THREE.PerspectiveCamera;
    sphereRef: MutableRefObject<THREE.Mesh | null>;
    eyeGroupRef: MutableRefObject<THREE.Group | null>;
    mainBody: THREE.Group;
}

export const useInteractionHandler = (
    currentRef: HandlerParams["currentRef"],
    camera: HandlerParams["camera"],
    sphereRef: HandlerParams["sphereRef"],
    eyeGroupRef: HandlerParams["eyeGroupRef"],
    mainBody: HandlerParams["mainBody"],
): ((event: MouseEvent) => void) => {
    const mouse = new THREE.Vector2();


    // Initialize raycaster
    const raycaster = new THREE.Raycaster();

    return (event: MouseEvent) => {
        const rect = currentRef.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / currentRef.clientWidth) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / currentRef.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        if (!sphereRef.current) return;

        const intersects = raycaster.intersectObject(sphereRef.current);
        if (!intersects.length || !eyeGroupRef.current) return;

        const intersectionPoint = intersects[0].point.clone();
        const localIntersection = mainBody.worldToLocal(intersectionPoint);
        const normalizedPoint = localIntersection.normalize();

        if (normalizedPoint.z <= -0.2) return;

        eyeGroupRef.current.position.copy(normalizedPoint);
        eyeGroupRef.current.lookAt(0, 0, 0);
    };
};