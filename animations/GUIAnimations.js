function defeatTextBoxFadeIn(textContainer, text, button, frameRate) {
    const containerFadeIn = new BABYLON.Animation("containerFadeIn", "alpha", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: 0.0
    });
    keyFrames.push({
        frame: 3 * frameRate,
        value: 0.4
    });

    containerFadeIn.setKeys(keyFrames);
    textContainer.animations = [];      //I don't know why the animations array is null and not an empty array as usual
    textContainer.animations.push(containerFadeIn);

    const textFadeIn = new BABYLON.Animation("textFadeIn", "alpha", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames2 = [];
    keyFrames2.push({
        frame: 0,
        value: 0.0
    });
    keyFrames2.push({
        frame: 3 * frameRate,
        value: 1.0
    });

    textFadeIn.setKeys(keyFrames2);
    text.animations = [];
    text.animations.push(textFadeIn);

    const buttonFadeIn = new BABYLON.Animation("buttonFadeIn", "alpha", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames3 = [];
    keyFrames3.push({
        frame: 0,
        value: 0.0
    });
    keyFrames3.push({
        frame: 3 * frameRate,
        value: 1.0
    });

    buttonFadeIn.setKeys(keyFrames3);
    button.animations = [];
    button.animations.push(buttonFadeIn);

    //Grouping
    const defeatGUIGroup = new BABYLON.AnimationGroup("defeatGUIGroup");
    defeatGUIGroup.addTargetedAnimation(textContainer.animations[0], textContainer);
    defeatGUIGroup.addTargetedAnimation(text.animations[0], text);
    defeatGUIGroup.addTargetedAnimation(button.animations[0], button);

    return defeatGUIGroup;
}

function victoryTextBoxFadeInOut(textContainer, text, subtext, frameRate) {
    const containerFadeInOut = new BABYLON.Animation("containerFadeInOut", "alpha", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: 0.0
    });
    keyFrames.push({
        frame: 1 * frameRate,
        value: 0.4
    });
    keyFrames.push({
        frame: 5 * frameRate,
        value: 0.4
    });
    keyFrames.push({
        frame: 6 * frameRate,
        value: 0.0
    });

    containerFadeInOut.setKeys(keyFrames);
    textContainer.animations = [];      //I don't know why the animations array is null and not an empty array as usual
    textContainer.animations.push(containerFadeInOut);

    const textFadeInOut = new BABYLON.Animation("textFadeInOut", "alpha", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames2 = [];
    keyFrames2.push({
        frame: 0,
        value: 0.0
    });
    keyFrames2.push({
        frame: 1 * frameRate,
        value: 1.0
    });
    keyFrames2.push({
        frame: 5 * frameRate,
        value: 1.0
    });
    keyFrames2.push({
        frame: 6 * frameRate,
        value: 0.0
    });

    textFadeInOut.setKeys(keyFrames2);
    text.animations = [];
    text.animations.push(textFadeInOut);

    const subtextFadeInOut = new BABYLON.Animation("subtextFadeInOut", "alpha", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    const keyFrames3 = [];
    keyFrames3.push({
        frame: 0,
        value: 0.0
    });
    keyFrames3.push({
        frame: 1 * frameRate,
        value: 1.0
    });
    keyFrames3.push({
        frame: 5 * frameRate,
        value: 1.0
    });
    keyFrames3.push({
        frame: 6 * frameRate,
        value: 0.0
    });

    subtextFadeInOut.setKeys(keyFrames3);
    subtext.animations = [];
    subtext.animations.push(subtextFadeInOut);

    //Grouping
    const victoryGUIGroup = new BABYLON.AnimationGroup("victoryGUIGroup");
    victoryGUIGroup.addTargetedAnimation(textContainer.animations[0], textContainer);
    victoryGUIGroup.addTargetedAnimation(text.animations[0], text);
    victoryGUIGroup.addTargetedAnimation(subtext.animations[0], subtext);

    return victoryGUIGroup;
}