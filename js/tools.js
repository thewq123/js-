/**
  *  定义一个函数, 用来获取指定元素的当前的样式
  *    参数:
  *      obj 要获取样式的元素
  *      name 要获取的样式名 样式名要加双引号
  */
function getStyle(obj, name) {

    if (window.getComputedStyle) {
        //正常浏览器的方式
        return getComputedStyle(obj, null)[name];

    } else {
        //IE8的方式
        return obj.currentStyle[name];

    }
}


//创建一个变量来保存, 定时器的标识
//var timer;
//var timer2;

//尝试创建一个可以执行简单动画的函数
/**
 * 参数:
 *     obj: 要执行动画的对象 
       attr: 要执行动画的样式, 比如: left top width height
 *     target: 执行动画的目标位置
 *     speed: 移动的速度(正数向右移动, 负数向左移动)
 *     callback: 回调函数, 这个函数将会在动画执行完毕以后执行
 */
//向左移动时, 需要判断newValue是否小于800
//向右移动时, 需要判断newValue是否大于800
function move(obj, attr, target, speed, callback) {
    //关闭上一个定时器
    clearInterval(obj.timer);

    //获取box1原来的left值
    //获取到的值会带有px, 所以要用parsint
    var current = parseInt(getStyle(obj, attr));

    //判断速度的正负值
    //如果从0向800移动, 则speed为正
    //如果从800向0移动, 则speed为负
    if (current > target) {
        //此时速度应为负值
        speed = -speed;
    }

    //开启一个定时器
    obj.timer = setInterval(function () {
        //获取box1原来的left值
        var oldValue = parseInt(getStyle(obj, attr));//获取到的值会带有px, 所以要用parsint

        //在旧值的基础上增加
        var newValue = oldValue + speed;


        //判断偏移量, 让便宜量等于800
        if ((newValue > target && speed > 0) || newValue < target && speed < 0) {
            newValue = target;
        }

        //设置box1的偏移量
        obj.style[attr] = newValue + "px";



        if (newValue == target) {
            clearInterval(obj.timer);
            //动画执行完毕, 调用回调函数
            callback && callback();
        }

    }, 30)

}

//定义一个函数, 用来向一个元素中添加指定的class属性值
/**
 *  参数:
 *      obj 要添加class属性的元素
 *      cn  要添加的class值 
 */
function addClass(obj, cn) {


    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    }
}

/**
 *  判断一个元素中是否含有指定的class属性值
 *      如果有class, 则返回true, 没有则返回false 
 */
function hasClass(obj, cn) {

    //判断obj中有没有cn class
    //创建一个正则表达式, \b单词边界
    //var reg = /\bcn\b/;
    //面对变量要用构造函数的形式
    var reg = new RegExp("\\b" + cn + "\\b");

    return reg.test(obj.className);
}

//删除一个元素
function removeClass(obj, cn) {
    //创建一个正则表达式
    var reg = new RegExp("\\b" + cn + "\\b");

    //删除类名
    obj.className = obj.className.replace(reg, "");
}

/**
 *  toggeClass可以用来切换一个类
 *      如果元素中具有该类, 则删除
 *      如果元素中没有该类, 则添加
 */
function toggeClass(obj, cn) {

    if (hasClass(obj, cn)) {
        removeClass(obj, cn);
    } else {
        addClass(obj, cn);
    }
}


/**
             *  用来切换才单折叠和显示状态 
             */
function toggleMenu(obj) {
    //获取未改变的高度
    var oldHeight = obj.offsetHeight;

    //切换obj的显示
    toggeClass(obj, "colse")

    //获取改变后的高度
    var newHeight = obj.offsetHeight;

    //再把高度变回去
    obj.style.height = oldHeight + "px";

    //调用move函数来使动画有一个过渡效果
    move(obj, "height", newHeight, 10, function () {
        //动画执行完毕, 删除之
        obj.style.height = "";
    })
}