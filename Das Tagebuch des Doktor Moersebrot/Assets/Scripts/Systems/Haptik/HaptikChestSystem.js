#pragma strict
var HaptikSystemManager : GameObject;

var Schanier : Transform;

var YRotationPower = 0.0;

function Start () {
	
}

function Update () {
    ChestOpen();
}

function GetMousePower(powerX : float, powerY : float){
    YRotationPower=powerY;
    Debug.Log("Power: " + YRotationPower);
}

function ChestOpen(){
    Schanier.rotation.x += YRotationPower;
}