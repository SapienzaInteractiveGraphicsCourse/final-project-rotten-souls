function playerHealing(skeleton, frameRate, initialPos, initialRot) {
    var currPos;
    var currRot;

    //chest
    const chest = skeleton.bones[skeleton.getBoneIndexByName("chest")];
    currPos = initialPos[skeleton.getBoneIndexByName("chest")];
    const chestPos = new BABYLON.Animation("idlePos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames1 = [];
    keyFrames1.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.03, currPos.z-0.0)
    });
    keyFrames1.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.03, currPos.z-0.0)
    });

    chestPos.setKeys(keyFrames1);
    //chestPos.setEasingFunction(sineEase);
    chest.animations.push(chestPos);

    currRot = initialRot[skeleton.getBoneIndexByName("chest")];
    const chestRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames2 = [];
    keyFrames2.push({
        frame: 0,
        value: currRot
    });
    keyFrames2.push({
        frame: 2 * frameRate,
        value: currRot
    });

    chestRot.setKeys(keyFrames2);
    //chestRot.setEasingFunction(sineEase);
    chest.animations.push(chestRot);

    /*//shoulder L
    const shoulderL = skeleton.bones[skeleton.getBoneIndexByName("shoulder L")];
    currRot = initialRot[skeleton.getBoneIndexByName("shoulder L")];

    const shoulderLRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames3 = [];
    keyFrames3.push({
        frame: 0,
        value: currRot
    });
    keyFrames3.push({
        frame: 2 * frameRate,
        value: currRot
    });

    shoulderLRot.setKeys(keyFrames3);
    shoulderLRot.setEasingFunction(sineEase);
    shoulderL.animations.push(shoulderLRot);

    //shoulder R
    const shoulderR = skeleton.bones[skeleton.getBoneIndexByName("shoulder R")];
    currRot = initialRot[skeleton.getBoneIndexByName("shoulder R")];

    const shoulderRRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames4 = [];
    keyFrames4.push({
        frame: 0,
        value: currRot
    });
    keyFrames4.push({
        frame: 2 * frameRate,
        value: currRot
    });

    shoulderRRot.setKeys(keyFrames4);
    shoulderRRot.setEasingFunction(sineEase);
    shoulderR.animations.push(shoulderRRot);*/

    //head
    const head = skeleton.bones[skeleton.getBoneIndexByName("head")];
    currRot = initialRot[skeleton.getBoneIndexByName("head")];

    const headRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames5 = [];
    keyFrames5.push({
        frame: 0,
        value: currRot
    });
    keyFrames5.push({
        frame: frameRate,
        value: currRot
    });
    keyFrames5.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.3, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames5.push({
        frame: 2 * frameRate,
        value: currRot
    });

    headRot.setKeys(keyFrames5);
    //headRot.setEasingFunction(sineEase);
    head.animations.push(headRot);

    //upper_leg L
    const upperLegL = skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg L")];

    const upperLegLRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames6 = [];
    keyFrames6.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.22, currRot.y+0.347, currRot.z-0.1785)
    });
    keyFrames6.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.22, currRot.y+0.347, currRot.z-0.1785)
    });

    upperLegLRot.setKeys(keyFrames6);
    //upperLegLRot.setEasingFunction(sineEase);
    upperLegL.animations.push(upperLegLRot);

    //upper_leg R
    const upperLegR = skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg R")];

    const upperLegRRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames7 = [];
    keyFrames7.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.22, currRot.y-0.347, currRot.z+0.1785)
    });
    keyFrames7.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.22, currRot.y-0.347, currRot.z+0.1785)
    });

    upperLegRRot.setKeys(keyFrames7);
    //upperLegRRot.setEasingFunction(sineEase);
    upperLegR.animations.push(upperLegRRot);

    //INVERTIRE X CON Y DA BLENDER E CAMBIARE SEGNO A NUOVA Y (che era x), SOLO PER BRACCIO SUPERIORE SINISTRO
    //PER DESTRO, INVERTIRE SEMPRE X CON Y, MA CAMBIARE SEGNO A NUOVA X (che era y)
    //(mandare avanti braccio destro in Blender --> x positiva; mandare avanti braccio in Babylon --> y negativa)
    //upper_arm L
    const upperArmL = skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm L")];

    const upperArmLRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames8 = [];
    keyFrames8.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.045, currRot.y+0.164, currRot.z-1.03)
    });
    keyFrames8.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.278, currRot.y-0.919, currRot.z-1.53)
    });
    keyFrames8.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.296, currRot.y-0.598, currRot.z-1.353)
    });
    keyFrames8.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.045, currRot.y+0.164, currRot.z-1.03)
    });

    upperArmLRot.setKeys(keyFrames8);
    //upperArmLRot.setEasingFunction(sineEase);
    upperArmL.animations.push(upperArmLRot);

    //upper_arm R
    const upperArmR = skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm R")];

    const upperArmRRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames9 = [];
    keyFrames9.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.076, currRot.y-0.026, currRot.z+1.082)
    });
    keyFrames9.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x-0.076, currRot.y-0.026, currRot.z+1.082)
    });

    upperArmRRot.setKeys(keyFrames9);
    //upperArmRRot.setEasingFunction(sineEase);
    upperArmR.animations.push(upperArmRRot);

    //lower_arm L
    const lowerArmL = skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm L")];
    
    const lowerArmLRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames10 = [];
    keyFrames10.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.35, currRot.y+0.392, currRot.z+0.05)
    });
    keyFrames10.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.35, currRot.y+0.392, currRot.z+0.05)
    });
    keyFrames10.push({
        frame: frameRate,
        value: new BABYLON.Vector3(currRot.x+1.862, currRot.y+0.225, currRot.z+0.416)
    });
    keyFrames10.push({
        frame: 7 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+1.875, currRot.y-0.069, currRot.z-0.64)
    });
    keyFrames10.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+2.073, currRot.y-0.768, currRot.z-0.861)
    });
    keyFrames10.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.35, currRot.y+0.392, currRot.z+0.05)
    });

    lowerArmLRot.setKeys(keyFrames10);
    //lowerArmLRot.setEasingFunction(sineEase);
    lowerArmL.animations.push(lowerArmLRot);

    //lower_arm R
    const lowerArmR = skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm R")];

    const lowerArmRRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames11 = [];
    keyFrames11.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.34, currRot.y-0.146, currRot.z-0.022)
    });
    keyFrames11.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.34, currRot.y-0.146, currRot.z-0.022)
    });

    lowerArmRRot.setKeys(keyFrames11);
    //lowerArmRRot.setEasingFunction(sineEase);
    lowerArmR.animations.push(lowerArmRRot);

    //palm L
    const palmL = skeleton.bones[skeleton.getBoneIndexByName("palm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("palm L")];

    const palmLRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames16 = [];
    keyFrames16.push({
        frame: 0,
        value: currRot
    });
    keyFrames16.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y-1.5, currRot.z+0.0)
    });
    keyFrames16.push({
        frame: frameRate,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y-2.8, currRot.z+0.0)
    });
    keyFrames16.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y-3.074, currRot.z+0.5)
    });
    keyFrames16.push({
        frame: 2 * frameRate,
        value: currRot
    });

    palmLRot.setKeys(keyFrames16);
    //palmLRot.setEasingFunction(bezierEase);
    palmL.animations.push(palmLRot);

    //lower_leg L
    const lowerLegL = skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg L")];

    const lowerLegLRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames12 = [];
    keyFrames12.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.38, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames12.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.38, currRot.y+0.0, currRot.z+0.0)
    });

    lowerLegLRot.setKeys(keyFrames12);
    //lowerLegLRot.setEasingFunction(sineEase);
    lowerLegL.animations.push(lowerLegLRot);

    //lower_leg R
    const lowerLegR = skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg R")];

    const lowerLegRRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames13 = [];
    keyFrames13.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.38, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames13.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.38, currRot.y+0.0, currRot.z+0.0)
    });

    lowerLegRRot.setKeys(keyFrames13);
    //lowerLegRRot.setEasingFunction(sineEase);
    lowerLegR.animations.push(lowerLegRRot);

    //foot L
    const footL = skeleton.bones[skeleton.getBoneIndexByName("foot L")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot L")];

    const footLRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames14 = [];
    keyFrames14.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.16, currRot.y+0.0, currRot.z+0.3)
    });
    keyFrames14.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x-0.16, currRot.y+0.0, currRot.z+0.3)
    });

    footLRot.setKeys(keyFrames14);
    //footLRot.setEasingFunction(sineEase);
    footL.animations.push(footLRot);

    //foot R
    const footR = skeleton.bones[skeleton.getBoneIndexByName("foot R")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot R")];

    const footRRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames15 = [];
    keyFrames15.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.16, currRot.y+0.0, currRot.z-0.3)
    });
    keyFrames15.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x-0.16, currRot.y+0.0, currRot.z-0.3)
    });

    footRRot.setKeys(keyFrames15);
    //footRRot.setEasingFunction(sineEase);
    footR.animations.push(footRRot);
}
function groupPlayerHealing(skeleton) {
    const healingGroup = new BABYLON.AnimationGroup("healingGroup");
    healingGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[28], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    healingGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[29], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    //healingGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder L")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("shoulder L")]);
    //healingGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder R")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("shoulder R")]);
    healingGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("head")].animations[3], skeleton.bones[skeleton.getBoneIndexByName("head")]);
    healingGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[14], skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")]);
    healingGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")].animations[14], skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")]);
    healingGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")].animations[14], skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")]);
    healingGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")].animations[14], skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")]);
    healingGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")].animations[14], skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")]);
    healingGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")].animations[14], skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")]);
    healingGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("palm L")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("palm L")]);
    healingGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")].animations[14], skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")]);
    healingGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")].animations[14], skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")]);
    healingGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot L")].animations[14], skeleton.bones[skeleton.getBoneIndexByName("foot L")]);
    healingGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot R")].animations[14], skeleton.bones[skeleton.getBoneIndexByName("foot R")]);

    return healingGroup;
}