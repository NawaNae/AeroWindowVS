// JavaScript source code
function isset(obj) {
    return !(typeof obj === 'undefined');
}
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
    loadJS('js/dragmoveByNawaNawa.js', document.querySelector('head'));
    loadJS('js/WindowsByNawaNawa.js', document.querySelector('head'));
    loadJS('js/AJAX.js', document.querySelector('head'));
    document.querySelector('head').innerHTML += '<link rel="stylesheet" href="css/AeroGlassByNawaNawa.css" type="text/css"/>';
    document.querySelector('head').innerHTML += '<link rel="stylesheet" href="css/DesktopIconByNawaNawa.css" type="text/css"/>';
}
if (!isset(WindowList))
{ var WindowList = new Array(); }