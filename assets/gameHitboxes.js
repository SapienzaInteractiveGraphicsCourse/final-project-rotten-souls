function playerHitboxes(scene, skeleton) {
    //Body
    const playerHitbox = BABYLON.MeshBuilder.CreateBox("playerHitbox", {height: 1.1, width: 0.5, depth: 0.4}, scene);
    var hitboxMat = new BABYLON.StandardMaterial("hitboxMat", scene);
    hitboxMat.emissiveColor = BABYLON.Color3.White();
    hitboxMat.wireframe = true;
    playerHitbox.material = hitboxMat;
    playerHitbox.parent = skeleton.bones[skeleton.getBoneIndexByName("chest")];
    playerHitbox.position = new BABYLON.Vector3(0.0, 0.4, 0.0);
    playerHitbox.isVisible = false;

    //Sword
    const playerSwordHitbox = BABYLON.MeshBuilder.CreateBox("playerSwordHitbox", {height: 1.0, width: 0.1, depth: 0.2}, scene);
    var swordHitboxMat = new BABYLON.StandardMaterial("swordHitboxMat", scene);
    swordHitboxMat.emissiveColor = BABYLON.Color3.White();
    swordHitboxMat.wireframe = true;
    playerSwordHitbox.material = swordHitboxMat;
    playerSwordHitbox.parent = skeleton.bones[skeleton.getBoneIndexByName("sword")];
    const tempPos = playerSwordHitbox.position;
    const tempRot = playerSwordHitbox.rotation;
    playerSwordHitbox.position = new BABYLON.Vector3(tempPos.x, tempPos.y+0.95, tempPos.z);     //adjusted manually to fit the blade of the sword
    playerSwordHitbox.rotation = new BABYLON.Vector3(tempRot.x, tempRot.y+Math.PI/2, tempRot.z);
    playerSwordHitbox.isVisible = false;

    //Location (to move inside the arena without going through meshes)
    const frontLocHitbox = BABYLON.MeshBuilder.CreateBox("frontLocHitbox", {height: 0.6, width: 0.35, depth: 0.25}, scene);
    var frontLocHitboxMat = new BABYLON.StandardMaterial("frontLocHitboxMat", scene);
    frontLocHitboxMat.emissiveColor = BABYLON.Color3.White();
    frontLocHitboxMat.wireframe = true;
    frontLocHitbox.material = frontLocHitboxMat;
    frontLocHitbox.parent = skeleton.bones[skeleton.getBoneIndexByName("main")];
    frontLocHitbox.position = new BABYLON.Vector3(0.0, 0.95, 0.3);
    frontLocHitbox.isVisible = false;

    const backLocHitbox = frontLocHitbox.clone("backLocHitbox");
    backLocHitbox.position = new BABYLON.Vector3(0.0, 0.95, -0.3);
    backLocHitbox.isVisible = false;

    const leftLocHitbox = frontLocHitbox.clone("leftLocHitbox");
    leftLocHitbox.position = new BABYLON.Vector3(0.3, 0.95, 0.0);
    leftLocHitbox.isVisible = false;

    const rightLocHitbox = frontLocHitbox.clone("rightLocHitbox");
    rightLocHitbox.position = new BABYLON.Vector3(-0.3, 0.95, 0.0);
    rightLocHitbox.isVisible = false;

    const result = [playerHitbox, playerSwordHitbox, frontLocHitbox, backLocHitbox, leftLocHitbox, rightLocHitbox];
    return result;
}

function bossHitboxes(scene, skeleton) {
    //Body
    const bossHitbox = BABYLON.MeshBuilder.CreateBox("bossHitbox", {height: 2.2, width: 0.75, depth: 0.6}, scene);
    var hitboxMat2 = new BABYLON.StandardMaterial("hitboxMat2", scene);
    hitboxMat2.emissiveColor = BABYLON.Color3.White();
    hitboxMat2.wireframe = true;
    bossHitbox.material = hitboxMat2;
    bossHitbox.parent = skeleton.bones[skeleton.getBoneIndexByName("chest")];
	var tempPos2 = bossHitbox.position;
    bossHitbox.position = new BABYLON.Vector3(tempPos2.x, tempPos2.y+0.2, tempPos2.z-0.1);
    bossHitbox.isVisible = false;

    //Sword
    const bossSwordHitbox = BABYLON.MeshBuilder.CreateBox("bossSwordHitbox", {height: 1.5, width: 0.1, depth: 0.1}, scene);
    var swordHitboxMat2 = new BABYLON.StandardMaterial("swordHitboxMat2", scene);
    swordHitboxMat2.emissiveColor = BABYLON.Color3.White();
    swordHitboxMat2.wireframe = true;
    bossSwordHitbox.material = swordHitboxMat2;
    bossSwordHitbox.parent = skeleton.bones[skeleton.getBoneIndexByName("sword")];
    tempPos2 = bossSwordHitbox.position;
    var tempRot2 = bossSwordHitbox.rotation;
    bossSwordHitbox.position = new BABYLON.Vector3(tempPos2.x, tempPos2.y+1.2, tempPos2.z);     //adjusted manually to fit the blade of the sword
    bossSwordHitbox.rotation = new BABYLON.Vector3(tempRot2.x, tempRot2.y+Math.PI/2, tempRot2.z);
    bossSwordHitbox.isVisible = false;

    //Location (to move inside the arena without going through meshes)
    /*const frontLocHitbox = BABYLON.MeshBuilder.CreateBox("frontLocHitbox", {height: 0.6, width: 0.25, depth: 0.25}, scene);
    var frontLocHitboxMat = new BABYLON.StandardMaterial("frontLocHitboxMat", scene);
    frontLocHitboxMat.emissiveColor = BABYLON.Color3.White();
    frontLocHitboxMat.wireframe = true;
    frontLocHitbox.material = frontLocHitboxMat;
    frontLocHitbox.parent = skeleton.bones[skeleton.getBoneIndexByName("main")];
    frontLocHitbox.position = new BABYLON.Vector3(0.0, 0.3, 0.3);
    frontLocHitbox.isVisible = false;

    const backLocHitbox = frontLocHitbox.clone("backLocHitbox");
    backLocHitbox.position = new BABYLON.Vector3(0.0, 0.3, -0.3);
    backLocHitbox.isVisible = false;

    const leftLocHitbox = frontLocHitbox.clone("leftLocHitbox");
    leftLocHitbox.position = new BABYLON.Vector3(0.3, 0.3, 0.0);
    leftLocHitbox.isVisible = false;

    const rightLocHitbox = frontLocHitbox.clone("rightLocHitbox");
    rightLocHitbox.position = new BABYLON.Vector3(-0.3, 0.3, 0.0);
    rightLocHitbox.isVisible = false;*/

    const result = [bossHitbox, bossSwordHitbox/*, frontLocHitbox, backLocHitbox, leftLocHitbox, rightLocHitbox*/];
    return result;
}

function mapHitboxes(scene, cathedralMesh, zeldaChest) {
    //Left wall
    const leftWall = BABYLON.MeshBuilder.CreateBox("leftWall", {height: 10.0, width: 37.0, depth: 4.0}, scene);
    var leftWallMat = new BABYLON.StandardMaterial("leftWallMat", scene);
    leftWallMat.emissiveColor = BABYLON.Color3.White();
    leftWallMat.wireframe = true;
    leftWall.material = leftWallMat;
    leftWall.parent = cathedralMesh;
    leftWall.position = new BABYLON.Vector3(-6.0, -2.5, 19.3);
    leftWall.isVisible = false;

    //Right wall
    const rightWall = leftWall.clone("rightWall");
    rightWall.position = new BABYLON.Vector3(-6.0, -2.5, -19.3);
    rightWall.isVisible = false;

    //Front wall
    const frontWall = BABYLON.MeshBuilder.CreateBox("frontWall", {height: 10.0, width: 2.0, depth: 35.0}, scene);
    var frontWallMat = new BABYLON.StandardMaterial("frontWallMat", scene);
    frontWallMat.emissiveColor = BABYLON.Color3.White();
    frontWallMat.wireframe = true;
    frontWall.material = frontWallMat;
    frontWall.parent = cathedralMesh;
    frontWall.position = new BABYLON.Vector3(12.5, -2.5, 0.0);
    frontWall.isVisible = false;

    //Back wall
    const backWall = BABYLON.MeshBuilder.CreateBox("backWall", {height: 10.0, width: 4.0, depth: 35.0}, scene);
    var backWallMat = new BABYLON.StandardMaterial("backWallMat", scene);
    backWallMat.emissiveColor = BABYLON.Color3.White();
    backWallMat.wireframe = true;
    backWall.material = backWallMat;
    backWall.parent = cathedralMesh;
    backWall.position = new BABYLON.Vector3(-25.5, -2.5, 0.0);
    backWall.isVisible = false;

    //Column 1
    const column1 = BABYLON.MeshBuilder.CreateCylinder("column1", {height: 10.0, diameter: 3.2}, scene);
    var column1Mat = new BABYLON.StandardMaterial("column1Mat", scene);
    column1Mat.emissiveColor = BABYLON.Color3.White();
    column1Mat.wireframe = true;
    column1.material = column1Mat;
    column1.parent = cathedralMesh;
    column1.position = new BABYLON.Vector3(-15.2, -2.5, 8.25);
    column1.isVisible = false;

    //Column 2
    const column2 = column1.clone("column2");
    column2.position = new BABYLON.Vector3(-5.75, -2.5, 8.25);
    column2.isVisible = false;

    //Column 3
    const column3 = column1.clone("column3");
    column3.position = new BABYLON.Vector3(3.75, -2.5, 8.25);
    column3.isVisible = false;

    //Column 4
    const column4 = column1.clone("column4");
    column4.position = new BABYLON.Vector3(-15.2, -2.5, -8.25);
    column4.isVisible = false;

    //Column 5
    const column5 = column1.clone("column5");
    column5.position = new BABYLON.Vector3(-5.75, -2.5, -8.25);
    column5.isVisible = false;

    //Column 6
    const column6 = column1.clone("column6");
    column6.position = new BABYLON.Vector3(3.75, -2.5, -8.25);
    column6.isVisible = false;

    const hitboxes = [leftWall, rightWall, frontWall, backWall, column1, column2, column3, column4, column5, column6];

    return hitboxes;
}

function treasureChestHitbox(scene, zeldaChest) {
    //Treasure chest hitbox (for interaction)
    const chestHitbox = BABYLON.MeshBuilder.CreateBox("chestHitbox", {height: 1.0, width: 1.4, depth: 1.2}, scene);
    var chestHitboxMat = new BABYLON.StandardMaterial("chestHitboxMat", scene);
    chestHitboxMat.emissiveColor = BABYLON.Color3.White();
    chestHitboxMat.wireframe = true;
    chestHitbox.material = chestHitboxMat;
    chestHitbox.parent = zeldaChest;
    chestHitbox.position = new BABYLON.Vector3(0.0, 0.5, 0.4);
    chestHitbox.isVisible = false;

    return chestHitbox;
}

//IN intersectMesh USARE PRECISE=TRUE PER I CILINDRI DELLE COLONNE
//Function introduced only to reduce the length in the if in the render cycle
function playerCanMove(playerLocHitbox, mapHitboxes) {
    for(let i=0; i<mapHitboxes.length; i++) {
        if(playerLocHitbox.intersectsMesh(mapHitboxes[i], true)/* || playerLocHitbox.intersectsMesh(mapHitboxes[i], true)*/) return false;
        //else if(playerHitbox.intersectsMesh(mapHitboxes[i], true) && !playerLocHitbox.intersectsMesh(mapHitboxes[i], true))
    }

    return true;
}

function bossCanChase(bossHitbox, linkLine, mapHitboxes) {
    for(let i=0; i<mapHitboxes.length; i++) {
        if(bossHitbox.intersectsMesh(mapHitboxes[i], true) && linkLine.intersectsMesh(mapHitboxes[i], true)) return false;
    }

    return true;
}

//Function to reveal all hitboxes with a button
function debugMode(allHitboxes) {
    for(let i=0; i<allHitboxes.length; i++) {
        if(allHitboxes[i].isVisible == false) allHitboxes[i].isVisible = true;
        else allHitboxes[i].isVisible = false;
    }
}