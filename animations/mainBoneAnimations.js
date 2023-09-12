//10 TOTAL MAIN BONE ANIMATIONS (FOR PLAYER)
//MOVEMENT ANIMATIONS
function mainForward(skeleton, frameRate) {
    // Creating an easing function
    //const bezierEase = new BABYLON.BezierCurveEase(0.25, -0.1, 0.75, 1.1);
    //const bezierEase = new BABYLON.SineEase();
    //bezierEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

    var currPos;
    var currRot;    //here I use it to compute the straight direction when the model is rotated (y is not touched)
    
    const main = skeleton.bones[skeleton.getBoneIndexByName("main")];
    currPos = skeleton.bones[skeleton.getBoneIndexByName("main")].position;
    currRot = skeleton.bones[skeleton.getBoneIndexByName("main")].rotation;

    //From trigonometric theorems:
    //z=dist*sin(angleY); x=dist*cos(angleY); dist=2.7
    //Reminder: sin(0)=0; cos(0)=1

    var xMovement = 2.7*Math.sin(currRot.y);
    var zMovement = 2.7*Math.cos(currRot.y);
    //I fragment the movement on the X and Z axis between keyframes using the total distance 2.7
    const mainPos = new BABYLON.Animation("mainFwdPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y+0.0, currPos.z+0.0)
    });
    /*keyFrames.push({
        frame: 5 * frameRate/12,    //25 frame
        value: new BABYLON.Vector3(currPos.x+(xMovement*0.6/2.7), currPos.y+0.0, currPos.z+(zMovement*0.6/2.7))
    });
    keyFrames.push({
        frame: 3 * frameRate/4,     //45 frame
        value: new BABYLON.Vector3(currPos.x+(xMovement*1.1/2.7), currPos.y+0.0, currPos.z+(zMovement*1.1/2.7))
    });*/
    keyFrames.push({
        frame: 11 * frameRate/12,   //55 frame
        value: new BABYLON.Vector3(currPos.x+(xMovement*1.5/2.7), currPos.y+0.0, currPos.z+(zMovement*1.5/2.7))
    });
    /*keyFrames.push({
        frame: 4 * frameRate/3,     //80 frame
        value: new BABYLON.Vector3(currPos.x+(xMovement*2.2/2.7), currPos.y+0.0, currPos.z+(zMovement*2.2/2.7))
    });*/
    keyFrames.push({
        frame: 11 * frameRate/6,    //110 frame
        value: new BABYLON.Vector3(currPos.x+xMovement, currPos.y-0.0, currPos.z+zMovement)
    });

    mainPos.setKeys(keyFrames);
    //mainPos.setEasingFunction(bezierEase);
    main.animations[0] = mainPos;
}

function mainBack(skeleton, frameRate) {
    // Creating an easing function
    //const bezierEase = new BABYLON.BezierCurveEase(0.25, -0.1, 0.75, 1.1);
    //const bezierEase = new BABYLON.SineEase();
    //bezierEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

    var currPos;
    var currRot;

    const main = skeleton.bones[skeleton.getBoneIndexByName("main")];
    currPos = skeleton.bones[skeleton.getBoneIndexByName("main")].position;
    currRot = skeleton.bones[skeleton.getBoneIndexByName("main")].rotation;

    //From trigonometric theorems:
    //z=dist*sin(angleY); x=dist*cos(angleY); dist=2.7
    //Reminder: sin(0)=0; cos(0)=1

    var xMovement = 2.7*Math.sin(currRot.y);
    var zMovement = 2.7*Math.cos(currRot.y);
    //I fragment the movement on the X and Z axis between keyframes using the total distance 2.7
    const mainPos = new BABYLON.Animation("mainBackPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x-0.0, currPos.y+0.0, currPos.z-0.0)
    });
    /*keyFrames.push({
        frame: 5 * frameRate/12,    //25 frame
        value: new BABYLON.Vector3(currPos.x-(xMovement*0.6/2.7), currPos.y+0.0, currPos.z-(zMovement*0.6/2.7))
    });
    keyFrames.push({
        frame: 3 * frameRate/4,     //45 frame
        value: new BABYLON.Vector3(currPos.x-(xMovement*1.1/2.7), currPos.y+0.0, currPos.z-(zMovement*1.1/2.7))
    });*/
    keyFrames.push({
        frame: 11 * frameRate/12,   //55 frame
        value: new BABYLON.Vector3(currPos.x-(xMovement*1.5/2.7), currPos.y+0.0, currPos.z-(zMovement*1.5/2.7))
    });
    /*keyFrames.push({
        frame: 4 * frameRate/3,     //80 frame
        value: new BABYLON.Vector3(currPos.x-(xMovement*2.2/2.7), currPos.y+0.0, currPos.z-(zMovement*2.2/2.7))
    });*/
    keyFrames.push({
        frame: 11 * frameRate/6,    //110 frame
        value: new BABYLON.Vector3(currPos.x-xMovement, currPos.y-0.0, currPos.z-zMovement)
    });

    mainPos.setKeys(keyFrames);
    //mainPos.setEasingFunction(bezierEase);
    main.animations[1] = mainPos;
}

function mainRight(skeleton, frameRate) {
    var currPos;
    var currRot;

    const main = skeleton.bones[skeleton.getBoneIndexByName("main")];
    currPos = skeleton.bones[skeleton.getBoneIndexByName("main")].position;
    currRot = skeleton.bones[skeleton.getBoneIndexByName("main")].rotation;
    
    //From trigonometric theorems:
    //z=dist*sin(angleY); x=dist*cos(angleY); dist=2.5
    //Reminder: sin(0)=0; cos(0)=1
    
    var zMovement = 2.5*Math.sin(currRot.y);
    var xMovement = 2.5*Math.cos(currRot.y);
    //I fragment the movement on the X and Z axis between keyframes using the total distance 2.7
    const mainPos = new BABYLON.Animation("mainRightPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y+0.0, currPos.z-0.0)
    });
    keyFrames.push({
        frame: 5 * frameRate/12,    //25 frame
        value: new BABYLON.Vector3(currPos.x+(xMovement*0.6/2.5), currPos.y+0.0, currPos.z-(zMovement*0.6/2.5))
    });
    keyFrames.push({
        frame: 3 * frameRate/4,     //45 frame
        value: new BABYLON.Vector3(currPos.x+(xMovement*1.0/2.5), currPos.y+0.0, currPos.z-(zMovement*1.0/2.5))
    });
    keyFrames.push({
        frame: 7 * frameRate/6,     //70 frame
        value: new BABYLON.Vector3(currPos.x+(xMovement*1.6/2.5), currPos.y+0.0, currPos.z-(zMovement*1.6/2.5))
    });
    keyFrames.push({
        frame: 3 * frameRate/2,     //90 frame
        value: new BABYLON.Vector3(currPos.x+(xMovement*2.0/2.5), currPos.y+0.0, currPos.z-(zMovement*2.0/2.5))
    });
    keyFrames.push({
        frame: 11 * frameRate/6,    //110 frame
        value: new BABYLON.Vector3(currPos.x+xMovement, currPos.y-0.0, currPos.z-zMovement)
    });

    mainPos.setKeys(keyFrames);
    //mainPos.setEasingFunction(bezierEase);
    main.animations[2] = mainPos;
}

function mainLeft(skeleton, frameRate) {
    var currPos;
    var currRot;

    const main = skeleton.bones[skeleton.getBoneIndexByName("main")];
    currPos = skeleton.bones[skeleton.getBoneIndexByName("main")].position;
    currRot = skeleton.bones[skeleton.getBoneIndexByName("main")].rotation;

    //From trigonometric theorems:
    //z=dist*sin(angleY); x=dist*cos(angleY); dist=2.5
    //Reminder: sin(0)=0; cos(0)=1

    var zMovement = 2.5*Math.sin(currRot.y);
    var xMovement = 2.5*Math.cos(currRot.y);
    //I fragment the movement on the X and Z axis between keyframes using the total distance 2.7
    const mainPos = new BABYLON.Animation("mainLeftPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x-0.0, currPos.y+0.0, currPos.z+0.0)
    });
    keyFrames.push({
        frame: 5 * frameRate/12,    //25 frame
        value: new BABYLON.Vector3(currPos.x-(xMovement*0.6/2.5), currPos.y+0.0, currPos.z+(zMovement*0.6/2.5))
    });
    keyFrames.push({
        frame: 3 * frameRate/4,     //45 frame
        value: new BABYLON.Vector3(currPos.x-(xMovement*1.0/2.5), currPos.y+0.0, currPos.z+(zMovement*1.0/2.5))
    });
    keyFrames.push({
        frame: 7 * frameRate/6,     //70 frame
        value: new BABYLON.Vector3(currPos.x-(xMovement*1.6/2.5), currPos.y+0.0, currPos.z+(zMovement*1.6/2.5))
    });
    keyFrames.push({
        frame: 3 * frameRate/2,     //90 frame
        value: new BABYLON.Vector3(currPos.x-(xMovement*2.0/2.5), currPos.y+0.0, currPos.z+(zMovement*2.0/2.5))
    });
    keyFrames.push({
        frame: 11 * frameRate/6,    //110 frame
        value: new BABYLON.Vector3(currPos.x-xMovement, currPos.y-0.0, currPos.z+zMovement)
    });

    mainPos.setKeys(keyFrames);
    //mainPos.setEasingFunction(bezierEase);
    main.animations[3] = mainPos;
}

//ROTATION ANIMATIONS
function mainRightRot(skeleton, frameRate) {
    // Creating an easing function
    //const bezierEase = new BABYLON.BezierCurveEase(0.25, -0.1, 0.75, 1.1);
    const sineEase = new BABYLON.SineEase();
    sineEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

    //var currPos;
    var currRot;

    const main = skeleton.bones[skeleton.getBoneIndexByName("main")];
    //currPos = skeleton.bones[skeleton.getBoneIndexByName("main")].position;
    currRot = skeleton.bones[skeleton.getBoneIndexByName("main")].rotation;
    
    const mainRot = new BABYLON.Animation("mainRightRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: currRot
    });
    keyFrames.push({
        frame: 2 * frameRate/3,    //40 frame
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y+0.785, currRot.z+0.0)
    });

    mainRot.setKeys(keyFrames);
    mainRot.setEasingFunction(sineEase);
    main.animations[4] = mainRot;
}

function mainLeftRot(skeleton, frameRate) {
    // Creating an easing function
    //const bezierEase = new BABYLON.BezierCurveEase(0.25, -0.1, 0.75, 1.1);
    const sineEase = new BABYLON.SineEase();
    sineEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

    //var currPos;
    var currRot;

    const main = skeleton.bones[skeleton.getBoneIndexByName("main")];
    //currPos = skeleton.bones[skeleton.getBoneIndexByName("main")].position;
    currRot = skeleton.bones[skeleton.getBoneIndexByName("main")].rotation;
    
    const mainRot = new BABYLON.Animation("mainLeftRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: currRot
    });
    keyFrames.push({
        frame: 2 * frameRate/3,    //40 frame
        value: new BABYLON.Vector3(currRot.x+0.0, currRot.y-0.785, currRot.z+0.0)
    });

    mainRot.setKeys(keyFrames);
    mainRot.setEasingFunction(sineEase);
    main.animations[5] = mainRot;
}

//DODGE ANIMATIONS
function mainDodgeFwd(skeleton, frameRate) {
    var currPos;
    var currRot;    //here I use it to compute the straight direction when the model is rotated (y is not touched)
    
    const main = skeleton.bones[skeleton.getBoneIndexByName("main")];
    currPos = skeleton.bones[skeleton.getBoneIndexByName("main")].position;
    currRot = skeleton.bones[skeleton.getBoneIndexByName("main")].rotation;

    //From trigonometric theorems:
    //z=dist*sin(angleY); x=dist*cos(angleY); dist=1.6
    //Reminder: sin(0)=0; cos(0)=1

    var xMovement = 1.6*Math.sin(currRot.y);
    var zMovement = 1.6*Math.cos(currRot.y);
    //I fragment the movement on the X and Z axis between keyframes using the total distance 1.6
    const mainPos = new BABYLON.Animation("mainDodgeFwdPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: currPos
    });
    keyFrames.push({
        frame: 1 * frameRate/4,    //15 frame
        value: new BABYLON.Vector3(currPos.x+(xMovement*0.3/1.6), currPos.y+0.0, currPos.z+(zMovement*0.3/1.6))
    });
    keyFrames.push({
        frame: 7 * frameRate/12,     //35 frame
        value: new BABYLON.Vector3(currPos.x+(xMovement*1.4/1.6), currPos.y+0.0, currPos.z+(zMovement*1.4/1.6))
    });
    keyFrames.push({
        frame: 5 * frameRate/6,    //50 frame
        value: new BABYLON.Vector3(currPos.x+xMovement, currPos.y-0.0, currPos.z+zMovement)
    });

    mainPos.setKeys(keyFrames);
    //mainPos.setEasingFunction(bezierEase);
    main.animations[6] = mainPos;
}

function mainDodgeBack(skeleton, frameRate) {
    var currPos;
    var currRot;

    const main = skeleton.bones[skeleton.getBoneIndexByName("main")];
    currPos = skeleton.bones[skeleton.getBoneIndexByName("main")].position;
    currRot = skeleton.bones[skeleton.getBoneIndexByName("main")].rotation;

    //From trigonometric theorems:
    //z=dist*sin(angleY); x=dist*cos(angleY); dist=1.6
    //Reminder: sin(0)=0; cos(0)=1

    var xMovement = 1.6*Math.sin(currRot.y);
    var zMovement = 1.6*Math.cos(currRot.y);
    //I fragment the movement on the X and Z axis between keyframes using the total distance 1.6
    const mainPos = new BABYLON.Animation("mainDodgeBackPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: currPos
    });
    keyFrames.push({
        frame: 1 * frameRate/6,
        value: new BABYLON.Vector3(currPos.x-(xMovement*0.3/1.6), currPos.y+0.0, currPos.z-(zMovement*0.3/1.6))
    });
    keyFrames.push({
        frame: 7 * frameRate/12,
        value: new BABYLON.Vector3(currPos.x-(xMovement*1.4/1.6), currPos.y+0.0, currPos.z-(zMovement*1.4/1.6))
    });
    keyFrames.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currPos.x-xMovement, currPos.y-0.0, currPos.z-zMovement)
    });

    mainPos.setKeys(keyFrames);
    //mainPos.setEasingFunction(bezierEase);
    main.animations[7] = mainPos;
}

function mainDodgeRight(skeleton, frameRate) {
    var currPos;
    var currRot;

    const main = skeleton.bones[skeleton.getBoneIndexByName("main")];
    currPos = skeleton.bones[skeleton.getBoneIndexByName("main")].position;
    currRot = skeleton.bones[skeleton.getBoneIndexByName("main")].rotation;
    
    //From trigonometric theorems:
    //z=dist*sin(angleY); x=dist*cos(angleY); dist=1.6
    //Reminder: sin(0)=0; cos(0)=1
    
    var zMovement = 1.6*Math.sin(currRot.y);
    var xMovement = 1.6*Math.cos(currRot.y);
    //I fragment the movement on the X and Z axis between keyframes using the total distance 1.6
    const mainPos = new BABYLON.Animation("mainDodgeRightPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x+0.0, currPos.y+0.0, currPos.z-0.0)
    });
    keyFrames.push({
        frame: 1 * frameRate/4,
        value: new BABYLON.Vector3(currPos.x+(xMovement*0.3/1.6), currPos.y+0.0, currPos.z-(zMovement*0.3/1.6))
    });
    keyFrames.push({
        frame: 7 * frameRate/12,
        value: new BABYLON.Vector3(currPos.x+(xMovement*1.4/1.6), currPos.y+0.0, currPos.z-(zMovement*1.4/1.6))
    });
    keyFrames.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currPos.x+xMovement, currPos.y-0.0, currPos.z-zMovement)
    });

    mainPos.setKeys(keyFrames);
    //mainPos.setEasingFunction(bezierEase);
    main.animations[8] = mainPos;
}

function mainDodgeLeft(skeleton, frameRate) {
    var currPos;
    var currRot;

    const main = skeleton.bones[skeleton.getBoneIndexByName("main")];
    currPos = skeleton.bones[skeleton.getBoneIndexByName("main")].position;
    currRot = skeleton.bones[skeleton.getBoneIndexByName("main")].rotation;

    //From trigonometric theorems:
    //z=dist*sin(angleY); x=dist*cos(angleY); dist=1.6
    //Reminder: sin(0)=0; cos(0)=1

    var zMovement = 1.6*Math.sin(currRot.y);
    var xMovement = 1.6*Math.cos(currRot.y);
    //I fragment the movement on the X and Z axis between keyframes using the total distance 1.6
    const mainPos = new BABYLON.Animation("mainDodgeLeftPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: new BABYLON.Vector3(currPos.x-0.0, currPos.y+0.0, currPos.z+0.0)
    });
    keyFrames.push({
        frame: 1 * frameRate/4,
        value: new BABYLON.Vector3(currPos.x-(xMovement*0.3/1.6), currPos.y+0.0, currPos.z+(zMovement*0.3/1.6))
    });
    keyFrames.push({
        frame: 7 * frameRate/12,
        value: new BABYLON.Vector3(currPos.x-(xMovement*1.4/1.6), currPos.y+0.0, currPos.z+(zMovement*1.4/1.6))
    });
    keyFrames.push({
        frame: 5 * frameRate/6,
        value: new BABYLON.Vector3(currPos.x-xMovement, currPos.y-0.0, currPos.z+zMovement)
    });

    mainPos.setKeys(keyFrames);
    //mainPos.setEasingFunction(bezierEase);
    main.animations[9] = mainPos;
}