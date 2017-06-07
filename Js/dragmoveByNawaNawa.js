
    //var style = window.getComputedStyle("元素", "伪类");
function getStyle(elem, cssname)
{
    return window.getComputedStyle(elem, null).getPropertyValue(cssname);
}

var maxzindex = 0;
var nowx = 99999;
var nowy = 99999;
var lastx = 99999;
var lasty = 99999;
var mousedrag = false;
var dragbarClassName = "dragbar";
var containerClassName = "container";
var tempindex = 0;
function addDragMove() {
    Array.from(document.getElementsByClassName(containerClassName)).forEach
        (
        function (element, index, array) {
            element.addEventListener("mouseup", function () {
                mousedrag = false;
            }
            );
            element.addEventListener("mousemove", function () {
                //console.log(nowx + ',' + nowy + '\n');
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
                        var ele = document.getElementsByClassName("active")[0];
                        ele = ele.parentNode;
                        //console.log(ele.parentNode);
                        ele.style.left = parseInt(getStyle(ele, "left").replace("px", "")) + nowx - lastx;
                        ele.style.top = parseInt(getStyle(ele, "top").replace("px", "")) + nowy - lasty;
                        lastx = nowx;
                        lasty = nowy;
                    }
            }
            );
        }
        );
    Array.from(document.getElementsByClassName("AeroGlass")).forEach
        (
        function (ele,ind,arr)
        {
            ele.style.zIndex = maxzindex++;
            console.log(maxzindex + '\n');
        }
        )
    Array.from(document.getElementsByClassName(dragbarClassName)).forEach
        (
        function (element, index, array) {
            element.addEventListener("mousedown", function ()
            {
                Array.from(document.getElementsByClassName("active")).forEach
                    (function (ele, ind, arr) {
                        ele.classList.remove("active");
                    }
                    );
                this.classList.add("active");
                tempindex = getStyle(this.parentNode, 'z-index');

                console.log(maxzindex);

                this.parentNode.style.zIndex = maxzindex;
                Array.from(document.getElementsByClassName("AeroGlass")).forEach
                    (function (ele, ind, arr) {
                        if (getStyle(ele, "z-index") > tempindex)
                            ele.style.zIndex--;
                    }
                    );
                
                mousedrag = true; nowx = 99999; nowy = 99999;
            });
            element.addEventListener("mouseup", function () {
                mousedrag = false;
            });
        }
        );
}
 addDragMove();
 