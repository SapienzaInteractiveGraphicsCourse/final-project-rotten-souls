function rotateLeft(skeleton, frameRate, initialPos, initialRot) {
    // Creating an easing function (same for thus entire group)
    //const bezierEase = new BABYLON.BezierCurveEase(0.25, -0.1, 0.75, 1.1);
    //const bezierEase = new BABYLON.SineEase();
    //bezierEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    
    //The easing function makes the animation go in spurts, so I removed it

    var currPos;
    var currRot;
    //ANIMATED PARAMETERS
    //main
    /*const main = skeleton.bones[skeleton.getBoneIndexByName("main")];
    currPos = skeleton.bones[skeleton.getBoneIndexByName("main")].position;
    const mainPos = new BABYLON.Animation("rotateLeftPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    const keyFrames0 = [];
    keyFrames0.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y+0.0, currPos.z+0.0)
    });
    keyFrames0.push({
        frame: 5 * frameRate/12,    //25 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.0, currPos.z-0.6)
    });
    keyFrames0.push({
        frame: 3 * frameRate/4,     //45 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.0, currPos.z-1.1)
    });
    keyFrames0.push({
        frame: 11 * frameRate/12,   //55 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.0, currPos.z-1.5)
    });
    keyFrames0.push({
        frame: 4 * frameRate/3,     //80 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.0, currPos.z-2.1)
    });
    keyFrames0.push({
        frame: 11 * frameRate/6,    //110 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.0, currPos.z-2.7)
    });

    mainPos.setKeys(keyFrames0);
    //mainPos.setEasingFunction(bezierEase);
    main.animations.push(mainPos);*/

    //chest
    const chest = skeleton.bones[skeleton.getBoneIndexByName("chest")];
    currPos = initialPos[skeleton.getBoneIndexByName("chest")];
    const chestPos = new BABYLON.Animation("rotateLeftPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames0 = [];
    keyFrames0.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.035, currPos.z+0.0)
    });
    keyFrames0.push({
        frame: 1 * frameRate/3,     //20 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.015, currPos.z+0.0)
    });
    keyFrames0.push({
        frame: 2 * frameRate/3,     //40 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.035, currPos.z+0.0)
    });

    chestPos.setKeys(keyFrames0);
    //chestPos.setEasingFunction(bezierEase);
    chest.animations.push(chestPos);

    currRot = initialRot[skeleton.getBoneIndexByName("chest")];
    const chestRot = new BABYLON.Animation("rotateLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames1 = [];
    keyFrames1.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.1, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames1.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.1, currRot.y+0.0, currRot.z+0.0)
    });

    chestRot.setKeys(keyFrames1);
    //chestRot.setEasingFunction(bezierEase);
    chest.animations.push(chestRot);

    //head
    /*const head = skeleton.bones[skeleton.getBoneIndexByName("head")];
    currRot = initialRot[skeleton.getBoneIndexByName("head")];

    const headRot = new BABYLON.Animation("rotateLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames2 = [];
    keyFrames2.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.3, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.3, currRot.y+0.0, currRot.z+0.0)
    });

    headRot.setKeys(keyFrames2);
    head.animations.push(headRot);

    //shoulder L
    const shoulderL = skeleton.bones[skeleton.getBoneIndexByName("shoulder L")];
    currRot = initialRot[skeleton.getBoneIndexByName("shoulder L")];

    const shoulderLRot = new BABYLON.Animation("rotateLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames3 = [];
    keyFrames3.push({
        frame: 0,
        value: currRot
    });
    keyFrames3.push({
        frame: 7 * frameRate/12,    //35 frame
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+0.0, currRot.z-0.1)
    });
    keyFrames3.push({
        frame: 11 * frameRate/12,
        value: currRot
    });
    keyFrames3.push({
        frame: 3 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+0.0, currRot.z-0.1)
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

    const shoulderRRot = new BABYLON.Animation("rotateLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames4 = [];
    keyFrames4.push({
        frame: 0,
        value: currRot
    });
    keyFrames4.push({
        frame: 7 * frameRate/12,    //35 frame
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+0.0, currRot.z+0.1)
    });
    keyFrames4.push({
        frame: 11 * frameRate/12,
        value: currRot
    });
    keyFrames4.push({
        frame: 3 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+0.0, currRot.z+0.1)
    });
    keyFrames4.push({
        frame: 11 * frameRate/6,
        value: currRot
    });

    shoulderRRot.setKeys(keyFrames4);
    //shoulderRRot.setEasingFunction(bezierEase);
    shoulderR.animations.push(shoulderRRot);*/

    //upper_arm L
    const upperArmL = skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm L")];

    const upperArmLRot = new BABYLON.Animation("rotateLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames5 = [];
    keyFrames5.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.171, currRot.y-0.147, currRot.z-1.037)
        //value: new BABYLON.Vector3(currRot.x+0.364, currRot.y-0.204, currRot.z-1.19)
    });
    keyFrames5.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.171, currRot.y-0.147, currRot.z-1.037)
        //value: new BABYLON.Vector3(currRot.x+0.364, currRot.y-0.204, currRot.z-1.19)
    });

    upperArmLRot.setKeys(keyFrames5);
    //upperArmLRot.setEasingFunction(bezierEase);
    upperArmL.animations.push(upperArmLRot);

    //upper_arm R
    const upperArmR = skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm R")];

    const upperArmRRot = new BABYLON.Animation("rotateLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames6 = [];
    keyFrames6.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.076, currRot.y-0.026, currRot.z+0.752)
    });
    keyFrames6.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.076, currRot.y-0.026, currRot.z+0.752)
    });

    upperArmRRot.setKeys(keyFrames6);
    //upperArmRRot.setEasingFunction(bezierEase);
    upperArmR.animations.push(upperArmRRot);

    //lower_arm L
    const lowerArmL = skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm L")];
    const lowerArmLRot = new BABYLON.Animation("rotateLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames7 = [];
    keyFrames7.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.286, currRot.y+0.392, currRot.z+0.021)
    });
    keyFrames7.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.286, currRot.y+0.392, currRot.z+0.021)
    });

    lowerArmLRot.setKeys(keyFrames7);
    //lowerArmLRot.setEasingFunction(bezierEase);
    lowerArmL.animations.push(lowerArmLRot);

    //lower_arm R
    const lowerArmR = skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm R")];

    const lowerArmRRot = new BABYLON.Animation("rotateLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames8 = [];
    keyFrames8.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.578, currRot.y-0.438, currRot.z+0.468)
    });
    keyFrames8.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.578, currRot.y-0.438, currRot.z+0.468)
    });

    lowerArmRRot.setKeys(keyFrames8);
    //lowerArmRRot.setEasingFunction(bezierEase);
    lowerArmR.animations.push(lowerArmRRot);

    //upper_leg L
    const upperLegL = skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg L")];

    const upperLegLRot = new BABYLON.Animation("rotateLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames9 = [];
    keyFrames9.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.209, currRot.y+0.33, currRot.z-0.194)
    });
    keyFrames9.push({
        frame: 1 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.378, currRot.y+0.382, currRot.z-0.236)
    });
    keyFrames9.push({
        frame: 1 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.205, currRot.y+0.343, currRot.z-0.355)
    });
    keyFrames9.push({
        frame: 1 * frameRate/2,     //30 frame
        value: new BABYLON.Vector3(currRot.x+0.362, currRot.y+0.327, currRot.z-0.114)
    });
    keyFrames9.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.209, currRot.y+0.33, currRot.z-0.194)
    });

    upperLegLRot.setKeys(keyFrames9);
    //upperLegLRot.setEasingFunction(bezierEase);
    upperLegL.animations.push(upperLegLRot);

    //upper_leg R
    const upperLegR = skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg R")];

    const upperLegRRot = new BABYLON.Animation("rotateLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames10 = [];
    keyFrames10.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.227, currRot.y-0.303, currRot.z+0.17)
    });
    keyFrames10.push({
        frame: 1 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.227, currRot.y-0.303, currRot.z+0.17)
    });
    keyFrames10.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.235, currRot.y-0.30, currRot.z+0.001)
    });
    keyFrames10.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.227, currRot.y-0.303, currRot.z+0.17)
    });

    upperLegRRot.setKeys(keyFrames10);
    //upperLegRRot.setEasingFunction(bezierEase);
    upperLegR.animations.push(upperLegRRot);

    //lower_leg L
    const lowerLegL = skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg L")];

    const lowerLegLRot = new BABYLON.Animation("rotateLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames11 = [];
    keyFrames11.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.204, currRot.y-0.034, currRot.z+0.06)
    });
    keyFrames11.push({
        frame: 1 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.302, currRot.y-0.063, currRot.z+0.098)
    });
    keyFrames11.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.42, currRot.y-0.055, currRot.z+0.101)
    });
    keyFrames11.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.204, currRot.y-0.034, currRot.z+0.06)
    });

    lowerLegLRot.setKeys(keyFrames11);
    //lowerLegLRot.setEasingFunction(bezierEase);
    lowerLegL.animations.push(lowerLegLRot);

    //lower_leg R
    const lowerLegR = skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg R")];

    const lowerLegRRot = new BABYLON.Animation("rotateLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames12 = [];
    keyFrames12.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.306, currRot.y+0.024, currRot.z-0.018)
    });
    keyFrames12.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.242, currRot.y+0.025, currRot.z-0.04)
    });
    keyFrames12.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.306, currRot.y+0.024, currRot.z-0.018)
    });

    lowerLegRRot.setKeys(keyFrames12);
    //lowerLegRRot.setEasingFunction(bezierEase);
    lowerLegR.animations.push(lowerLegRRot);

    //foot L
    const footL = skeleton.bones[skeleton.getBoneIndexByName("foot L")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot L")];

    const footLRot = new BABYLON.Animation("rotateLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames13 = [];
    keyFrames13.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.018, currRot.y+0.0, currRot.z+0.301)
    });
    keyFrames12.push({
        frame: 1 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.137, currRot.y+0.003, currRot.z+0.282)
    });
    keyFrames12.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x-0.021, currRot.y-0.006, currRot.z+0.3)
    });
    keyFrames13.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.018, currRot.y+0.0, currRot.z+0.301)
    });

    footLRot.setKeys(keyFrames13);
    //footLRot.setEasingFunction(bezierEase);
    footL.animations.push(footLRot);

    //foot R
    const footR = skeleton.bones[skeleton.getBoneIndexByName("foot R")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot R")];

    const footRRot = new BABYLON.Animation("rotateLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames14 = [];
    keyFrames14.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.12, currRot.y+0.0, currRot.z-0.3)
    });
    keyFrames12.push({
        frame: 1 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.018, currRot.y-0.019, currRot.z-0.307)
    });
    keyFrames12.push({
        frame: 1 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.038, currRot.y-0.011, currRot.z-0.289)
    });
    keyFrames14.push({
        frame: 2 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.12, currRot.y+0.0, currRot.z-0.3)
    });

    footRRot.setKeys(keyFrames14);
    //footRRot.setEasingFunction(bezierEase);
    footR.animations.push(footRRot);
}
function groupRotateLeft(skeleton) {
    const rotateLeftGroup = new BABYLON.AnimationGroup("rotateLeftGroup");
    //rotateLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("main")]);
    rotateLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[12], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    rotateLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[13], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    //rotateLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("head")].animations[1], skeleton.bones[skeleton.getBoneIndexByName("head")]);
    //rotateLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder L")].animations[3], skeleton.bones[skeleton.getBoneIndexByName("shoulder L")]);
    //rotateLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder R")].animations[3], skeleton.bones[skeleton.getBoneIndexByName("shoulder R")]);
    rotateLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")].animations[6], skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")]);
    rotateLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")].animations[6], skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")]);
    rotateLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")].animations[6], skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")]);
    rotateLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")].animations[6], skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")]);
    rotateLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[6], skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")]);
    rotateLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")].animations[6], skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")]);
    rotateLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")].animations[6], skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")]);
    rotateLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")].animations[6], skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")]);
    rotateLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot L")].animations[6], skeleton.bones[skeleton.getBoneIndexByName("foot L")]);
    rotateLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot R")].animations[6], skeleton.bones[skeleton.getBoneIndexByName("foot R")]);

    return rotateLeftGroup;
}

//Keyframes: 25=5/12fr; 35=7/12fr; 45=3/4fr; 55=11/12; 80=4/3fr; 110=11/6fr

//****REMINDER FOR BONES NAMES****
//main  chest  neck  head  
//shoulder L  upper_arm L  lower_arm L  palm L  thumb L  fingers L  upper_leg L  lower_leg L  foot L  
//shoulder R  upper_arm R  lower_arm R  palm R  thumb R  fingers R  upper_leg R  lower_leg R  foot R  
//sword  sheath(only for darkwraith)  cape(only for silver knight)

//ROTAZIONI DA BLENDER:
//upper_leg L --> invertire segni di x e y
//lower_leg L e lower_leg R --> non cambiare nulla (ma senso opposto a upper_leg)