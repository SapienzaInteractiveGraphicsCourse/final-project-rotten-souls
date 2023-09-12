function playerHeavyAttack(skeleton, frameRate, initialPos, initialRot) {
    var currPos;
    var currRot;

    //ANIMATED PARAMETERS
    //chest
    const chest = skeleton.bones[skeleton.getBoneIndexByName("chest")];
    currPos = initialPos[skeleton.getBoneIndexByName("chest")];
    const chestPos = new BABYLON.Animation("playerHAttackPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames1 = [];
    keyFrames1.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.035, currPos.z+0.0)
    });
    keyFrames1.push({
        frame: 5 * frameRate/6,     //50 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.065, currPos.z-0.3)
    });
    keyFrames1.push({
        frame: 4 * frameRate/3,     //80 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.035, currPos.z+0.218)
    });
    keyFrames1.push({
        frame: 5 * frameRate/3,     //100 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.115, currPos.z+0.7)
    });
    keyFrames1.push({
        frame: 13 * frameRate/6,     //130 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.035, currPos.z+0.0)
    });

    chestPos.setKeys(keyFrames1);
    //chestPos.setEasingFunction(bezierEase);
    chest.animations.push(chestPos);

    currRot = initialRot[skeleton.getBoneIndexByName("chest")];
    const chestRot = new BABYLON.Animation("playerHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames2 = [];
    keyFrames2.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.1, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.1, currRot.y-0.15, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.1, currRot.y+0.077, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.4, currRot.y+0.2, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 13 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.1, currRot.y+0.0, currRot.z+0.0)
    });

    chestRot.setKeys(keyFrames2);
    //chestRot.setEasingFunction(bezierEase);
    chest.animations.push(chestRot);

    //shoulder L
    /*const shoulderL = skeleton.bones[skeleton.getBoneIndexByName("shoulder L")];
    currRot = initialRot[skeleton.getBoneIndexByName("shoulder L")];

    const shoulderLRot = new BABYLON.Animation("playerHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames3 = [];
    keyFrames3.push({
        frame: 0,
        value: currRot
    });
    keyFrames3.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.3, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames3.push({
        frame: 5 * frameRate/3,
        value: currRot
    });

    shoulderLRot.setKeys(keyFrames3);
    //shoulderLRot.setEasingFunction(bezierEase);
    shoulderL.animations.push(shoulderLRot);*/

    //ANCHE PER SPALLE HO DOVUTO INVERTIRE X CON Y
    //shoulder R
    const shoulderR = skeleton.bones[skeleton.getBoneIndexByName("shoulder R")];
    currRot = initialRot[skeleton.getBoneIndexByName("shoulder R")];

    const shoulderRRot = new BABYLON.Animation("playerHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames4 = [];
    keyFrames4.push({
        frame: 0,
        value: currRot
    });
    keyFrames4.push({
        frame: 7 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y-0.5, currRot.z+0.142)
    });
    keyFrames4.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.4, currRot.y-0.5, currRot.z-0.35)
    });
    keyFrames4.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.65, currRot.y+0.3, currRot.z+0.0)
    });
    keyFrames4.push({
        frame: 13 * frameRate/6,
        value: currRot
    });

    shoulderRRot.setKeys(keyFrames4);
    //shoulderRRot.setEasingFunction(bezierEase);
    shoulderR.animations.push(shoulderRRot);

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

    const upperArmLRot = new BABYLON.Animation("playerHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames5 = [];
    keyFrames5.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.047, currRot.y+0.018, currRot.z-0.982)
    });
    keyFrames5.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.26, currRot.y-0.603, currRot.z-1.008)
    });
    keyFrames5.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.463, currRot.y+1.1, currRot.z-0.913)
    });
    keyFrames5.push({
        frame: 13 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.047, currRot.y+0.018, currRot.z-0.982)
    });

    upperArmLRot.setKeys(keyFrames5);
    //upperArmLRot.setEasingFunction(bezierEase);
    upperArmL.animations.push(upperArmLRot);
    
    //la y la cambio di segno e la metto nella x; la x la metto nella y ma non cambio segno
    //upper_arm R
    const upperArmR = skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm R")];
    
    const upperArmRRot = new BABYLON.Animation("playerHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames6 = [];
    keyFrames6.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.033, currRot.y-0.08, currRot.z+0.874)
    });
    keyFrames6.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-1.028, currRot.y-0.167, currRot.z+0.226)
    });
    keyFrames6.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.128, currRot.y+1.476, currRot.z-0.474)
    });
    keyFrames6.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+1.228, currRot.y-1.428, currRot.z+0.374)
    });
    keyFrames6.push({
        frame: 13 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.033, currRot.y-0.08, currRot.z+0.874)
    });

    upperArmRRot.setKeys(keyFrames6);
    //upperArmRRot.setEasingFunction(bezierEase);
    upperArmR.animations.push(upperArmRRot);

    //lower_arm L
    const lowerArmL = skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm L")];
    const lowerArmLRot = new BABYLON.Animation("playerHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames7 = [];
    keyFrames7.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.252, currRot.y+0.355, currRot.z-0.15)
    });
    keyFrames7.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.252, currRot.y+0.355, currRot.z-0.15)
    });

    lowerArmLRot.setKeys(keyFrames7);
    //lowerArmLRot.setEasingFunction(bezierEase);
    lowerArmL.animations.push(lowerArmLRot);

    //lower_arm R
    const lowerArmR = skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm R")];

    const lowerArmRRot = new BABYLON.Animation("playerHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames8 = [];
    keyFrames8.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.578, currRot.y-0.438, currRot.z+0.468)
    });
    keyFrames8.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.142, currRot.y+0.083, currRot.z+0.658)
    });
    keyFrames8.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.142, currRot.y+1.083, currRot.z+0.816)
    });
    keyFrames8.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.242, currRot.y+1.083, currRot.z+0.858)
    });
    keyFrames8.push({
        frame: 13 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.578, currRot.y-0.438, currRot.z+0.468)
    });


    lowerArmRRot.setKeys(keyFrames8);
    //lowerArmRRot.setEasingFunction(bezierEase);
    lowerArmR.animations.push(lowerArmRRot);

    //palm R
    const palmR = skeleton.bones[skeleton.getBoneIndexByName("palm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("palm R")];

    const palmRRot = new BABYLON.Animation("playerHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames9 = [];
    keyFrames9.push({
        frame: 0,
        value: currRot
    });
    keyFrames9.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.3, currRot.y+2.4, currRot.z+0.0)
    });
    keyFrames9.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.6, currRot.y-0.2, currRot.z+0.0)
    });
    keyFrames9.push({
        frame: 13 * frameRate/6,
        value: currRot
    });

    palmRRot.setKeys(keyFrames9);
    //palmRRot.setEasingFunction(bezierEase);
    palmR.animations.push(palmRRot);

    //PER GAMBE SUPERIORI, DA BLENDER, CAMBIARE SOLO SEGNI DI X E Y (MA SENZA INVERTIRE VALORI)
    //upper_leg L
    const upperLegL = skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg L")];

    const upperLegLRot = new BABYLON.Animation("playerHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames10 = [];
    keyFrames10.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.209, currRot.y+0.33, currRot.z-0.194)
    });
    keyFrames10.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.541, currRot.y+0.285, currRot.z+0.013)
    });
    keyFrames10.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.21, currRot.y+0.322, currRot.z-0.096)
    });
    keyFrames10.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.312, currRot.y+0.214, currRot.z-0.165)
    });
    keyFrames10.push({
        frame: 13 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.209, currRot.y+0.33, currRot.z-0.194)
    });

    upperLegLRot.setKeys(keyFrames10);
    //upperLegLRot.setEasingFunction(bezierEase);
    upperLegL.animations.push(upperLegLRot);

    //upper_leg R
    const upperLegR = skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg R")];

    const upperLegRRot = new BABYLON.Animation("playerHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames11 = [];
    keyFrames11.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.227, currRot.y-0.303, currRot.z+0.17)
    });
    keyFrames11.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.441, currRot.y-0.16, currRot.z+0.261)
    });
    keyFrames11.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.23, currRot.y-0.296, currRot.z+0.08)
    });
    keyFrames11.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+1.255, currRot.y-0.334, currRot.z-0.128)
    });
    keyFrames11.push({
        frame: 13 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.227, currRot.y-0.303, currRot.z+0.17)
    });

    upperLegRRot.setKeys(keyFrames11);
    //upperLegRRot.setEasingFunction(bezierEase);
    upperLegR.animations.push(upperLegRRot);

    //lower_leg L
    const lowerLegL = skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg L")];

    const lowerLegLRot = new BABYLON.Animation("playerHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames12 = [];
    keyFrames12.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.204, currRot.y-0.034, currRot.z+0.06)
    });
    keyFrames12.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.297, currRot.y-0.025, currRot.z+0.032)
    });
    keyFrames12.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.155, currRot.y-0.051, currRot.z+0.083)
    });
    keyFrames12.push({
        frame: 13 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.204, currRot.y-0.034, currRot.z+0.06)
    });

    lowerLegLRot.setKeys(keyFrames12);
    //lowerLegLRot.setEasingFunction(bezierEase);
    lowerLegL.animations.push(lowerLegLRot);

    //lower_leg R
    const lowerLegR = skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg R")];

    const lowerLegRRot = new BABYLON.Animation("playerHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames13 = [];
    keyFrames13.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.305, currRot.y+0.024, currRot.z-0.018)
    });
    keyFrames13.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.168, currRot.y+0.038, currRot.z-0.061)
    });
    keyFrames13.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.72, currRot.y-0.09, currRot.z+0.089)
    });
    keyFrames13.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.296, currRot.y+0.016, currRot.z-0.021)
    });
    keyFrames13.push({
        frame: 13 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.305, currRot.y+0.024, currRot.z-0.018)
    });

    lowerLegRRot.setKeys(keyFrames13);
    //lowerLegRRot.setEasingFunction(bezierEase);
    lowerLegR.animations.push(lowerLegRRot);

    //foot L
    const footL = skeleton.bones[skeleton.getBoneIndexByName("foot L")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot L")];

    const footLRot = new BABYLON.Animation("playerHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames14 = [];
    keyFrames14.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.018, currRot.y+0.0, currRot.z+0.301)
    });
    keyFrames14.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.325, currRot.y-0.012, currRot.z+0.267)
    });
    keyFrames14.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.152, currRot.y-0.063, currRot.z+0.284)
    });
    keyFrames14.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.312, currRot.y-0.068, currRot.z+0.246)
    });
    keyFrames14.push({
        frame: 13 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.018, currRot.y+0.0, currRot.z+0.301)
    });

    footLRot.setKeys(keyFrames14);
    //footLRot.setEasingFunction(bezierEase);
    footL.animations.push(footLRot);

    //foot R
    const footR = skeleton.bones[skeleton.getBoneIndexByName("foot R")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot R")];

    const footRRot = new BABYLON.Animation("playerHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames15 = [];
    keyFrames15.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.12, currRot.y+0.0, currRot.z-0.3)
    });
    keyFrames15.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.361, currRot.y+0.0, currRot.z-0.314)
    });
    keyFrames15.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.241, currRot.y+0.0, currRot.z-0.317)
    });
    keyFrames15.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.375, currRot.y-0.018, currRot.z-0.321)
    });
    keyFrames15.push({
        frame: 13 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.12, currRot.y+0.0, currRot.z-0.3)
    });

    footRRot.setKeys(keyFrames15);
    //footRRot.setEasingFunction(bezierEase);
    footR.animations.push(footRRot);
}
function groupPlayerHAttack(skeleton) {
    const playerHeavyAttackGroup = new BABYLON.AnimationGroup("playerHeavyAttackGroup");
    //playerHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")].animations[1], skeleton.bones[skeleton.getBoneIndexByName("main")]);
    playerHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[16], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    playerHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[17], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    //playerHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder L")].animations[5], skeleton.bones[skeleton.getBoneIndexByName("shoulder L")]);
    playerHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder R")].animations[6], skeleton.bones[skeleton.getBoneIndexByName("shoulder R")]);
    playerHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")].animations[8], skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")]);
    playerHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")].animations[8], skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")]);
    playerHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")].animations[8], skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")]);
    playerHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")].animations[8], skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")]);
    playerHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("palm R")].animations[2], skeleton.bones[skeleton.getBoneIndexByName("palm R")]);
    playerHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[8], skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")]);
    playerHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")].animations[8], skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")]);
    playerHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")].animations[8], skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")]);
    playerHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")].animations[8], skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")]);
    playerHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot L")].animations[8], skeleton.bones[skeleton.getBoneIndexByName("foot L")]);
    playerHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot R")].animations[8], skeleton.bones[skeleton.getBoneIndexByName("foot R")]);

    return playerHeavyAttackGroup;
}

//Keyframes: 25=5/12fr; 35=7/12fr; 45=3/4fr; 55=11/12; 80=4/3fr; 110=11/6fr

//****REMINDER FOR BONES NAMES****
//main  chest  neck  head  
//shoulder L  upper_arm L  lower_arm L  palm L  thumb L  fingers L  upper_leg L  lower_leg L  foot L  
//shoulder R  upper_arm R  lower_arm R  palm R  thumb R  fingers R  upper_leg R  lower_leg R  foot R  
//sword  sheath(only for darkwraith)  cape(only for silver knight)