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

    //**CAMERA**
    const debugCamera = new BABYLON.FreeCamera("debugCamera", new BABYLON.Vector3(0.0, 2.0, 0.0), scene, true);
    //const debugCamera = new BABYLON.ArcRotateCamera("debugCamera", -Math.PI / 2, Math.PI / 2.5, 6, new BABYLON.Vector3(0.0, 0.0, 0.0));
    debugCamera.attachControl(canvas, true);
    //debugCamera.wheelPrecision = 100;
    debugCamera.minZ = 0.01;
    debugCamera.inertia = 0.5;
    const camera = new BABYLON.FollowCamera("followCam", new BABYLON.Vector3(20.0, 3.0, 0.0), scene);
    camera.radius = 6.2;
    camera.heightOffset = 1.2;
    camera.rotationOffset = 180.0;
    camera.cameraAcceleration = 0.07;
    camera.maxCameraSpeed = 10.0;
    //camera.attachControl(canvas, true);
    scene.activeCamera = camera;

    //**NO FOG EFFECT IN LOW SPEC MODE**
    //scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);
    /*scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
    scene.fogDensity = 0.006;
    scene.fogColor = new BABYLON.Color3(0.45, 0.4, 0.35);*/

    //**LIGHTS SETTING**
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

    //**GROUND AND SKYBOX**
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

    //I HAD TO CONVERT TO .BABYLON FORMAT BECAUSE .OBJ DOESN'T HAVE SKELETON
    //**MODELS IMPORTATION**
    //Player model (darkwraith)
    var model;
    var skeleton;
    //I use asynchronous function with "await" to avoid the lost of reference to "model" and "skeleton" and to improve mesh loading
    const result = await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/Darkwraith_fin2/", "c2390.babylon", scene);
    model = result.meshes[0];
    skeleton = result.skeletons[0];
    //model.receiveShadows = true;  //NO SHADOWS IN LOW SPEC MODE
    //model.checkCollisions = true;
    model.alwaysSelectAsActiveMesh = true;
    for (let i=0; i<model.material.subMaterials.length; i++) 
        model.material.subMaterials[i].maxSimultaneousLights = 6;

    skeleton.bones[skeleton.getBoneIndexByName("main")].position = new BABYLON.Vector3(20.0, 0.0, 0.0);
	skeleton.bones[skeleton.getBoneIndexByName("main")].rotation = new BABYLON.Vector3(0.0, -Math.PI/2, 0.0);
    skeleton.bones[skeleton.getBoneIndexByName("main")].scaling.x *= -1.0;  //to solve the mirrored imported model (the angles will be computed as opposite)
    console.log(skeleton.bones);

    //****REMINDER FOR BONES NAMES****
    //main  chest  neck  head  
    //shoulder L  upper_arm L  lower_arm L  palm L  thumb L  fingers L  upper_leg L  lower_leg L  foot L 
    //shoulder R  upper_arm R  lower_arm R  palm R  thumb R  fingers R  upper_leg R  lower_leg R  foot R  
    //sword  sheath(only for darkwraith)  cape(only for silver knight)
    
    //Boss model (silver knight)
    var model2;
    var skeleton2;
    const result2 = await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/Silver_Knight_fin2/", "c2410.babylon", scene);
    model2 = result2.meshes[0];
    skeleton2 = result2.skeletons[0];
    //model2.receiveShadows = true; //NO SHADOWS IN LOW SPEC MODE
    //model2.checkCollisions = true;

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
    //cathedral.receiveShadows = true;  //NO SHADOWS IN LOW SPEC MODE
    for (let i=0; i<cathedral.material.subMaterials.length; i++) 
        cathedral.material.subMaterials[i].maxSimultaneousLights = 6;

    //Chandeliers
    var chandelier;
    const result4 = await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/Chandelier/", "chandelier.babylon", scene);
    chandelier = result4.meshes[0];
    chandelier.position = new BABYLON.Vector3(-5.0, 11.0, 0.0);
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
    zeldaChest.alwaysSelectAsActiveMesh = true;
    //zeldaChest.receiveShadows = true;     //NO SHADOWS IN LOW SPEC MODE
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
    moonlightSword.material.subMaterials[1].alpha = 0.6;     //the external edge is slightly transparent
    for (let i=0; i<moonlightSword.material.subMaterials.length; i++) 
        moonlightSword.material.subMaterials[i].maxSimultaneousLights = 6;
    moonlightSword.alwaysSelectAsActiveMesh = true;
    //moonlightSword.receiveShadows = true;     //NO SHADOWS IN LOW SPEC MODE
    moonlightSword.isVisible = false;

    //(Moonlight sword luminosity effect)
    const moonlightLight = new BABYLON.PointLight("moonlightLight", new BABYLON.Vector3(-10.3, 1.8, 0.0), scene);
    //moonlightLight.parent = moonlightSword;
    moonlightLight.intensity = 2.5;
    moonlightLight.diffuse = new BABYLON.Color3(0.7, 0.95, 0.9);
    moonlightLight.specular = new BABYLON.Color3(0.7, 0.95, 0.9);
    moonlightLight.range = 5.5;
    moonlightLight.setEnabled(false);
    const moonlightLight2 = new BABYLON.PointLight("moonlightLight2", new BABYLON.Vector3(-9.7, 1.8, 0.0), scene);
    //moonlightLight.parent = moonlightSword;
    moonlightLight2.intensity = 2.5;
    moonlightLight2.diffuse = new BABYLON.Color3(0.7, 0.95, 0.9);
    moonlightLight2.specular = new BABYLON.Color3(0.7, 0.95, 0.9);
    moonlightLight2.range = 5.5;
    moonlightLight2.setEnabled(false);

    //Small particle system effect for the chest and moonlight sword
    //NO PARTICLE SYSTEMS IN LOW SPEC MODE
    /*const moonlightSparkles = new BABYLON.ParticleSystem("moonlightSparkles", 1000, scene);
    moonlightSparkles.particleTexture = new BABYLON.Texture("/assets/flare_moonlight_2.jpg", scene);
    moonlightSparkles.emitter = new BABYLON.Vector3(-10.0, 0.0, 0.0);
    moonlightSparkles.minEmitBox = new BABYLON.Vector3(-0.8, 0, -0.8);
    moonlightSparkles.maxEmitBox = new BABYLON.Vector3(0.8, 0, 0.8);
    //moonlightSparkles.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    //moonlightSparkles.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    //moonlightSparkles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    moonlightSparkles.minSize = 0.05;
    moonlightSparkles.maxSize = 0.08;
    moonlightSparkles.minLifeTime = 0.5;
    moonlightSparkles.maxLifeTime = 2.0;
    moonlightSparkles.emitRate = 800;
    moonlightSparkles.direction1 = new BABYLON.Vector3(-1, 8, 1);
    moonlightSparkles.direction2 = new BABYLON.Vector3(1, 8, -1);
    moonlightSparkles.minEmitPower = 0.5;
    moonlightSparkles.maxEmitPower = 0.8;
    moonlightSparkles.updateSpeed = 0.01;
    moonlightSparkles.gravity = new BABYLON.Vector3(0, -4.405, 0);*/

    //Easter egg objects
    var chestFFX;
    const result7 = await BABYLON.SceneLoader.ImportMeshAsync("", "assets/FFX_Chest/", "FFX_chest.babylon", scene);
    chestFFX = result7.meshes[0];
    chestFFX.position = new BABYLON.Vector3(-18.5, 0.8, 1.0);
    chestFFX.rotation = new BABYLON.Vector3(0.0, -Math.PI/2, 0.0);
    //chestFFX.receiveShadows = true;   //NO SHADOWS IN LOW SPEC MODE
    chestFFX.material.maxSimultaneousLights = 6;

    var royalHelm;
    const result8 = await BABYLON.SceneLoader.ImportMeshAsync("", "assets/Royal_Helm_fin/", "royal_helm.babylon", scene);
    royalHelm = result8.meshes[0];
    royalHelm.position = new BABYLON.Vector3(-18.5, 0.8, -1.0);
    royalHelm.rotation = new BABYLON.Vector3(0.0, -2*Math.PI/3, 0.0);
    royalHelm.scaling = new BABYLON.Vector3(1.2, 1.2, 1.2);
    //royalHelm.receiveShadows = true;  //NO SHADOWS IN LOW SPEC MODE
    for (let i=0; i<royalHelm.material.subMaterials.length; i++) 
        royalHelm.material.subMaterials[i].maxSimultaneousLights = 6;

    //Healing flare effect
    //NO PARTICLE SYSTEMS IN LOW SPEC MODE
    /*const healingParticles = new BABYLON.ParticleSystem("healingParticles", 1000, scene);
    healingParticles.particleTexture = new BABYLON.Texture("/assets/healing_flare_2.jpg", scene);
    var tempPos = skeleton.bones[skeleton.getBoneIndexByName("main")].position;
    healingParticles.emitter = new BABYLON.Vector3(tempPos.x, tempPos.y+1.2, tempPos.z);
    healingParticles.minEmitBox = new BABYLON.Vector3(-0.2, 0, -0.2);
    healingParticles.maxEmitBox = new BABYLON.Vector3(0.2, 0, 0.2);
    //healingParticles.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    //healingParticles.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    //healingParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    healingParticles.minSize = 0.05;
    healingParticles.maxSize = 0.08;
    healingParticles.minLifeTime = 0.2;
    healingParticles.maxLifeTime = 1.0;
    healingParticles.emitRate = 800;
    healingParticles.direction1 = new BABYLON.Vector3(-1, 8, 1);
    healingParticles.direction2 = new BABYLON.Vector3(1, 8, -1);
    healingParticles.minEmitPower = 0.25;
    healingParticles.maxEmitPower = 0.5;
    healingParticles.updateSpeed = 0.01;
    healingParticles.gravity = new BABYLON.Vector3(0, -4.405, 0);*/

    //**NO SHADOWS IN LOW SPEC MODE**
    /*const shadowGenerator1 = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator1.addShadowCaster(model);
    shadowGenerator1.addShadowCaster(model2);
    shadowGenerator1.addShadowCaster(cathedral);
    //shadowGenerator1.addShadowCaster(chandelier2);
    shadowGenerator1.addShadowCaster(zeldaChest);
    shadowGenerator1.addShadowCaster(moonlightSword);
    shadowGenerator1.addShadowCaster(chestFFX);
    shadowGenerator1.addShadowCaster(royalHelm);
    shadowGenerator1.usePoissonSampling = true;
    const shadowGenerator2 = new BABYLON.ShadowGenerator(1024, light2);
    shadowGenerator2.addShadowCaster(model);
    shadowGenerator2.addShadowCaster(model2);
    shadowGenerator2.addShadowCaster(cathedral);
    shadowGenerator2.addShadowCaster(zeldaChest);
    shadowGenerator2.addShadowCaster(moonlightSword);
    //shadowGenerator1.addShadowCaster(chandelier);
    shadowGenerator2.usePoissonSampling = true;
    const shadowGenerator3 = new BABYLON.ShadowGenerator(1024, moonlightLight);
    shadowGenerator3.addShadowCaster(zeldaChest);
    shadowGenerator3.addShadowCaster(model);
    shadowGenerator3.usePoissonSampling = true;*/
    
    //I HAD TO DISABLE BACKFACE CULLING FROM BLENDER (from some meshes, not all) BECAUSE OF THE MIRRORING OF THE MODELS EXPORTER (THE APP IS SLIGHTLY HEAVIER)

    //**HITBOXES CREATION**
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

    const arenaHitboxes = mapHitboxes(scene, cathedral);
    var linkLine = null;    //linking line between boss and player to check for obstacles (I didn't implement path finding or crowd agents)

    var allHitboxes = [];   //just for the debug mode (to visualize all the hitboxes)
    for(let i=0; i<res1.length; i++) allHitboxes.push(res1[i]);
    for(let i=0; i<res2.length; i++) allHitboxes.push(res2[i]);
    for(let i=0; i<arenaHitboxes.length; i++) allHitboxes.push(arenaHitboxes[i]);

    const chestHitbox = treasureChestHitbox(scene, chestSkeleton.bones[chestSkeleton.getBoneIndexByName("base")]);    //I don't add this to the "arenaHitboxes" array now, because I add it later when the chest appears

    //**SOUNDS ASSETS IMPORT**
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

    //**GUI/HUD (it is not responsive to a dynamic change of resolution, so if you change it, just reload the page)**
    const GUITexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUITexture", true);
    
    //Player bars container
    var playerBarsContainer = new BABYLON.GUI.Rectangle();
    playerBarsContainer.height = "56px";
    playerBarsContainer.width = "520px";
    playerBarsContainer.thickness = 0;
    playerBarsContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    playerBarsContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    playerBarsContainer.top = "4%";  //to make the GUI device independent, I use a percentage of the screen resolution (relative to the alignement)
    playerBarsContainer.left = "3%";
    GUITexture.addControl(playerBarsContainer); 

    //Player health bar
    var playerHealthBarContainer = new BABYLON.GUI.Rectangle();
    //playerHealthBarContainer.adaptWidthToChildren = true;
    playerHealthBarContainer.height = "22px";
    playerHealthBarContainer.width = "500px";
    playerHealthBarContainer.cornerRadius = 2;
    playerHealthBarContainer.color = "#333333";
    playerHealthBarContainer.thickness = 2;
    playerHealthBarContainer.background = "#808080";
    playerHealthBarContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    playerHealthBarContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    playerBarsContainer.addControl(playerHealthBarContainer);    
    var playerHealthBar = new BABYLON.GUI.Rectangle();
    //playerHealthBar.adaptWidthToChildren = true;
    playerHealthBar.height = "20px";
    playerHealthBar.width = "500px";
    playerHealthBar.cornerRadius = 1;
    playerHealthBar.color = "#a61022";
    playerHealthBar.thickness = 2;
    playerHealthBar.background = "#a61022";
    playerHealthBar.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    playerHealthBarContainer.addControl(playerHealthBar);

    //Player stamina bar
    var staminaBarContainer = new BABYLON.GUI.Rectangle();
    //staminaBarContainer.adaptWidthToChildren = true;
    staminaBarContainer.height = "22px";
    staminaBarContainer.width = "400px";
    staminaBarContainer.cornerRadius = 2;
    staminaBarContainer.color = "#333333";
    staminaBarContainer.thickness = 2;
    staminaBarContainer.background = "#808080";
    staminaBarContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    staminaBarContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    playerBarsContainer.addControl(staminaBarContainer);    
    var staminaBar = new BABYLON.GUI.Rectangle();
    //staminaBar.adaptWidthToChildren = true;
    staminaBar.height = "20px";
    staminaBar.width = "400px";
    staminaBar.cornerRadius = 1;
    staminaBar.color = "#386f48";
    staminaBar.thickness = 2;
    staminaBar.background = "#386f48";
    staminaBar.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    staminaBarContainer.addControl(staminaBar);

    //Player healing counter
    var healingContainer = new BABYLON.GUI.Rectangle();
    //bossHealthBar.adaptWidthToChildren = true;
    healingContainer.height = "70px";
    healingContainer.width = "154px";
    //healingContainer.color = "#2e2523";
    healingContainer.thickness = 0;
    //healingContainer.background = "#2e2523";
    healingContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    healingContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    healingContainer.left = "4%";
    healingContainer.top = "-8%";
    GUITexture.addControl(healingContainer);
    var healingTextArea = new BABYLON.GUI.TextBlock("healingTextArea", "Healing herbs:");
    healingTextArea.color = "#dcdcdc";
    healingTextArea.height = "24px";
    healingTextArea.width = "150px";
    healingTextArea.fontSize = "18px";
    healingTextArea.fontFamily = "Palatino Linotype";
    healingTextArea.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    healingTextArea.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    healingContainer.addControl(healingTextArea);
    var healingNumberArea = new BABYLON.GUI.TextBlock("healingNumberArea", "1 / 1");
    healingNumberArea.color = "#dcdcdc";
    healingNumberArea.height = "42px";
    healingNumberArea.width = "100px";
    healingNumberArea.fontSize = "36px";
    healingNumberArea.fontFamily = "Palatino Linotype";
    healingNumberArea.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    healingNumberArea.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    healingContainer.addControl(healingNumberArea);

    //Boss health bar
    var bossHealthBarArea = new BABYLON.GUI.Rectangle();
    //bossrHealthBarContainer.adaptWidthToChildren = true;
    bossHealthBarArea.height = "50px";
    bossHealthBarArea.width = "800px";
    bossHealthBarArea.cornerRadius = 0;
    //bossHealthBarArea.color = "#ffffff";
    bossHealthBarArea.alpha = 1.0;
    bossHealthBarArea.thickness = 0;
    bossHealthBarArea.top = "38%";
    bossHealthBarArea.left = 0;
    GUITexture.addControl(bossHealthBarArea);
    var bossHealthBarContainer = new BABYLON.GUI.Rectangle();
    //bossrHealthBarContainer.adaptWidthToChildren = true;
    bossHealthBarContainer.height = "20px";
    bossHealthBarContainer.width = "800px";
    bossHealthBarContainer.cornerRadius = 2;
    bossHealthBarContainer.color = "#333333";
    bossHealthBarContainer.thickness = 2;
    bossHealthBarContainer.background = "#808080";
    bossHealthBarContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    bossHealthBarContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    bossHealthBarArea.addControl(bossHealthBarContainer);
    var bossHealthBar = new BABYLON.GUI.Rectangle();
    //bossHealthBar.adaptWidthToChildren = true;
    bossHealthBar.height = "18px";
    bossHealthBar.width = "800px";
    bossHealthBar.cornerRadius = 1;
    bossHealthBar.color = "#a61022";
    bossHealthBar.thickness = 2;
    bossHealthBar.background = "#a61022";
    bossHealthBar.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    bossHealthBarContainer.addControl(bossHealthBar);
    var bossTextArea = new BABYLON.GUI.TextBlock("bossTextArea", "Silver Knight, Guardian of the Cathedral");
    bossTextArea.color = "#dcdcdc";
    bossTextArea.height = "28px";
    bossTextArea.width = "360px";
    bossTextArea.fontSize = "20px";
    bossTextArea.fontFamily = "Palatino Linotype";
    bossTextArea.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    bossTextArea.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    bossTextArea.left = "10px";
    bossHealthBarArea.addControl(bossTextArea);
    
    //Defeat text box
    var defeatContainer = new BABYLON.GUI.Rectangle();
    //defeatContainer.adaptWidthToChildren = true;
    defeatContainer.height = "150px";
    defeatContainer.width = (window.screen.width).toString() + "px";
    defeatContainer.cornerRadius = 2;
    defeatContainer.color = "#000000";
    defeatContainer.thickness = 0;  //I remove the different border color
    defeatContainer.background = "#000000";
    defeatContainer.alpha = 0.0;    //to be animated
    defeatContainer.top = 0;
    defeatContainer.left = 0;
    GUITexture.addControl(defeatContainer);
    defeatContainer.isVisible = false;
    var defeatTextArea = new BABYLON.GUI.TextBlock("defeatTextArea", "YOU DIED");
    defeatTextArea.color = "#791924";
    defeatTextArea.height = "56px";
    defeatTextArea.width = "320px";
    defeatTextArea.fontSize = "52px";
    defeatTextArea.alpha = 0.0;
    defeatTextArea.fontFamily = "Palatino Linotype";
    defeatTextArea.paddingTop = "-60px";
    GUITexture.addControl(defeatTextArea);  //I don't attach it to the container because the alpha is in common so also the text would be half transparent
    defeatTextArea.isVisible = false;
    var defeatRestartButton = BABYLON.GUI.Button.CreateSimpleButton("defeatRestartButton", "Retry the battle");
    defeatRestartButton.height = "32px";
    defeatRestartButton.width = "168px";
    defeatRestartButton.cornerRadius = 3;
    defeatRestartButton.color = "#cccccc";
    defeatRestartButton.thickness = 2;
    defeatRestartButton.alpha = 0.0;
    defeatRestartButton.background = "#636363";
    defeatRestartButton.fontFamily = "Palatino Linotype";
    defeatRestartButton.fontSize = "20px";
    defeatRestartButton.top = "24px";
    GUITexture.addControl(defeatRestartButton);
    defeatRestartButton.isVisible = false;
    defeatRestartButton.isEnabled = false;  //to be reactivated when it appears

    //Victory text box
    var victoryContainer = new BABYLON.GUI.Rectangle();
    //victoryContainer.adaptWidthToChildren = true;
    victoryContainer.height = "150px";
    victoryContainer.width = (window.screen.width).toString() + "px";
    victoryContainer.cornerRadius = 2;
    victoryContainer.color = "#000000";
    victoryContainer.thickness = 0;  //I remove the different border color
    victoryContainer.background = "#000000";
    victoryContainer.alpha = 0.0;    //to be animated
    victoryContainer.top = 0;
    victoryContainer.left = 0;
    GUITexture.addControl(victoryContainer);
    victoryContainer.isVisible = false;     //visible when animation starts, stays for some seconds, then disappears
    var victoryTextArea = new BABYLON.GUI.TextBlock("victoryTextArea", "VICTORY");
    victoryTextArea.color = "#ffd400";
    victoryTextArea.height = "56px";
    victoryTextArea.width = "320px";
    victoryTextArea.alpha = 0.0;
    victoryTextArea.fontSize = "52px";
    victoryTextArea.fontFamily = "Palatino Linotype";
    victoryTextArea.paddingTop = "-60px";
    GUITexture.addControl(victoryTextArea);  //I don't attach it to the container because the alpha is in common so also the text would be half transparent
    victoryTextArea.isVisible = false;
    var victorySubtextArea = new BABYLON.GUI.TextBlock("victorySubtextArea", "You can open the chest to obtain the final treasure");
    victorySubtextArea.color = "#dcdcdc";
    victorySubtextArea.height = "24px";
    victorySubtextArea.width = "440px";
    victorySubtextArea.alpha = 0.0;
    victorySubtextArea.fontSize = "20px";
    victorySubtextArea.fontFamily = "Palatino Linotype";
    victorySubtextArea.paddingTop = "50px";
    GUITexture.addControl(victorySubtextArea);  //I don't attach it to the container because the alpha is in common so also the text would be half transparent
    victorySubtextArea.isVisible = false;

    //Treasure item text box
    var itemTextContainer = new BABYLON.GUI.Rectangle();
    //itemTextContainer.adaptWidthToChildren = true;
    itemTextContainer.height = "80px";
    itemTextContainer.width = "520px";
    itemTextContainer.cornerRadius = 1;
    itemTextContainer.color = "#2e2523";
    itemTextContainer.thickness = 2;
    itemTextContainer.background = "#2e2523";
    itemTextContainer.alpha = 0.8;
    itemTextContainer.top = "25%";
    itemTextContainer.left = 0;
    GUITexture.addControl(itemTextContainer);
    itemTextContainer.isVisible = false;
    var itemTextArea = new BABYLON.GUI.TextBlock("itemTextArea", "You obtained the Legendary Moonlight Sword. You won!");
    itemTextArea.color = "#dcdcdc";
    itemTextArea.height = "24px";
    itemTextArea.width = "480px";
    itemTextArea.fontSize = "18px";
    itemTextArea.fontFamily = "Palatino Linotype";
    itemTextArea.top = "22%";
    GUITexture.addControl(itemTextArea);  //I don't attach it to the container because the alpha is in common so also the text would be half transparent
    itemTextArea.isVisible = false;
    var victoryRestartButton = BABYLON.GUI.Button.CreateSimpleButton("victoryRestartButton", "Restart the game");
    victoryRestartButton.height = "32px";
    victoryRestartButton.width = "168px";
    victoryRestartButton.cornerRadius = 3;
    victoryRestartButton.color = "#cccccc";
    victoryRestartButton.thickness = 2;
    victoryRestartButton.background = "#636363";
    victoryRestartButton.fontFamily = "Palatino Linotype";
    victoryRestartButton.fontSize = "20px";
    victoryRestartButton.top = "27%";
    GUITexture.addControl(victoryRestartButton);
    victoryRestartButton.isVisible = false;
    victoryRestartButton.isEnabled = false;  //to be reactivated when it appears

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

    //**BLENDING PRODUCED AN UGLY EFFECT ON MOVEMENTS, SO I REMOVED IT**
    // Enable animation blending for all animations
    /*scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
    scene.animationPropertiesOverride.enableBlending = true;
    scene.animationPropertiesOverride.blendingSpeed = 0.05;
    scene.animationPropertiesOverride.loopMode = 1;*/

    //**PLAYER AND BOSS GAMEPLAY PARAMETERS**
    var playerHealth = 2000;
    const playerMaxHealth = 2000;
    var bossHealth = 12000;
    const bossMaxHealth = 12000;
    
    const playerLightDmg = 750;
    const playerHeavyDmg = 900;
    const bossLightDmg = 250;
    const bossHeavyDmg = 350;

    const playerMaxStamina = 200.0;
    var playerCurrStamina = 200.0;
    const lightAtckStaminaCost = 50.0;
    const heavyAtckStaminaCost = 75.0;
    const dodgeStaminaCost = 50.0;
    var healingNumber = 1;      //you have one healing herb
    const healingValue = 500;

    //**ANIMATIONS INITIALIZATIONS**
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
    playerHealing(skeleton, frameRate, DWinitialTposePos, DWinitialTposeRot);

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

    //(For GUI, initialization and grouping is together for brevity)
    const defeatGUIAnimationGroup = defeatTextBoxFadeIn(defeatContainer, defeatTextArea, defeatRestartButton, frameRate);
    const victoryGUIAnimationGroup = victoryTextBoxFadeInOut(victoryContainer, victoryTextArea, victorySubtextArea, frameRate);

    //**ANIMATIONS GROUPING**
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

    const playerHealingAnimationGroup = groupPlayerHealing(skeleton);

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
    //bossDeathAnimationGroup.normalize(0, 3*frameRate);

    //Treasure chest (final prize)
    const chestAnimationGroup = groupChestMoonlight(chestSkeleton, moonlightSword);
    //chestAnimationGroup.normalize(0, 4*frameRate);

    //To make the boss always look at the player character (I CAN'T USE IT ON MAIN BONE BECAUSE IT MIRRORS THE MODEL FOR NO REASON)
    const bossLookAt = new BABYLON.BoneLookController(model2, skeleton2.bones[skeleton2.getBoneIndexByName("head")], skeleton.bones[skeleton.getBoneIndexByName("main")].position, {adjustPitch: -0.4, minYaw: -1.2, maxYaw: 1.2});

    var currAnimationGroup;
    var bossCurrAnimationGroup;
    currAnimationGroup = idleAnimationGroup;
    currAnimationGroup.play(true);

    bossCurrAnimationGroup = bossIdleAnimationGroup;
    bossCurrAnimationGroup.play(true);

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
    var rFlag = false;
    var lFlag = false;
    var animationIsPlaying = false;     //flag to understand if I'm holding down a walk button for more than one "tick"
	var mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[0]], 0, 11*frameRate/6, true);
	mainAnimatable.stop();	//"dummy" initialization to avoid initialization errors

    var playerDeathFlag = false;

    //**PLAYER INPUT KEYS**
    scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
            case BABYLON.KeyboardEventTypes.KEYDOWN:
                if(!playerDeathFlag) {      //non ho indentato tutto il blocco sotto
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

							mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[0]], 0, 11*frameRate/6, true);
                            mainAnimatable.speedRatio = 1.25;

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

							mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[1]], 0, 11*frameRate/6, true);
                            mainAnimatable.speedRatio = 1.25;

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

							mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[3]], 0, 11*frameRate/6, true);
                            mainAnimatable.speedRatio = 1.25;

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

							mainAnimatable = scene.beginDirectAnimation(skeleton.bones[skeleton.getBoneIndexByName("main")], [skeleton.bones[skeleton.getBoneIndexByName("main")].animations[2]], 0, 11*frameRate/6, true);
                            mainAnimatable.speedRatio = 1.25;

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
                            var tempWidth;
                            if(playerCurrStamina<=0) tempWidth = '0';
                            else tempWidth = (Math.round(playerCurrStamina*400/playerMaxStamina)).toString(); //it must be an integer
                            staminaBar.width = tempWidth + 'px';

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
                            var tempWidth;
                            if(playerCurrStamina<=0) tempWidth = '0';
                            else tempWidth = (Math.round(playerCurrStamina*400/playerMaxStamina)).toString(); //it must be an integer
                            staminaBar.width = tempWidth + 'px';

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
                            var tempWidth;
                            if(playerCurrStamina<=0) tempWidth = '0';
                            else tempWidth = (Math.round(playerCurrStamina*400/playerMaxStamina)).toString(); //it must be an integer
                            staminaBar.width = tempWidth + 'px';

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
                            var tempWidth;
                            if(playerCurrStamina<=0) tempWidth = '0';
                            else tempWidth = (Math.round(playerCurrStamina*400/playerMaxStamina)).toString(); //it must be an integer
                            staminaBar.width = tempWidth + 'px';

							animationIsPlaying = true;
                        }
                        spaceFlag = true;
                        }
                    break;

                    case "r":
                    case "R":
                        rFlag = true;
                        if(healingNumber > 0) {
                            if(!playerHealingAnimationGroup.isPlaying && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying && !dodgeFwdAnimationGroup.isPlaying && !dodgeBackAnimationGroup.isPlaying && !dodgeRightAnimationGroup.isPlaying && !dodgeLeftAnimationGroup.isPlaying) {
                            currAnimationGroup.stop();
							mainAnimatable.stop();

                            currAnimationGroup = playerHealingAnimationGroup;
                            currAnimationGroup.play(false);

                            healingNumber--;
							animationIsPlaying = true;
                            }
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
                //Debug camera (freecam)
                else if(kbInfo.event.key == "l" || kbInfo.event.key == "L") {
                    if(lFlag==false) {
                        scene.activeCamera = debugCamera;
                        lFlag = true;
                    }
                    else {
                        scene.activeCamera = camera;
                        lFlag = false;
                    }
                }
            
                //console.log("KEY DOWN: ", kbInfo.event.code, " ", kbInfo.event.key);
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
           	    	    	currAnimationGroup.reset();
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
           	    	    	currAnimationGroup.reset();
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
           	    	    	currAnimationGroup.reset();
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
           	    	    	currAnimationGroup.reset();
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
           	    	    	currAnimationGroup.reset();
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
           	    	    	currAnimationGroup.reset();
               		    	animationIsPlaying = false;
               			}
        			break;
				}
                }
                //console.log("KEY UP: ", kbInfo.event.code, " ", kbInfo.event.key);
			break;
        }
    });
    
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
                    var tempWidth;
                    if(playerCurrStamina<=0) tempWidth = '0';
                    else tempWidth = (Math.round(playerCurrStamina*400/playerMaxStamina)).toString(); //it must be an integer
                    staminaBar.width = tempWidth + 'px';


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
                    var tempWidth;
                    if(playerCurrStamina<=0) tempWidth = '0';
                    else tempWidth = (Math.round(playerCurrStamina*400/playerMaxStamina)).toString(); //it must be an integer
                    staminaBar.width = tempWidth + 'px';

		    	    animationIsPlaying = true;
                }
            }
        }
    });

    //**ANIMATIONS EVENT LISTENERS (ATTACKS AND DODGES)**
    //Player attack animations end events
    var playerSwordIntersecFlag = false;
    playerLAttackAnimationGroup.onAnimationGroupEndObservable.add(() => {
        if(!playerDeathFlag) {
            currAnimationGroup.stop();
		    //mainAnimatable.stop();
            currAnimationGroup = idleAnimationGroup;
       	    currAnimationGroup.play(true);
            currAnimationGroup.reset();
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
            currAnimationGroup.reset();
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
                currAnimationGroup.reset();
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
                currAnimationGroup.reset();
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
                currAnimationGroup.reset();
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
                currAnimationGroup.reset();
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

    //Healing animation events
    const playerHealingEvent = new BABYLON.AnimationEvent(
        4 * frameRate/3,
        function () {
            //The number of healing herbs is already checked in the input key reading
            if(playerHealth + healingValue >= playerMaxHealth) playerHealth = playerMaxHealth;
            else playerHealth += healingValue;
            //Healing counter change
            var tempWidth = (Math.round(playerHealth*500/playerMaxHealth)).toString(); //it must be an integer
            playerHealthBar.width = tempWidth + 'px';
            var tempText = healingNumber.toString();
            healingNumberArea.text = tempText + " / 1";
            //Healing flare effect start
            //healingParticles.start();     //NO PARTICLE SYSTEMS IN LOW SPEC MODE
        },
        true
    );
    skeleton.bones[skeleton.getBoneIndexByName("palm L")].animations[0].addEvent(playerHealingEvent);
    playerHealingAnimationGroup.onAnimationGroupEndObservable.add(() => {
        if(!playerDeathFlag) {
            currAnimationGroup.stop();
		    //mainAnimatable.stop();
            currAnimationGroup = idleAnimationGroup;
       	    currAnimationGroup.play(true);
            currAnimationGroup.reset();
            animationIsPlaying = false;
            rFlag = false;
            //Healing flare effect stop
            //healingParticles.stop();      //NO PARTICLE SYSTEMS IN LOW SPEC MODE
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
                        var tempWidth;
                        if(bossHealth<=0) tempWidth = '0';
                        else tempWidth = (Math.round(bossHealth*800/bossMaxHealth)).toString(); //it must be an integer
                        bossHealthBar.width = tempWidth + 'px';
                    }
                }
            },
            true
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
                        var tempWidth;
                        if(bossHealth<=0) tempWidth = '0';
                        else tempWidth = (Math.round(bossHealth*800/bossMaxHealth)).toString(); //it must be an integer
                        bossHealthBar.width = tempWidth + 'px';
                    }
                }
            },
            true
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
                        var tempWidth;
                        if(playerHealth<=0) tempWidth = '0';
                        else tempWidth = (Math.round(playerHealth*500/playerMaxHealth)).toString(); //it must be an integer
                        playerHealthBar.width = tempWidth + 'px';
                    }
                }
            },
            true
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
                        var tempWidth;
                        if(playerHealth<=0) tempWidth = '0';
                        else tempWidth = (Math.round(playerHealth*500/playerMaxHealth)).toString(); //it must be an integer
                        playerHealthBar.width = tempWidth + 'px';
                    }
                }
            },
            true
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
        true
    );
    skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[19].addEvent(dodgeFwdStartEvent);
    const dodgeFwdEndEvent = new BABYLON.AnimationEvent(
        3*frameRate/4,    //to frame 45
        function () {
            playerIsDodgingFlag = false;
        },
        true
    );
    skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[19].addEvent(dodgeFwdEndEvent);

    //(Dodge back)
    const dodgeBackStartEvent = new BABYLON.AnimationEvent(
        1*frameRate/12,
        function () {
            playerIsDodgingFlag = true;
        },
        true
    );
    skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[21].addEvent(dodgeBackStartEvent);
    const dodgeBackEndEvent = new BABYLON.AnimationEvent(
        3*frameRate/4,
        function () {
            playerIsDodgingFlag = false;
        },
        true
    );
    skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[21].addEvent(dodgeBackEndEvent);

    //(Dodge right)
    const dodgeRightStartEvent = new BABYLON.AnimationEvent(
        1*frameRate/12,
        function () {
            playerIsDodgingFlag = true;
        },
        true
    );
    skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[23].addEvent(dodgeRightStartEvent);
    const dodgeRightEndEvent = new BABYLON.AnimationEvent(
        3*frameRate/4,
        function () {
            playerIsDodgingFlag = false;
        },
        true
    );
    skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[23].addEvent(dodgeRightEndEvent);

    //(Dodge left)
    const dodgeLeftStartEvent = new BABYLON.AnimationEvent(
        1*frameRate/12,
        function () {
            playerIsDodgingFlag = true;
        },
        true
    );
    skeleton.bones[skeleton.getBoneIndexByName("chest")].animations[25].addEvent(dodgeLeftStartEvent);
    const dodgeLeftEndEvent = new BABYLON.AnimationEvent(
        3*frameRate/4,
        function () {
            playerIsDodgingFlag = false;
        },
        true
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
        //NO PARTICLE SYSTEMS IN LOW SPEC MODE
        //if(!moonlightSparkles.isStarted() & !playerHasOpenedChest) moonlightSparkles.start();
        victoryContainer.isVisible = true;
        victoryTextArea.isVisible = true;
        victorySubtextArea.isVisible = true;
        victoryGUIAnimationGroup.start();
        bossHealthBarArea.isVisible = false;
    });

    //Player healing flare effect


    //**GUI EVENT LISTENERS**
    defeatRestartButton.onPointerClickObservable.add(function() {
        location.reload();
    });

    victoryGUIAnimationGroup.onAnimationGroupEndObservable.add(() => {
        victoryContainer.isVisible = false;
        victoryTextArea.isVisible = false;
        victorySubtextArea.isVisible = false;
    });

    chestAnimationGroup.onAnimationGroupEndObservable.add(() => {
        itemTextContainer.isVisible = true;
        itemTextArea.isVisible = true;
        victoryRestartButton.isVisible = true;
        victoryRestartButton.isEnabled = true;
    });

    victoryRestartButton.onPointerClickObservable.add(function() {
        location.reload();
    });

    //**SOUND EFFECTS ANIMATION EVENTS**
    //(I added a bit of randomness in the sounds so that they are not repetitive or annoying)
    //Swings and hits
    const playerLightSwingEvent = new BABYLON.AnimationEvent(
        7*frameRate/12,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=0.5) playerLightSwing1.play();
            else playerLightSwing2.play();
        },
        true
    );
    skeleton.bones[skeleton.getBoneIndexByName("palm R")].animations[1].addEvent(playerLightSwingEvent);

    const playerHeavySwingEvent = new BABYLON.AnimationEvent(
        3*frameRate/2,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=0.5) playerHeavySwing1.play();
            else playerHeavySwing2.play();
        },
        true
    );
    skeleton.bones[skeleton.getBoneIndexByName("palm R")].animations[2].addEvent(playerHeavySwingEvent);

    const bossLightSwingEvent = new BABYLON.AnimationEvent(
        7*frameRate/12,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=0.5) bossSwordSwing1.play();
            else bossSwordSwing2.play();
        },
        true
    );
    skeleton2.bones[skeleton2.getBoneIndexByName("palm R")].animations[3].addEvent(bossLightSwingEvent);

    const bossHeavySwingEvent = new BABYLON.AnimationEvent(
        7*frameRate/6,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=0.5) bossSwordSwing1.play();
            else bossSwordSwing2.play();
        },
        true
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
        false
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
        false
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
        true
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
        false
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
        false
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
        true
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
        true
    );
    skeleton2.bones[skeleton2.getBoneIndexByName("chest")].animations[9].addEvent(bossHeavyScreamEvent);

    const bossDeathScreamEvent = new BABYLON.AnimationEvent(
        0,
        function () {
            var soundRNG = Math.random();
            if(soundRNG<=0.5) bossVoiceDeath1.play();
            else bossVoiceDeath2.play();
        },
        true
    );
    skeleton2.bones[skeleton2.getBoneIndexByName("chest")].animations[11].addEvent(bossDeathScreamEvent);


    //**BOSS AI (USING "registerBeforeRender")**
    //Flags for boss's behaviour
    //var bossIsClose = false;    //I use comparison with distance instead
    var bossIdleFlag = false;
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
        
        if(bossHealth<=0) bossDeathFlag = true;

        if(playerHealth<=0) playerDeathFlag = true;

        if(!bossDeathFlag && !playerDeathFlag) {    //boss is alive
            bossLookAt.update();
            
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
            
            if(!bossLAttackAnimationGroup.isPlaying && !bossHAttackAnimationGroup.isPlaying) {
                if(playerXInBossLocal > 0) {
                    skeleton2.bones[skeleton2.getBoneIndexByName("main")].rotation = new BABYLON.Vector3(bossMainRot.x, bossNewYRot, bossMainRot.z);
                }
                else {
                    skeleton2.bones[skeleton2.getBoneIndexByName("main")].rotation = new BABYLON.Vector3(bossMainRot.x, -bossNewYRot, bossMainRot.z);
                }
            }
        
            //Linking line between boss and player
            if(linkLine != null) scene.removeMesh(linkLine);    //to not slow down the engine while drawing a line per frame, I delete the previous one
            linkLine = BABYLON.MeshBuilder.CreateLines("linkLine", {colors: [new BABYLON.Color4(1.0, 1.0, 1.0, 1.0), new BABYLON.Color4(1.0, 1.0, 1.0, 1.0)], points: [bossMainPos, playerMainPos]}, scene);
            if(!pFlag) linkLine.isVisible = false;
            else linkLine.isVisible = true;

            //Handle the position
            if(!bossIdleFlag && bossPauseDuration == -1) {  //check if boss is not in pause
                if(!bossLAttackAnimationGroup.isPlaying && !bossHAttackAnimationGroup.isPlaying) {
                    //I put the number generation when the boss is not attacking otherwise it was too fast and the probability of "pause" interval was too high
                    var rng = Math.random();    //I didn't use a cryptographically secure RNG, just because the application didn't need that degree of security
                }
                
                if(dist > 2.5) {
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
                                    skeleton2.bones[skeleton2.getBoneIndexByName("main")].position = new BABYLON.Vector3(bossMainPos.x+xMovement-2.0, bossMainPos.y, bossMainPos.z+zMovement-2.0);
                                else
                                    skeleton2.bones[skeleton2.getBoneIndexByName("main")].position = new BABYLON.Vector3(bossMainPos.x-xMovement+2.0, bossMainPos.y, bossMainPos.z+zMovement-2.0);
                            }
                        }
                    }
                }
                else if (dist <=2.5 && dist > 2.3) {  //here boss is close and can attack choosing randomly from his attacks animations (or pause for 3 seconds)
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
                    bossPauseDuration--;
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
            if(!bossDeathAnimationGroup.isPlaying && bossDeathAnim) {
                bossCurrAnimationGroup.reset();
                bossCurrAnimationGroup.stop();
                bossCurrAnimationGroup = bossDeathAnimationGroup;
                bossCurrAnimationGroup.play(false);
                soundtrack.setVolume(0.0, 3.0); //dissolve music towards mute then stop
                //soundtrack.stop();    //if I stop the soundtrack, the dissolvence is not performed, so I revomed this
                victoryMusic.play(5.0);
                bossDeathAnim = false;
                victoryFlag = true;
            }
        }

        //player has died, play player's death animation
        if(playerDeathFlag) {
            if(playerDeathAnim && !playerDeathAnimationGroup.isPlaying) {
                currAnimationGroup.reset();
                currAnimationGroup.stop();
                mainAnimatable.stop();
                currAnimationGroup = playerDeathAnimationGroup;
                currAnimationGroup.play(false);
                defeatContainer.isVisible = true;
                defeatTextArea.isVisible = true;
                defeatRestartButton.isVisible = true;
                defeatRestartButton.isEnabled = true;
                defeatGUIAnimationGroup.start();
                //soundtrack.stop();
                soundtrack.setVolume(0.0, 1.0); //dissolve music towards mute
                failureMusic.play(1.0);
                playerDeathAnim = false;
            }
        }
        else {
            if(playerCurrStamina < playerMaxStamina && !playerLAttackAnimationGroup.isPlaying && !playerHAttackAnimationGroup.isPlaying) {
                //I made stamina recovery frame rate dependant to guarantee always the same amount of regenaration regardless of the frame rate
                playerCurrStamina += 40/frameRate;   //more or less 40 stamina recovery per second (at 60 fps; 60/90=0,667 per frame)
                var tempWidth;
                if(playerCurrStamina<=0) tempWidth = '0';
                else tempWidth = (Math.round(playerCurrStamina*400/playerMaxStamina)).toString(); //it must be an integer
                staminaBar.width = tempWidth + 'px';
            }
            //Healing flare emitter
            //NO PARTICLE SYSTEMS IN LOW SPEC MODE
            //tempPos = skeleton.bones[skeleton.getBoneIndexByName("main")].position;
            //healingParticles.emitter = new BABYLON.Vector3(tempPos.x, tempPos.y+1.2, tempPos.z);
        }

        //player won, show the chest with the prize
        if(victoryFlag) {
            if(!playerHasOpenedChest && playerFrontHitbox.intersectsMesh(chestHitbox, false) && !chestAnimationGroup.isPlaying) {
                chestAnimationGroup.play(false);
                moonlightLight.setEnabled(true);
                moonlightLight2.setEnabled(true);
                chestOpeningSound.play(0.5);
                //moonlightSparkles.stop();     //NO PARTICLE SYSTEMS IN LOW SPEC MODE
                playerHasOpenedChest = true;
            }
        }

        if(chestOpeningSound.isPlaying && victoryMusic.isPlaying) victoryMusic.setVolume(0.1);
        else victoryMusic.setVolume(0.3);
	});

    return scene;
};

// Register (using asynchronous promise) a render loop to repeatedly render the scene
createScene().then(function(scene) {
    engine.runRenderLoop(function () {
        scene.render();
        frameRate = engine.getFps();
    });
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
