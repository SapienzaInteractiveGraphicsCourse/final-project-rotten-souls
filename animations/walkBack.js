function walkBack(skeleton, frameRate, initialPos, initialRot) {
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
    const mainPos = new BABYLON.Animation("walkBackPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    const keyFrames0 = [];
    keyFrames0.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y+0.0, currPos.z+0.0)
    });
    keyFrames0.push({
        frame: 5 * frameRate/12,    //25 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.0, currPos.z+0.6)
    });
    keyFrames0.push({
        frame: 3 * frameRate/4,     //45 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.0, currPos.z+1.1)
    });
    keyFrames0.push({
        frame: 11 * frameRate/12,   //55 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.0, currPos.z+1.5)
    });
    keyFrames0.push({
        frame: 4 * frameRate/3,     //80 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.0, currPos.z+2.1)
    });
    keyFrames0.push({
        frame: 11 * frameRate/6,    //110 frame
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.0, currPos.z+2.7)
    });

    mainPos.setKeys(keyFrames0);
    //mainPos.setEasingFunction(bezierEase);
    main.animations.push(mainPos);*/

    //chest
    const chest = skeleton.bones[skeleton.getBoneIndexByName("chest")];
    currPos = initialPos[skeleton.getBoneIndexByName("chest")];
    const chestPos = new BABYLON.Animation("walkBackPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames1 = [];
    keyFrames1.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.025, currPos.z+0.0)
    });
    keyFrames1.push({
        frame: 5 * frameRate/12,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.135, currPos.z+0.0)
    });
    keyFrames1.push({
        frame: 11 * frameRate/12,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y+0.035, currPos.z+0.0)
    });
    keyFrames1.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.135, currPos.z+0.0)
    });
    keyFrames1.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.025, currPos.z+0.0)
    });

    chestPos.setKeys(keyFrames1);
    //chestPos.setEasingFunction(bezierEase);
    chest.animations.push(chestPos);

    currRot = initialRot[skeleton.getBoneIndexByName("chest")];
    const chestRot = new BABYLON.Animation("walkBackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames2 = [];
    keyFrames2.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.047, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 5 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.1, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 11 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.02, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.208, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames2.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.047, currRot.y+0.0, currRot.z+0.0)
    });

    chestRot.setKeys(keyFrames2);
    //chestRot.setEasingFunction(bezierEase);
    chest.animations.push(chestRot);

    //shoulder L
    const shoulderL = skeleton.bones[skeleton.getBoneIndexByName("shoulder L")];
    currRot = initialRot[skeleton.getBoneIndexByName("shoulder L")];

    const shoulderLRot = new BABYLON.Animation("walkBackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
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

    const shoulderRRot = new BABYLON.Animation("walkBackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
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
    shoulderR.animations.push(shoulderRRot);

    //head
    /*const head = skeleton.bones[skeleton.getBoneIndexByName("head")];
    currRot = initialRot[skeleton.getBoneIndexByName("head")];

    const headRot = new BABYLON.Animation("headRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
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

    //DA QUI IN SOTTO HO INVERTITO X CON Y (E I LORO SEGNI SONO OPPOSTI GIà DA chest) RISPETTO AI VALORI DI BLENDER
    //upper_arm L
    const upperArmL = skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm L")];

    const upperArmLRot = new BABYLON.Animation("walkBackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames5 = [];
    keyFrames5.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.204, currRot.y+0.364, currRot.z-1.09)
        //value: new BABYLON.Vector3(currRot.x+0.364, currRot.y-0.204, currRot.z-1.19)
    });
    keyFrames5.push({
        frame: 5 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x-0.35, currRot.y+0.773, currRot.z-0.822)
        //value: new BABYLON.Vector3(currRot.x+0.773, currRot.y-0.35, currRot.z-1.322)
    });
    keyFrames5.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.003, currRot.y-0.48, currRot.z-0.97)
        //value: new BABYLON.Vector3(currRot.x-0.48, currRot.y+0.003, currRot.z-1.17)
    });
    keyFrames5.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.204, currRot.y+0.364, currRot.z-1.09)
        //value: new BABYLON.Vector3(currRot.x+0.364, currRot.y-0.204, currRot.z-1.19)
    });

    upperArmLRot.setKeys(keyFrames5);
    //upperArmLRot.setEasingFunction(bezierEase);
    upperArmL.animations.push(upperArmLRot);

    //upper_arm R
    const upperArmR = skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm R")];

    const upperArmRRot = new BABYLON.Animation("walkBackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames6 = [];
    keyFrames6.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.026, currRot.y-0.076, currRot.z+1.052)
    });
    keyFrames6.push({
        frame: 5 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.156, currRot.y+0.62, currRot.z+1.10)
    });
    keyFrames6.push({
        frame: 11 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.1, currRot.y+0.0, currRot.z+1.08)
    });
    keyFrames6.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.456, currRot.y-0.38, currRot.z+1.06)
    });
    keyFrames6.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.026, currRot.y-0.076, currRot.z+1.052)
    });

    upperArmRRot.setKeys(keyFrames6);
    //upperArmRRot.setEasingFunction(bezierEase);
    upperArmR.animations.push(upperArmRRot);

    //lower_arm L
    const lowerArmL = skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm L")];
    const lowerArmLRot = new BABYLON.Animation("walkBackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames7 = [];
    keyFrames7.push({
        frame: 0,
        //value: new BABYLON.Vector3(currRot.x-0.392, currRot.y-0.286, currRot.z+0.021)
        value: new BABYLON.Vector3(currRot.x+0.392, currRot.y+0.286, currRot.z-0.221)
    });
    keyFrames7.push({
        frame: 5 * frameRate/12,
        //value: new BABYLON.Vector3(currRot.x-0.125, currRot.y-0.795, currRot.z+0.186)
        value: new BABYLON.Vector3(currRot.x+0.625, currRot.y+0.795, currRot.z+0.186)
    });
    keyFrames7.push({
        frame: 11 * frameRate/6,
        //value: new BABYLON.Vector3(currRot.x-0.392, currRot.y-0.286, currRot.z+0.021)
        value: new BABYLON.Vector3(currRot.x+0.492, currRot.y+0.286, currRot.z-0.221)
    });

    lowerArmLRot.setKeys(keyFrames7);
    //lowerArmLRot.setEasingFunction(bezierEase);
    lowerArmL.animations.push(lowerArmLRot);

    //lower_arm R
    const lowerArmR = skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm R")];

    const lowerArmRRot = new BABYLON.Animation("walkBackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames8 = [];
    keyFrames8.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.238, currRot.y-0.578, currRot.z+0.168)
    });
    keyFrames8.push({
        frame: 5 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.675, currRot.y-0.81, currRot.z+0.388)
    });
    keyFrames8.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.101, currRot.y-0.578, currRot.z+0.016)
    });
    keyFrames8.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.238, currRot.y-0.578, currRot.z+0.168)
    });

    lowerArmRRot.setKeys(keyFrames8);
    //lowerArmRRot.setEasingFunction(bezierEase);
    lowerArmR.animations.push(lowerArmRRot);

    //upper_leg L
    const upperLegL = skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg L")];

    const upperLegLRot = new BABYLON.Animation("walkBackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames9 = [];
    keyFrames9.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.152, currRot.y+0.354, currRot.z+0.11)
    });
    keyFrames9.push({
        frame: 5 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x-0.69, currRot.y+0.3, currRot.z-0.199)
    });
    keyFrames9.push({
        frame: 11 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.157, currRot.y+0.278, currRot.z-0.053)
    });
    keyFrames9.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.77, currRot.y+0.198, currRot.z+0.205)
    });
    keyFrames9.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.152, currRot.y+0.354, currRot.z+0.11)
    });

    upperLegLRot.setKeys(keyFrames9);
    //upperLegLRot.setEasingFunction(bezierEase);
    upperLegL.animations.push(upperLegLRot);

    //upper_leg R
    const upperLegR = skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg R")];

    const upperLegRRot = new BABYLON.Animation("walkBackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames10 = [];
    keyFrames10.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.152, currRot.y+0.154, currRot.z-0.11)
    });
    keyFrames10.push({
        frame: 5 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.764, currRot.y+0.131, currRot.z+0.187)
    });
    keyFrames10.push({
        frame: 11 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.29, currRot.y+0.21, currRot.z+0.088)
    });
    keyFrames10.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-0.69, currRot.y+0.126, currRot.z-0.205)
    });
    keyFrames10.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.152, currRot.y+0.154, currRot.z-0.11)
    });

    upperLegRRot.setKeys(keyFrames10);
    //upperLegRRot.setEasingFunction(bezierEase);
    upperLegR.animations.push(upperLegRRot);

    //lower_leg L
    const lowerLegL = skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg L")];

    const lowerLegLRot = new BABYLON.Animation("walkBackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames11 = [];
    keyFrames11.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.38, currRot.y-0.0, currRot.z-0.15)
    });
    keyFrames11.push({
        frame: 5 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.857, currRot.y+0.048, currRot.z-0.15)
    });
    keyFrames11.push({
        frame: 7 * frameRate/6,     //70 frame
        value: new BABYLON.Vector3(currRot.x+0.563, currRot.y-0.0, currRot.z-0.15)
    });
    keyFrames11.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.013, currRot.y-0.0, currRot.z-0.15)
    });
    keyFrames11.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.38, currRot.y-0.0, currRot.z-0.15)
    });

    lowerLegLRot.setKeys(keyFrames11);
    //lowerLegLRot.setEasingFunction(bezierEase);
    lowerLegL.animations.push(lowerLegLRot);

    //lower_leg R
    const lowerLegR = skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg R")];

    const lowerLegRRot = new BABYLON.Animation("walkBackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames12 = [];
    keyFrames12.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.323, currRot.y+0.065, currRot.z+0.05)
    });
    keyFrames12.push({
        frame: 5 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.062, currRot.y+0.182, currRot.z-0.05)
    });
    keyFrames12.push({
        frame: 7 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.12, currRot.y+0.192, currRot.z-0.05)
    });
    keyFrames12.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.813, currRot.y+0.104, currRot.z+0.05)
    });
    keyFrames12.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.323, currRot.y+0.065, currRot.z+0.05)
    });

    lowerLegRRot.setKeys(keyFrames12);
    //lowerLegRRot.setEasingFunction(bezierEase);
    lowerLegR.animations.push(lowerLegRRot);

    //foot L
    const footL = skeleton.bones[skeleton.getBoneIndexByName("foot L")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot L")];

    const footLRot = new BABYLON.Animation("walkBackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames13 = [];
    keyFrames13.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.28, currRot.y-0.0, currRot.z+0.3)
    });
    keyFrames13.push({
        frame: 5 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.616, currRot.y+0.137, currRot.z+0.244)
    });
    keyFrames13.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x-0.359, currRot.y+0.116, currRot.z+0.127)
    });
    keyFrames13.push({
        frame: 11 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.134, currRot.y+0.038, currRot.z+0.248)
    });
    keyFrames13.push({
        frame: 7 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.245, currRot.y+0.04, currRot.z+0.261)
    });
    keyFrames13.push({
        frame: 19 * frameRate/12,   //95 frame
        value: new BABYLON.Vector3(currRot.x+0.245, currRot.y+0.04, currRot.z+0.261)
    });
    keyFrames13.push({
        frame: 5 * frameRate/3,     //100 frame
        value: new BABYLON.Vector3(currRot.x-0.088, currRot.y+0.021, currRot.z+0.248)
    });
    keyFrames13.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.28, currRot.y-0.0, currRot.z+0.3)
    });

    footLRot.setKeys(keyFrames13);
    //footLRot.setEasingFunction(bezierEase);
    footL.animations.push(footLRot);

    //foot R
    const footR = skeleton.bones[skeleton.getBoneIndexByName("foot R")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot R")];

    const footRRot = new BABYLON.Animation("walkBackRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames14 = [];
    keyFrames14.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.036, currRot.y+0.11, currRot.z-0.03)
    });
    keyFrames14.push({
        frame: 5 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.118, currRot.y+0.193, currRot.z-0.083)
    });
    keyFrames14.push({
        frame: 7 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.024, currRot.y+0.189, currRot.z-0.102)
    });
    keyFrames14.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x-0.036, currRot.y+0.182, currRot.z-0.115)
    });
    keyFrames14.push({
        frame: 11 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.17, currRot.y+0.193, currRot.z-0.075)
    });
    keyFrames14.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.368, currRot.y+0.154, currRot.z-0.075)
    });
    keyFrames14.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.036, currRot.y+0.11, currRot.z-0.03)
    });

    footRRot.setKeys(keyFrames14);
    //footRRot.setEasingFunction(bezierEase);
    footR.animations.push(footRRot);
}
function groupWalkBack(skeleton) {
    const walkBackGroup = new BABYLON.AnimationGroup("walkBackGroup");
    //walkBackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")].animations[1], skeleton.bones[skeleton.getBoneIndexByName("main")]);
    walkBackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    walkBackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[5], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    walkBackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder L")].animations[2], skeleton.bones[skeleton.getBoneIndexByName("shoulder L")]);
    walkBackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder R")].animations[2], skeleton.bones[skeleton.getBoneIndexByName("shoulder R")]);
    walkBackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")].animations[2], skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")]);
    walkBackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")].animations[2], skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")]);
    walkBackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")].animations[2], skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")]);
    walkBackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")].animations[2], skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")]);
    walkBackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[2], skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")]);
    walkBackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")].animations[2], skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")]);
    walkBackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")].animations[2], skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")]);
    walkBackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")].animations[2], skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")]);
    walkBackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot L")].animations[2], skeleton.bones[skeleton.getBoneIndexByName("foot L")]);
    walkBackGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot R")].animations[2], skeleton.bones[skeleton.getBoneIndexByName("foot R")]);

    return walkBackGroup;
}

//Keyframes: 25=5/12fr; 35=7/12fr; 45=3/4fr; 55=11/12; 80=4/3fr; 110=11/6fr

//****REMINDER FOR BONES NAMES****
//main  chest  neck  head  
//shoulder L  upper_arm L  lower_arm L  palm L  thumb L  fingers L  upper_leg L  lower_leg L  foot L  
//shoulder R  upper_arm R  lower_arm R  palm R  thumb R  fingers R  upper_leg R  lower_leg R  foot R  
//sword  sheath(only for darkwraith)  cape(only for silver knight)