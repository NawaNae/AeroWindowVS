// JavaScript source code
/*AeroWindowContorl */
if (!isset(WindowList))
{ var WindowList = new Array(); }
var emptyIcon = "Images/file_empty.png";
function removeAllActive() {
    Array.from(document.getElementsByClassName("active")).forEach
        (function (ele, ind, arr) {
            ele.classList.remove("active");
        }
        );
}
function Active(AeroGlass) {
    removeAllActive();
    getWinCtrlByHwnd(AeroGlass.dataset.handle).ExecuteObj.WorkbarItem.classList.add('active');
    AeroGlass.classList.add("active");
    tempindex = getStyle(AeroGlass, 'z-index');
    AeroGlass.style.zIndex = maxzindex;
    Array.from(document.getElementsByClassName("AeroGlass")).forEach
        (function (ele, ind, arr) {
            if (getStyle(ele, "z-index") > tempindex)
                ele.style.zIndex--;
        }
        );
}
function ActiveNonMinSencondWindow() {
    var HighestWindow;
    for (var i in WindowList)
        if (!WindowList[i].IsState('min'))//not min
            if (isset(HighestWindow)) {
                if (getStyle(HighestWindow, "z-index") < getStyle(WindowList[i].ExecuteObj.Window, "z-index"))
                    HighestWindow = WindowList[i].ExecuteObj.Window;
            }
            else
                HighestWindow = WindowList[i].ExecuteObj.Window;
    if (isset(HighestWindow)) Active(HighestWindow);
}               
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
    this.title = title;
    this.ExecuteObj.Window.getElementsByClassName('title')[0].innerText = title;
    this.ExecuteObj.WorkbarItem.getElementsByClassName('text')[0].innerText = title;
}
AeroWindowControl.prototype.updateTitles = function ()
{
    this.setTitles(this.title);
}
AeroWindowControl.prototype.setIcon = function (icon) {
    this.icon = icon;
    this.ExecuteObj.Window.getElementsByTagName('img')[0].src = icon;
    this.ExecuteObj.WorkbarItem.getElementsByTagName('img')[0].src = icon;
}
AeroWindowControl.prototype.updateicon = function () {
    this.setIcon(this.icon);
}
AeroWindowControl.prototype.IsState = function (StateStr) {
    return this.ExecuteObj.Window.classList.contains(StateStr);
}
AeroWindowControl.prototype.min = function ()
{
    var content = this.ExecuteObj.Window.getElementsByClassName('content')[0];
    if (!this.ExecuteObj.Window.classList.contains('min')) 
        this.ExecuteObj.Window.classList.add('min');
    this.ExecuteObj.Window.style.display = 'none';
    if (this.IsState('active')) ActiveNonMinSencondWindow();
}
AeroWindowControl.prototype.deMin = function () {
    if (this.ExecuteObj.Window.classList.contains('min'))
    {
        this.ExecuteObj.Window.classList.remove('min');
        Active(this.ExecuteObj.Window);
    }
    this.ExecuteObj.Window.style.display = 'block';
}
AeroWindowControl.prototype.max = function ()
{
    if (this.ExecuteObj.Window.classList.contains('min')) {
        this.ExecuteObj.Window.classList.remove('min');
        this.ExecuteObj.Window.style.display = 'block';
    }
    var content = this.ExecuteObj.Window.getElementsByClassName('content')[0];
    if (!this.ExecuteObj.Window.classList.toggle('max'))/*max*/ {
        var size = JSON.parse(this.ExecuteObj.Window.dataset.size);
        var position = JSON.parse(this.ExecuteObj.Window.dataset.position);
        this.ExecuteObj.Window.classList.add('normal');
        content.style.width = size.width;
        content.style.height = size.height;
        this.ExecuteObj.Window.style.left = position.x;
        this.ExecuteObj.Window.style.top = position.y;
    }
    else /*normal*/ {
        this.ExecuteObj.Window.classList.remove('normal');
        var pos =
            {
                x: getStyle(this.ExecuteObj.Window, "left"),
                y: getStyle(this.ExecuteObj.Window, "top")
            };
        var size =
            {
                width: getStyle(content, 'width'),
                height: getStyle(content, 'height')
            };
        this.ExecuteObj.Window.dataset.position = JSON.stringify(pos);
        this.ExecuteObj.Window.dataset.size = JSON.stringify(size);
        this.ExecuteObj.Window.style.left = '0';
        this.ExecuteObj.Window.style.top = '0';
        var content = this.ExecuteObj.Window.getElementsByClassName('content')[0];
        content.style.width = getStyle(content, "max-width");
        content.style.height = getStyle(content, "max-height");
    }
}
AeroWindowControl.prototype.close = function ()
{

}
function removeAllActive() {
    Array.from(document.getElementsByClassName("active")).forEach
        (function (ele, ind, arr) {
            ele.classList.remove("active");
        }
        );
}
AeroWindowControl.prototype.active = function () {
    if (this.ExecuteObj.Window.classList.contains('min'))
        this.deMin();
    Active(this.ExecuteObj.Window);
}
function GetAncenstorAeroWindow(node)
{
    while (!node.classList.contains("AeroGlass") || !isset(node))
     node = node.parentNode
    return node;
}
function GetWindowCtrlByHwnd(hwnd)
{
    for (var i in WindowList)
        if (WindowList[i].ExecuteObj.Window.dataset.handle == hwnd)
            return WindowList[i];
}
function GetWindowCtrlByWindow(Window)
{
    return GetWindowCtrlByHwnd(Window.dataset.handle);
}
function GetAncenstorAeroWindowCtrl(node) {
    return GetWindowCtrlByWindow(GetAncenstorAeroWindow(node));
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
