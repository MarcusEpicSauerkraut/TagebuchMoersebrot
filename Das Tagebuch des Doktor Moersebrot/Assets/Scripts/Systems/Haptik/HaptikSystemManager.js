#pragma strict

var SystemManager : GameObject;

var MouseXMovement = 0.0;
var MouseYMovement = 0.0;

var sensitivityX = 15.0;
var sensitivityY = 15.0;
 
var minimumX = -10.0;
var maximumX = 10.0;
 
var minimumY = -10.0;
var maximumY = 10.0;

//HaptikObject
var HaptikObject : GameObject;
var TypeOfHaptik = 0;

function Start () {
	
}

function Update () {
    ReadMouseMovement();
    TranslatePower();
    EndingHaptik();
}

function ReadMouseMovement(){
    MouseXMovement = Input.GetAxis("Mouse X") * sensitivityX;
    MouseYMovement += Input.GetAxis("Mouse Y") * sensitivityY;

    //Immer noch im Rahmen
    if(MouseXMovement > maximumX){
        MouseXMovement = maximumX;
    }else if(MouseXMovement < minimumX){
        MouseXMovement = minimumX;
    }
    if(MouseYMovement > maximumY){
        MouseYMovement = maximumY;
    }else if(MouseYMovement < minimumY){
        MouseYMovement = minimumY;
    }

}

function TranslatePower(){
    if(TypeOfHaptik){
        var HaptikObjectSystem1 = HaptikObject.GetComponent(HaptikChestSystem);
        HaptikObjectSystem1.GetMousePower(MouseXMovement,MouseYMovement);
    }
}

function EndingHaptik(){
    if (!Input.GetMouseButton (0)){ 
        var SystemManagement = SystemManager.GetComponent(SystemManagerScript);
        SystemManagement.HaptikInteractionOFF();
    }
}
