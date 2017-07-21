

function setWindowMaxWH(AeroWindow)
{
   AeroWindow.style.maxHeight = window.innerHeight;
   AeroWindow.style.maxWidth = window.innerWidth;
   var content = AeroWindow.getElementsByClassName('content')[0];
   content.style.maxHeight = window.innerHeight - 28;//雙邊padding+title
   content.style.maxWidth = window.innerWidth - 8;//雙邊padding 4*2
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
function createAeroWindowA(content_src, name, style/*using binary to express min max close(1/0) 0~7*/, title, x, y, father)
{/*Window*/
    var newWindow = document.createElement("div");
    if (!isset(WindowList))
    { var WindowList = new Array(); }
    WindowList.push(newWindow);
   
    newWindow.style.maxHeight = window.innerHeight;
    newWindow.style.maxWidth = window.innerWidth;
    /*DragBar*/
    var newDragBar = document.createElement("div");
    newDragBar.style.width = "100 %";
    newDragBar.classList.add("dragbar");
    newWindow.appendChild(newDragBar);
    /*icon*/
    var newIcon = document.createElement("img");
    newDragBar.appendChild(newIcon);
    var newTitle = document.createElement("div");
    newTitle.classList.add("title");
    newTitle.innerText = title === 'undifined' ? "WidowsApplication" : title;
    newDragBar.appendChild(newTitle);
    if (style != 0) {
        var newControlBox = document.createElement("div");
        newControlBox.classList = "control_box";
        newDragBar.appendChild(newControlBox);
        style = style.toString(2);
        //console.log(style[0]);
        if (style[0] == '1')
        {
            var newCtrl1 = document.createElement("div");
            newCtrl1.classList.add("control");
            newCtrl1.classList.add("min");
            newCtrl1.innerText = "_";
            newControlBox.appendChild(newCtrl1);
        }
        if (style[1] == '1')
        {
            var newCtrl2 = document.createElement("div");
            newCtrl2.classList.add("control");
            newCtrl2.classList.add("max");
            newCtrl2.innerText = "□";
            newCtrl2.onclick = function () { var AeroWindow = this.parentNode.parentNode.parentNode; AeroWindow.style.left = '0'; AeroWindow.style.top = '0'; var content = AeroWindow.getElementsByClassName('content')[0]; content.style.width = getStyle(content, "maxWidth"); content.style.height = getStyle(content, "maxHeight");  }
            newControlBox.appendChild(newCtrl2);
        }
        if (style[2] == '1')
        {
            var newClose = document.createElement("div");
            newClose.classList.add("control");
            newClose.classList.add("close");
            newClose.innerText = "X";
            newClose.onclick = function () { this.parentNode.parentNode.parentNode.remove(); }
            newControlBox.appendChild(newClose);
        }
    }
    var newContent = document.createElement("div");
    newContent.classList.add("content");
    newWindow.appendChild(newContent);
    newWindow.classList.add("AeroGlass");
    if (father === 'undifined') father = document.getElementsByClass("container")[0];
    father.appendChild(newWindow);
    newWindow.style.left = x === 'undifined'? 0:x;
    newWindow.style.top = y === 'undifined' ? 0 : y;
    /*DragMove*/
    addNodeDragMove(newWindow);
    /*get content*/
    GETRequest(content_src, function (xmlhttps) {
        newContent.innerHTML = xmlhttps.responseText;
    });
    /*work bar*/

}
function createAeroWindowI(content_src, name, style/*using binary to express min max close(1/0) 0~7*/, title, x, y, father) {/*Window*/
    var newWindow = document.createElement("div");
    if (!isset(WindowList))
    { var WindowList = new Array(); }
    WindowList.push(newWindow);

    newWindow.style.maxHeight = window.innerHeight;
    newWindow.style.maxWidth = window.innerWidth;
    /*DragBar*/
    var newDragBar = document.createElement("div");
    newDragBar.style.width = "100 %";
    newDragBar.classList.add("dragbar");
    newWindow.appendChild(newDragBar);
    /*icon*/
    var newIcon = document.createElement("img");
    newDragBar.appendChild(newIcon);
    var newTitle = document.createElement("div");
    newTitle.classList.add("title");
    newTitle.innerText = title === 'undifined' ? "WidowsApplication" : title;
    newDragBar.appendChild(newTitle);
    if (style != 0) {
        var newControlBox = document.createElement("div");
        newControlBox.classList = "control_box";
        newDragBar.appendChild(newControlBox);
        style = style.toString(2);
        //console.log(style[0]);
        if (style[0] == '1') {
            var newCtrl1 = document.createElement("div");
            newCtrl1.classList.add("control");
            newCtrl1.classList.add("min");
            newCtrl1.innerText = "_";
            newControlBox.appendChild(newCtrl1);
        }
        if (style[1] == '1') {
            var newCtrl2 = document.createElement("div");
            newCtrl2.classList.add("control");
            newCtrl2.classList.add("max");
            newCtrl2.innerText = "□";
            newCtrl2.onclick = function () { var AeroWindow = this.parentNode.parentNode.parentNode; AeroWindow.style.left = '0'; AeroWindow.style.top = '0'; var content = AeroWindow.getElementsByClassName('content')[0]; content.style.width = getStyle(content, "maxWidth"); content.style.height = getStyle(content, "maxHeight"); }
            newControlBox.appendChild(newCtrl2);
        }
        if (style[2] == '1') {
            var newClose = document.createElement("div");
            newClose.classList.add("control");
            newClose.classList.add("close");
            newClose.innerText = "X";
            newClose.onclick = function () { this.parentNode.parentNode.parentNode.remove(); }
            newControlBox.appendChild(newClose);
        }
    }
    var newContent = document.createElement("div");
    newContent.classList.add("content");
    newWindow.appendChild(newContent);
    newWindow.classList.add("AeroGlass");
    if (father === 'undifined') father = document.getElementsByClass("container")[0];
    father.appendChild(newWindow);
    var newIframe = document.createElement("iframe");
    newIframe.src = content_src;
    newContent.appendChild(newIframe);
    newWindow.style.left = x === 'undifined' ? 0 : x;
    newWindow.style.top = y === 'undifined' ? 0 : y;
    /*DragMove*/
    addNodeDragMove(newWindow);


    /*work bar*/

}
setAllWindowMaxWH();
window.onresize = setAllWindowMaxWH;