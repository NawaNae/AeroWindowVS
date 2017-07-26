function setWindowMaxWH(AeroWindow)
{
    var content = AeroWindow.getElementsByClassName('content')[0];
    var workbar = parseInt(getStyle(document.getElementsByClassName('workbar')[0], 'height').replace('px', ''));
    var dragbar = parseInt(getStyle(AeroWindow.getElementsByClassName('dragbar')[0], 'height').replace('px', ''));
    var padding = parseInt(getStyle(AeroWindow, 'padding-top').replace('px', ''));
    var border = parseInt(getStyle(AeroWindow, 'border-top-width').replace('px', ''));
    content.style.maxHeight = document.documentElement.clientHeight - border*2- padding*2 - dragbar - workbar -4;//雙邊padding+title
    content.style.maxWidth = document.documentElement.clientWidth  - border * 2 - padding * 2 -4 ;//雙邊padding 4*2
}
function setAllWindowMaxWH()
{
    Array.from(document.getElementsByClassName('AeroGlass')).forEach(
        function (ele, ind, arr)
        {
            setWindowMaxWH(ele);
        }
    );
}
function WindowList_push(ControlObj)
{
    WindowList.push(ControlObj);
    if (WindowList.length == 1)/*first window hwnd=0*/
        WindowList[0].setHandle(0);
    else/*other window hwnd = last window.hwnd++*/
        WindowList[WindowList.length - 1].setHandle(parseInt(WindowList[WindowList.length - 2].ExecuteObj.Window.dataset.handle) + 1);
}
function min_onClick()
{
    var WindowCtrl = GetAncenstorAeroWindowCtrl(this);
    if (!WindowCtrl.IsState('min'))
        WindowCtrl.min();
    else
        WindowCtrl.deMin();
    
}
function max_onClick() {
    var AeroWindow = this.parentNode.parentNode.parentNode;
    var content = AeroWindow.getElementsByClassName('content')[0];
    if (!AeroWindow.classList.toggle('max'))/*max*/
    {
        var size = JSON.parse(AeroWindow.dataset.size);
        var position = JSON.parse(AeroWindow.dataset.position);
        AeroWindow.classList.add('normal');
        content.style.width = size.width;
        content.style.height = size.height;
        AeroWindow.style.left = position.x;
        AeroWindow.style.top = position.y;
    }
    else /*normal*/
    {
        AeroWindow.classList.remove('normal');
        var pos =
            {
                x: getStyle(AeroWindow, "left"),
                y: getStyle(AeroWindow, "top")
            };
        var size =
            {
                width: getStyle(content, 'width'),
                height: getStyle(content, 'height')
            };
        AeroWindow.dataset.position = JSON.stringify(pos);
        AeroWindow.dataset.size = JSON.stringify(size);
        var AeroWindow = this.parentNode.parentNode.parentNode;
        AeroWindow.style.left = '0';
        AeroWindow.style.top = '0';
        var content = AeroWindow.getElementsByClassName('content')[0];
        content.style.width = getStyle(content, "max-width");
        content.style.height = getStyle(content, "max-height");
    }
}
function close_onClick() {
    var AeroGlass = this.parentNode.parentNode.parentNode;
    for (var key in WindowList)
    {
       // console.log(WindowList[key]);
        if (WindowList[key].handle == AeroGlass.dataset.handle)
        {
            for (var i in WindowList[key].ExecuteObj)
            {
                WindowList[key].ExecuteObj[i].remove();
            }
            WindowList.splice(key, 1);

            break;
        }
    }
}
function dragbar_onDbclick()
{
    var WindowCtrl = GetAncenstorAeroWindowCtrl(this);
    WindowCtrl.max();
}
function new_dragBar() {
    var DragBar = document.createElement("div");
    DragBar.style.width = "100 %";
    DragBar.classList.add("dragbar");
    DragBar.addEventListener("dblclick", dragbar_onDbclick);
    return DragBar;
}
function new_icon(icon) {
    var newicon = document.createElement("img");
    newicon.src = (isset(icon)) ? icon : emptyIcon;
    return newicon;
}
function new_title(title) {
    var newTitle = document.createElement("div");
    newTitle.classList.add("title");
    newTitle.innerText = !isset(title) ? "WidowsApplication" : title;
    return newTitle;
}
function new_Control(name/*min max...*/, text/*_口X*/, click/*function*/)
{
    var newCtrl = document.createElement("div");
    newCtrl.classList.add("control");
    newCtrl.classList.add(name);
    newCtrl.addEventListener("click", click, false);  
    newCtrl.innerText = text;
    return newCtrl;
}
function new_Controlbox(style)
{
    if (!isset(style)) style = '111';
    var newControlBox = document.createElement("div");
    newControlBox.classList = "control_box";
    
   if (style[0] == '1') 
       newControlBox.appendChild(new_Control("min", "_", min_onClick));
   if (style[1] == '1') 
       newControlBox.appendChild(new_Control("max", "□", max_onClick));
   if (style[2] == '1') 
       newControlBox.appendChild(new_Control("close", "X", close_onClick));
    return newControlBox;
}
function new_Content(type)
{
    var newContent = document.createElement(type);
    newContent.classList.add("content");
    return newContent;
}
function new_ContentA(src)
{
    var newContent = new_Content("div");
    /*get content*/
    GETRequest(src, function (xmlhttps) {
        newContent.innerHTML = xmlhttps.responseText;
    });
    return newContent;
}
function new_ContentI(src)
{
    var newIframe = new_Content("iframe");
    newIframe.src = src;
    newIframe.frameborder = 0;
   /* if (newIframe.attachEvent) 
        newIframe.attachEvent("onload", ifram_OnloadedLoadtitleAndicon);
     else 
        newIframe.onload = ifram_OnloadedLoadtitleAndicon;*/
    
    return newIframe;
}
function create_windowFrame( title, icon, style, x, y,father)
{
    /*Create Window Frame*/
    var newWindow = document.createElement("div");
    newWindow.classList.add("AeroGlass");
    /*Set Window to Container*/
    if (!isset(father)) father = document.getElementsByClassName("container")[0];
    father.appendChild(newWindow);
    
    /*Window Size*/
    newWindow.style.maxHeight = window.innerHeight;
    newWindow.style.maxWidth = window.innerWidth;
    /*Window Position*/
   
    newWindow.style.left =  !isset(x)  ? 0 : x;
    newWindow.style.top =  !isset(y) ? 0 : y;
    /*DragBar*/
    var dragbar = new_dragBar();
    newWindow.appendChild(dragbar);
    /*icon*/
    dragbar.appendChild(new_icon(icon));
    /*title*/
    dragbar.appendChild(new_title(title));
    /*control box*/
    dragbar.appendChild(new_Controlbox(style));
    /*DragMove*/
    addNodeDragMove(newWindow);
    return newWindow;
}
function createWorkbaritem(AeroWindow)
{
    var WorkBarItme = document.createElement("div");
    WorkBarItme.classList.add("workbar_item");
    var Icon = document.createElement("img");
    Icon.src = AeroWindow.getElementsByTagName("img")[0].src;
    var amount = document.createElement("div");
    amount.classList.add("amount");
    var text = document.createElement("div");
    text.classList.add("text");
    text.innerText = AeroWindow.getElementsByClassName("title")[0].innerText;
    WorkBarItme.appendChild(Icon);
    WorkBarItme.appendChild(amount);
    WorkBarItme.appendChild(text);
    WorkBarItme.addEventListener("mousedown", function ()
    {
        var WindowCtrl = GetWindowCtrlByWindow(AeroWindow);
        if (WindowCtrl.IsState('min'))
            WindowCtrl.deMin();
        else if (WindowCtrl.IsState('active'))
            WindowCtrl.min();
        else
            Active(AeroWindow);
    }
    );
    return WorkBarItme;
}
function createWindowCommon(  title, icon, style, x, y, father) {
    /*frame of Window*/
    var newWindow = create_windowFrame( title, icon, style, x, y, father);
    var workBarItem = createWorkbaritem(newWindow);
    document.getElementsByClassName('WorkBar')[0].appendChild(workBarItem);
    /*Window List*/
    WindowList_push(new AeroWindowControl(newWindow, workBarItem));
    Active(newWindow);
    return newWindow;
}
function createAeroWindowO(contentObj, title, icon, style/*using binary string to express min max close(1/0) */, x, y, father)
{/*create Window by DomElementObject*/
    var newWindow = createWindowCommon(title, icon, style, x, y, father);
    newWindow.appendChild(contentObj);
    setWindowMaxWH(newWindow);
    return newWindow;
}
function createAeroWindowS(contentstring, title, icon, style, x, y, father)
{/*create Window by string*/
    var content = new_Content('div');
    content.innerText = contentstring;
    var newWindow = createAeroWindowO(content, title, icon, style, x, y, father);
    return newWindow;
}
function createAeroWindowI(content_src, title, icon, style, x, y, father)
{/*create Window by Iframe and source from src*/
    var newContent = new_ContentI(content_src);
    var newWindow = createAeroWindowO(newContent, title, icon, style, x, y, father);
    return newWindow;
}
function createAeroWindowA(content_src, title, icon, style, x, y, father)
{/*create Window by Ajax and soucrce from src*/
    var newContent = new_ContentA(content_src);
    var newWindow = createAeroWindowO(newContent, title, icon, style, x, y, father);
    return newWindow;
}
function createFullAeroWindowA(content_src, title, icon, style, x, y, father)
{/*create full Aero Window by Ajax and source from src*/
    var newWindow = createAeroWindowA(content_src, title, icon, style/*using binary to express min max close(1/0) 0~7*/, x, y, father)
    newWindow.getElementsByClassName('content')[0].classList.add('Aero');
    return newWindow;
}
function createFullAeroWindowI(content_src, title, icon, style, x, y, father)
{/*create full Aero Window by Iframe and source from src*/
    var newWindow = createAeroWindowI(content_src, title, icon, style, x, y, father)
    newWindow.getElementsByClassName('content')[0].classList.add('Aero');
    return newWindow;
}
function alertAero(content,title,icon,style,x,y,father)
{/*create alert Window */
    if (!isset(style)) style = '001';
    if (!isset(title)) title = 'alert';
    var newWindow = createAeroWindowS(content, title, icon, style, x, y, father);
    var okbtn = document.createElement("button");
    okbtn.innerText = "ok";
    okbtn.classList.add("alertok");
    var content = newWindow.getElementsByClassName('content')[0].appendChild(okbtn);
    okbtn.addEventListener("click", function () {
        GetAncenstorAeroWindow(this).getElementsByClassName('close')[0].click();
    })
    return newWindow;
}
function alertFullAero(content, title, icon, style, x, y, father)
{/*create full aero alert Window */
    var newWindow = alertAero(content, title, icon, style, x, y, father);
    newWindow.getElementsByClassName('content')[0].classList.add('Aero');
    return newWindow;
}
function new_desktopIcon(src, txt, style, x, y, trg, icon, father)
{
    var dskicon = document.createElement('div');
    dskicon.classList.add('icon');
    if (!isset(trg)) {
        dskicon.addEventListener("dblclick", function () { createAeroWindowA(src, txt, icon, style, x, y, father) });
        dskicon.addEventListener("touchstart", function () { createAeroWindowA(src, txt, icon, style, x, y, father) });
    }
    else
        switch (trg) {
            case 'iframe':
                dskicon.addEventListener("dblclick", function () { createAeroWindowI(src, txt, icon, style, x, y, father) });
                dskicon.addEventListener("touchstart", function () { createAeroWindowA(src, txt, icon, style, x, y, father) });
                break;
        }
    var img = document.createElement('img');
    img.src = (icon) ? icon : emptyIcon;
    dskicon.appendChild(img);
    var text = document.createElement('div');
    text.innerText = txt;
    text.classList.add('text');
    dskicon.appendChild(text);
    return dskicon;
}
function createDesktopIcon(src,txt,style,x,y,trg,icon,desktop,father)
{
    var dskicon = new_desktopIcon(src, txt, style, x, y, trg, icon, father);
    if (!isset(desktop))
        document.querySelector(".desktop").appendChild(dskicon);
    else
        desktop.appendChild(dskicon);
    return dskicon;
}
function createDesktopIconD(iconDivObj)
{
    var newIcon = new_desktopIcon(iconDivObj.dataset.src, iconDivObj.innerText, iconDivObj.dataset.style, iconDivObj.dataset.x, iconDivObj.dataset.y, iconDivObj.dataset.target, iconDivObj.dataset.icon, iconDivObj.dataset.father);
    iconDivObj.parentNode.replaceChild(newIcon, iconDivObj);
    return newIcon;
}
function replaceAllDesktopIcon()
{
    var dskicons = document.querySelectorAll(".desktop .icon")
    for (var i = 0; i < dskicons.length;i++)
        createDesktopIconD(dskicons[i]);
}
replaceAllDesktopIcon();
setAllWindowMaxWH();
document.body.onresize = setAllWindowMaxWH;