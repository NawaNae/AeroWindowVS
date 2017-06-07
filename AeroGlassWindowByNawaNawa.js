// JavaScript source code
var loadJS = function (url, location) {
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to 
    //insert the <script> element

    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    location.appendChild(scriptTag);
};
window.onload = function ()
{
    loadJS('Js/dragmoveByNawaNawa.js', document.querySelector('head'));
    //addDragMove() 
    document.querySelector('head').innerHTML += '<link rel="stylesheet" href="AeroGlassWindow.css" type="text/css"/>';

}