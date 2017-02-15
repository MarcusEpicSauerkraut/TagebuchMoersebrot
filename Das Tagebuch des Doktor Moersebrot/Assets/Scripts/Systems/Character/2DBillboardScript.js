#pragma strict

var AnschauObjekt : GameObject;

function Start () {
	
}

function Update () {
    if(AnschauObjekt==null)
    {
        AnschauObjekt = GameObject.Find("Main Camera");
    }else {
        transform.LookAt(AnschauObjekt.transform);
        transform.rotation.x = 0.0;
        transform.rotation.z = 0.0;
    }
   
}
