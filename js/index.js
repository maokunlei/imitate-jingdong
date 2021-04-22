document.addEventListener('DOMContentLoaded', function () {
    //focus焦点图
    var focus = document.querySelector('.focus');
    var pre = focus.querySelector('.pre');
    var nex = focus.querySelector('.nex');
    var focusSlider = focus.querySelector('ul');
    var dots = focus.querySelector('.dots');

    var num;
    num = 0;
    //声明当前选中圆圈索引变量
    var dotsNum;

    ////光标移动至焦点图显示按键
    focus.addEventListener('mouseover', function () {
        pre.style.display = 'block';
        nex.style.display = 'block';
        clearInterval(focusTimer);
        focusTimer = null;
    })
    focus.addEventListener('mouseleave', function () {
        pre.style.display = 'none';
        nex.style.display = 'none';
        focusTimer = setInterval(function () {
            nex.click();
        }, 2000)
    })
    //动态生成小圆点
    for (var i = 0; i < focusSlider.children.length; i++) {
        var dotsBtn = document.createElement('i');
        dots.append(dotsBtn);
        dots.children[i].className = 'dots_btn';
        dots.children[i].id = 'dots_btn' + i;
        dots.children[i].addEventListener('click', function () {

            //点击跳转焦点图
            var dotsId = this.id.substr(-1, 1);
            dotsNum = dotsId;
            num = dotsId;
            animate(focusSlider, -focusSlider.children[0].offsetWidth * dotsId);
            //调用圆圈样式变化函数
            dotsChange();
        })
    }
    //轮播图尾图
    var focus0 = focusSlider.children[0].cloneNode(true);
    focusSlider.append(focus0);
    //按键滚动
    var flag = true;
    nex.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == focusSlider.children.length - 1) {
                focusSlider.style.left = 0 + 'px';
                num = 0;
            }
            num++;
            dotsNum = num == focusSlider.children.length - 1 ? 0 : num;
            dotsChange();
            animate(focusSlider, -focusSlider.children[0].offsetWidth * num, function () { flag = true });
        }
    })
    pre.addEventListener('click', function () {
        if (flag) {
            if (num == 0) {
                focusSlider.style.left = -(focusSlider.children.length - 1) * focusSlider.children[0].offsetWidth + 'px';
                num = focusSlider.children.length - 1;
            }
            num--;
            dotsNum = num == focusSlider.children.length - 1 ? 0 : num;
            dotsChange();
            animate(focusSlider, -focusSlider.children[0].offsetWidth * num, function () { flag = true });
        }
    })
    //小圆圈样式变化
    function dotsChange() {
        for (var j = 0; j < focusSlider.children.length - 1; j++) {
            dots.children[j].className = 'dots_btn';
        }
        dots.children[dotsNum].className = 'dots_btn dots_btn_current';
    }
    //自动播放
    var focusTimer = setInterval(function () {
        nex.click();
    }, 2000)


    //电梯导航
    //判断是否显示电梯函数
    ////设置节流阀使点击动画效果中调用滚屏时不要current类变化
    var flag = true;
    function displaytool() {
        if ($(document).scrollTop() >= ($(".floor").offset().top - 70)) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
        changecurrent();
    }
    function changecurrent() {
        //根据所在位置修正.current类
        $(".floor .w").each(function (i, ele) {
            if ($(window).scrollTop() >= $(ele).offset().top - 150) {
                $(".fixedtool li").eq(i).addClass("current").siblings().removeClass("current");
            }
        })
    }
    // 打开页面调用判断函数
    displaytool();

    ////滚动到 猜你喜欢 模块显示
    $(window).scroll(function () {
        displaytool();
    })

    ////点击电梯层跳转
    $(".fixedtool").on("click", "li", function () {
        var liIndex = $(this).index();
        var woffset = $(".floor .w").eq(liIndex).offset().top;
        changecurrent();
        $("body,html").stop().animate({
            scrollTop: woffset
        })
    })


    //侧边tab栏效果
    var dropdown = document.getElementsByClassName('dropdown')[0]
    var contents = dropdown.getElementsByClassName('content_dd')
    var tab = document.getElementsByClassName('dd')[0]
    var tab_lis = tab.getElementsByTagName('a')
    for (var i = 0; i < tab_lis.length; i++) {
        tab_lis[i].id = i
    }
    dropdown.onmouseover = function (e) {
        e = e || window.event
        target = e.target || e.srcElement
        if (target.id) {
            for (var i = 0; i < contents.length; i++) {
                contents[i].style.display = 'none'
            }
        }
        if (contents[target.id]) {
            contents[target.id].style.display = 'block'
        }
    }
    dropdown.onmouseleave = function () {
        for (var i = 0; i < contents.length; i++) {
            contents[i].style.display = 'none'
        }
    }

})
