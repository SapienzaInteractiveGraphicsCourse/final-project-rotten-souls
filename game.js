const canvas = document.getElementById("renderCanvas"); // Get the canvas element
window.addEventListener('load', function(e) {   //Focus the canvas when the page is loaded (otherwise you had to click once to focus it and play the game)
    canvas.focus();
});
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
var frameRate = engine.getFps();    //To keep the application frame rate independent

//Utility function to measure the distance between the boss and the player
function cartesianDistance(a, b) {
    //a and b are Vector3
    //the distance of the ground plane is measured with x and z components
    var distance = Math.sqrt(Math.pow(b.x-a.x, 2) + Math.pow(b.z-a.z, 2));
    return distance;
}

const createScene = async function () {
// Creates a basic Babylon Scene object
    const scene = new BABYLON.Scene(engine);

    //CAMERA
    /*const debugCamera = new BABYLON.ArcRotateCamera("debugCamera", -Math.PI / 2, Math.PI / 2.5, 6, new BABYLON.Vector3(0, 0, 0));
    debugCamera.attachControl(canvas, true);
    debugCamera.wheelPrecision = 100;
    debugCamera.minZ = 0.01;*/
    const camera = new BABYLON.FollowCamera("followCam", new BABYLON.Vector3(20.0, 3.0, 0.0), scene);
    camera.radius = 6.2;
    camera.heightOffset = 1.2;
    camera.rotationOffset = 180.0;
    camera.cameraAcceleration = 0.07;
    camera.maxCameraSpeed = 10.0;
    //camera.attachControl(canvas, true);

    //FOG EFFECT (subtle)
    //scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);
    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
    scene.fogDensity = 0.006;
    scene.fogColor = new BABYLON.Color3(0.45, 0.4, 0.35);

    //LIGHTS SETTING
    const externalLight = new BABYLON.HemisphericLight("externalLight", new BABYLON.Vector3(0, 1, 0));
    externalLight.intensity = 1.2;
    externalLight.diffuse = new BABYLON.Color3(0.45, 0.4, 0.35);
    externalLight.specular = new BABYLON.Color3(0.45, 0.4, 0.35);
    
    const light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(-5.0, 8.0, 0.0), scene);
    light.intensity = 1.1;
    light.diffuse = new BABYLON.Color3(0.42, 0.4, 0.4);
    light.specular = new BABYLON.Color3(0.42, 0.4, 0.4);
    light.range = 55.0;
    
    const light2 = new BABYLON.PointLight("pointLight2", new BABYLON.Vector3(10.0, 8.0, 0.0), scene);
    light2.intensity = 1.1;
    light2.diffuse = new BABYLON.Color3(0.42, 0.4, 0.4);
    light2.specular = new BABYLON.Color3(0.42, 0.4, 0.4);
    light2.range = 60.0;

    //GROUND AND SKYBOX
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    //groundMat.diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9);
    groundMat.diffuseTexture = new BABYLON.Texture("/assets/Chapel_Arena_fin/m15_wall_white_01.png", scene);
    groundMat.diffuseTexture.uScale = 20.0;     //to make the texture replicate instead of stretching ("tiling")
    groundMat.diffuseTexture.vScale = 16.0;

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:120, height:100});
    ground.material = groundMat;
    ground.position = new BABYLON.Vector3(15.0, -6.5, 0.0);

    const skybox = BABYLON.MeshBuilder.CreateBox("skybox", {size:200}, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyboxMaterial", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/assets/Skybox/skybox", scene);   //LEGGE CARTELLA "textures" E POI CERCA FILE CON INIZIO NOME "skybox" E DESINENZA "_nx", "_ny", ecc.
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    skybox.position = new BABYLON.Vector3(0.0, 50.0, 0.0);

    //HO DOVUTO CONVERTIRE A FORMATO .BABYLON PERCHé .OBJ NON HANNO LO SKELETON/ARMATURA
    //MODELS IMPORTATION
    //Player model (darkwraith)
    var model;
    var skeleton;
    //I use asynchronous function with "await" to avoid the lost of reference to "model" and "skeleton" and to improve mesh loading
    const result = await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/Darkwraith_fin2/", "c2390.babylon", scene);
    model = result.meshes[0];
    skeleton = result.skeletons[0];
    model.receiveShadows = true;
    //model.checkCollisions = true;

    skeleton.bones[skeleton.getBoneIndexByName("main")].position = new BABYLON.Vector3(20.0, 0.0, 0.0);
	skeleton.bones[skeleton.getBoneIndexByName("main")].rotation = new BABYLON.Vector3(0.0, -Math.PI/2, 0.0);
    skeleton.bones[skeleton.getBoneIndexByName("main")].scaling.x *= -1.0;  //to solve the mirrored imported model (the angles will be computed as opposite)
    console.log(skeleton.bones);
    //****REMINDER FOR BONES NAMES****
    //main  chest  neck  head  
    //shoulder L  upper_arm L  lower_arm L  palm L  thumb L  fingers L  upper_leg L  lower_leg L  foot L 
    //shoulder R  upper_arm R  lower_arm R  palm R  thumb R  fingers R  upper_leg R  lower_leg R  foot R  
    //sword  sheath(only for darkwraith)  cape(only for silver knight)
    model.alwaysSelectAsActiveMesh = true;
    for (let i=0; i<model.material.subMaterials.length; i++) 
        model.material.subMaterials[i].maxSimultaneousLights = 6;
    
    //Boss model (silver knight)
    var model2;
    var skeleton2;
    const result2 = await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/Silver_Knight_fin2/", "c2410.babylon", scene);
    model2 = result2.meshes[0];
    skeleton2 = result2.skeletons[0];
    model2.receiveShadows = true;
    //model2.checkCollisions = true;

    //model2.scaling.x *= -1.0;
    skeleton2.bones[skeleton2.getBoneIndexByName("main")].position = new BABYLON.Vector3(-7.0, 0.0, 0.0);
	skeleton2.bones[skeleton2.getBoneIndexByName("main")].rotation = new BABYLON.Vector3(0.0, Math.PI/2, 0.0);
    skeleton2.bones[skeleton2.getBoneIndexByName("main")].scaling.x *= -1.0;    //to solve the mirrored imported model (the angles will be computed as opposite)
    skeleton2.bones[skeleton2.getBoneIndexByName("cape")].rotation = new BABYLON.Vector3(-11*Math.PI/12, 0.0, 0.0);     //only "cape" is modified before, because it is animated not from the default t-pose position/rotation
    console.log(skeleton2.bones);
    model2.alwaysSelectAsActiveMesh = true;     //very important, otherwise the second model disappears or glitches out from certain camera angles
    for (let i=0; i<model2.material.subMaterials.length; i++) 
        model2.material.subMaterials[i].maxSimultaneousLights = 6;

    //Cathedral
    var cathedral;
    const result3 = await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/Chapel_Arena_fin/", "chapel_arena.babylon", scene);
    cathedral = result3.meshes[0];
    cathedral.position = new BABYLON.Vector3(0.0, 7.5, 0.0);
    cathedral.rotation = new BABYLON.Vector3(0.0, Math.PI, 0.0);
    cathedral.receiveShadows = true;
    for (let i=0; i<cathedral.material.subMaterials.length; i++) 
        cathedral.material.subMaterials[i].maxSimultaneousLights = 6;

    //Chandeliers
    var chandelier;
    const result4 = await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/Chandelier/", "chandelier.babylon", scene);
    chandelier = result4.meshes[0];
    chandelier.position = new BABYLON.Vector3(-5.0, 11.0, 0.0);
    //chandelier.rotation = new BABYLON.Vector3(0.0, Math.PI, 0.0);
    //chandelier.receiveShadows = true;
    for (let i=0; i<chandelier.material.subMaterials.length; i++) 
        chandelier.material.subMaterials[i].maxSimultaneousLights = 6;
    var chandelier2 = chandelier.clone();
    chandelier2.position = new BABYLON.Vector3(10.0, 11.0, 0.0);
    //chandelier2.receiveShadows = true;

    //Victory chest
    var zeldaChest;
    var chestSkeleton;
    const result5 = await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/Zelda_Chest/", "Zelda_chest.babylon", scene);
    zeldaChest = result5.meshes[0];
    chestSkeleton = result5.skeletons[0];
    chestSkeleton.bones[chestSkeleton.getBoneIndexByName("base")].scaling.x *= 1.4;
    chestSkeleton.bones[chestSkeleton.getBoneIndexByName("base")].scaling.y *= 1.2;
    chestSkeleton.bones[chestSkeleton.getBoneIndexByName("base")].scaling.z *= 1.2;
    chestSkeleton.bones[chestSkeleton.getBoneIndexByName("base")].position = new BABYLON.Vector3(-10.5, 0.0, 0.0);
    const tempRot = chestSkeleton.bones[chestSkeleton.getBoneIndexByName("base")].rotation;
    chestSkeleton.bones[chestSkeleton.getBoneIndexByName("base")].rotation = new BABYLON.Vector3(tempRot.x, tempRot.y-Math.PI/2, tempRot.z);
    //const tempRot2 = chestSkeleton.bones[chestSkeleton.getBoneIndexByName("opening")].rotation;
    //chestSkeleton.bones[chestSkeleton.getBoneIndexByName("opening")].rotation = new BABYLON.Vector3(tempRot2.x-0.3, tempRot2.y, tempRot2.z);
    zeldaChest.alwaysSelectAsActiveMesh = true;
    zeldaChest.receiveShadows = true;
    zeldaChest.material.maxSimultaneousLights = 6;
    for (let i=0; i<zeldaChest.material.subMaterials.length; i++) 
        zeldaChest.material.subMaterials[i].maxSimultaneousLights = 6;
    zeldaChest.isVisible = false;

    //Moonlight sword (victory prize)
    var moonlightSword;
    const result6 = await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/Moonlight_Sword/", "moonlight_sword.babylon", scene);
    moonlightSword = result6.meshes[0];
    moonlightSword.position = new BABYLON.Vector3(-10.0, -1.0, 0.0);
    moonlightSword.rotation = new BABYLON.Vector3(0.0, Math.PI/2, 0.0);
    moonlightSword.scaling = new BABYLON.Vector3(0.92, 0.92, 0.92);
    //console.log(moonlightSword.material);
    moonlightSword.material.subMaterials[1].alpha = 0.7;     //the external edge is slightly transparent
    for (let i=0; i<moonlightSword.material.subMaterials.length; i++) 
        moonlightSword.material.subMaterials[i].maxSimultaneousLights = 6;
    moonlightSword.alwaysSelectAsActiveMesh = true;
    //light.excludedMeshes.push(moonlightSword);
    //light2.excludedMeshes.push(moonlightSword);
    moonlightSword.receiveShadows = true;
    moonlightSword.isVisible = false;

    //(Moonlight sword luminosity effect)
    const moonlightLight = new BABYLON.PointLight("moonlightLight", new BABYLON.Vector3(-10.3, 1.8, 0.0), scene);
    //moonlightLight.parent = moonlightSword;
    moonlightLight.intensity = 2.5;
    moonlightLight.diffuse = new BABYLON.Color3(0.7, 0.95, 0.9);
    moonlightLight.specular = new BABYLON.Color3(0.7, 0.95, 0.9);
    moonlightLight.range = 5.5;
    //moonlightLight.includedOnlyMeshes.push(moonlightSword);
    moonlightLight.setEnabled(false);
    const moonlightLight2 = new BABYLON.PointLight("moonlightLight2", new BABYLON.Vector3(-9.7, 1.8, 0.0), scene);
    //moonlightLight.parent = moonlightSword;
    moonlightLight2.intensity = 2.5;
    moonlightLight2.diffuse = new BABYLON.Color3(0.7, 0.95, 0.9);
    moonlightLight2.specular = new BABYLON.Color3(0.7, 0.95, 0.9);
    moonlightLight2.range = 5.5;
    //moonlightLight2.includedOnlyMeshes.push(moonlightSword);
    moonlightLight2.setEnabled(false);

    //Small particle system effect for the chest and moonlight sword
    const moonlightSparkles = new BABYLON.ParticleSystem("moonlightSparkles", 5000, scene);

    //Easter egg objects
    var chestFFX;
    const result7 = await BABYLON.SceneLoader.ImportMeshAsync("", "assets/FFX_Chest/", "FFX_chest.babylon", scene);
    chestFFX = result7.meshes[0];
    chestFFX.position = new BABYLON.Vector3(-18.5, 0.8, 1.0);
    chestFFX.rotation = new BABYLON.Vector3(0.0, -Math.PI/2, 0.0);
    chestFFX.receiveShadows = true;
    chestFFX.material.maxSimultaneousLights = 6;

    var royalHelm;
    const result8 = await BABYLON.SceneLoader.ImportMeshAsync("", "assets/Royal_Helm_fin/", "royal_helm.babylon", scene);
    royalHelm = result8.meshes[0];
    royalHelm.position = new BABYLON.Vector3(-18.5, 0.8, -1.0);
    royalHelm.rotation = new BABYLON.Vector3(0.0, -2*Math.PI/3, 0.0);
    royalHelm.scaling = new BABYLON.Vector3(1.2, 1.2, 1.2);
    royalHelm.receiveShadows = true;
    for (let i=0; i<royalHelm.material.subMaterials.length; i++) 
        royalHelm.material.subMaterials[i].maxSimultaneousLights = 6;

    //SHADOWS CASTING
    const shadowGenerator1 = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator1.addShadowCaster(model);
    shadowGenerator1.addShadowCaster(model2);
    shadowGenerator1.addShadowCaster(cathedral);
    //shadowGenerator1.addShadowCaster(chandelier2);
    shadowGenerator1.addShadowCaster(zeldaChest);
    shadowGenerator1.addShadowCaster(moonlightSword);
    shadowGenerator1.usePoissonSampling = true;
    const shadowGenerator2 = new BABYLON.ShadowGenerator(1024, light2);
    shadowGenerator2.addShadowCaster(model);
    shadowGenerator2.addShadowCaster(model2);
    shadowGenerator2.addShadowCaster(cathedral);
    shadowGenerator2.addShadowCaster(zeldaChest);
    shadowGenerator2.addShadowCaster(moonlightSword);
    //shadowGenerator1.addShadowCaster(chandelier);
    shadowGenerator2.usePoissonSampling = true;
    
    //I HAD TO DISABLE BACKFACE CULLING FROM BLENDER (from some meshes, not all) BECAUSE OF THE MIRRORING OF THE MODELS EXPORTER (THE APP IS SLIGHTLY HEAVIER)

    //HITBOXES CREATION
	//Player hitboxes
    const res1 = playerHitboxes(scene, skeleton);
    const playerHitbox = res1[0];
    const playerSwordHitbox = res1[1];
    const playerFrontHitbox = res1[2];
    const playerBackHitbox = res1[3];
    const playerLeftHitbox = res1[4];
    const playerRightHitbox = res1[5];

    camera.lockedTarget = playerFrontHitbox;    //I had to lock the target on the front hitbox because I formally don't move the mesh, but only the skeleton (since "lockedTarget" requires a mesh)

	//Boss hitboxes
	const res2 = bossHitboxes(scene, skeleton2);
    const bossHitbox = res2[0];
    const bossSwordHitbox = res2[1];
    /*const bossFrontHitbox = res2[2];
    const bossBackHitbox = res2[3];
    const bossLeftHitbox = res2[4];
    const bossRightHitbox = res2[5];*/

    const arenaHitboxes = mapHitboxes(scene, cathedral);
    var linkLine = null;    //linking line between boss and player to check for obstacles (I didn't implement path finding or crowd agents)

    var allHitboxes = [];   //just for the debug mode (to visualize all the hitboxes)
    for(let i=0; i<res1.length; i++) allHitboxes.push(res1[i]);
    for(let i=0; i<res2.length; i++) allHitboxes.push(res2[i]);
    for(let i=0; i<arenaHitboxes.length; i++) allHitboxes.push(arenaHitboxes[i]);

    const chestHitbox = treasureChestHitbox(scene, chestSkeleton.bones[chestSkeleton.getBoneIndexByName("base")]);    //I don't add this to the "arenaHitboxes" array now, because I add it later when the chest appears

    //SOUNDS ASSETS IMPORT
    //Music
    const soundtrack = new BABYLON.Sound("soundtrack", "sounds/Music/Dark Souls 3 OST - Lorian, Elder Prince & Lothric, Younger Prince [HQ].mp3", scene, null, { loop: true, autoplay: true, volume: 0.3 });
    const failureMusic = new BABYLON.Sound("failureMusic", "sounds/Music/Mission Failed - Ace Combat 7.mp3", scene, null, { loop: false, volume: 0.6 });
    const victoryMusic = new BABYLON.Sound("victoryMusic", "sounds/Music/Gwynevere, Princess of Sunlight.mp3", scene, null, { loop: true, volume: 0.3 });
    //Weapons sounds
    const playerLightSwing1 = new BABYLON.Sound("playerLightSwing1", "sounds/Weapons_sounds/player_light_swing_1.wav", scene, null, { loop: false, volume: 0.4 });
    const playerLightSwing2 = new BABYLON.Sound("playerLightSwing2", "sounds/Weapons_sounds/player_light_swing_2.wav", scene, null, { loop: false, volume: 0.4 });
    const playerHeavySwing1 = new BABYLON.Sound("playerHeavySwing1", "sounds/Weapons_sounds/player_heavy_swing_1.wav", scene, null, { loop: false, volume: 0.4 });
    const playerHeavySwing2 = new BABYLON.Sound("playerHeavySwing2", "sounds/Weapons_sounds/player_heavy_swing_2.wav", scene, null, { loop: false, volume: 0.4 });
    const playerLightHit1 = new BABYLON.Sound("playerLightHit1", "sounds/Weapons_sounds/player_light_hit_1.wav", scene, null, { loop: false, volume: 0.4 });
    const playerLightHit2 = new BABYLON.Sound("playerLightHit2", "sounds/Weapons_sounds/player_light_hit_2.wav", scene, null, { loop: false, volume: 0.4 });
    const playerHeavyHit1 = new BABYLON.Sound("playerHeavyHit1", "sounds/Weapons_sounds/player_heavy_hit_1.wav", scene, null, { loop: false, volume: 0.4 });
    const playerHeavyHit2 = new BABYLON.Sound("playerHeavyHit2", "sounds/Weapons_sounds/player_heavy_hit_2.wav", scene, null, { loop: false, volume: 0.4 });
    const bossSwordSwing1 = new BABYLON.Sound("bossSwordSwing1", "sounds/Weapons_sounds/boss_swing_1.wav", scene, null, { loop: false, volume: 0.4 });
    const bossSwordSwing2 = new BABYLON.Sound("bossSwordSwing2", "sounds/Weapons_sounds/boss_swing_2.wav", scene, null, { loop: false, volume: 0.4 });
    const bossSwordHit1 = new BABYLON.Sound("bossSwordHit1", "sounds/Weapons_sounds/boss_sword_hit_1.wav", scene, null, { loop: false, volume: 0.4 });
    const bossSwordHit2 = new BABYLON.Sound("bossSwordHit2", "sounds/Weapons_sounds/boss_sword_hit_2.wav", scene, null, { loop: false, volume: 0.4 });
    //Footsteps sounds
    const playerFootstep1 = new BABYLON.Sound("playerFootstep1", "sounds/Footsteps_sounds/player_footstep_1.wav", scene, null, { loop: false, volume: 0.3 });
    const playerFootstep2 = new BABYLON.Sound("playerFootstep2", "sounds/Footsteps_sounds/player_footstep_2.wav", scene, null, { loop: false, volume: 0.3 });
    const playerFootstep3 = new BABYLON.Sound("playerFootstep3", "sounds/Footsteps_sounds/player_footstep_3.wav", scene, null, { loop: false, volume: 0.3 });
    const bossFootstep1 = new BABYLON.Sound("bossFootstep1", "sounds/Footsteps_sounds/boss_footstep_1.wav", scene, null, { loop: false, volume: 0.3 });
    const bossFootstep2 = new BABYLON.Sound("bossFootstep2", "sounds/Footsteps_sounds/boss_footstep_2.wav", scene, null, { loop: false, volume: 0.3 });
    const dodgeSound1 = new BABYLON.Sound("dodgeSound1", "sounds/Footsteps_sounds/dodge_1.wav", scene, null, { loop: false, volume: 0.3 });
    const dodgeSound2 = new BABYLON.Sound("dodgeSound2", "sounds/Footsteps_sounds/dodge_2.wav", scene, null, { loop: false, volume: 0.3 });
    //Boss voice sounds
    const bossVoiceLightHit1 = new BABYLON.Sound("bossVoiceLightHit1", "sounds/Cavaliere_Angelo_sounds/Cav_Angelo_hit_4.mp3", scene, null, { loop: false, volume: 0.4 });
    const bossVoiceLightHit2 = new BABYLON.Sound("bossVoiceLightHit2", "sounds/Cavaliere_Angelo_sounds/Cav_Angelo_hit_3.mp3", scene, null, { loop: false, volume: 0.4 });
    const bossVoiceHeavyHit1 = new BABYLON.Sound("bossVoiceHeavyHit1", "sounds/Cavaliere_Angelo_sounds/Cav_Angelo_hit_1.mp3", scene, null, { loop: false, volume: 0.4 });
    const bossVoiceHeavyHit2 = new BABYLON.Sound("bossVoiceHeavyHit2", "sounds/Cavaliere_Angelo_sounds/Cav_Angelo_hit_2.mp3", scene, null, { loop: false, volume: 0.4 });
    const bossVoiceDeath1 = new BABYLON.Sound("bossVoiceDeath1", "sounds/Cavaliere_Angelo_sounds/Cav_Angelo_death_1_effects.mp3", scene, null, { loop: false, volume: 0.7 });
    const bossVoiceDeath2 = new BABYLON.Sound("bossVoiceDeath2", "sounds/Cavaliere_Angelo_sounds/Cav_Angelo_death_2_effects.mp3", scene, null, { loop: false, volume: 0.7 });
    //Chest opening sound (Dark Cloud sound)
    const chestOpeningSound = new BABYLON.Sound("chestOpeningSound", "sounds/chest_item.wav", scene, null, { loop: false, volume: 0.4 });

    //**ARRAY OF VECTOR3 TO KEEP THE POSITIONS AND ROTATIONS OF THE INITIAL T-POSES OF THE TWO CHARACTERS**
    const DWinitialTposePos = [];
    for(let i=0; i<skeleton.bones.length; i++) {
        var temp = skeleton.bones[i].position.clone();
        DWinitialTposePos.push(temp);
    }
    const DWinitialTposeRot = [];
    for(let i=0; i<skeleton.bones.length; i++) {
        var temp = skeleton.bones[i].rotation.clone();
        DWinitialTposeRot.push(temp);
    }
    const SKinitialTposePos = [];
    for(let i=0; i<skeleton2.bones.length; i++) {
        var temp = skeleton2.bones[i].position.clone();
        SKinitialTposePos.push(temp);
    }
    const SKinitialTposeRot = [];
    for(let i=0; i<skeleton2.bones.length; i++) {
        var temp = skeleton2.bones[i].rotation.clone();
        SKinitialTposeRot.push(temp);
    }

    //Since the fingers are open by default, I added these lines to close them (and basically I'll never move them again). Same for sheath and cape
    skeleton.bones[skeleton.getBoneIndexByName("fingers R")].rotation = new BABYLON.Vector3(0.0, 0.0, Math.PI/2.35);
    skeleton.bones[skeleton.getBoneIndexByName("fingers L")].rotation = new BABYLON.Vector3(0.0, 0.0, -Math.PI/6);
    skeleton2.bones[skeleton2.getBoneIndexByName("fingers R")].rotation = new BABYLON.Vector3(0.0, 0.0, Math.PI/2.35);
    skeleton2.bones[skeleton2.getBoneIndexByName("fingers L")].rotation = new BABYLON.Vector3(0.0, 0.0, -Math.PI/6);
    skeleton.bones[skeleton.getBoneIndexByName("sheath")].position = new BABYLON.Vector3(0.35, -0.7, 0.0);
    skeleton.bones[skeleton.getBoneIndexByName("sheath")].rotation = new BABYLON.Vector3(0.0, 0.0, 0.12);

    frameRate = engine.getFps();

    //**PER ABILITARE BLENDING TRA ANIMAZIONI**
    // Enable animation blending for all animations
    /*scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
    scene.animationPropertiesOverride.enableBlending = true;
    scene.animationPropertiesOverride.blendingSpeed = 0.05;
    scene.animationPropertiesOverride.loopMode = 1;*/
    
    //console.log("Animations", skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")].animations);

    //PLAYER AND BOSS GAMEPLAY PARAMETERS
    var playerHealth = 2000;
    var bossHealth = 12000;
    
    const playerLightDmg = 800;
    const playerHeavyDmg = 900;
    const bossLightDmg = 200;
    const bossHeavyDmg = 300;

    const playerMaxStamina = 200.0;
    var playerCurrStamina = playerMaxStamina;
    const lightAtckStaminaCost = 50.0;
    const heavyAtckStaminaCost = 75.0;
    const dodgeStaminaCost = 40.0;

    //ANIMATIONS INITIALIZATIONS
	//I declare a 10 elements static array for the "main" animation, so that deterministically the walk forward is in 0, the walk back is in 1, etc.
	skeleton.bones[skeleton.getBoneIndexByName("main")].animations = [null, null, null, null, null, null, null, null, null, null];

    playerIdleAnimation(skeleton, frameRate, DWinitialTposePos, DWinitialTposeRot);
    walkForward(skeleton, frameRate, DWinitialTposePos, DWinitialTposeRot);
    walkBack(skeleton, frameRate, DWinitialTposePos, DWinitialTposeRot);
    walkRight(skeleton, frameRate, DWinitialTposePos, DWinitialTposeRot);
    walkLeft(skeleton, frameRate, DWinitialTposePos, DWinitialTposeRot);
    rotateRight(skeleton, frameRate, DWinitialTposePos, DWinitialTposeRot);
    rotateLeft(skeleton, frameRate, DWinitialTposePos, DWinitialTposeRot);
    playerLightAttack(skeleton, frameRate, DWinitialTposePos, DWinitialTposeRot);
    playerHeavyAttack(skeleton, frameRate, DWinitialTposePos, DWinitialTposeRot);
    dodgeForward(skeleton, frameRate, DWinitialTposePos, DWinitialTposeRot);
    dodgeBack(skeleton, frameRate, DWinitialTposePos, DWinitialTposeRot);
    dodgeRight(skeleton, frameRate, DWinitialTposePos, DWinitialTposeRot);
    dodgeLeft(skeleton, frameRate, DWinitialTposePos, DWinitialTposeRot);
    playerDeath(skeleton, frameRate, DWinitialTposePos, DWinitialTposeRot);

    bossIdleAnimation(skeleton2, frameRate, SKinitialTposePos, SKinitialTposeRot);
    bossWalkForward(skeleton2, frameRate, SKinitialTposePos, SKinitialTposeRot);
    bossWalkBack(skeleton2, frameRate, SKinitialTposePos, SKinitialTposeRot);
    bossLightAttack(skeleton2, frameRate, SKinitialTposePos, SKinitialTposeRot);
    bossHeavyAttack(skeleton2, frameRate, SKinitialTposePos, SKinitialTposeRot);
    bossDeath(skeleton2, frameRate, SKinitialTposePos, SKinitialTposeRot);
    bossDeathVanishing(model2, frameRate);  //Boss disappearing animation after death

	mainForward(skeleton, frameRate);
	mainBack(skeleton, frameRate);
    mainRight(skeleton, frameRate);
    mainLeft(skeleton, frameRate);
    mainRightRot(skeleton, frameRate);
    mainLeftRot(skeleton, frameRate);
    mainDodgeFwd(skeleton, frameRate);
    mainDodgeBack(skeleton, frameRate);
    mainDodgeRight(skeleton, frameRate);
    mainDodgeLeft(skeleton, frameRate);
    
    chestMoonlight(chestSkeleton, moonlightSword, frameRate);

    //ANIMATIONS GROUPING
    //Player
    const idleAnimationGroup = groupIdle(skeleton);

    const walkFwdAnimationGroup = groupWalkFwd(skeleton);
    walkFwdAnimationGroup.speedRatio = 1.25;
    
    const walkBackAnimationGroup = groupWalkBack(skeleton);
    walkBackAnimationGroup.speedRatio = 1.25;

    const walkRightAnimationGroup = groupWalkRight(skeleton);
    walkRightAnimationGroup.speedRatio = 1.25;

    const walkLeftAnimationGroup = groupWalkLeft(skeleton);
    walkLeftAnimationGroup.speedRatio = 1.25;

    const rotateRightAnimationGroup = groupRotateRight(skeleton);
    
    const rotateLeftAnimationGroup = groupRotateLeft(skeleton);

    const playerLAttackAnimationGroup = groupPlayerLAttack(skeleton);

    const playerHAttackAnimationGroup = groupPlayerHAttack(skeleton);

    const dodgeFwdAnimationGroup = groupDodgeFwd(skeleton);

    const dodgeBackAnimationGroup = groupDodgeBack(skeleton);

    const dodgeRightAnimationGroup = groupDodgeRight(skeleton);

    const dodgeLeftAnimationGroup = groupDodgeLeft(skeleton);

    const playerDeathAnimationGroup = groupPlayerDeath(skeleton);

    //Boss
    const bossIdleAnimationGroup = groupBossIdle(skeleton2);

    const bossWalkFwdAnimationGroup = groupBossWalkFwd(skeleton2);
    bossWalkFwdAnimationGroup.speedRatio = 0.9;

    const bossWalkBackAnimationGroup = groupBossWalkBack(skeleton2);
    bossWalkBackAnimationGroup.speedRatio = 0.9;

    const bossLAttackAnimationGroup = groupBossLAttack(skeleton2);
    bossLAttackAnimationGroup.speedRatio = 0.9;

    const bossHAttackAnimationGroup = groupBossHAttack(skeleton2);

    const bossDeathAnimationGroup = groupBossDeath(skeleton2, model2);
    //bossDeathAnimationGroup.normalize(0, 3*frameRate);  //I normalize since the cape animation is longer than the others

    //Treasure chest (final prize)
    const chestAnimationGroup = groupChestMoonlight(chestSkeleton, moonlightSword);
    //chestAnimationGroup.normalize(0, 4*frameRate);

    //To make the boss always look at the player character (I CAN'T USE IT ON MAIN BONE BECAUSE IT MIRRORS THE MODEL FOR NO REASON)
    const bossLookAt = new BABYLON.BoneLookController(model2, skeleton2.bones[skeleton2.getBoneIndexByName("head")], skeleton.bones[skeleton.getBoneIndexByName("main")].position, {adjustPitch: -0.4, minYaw: -1.2, maxYaw: 1.2});

    var currAnimationGroup;
    var bossCurrAnimationGroup;
    currAnimationGroup = idleAnimationGroup;
    //currAnimationGroup = playerDeathAnimationGroup;
    currAnimationGroup.play(true);

    bossCurrAnimationGroup = bossIdleAnimationGroup;
    //bossCurrAnimationGroup = bossWalkFwdAnimationGroup;
    //bossCurrAnimationGroup = bossWalkBackAnimationGroup;
    //bossCurrAnimationGroup = bossLAttackAnimationGroup;
    //bossCurrAnimationGroup = bossHAttackAnimationGroup;
    //bossCurrAnimationGroup = bossDeathAnimationGroup;
    bossCurrAnimationGroup.play(true);
    //chestAnimationGroup.play(false);

    //button flags to detect multiple keys together (mainly for dodge commands)
    var wFlag = false;
    var sFlag = false;
    var dFlag = false;
    var aFlag = false;
    var eFlag = false;
    var qFlag = false;
	var clickLFlag = false;
	var clickRFlag = false;
    var spaceFlag = false;
    var pFlag = false;
    var animationIsPlaying = false;     //flag to understand if I'm holding down a walk button for more than one "tick"
	var mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[0]], 0, 11*frameRate/6, true);
	mainAnimatable.stop();	//"dummy" initialization to avoid initialization errors

    var playerDeathFlag = false;

    //PLAYER INPUT KEYS
    scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
            case BABYLON.KeyboardEventTypes.KEYDOWN:
                if(!playerDeathFlag) {      //non mi va di indentare tutto il blocco sotto
                switch (kbInfo.event.key) {
                    case "w":
                    case "W":
                        wFlag = true;
                        if(!animationIsPlaying && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying) {
                            currAnimationGroup.stop();
							mainAnimatable.stop();

                            currAnimationGroup = walkFwdAnimationGroup;
                            currAnimationGroup.play(true);

							mainForward(skeleton, frameRate);
                            //if(!playerHitbox.intersectsMesh(bossHitbox, true) && playerCanMove(playerFrontHitbox, arenaHitboxes)) {
							    mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[0]], 0, 11*frameRate/6, true);
                                mainAnimatable.speedRatio = 1.25;
                                //mainAnimatable.paused = false;
                            //}

							animationIsPlaying = true;
                        }
                    break;

                    case "s":
                    case "S":
                        sFlag = true;
                        if(!animationIsPlaying && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying) {
                            currAnimationGroup.stop();
							mainAnimatable.stop();

                            currAnimationGroup = walkBackAnimationGroup;
                            currAnimationGroup.play(true);

							mainBack(skeleton, frameRate);
                            //if(!playerHitbox.intersectsMesh(bossHitbox, true) && playerCanMove(playerBackHitbox, arenaHitboxes)) {
							    mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[1]], 0, 11*frameRate/6, true);
                                mainAnimatable.speedRatio = 1.25;
                            //}

							animationIsPlaying = true;
                        }
                    break;

                    case "a":
                    case "A":
                        aFlag = true;
                        if(!animationIsPlaying && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying) {
                            currAnimationGroup.stop();
							mainAnimatable.stop();

                            currAnimationGroup = walkLeftAnimationGroup;
                            currAnimationGroup.play(true);

							mainLeft(skeleton, frameRate);
                            //if(!playerHitbox.intersectsMesh(bossHitbox, true) && playerCanMove(playerLeftHitbox, arenaHitboxes)) {
							    mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[3]], 0, 11*frameRate/6, true);
                                mainAnimatable.speedRatio = 1.25;
                            //}

							animationIsPlaying = true;
                        }
                    break;

                    case "d":
                    case "D":
                        dFlag = true;
                        if(!animationIsPlaying && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying) {
                            currAnimationGroup.stop();
							mainAnimatable.stop();

                            currAnimationGroup = walkRightAnimationGroup;
                            currAnimationGroup.play(true);

							mainRight(skeleton, frameRate);
                            //if(!playerHitbox.intersectsMesh(bossHitbox, true) && playerCanMove(playerRightHitbox, arenaHitboxes)) {
							    mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[2]], 0, 11*frameRate/6, true);
                                mainAnimatable.speedRatio = 1.25;
                            //}

							animationIsPlaying = true;
                        }
                    break;

                    case "e":
                    case "E":
                        eFlag = true;
                        if(!animationIsPlaying && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying) {
                            currAnimationGroup.stop();
							mainAnimatable.stop();

                            currAnimationGroup = rotateRightAnimationGroup;
                            currAnimationGroup.play(true);

							mainRightRot(skeleton, frameRate);
							mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[4]], 0, 2*frameRate/3, true);
                            //mainAnimatable.speedRatio = 1.25;

							animationIsPlaying = true;
                        }
                    break;

                    case "q":
                    case "Q":
                        qFlag = true;
                        if(!animationIsPlaying && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying) {
                            currAnimationGroup.stop();
							mainAnimatable.stop();

                            currAnimationGroup = rotateLeftAnimationGroup;
                            currAnimationGroup.play(true);

							mainLeftRot(skeleton, frameRate);
							mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[5]], 0, 2*frameRate/3, true);
                            //mainAnimatable.speedRatio = 1.25;

							animationIsPlaying = true;
                        }
                    break;

                    case " ":
                        if(playerCurrStamina > 0) {     //non ho indentato il blocco sotto
                        if(wFlag && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying && !dodgeFwdAnimationGroup.isPlaying && !dodgeBackAnimationGroup.isPlaying && !dodgeRightAnimationGroup.isPlaying && !dodgeLeftAnimationGroup.isPlaying) {
                            currAnimationGroup.stop();
							mainAnimatable.stop();

                            currAnimationGroup = dodgeFwdAnimationGroup;
                            currAnimationGroup.play(false);

							mainDodgeFwd(skeleton, frameRate);
							mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[6]], 0, 5*frameRate/6, false);
                            //mainAnimatable.speedRatio = 1.25;

                            playerCurrStamina -= dodgeStaminaCost;

							animationIsPlaying = true;
                        }
                        else if(sFlag && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying && !dodgeFwdAnimationGroup.isPlaying && !dodgeBackAnimationGroup.isPlaying && !dodgeRightAnimationGroup.isPlaying && !dodgeLeftAnimationGroup.isPlaying) {
                            currAnimationGroup.stop();
							mainAnimatable.stop();

                            currAnimationGroup = dodgeBackAnimationGroup;
                            currAnimationGroup.play(false);

							mainDodgeBack(skeleton, frameRate);
							mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[7]], 0, 5*frameRate/6, false);
                            //mainAnimatable.speedRatio = 1.25;

                            playerCurrStamina -= dodgeStaminaCost;

							animationIsPlaying = true;
                        }
                        else if(dFlag && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying  && !dodgeFwdAnimationGroup.isPlaying && !dodgeBackAnimationGroup.isPlaying && !dodgeRightAnimationGroup.isPlaying && !dodgeLeftAnimationGroup.isPlaying) {
                            currAnimationGroup.stop();
							mainAnimatable.stop();

                            currAnimationGroup = dodgeRightAnimationGroup;
                            currAnimationGroup.play(false);

							mainDodgeRight(skeleton, frameRate);
							mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[8]], 0, 5*frameRate/6, false);
                            //mainAnimatable.speedRatio = 1.25;

                            playerCurrStamina -= dodgeStaminaCost;

							animationIsPlaying = true;
                        }
                        else if(aFlag && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying && !dodgeFwdAnimationGroup.isPlaying && !dodgeBackAnimationGroup.isPlaying && !dodgeRightAnimationGroup.isPlaying && !dodgeLeftAnimationGroup.isPlaying) {
                            currAnimationGroup.stop();
							mainAnimatable.stop();

                            currAnimationGroup = dodgeLeftAnimationGroup;
                            currAnimationGroup.play(false);

							mainDodgeLeft(skeleton, frameRate);
							mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[9]], 0, 5*frameRate/6, false);
                            //mainAnimatable.speedRatio = 1.25;

                            playerCurrStamina -= dodgeStaminaCost;

							animationIsPlaying = true;
                        }
                        spaceFlag = true;
                        }
                    break;
                }
                }
                //Debug mode (show all hitboxes)
                if(kbInfo.event.key == "p" || kbInfo.event.key == "P") {
                        if(pFlag==false) pFlag = true;
                        else pFlag = false;
                        debugMode(allHitboxes);
                        if(linkLine.isVisible == false) linkLine.isVisible = true;
                        else linkLine.isVisible = false;
                }
                console.log("KEY DOWN: ", kbInfo.event.code, " ", kbInfo.event.key);
            break;

            case BABYLON.KeyboardEventTypes.KEYUP:
                if(!playerDeathFlag) {      //non mi va di indentare tutto il blocco sotto
                switch (kbInfo.event.key) {
                   	case "w":
                    case "W":
   	        			wFlag = false;
       			        if(animationIsPlaying  && !dodgeFwdAnimationGroup.isPlaying && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying) {
           			        currAnimationGroup.stop();
							mainAnimatable.stop();
               	    		currAnimationGroup = idleAnimationGroup;
       	            		currAnimationGroup.play(true);
           	    	    	currAnimationGroup.reset();     //non mi ricordo perché ho messo questa istruzione
               		    	animationIsPlaying = false;
               			}
        			break;

					case "s":
                    case "S":
	        	        sFlag = false;
       			        if(animationIsPlaying && !dodgeBackAnimationGroup.isPlaying && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying) {
           			        currAnimationGroup.stop();
							mainAnimatable.stop();
               	    		currAnimationGroup = idleAnimationGroup;
       	            		currAnimationGroup.play(true);
           	    	    	currAnimationGroup.reset();     //non mi ricordo perché ho messo questa istruzione
               		    	animationIsPlaying = false;
               			}
        			break;

                    case "a":
                    case "A":
                        aFlag = false;
       			        if(animationIsPlaying && !dodgeLeftAnimationGroup.isPlaying && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying) {
           			        currAnimationGroup.stop();
							mainAnimatable.stop();
               	    		currAnimationGroup = idleAnimationGroup;
       	            		currAnimationGroup.play(true);
           	    	    	currAnimationGroup.reset();     //non mi ricordo perché ho messo questa istruzione
               		    	animationIsPlaying = false;
               			}
                    break;

                    case "d":
                    case "D":
	        	        dFlag = false;
       			        if(animationIsPlaying && !dodgeRightAnimationGroup.isPlaying && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying) {
           			        currAnimationGroup.stop();
							mainAnimatable.stop();
               	    		currAnimationGroup = idleAnimationGroup;
       	            		currAnimationGroup.play(true);
           	    	    	currAnimationGroup.reset();     //non mi ricordo perché ho messo questa istruzione
               		    	animationIsPlaying = false;
               			}
        			break;

                    case "e":
                    case "E":
	        	        eFlag = false;
       			        if(animationIsPlaying && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying) {
           			        currAnimationGroup.stop();
							mainAnimatable.stop();
               	    		currAnimationGroup = idleAnimationGroup;
       	            		currAnimationGroup.play(true);
           	    	    	currAnimationGroup.reset();     //non mi ricordo perché ho messo questa istruzione
               		    	animationIsPlaying = false;
               			}
        			break;

                    case "q":
                    case "Q":
	        	        qFlag = false;
       			        if(animationIsPlaying && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying) {
           			        currAnimationGroup.stop();
							mainAnimatable.stop();
               	    		currAnimationGroup = idleAnimationGroup;
       	            		currAnimationGroup.play(true);
           	    	    	currAnimationGroup.reset();     //non mi ricordo perché ho messo questa istruzione
               		    	animationIsPlaying = false;
               			}
        			break;
				}
                }
                console.log("KEY UP: ", kbInfo.event.code, " ", kbInfo.event.key);
			break;
        }
    });
    
    //ANIMATIONS EVENT LISTENERS (ATTACKS AND DODGES)
    //Player attack inputs
    document.addEventListener("click", (event) => {
        //"click" event is for left click
        if(!playerDeathFlag) {
            clickLFlag = true;
            if(playerCurrStamina > 0) {
                if(!playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying  && !dodgeFwdAnimationGroup.isPlaying && !dodgeBackAnimationGroup.isPlaying && !dodgeRightAnimationGroup.isPlaying && !dodgeLeftAnimationGroup.isPlaying) {
                    currAnimationGroup.stop();
		    	    mainAnimatable.stop();

                    currAnimationGroup = playerLAttackAnimationGroup;
                    currAnimationGroup.play(false);

                    playerCurrStamina -= lightAtckStaminaCost;

		    	    animationIsPlaying = true;
                }
            }
        }
    });
    document.addEventListener("contextmenu", (event) => {
        //"contextmenu" event is for right click
        if(!playerDeathFlag) {
            clickRFlag = true;
            if(playerCurrStamina > 0) {
                if(!playerHAttackAnimationGroup.isPlaying && !playerLAttackAnimationGroup.isPlaying  && !dodgeFwdAnimationGroup.isPlaying && !dodgeBackAnimationGroup.isPlaying && !dodgeRightAnimationGroup.isPlaying && !dodgeLeftAnimationGroup.isPlaying) {
                    currAnimationGroup.stop();
		    	    mainAnimatable.stop();

                    currAnimationGroup = playerHAttackAnimationGroup;
                    currAnimationGroup.play(false);

                    playerCurrStamina -= heavyAtckStaminaCost;

		    	    animationIsPlaying = true;
                }
            }
        }
    });

    //Player attack animations end events
    var playerSwordIntersecFlag = false;
    playerLAttackAnimationGroup.onAnimationGroupEndObservable.add(() => {
        if(!playerDeathFlag) {
            currAnimationGroup.stop();
		    //mainAnimatable.stop();
            currAnimationGroup = idleAnimationGroup;
       	    currAnimationGroup.play(true);
            currAnimationGroup.reset();     //non mi ricordo perché ho messo questa istruzione
            animationIsPlaying = false;
            clickLFlag = false;
            playerSwordIntersecFlag = false;
        }
    });
    playerHAttackAnimationGroup.onAnimationGroupEndObservable.add(() => {
        if(!playerDeathFlag) {
            currAnimationGroup.stop();
		    //mainAnimatable.stop();
            currAnimationGroup = idleAnimationGroup;
       	    currAnimationGroup.play(true);
            currAnimationGroup.reset();     //non mi ricordo perché ho messo questa istruzione
            animationIsPlaying = false;
            clickRFlag = false;
            playerSwordIntersecFlag = false;
        }
    });

    //Boss attack animation end events
    var bossSwordIntersecFlag = false;
    bossLAttackAnimationGroup.onAnimationGroupEndObservable.add(() => {
        bossSwordIntersecFlag = false;
    });
    bossHAttackAnimationGroup.onAnimationGroupEndObservable.add(() => {
        bossSwordIntersecFlag = false;
    });

    //Player dodge animations end events
    dodgeFwdAnimationGroup.onAnimationGroupEndObservable.add(() => {
        //playerIsDodgingFlag = false;
        if(!playerDeathFlag) {
            currAnimationGroup.stop();
		    mainAnimatable.stop();
            if(!wFlag) {
                currAnimationGroup = idleAnimationGroup;
                currAnimationGroup.play(true);
                currAnimationGroup.reset();     //non mi ricordo perché ho messo questa istruzione
                animationIsPlaying = false;
            }
            else {
                currAnimationGroup = walkFwdAnimationGroup;
                currAnimationGroup.play(true);
		    	mainForward(skeleton, frameRate);
		    	mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[0]], 0, 11*frameRate/6, true);
                mainAnimatable.speedRatio = 1.25;
            }
        }
    });
    dodgeBackAnimationGroup.onAnimationGroupEndObservable.add(() => {
        //playerIsDodgingFlag = false;
        if(!playerDeathFlag) {
            currAnimationGroup.stop();
		    mainAnimatable.stop();
            if(!sFlag) {
                currAnimationGroup = idleAnimationGroup;
                currAnimationGroup.play(true);
                currAnimationGroup.reset();     //non mi ricordo perché ho messo questa istruzione
                animationIsPlaying = false;
            }
            else {
                currAnimationGroup = walkBackAnimationGroup;
                currAnimationGroup.play(true);
		    	mainBack(skeleton, frameRate);
		    	mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[1]], 0, 11*frameRate/6, true);
                mainAnimatable.speedRatio = 1.25;
            }
        }
    });
    dodgeRightAnimationGroup.onAnimationGroupEndObservable.add(() => {
        //playerIsDodgingFlag = false;
        if(!playerDeathFlag) {
            currAnimationGroup.stop();
		    mainAnimatable.stop();
            if(!dFlag) {
                currAnimationGroup = idleAnimationGroup;
                currAnimationGroup.play(true);
                currAnimationGroup.reset();     //non mi ricordo perché ho messo questa istruzione
                animationIsPlaying = false;
            }
            else {
                currAnimationGroup = walkRightAnimationGroup;
                currAnimationGroup.play(true);
		    	mainRight(skeleton, frameRate);
		    	mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[2]], 0, 11*frameRate/6, true);
                mainAnimatable.speedRatio = 1.25;
            }
        }
    });
    dodgeLeftAnimationGroup.onAnimationGroupEndObservable.add(() => {
        //playerIsDodgingFlag = false;
        if(!playerDeathFlag) {
            currAnimationGroup.stop();
		    mainAnimatable.stop();
            if(!aFlag) {
                currAnimationGroup = idleAnimationGroup;
                currAnimationGroup.play(true);
                currAnimationGroup.reset();     //non mi ricordo perché ho messo questa istruzione
                animationIsPlaying = false;
            }
            else {
                currAnimationGroup = walkLeftAnimationGroup;
                currAnimationGroup.play(true);
		    	mainLeft(skeleton, frameRate);
		    	mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[3]], 0, 11*frameRate/6, true);
                mainAnimatable.speedRatio = 1.25;
            }
        }
    });

    //I add a listener for every frame of the attack animation in which I want to check the damage
    //Player hit on boss events
    for(let i=frameRate/2; i<5*frameRate/6; i++) {
        const playerLAttackHitEvent = new BABYLON.AnimationEvent(
            i,
            function () {
                if(!playerSwordIntersecFlag) {
                    if (playerSwordHitbox.intersectsMesh(bossHitbox, true)) {
                        var soundRNG = Math.random();
                        if(soundRNG<=0.5) playerLightHit1.play();
                        else playerLightHit2.play();
                        playerSwordIntersecFlag = true; //I use this flag to detect that the intesection is computed only once per attack
                        bossHealth -= playerLightDmg;
                    }
                }
            },
            true,
        );
        //Since I can't attach an event to an animation group, I attach it to the right upper arm animation
        skeleton.bones[skeleton.getBoneIndexByName("upper_arm R")].animations[7].addEvent(playerLAttackHitEvent);
    }
    for(let i=3*frameRate/2; i<11*frameRate/6; i++) {
        const playerHAttackHitEvent = new BABYLON.AnimationEvent(
            i,
            function () {
                if(!playerSwordIntersecFlag) {
                    if (playerSwordHitbox.intersectsMesh(bossHitbox, true)) {
                        var soundRNG = Math.random();
                        if(soundRNG<=0.5) playerHeavyHit1.play();
                        else playerHeavyHit2.play();
                        playerSwordIntersecFlag = true;
                        bossHealth -= playerHeavyDmg;
                    }
                }
            },
            true,
        );
        //Since I can't attach an event to an animation group, I attach it to the right lower arm animation
        skeleton.bones[skeleton.getBoneIndexByName("lower_arm R")].animations[8].addEvent(playerHAttackHitEvent);
    }

    //Boss hit on player events
    var playerIsDodgingFlag = false;    //invulnerability flag (during dodge)
    for(let i=frameRate/2; i<5*frameRate/6; i++) {
        const bossLAttackHitEvent = new BABYLON.AnimationEvent(
            i,
            function () {
                if(!bossSwordIntersecFlag) {
                    if (bossSwordHitbox.intersectsMesh(playerHitbox, true) && !playerIsDodgingFlag) {
                        var soundRNG = Math.random();
                        if(soundRNG<=0.5) bossSwordHit1.play();
                        else bossSwordHit2.play();
                        bossSwordIntersecFlag = true; //I use this flag to detect that the intesection is computed only once per attack
                        playerHealth -= bossLightDmg;
                    }
                }
            },
            true,
        );
        //Since I can't attach an event to an animation group, I attach it to the right upper arm animation
        skeleton2.bones[skeleton2.getBoneIndexByName("upper_arm R")].animations[3].addEvent(bossLAttackHitEvent);
    }
    for(let i=frameRate; i<3*frameRate/2; i++) {
        const bossHAttackHitEvent = new BABYLON.AnimationEvent(
            i,
            function () {
                if(!bossSwordIntersecFlag) {
                    if (bossSwordHitbox.intersectsMesh(playerHitbox, true) && !playerIsDodgingFlag) {
                        var soundRNG = Math.random();
                        if(soundRNG<=0.5) bossSwordHit1.play();
                        else bossSwordHit2.play();
                        bossSwordIntersecFlag = true;
                        playerHealth -= bossHeavyDmg;
                    }
                }
            },
            true,
        );
        //Since I can't attach an event to an animation group, I attach it to the right lower arm animation
        skeleton2.bones[skeleton2.getBoneIndexByName("lower_arm R")].animations[4].addEvent(bossHAttackHitEvent);
    }

    //Player dodge invulnerability frames events (40 frames of invunerability at 60 fps)
    //(Dodge forward)
    const dodgeFwdStartEvent = new BABYLON.AnimationEvent(
        1*frameRate/12,     //from frame 5
        function () {
            playerIsDodgingFlag = true;
        },
        true,
    );
    skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[19].addEvent(dodgeFwdStartEvent);
    const dodgeFwdEndEvent = new BABYLON.AnimationEvent(
        3*frameRate/4,    //to frame 45
        function () {
            playerIsDodgingFlag = false;
        },
        true,
    );
    skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[19].addEvent(dodgeFwdEndEvent);

    //(Dodge back)
    const dodgeBackStartEvent = new BABYLON.AnimationEvent(
        1*frameRate/12,
        function () {
            playerIsDodgingFlag = true;
        },
        true,
    );
    skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[21].addEvent(dodgeBackStartEvent);
    const dodgeBackEndEvent = new BABYLON.AnimationEvent(
        3*frameRate/4,
        function () {
            playerIsDodgingFlag = false;
        },
        true,
    );
    skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[21].addEvent(dodgeBackEndEvent);

    //(Dodge right)
    const dodgeRightStartEvent = new BABYLON.AnimationEvent(
        1*frameRate/12,
        function () {
            playerIsDodgingFlag = true;
        },
        true,
    );
    skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[23].addEvent(dodgeRightStartEvent);
    const dodgeRightEndEvent = new BABYLON.AnimationEvent(
        3*frameRate/4,
        function () {
            playerIsDodgingFlag = false;
        },
        true,
    );
    skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[23].addEvent(dodgeRightEndEvent);

    //(Dodge left)
    const dodgeLeftStartEvent = new BABYLON.AnimationEvent(
        1*frameRate/12,
        function () {
            playerIsDodgingFlag = true;
        },
        true,
    );
    skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[25].addEvent(dodgeLeftStartEvent);
    const dodgeLeftEndEvent = new BABYLON.AnimationEvent(
        3*frameRate/4,
        function () {
            playerIsDodgingFlag = false;
        },
        true,
    );
    skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[25].addEvent(dodgeLeftEndEvent);

    //Boss disappearing after death (I remove his mesh, skeleton and hitboxes)
    bossDeathAnimationGroup.onAnimationGroupEndObservable.add(() => {
        scene.removeMesh(bossHitbox);
        scene.removeMesh(bossSwordHitbox);
        scene.removeSkeleton(skeleton2);
        scene.removeMesh(model2);
        //Treasure chest appears
        arenaHitboxes.push(chestHitbox);
        zeldaChest.isVisible = true;
        moonlightSword.isVisible = true;
    });

    //SOUND EFFECTS ANIMATION EVENTS
    //(I added a bit of randomness in the sounds so that they are not annoying)
    //Swings and hits
    const playerLightSwingEvent = new BABYLON.AnimationEvent(
        7*frameRate/12,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=0.5) playerLightSwing1.play();
            else playerLightSwing2.play();
        },
        true,
    );
    skeleton.bones[skeleton.getBoneIndexByName("palm R")].animations[1].addEvent(playerLightSwingEvent);

    const playerHeavySwingEvent = new BABYLON.AnimationEvent(
        3*frameRate/2,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=0.5) playerHeavySwing1.play();
            else playerHeavySwing2.play();
        },
        true,
    );
    skeleton.bones[skeleton.getBoneIndexByName("palm R")].animations[2].addEvent(playerHeavySwingEvent);

    const bossLightSwingEvent = new BABYLON.AnimationEvent(
        7*frameRate/12,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=0.5) bossSwordSwing1.play();
            else bossSwordSwing2.play();
        },
        true,
    );
    skeleton2.bones[skeleton2.getBoneIndexByName("palm R")].animations[3].addEvent(bossLightSwingEvent);

    const bossHeavySwingEvent = new BABYLON.AnimationEvent(
        7*frameRate/6,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=0.5) bossSwordSwing1.play();
            else bossSwordSwing2.play();
        },
        true,
    );
    skeleton2.bones[skeleton2.getBoneIndexByName("palm R")].animations[4].addEvent(bossHeavySwingEvent);

    //Footsteps
    const playerFootstepEvent1 = new BABYLON.AnimationEvent(
        7*frameRate/12,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=1/3) playerFootstep1.play();
            else if(soundRNG>1/3 && soundRNG<=2/3) playerFootstep2.play();
            else playerFootstep3.play();
        },
        false,
    );
    skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[1].addEvent(playerFootstepEvent1);
    skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[2].addEvent(playerFootstepEvent1);
    skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[3].addEvent(playerFootstepEvent1);
    skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[4].addEvent(playerFootstepEvent1);
    const playerFootstepEvent2 = new BABYLON.AnimationEvent(
        3*frameRate/2,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=1/3) playerFootstep1.play();
            else if(soundRNG>1/3 && soundRNG<=2/3) playerFootstep2.play();
            else playerFootstep3.play();
        },
        false,
    );
    skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[1].addEvent(playerFootstepEvent2);
    skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[2].addEvent(playerFootstepEvent2);
    skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[3].addEvent(playerFootstepEvent2);
    skeleton.bones[skeleton.getBoneIndexByName("upper_leg L")].animations[4].addEvent(playerFootstepEvent2);

    const playerDodgeSoundEvent = new BABYLON.AnimationEvent(
        2*frameRate/3,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=0.5) dodgeSound1.play();
            else dodgeSound2.play();
        },
        true,
    );
    skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")].animations[9].addEvent(playerDodgeSoundEvent);
    skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")].animations[10].addEvent(playerDodgeSoundEvent);
    skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")].animations[11].addEvent(playerDodgeSoundEvent);
    skeleton.bones[skeleton.getBoneIndexByName("lower_leg L")].animations[12].addEvent(playerDodgeSoundEvent);

    const bossFootstepEvent1 = new BABYLON.AnimationEvent(
        7*frameRate/12,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=0.5) bossFootstep1.play();
            else bossFootstep2.play();
        },
        false,
    );
    skeleton2.bones[skeleton2.getBoneIndexByName("upper_leg L")].animations[1].addEvent(bossFootstepEvent1);
    skeleton2.bones[skeleton2.getBoneIndexByName("upper_leg L")].animations[2].addEvent(bossFootstepEvent1);
    const bossFootstepEvent2 = new BABYLON.AnimationEvent(
        3*frameRate/2,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=0.5) bossFootstep1.play();
            else bossFootstep2.play();
        },
        false,
    );
    skeleton2.bones[skeleton2.getBoneIndexByName("upper_leg L")].animations[1].addEvent(bossFootstepEvent2);
    skeleton2.bones[skeleton2.getBoneIndexByName("upper_leg L")].animations[2].addEvent(bossFootstepEvent2);

    //Boss screams and death sound
    const bossLightScreamEvent = new BABYLON.AnimationEvent(
        2*frameRate/3,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=1/3) bossVoiceLightHit1.play();
            else if(soundRNG>1/3 && soundRNG<=2/3) bossVoiceLightHit2.play();
            //else don't play anything (in this way it is not too annoying)
        },
        true,
    );
    skeleton2.bones[skeleton2.getBoneIndexByName("chest")].animations[7].addEvent(bossLightScreamEvent);
    const bossHeavyScreamEvent = new BABYLON.AnimationEvent(
        3*frameRate/4,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=1/3) bossVoiceHeavyHit1.play();
            else if(soundRNG>1/3 && soundRNG<=2/3) bossVoiceHeavyHit2.play();
            //else don't play anything (in this way it is not too annoying)
        },
        true,
    );
    skeleton2.bones[skeleton2.getBoneIndexByName("chest")].animations[9].addEvent(bossHeavyScreamEvent);

    const bossDeathScreamEvent = new BABYLON.AnimationEvent(
        0,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=0.5) bossVoiceDeath1.play();
            else bossVoiceDeath2.play();
        },
        true,
    );
    skeleton2.bones[skeleton2.getBoneIndexByName("chest")].animations[11].addEvent(bossDeathScreamEvent);


    //BOSS AI (USING "registerBeforeRender")
    //Flags for boss's behaviour
    //var bossIsClose = false;    //I use comparison with distance instead
    var bossIdleFlag = false;
    //var bossWalkFwdFlag = false;
    //var bossWalkBackFlag = false;
    //var bossAttackFlag = false;
    var bossDeathFlag = false;
    var bossPauseDuration = -1;    //I inserted some random pauses of the boss to give breath to the player
    var playerDeathAnim = true;
    var bossDeathAnim = true;
    var victoryFlag = false;
    var playerHasOpenedChest = false;

    var stuckCount = 4*frameRate;   //when boss get stuck for too long (4 seconds), I update its location arbitrarily
    
    //I update boss rotation and position at every frame, depending on the player position
	scene.registerBeforeRender(function () {
        //Essential part added not to let the player walk through the boss and through walls
        if(wFlag) {
            if((playerFrontHitbox.intersectsMesh(bossHitbox, true) && !bossDeathFlag) || !playerCanMove(playerFrontHitbox, arenaHitboxes)) {
                mainAnimatable.pause();
            }
            else if (!playerFrontHitbox.intersectsMesh(bossHitbox, true) && (playerCanMove(playerBackHitbox, arenaHitboxes) && playerCanMove(playerLeftHitbox, arenaHitboxes) && playerCanMove(playerRightHitbox, arenaHitboxes)) && mainAnimatable._paused) {
                mainAnimatable.restart();
            }
        }

        if(sFlag) {
            if ((playerBackHitbox.intersectsMesh(bossHitbox, true) && !bossDeathFlag) || !playerCanMove(playerBackHitbox, arenaHitboxes)) {
                mainAnimatable.pause();
            }
            else if (!playerBackHitbox.intersectsMesh(bossHitbox, true) && (playerCanMove(playerFrontHitbox, arenaHitboxes) && playerCanMove(playerLeftHitbox, arenaHitboxes) && playerCanMove(playerRightHitbox, arenaHitboxes)) && mainAnimatable._paused) {
                mainAnimatable.restart();
            }
        }

        if(aFlag) {
            if ((playerLeftHitbox.intersectsMesh(bossHitbox, true) && !bossDeathFlag) || !playerCanMove(playerLeftHitbox, arenaHitboxes)) {
                mainAnimatable.pause();
            }
            else if (!playerLeftHitbox.intersectsMesh(bossHitbox, true) && (playerCanMove(playerFrontHitbox, arenaHitboxes) && playerCanMove(playerBackHitbox, arenaHitboxes) && playerCanMove(playerRightHitbox, arenaHitboxes)) && mainAnimatable._paused) {
                mainAnimatable.restart();
            }
        }

        if(dFlag) {
            if ((playerRightHitbox.intersectsMesh(bossHitbox, true) && !bossDeathFlag) || !playerCanMove(playerRightHitbox, arenaHitboxes)) {
                mainAnimatable.pause();
            }
            else if (!playerRightHitbox.intersectsMesh(bossHitbox, true) && (playerCanMove(playerFrontHitbox, arenaHitboxes) && playerCanMove(playerBackHitbox, arenaHitboxes) && playerCanMove(playerLeftHitbox, arenaHitboxes)) && mainAnimatable._paused) {
            mainAnimatable.restart();
            }
        }
        //^^^
        
        //console.log(playerCurrStamina);
        if(bossHealth<=0) bossDeathFlag = true;

        if(playerHealth<=0) playerDeathFlag = true;

        if(!bossDeathFlag && !playerDeathFlag) {    //boss is alive
            bossLookAt.update();
            //console.log(bossHealth);
            var playerMainPos = skeleton.bones[skeleton.getBoneIndexByName("main")].position;
            var bossMainRot = skeleton2.bones[skeleton2.getBoneIndexByName("main")].rotation;
            var bossMainPos = skeleton2.bones[skeleton2.getBoneIndexByName("main")].position;

            const dist = cartesianDistance(bossMainPos, playerMainPos);
            //Handle the rotation
            const playerXInBossLocal = playerMainPos.x - bossMainPos.x;     //player position in boss local coordinates (to determine when the arccosine inverts)
            const playerZInBossLocal = playerMainPos.z - bossMainPos.z;
            //const tempCosine = playerMainPos.z/dist;
            //const bossNewYRot = Math.acos(playerMainPos.z/dist);    //z/dist=cos(alfa)
            const bossNewYRot = Math.acos(playerZInBossLocal/dist);
            //const bossNewYRot = Math.atan2(playerMainPos.x, playerMainPos.z);
            
            if(!bossLAttackAnimationGroup.isPlaying && !bossHAttackAnimationGroup.isPlaying) {
                if(playerXInBossLocal > 0) {
                    skeleton2.bones[skeleton2.getBoneIndexByName("main")].rotation = new BABYLON.Vector3(bossMainRot.x, bossNewYRot, bossMainRot.z);
                }
                else {
                    skeleton2.bones[skeleton2.getBoneIndexByName("main")].rotation = new BABYLON.Vector3(bossMainRot.x, -bossNewYRot, bossMainRot.z);
                }
            }
        
            //Linking line between boss and player
            if(linkLine != null) scene.removeMesh(linkLine);    //to not slow down the engine while drawing a line per frame
            var tempMain = new BABYLON.Vector3(bossMainPos.x+0.35, bossMainPos.y, bossMainPos.z+0.35);
            linkLine = BABYLON.MeshBuilder.CreateLines("linkLine", {colors: [new BABYLON.Color4(1.0, 1.0, 1.0, 1.0), new BABYLON.Color4(1.0, 1.0, 1.0, 1.0)], points: [tempMain, playerMainPos]}, scene);
            if(!pFlag) linkLine.isVisible = false;
            else linkLine.isVisible = true;

            //Handle the position
            if(!bossIdleFlag && bossPauseDuration == -1) {  //check if boss is not in pause
                if(!bossLAttackAnimationGroup.isPlaying && !bossHAttackAnimationGroup.isPlaying) {
                    //I put the number generation when the boss is not attacking otherwise it was too fast and the probability of "pause" interval was too high
                    var rng = Math.random();    //I didn't use a cryptographically secure RNG, just because the application didn't need that degree of security
                    //console.log(rng);
                }
                
                if(dist > 2.4) {
                    if(!bossLAttackAnimationGroup.isPlaying && !bossHAttackAnimationGroup.isPlaying) {
                        //bossIdleFlag = false;
                        var xMovement = 0.022*Math.sin(bossNewYRot);    //the boss is a bit slower than the player (0.022 movement per frame against 0.03 of the player)
                        var zMovement = 0.022*Math.cos(bossNewYRot);
                        if(bossCanChase(bossHitbox, linkLine, arenaHitboxes)) {
                            stuckCount = 4*frameRate;
                            if(!bossWalkFwdAnimationGroup.isPlaying) {
                                bossCurrAnimationGroup.reset();
                                bossCurrAnimationGroup.stop();
                                bossCurrAnimationGroup = bossWalkFwdAnimationGroup;
                                bossCurrAnimationGroup.play(true);
                            }

                            if(playerXInBossLocal > 0)
                                skeleton2.bones[skeleton2.getBoneIndexByName("main")].position = new BABYLON.Vector3(bossMainPos.x+xMovement, bossMainPos.y, bossMainPos.z+zMovement);
                            else
                                skeleton2.bones[skeleton2.getBoneIndexByName("main")].position = new BABYLON.Vector3(bossMainPos.x-xMovement, bossMainPos.y, bossMainPos.z+zMovement);
                        }
                        else {
                            if(!bossIdleAnimationGroup.isPlaying) {
                                bossCurrAnimationGroup.reset();
                                bossCurrAnimationGroup.stop();
                                bossCurrAnimationGroup = bossIdleAnimationGroup;
                                bossCurrAnimationGroup.play(true);
                            }

                            stuckCount--;
                            if(stuckCount <= 0) {
                                if(playerXInBossLocal > 0)
                                    skeleton2.bones[skeleton2.getBoneIndexByName("main")].position = new BABYLON.Vector3(bossMainPos.x+xMovement-1.0, bossMainPos.y, bossMainPos.z+zMovement-1.0);
                                else
                                    skeleton2.bones[skeleton2.getBoneIndexByName("main")].position = new BABYLON.Vector3(bossMainPos.x-xMovement+1.0, bossMainPos.y, bossMainPos.z+zMovement-1.0);
                            }
                        }
                    }
                }
                else if (dist <=2.4 && dist > 2.2) {  //here boss is close and can attack choosing randomly from his attacks animations (or pause for 3 seconds)
                    //if(!bossIdleFlag && bossPauseDuration == -1) {
                    if (rng < 1/6) {
                        bossIdleFlag = true;
                        bossPauseDuration = 3*frameRate;
                        if(!bossLAttackAnimationGroup.isPlaying && !bossHAttackAnimationGroup.isPlaying) {
                            bossCurrAnimationGroup.reset();
                            bossCurrAnimationGroup.stop();
                            bossCurrAnimationGroup = bossIdleAnimationGroup;
                            bossCurrAnimationGroup.play(true);
                        }
                    }
                    else if(rng >= 1/6 && rng < 3/4) {  //light attack is a bit more probable than the heavy one
                        if(!bossLAttackAnimationGroup.isPlaying && !bossHAttackAnimationGroup.isPlaying) {
                            bossCurrAnimationGroup.reset();
                            bossCurrAnimationGroup.stop();
                            bossCurrAnimationGroup = bossLAttackAnimationGroup;
                            bossCurrAnimationGroup.play(false);
                        }
                    }
                    else {   //rng >= 3/4 && rng < 1.0
                        if(!bossLAttackAnimationGroup.isPlaying && !bossHAttackAnimationGroup.isPlaying) {
                            bossCurrAnimationGroup.reset();
                            bossCurrAnimationGroup.stop();
                            bossCurrAnimationGroup = bossHAttackAnimationGroup;
                            bossCurrAnimationGroup.play(false);
                        }
                    }
                }
                else {      //if boss is too close, he does some steps back
                    if(!bossLAttackAnimationGroup.isPlaying && !bossHAttackAnimationGroup.isPlaying) {
                        //bossIdleFlag = false;
                        var xMovement = 0.022*Math.sin(bossNewYRot);    //the boss is a bit slower than the player (0.022 movement per frame against 0.03 of the player)
                        var zMovement = 0.022*Math.cos(bossNewYRot);
                        if(bossCanChase(bossHitbox, linkLine, arenaHitboxes)) {     //he goes back only if he doesn't get stuck in a wall or column
                            stuckCount = 4*frameRate;
                            if(!bossWalkBackAnimationGroup.isPlaying) {
                                bossCurrAnimationGroup.reset();
                                bossCurrAnimationGroup.stop();
                                bossCurrAnimationGroup = bossWalkBackAnimationGroup;
                                bossCurrAnimationGroup.play(true);
                            }

                            if(playerXInBossLocal > 0)
                                skeleton2.bones[skeleton2.getBoneIndexByName("main")].position = new BABYLON.Vector3(bossMainPos.x-xMovement, bossMainPos.y, bossMainPos.z-zMovement);
                            else
                                skeleton2.bones[skeleton2.getBoneIndexByName("main")].position = new BABYLON.Vector3(bossMainPos.x+xMovement, bossMainPos.y, bossMainPos.z-zMovement);
                        }
                        else {
                            //here I don't stop the walk back animation, just a choice of taste
                            stuckCount--;
                            if(stuckCount <= 0) {
                                if(playerXInBossLocal > 0)
                                    skeleton2.bones[skeleton2.getBoneIndexByName("main")].position = new BABYLON.Vector3(bossMainPos.x-xMovement+3.0, bossMainPos.y, bossMainPos.z-zMovement+3.0);
                                else
                                    skeleton2.bones[skeleton2.getBoneIndexByName("main")].position = new BABYLON.Vector3(bossMainPos.x+xMovement-3.0, bossMainPos.y, bossMainPos.z-zMovement+3.0);
                            }
                        }
                    }
                }
            }
            else {  //here boss is in pause and is in idle for 3 seconds
                if(!bossLAttackAnimationGroup.isPlaying && !bossHAttackAnimationGroup.isPlaying) {  //not necessary check
                    //bossCurrAnimationGroup.stop();
                    //bossCurrAnimationGroup = bossIdleAnimationGroup;
                    //bossCurrAnimationGroup.play(true);
                    //console.log(bossPauseDuration);
                    bossPauseDuration--;    //I use "registerBeforeRender" as it would be a while loop
                    if(bossPauseDuration <= 0) {
                        bossPauseDuration = -1; //here the pause ends
                        bossIdleFlag = false;
                    }
                }
            }
        }
        else if(!bossDeathFlag && playerDeathFlag) {    //player has died, boss stops attacking
            if(!bossIdleAnimationGroup.isPlaying && !bossLAttackAnimationGroup.isPlaying && !bossHAttackAnimationGroup.isPlaying) {
                bossCurrAnimationGroup.reset();
                bossCurrAnimationGroup.stop();
                bossCurrAnimationGroup = bossIdleAnimationGroup;
                bossCurrAnimationGroup.play(true);
            }
        }
        else if(bossDeathFlag && !playerDeathFlag) {   //boss is dead, play boss's death animation
            //console.log(bossDeathAnim, bossDeathFlag);
            //console.log("is playing idle", bossIdleFlag);
            if(!bossDeathAnimationGroup.isPlaying && bossDeathAnim) {
                bossCurrAnimationGroup.reset();
                bossCurrAnimationGroup.stop();
                bossCurrAnimationGroup = bossDeathAnimationGroup;
                bossCurrAnimationGroup.play(false);
                soundtrack.setVolume(0.0, 3.0); //dissolve music towards mute then stop
                //soundtrack.stop();
                victoryMusic.play(5.0);
                bossDeathAnim = false;
                victoryFlag = true;
            }
        }

        //player has died, play player's death animation
        if(playerDeathFlag) {
            if(playerDeathAnim && !playerDeathAnimationGroup.isPlaying) {      //controllo superfluo
                currAnimationGroup.reset();
                currAnimationGroup.stop();
                mainAnimatable.stop();
                currAnimationGroup = playerDeathAnimationGroup;
                currAnimationGroup.play(false);
                //soundtrack.stop();
                soundtrack.setVolume(0.0, 1.0); //dissolve music towards mute then stop
                failureMusic.play(1.0);
                playerDeathAnim = false;
            }
        }
        else {
            if(playerCurrStamina < playerMaxStamina && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying) 
                //I made stamina recovery frame rate dependant to guarantee always the same amount of regenaration regardless of the frame rate
                playerCurrStamina += frameRate/90;   //more or less 40 stamina recovery per second (at 60 fps)
        }

        //player won, show the chest with the prize
        if(victoryFlag) {
            if(!playerHasOpenedChest && playerFrontHitbox.intersectsMesh(chestHitbox, false) && !chestAnimationGroup.isPlaying) {
                chestAnimationGroup.play(false);
                moonlightLight.setEnabled(true);
                moonlightLight2.setEnabled(true);
                chestOpeningSound.play(1.0);
                playerHasOpenedChest = true;
            }
        }

        if(chestOpeningSound.isPlaying && victoryMusic.isPlaying) victoryMusic.setVolume(0.1);
        else victoryMusic.setVolume(0.3);

        //AGGIUNGERE PREMIO FINALE CON SCRIGNO

        //AGGIUNGERE GUI/HUD (vita, stamina, vita del boss)
	});

    return scene;
};

createScene().then(function(scene) {
    engine.runRenderLoop(function () {
        scene.render();
        frameRate = engine.getFps();
});
});
//const scene = createScene(); //Call the createScene function
// Register a render loop to repeatedly render the scene
/*engine.runRenderLoop(function () {
        scene.render();
});*/
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});

//Per ricaricare pagina: location.reload();