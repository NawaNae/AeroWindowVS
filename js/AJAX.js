var xmlhttp;
function GETRequest(Url,httpcallback)
{
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () { httpcallback(xmlhttp) };
    xmlhttp.open("GET", Url, true);
    xmlhttp.send();
}
function TimesCallback(xmlhttps) {
    document.getElementById("Times").innerText = "瀏覽人數 "+ xmlhttps.responseText + "人"; 
}

