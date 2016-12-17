#pragma strict

var SystemManagerObject : GameObject;

var Player : Transform;
var target : Transform;
//Turn Player Vorlage
var rotation : Transform;
var speed: float = 3;
var dampingLook = 6.0;                // How slowly to turn

function LookAtNewTarget() {
    rotation.position = Player.transform.position;
    rotation.LookAt(target);
}

function Update () {
    WalkToNextSpot();
}

function WalkToNextSpot(){
    
    //target.position.y = transform.position.y; // Keep waypoint at character's height
    var dist = Vector3.Distance(target.transform.position, Player.position);
 
    if(dist < 0.5){
        
        //Perfect fit
        Player.position=target.transform.position;

        //Ziel Erreicht
        var SystemManager = SystemManagerObject.GetComponent(SystemManagerScript);
        SystemManager.ArrivedAtPoint();
            
    }else{        
        
        //Turn Player
        //rotation.position = Player.transform.position;
        //rotation.LookAt(target);
        //rotation.rotation.x=0.0;
        //rotation.rotation.z=0.0;
        //Player.rotation = Quaternion.Slerp(Player.rotation, rotation.rotation, Time.deltaTime * dampingLook);

        Player.LookAt(target);

        //Turn Player
        //var rotation2 = Quaternion.LookRotation(target.transform.position - Player.transform.position);
        //transform.rotation = Quaternion.Slerp(transform.rotation, rotation2, Time.deltaTime * dampingLook);
        
        //Move Player
        Player.transform.position = Vector3.Lerp(Player.transform.position, target.position, Time.deltaTime * speed);
    }    
}