#pragma strict

var SystemManagerObject : GameObject;

var PlayerCamera : Transform;

enum Axes {MouseXandY, MouseX, MouseY}
var Axis : Axes = Axes.MouseXandY;
 
var sensitivityX = 15.0;
var sensitivityY = 15.0;
 
var minimumX = -360.0;
var maximumX = 360.0;
 
var minimumY = -60.0;
var maximumY = 60.0;
 
var rotationX = 0.0;
var rotationY = 0.0;
 
var lookSpeed = 2.0;

function Awake () {
    
    rotationX = PlayerCamera.localRotation.y;
    rotationY = PlayerCamera.localRotation.x;
}

function Update () {
    LookAround();
    ClikOnSomething();
}



function LookAround(){
    if (Axis == Axes.MouseXandY)
    {
        // Read the mouse input axis
        rotationX += Input.GetAxis("Mouse X") * sensitivityX;
        rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
 
        // Call our Adjust to 360 degrees and clamp function
        Adjust360andClamp();
 
        // If you don't want to allow a key to affect X, keep this line but take it out of the if
        PlayerCamera.localRotation = Quaternion.AngleAxis (rotationX, Vector3.up);
 
        // If you don't want to allow a key to affect Y, keep this line but take it out of the if
        PlayerCamera.localRotation *= Quaternion.AngleAxis (rotationY, Vector3.left);
    }
    else if (Axis == Axes.MouseX)
    {
        // Read the mouse input axis
        rotationX += Input.GetAxis("Mouse X") * sensitivityX;
 
        // Call our Adjust to 360 degrees and clamp function
        Adjust360andClamp();
 
        //If you don't want to allow a key to affect X, keep this line but take it out of the if
        PlayerCamera.localRotation = Quaternion.AngleAxis (rotationX, Vector3.up);
 
    }
    else
    {
        // Read the mouse input axis
        rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
 
        // Call our Adjust to 360 degrees and clamp function
        Adjust360andClamp();
 
        // If you don't want to allow a key to affect Y, keep this line but take it out of the if
        PlayerCamera.localRotation = Quaternion.AngleAxis (rotationY, Vector3.left);
 
    }
}

function Adjust360andClamp ()
{
    //      This prevents your rotation angle from going beyond 360 degrees and also 
    //      clamps the angle to the min and max values set in the Inspector.
 
    // During in-editor play, the Inspector won't show your angle properly due to 
    // dealing with floating points. Uncomment this Debug line to see the angle in the console.
 
    // Debug.Log (rotationX);
 
    // Don't let our X go beyond 360 degrees + or -
    if (rotationX < -360)
    {
        rotationX += 360;
    }
    else if (rotationX > 360)
    {
        rotationX -= 360;
    }   
 
    // Don't let our Y go beyond 360 degrees + or -
    if (rotationY < -360)
    {
        rotationY += 360;
    }
    else if (rotationY > 360)
    {
        rotationY -= 360;
    }
 
    // Clamp our angles to the min and max set in the Inspector
    rotationX = Mathf.Clamp (rotationX, minimumX, maximumX);
    rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
}

function ClikOnSomething(){
    if ( Input.GetMouseButtonDown (0)){ 
        var hit : RaycastHit; 
        var ray : Ray;
        ray = Camera.main.ScreenPointToRay(Input.mousePosition); 
        if ( Physics.Raycast (ray ,hit,100.0f)) {
        var SystemManager = SystemManagerObject.GetComponent(SystemManagerScript);
            if(hit.transform.gameObject.tag== "Waypoint"){
                //Reset cam rotation
                PlayerCamera.localRotation = new Quaternion(0.0,0.0,0.0,0.0);

                Debug.Log("New Wypoint");                
                SystemManager.MoveToPoint(hit.transform);                

            }else  if(hit.transform.gameObject.tag== "Item"){
                SystemManager.GotItem(hit.transform);                
            }
            Debug.Log("You selected the " + hit.transform.name); // ensure you picked right object
        }
    }
}