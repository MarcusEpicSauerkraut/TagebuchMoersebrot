#pragma strict

//LookAroundSystem
var LookAroundSystem : GameObject;

//Cursor Icons
var cursorMode: CursorMode = CursorMode.Auto;
public var hotSpot: Vector2 = Vector2.zero;

var cursorTexture1: Texture2D;
var cursorTexture2: Texture2D;

function Start(){
    Cursor.visible = true;
    Cursor.lockState=CursorLockMode.Locked;
    //Screen.lockCursor = true;
}

function Update () {
    if(LookAroundSystem.activeSelf){
        Cursor.visible = true;
    }else {
        Cursor.visible = false;
    }
    
    Cursor.lockState=CursorLockMode.Locked;
    CheckCursor();
    //Screen.lockCursor = true;
}

function CheckCursor(){

    var hit : RaycastHit; 
    var ray : Ray;
    ray = Camera.main.ScreenPointToRay(Input.mousePosition); 
    if ( Physics.Raycast (ray ,hit,10.0)) {        
        if(hit.transform.gameObject.tag== "Waypoint" || hit.transform.gameObject.tag== "Item"){
            Cursor.SetCursor(cursorTexture2, hotSpot, cursorMode);
        }else {
            Cursor.SetCursor(cursorTexture1, hotSpot, cursorMode);
        }
    }
}