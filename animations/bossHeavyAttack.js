function bossHeavyAttack(skeleton, frameRate, initialPos, initialRot) {
    var currPos;
    var currRot;

    //ANIMATED PARAMETERS
    //chest
    const chest = skeleton.bones[skeleton.getBoneIndexByName("chest")];
    currPos = initialPos[skeleton.getBoneIndexByName("chest")];
    const chestPos = new BABYLON.Animation("bossHAttackPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames1 = [];
    keyFrames1.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.025, currPos.z+0.0)
    });
    /*keyFrames1.push({
        frame: 1 * frameRate/2,     //30 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.025, currPos.z-0.0)
    });*/
    keyFrames1.push({
        frame: 3 * frameRate/4,     //45 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.025, currPos.z+0.0)
    });
    keyFrames1.push({
        frame: 4 * frameRate/3,     //80 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.065, currPos.z+0.8)
    });
    keyFrames1.push({
        frame: 2 * frameRate,     //120 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.025, currPos.z+0.0)
    });

    chestPos.setKeys(keyFrames1);
    //chestPos.setEasingFunction(bezierEase);
    chest.animations.push(chestPos);

    currRot = initialRot[skeleton.getBoneIndexByName("chest")];
    const chestRot = new BABYLON.Animation("bossHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames2 = [];
    keyFrames2.push({
        frame: 0,
        value: currRot
    });
    keyFrames2.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.3, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x+0.3, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.5, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 2 * frameRate,
        value: currRot
    });

    chestRot.setKeys(keyFrames2);
    //chestRot.setEasingFunction(bezierEase);
    chest.animations.push(chestRot);

    //shoulder L
    /*const shoulderL = skeleton.bones[skeleton.getBoneIndexByName("shoulder L")];
    currRot = initialRot[skeleton.getBoneIndexByName("shoulder L")];

    const shoulderLRot = new BABYLON.Animation("bossHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
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

    const shoulderRRot = new BABYLON.Animation("bossHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames4 = [];
    keyFrames4.push({
        frame: 0,
        value: currRot
    });
    keyFrames4.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y-0.1, currRot.z+0.0)
    });
    keyFrames4.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y-0.1, currRot.z+0.0)
    });
    keyFrames4.push({
        frame: 5 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+0.1, currRot.z+0.0)
    });
    keyFrames4.push({
        frame: 2 * frameRate,
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

    const upperArmLRot = new BABYLON.Animation("bossHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames5 = [];
    keyFrames5.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.55, currRot.y+0.064, currRot.z-1.044)
    });
    keyFrames5.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.581, currRot.y-0.274, currRot.z-0.66)
    });
    keyFrames5.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x+0.581, currRot.y-0.274, currRot.z-0.66)
    });
    keyFrames5.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.752, currRot.y+1.51, currRot.z-0.8)
    });
    keyFrames5.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.55, currRot.y+0.064, currRot.z-1.044)
    });

    upperArmLRot.setKeys(keyFrames5);
    //upperArmLRot.setEasingFunction(bezierEase);
    upperArmL.animations.push(upperArmLRot);
    
    //la y la cambio di segno e la metto nella x; la x la metto nella y ma non cambio segno
    //upper_arm R
    const upperArmR = skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm R")];
    
    const upperArmRRot = new BABYLON.Animation("bossHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames6 = [];
    keyFrames6.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.46, currRot.y-0.079, currRot.z+1.156)
    });
    keyFrames6.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.558, currRot.y-1.507, currRot.z+0.83)
    });
    keyFrames6.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x+0.558, currRot.y-1.507, currRot.z+0.83)
    });
    keyFrames6.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.022, currRot.y+1.402, currRot.z+1.269)
    });
    keyFrames6.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.46, currRot.y-0.079, currRot.z+1.156)
    });

    upperArmRRot.setKeys(keyFrames6);
    //upperArmRRot.setEasingFunction(bezierEase);
    upperArmR.animations.push(upperArmRRot);

    //lower_arm L
    const lowerArmL = skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm L")];
    const lowerArmLRot = new BABYLON.Animation("bossHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames7 = [];
    keyFrames7.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.182, currRot.y-0.095, currRot.z+0.008)
    });
    keyFrames7.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.182, currRot.y-0.095, currRot.z+0.008)
    });

    lowerArmLRot.setKeys(keyFrames7);
    //lowerArmLRot.setEasingFunction(bezierEase);
    lowerArmL.animations.push(lowerArmLRot);

    //lower_arm R
    const lowerArmR = skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm R")];

    const lowerArmRRot = new BABYLON.Animation("bossHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames8 = [];
    keyFrames8.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.178, currRot.y+0.089, currRot.z-0.008)
    });
    keyFrames8.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+1.122, currRot.y+0.481, currRot.z-0.108)
    });
    keyFrames8.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x+1.122, currRot.y+0.481, currRot.z-0.108)
    });
    keyFrames8.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.124, currRot.y+0.004, currRot.z+0.092)
    });
    keyFrames8.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.178, currRot.y+0.089, currRot.z-0.008)
    });


    lowerArmRRot.setKeys(keyFrames8);
    //lowerArmRRot.setEasingFunction(bezierEase);
    lowerArmR.animations.push(lowerArmRRot);

    //palm R
    const palmR = skeleton.bones[skeleton.getBoneIndexByName("palm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("palm R")];

    const palmRRot = new BABYLON.Animation("bossHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames9 = [];
    keyFrames9.push({
        frame: 0,
        value: currRot
    });
    keyFrames9.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x-0.138, currRot.y-0.073, currRot.z+0.045)
    });
    keyFrames9.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x-0.138, currRot.y-0.073, currRot.z+0.045)
    });
    keyFrames9.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.53, currRot.y-0.43, currRot.z+0.213)
    });
    keyFrames9.push({
        frame: 2 * frameRate,
        value: currRot
    });

    palmRRot.setKeys(keyFrames9);
    //palmRRot.setEasingFunction(bezierEase);
    palmR.animations.push(palmRRot);

    //PER GAMBE SUPERIORI, DA BLENDER, CAMBIARE SOLO SEGNI DI X E Y (MA SENZA INVERTIRE VALORI)
    //upper_leg L
    const upperLegL = skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg L")];

    const upperLegLRot = new BABYLON.Animation("bossHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames10 = [];
    keyFrames10.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.062, currRot.y+0.2, currRot.z-0.098)
    });
    keyFrames10.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.366, currRot.y+0.218, currRot.z-0.03)
    });
    keyFrames10.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x+0.366, currRot.y+0.218, currRot.z-0.03)
    });
    keyFrames10.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.076, currRot.y+0.201, currRot.z-0.096)
    });
    keyFrames10.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.062, currRot.y+0.2, currRot.z-0.098)
    });

    upperLegLRot.setKeys(keyFrames10);
    //upperLegLRot.setEasingFunction(bezierEase);
    upperLegL.animations.push(upperLegLRot);

    //upper_leg R
    const upperLegR = skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg R")];

    const upperLegRRot = new BABYLON.Animation("bossHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames11 = [];
    keyFrames11.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.105, currRot.y-0.2, currRot.z+0.098)
    });
    keyFrames11.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x-0.23, currRot.y-0.157, currRot.z+0.164)
    });
    keyFrames11.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x-0.23, currRot.y-0.157, currRot.z+0.164)
    });
    keyFrames11.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+1.011, currRot.y-0.19, currRot.z-0.108)
    });
    keyFrames11.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.105, currRot.y-0.2, currRot.z+0.098)
    });

    upperLegRRot.setKeys(keyFrames11);
    //upperLegRRot.setEasingFunction(bezierEase);
    upperLegR.animations.push(upperLegRRot);

    //lower_leg L
    const lowerLegL = skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg L")];

    const lowerLegLRot = new BABYLON.Animation("bossHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames12 = [];
    keyFrames12.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.131, currRot.y+0.003, currRot.z-0.007)
    });
    keyFrames12.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.094, currRot.y+0.0, currRot.z+0.003)
    });
    keyFrames12.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x+0.094, currRot.y+0.0, currRot.z+0.003)
    });
    keyFrames12.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.015, currRot.y-0.005, currRot.z+0.025)
    });
    keyFrames12.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.131, currRot.y+0.003, currRot.z-0.007)
    });

    lowerLegLRot.setKeys(keyFrames12);
    //lowerLegLRot.setEasingFunction(bezierEase);
    lowerLegL.animations.push(lowerLegLRot);

    //lower_leg R
    const lowerLegR = skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg R")];

    const lowerLegRRot = new BABYLON.Animation("bossHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames13 = [];
    keyFrames13.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.178, currRot.y-0.004, currRot.z+0.009)
    });
    keyFrames13.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.095, currRot.y+0.013, currRot.z-0.024)
    });
    keyFrames13.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x+0.095, currRot.y+0.013, currRot.z-0.024)
    });
    keyFrames13.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.092, currRot.y+0.003, currRot.z-0.015)
    });
    keyFrames13.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.178, currRot.y-0.004, currRot.z+0.009)
    });

    lowerLegRRot.setKeys(keyFrames13);
    //lowerLegRRot.setEasingFunction(bezierEase);
    lowerLegR.animations.push(lowerLegRRot);

    //foot L
    const footL = skeleton.bones[skeleton.getBoneIndexByName("foot L")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot L")];

    const footLRot = new BABYLON.Animation("bossHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames14 = [];
    keyFrames14.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.066, currRot.y-0.107, currRot.z+0.156)
    });
    keyFrames14.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.082, currRot.y-0.096, currRot.z+0.136)
    });
    keyFrames14.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x+0.082, currRot.y-0.096, currRot.z+0.136)
    });
    keyFrames14.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.157, currRot.y-0.112, currRot.z+0.168)
    });
    keyFrames14.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x-0.066, currRot.y-0.107, currRot.z+0.156)
    });

    footLRot.setKeys(keyFrames14);
    //footLRot.setEasingFunction(bezierEase);
    footL.animations.push(footLRot);

    //foot R
    const footR = skeleton.bones[skeleton.getBoneIndexByName("foot R")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot R")];

    const footRRot = new BABYLON.Animation("bossHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames15 = [];
    keyFrames15.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.058, currRot.y+0.0, currRot.z-0.148)
    });
    keyFrames15.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.284, currRot.y+0.017, currRot.z-0.106)
    });
    keyFrames15.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x+0.284, currRot.y+0.017, currRot.z-0.106)
    });
    keyFrames15.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.363, currRot.y-0.032, currRot.z-0.14)
    });
    keyFrames15.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x-0.058, currRot.y+0.0, currRot.z-0.148)
    });

    footRRot.setKeys(keyFrames15);
    //footRRot.setEasingFunction(bezierEase);
    footR.animations.push(footRRot);

    //cape
    const cape = skeleton.bones[skeleton.getBoneIndexByName("cape")];
    currRot = initialRot[skeleton.getBoneIndexByName("cape")];

    const capeRot = new BABYLON.Animation("bossHAttackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames16 = [];
    keyFrames16.push({
        frame: 0,
        value: currRot
    });
    keyFrames16.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y-0.2, currRot.z+0.0)
    });
    keyFrames16.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.5, currRot.y+0.6, currRot.z+0.0)
    });
    keyFrames16.push({
        frame: 2 * frameRate,
        value: currRot
    });

    capeRot.setKeys(keyFrames16);
    //capeRot.setEasingFunction(bezierEase);
    cape.animations.push(capeRot);
}
function groupBossHAttack(skeleton) {
    const bossHeavyAttackGroup = new BABYLON.AnimationGroup("bossHeavyAttackGroup");
    //bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")].animations[1], skeleton.bones[skeleton.getBoneIndexByName("main")]);
    bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[8], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[9], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    //bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder L")].animations[5], skeleton.bones[skeleton.getBoneIndexByName("shoulder L")]);
    bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder R")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("shoulder R")]);
    bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")]);
    bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")]);
    bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")]);
    bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")]);
    bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("palm R")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("palm R")]);
    bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")]);
    bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")]);
    bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")]);
    bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")]);
    bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot L")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("foot L")]);
    bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot R")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("foot R")]);
    bossHeavyAttackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("cape")].animations[2], skeleton.bones[skeleton.getBoneIndexByName("cape")]);

    return bossHeavyAttackGroup;
}

//Keyframes: 25=5/12fr; 35=7/12fr; 45=3/4fr; 55=11/12; 80=4/3fr; 110=11/6fr

//****REMINDER FOR BONES NAMES****
//main  chest  neck  head  
//shoulder L  upper_arm L  lower_arm L  palm L  thumb L  fingers L  upper_leg L  lower_leg L  foot L  
//shoulder R  upper_arm R  lower_arm R  palm R  thumb R  fingers R  upper_leg R  lower_leg R  foot R  
//sword  sheath(only for darkwraith)  cape(only for silver knight)