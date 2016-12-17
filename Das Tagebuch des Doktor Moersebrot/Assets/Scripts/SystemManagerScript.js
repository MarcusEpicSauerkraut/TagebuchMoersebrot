#pragma strict

var LookAroundSystemObject : GameObject;
var MoveToWaypointSystemObject : GameObject;
var ItemLookAtSystemObject : GameObject;

function Start () {

}

function MoveToPoint(newWaypoint : Transform){
    MoveToWaypointSystemObject.SetActive(true);
    LookAroundSystemObject.SetActive(false);

    var SystemManager = MoveToWaypointSystemObject.GetComponent(MoveToWaypointSystem);
    SystemManager.target=newWaypoint;
    SystemManager.LookAtNewTarget();    
}

function ArrivedAtPoint(){
    MoveToWaypointSystemObject.SetActive(false);
    LookAroundSystemObject.SetActive(true);
}

function GotItem(Item : Transform){
    LookAroundSystemObject.SetActive(false);
    ItemLookAtSystemObject.SetActive(true);
    var ItemLookAtSystemManager = ItemLookAtSystemObject.GetComponent(ItemLookAtSystem);
    ItemLookAtSystemManager.StartItAll(Item);  
}

function ItemIsGone(){
    LookAroundSystemObject.SetActive(true);
    ItemLookAtSystemObject.SetActive(false);
}
