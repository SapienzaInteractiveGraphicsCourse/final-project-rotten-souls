function chestMoonlight(chestSkeleton, sword, frameRate) {
    var currPos;
    var currRot;

    //ANIMATED PARAMETERS
    //chest opening
    const opening = chestSkeleton.bones[chestSkeleton.getBoneIndexByName("opening")];
    currRot = chestSkeleton.bones[chestSkeleton.getBoneIndexByName("opening")].rotation;
    const openingRot = new BABYLON.Animation("openingRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: currRot
    });
    keyFrames.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currRot.x-1.77, currRot.y, currRot.z)
    });
    keyFrames.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x-2.2, currRot.y, currRot.z)
    });

    openingRot.setKeys(keyFrames);
    opening.animations.push(openingRot);

    //sword movement
    currPos = sword.position;
    const swordPos = new BABYLON.Animation("swordPos", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames2 = [];
    keyFrames2.push({
        frame: 0,
        value: currPos
    });
    keyFrames2.push({
        frame: 4 * frameRate/3,
        value: new BABYLON.Vector3(currPos.x, currPos.y+0.8, currPos.z)
    });
    keyFrames2.push({
        frame: 4 * frameRate,
        value: new BABYLON.Vector3(currPos.x, currPos.y+2.0, currPos.z+0.0)
    });

    swordPos.setKeys(keyFrames2);
    sword.animations.push(swordPos);

    //sword rotation
    currRot = sword.rotation;
    const swordRot = new BABYLON.Animation("swordRot", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames3 = [];
    keyFrames3.push({
        frame: 0,
        value: currRot
    });
    keyFrames3.push({
        frame: frameRate,
        value: new BABYLON.Vector3(currRot.x, currRot.y+2.2, currRot.z)
    });
    keyFrames3.push({
        frame: 2 * frameRate,
        value: new BABYLON.Vector3(currRot.x, currRot.y+3.14, currRot.z)
    });
    keyFrames3.push({
        frame: 4 * frameRate,
        value: new BABYLON.Vector3(currRot.x, currRot.y+15.707, currRot.z)
    });

    swordRot.setKeys(keyFrames3);
    sword.animations.push(swordRot);
}

function groupChestMoonlight(chestSkeleton, sword) {
    const chestMoonlightGroup = new BABYLON.AnimationGroup("chestMoonlightGroup");
    chestMoonlightGroup.addTargetedAnimation(chestSkeleton.bones[chestSkeleton.getBoneIndexByName("opening")].animations[0], chestSkeleton.bones[chestSkeleton.getBoneIndexByName("opening")]);
    chestMoonlightGroup.addTargetedAnimation(sword.animations[0], sword);
    chestMoonlightGroup.addTargetedAnimation(sword.animations[1], sword);

    return chestMoonlightGroup;
}