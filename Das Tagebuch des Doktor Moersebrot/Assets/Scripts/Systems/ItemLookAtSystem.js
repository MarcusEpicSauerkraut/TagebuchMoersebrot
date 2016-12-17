#pragma strict

var SystemManager : GameObject;

var Mode = 0;

var myItem : Transform;

var AnschauPosition : Transform;
var OriginalPosition : Vector3;
var RotationSaver : Transform;

var rotationX = 0.0;
var rotationY = 0.0;

private var speed = 300.0;

function Start () {

}

function Update () {
    if(Mode==1){
        GetItemToCam();
    }else if(Mode==2){
        RotateItem();
    }else if(Mode==3){
        ResetItemToPlace();
    }
    
}

function StartItAll(NewItem : Transform){
    myItem = NewItem;
    OriginalPosition = myItem.position;
    RotationSaver.rotation = myItem.rotation;
    Mode=1;
}

function GetItemToCam(){
    var dist = Vector3.Distance(myItem.position, AnschauPosition.position);
 
    if(dist < 0.2){
        myItem.position = AnschauPosition.position;
        Mode=2;
    }else {
        myItem.position = Vector3.Lerp(myItem.position, AnschauPosition.position, Time.deltaTime * 10.0);
    }
}

function RotateItem(){
    // Read the mouse input axis
    rotationX = Input.GetAxis("Mouse X");
    rotationY = Input.GetAxis("Mouse Y");

    var RotationX : Quaternion = Quaternion.AngleAxis(rotationX * Time.deltaTime*speed, transform.up);
    myItem.rotation *= RotationX;

    var RotationY : Quaternion = Quaternion.AngleAxis(rotationY * Time.deltaTime*speed, transform.right);
    myItem.rotation *= RotationY;

    //myItem.Rotate(rotationY*speed,rotationX*speed,0.0);

    if ( Input.GetMouseButtonDown (1)){ 
        Mode=3;
    }
}

function ResetItemToPlace(){
    var dist = Vector3.Distance(myItem.position, OriginalPosition);
 
    if(dist < 0.2){
        myItem.position = OriginalPosition;
        myItem.rotation = RotationSaver.rotation;
        Mode=2;
        var SystemManagement = SystemManager.GetComponent(SystemManagerScript);
        SystemManagement.ItemIsGone();  
    }else {
        myItem.position = Vector3.Lerp(myItem.position, OriginalPosition, Time.deltaTime * 10.0);
        myItem.rotation = Quaternion.Slerp(myItem.rotation, RotationSaver.rotation, Time.deltaTime * 10.0);
    }
}