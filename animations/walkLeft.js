//****REMINDER FOR INDICES****
//VANNO SEPARATE ROTAZIONI DA POSIZIONI
//PLAYER
//0 (and 1 for chest): idle
//1: walk forward
//2: walk back
//3: walk right
//4: walk left
//5: light attack
//6: heavy attack
//7: dodge forward
//8: dodge back
//9: dodge right
//10: dodge left
//11: player death
//BOSS
//1: idle
//2: walk forward
//3: walk back
//4: walk right
//5: walk left
//6: attack
//7: secondary attack
//8: boss death

function walkLeft(skeleton, frameRate, initialPos, initialRot) {
    //The easing function makes the animation go in spurts, so I removed it

    var currPos;
    var currRot;
    //ANIMATED PARAMETERS
    //main
    /*const main = skeleton.bones[skeleton.getBoneIndexByName("main")];
    currPos = skeleton.bones[skeleton.getBoneIndexByName("main")].position;
    const mainPos = new BABYLON.Animation("walkLeftPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
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
    const chestPos = new BABYLON.Animation("walkLeftPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames0 = [];
    keyFrames0.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.065, currPos.z+0.0)
    });
    keyFrames0.push({
        frame: 5 * frameRate/12,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.085, currPos.z+0.0)
    });
    keyFrames0.push({
        frame: 11 * frameRate/12,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.065, currPos.z+0.0)
    });
    keyFrames0.push({
        frame: 3 * frameRate/2,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.085, currPos.z+0.0)
    });
    keyFrames0.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y-0.065, currPos.z+0.0)
    });

    chestPos.setKeys(keyFrames0);
    //chestPos.setEasingFunction(bezierEase);
    chest.animations.push(chestPos);

    currRot = initialRot[skeleton.getBoneIndexByName("chest")];
    const chestRot = new BABYLON.Animation("walkLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames1 = [];
    keyFrames1.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.3, currRot.y+0.0, currRot.z-0.1)
    });
    keyFrames1.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.3, currRot.y+0.0, currRot.z-0.1)
    });

    chestRot.setKeys(keyFrames1);
    //chestRot.setEasingFunction(bezierEase);
    chest.animations.push(chestRot);

    //head
    const head = skeleton.bones[skeleton.getBoneIndexByName("head")];
    currRot = initialRot[skeleton.getBoneIndexByName("head")];

    const headRot = new BABYLON.Animation("walkLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
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

    const shoulderLRot = new BABYLON.Animation("walkLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
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

    const shoulderRRot = new BABYLON.Animation("walkLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
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
    shoulderR.animations.push(shoulderRRot);

    //upper_arm L
    const upperArmL = skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm L")];

    const upperArmLRot = new BABYLON.Animation("walkLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames5 = [];
    keyFrames5.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.171, currRot.y-0.147, currRot.z-1.037)
        //value: new BABYLON.Vector3(currRot.x+0.364, currRot.y-0.204, currRot.z-1.19)
    });
    keyFrames5.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.171, currRot.y-0.147, currRot.z-1.037)
        //value: new BABYLON.Vector3(currRot.x+0.364, currRot.y-0.204, currRot.z-1.19)
    });

    upperArmLRot.setKeys(keyFrames5);
    //upperArmLRot.setEasingFunction(bezierEase);
    upperArmL.animations.push(upperArmLRot);

    //upper_arm R
    const upperArmR = skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_arm R")];

    const upperArmRRot = new BABYLON.Animation("walkLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames6 = [];
    keyFrames6.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.076, currRot.y-0.026, currRot.z+0.752)
    });
    keyFrames6.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.076, currRot.y-0.026, currRot.z+0.752)
    });

    upperArmRRot.setKeys(keyFrames6);
    //upperArmRRot.setEasingFunction(bezierEase);
    upperArmR.animations.push(upperArmRRot);

    //lower_arm L
    const lowerArmL = skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm L")];
    const lowerArmLRot = new BABYLON.Animation("walkLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames7 = [];
    keyFrames7.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.286, currRot.y+0.392, currRot.z+0.021)
    });
    keyFrames7.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.286, currRot.y+0.392, currRot.z+0.021)
    });

    lowerArmLRot.setKeys(keyFrames7);
    //lowerArmLRot.setEasingFunction(bezierEase);
    lowerArmL.animations.push(lowerArmLRot);

    //lower_arm R
    const lowerArmR = skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_arm R")];

    const lowerArmRRot = new BABYLON.Animation("walkLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
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

    //upper_leg L
    const upperLegL = skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg L")];

    const upperLegLRot = new BABYLON.Animation("walkLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames9 = [];
    keyFrames9.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.7, currRot.y+0.366, currRot.z-0.09)
    });
    keyFrames9.push({
        frame: 5 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.013, currRot.y+0.213, currRot.z+0.15)
    });
    keyFrames9.push({
        frame: 3 * frameRate/4,     //45 frame
        value: new BABYLON.Vector3(currRot.x-0.094, currRot.y+0.256, currRot.z+0.087)
    });
    keyFrames9.push({
        frame: frameRate,
        value: new BABYLON.Vector3(currRot.x-0.117, currRot.y+0.342, currRot.z-0.347)
    });
    keyFrames9.push({
        frame: 7 * frameRate/6,     //70 frame
        value: new BABYLON.Vector3(currRot.x+0.343, currRot.y+0.324, currRot.z-0.025)
    });
    keyFrames9.push({
        frame: 3 * frameRate/2,     //90 frame
        value: new BABYLON.Vector3(currRot.x+1.07, currRot.y+0.172, currRot.z+0.558)
    });
    keyFrames9.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.7, currRot.y+0.366, currRot.z-0.09)
    });

    upperLegLRot.setKeys(keyFrames9);
    //upperLegLRot.setEasingFunction(bezierEase);
    upperLegL.animations.push(upperLegLRot);

    //upper_leg R
    const upperLegR = skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("upper_leg R")];

    const upperLegRRot = new BABYLON.Animation("walkLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames10 = [];
    keyFrames10.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.652, currRot.y-0.4, currRot.z-0.055)
    });
    keyFrames10.push({
        frame: 5 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.927, currRot.y-0.254, currRot.z-0.486)
    });
    keyFrames10.push({
        frame: 11 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.756, currRot.y-0.377, currRot.z-0.015)
    });
    keyFrames10.push({
        frame: 3 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.07, currRot.y-0.354, currRot.z-0.242)
    });
    keyFrames10.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.652, currRot.y-0.4, currRot.z-0.055)
    });

    upperLegRRot.setKeys(keyFrames10);
    //upperLegRRot.setEasingFunction(bezierEase);
    upperLegR.animations.push(upperLegRRot);

    //lower_leg L
    const lowerLegL = skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg L")];

    const lowerLegLRot = new BABYLON.Animation("walkLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames11 = [];
    keyFrames11.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.38, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames11.push({
        frame: 5 * frameRate/12,
        value: new BABYLON.Vector3(currRot.x+0.38, currRot.y+0.0, currRot.z+0.0)
    });
    keyFrames11.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x+0.033, currRot.y+0.117, currRot.z+0.037)
    });
    keyFrames11.push({
        frame: 7 * frameRate/6,     //70 frame
        value: new BABYLON.Vector3(currRot.x+0.393, currRot.y+0.153, currRot.z-0.03)
    });
    keyFrames11.push({
        frame: 3 * frameRate/2,     //90 frame
        value: new BABYLON.Vector3(currRot.x+0.469, currRot.y+0.116, currRot.z-0.083)
    });
    keyFrames11.push({
        frame: 5 * frameRate/3,     //100 frame
        value: new BABYLON.Vector3(currRot.x+0.31, currRot.y+0.18, currRot.z-0.013)
    });
    keyFrames11.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.38, currRot.y+0.0, currRot.z+0.0)
    });

    lowerLegLRot.setKeys(keyFrames11);
    //lowerLegLRot.setEasingFunction(bezierEase);
    lowerLegL.animations.push(lowerLegLRot);

    //lower_leg R
    const lowerLegR = skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")];
    currRot = initialRot[skeleton.getBoneIndexByName("lower_leg R")];

    const lowerLegRRot = new BABYLON.Animation("walkLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames12 = [];
    keyFrames12.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x+0.507, currRot.y-0.03, currRot.z+0.05)
    });
    keyFrames12.push({
        frame: 3 * frameRate/4,
        value: new BABYLON.Vector3(currRot.x+0.118, currRot.y+0.004, currRot.z-0.08)
    });
    keyFrames12.push({
        frame: 7 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.372, currRot.y-0.025, currRot.z+0.0)
    });
    keyFrames12.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x+0.372, currRot.y-0.025, currRot.z+0.0)
    });
    keyFrames12.push({
        frame: 3 * frameRate/2,
        value: new BABYLON.Vector3(currRot.x+0.032, currRot.y-0.026, currRot.z+0.012)
    });
    keyFrames12.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x+0.507, currRot.y-0.03, currRot.z+0.05)
    });

    lowerLegRRot.setKeys(keyFrames12);
    //lowerLegRRot.setEasingFunction(bezierEase);
    lowerLegR.animations.push(lowerLegRRot);

    //foot L
    const footL = skeleton.bones[skeleton.getBoneIndexByName("foot L")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot L")];

    const footLRot = new BABYLON.Animation("walkLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames13 = [];
    keyFrames13.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.018, currRot.y+0.0, currRot.z+0.301)
    });
    keyFrames13.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.018, currRot.y+0.0, currRot.z+0.301)
    });

    footLRot.setKeys(keyFrames13);
    //footLRot.setEasingFunction(bezierEase);
    footL.animations.push(footLRot);

    //foot R
    const footR = skeleton.bones[skeleton.getBoneIndexByName("foot R")];
    currRot = initialRot[skeleton.getBoneIndexByName("foot R")];

    const footRRot = new BABYLON.Animation("walkLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames14 = [];
    keyFrames14.push({
        frame: 0,
        value: new BABYLON.Vector3(currRot.x-0.12, currRot.y+0.0, currRot.z-0.3)
    });
    keyFrames14.push({
        frame: 11 * frameRate/6,
        value: new BABYLON.Vector3(currRot.x-0.12, currRot.y+0.0, currRot.z-0.3)
    });

    footRRot.setKeys(keyFrames14);
    //footRRot.setEasingFunction(bezierEase);
    footR.animations.push(footRRot);
}
function groupWalkLeft(skeleton) {
    const walkLeftGroup = new BABYLON.AnimationGroup("walkLeftGroup");
    //walkLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")].animations[0], skeleton.bones[skeleton.getBoneIndexByName("main")]);
    walkLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[8], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    walkLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[9], skeleton.bones[skeleton.getBoneIndexByName("chest")]);
    walkLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("head")].animations[2], skeleton.bones[skeleton.getBoneIndexByName("head")]);
    walkLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder L")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("shoulder L")]);
    walkLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("shoulder R")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("shoulder R")]);
    walkLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("upper_arm L")]);
    walkLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")]);
    walkLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("lower_arm L")]);
    walkLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")]);
    walkLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")]);
    walkLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("upper_leg R")]);
    walkLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")]);
    walkLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("lower_leg R")]);
    walkLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot L")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("foot L")]);
    walkLeftGroup.addTargetedAnimation(skeleton.bones[skeleton.getBoneIndexByName("foot R")].animations[4], skeleton.bones[skeleton.getBoneIndexByName("foot R")]);

    return walkLeftGroup;
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
//