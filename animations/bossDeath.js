function bossDeath(skeleton, frameRate, initialPos, initialRot) {
    //The easing function makes the animation go in spurts, so I removed it
    var currPos;
    var currRot;

    //ANIMATED PARAMETERS
    //chest
    const chest = skeleton.bones[skeleton.getBoneIndexByName("chest")];
    currPos = initialPos[skeleton.getBoneIndexByName("chest")];
    const chestPos = new BABYLON.Animation("bossDeathPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames1 = [];
    keyFrames1.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.025, currPos.z+0.0)
    });
    keyFrames1.push({
        frame: 2 * frameRate/3,     //40 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.025, currPos.z+0.0)
    });
    keyFrames1.push({
        frame: 4 * frameRate/3,     //80 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.585, currPos.z+0.5)
    });
    keyFrames1.push({
        frame: 3 * frameRate/2,    //90 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.585, currPos.z+0.5)
    });
    keyFrames1.push({
        frame: 7 * frameRate/3,    //140 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-1.2, currPos.z+1.15)
    });

    chestPos.setKeys(keyFrames1);
    chest.animations.push(chestPos);

    currRot = initialRot[skeleton.getBoneIndexByName("chest")];
    const chestRot = new BABYLON.Animation("bossDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames2 = [];
    keyFrames2.push({
        frame: 0,
        value: currRot
    });
    keyFrames2.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.2, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 4 * frameRate/3,
        value: currRot
    });
    keyFrames2.push({
        frame: 3 * frameRate/2,
        value: currRot
    });
    keyFrames2.push({
        frame: 7 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+1.52, currRot.y+0.0, currRot.z+0.0)
    });

    chestRot.setKeys(keyFrames2);
    //chestRot.setEasingFunction(bezierEase);
    chest.animations.push(chestRot);

    //shoulder L
    /*const shoulderL = skeleton.bones[skeleton.getBoneIndexByName("shoulder L")];
    currRot = initialRot[skeleton.getBoneIndexByName("shoulder L")];

    const shoulderLRot = new BABYLON.Animation("bossDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames3 = [];
    keyFrames3.push({
        frame: 0,
        value: currRot
    });
    keyFrames3.push({
        frame: 7 * frameRate/12,    //35 frame
        value: currRot
    });
    keyFrames3.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+0.0, currRot.z-0.065)
    });
    keyFrames3.push({
        frame: 11 * frameRate/6,
        value: currRot
    });

    shoulderLRot.setKeys(keyFrames3);
    //shoulderLRot.setEasingFunction(bezierEase);
    shoulderL.animations.push(shoulderLRot);

    //shoulder R
    const shoulderR = skeleton.bones[skeleton.getBoneIndexByName("shoulder R")];
    currRot = initialRot[skeleton.getBoneIndexByName("shoulder R")];

    const shoulderRRot = new BABYLON.Animation("bossDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames4 = [];
    keyFrames4.push({
        frame: 0,
        value: currRot
    });
    keyFrames4.push({
        frame: 7 * frameRate/12,    //35 frame
        value: currRot
    });
    keyFrames4.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+0.0, currRot.z+0.065)
    });
    keyFrames4.push({
        frame: 11 * frameRate/6,
        value: currRot
    });

    shoulderRRot.setKeys(keyFrames4);
    //shoulderRRot.setEasingFunction(bezierEase);
    shoulderR.animations.push(shoulderRRot);*/

    //head
    const head = skeleton.bones[skeleton.getBoneIndexByName("head")];
    //currRot = initialRot[skeleton.getBoneIndexByName("head")];

    //I had to manually adjust the head because the boneLookController messed up with the death animation
    const headRot = new BABYLON.Animation("bossDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFramesH = [];
    keyFramesH.push({
        frame: 0,
        value: new BABYLON.Vector3(-Math.PI, -Math.PI, 0.0)
    });
    keyFramesH.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(-Math.PI-0.1, -Math.PI, 0.0)
    });
    keyFramesH.push({
        frame: 3 * frameRate/2,
        value: new BABYLON.Vector3(-Math.PI-0.5, -Math.PI, 0.0)
    });
    keyFramesH.push({
        frame: 7 * frameRate/3,
        value: new BABYLON.Vector3(-Math.PI-0.8, -Math.PI, 0.0)
    });

    headRot.setKeys(keyFramesH);
    head.animations.push(headRot);

    //INVERTIRE X CON Y DA BLENDER E CAMBIARE SEGNO A NUOVA Y (che era x), SOLO PER BRACCIO SUPERIORE SINISTRO
    //PER DESTRO, INVERTIRE SEMPRE X CON Y, MA CAMBIARE SEGNO A NUOVA X (che era y)
    //(mandare avanti braccio destro in Blender --> x positiva; mandare avanti braccio in Babylon --> y negativa)
    //upper_arm L
    const upperArmL = skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm L")];

    const upperArmLRot = new BABYLON.Animation("bossDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames5 = [];
    keyFrames5.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.55, currRot.y+0.064, currRot.z-1.124)
    });
    keyFrames5.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.397, currRot.y-2.21, currRot.z-1.086)
    });
    keyFrames5.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.3, currRot.y-1.99, currRot.z-1.1)
    });
    keyFrames5.push({
        frame: 7 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.73, currRot.y-1.68, currRot.z-0.18)
    });

    upperArmLRot.setKeys(keyFrames5);
    //upperArmLRot.setEasingFunction(bezierEase);
    upperArmL.animations.push(upperArmLRot);

    //la y la cambio di segno e la metto nella x; la x la metto nella y ma non cambio segno
    //upper_arm R
    const upperArmR = skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm R")];

    const upperArmRRot = new BABYLON.Animation("bossDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames6 = [];
    keyFrames6.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.46, currRot.y-0.08, currRot.z+1.156)
    });
    keyFrames6.push({
        frame: 3 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.46, currRot.y-0.08, currRot.z+1.156)
    });
    keyFrames6.push({
        frame: 7 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.443, currRot.y-0.052, currRot.z+0.962)
    });

    upperArmRRot.setKeys(keyFrames6);
    //upperArmRRot.setEasingFunction(bezierEase);
    upperArmR.animations.push(upperArmRRot);

    //lower_arm L
    const lowerArmL = skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm L")];
    const lowerArmLRot = new BABYLON.Animation("bossDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames7 = [];
    keyFrames7.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.182, currRot.y-0.096, currRot.z+0.008)
    });
    keyFrames7.push({
        frame: 7 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.182, currRot.y-0.096, currRot.z+0.008)
    });

    lowerArmLRot.setKeys(keyFrames7);
    //lowerArmLRot.setEasingFunction(bezierEase);
    lowerArmL.animations.push(lowerArmLRot);

    //lower_arm R
    const lowerArmR = skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm R")];

    const lowerArmRRot = new BABYLON.Animation("bossDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames8 = [];
    keyFrames8.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.178, currRot.y+0.09, currRot.z-0.008)
    });
    keyFrames8.push({
        frame: 7 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.178, currRot.y+0.09, currRot.z-0.008)
    });

    lowerArmRRot.setKeys(keyFrames8);
    //lowerArmRRot.setEasingFunction(bezierEase);
    lowerArmR.animations.push(lowerArmRRot);

    //palm R
    const palmR = skeleton.bones[skeleton.getBoneIndexByName("palm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("palm R")];

    const palmRRot = new BABYLON.Animation("bossDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames15 = [];
    keyFrames15.push({
        frame: 0,
        value: currRot
    });
    keyFrames15.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+0.6, currRot.z+0.0)
    });
    keyFrames15.push({
        frame: 3 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+0.6, currRot.z+0.0)
    });
    keyFrames15.push({
        frame: 7 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+1.78, currRot.z+0.0)
    });

    palmRRot.setKeys(keyFrames15);
    //palmRRot.setEasingFunction(bezierEase);
    palmR.animations.push(palmRRot);

    //PER GAMBE SUPERIORI, DA BLENDER, CAMBIARE SOLO SEGNI DI X E Y (MA SENZA INVERTIRE VALORI)
    //upper_leg L
    const upperLegL = skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg L")];

    const upperLegLRot = new BABYLON.Animation("bossDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames9 = [];
    keyFrames9.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.062, currRot.y+0.2, currRot.z-0.1)
    });
    keyFrames9.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.142, currRot.y+0.176, currRot.z-0.141)
    });
    keyFrames9.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.052, currRot.y+0.187, currRot.z-0.123)
    });
    keyFrames9.push({
        frame: 3 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x-0.052, currRot.y+0.187, currRot.z-0.123)
    });
    keyFrames9.push({
        frame: 7 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.166, currRot.y+0.196, currRot.z-0.166)
    });

    upperLegLRot.setKeys(keyFrames9);
    //upperLegLRot.setEasingFunction(bezierEase);
    upperLegL.animations.push(upperLegLRot);

    //upper_leg R
    const upperLegR = skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg R")];

    const upperLegRRot = new BABYLON.Animation("bossDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames10 = [];
    keyFrames10.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.105, currRot.y-0.2, currRot.z+0.098)
    });
    keyFrames10.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.119, currRot.y-0.173, currRot.z+0.143)
    });
    keyFrames10.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+1.782, currRot.y-0.057, currRot.z-0.122)
    });
    keyFrames10.push({
        frame: 3 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+1.782, currRot.y-0.057, currRot.z-0.122)
    });
    keyFrames10.push({
        frame: 23 * frameRate/12,       //115 frame
        value: new BABYLON.Vector3(currRot.x+0.807, currRot.y-0.593, currRot.z+0.73)
    });
    keyFrames10.push({
        frame: 7 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.181, currRot.y-0.188, currRot.z+0.239)
    });

    upperLegRRot.setKeys(keyFrames10);
    //upperLegRRot.setEasingFunction(bezierEase);
    upperLegR.animations.push(upperLegRRot);

    //lower_leg L
    const lowerLegL = skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg L")];

    const lowerLegLRot = new BABYLON.Animation("bossDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames11 = [];
    keyFrames11.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.132, currRot.y+0.0, currRot.z-0.007)
    });
    keyFrames11.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.132, currRot.y+0.0, currRot.z-0.007)
    });
    keyFrames11.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+1.313, currRot.y+0.058, currRot.z-0.209)
    });
    keyFrames11.push({
        frame: 3 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+1.313, currRot.y+0.058, currRot.z-0.209)
    });
    keyFrames11.push({
        frame: 7 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.174, currRot.y+0.0, currRot.z-0.02)
    });

    lowerLegLRot.setKeys(keyFrames11);
    //lowerLegLRot.setEasingFunction(bezierEase);
    lowerLegL.animations.push(lowerLegLRot);

    //lower_leg R
    const lowerLegR = skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg R")];

    const lowerLegRRot = new BABYLON.Animation("bossDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames12 = [];
    keyFrames12.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.179, currRot.y+0.0, currRot.z+0.009)
    });
    keyFrames12.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.179, currRot.y+0.0, currRot.z+0.009)
    });
    keyFrames12.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+1.484, currRot.y-0.003, currRot.z+0.197)
    });
    keyFrames12.push({
        frame: 3 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+1.484, currRot.y-0.003, currRot.z+0.197)
    });
    keyFrames12.push({
        frame: 7 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.178, currRot.y-0.013, currRot.z+0.008)
    });

    lowerLegRRot.setKeys(keyFrames12);
    //lowerLegRRot.setEasingFunction(bezierEase);
    lowerLegR.animations.push(lowerLegRRot);

    //foot L
    const footL = skeleton.bones[skeleton.getBoneIndexByName("foot L")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot L")];

    const footLRot = new BABYLON.Animation("bossDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames13 = [];
    keyFrames13.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.066, currRot.y-0.107, currRot.z+0.156)
    });
    keyFrames13.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.066, currRot.y-0.107, currRot.z+0.156)
    });
    keyFrames13.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.523, currRot.y-0.122, currRot.z+0.222)
    });
    keyFrames13.push({
        frame: 3 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x-0.523, currRot.y-0.122, currRot.z+0.222)
    });
    keyFrames13.push({
        frame: 7 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.483, currRot.y-0.044, currRot.z+0.098)
    });

    footLRot.setKeys(keyFrames13);
    //footLRot.setEasingFunction(bezierEase);
    footL.animations.push(footLRot);

    //foot R
    const footR = skeleton.bones[skeleton.getBoneIndexByName("foot R")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot R")];

    const footRRot = new BABYLON.Animation("bossDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames14 = [];
    keyFrames14.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.058, currRot.y+0.0, currRot.z-0.147)
    });
    keyFrames14.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.058, currRot.y+0.0, currRot.z-0.147)
    });
    keyFrames14.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.236, currRot.y-0.023, currRot.z-0.142)
    });
    keyFrames14.push({
        frame: 3 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.236, currRot.y-0.023, currRot.z-0.142)
    });
    keyFrames14.push({
        frame: 7 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.688, currRot.y-0.059, currRot.z-0.143)
    });

    footRRot.setKeys(keyFrames14);
    //footRRot.setEasingFunction(bezierEase);
    footR.animations.push(footRRot);

    //cape
    const cape = skeleton.bones[skeleton.getBoneIndexByName("cape")];
    currRot = initialRot[skeleton.getBoneIndexByName("cape")];

    const capeRot = new BABYLON.Animation("bossDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames16 = [];
    keyFrames16.push({
        frame: 0,
        value: currRot
    });
    keyFrames16.push({
        frame: 2 * frameRate/3,
        value: currRot
    });
    keyFrames16.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.6, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames16.push({
        frame: 3 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x-0.3, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames16.push({
        frame: 13 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.8, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames16.push({
        frame: 3 * frameRate,       //180 frame (cape animation is longer than the ones of the other bones)
        value: new BABYLON.Vector3(currRot.x+0.2, currRot.y+0.0, currRot.z+0.0)
    });

    capeRot.setKeys(keyFrames16);
    //capeRot.setEasingFunction(bezierEase);
    cape.animations.push(capeRot);
}
//Cool disappearing animation when boss dies
function bossDeathVanishing(mesh, frameRate) {
    const bossVanishing = new BABYLON.Animation("bossVanishing", "visibility", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: 1.0
    });
    keyFrames.push({
        frame: 3 * frameRate,       //180 frame
        value: 1.0
    });
    keyFrames.push({
        frame: 5 * frameRate,       //300 frame
        value: 0.0
    });

    bossVanishing.setKeys(keyFrames);
    mesh.animations.push(bossVanishing);
}
function groupBossDeath(skeleton, model) {
    const bossDeathGroup = new BABYLON.AnimationGroup("bossDeathGroup");
    //bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("main")]);
    bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[10], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[11], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("head")].animations[1], skeleton.bones[skeleton.getBoneIndexByName("head")]);
    //bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder L")].animations[1], skeleton.bones[skeleton.getBoneIndexByName("shoulder L")]);
    //bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder R")].animations[1], skeleton.bones[skeleton.getBoneIndexByName("shoulder R")]);
    bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")].animations[5], skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")]);
    bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")].animations[5], skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")]);
    bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")].animations[5], skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")]);
    bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")].animations[5], skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")]);
    bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("palm R")].animations[5], skeleton.bones[skeleton.getBoneIndexByName("palm R")]);
    bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[5], skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")]);
    bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")].animations[5], skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")]);
    bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")].animations[5], skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")]);
    bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")].animations[5], skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")]);
    bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot L")].animations[5], skeleton.bones[skeleton.getBoneIndexByName("foot L")]);
    bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot R")].animations[5], skeleton.bones[skeleton.getBoneIndexByName("foot R")]);
    bossDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("cape")].animations[3], skeleton.bones[skeleton.getBoneIndexByName("cape")]);

    bossDeathGroup.addTargetedAnimation(model.animations[0], model);    //vanishing animation

    return bossDeathGroup;
}

//****REMINDER FOR BONES NAMES****
//main  chest  neck  head  
//shoulder L  upper_arm L  lower_arm L  palm L  thumb L  fingers L  upper_leg L  lower_leg L  foot L  
//shoulder R  upper_arm R  lower_arm R  palm R  thumb R  fingers R  upper_leg R  lower_leg R  foot R  
//sword  sheath(only for darkwraith)  cape(only for silver knight)