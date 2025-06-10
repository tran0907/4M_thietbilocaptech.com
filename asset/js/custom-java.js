//--1/---sidebar--------------------------------------------------
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";

}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";

}

function myAccFunc(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

document.getElementById("searchbox").addEventListener("submit", SubmitFrmSearch);

function SubmitFrmSearch(evt) {
    var element = document.getElementById("searchbox");
    name = "active";
    arr = element.className.split(" ");
    if (arr.indexOf(name) == -1) {
        element.className += " " + name;
        evt.preventDefault();
        document.getElementById("search_keyword").blur();
        setTimeout(function() {
            document.getElementById("search_keyword").focus();
        }, 500);

    }
}
document.getElementById("search_keyword").addEventListener("focusout", HideBoxSearch);

function HideBoxSearch() {
    var element = document.getElementById("searchbox");
    arr = element.className.split(" ");
    if (arr.indexOf("active") == 1) {
        element.classList.remove("active");
    }
}
//-2/--------Sticky-top-----------------------------------------------/
var navbar_id = document.getElementById("navbar");
window.onscroll = function() {
    myFunction()
};
var navbar = navbar_id.offsetTop;

var top_tmp = document.documentElement.scrollTop;

function myFunction() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        navbar_id.classList.add("sticky")
    } else {
        navbar_id.classList.remove("sticky");
    }
}

//-2/--------Slideshow-----------------------------------------------/
if (document.getElementById("slider")) {
    startSlider("slider", 50);
}

function startSlider(id_obj, timer) {

    var obj, timer;
    obj = document.getElementById(id_obj);
    var id = obj.getAttribute("id");
    var slideCount = obj.querySelectorAll('ul>li').length;

    slideWidth = obj.getAttribute("data-width");
    var nodeUl = document.querySelector('#' + id + ' ul');
    var sliderUlWidth = (slideCount + 1) * slideWidth;
    var time = 2;
    var $bar,
        isPause,
        tick,
        percentTime;
    isPause = false; //false for auto slideshow
    $bar = obj.querySelector('.progress .bar');

    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        tick = setInterval(interval, timer);
    }

    function interval() {
        if (isPause === false) {
            percentTime += 1 / (time + 0.1);
            $bar.style = "width:" + percentTime + "%";
            if (percentTime >= 100) {
                moveRight();
                startProgressbar();
            }
        }
    }

    function resetProgressbar() {
        $bar.style = "width:0%";
        clearTimeout(tick);
    }

    function startslide() {
        // if(slideCount == 2){                            
        //     var node_html_first =  document.querySelector("#"+id+" ul li:first-child").outerHTML;
        //     var node_html_last =  document.querySelector("#"+id+" ul li:last-child").outerHTML;
        //     let frag = document.createRange().createContextualFragment(node_html_last);
        //     nodeUl.insertBefore(frag,nodeUl.childNodes[0]);
        //     document.querySelector('li.active').classList.remove('active');  
        //     let frag_first = document.createRange().createContextualFragment(node_html_first);
        //     nodeUl.insertBefore(frag_first,nodeUl.childNodes[0]);
        //     slideCount = obj.querySelectorAll('ul>li').length; 

        // }
        var node = document.querySelector("#" + id + " ul li:last-child");
        nodeUl.insertBefore(node, nodeUl.childNodes[0]);
        nodeUl.style = "width:" + sliderUlWidth + "vw;margin-left:-" + slideWidth + "vw";
    }

    if (slideCount > 1) {
        startslide();
        startProgressbar();
    } else { // hade navigation buttons for 1 slide only
        obj.querySelector('button.control_prev').style.display = "none";
        obj.querySelector('button.control_next').style.display = "none";
    }

    function moveLeft() {

        nodeUl.style.transition = "1s";
        nodeUl.style.transform = "translateX(" + slideWidth + "vw)";

        setTimeout(function() {

            var node = document.querySelector("#" + id + " ul li:last-child");
            nodeUl.insertBefore(node, nodeUl.childNodes[0]);

            nodeUl.style.transition = "nome";
            nodeUl.style.transform = "translateX(0vw)";

            document.querySelector('li.active').className = "unactive";
            document.querySelector('li.unactive').previousElementSibling.className = "active";
            document.querySelector('li.unactive').classList.remove('unactive');

        }, 1000);
    }

    function moveRight2() { // fix for only 2 slades

        var node = document.querySelector('#' + id + ' ul li:first-child');
        nodeUl.append(node);

        setTimeout(function() {
            nodeUl.style.transition = "none";
            nodeUl.style.transform = "translateX(100vw)";
        }, 10);


        setTimeout(function() {
            nodeUl.style.transition = "1s";
            nodeUl.style.transform = "translateX(0vw)";
        }, 15, setTimeout(function() {

            nodeUl.style.transition = "none";
            nodeUl.style.transform = "translateX(0vw)";

            document.querySelector('li.active').className = "unactive";
            document.querySelector('li.unactive').nextElementSibling.className = "active";
            document.querySelector('li.unactive').classList.remove('unactive');
        }, 1000));
    }


    function moveRight() {

        if (slideCount > 2) {

            nodeUl.style.transition = "1s";
            nodeUl.style.transform = "translateX(" + (-1) * slideWidth + "vw)";

            setTimeout(function() {

                var node = document.querySelector('#' + id + ' ul li:first-child');
                nodeUl.append(node);
                nodeUl.style.transition = "none";
                nodeUl.style.transform = "translateX(0vw)";

                document.querySelector('li.active').className = "unactive";
                document.querySelector('li.unactive').nextElementSibling.className = "active";
                document.querySelector('li.unactive').classList.remove('unactive');

            }, 1000);
        } else {
            moveRight2();
        }
    }

    document.querySelector('#' + id + ' button.control_prev').addEventListener("click", btnClickPrev);

    function btnClickPrev() {
        moveLeft();
        startProgressbar();
    }

    document.querySelector('#' + id + ' button.control_next').addEventListener("click", btnClickNext);

    function btnClickNext() {
        moveRight();
        startProgressbar();
    }

    document.querySelector('#' + id + ' .progress').addEventListener("click", btnClickProgress);

    function btnClickProgress() {
        if (isPause === false) {
            isPause = true;
        } else {
            isPause = false;
        }
    }
}

// product detail
function currentDiv(n) {
    showDivs(slideIndex = n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " w3-opacity-off";
}