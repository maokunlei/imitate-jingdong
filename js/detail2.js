document.addEventListener('DOMContentLoaded', function () {

    // 细节放大图
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    preview_img.addEventListener('mousemove', function (e) {
        mask.style.display = 'block';
        big.style.display = 'block';
        // console.log(mask.offsetWidth);ceshi
        var maskX = e.pageX - preview_img.offsetLeft - mask.offsetWidth / 2;
        var maskY = e.pageY - preview_img.offsetTop - mask.offsetHeight / 2;
        // console.log(maskX);
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        var bigImg = document.querySelector('#bigImg');
        if (maskX < 0) {
            maskX = 0;
        } else if (maskX > maskMax) {
            maskX = maskMax;
        }
        if (maskY < 0) {
            maskY = 0;
        } else if (maskY > maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 方法图
        // console.log(big.offsetWidth - bigImg.offsetWidth);
        // console.log(maskX);
        // console.log(maskX / maskMax * (big.offsetWidth - bigImg.offsetWidth));
        bigImg.style.left = maskX / maskMax * (big.offsetWidth - bigImg.offsetWidth) + 'px';
        bigImg.style.top = maskY / maskMax * (big.offsetHeight - bigImg.offsetHeight) + 'px';
    })
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    // 显示全部商品分类
    var dropDown = document.querySelector('.dropdown ')
    var dropDowndd = document.querySelector('.dropdown .dd')
    dropDown.addEventListener('mouseover', function () { dropDowndd.style.display = 'block' })
    dropDown.addEventListener('mouseout', function () { dropDowndd.style.display = 'none' })

    var contents = dropDown.getElementsByClassName('content_dd')
    var tab = document.getElementsByClassName('dd')[0]
    var tab_lis = tab.getElementsByTagName('a')
    for (var i = 0; i < tab_lis.length; i++) {
        tab_lis[i].id = i
    }
    dropDown.onmouseover = function (e) {
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
    dropDown.onmouseleave = function () {
        for (var i = 0; i < contents.length; i++) {
            contents[i].style.display = 'none'
        }
    }

    // 商品详情底部tab栏
    var lis = document.querySelectorAll('.detail_tab_list ul li')
    var conts = document.querySelectorAll('.detail_tab_con div')
    var detailTabList = lis[0].parentNode

    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i)
    }
    detailTabList.addEventListener('click', function (e) {
        for (var i = 0; i < conts.length; i++) {
            conts[i].style.display = 'none'
            lis[i].classList.remove('current')
        }
        conts[e.target.getAttribute('index')].style.display = 'block'
        e.target.classList.add('current')
    })

    // 商品社区
    var cmt = document.querySelector('.cmt')
    var ul = cmt.querySelector('ul')
    var btn = cmt.querySelector('.submit');
    var text = cmt.querySelector('textarea');

    ul.className = "reply";
    ul.insertAdjacentHTML('afterbegin', `<li>今天天气非常好呀非常好！</li>`);
    ul.insertAdjacentHTML('afterbegin', `<li>今天天气非常好呀非常好！</li>`);
    ul.insertAdjacentHTML('afterbegin', `<li>今天天气非常好呀非常好！</li>`);
    lis[lis.length - 1].innerHTML = `商品社区（${ul.children.length}）`
    btn.onclick = function () {
        if (text.value == '') {
            return alert('请输入内容！');
        } else {
            ul.insertAdjacentHTML('afterbegin', `<li>${text.value.replace(/关键词|其他关键词/, '**')}<a class='del' href='javascript:;'>删除</a></li>`);
            text.value = ''
            ul.className = "reply";
            // 更新总评价数
            lis[lis.length - 1].innerHTML = `商品社区（${ul.children.length}）`
            // 删除
            var del = document.querySelector('.del');
            del.onclick = function () {
                ul.removeChild(this.parentNode);
                if (ul.children.length == 0) {
                    ul.className = '';
                }
            }
        }
    }
})