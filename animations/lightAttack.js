function playerLightAttack(skeleton, frameRate, initialPos, initialRot) {
    var currPos;
    var currRot;

    //ANIMATED PARAMETERS
    //chest
    const chest = skeleton.bones[skeleton.getBoneIndexByName("chest")];
    currPos = initialPos[skeleton.getBoneIndexByName("chest")];
    const chestPos = new BABYLON.Animation("playerLAttackPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames1 = [];
    keyFrames1.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.035, currPos.z+0.0)
    });
    keyFrames1.push({
        frame: 5 * frameRate/6,     //50 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.135, currPos.z+0.8)
    });
    keyFrames1.push({
        frame: 5 * frameRate/3,     //100 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.035, currPos.z+0.0)
    });

    chestPos.setKeys(keyFrames1);
    //chestPos.setEasingFunction(bezierEase);
    chest.animations.push(chestPos);

    currRot = initialRot[skeleton.getBoneIndexByName("chest")];
    const chestRot = new BABYLON.Animation("playerLAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames2 = [];
    keyFrames2.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.1, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.3, currRot.y+0.4, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.1, currRot.y+0.0, currRot.z+0.0)
    });

    chestRot.setKeys(keyFrames2);
    //chestRot.setEasingFunction(bezierEase);
    chest.animations.push(chestRot);

    //shoulder L
    const shoulderL = skeleton.bones[skeleton.getBoneIndexByName("shoulder L")];
    currRot = initialRot[skeleton.getBoneIndexByName("shoulder L")];

    const shoulderLRot = new BABYLON.Animation("playerLAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
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
    shoulderL.animations.push(shoulderLRot);

    //shoulder R
    const shoulderR = skeleton.bones[skeleton.getBoneIndexByName("shoulder R")];
    currRot = initialRot[skeleton.getBoneIndexByName("shoulder R")];

    const shoulderRRot = new BABYLON.Animation("playerLAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames4 = [];
    keyFrames4.push({
        frame: 0,
        value: currRot
    });
    keyFrames4.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.3, currRot.y+1.3, currRot.z+0.0)
    });
    keyFrames4.push({
        frame: 5 * frameRate/3,
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

    //INVERTIRE X CON Y DA BLENDER E CAMBIARE SEGNO A NUOVA Y (che era x), SOLO PER BRACCIO SUPERIORE SINISTRO(NON SO PERCHé)
    //PER DESTRO, INVERTIRE SEMPRE X CON Y, MA CAMBIARE SEGNO A NUOVA X (che era y)
    //(mandare avanti braccio destro in Blender --> x positiva; mandare avanti braccio in Babylon --> y negativa)
    //upper_arm L
    const upperArmL = skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm L")];

    const upperArmLRot = new BABYLON.Animation("playerLAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames5 = [];
    keyFrames5.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.047, currRot.y+0.018, currRot.z-0.982)
    });
    keyFrames5.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.329, currRot.y+0.717, currRot.z-1.033)
    });
    keyFrames5.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.047, currRot.y+0.018, currRot.z-0.982)
    });

    upperArmLRot.setKeys(keyFrames5);
    //upperArmLRot.setEasingFunction(bezierEase);
    upperArmL.animations.push(upperArmLRot);

    //upper_arm R
    const upperArmR = skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm R")];

    const upperArmRRot = new BABYLON.Animation("playerLAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames6 = [];
    keyFrames6.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.033, currRot.y-0.08, currRot.z+0.874)
    });
    keyFrames6.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x-0.551, currRot.y+0.552, currRot.z-0.605)
    });
    keyFrames6.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.585, currRot.y+1.262, currRot.z+1.109)
    });
    keyFrames6.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.353, currRot.y+1.168, currRot.z+1.189)
    });
    keyFrames6.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.033, currRot.y-0.08, currRot.z+0.874)
    });

    upperArmRRot.setKeys(keyFrames6);
    //upperArmRRot.setEasingFunction(bezierEase);
    upperArmR.animations.push(upperArmRRot);

    //lower_arm L
    const lowerArmL = skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm L")];
    const lowerArmLRot = new BABYLON.Animation("playerLAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
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

    const lowerArmRRot = new BABYLON.Animation("playerLAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames8 = [];
    keyFrames8.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.578, currRot.y-0.438, currRot.z+0.468)
    });
    keyFrames8.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.104, currRot.y+1.053, currRot.z+0.575)
    });
    keyFrames8.push({
        frame: 11 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.468, currRot.y+1.67, currRot.z+0.618)
    });
    keyFrames8.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.578, currRot.y-0.438, currRot.z+0.468)
    });

    lowerArmRRot.setKeys(keyFrames8);
    //lowerArmRRot.setEasingFunction(bezierEase);
    lowerArmR.animations.push(lowerArmRRot);

    //palm R
    const palmR = skeleton.bones[skeleton.getBoneIndexByName("palm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("palm R")];

    const palmRRot = new BABYLON.Animation("playerLAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames9 = [];
    keyFrames9.push({
        frame: 0,
        value: currRot
    });
    keyFrames9.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+0.82, currRot.z+0.0)
    });
    keyFrames9.push({
        frame: 5 * frameRate/3,
        value: currRot
    });

    palmRRot.setKeys(keyFrames9);
    //palmRRot.setEasingFunction(bezierEase);
    palmR.animations.push(palmRRot);

    //PER GAMBE SUPERIORI CAMBIARE SOLO SEGNI DI X E Y (MA SENZA INVERTIRE VALORI)
    //upper_leg L
    const upperLegL = skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg L")];

    const upperLegLRot = new BABYLON.Animation("playerLAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames10 = [];
    keyFrames10.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.209, currRot.y+0.33, currRot.z-0.194)
    });
    keyFrames10.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.155, currRot.y+0.24, currRot.z-0.3)
    });
    keyFrames10.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.209, currRot.y+0.33, currRot.z-0.194)
    });

    upperLegLRot.setKeys(keyFrames10);
    //upperLegLRot.setEasingFunction(bezierEase);
    upperLegL.animations.push(upperLegLRot);

    //upper_leg R
    const upperLegR = skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg R")];

    const upperLegRRot = new BABYLON.Animation("playerLAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames11 = [];
    keyFrames11.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.227, currRot.y-0.303, currRot.z+0.17)
    });
    keyFrames11.push({
        frame: 2 * frameRate/3,     //40 frame
        value: new BABYLON.Vector3(currRot.x+1.337, currRot.y-0.284, currRot.z-0.184)
    });
    keyFrames11.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+1.08, currRot.y-0.332, currRot.z-0.108)
    });
    keyFrames11.push({
        frame: frameRate,
        value: new BABYLON.Vector3(currRot.x+1.08, currRot.y-0.332, currRot.z-0.108)
    });
    keyFrames11.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.227, currRot.y-0.303, currRot.z+0.17)
    });

    upperLegRRot.setKeys(keyFrames11);
    //upperLegRRot.setEasingFunction(bezierEase);
    upperLegR.animations.push(upperLegRRot);

    //lower_leg L
    const lowerLegL = skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg L")];

    const lowerLegLRot = new BABYLON.Animation("playerLAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames12 = [];
    keyFrames12.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.204, currRot.y-0.034, currRot.z+0.06)
    });
    keyFrames12.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.204, currRot.y-0.034, currRot.z+0.06)
    });

    lowerLegLRot.setKeys(keyFrames12);
    //lowerLegLRot.setEasingFunction(bezierEase);
    lowerLegL.animations.push(lowerLegLRot);

    //lower_leg R
    const lowerLegR = skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg R")];

    const lowerLegRRot = new BABYLON.Animation("playerLAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames13 = [];
    keyFrames13.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.305, currRot.y+0.024, currRot.z-0.018)
    });
    keyFrames13.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.704, currRot.y-0.075, currRot.z+0.087)
    });
    keyFrames13.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.433, currRot.y-0.0, currRot.z+0.019)
    });
    keyFrames13.push({
        frame: frameRate,
        value: new BABYLON.Vector3(currRot.x+0.433, currRot.y-0.0, currRot.z+0.019)
    });
    keyFrames13.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.305, currRot.y+0.024, currRot.z-0.018)
    });

    lowerLegRRot.setKeys(keyFrames13);
    //lowerLegRRot.setEasingFunction(bezierEase);
    lowerLegR.animations.push(lowerLegRRot);

    //foot L
    const footL = skeleton.bones[skeleton.getBoneIndexByName("foot L")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot L")];

    const footLRot = new BABYLON.Animation("playerLAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames14 = [];
    keyFrames14.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.018, currRot.y+0.0, currRot.z+0.301)
    });
    keyFrames14.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.533, currRot.y-0.023, currRot.z+0.301)
    });
    keyFrames14.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.018, currRot.y+0.0, currRot.z+0.301)
    });

    footLRot.setKeys(keyFrames14);
    //footLRot.setEasingFunction(bezierEase);
    footL.animations.push(footLRot);

    //foot R
    const footR = skeleton.bones[skeleton.getBoneIndexByName("foot R")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot R")];

    const footRRot = new BABYLON.Animation("playerLAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames15 = [];
    keyFrames15.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.12, currRot.y+0.0, currRot.z-0.3)
    });
    keyFrames15.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x-0.21, currRot.y-0.09, currRot.z-0.277)
    });
    keyFrames15.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.24, currRot.y-0.018, currRot.z-0.304)
    });
    keyFrames15.push({
        frame: frameRate,
        value: new BABYLON.Vector3(currRot.x+0.24, currRot.y-0.018, currRot.z-0.304)
    });
    keyFrames15.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.12, currRot.y+0.0, currRot.z-0.3)
    });

    footRRot.setKeys(keyFrames15);
    //footRRot.setEasingFunction(bezierEase);
    footR.animations.push(footRRot);
}
function groupPlayerLAttack(skeleton) {
    const playerLightAttackGroup = new BABYLON.AnimationGroup("playerLightAttackGroup");
    //playerLightAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")].animations[1], skeleton.bones[skeleton.getBoneIndexByName("main")]);
    playerLightAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[14], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    playerLightAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[15], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    playerLightAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder L")].animations[5], skeleton.bones[skeleton.getBoneIndexByName("shoulder L")]);
    playerLightAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder R")].animations[5], skeleton.bones[skeleton.getBoneIndexByName("shoulder R")]);
    playerLightAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")].animations[7], skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")]);
    playerLightAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")].animations[7], skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")]);
    playerLightAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")].animations[7], skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")]);
    playerLightAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")].animations[7], skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")]);
    playerLightAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("palm R")].animations[1], skeleton.bones[skeleton.getBoneIndexByName("palm R")]);
    playerLightAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[7], skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")]);
    playerLightAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")].animations[7], skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")]);
    playerLightAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")].animations[7], skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")]);
    playerLightAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")].animations[7], skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")]);
    playerLightAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot L")].animations[7], skeleton.bones[skeleton.getBoneIndexByName("foot L")]);
    playerLightAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot R")].animations[7], skeleton.bones[skeleton.getBoneIndexByName("foot R")]);

    return playerLightAttackGroup;
}

//Keyframes: 25=5/12fr; 35=7/12fr; 45=3/4fr; 55=11/12; 80=4/3fr; 110=11/6fr

//****REMINDER FOR BONES NAMES****
//main  chest  neck  head  
//shoulder L  upper_arm L  lower_arm L  palm L  thumb L  fingers L  upper_leg L  lower_leg L  foot L  
//shoulder R  upper_arm R  lower_arm R  palm R  thumb R  fingers R  upper_leg R  lower_leg R  foot R  
//sword  sheath(only for darkwraith)  cape(only for silver knight)