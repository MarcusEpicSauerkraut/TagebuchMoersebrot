#pragma strict

var GameSetup : GameObject;

function Start () {
    //Start it all
    Instantiate(GameSetup, transform.position, transform.rotation);
}