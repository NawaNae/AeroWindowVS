var maxzindex;
maxzindex=0;
var nowx = 99999;
var nowy = 99999;
var lastx = 99999;
var lasty = 99999;
var mousedrag = false;
var dragbarClassName = "dragbar";
var containerClassName = "container";
var tempindex ;
tempindex = 0;
function removeAllActive()
{
    Array.from(document.getElementsByClassName("active")).forEach
        (function (ele, ind, arr)
        {
            ele.classList.remove("active");
        }
        );
}
function addMouseUp(element)
{
    element.addEventListener("mouseup", function ()
    {
        mousedrag = false;
    } );
}
function addMouseMove(element)
{
    element.addEventListener("mousemove", function (event) {
        if (mousedrag)
            if (nowx == 99999 && nowy == 99999) {
                lastx = event.clientX;
                lasty = event.clientY;
                nowx = event.clientX;
                nowy = event.clientY;
            }
            else {
                nowx = event.clientX;
                nowy = event.clientY;
                var ele = document.querySelector(".AeroGlass.active");
                ele.style.left = parseInt(getStyle(ele, "left").replace("px", "")) + nowx - lastx;
                ele.style.top = parseInt(getStyle(ele, "top").replace("px", "")) + nowy - lasty;
                lastx = nowx;
                lasty = nowy;
            }
    }
    );
}
function Active(AeroGlass)
{
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
function addMouseDown(element,AeroGlass)
{
    element.addEventListener("mousedown", function () {
        Active(AeroGlass);
        mousedrag = true; nowx = 99999; nowy = 99999;
    });
}
function addMouseActive(element,AeroGlass)
{
    element.addEventListener("mousedown", function () {
        Active(AeroGlass);
         nowx = 99999; nowy = 99999;
    });
}
function containerAddDrag()
{
    Array.from(document.getElementsByClassName(containerClassName)).forEach
        (
        function (element, index, array)
        {
            addMouseUp(element);
            addMouseMove(element);
        }
        );
}
function addNodeDragMove(node)
{
    addMouseActive(node, node);
    var dragbar = node.getElementsByClassName(dragbarClassName)[0];
    containerAddDrag();
    node.style.zIndex = maxzindex++;
    addMouseDown(dragbar, node);
    addMouseUp(dragbar);
    Array.from(node.children).forEach(function (ele, index, arr)
    {
        addMouseActive(ele, node);
    });
}
function addDragMove() {
    containerAddDrag()
    Array.from(document.getElementsByClassName("AeroGlass")).forEach
        (
        function (ele, ind, arr) {
            addNodeDragMove(ele);
        }
        );
}
 addDragMove();
 