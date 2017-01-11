#pragma strict

var SystemManagerObject : GameObject;

var Player : Transform;
var target : Transform;
//Turn Player Vorlage
var rotation : Transform;
var speed: float = 3;
var dampingLook = 6.0;                // How slowly to turn

//Headbobbing
var PlayerCam : Transform;
var currentHeadBob = 0;
var headbobwait = 0.0;
var HeadBobPlaceA : Transform;
var HeadBobPlaceB : Transform;
var HeadBobPlaceC : Transform;

//Sounds
var Footstep1 : AudioSource;

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
        
        //Player.transform.position = Vector3.Lerp(Player.transform.position, target.position, Time.deltaTime * speed);
        Player.transform.position += Player.transform.forward *Time.deltaTime *speed;

        //HeadBob
        HeadBobbing();
    }    
}

function HeadBobbing(){
    headbobwait +=4.0*Time.deltaTime;
    if(headbobwait>1.0){
        currentHeadBob+=1;

        if(currentHeadBob==4)
            currentHeadBob=0;

        //SoundPlay
        if(currentHeadBob==0 || currentHeadBob==2){
            FootstepSound();
        }

        headbobwait=0.0;
    }
    if(currentHeadBob==0){
        PlayerCam.transform.position = Vector3.Lerp(PlayerCam.transform.position, HeadBobPlaceB.position, Time.deltaTime * 2.0);
    }else  if(currentHeadBob==1){
        PlayerCam.transform.position = Vector3.Lerp(PlayerCam.transform.position, HeadBobPlaceA.position, Time.deltaTime * 2.0);
    }else  if(currentHeadBob==2){
        PlayerCam.transform.position = Vector3.Lerp(PlayerCam.transform.position, HeadBobPlaceB.position, Time.deltaTime * 2.0);
    }else  if(currentHeadBob==3){
        PlayerCam.transform.position = Vector3.Lerp(PlayerCam.transform.position, HeadBobPlaceC.position, Time.deltaTime * 2.0);
    }
    
}

function FootstepSound(){
    Footstep1.Stop();
    var RandomPitch = Random.Range(0.8,1.2);
    Footstep1.pitch = RandomPitch;
    Footstep1.Play();
}