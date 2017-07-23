// JavaScript source code
/*AeroWindowContorl */
var emptyIcon = "Images/file_empty.png";
function AeroWindowControl(AeroWindow, WorkbarItem) {
    this.ExecuteObj =
        {
            Window: AeroWindow,
            WorkbarItem: WorkbarItem
        };
    this.handle = -1;
    this.icon = "Images\file_empty.png";
    this.title = "UnnamedPage";
}
AeroWindowControl.prototype.setHandle = function (hwnd) {
    for (var i in this.ExecuteObj) {
        this.ExecuteObj[i].dataset.handle = hwnd;
    }
    this.handle = hwnd;
}
AeroWindowControl.prototype.setTitles = function (title) {
    this.ExecuteObj.Window.getElementsByClassName('title')[0].innerText = title;
    this.ExecuteObj.WorkbarItem.getElementsByClassName('text')[0].innerText = title;
}
AeroWindowControl.prototype.updateTitles = function ()
{
    this.setTitles(this.title);
}
AeroWindowControl.prototype.setIcon = function (icon) {
    this.ExecuteObj.Window.getElementsByTagName('img')[0].src = icon;
    this.ExecuteObj.WorkbarItem.getElementsByTagName('img')[0].src = icon;
}
AeroWindowControl.prototype.updateicon = function () {
    this.setIcon(this.icon);
}
function getStyle(elem, cssname) {
    return window.getComputedStyle(elem, null).getPropertyValue(cssname);
}
function getWinCtrlByHwnd(hwnd)
{
    for (var i in WindowList)
    {
        if (WindowList[i].handle == hwnd)
            return WindowList[i];
    }
}
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