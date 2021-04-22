$(function () {
    getSum();
    // 全选与单选功能
    ////全选影响单选
    $(".checkall").change(function () {
        $(".j-checkbox ,.checkall").prop("checked", $(this).prop("checked"));
        $(".j-checkbox").parents(".cart-item").removeClass("check-cart-item");
        $(".j-checkbox:checked").parents(".cart-item").addClass("check-cart-item");
    });
    ////单选影响全选
    $(".j-checkbox").change(function () {
        //勾选商品背景
        $(this).parents(".cart-item").toggleClass("check-cart-item");
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
    });
    //商品数量增减
    ////商品增
    $(".increment").click(function () {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        //价格小计
        var p = $(this).parents(".p-num").siblings(".p-price").text();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + Number(p * n).toFixed(2));
        getSum();
    })
    ////商品减
    $(".decrement").click(function () {
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        //价格小计
        var p = $(this).parents(".p-num").siblings(".p-price").text();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + Number(p * n).toFixed(2));
        getSum();
    })
    //手动修改后小计价格
    $(".itxt").change(function () {
        var p = $(this).parents(".p-num").siblings(".p-price").text();
        p = p.substr(1);
        var n = $(this).val();
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + Number(p * n).toFixed(2));
        getSum();
    })
    //最终总件数和总价函数
    function getSum() {
        //总商品数量
        var count = 0;
        $(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());
        })
        $(".amount-sum em").text(count);
        //总价格
        var money = 0;
        $(".p-sum").each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1));
        })
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    //删除商品模块
    ////每个商品删除按钮
    $(".p-action").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();
    })
    ////删除选中商品按钮
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
    ////清空购物车
    $(".clear-all").click(function () {
        $(".cart-item-list").empty();
        getSum();
    })

})