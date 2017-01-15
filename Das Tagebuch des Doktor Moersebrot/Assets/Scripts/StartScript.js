#pragma strict

var GameSetup : GameObject;

function Start () {
    Instantiate(GameSetup, transform.position, transform.rotation);
}