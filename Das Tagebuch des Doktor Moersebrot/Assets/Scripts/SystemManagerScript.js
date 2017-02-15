#pragma strict

var LookAroundSystemObject : GameObject;
var MoveToWaypointSystemObject : GameObject;
var ItemLookAtSystemObject : GameObject;
var HaptikSystemManagerObject : GameObject;

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
    var SystemManager = LookAroundSystemObject.GetComponent(LookAroundSystem);
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

function HaptikInteractionON(haptikObject : GameObject, haptikType : int){
    LookAroundSystemObject.SetActive(false);
    HaptikSystemManagerObject.SetActive(true);
    var SystemManager = HaptikSystemManagerObject.GetComponent(HaptikSystemManager);
    SystemManager.HaptikObject=haptikObject;
    SystemManager.TypeOfHaptik=haptikType;
}

function HaptikInteractionOFF(){
    LookAroundSystemObject.SetActive(true);
    HaptikSystemManagerObject.SetActive(false);
}