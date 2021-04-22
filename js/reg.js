document.addEventListener('DOMContentLoaded', function () {
    var tel = document.querySelector("#tel");
    var msg = document.querySelector("#msg");
    var psw = document.querySelector("#psw");
    var repsw = document.querySelector("#repsw");
    var sub = document.querySelector("#sub");
    var agr = document.querySelector(".agrmt input");
    var msgbtn = document.querySelector(".msgbtn");

    var ragtel = /^1[345789]\d{9}$/;
    var ragmsg = /^\d{6}$/;
    var ragpsw = /^(\w|-){6,16}$/;
    var ragpsw = /^[^\s]{6,16}$/;

    var telFlag = false
    var msgFlag = false
    var pswFlag = false
    var repswFlag = false
    reg(tel, ragtel, telFlag, '手机号码格式有误');
    reg(msg, ragmsg, msgFlag, '验证码格式有误');
    reg(psw, ragpsw, pswFlag, '密码应在6-16位之间，不允许包含空格换行tab回车');

    // 正则表达式验证函数
    function reg(ele, regexp, flag, tip) {
        ele.addEventListener("blur", function () {
            if (regexp.test(this.value)) {
                this.nextElementSibling.innerHTML = "";
                this.nextElementSibling.className = "success_ico";
                this.nextElementSibling.nextElementSibling.innerHTML = "";
                flag = true
            } else {
                this.nextElementSibling.innerHTML = "";
                this.nextElementSibling.className = "error";
                this.nextElementSibling.nextElementSibling.innerHTML = tip;
                this.nextElementSibling.nextElementSibling.className = "error";
                flag = false
            }
        })
    }

    //发送验证码间隔
    msgbtn.addEventListener("click", function () {
        this.disabled = true
        this.style.cursor = "default"
        var wait = 6
        msgbtn.innerHTML = `${wait}s 重新发送`
        var timer = setInterval(function () {
            if (wait > 0) {
                wait--
                msgbtn.innerHTML = `${wait}s 重新发送`
            } else {
                msgbtn.innerHTML = "点击发送"
                msgbtn.disabled = false
                msgbtn.style.cursor = "pointer"
                clearInterval(timer)
                timer = null
            }
        }, 1000)
    })
    // 检验两次密码是否一致
    repsw.addEventListener('blur', function () {
        if (this.value == psw.value) {
            this.nextElementSibling.innerHTML = "";
            this.nextElementSibling.className = "success_ico";
            this.nextElementSibling.nextElementSibling.innerHTML = "";
            repswFlag = true
        } else {
            this.nextElementSibling.innerHTML = "";
            this.nextElementSibling.className = "error";
            this.nextElementSibling.nextElementSibling.innerHTML = '密码不一致请重新输入';
            this.nextElementSibling.nextElementSibling.className = "error";
            repswFlag = false
        }
    })

    // 密码强度验证
    psw.addEventListener("keyup", function () {
        var lvl = this.value.length > 6 ? getLvl(this.value) : 0;
        switch (lvl) {
            case 2:
                document.querySelector(".orange").style.visibility = 'visible'
                document.querySelector(".green").style.visibility = 'hidden'
                break
            case 3:
                document.querySelector(".green").style.visibility = 'visible'
                break
            default:
                document.querySelector(".orange").style.visibility = 'hidden'
                document.querySelector(".green").style.visibility = 'hidden'
        }
    })
    function getLvl(pwd) {
        var lvl = 0;//默认是0级
        //密码中是否有数字
        if (/[0-9]/.test(pwd)) {
            lvl++;
        }
        //判断密码中有没有字母
        if (/[a-zA-Z]/.test(pwd)) {
            lvl++;
        }
        //判断密码中有没有特殊符号
        if (/[^0-9a-zA-Z_]/.test(pwd)) {
            lvl++;
        }
        return lvl;
    }

    // 提交前检验表单是否完整
    sub.addEventListener("click", function (e) {
        e.preventDefault();
        if (!(agr.checked && telFlag && msgFlag && pswFlag && repswFlag)) {
            alert('请先完成注册及同意协议')
        }
    })
})