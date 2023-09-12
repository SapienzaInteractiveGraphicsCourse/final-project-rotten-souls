function playerDeath(skeleton, frameRate, initialPos, initialRot) {
    //The easing function makes the animation go in spurts, so I removed it
    var currPos;
    var currRot;

    //ANIMATED PARAMETERS
    //chest
    const chest = skeleton.bones[skeleton.getBoneIndexByName("chest")];
    currPos = initialPos[skeleton.getBoneIndexByName("chest")];
    const chestPos = new BABYLON.Animation("playerDeathPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames1 = [];
    keyFrames1.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.035, currPos.z+0.0)
    });
    keyFrames1.push({
        frame: 2 * frameRate/3,     //40 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.605, currPos.z+0.2)
    });
    keyFrames1.push({
        frame: 4 * frameRate/3,     //80 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.605, currPos.z+0.4)
    });
    keyFrames1.push({
        frame: 11 * frameRate/6,    //110 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.985, currPos.z+0.75)
    });

    chestPos.setKeys(keyFrames1);
    chest.animations.push(chestPos);

    currRot = initialRot[skeleton.getBoneIndexByName("chest")];
    const chestRot = new BABYLON.Animation("playerDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames2 = [];
    keyFrames2.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.1, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.133, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.369, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+1.55, currRot.y+0.0, currRot.z+0.0)
    });

    chestRot.setKeys(keyFrames2);
    //chestRot.setEasingFunction(bezierEase);
    chest.animations.push(chestRot);

    //shoulder L
    /*const shoulderL = skeleton.bones[skeleton.getBoneIndexByName("shoulder L")];
    currRot = initialRot[skeleton.getBoneIndexByName("shoulder L")];

    const shoulderLRot = new BABYLON.Animation("playerDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
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

    const shoulderRRot = new BABYLON.Animation("playerDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
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
    /*const head = skeleton.bones[skeleton.getBoneIndexByName("head")];
    currRot = initialRot[skeleton.getBoneIndexByName("head")];

    const headRot = new BABYLON.Animation("headRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames5 = [];
    keyFrames5.push({
        frame: 0,
        value: currRot
    });
    keyFrames5.push({
        frame: frameRate,
        value: new BABYLON.Vector3(currRot.x+0.152, currRot.y+0.0, currRot.z+0.0)
        //value: new BABYLON.Vector3(currRot.x-0.152, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames5.push({
        frame: 2 * frameRate,
        value: currRot
    });

    headRot.setKeys(keyFrames5);
    head.animations.push(headRot);*/

    //INVERTIRE X CON Y DA BLENDER E CAMBIARE SEGNO A NUOVA Y (che era x), SOLO PER BRACCIO SUPERIORE SINISTRO
    //PER DESTRO, INVERTIRE SEMPRE X CON Y, MA CAMBIARE SEGNO A NUOVA X (che era y)
    //(mandare avanti braccio destro in Blender --> x positiva; mandare avanti braccio in Babylon --> y negativa)
    //upper_arm L
    const upperArmL = skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm L")];

    const upperArmLRot = new BABYLON.Animation("playerDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames5 = [];
    keyFrames5.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.047, currRot.y+0.018, currRot.z-0.982)
    });
    keyFrames5.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.401, currRot.y-2.46, currRot.z-0.678)
    });
    keyFrames5.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.383, currRot.y-2.47, currRot.z-0.758)
    });

    upperArmLRot.setKeys(keyFrames5);
    //upperArmLRot.setEasingFunction(bezierEase);
    upperArmL.animations.push(upperArmLRot);

    //la y la cambio di segno e la metto nella x; la x la metto nella y ma non cambio segno
    //upper_arm R
    const upperArmR = skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm R")];

    const upperArmRRot = new BABYLON.Animation("playerDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames6 = [];
    keyFrames6.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.033, currRot.y-0.08, currRot.z+0.874)
    });
    keyFrames6.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.15, currRot.y-0.323, currRot.z+0.745)
    });
    keyFrames6.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.196, currRot.y-0.276, currRot.z+0.641)
    });

    upperArmRRot.setKeys(keyFrames6);
    //upperArmRRot.setEasingFunction(bezierEase);
    upperArmR.animations.push(upperArmRRot);

    //lower_arm L
    const lowerArmL = skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm L")];
    const lowerArmLRot = new BABYLON.Animation("playerDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames7 = [];
    keyFrames7.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.252, currRot.y+0.355, currRot.z-0.15)
    });
    keyFrames7.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.252, currRot.y+0.355, currRot.z-0.15)
    });

    lowerArmLRot.setKeys(keyFrames7);
    //lowerArmLRot.setEasingFunction(bezierEase);
    lowerArmL.animations.push(lowerArmLRot);

    //lower_arm R
    const lowerArmR = skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm R")];

    const lowerArmRRot = new BABYLON.Animation("playerDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames8 = [];
    keyFrames8.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.578, currRot.y-0.438, currRot.z+0.468)
    });
    keyFrames8.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.578, currRot.y-0.438, currRot.z+0.468)
    });

    lowerArmRRot.setKeys(keyFrames8);
    //lowerArmRRot.setEasingFunction(bezierEase);
    lowerArmR.animations.push(lowerArmRRot);

    //palm R
    const palmR = skeleton.bones[skeleton.getBoneIndexByName("palm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("palm R")];

    const palmRRot = new BABYLON.Animation("playerDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames15 = [];
    keyFrames15.push({
        frame: 0,
        value: currRot
    });
    keyFrames15.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+1.75, currRot.z+0.0)
    });
    keyFrames15.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+2.4, currRot.z+0.0)
    });

    palmRRot.setKeys(keyFrames15);
    //palmRRot.setEasingFunction(bezierEase);
    palmR.animations.push(palmRRot);

    //PER GAMBE SUPERIORI, DA BLENDER, CAMBIARE SOLO SEGNI DI X E Y (MA SENZA INVERTIRE VALORI)
    //upper_leg L
    const upperLegL = skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg L")];

    const upperLegLRot = new BABYLON.Animation("playerDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames9 = [];
    keyFrames9.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.209, currRot.y+0.33, currRot.z-0.194)
    });
    keyFrames9.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.992, currRot.y+0.374, currRot.z-0.086)
    });
    keyFrames9.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.138, currRot.y+0.3, currRot.z-0.237)
    });

    upperLegLRot.setKeys(keyFrames9);
    //upperLegLRot.setEasingFunction(bezierEase);
    upperLegL.animations.push(upperLegLRot);

    //upper_leg R
    const upperLegR = skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg R")];

    const upperLegRRot = new BABYLON.Animation("playerDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames10 = [];
    keyFrames10.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.227, currRot.y-0.303, currRot.z+0.17)
    });
    keyFrames10.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+1.042, currRot.y-0.335, currRot.z-0.096)
    });
    keyFrames10.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.127, currRot.y-0.27, currRot.z+0.218)
    });

    upperLegRRot.setKeys(keyFrames10);
    //upperLegRRot.setEasingFunction(bezierEase);
    upperLegR.animations.push(upperLegRRot);

    //lower_leg L
    const lowerLegL = skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg L")];

    const lowerLegLRot = new BABYLON.Animation("playerDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames11 = [];
    keyFrames11.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.204, currRot.y-0.034, currRot.z+0.06)
    });
    keyFrames11.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+2.247, currRot.y+0.602, currRot.z-0.025)
    });
    keyFrames11.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+1.949, currRot.y+0.552, currRot.z-0.08)
    });
    keyFrames11.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.109, currRot.y-0.049, currRot.z+0.093)
    });

    lowerLegLRot.setKeys(keyFrames11);
    //lowerLegLRot.setEasingFunction(bezierEase);
    lowerLegL.animations.push(lowerLegLRot);

    //lower_leg R
    const lowerLegR = skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg R")];

    const lowerLegRRot = new BABYLON.Animation("playerDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames12 = [];
    keyFrames12.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.305, currRot.y+0.024, currRot.z-0.018)
    });
    keyFrames12.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+2.25, currRot.y-0.574, currRot.z+0.007)
    });
    keyFrames12.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+2.06, currRot.y-0.533, currRot.z+0.06)
    });
    keyFrames12.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.05, currRot.y+0.063, currRot.z-0.103)
    });

    lowerLegRRot.setKeys(keyFrames12);
    //lowerLegRRot.setEasingFunction(bezierEase);
    lowerLegR.animations.push(lowerLegRRot);

    //foot L
    const footL = skeleton.bones[skeleton.getBoneIndexByName("foot L")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot L")];

    const footLRot = new BABYLON.Animation("playerDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames13 = [];
    keyFrames13.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.018, currRot.y+0.0, currRot.z+0.301)
    });
    keyFrames13.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.747, currRot.y+0.042, currRot.z+0.324)
    });
    keyFrames13.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.647, currRot.y+0.042, currRot.z+0.324)
    });

    footLRot.setKeys(keyFrames13);
    //footLRot.setEasingFunction(bezierEase);
    footL.animations.push(footLRot);

    //foot R
    const footR = skeleton.bones[skeleton.getBoneIndexByName("foot R")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot R")];

    const footRRot = new BABYLON.Animation("playerDeathRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames14 = [];
    keyFrames14.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.12, currRot.y+0.0, currRot.z-0.3)
    });
    keyFrames14.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.805, currRot.y-0.039, currRot.z-0.325)
    });
    keyFrames14.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.805, currRot.y-0.039, currRot.z-0.325)
    });

    footRRot.setKeys(keyFrames14);
    //footRRot.setEasingFunction(bezierEase);
    footR.animations.push(footRRot);
}
function groupPlayerDeath(skeleton) {
    const playerDeathGroup = new BABYLON.AnimationGroup("playerDeathGroup");
    //playerDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("main")]);
    playerDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[26], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    playerDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[27], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    //playerDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder L")].animations[1], skeleton.bones[skeleton.getBoneIndexByName("shoulder L")]);
    //playerDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder R")].animations[1], skeleton.bones[skeleton.getBoneIndexByName("shoulder R")]);
    playerDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")].animations[13], skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")]);
    playerDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")].animations[13], skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")]);
    playerDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")].animations[13], skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")]);
    playerDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")].animations[13], skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")]);
    playerDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("palm R")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("palm R")]);
    playerDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[13], skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")]);
    playerDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")].animations[13], skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")]);
    playerDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")].animations[13], skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")]);
    playerDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")].animations[13], skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")]);
    playerDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot L")].animations[13], skeleton.bones[skeleton.getBoneIndexByName("foot L")]);
    playerDeathGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot R")].animations[13], skeleton.bones[skeleton.getBoneIndexByName("foot R")]);

    return playerDeathGroup;
}

//Keyframes: 25=5/12fr; 35=7/12fr; 45=3/4fr; 55=11/12; 80=4/3fr; 110=11/6fr

//****REMINDER FOR BONES NAMES****
//main  chest  neck  head  
//shoulder L  upper_arm L  lower_arm L  palm L  thumb L  fingers L  upper_leg L  lower_leg L  foot L  
//shoulder R  upper_arm R  lower_arm R  palm R  thumb R  fingers R  upper_leg R  lower_leg R  foot R  
//sword  sheath(only for darkwraith)  cape(only for silver knight)