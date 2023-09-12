//****REMINDER FOR INDICES****
//PLAYER
//0 (and 1 for chest): idle
//1: walk forward
//2: walk back
//3: walk left
//4: walk right
//5: light attack
//6: heavy attack
//7: dodge forward
//8: dodge left
//9: dodge back
//10: dodge right
//11: player death
//BOSS
//1: idle
//2: walk forward
//3: walk left
//4: walk back
//5: walk right
//6: attack
//7: secondary attack
//8: boss death

//le rotazione e le posizioni sono locali quindi non devo preoccuparmi della somma degli angoli o spostamenti
function bossIdleAnimation(skeleton, frameRate, initialPos, initialRot) {
    // Creating an easing function (same for thus entire group)
    //const bezierEase = new BABYLON.BezierCurveEase(0.2, 0.0, 0.8, 1.0);
    const sineEase = new BABYLON.SineEase();
    //bezierEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    sineEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

    var currPos;
    var currRot;
    //ANIMATED PARAMETERS
    //chest
    const chest = skeleton.bones[skeleton.getBoneIndexByName("chest")];
    currPos = initialPos[skeleton.getBoneIndexByName("chest")];
    const chestPos = new BABYLON.Animation("idlePos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
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
    chestPos.setEasingFunction(sineEase);
    chest.animations.push(chestPos);

    currRot = initialRot[skeleton.getBoneIndexByName("chest")];
    const chestRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames2 = [];
    keyFrames2.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: frameRate,
        value: new BABYLON.Vector3(currRot.x-0.055, currRot.y+0.0, currRot.z+0.0)
        //value: new BABYLON.Vector3(currRot.x+0.055, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+0.0, currRot.z+0.0)
    });

    chestRot.setKeys(keyFrames2);
    chestRot.setEasingFunction(sineEase);
    chest.animations.push(chestRot);

    //shoulder L
    const shoulderL = skeleton.bones[skeleton.getBoneIndexByName("shoulder L")];
    currRot = initialRot[skeleton.getBoneIndexByName("shoulder L")];

    const shoulderLRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames3 = [];
    keyFrames3.push({
        frame: 0,
        value: currRot
    });
    keyFrames3.push({
        frame: frameRate,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+0.0, currRot.z+0.03)
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

    const shoulderRRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames4 = [];
    keyFrames4.push({
        frame: 0,
        value: currRot
    });
    keyFrames4.push({
        frame: frameRate,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+0.0, currRot.z-0.03)
    });
    keyFrames4.push({
        frame: 2 * frameRate,
        value: currRot
    });

    shoulderRRot.setKeys(keyFrames4);
    shoulderRRot.setEasingFunction(sineEase);
    shoulderR.animations.push(shoulderRRot);

    //head
    /*const head = skeleton.bones[skeleton.getBoneIndexByName("head")];
    currRot = initialRot[skeleton.getBoneIndexByName("head")];

    const headRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames5 = [];
    keyFrames5.push({
        frame: 0,
        value: currRot
    });
    keyFrames5.push({
        frame: frameRate,
        value: new BABYLON.Vector3(currRot.x+0.152, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames5.push({
        frame: 2 * frameRate,
        value: currRot
    });

    headRot.setKeys(keyFrames5);
    headRot.setEasingFunction(sineEase);
    head.animations.push(headRot);*/

    const head = skeleton.bones[skeleton.getBoneIndexByName("head")];
    //currRot = initialRot[skeleton.getBoneIndexByName("head")];

    //I had to manually adjust the head because the boneLookController messed up with the death animation
    const headRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames5 = [];
    keyFrames5.push({
        frame: 0,
        value: new BABYLON.Vector3(-Math.PI-0.3, -Math.PI, 0.0)
    });
    keyFrames5.push({
        frame: frameRate,
        value: new BABYLON.Vector3(-Math.PI-0.452, -Math.PI, 0.0)
    });
    keyFrames5.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(-Math.PI-0.3, -Math.PI, 0.0)
    });

    headRot.setKeys(keyFrames5);
    head.animations.push(headRot);

    //upper_leg L
    const upperLegL = skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg L")];

    const upperLegLRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames6 = [];
    keyFrames6.push({
        frame: 0,
        //value: new BABYLON.Vector3(currRot.x-0.206, currRot.y-0.347, currRot.z-0.1785)
        value: new BABYLON.Vector3(currRot.x+0.22, currRot.y+0.347, currRot.z-0.1785)
        //value: new BABYLON.Vector3(currRot.x-0.206, currRot.y+0.347, currRot.z+0.1785)
    });
    keyFrames6.push({
        frame: frameRate,
        //value: new BABYLON.Vector3(currRot.x-0.144, currRot.y-0.347, currRot.z-0.198)
        value: new BABYLON.Vector3(currRot.x+0.144, currRot.y+0.347, currRot.z-0.198)
        //value: new BABYLON.Vector3(currRot.x-0.144, currRot.y+0.347, currRot.z+0.198)
    });
    keyFrames6.push({
        frame: 2 * frameRate,
        //value: new BABYLON.Vector3(currRot.x-0.206, currRot.y-0.347, currRot.z-0.1785)
        value: new BABYLON.Vector3(currRot.x+0.22, currRot.y+0.347, currRot.z-0.1785)
        //value: new BABYLON.Vector3(currRot.x-0.206, currRot.y+0.347, currRot.z+0.1785)
    });

    upperLegLRot.setKeys(keyFrames6);
    upperLegLRot.setEasingFunction(sineEase);
    upperLegL.animations.push(upperLegLRot);

    //upper_leg R
    const upperLegR = skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg R")];

    const upperLegRRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames7 = [];
    keyFrames7.push({
        frame: 0,
        //value: new BABYLON.Vector3(currRot.x-0.206, currRot.y+0.347, currRot.z+0.1785)
        value: new BABYLON.Vector3(currRot.x+0.22, currRot.y-0.347, currRot.z+0.1785)
        //value: new BABYLON.Vector3(currRot.x-0.206, currRot.y-0.347, currRot.z-0.1785)
    });
    keyFrames7.push({
        frame: frameRate,
        //value: new BABYLON.Vector3(currRot.x-0.144, currRot.y+0.347, currRot.z+0.198)
        value: new BABYLON.Vector3(currRot.x+0.144, currRot.y-0.347, currRot.z+0.198)
        //value: new BABYLON.Vector3(currRot.x-0.144, currRot.y-0.347, currRot.z-0.198)
    });
    keyFrames7.push({
        frame: 2 * frameRate,
        //value: new BABYLON.Vector3(currRot.x-0.206, currRot.y+0.347, currRot.z+0.1785)
        value: new BABYLON.Vector3(currRot.x+0.22, currRot.y-0.347, currRot.z+0.1785)
        //value: new BABYLON.Vector3(currRot.x-0.206, currRot.y-0.347, currRot.z-0.1785)
    });

    upperLegRRot.setKeys(keyFrames7);
    upperLegRRot.setEasingFunction(sineEase);
    upperLegR.animations.push(upperLegRRot);

    //STATIC PARAMETERS (BUT DIFFERENT FROM DEAFULT T-POSE)
    //upper_arm L
    const upperArmL = skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm L")];

    const upperArmLRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames8 = [];
    keyFrames8.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.164, currRot.y+0.245, currRot.z-1.23)
        //value: new BABYLON.Vector3(currRot.x+0.164, currRot.y-0.045, currRot.z-1.03)
    });
    keyFrames8.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x-0.164, currRot.y+0.245, currRot.z-1.23)
        //value: new BABYLON.Vector3(currRot.x+0.164, currRot.y-0.045, currRot.z-1.03)
    });

    upperArmLRot.setKeys(keyFrames8);
    upperArmLRot.setEasingFunction(sineEase);
    upperArmL.animations.push(upperArmLRot);

    //upper_arm R
    const upperArmR = skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm R")];

    const upperArmRRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames9 = [];
    keyFrames9.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.076, currRot.y-0.426, currRot.z+1.182)
        //value: new BABYLON.Vector3(currRot.x+0.076, currRot.y+0.026, currRot.z+1.052)
    });
    keyFrames9.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x-0.076, currRot.y-0.426, currRot.z+1.182)
        //value: new BABYLON.Vector3(currRot.x+0.076, currRot.y+0.026, currRot.z+1.052)
    });

    upperArmRRot.setKeys(keyFrames9);
    upperArmRRot.setEasingFunction(sineEase);
    upperArmR.animations.push(upperArmRRot);

    //lower_arm L
    const lowerArmL = skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm L")];
    
    const lowerArmLRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames10 = [];
    keyFrames10.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.35, currRot.y+0.392, currRot.z+0.05)
        //value: new BABYLON.Vector3(currRot.x-0.35, currRot.y-0.392, currRot.z+0.05)
    });
    keyFrames10.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.35, currRot.y+0.392, currRot.z+0.05)
        //value: new BABYLON.Vector3(currRot.x-0.35, currRot.y-0.392, currRot.z+0.05)
    });

    lowerArmLRot.setKeys(keyFrames10);
    lowerArmLRot.setEasingFunction(sineEase);
    lowerArmL.animations.push(lowerArmLRot);

    //lower_arm R
    const lowerArmR = skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm R")];

    const lowerArmRRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames11 = [];
    keyFrames11.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.34, currRot.y-0.146, currRot.z-0.022)
        //value: new BABYLON.Vector3(currRot.x-0.34, currRot.y+0.146, currRot.z-0.022)
    });
    keyFrames11.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.34, currRot.y-0.146, currRot.z-0.022)
        //value: new BABYLON.Vector3(currRot.x-0.34, currRot.y+0.146, currRot.z-0.022)
    });

    lowerArmRRot.setKeys(keyFrames11);
    lowerArmRRot.setEasingFunction(sineEase);
    lowerArmR.animations.push(lowerArmRRot);

    //palm R
    const palmR = skeleton.bones[skeleton.getBoneIndexByName("palm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("palm R")];

    const palmRRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames16 = [];
    keyFrames16.push({
        frame: 0,
        value: new BABYLON.Vector3(0.0, 0.8, 0.0)
    });
    keyFrames16.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(0.0, 0.8, 0.0)
    });

    palmRRot.setKeys(keyFrames16);
    //palmRRot.setEasingFunction(bezierEase);
    palmR.animations.push(palmRRot);

    //lower_leg L
    const lowerLegL = skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg L")];

    const lowerLegLRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames12 = [];
    keyFrames12.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.38, currRot.y+0.0, currRot.z+0.0)
        //value: new BABYLON.Vector3(currRot.x-0.38, currRot.y-0.0, currRot.z+0.0)
    });
    keyFrames12.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.38, currRot.y+0.0, currRot.z+0.0)
        //value: new BABYLON.Vector3(currRot.x-0.38, currRot.y-0.0, currRot.z+0.0)
    });

    lowerLegLRot.setKeys(keyFrames12);
    lowerLegLRot.setEasingFunction(sineEase);
    lowerLegL.animations.push(lowerLegLRot);

    //lower_leg R
    const lowerLegR = skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg R")];

    const lowerLegRRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames13 = [];
    keyFrames13.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.38, currRot.y+0.0, currRot.z+0.0)
        //value: new BABYLON.Vector3(currRot.x-0.38, currRot.y-0.0, currRot.z+0.0)
    });
    keyFrames13.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x+0.38, currRot.y+0.0, currRot.z+0.0)
        //value: new BABYLON.Vector3(currRot.x-0.38, currRot.y-0.0, currRot.z+0.0)
    });

    lowerLegRRot.setKeys(keyFrames13);
    lowerLegRRot.setEasingFunction(sineEase);
    lowerLegR.animations.push(lowerLegRRot);

    //foot L
    const footL = skeleton.bones[skeleton.getBoneIndexByName("foot L")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot L")];

    const footLRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames14 = [];
    keyFrames14.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.16, currRot.y+0.0, currRot.z+0.3)
        //value: new BABYLON.Vector3(currRot.x+0.08, currRot.y-0.0, currRot.z+0.3)
    });
    keyFrames14.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x-0.16, currRot.y+0.0, currRot.z+0.3)
        //value: new BABYLON.Vector3(currRot.x+0.08, currRot.y-0.0, currRot.z+0.3)
    });

    footLRot.setKeys(keyFrames14);
    footLRot.setEasingFunction(sineEase);
    footL.animations.push(footLRot);

    //foot R
    const footR = skeleton.bones[skeleton.getBoneIndexByName("foot R")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot R")];

    const footRRot = new BABYLON.Animation("idleRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames15 = [];
    keyFrames15.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.16, currRot.y+0.0, currRot.z-0.3)
        //value: new BABYLON.Vector3(currRot.x+0.08, currRot.y-0.0, currRot.z-0.3)
    });
    keyFrames15.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x-0.16, currRot.y+0.0, currRot.z-0.3)
        //value: new BABYLON.Vector3(currRot.x+0.08, currRot.y-0.0, currRot.z-0.3)
    });

    footRRot.setKeys(keyFrames15);
    footRRot.setEasingFunction(sineEase);
    footR.animations.push(footRRot);
}
function groupBossIdle(skeleton) {
    const bossIdleGroup = new BABYLON.AnimationGroup("bossIdleGroup");
    bossIdleGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    bossIdleGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[1], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    bossIdleGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder L")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("shoulder L")]);
    bossIdleGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder R")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("shoulder R")]);
    bossIdleGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("head")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("head")]);
    bossIdleGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")]);
    bossIdleGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")]);
    bossIdleGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")]);
    bossIdleGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")]);
    bossIdleGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")]);
    bossIdleGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")]);
    bossIdleGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("palm R")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("palm R")]);
    bossIdleGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")]);
    bossIdleGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")]);
    bossIdleGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot L")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("foot L")]);
    bossIdleGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot R")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("foot R")]);

    return bossIdleGroup;
}

//Keyframes: 25=5/12fr; 35=7/12fr; 45=3/4fr; 55=11/12; 80=4/3fr; 110=11/6fr

//****REMINDER FOR BONES NAMES****
//main  chest  neck  head  
//shoulder L  upper_arm L  lower_arm L  palm L  thumb L  fingers L  upper_leg L  lower_leg L  foot L  
//shoulder R  upper_arm R  lower_arm R  palm R  thumb R  fingers R  upper_leg R  lower_leg R  foot R  
//sword  sheath(only for darkwraith)  cape(only for silver knight)

//INVERTIRE SEGNO ROTAZIONI SU X E Y