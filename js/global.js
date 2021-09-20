//global: 全球的  
/**
 * 在文档完全加载后想运行某个函数就要用到它 
 */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

/**
 * 可以在一个元素后插入代码的函数
 */
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

/*
    添加class的属性 
    element要填加的元素 
    value要添加的新的class
*/
function addClass(element, value) {
    //没有才添加
    if (!element.className) {
        element.ClassName = value;
    } else {
        element.className += " " + value;
    }
}


/**
 * 1.取得导航列表中的所有链接;
 * 2. 循环遍历这些链接
 * 3. 如果发现了与当前URL匹配的链接, 为它添加here类
 */
function higthlightPage() {
    //检查性代码
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    //获取header
    var header = document.getElementsByTagName("header")[0];
    //检查性代码, 暂时不写
    //检查性代码暂时不写
    //获取所有的nav
    var nav = header.getElementsByTagName("nav")[0];
    //获取所有的a
    var Alla = nav.getElementsByTagName("a");
    //遍历所有的a, 并且判断与当前a的链接是否相同
    var hrefs
    for (var i = 0; i < Alla.length; i++) {
        hrefs = Alla[i].href;
        if (window.location.href.indexOf(hrefs) != -1) {
            Alla[i].className = "here";
            //获取当前a的文本值, 然后设置为当前页面body元素的id
            var aText = Alla[i].innerHTML;
            //做id需要将文本变成小写
            aText = aText.toLowerCase();
            var body = document.body;
            body.id = aText;
        }
    }

}
addLoadEvent(higthlightPage);

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

//尝试创建一个可以执行简单动画的函数
/**
 * 参数:
 *     obj: 要执行动画的对象 
       attr: 要执行动画的样式, 比如: left top width height 要加引号
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


//获取intro
var intro = document.getElementById("intro");

//创建显示图片的函数
function showimg() {
    //平稳退化的代码还是要写啊不然一直报错, 就很烦
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById("intro")) return false;

    //创建div
    var div = document.createElement("div");
    //设置div的Id
    div.id = "slideshow";
    ////创建img元素
    //var img = document.createElement("img");

    //创建ul
    var ul = document.createElement("ul");
    ul.id = "uls";

    //向ul中填充
    ul.innerHTML = "<li><img src='images/index.png'></li>" +
        "<li><img src='images/about.png'></li>" +
        "<li><img src='images/photos.png'></li>" +
        "<li><img src='images/live.png'></li>" +
        "<li><img src='images/contact.png'></li>";

    //获取img
    var imgs = ul.getElementsByTagName("img");


    //给ul添加一个类
    ul.className = "fl";


    //插入到intro后边
    insertAfter(div, intro);
    //把ul加到div中 
    div.appendChild(ul);

    //设置ul的长度, 设置宽高一定要代单位!!!!!!!!!!!
    ul.style.width = 254 * imgs.length + "px";

    //获取intro中的所有的a
    var allA = document.getElementsByTagName("a");


    //创建个变量保存href, 等会解决图片拍列顺序
    var hrefs;
    var index;
    //遍历所有的a获取到当前a的herf
    for (var i = 0; i < allA.length; i++) {

        allA[i].onmouseover = function () {

            //把当前a的href值赋给hrefs
            hrefs = this.href;
            //判断, 然后移动图片
            if (hrefs.indexOf("index.html") != -1) {
                //调用move函数
                move(ul, "left", 0, 10)
            }
            if (hrefs.indexOf("about.html") != -1) {
                //调用move函数
                move(ul, "left", -254 * 1, 10)
            }
            if (hrefs.indexOf("photos.html") != -1) {
                //调用move函数
                move(ul, "left", -254 * 2, 10)
            }
            if (hrefs.indexOf("live.html") != -1) {
                //调用move函数
                move(ul, "left", -254 * 3, 10)
            }
            if (hrefs.indexOf("contact.html") != -1) {
                //调用move函数
                move(ul, "left", -254 * 4, 10)
            }
        }
    }

}
//调用showimg
addLoadEvent(showimg)

/*
    创建一个函数可以根据指定的id显示对应的<section>
    同时, 隐藏其他部分
    Section: 部分, 章节
*/
function showSection(id) {
    //获取页面中所有的section
    var section = document.getElementsByTagName("section");
    //遍历所有的section
    for (var i = 0; i < section.length; i++) {
        //判断id值与section的id值是否相等
        if (id != section[i].id) {
            //id值不相等, 将其隐藏
            section[i].style.display = "none";
        } else {
            //id值相等, 将其设置为显示
            section[i].style.display = "block";
        }
    }
}

/**
 * 创建一个函数
 * 作用: 当我们点击nav中的a, 会将
 *      隐藏的内容显示出来并将, 我们未点击的关闭
 * prepare: 准备
 * internal: 内部的
 */
function prepareInternalnav() {
    //平稳退化的代码还是要写啊不然一直报错, 就很烦
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementsByTagName("article")) return false;
    //获取article
    var article = document.getElementsByTagName("article")[0];
    console.log(article);
    //如果article的长度为零就退出
    if (article.length == 0) return false;
    //获取nav
    var nav = article.getElementsByTagName("nav");
    console.log(nav.length);
    //如果nav的长度为零就退出
    if (nav.length == 0) return false;
    nav = nav[0];
    //获取a
    var allA = nav.getElementsByTagName("a");
    //遍历所有的a
    for (var i = 0; i < allA.length; i++) {
        //获取a中的href值, 由于href值中有#, 要去除#
        //split, 会获取#号前的和后的我们要后边的值
        var sectionId = allA[i].href.split("#")[1];
        console.log(sectionId);
        //如果section中没有我们获取到的 id 值则跳过循环
        if (!document.getElementById(sectionId)) continue;
        //当页面加载后, 需要默认隐藏所有部分, 

        //设置所有元素隐藏
        document.getElementById(sectionId).style.display = "none";
        //给a设置一个属性, 用于解决作用域的问题
        allA[i].destination = sectionId;
        //为a绑定单击响应函数
        allA[i].onclick = function () {
            //掉用showSection函数, 用于响应被点击的链接
            showSection(this.destination);
            //取消a的默认样式
            return false;
        }
    }

}
//通过addLoadEvent函数调用
addLoadEvent(prepareInternalnav);

/**
 * 创建一个用来创建占位符的函数
 */
function prepareplaceholder() {
    //如果没有document.createElement就退出函数
    if (!document.createElement) return false;
    //如果没有document.getElementById就退出函数
    if (!document.getElementById) return false;
    //如果没有document.getElementById("imagegallery")就退出函数
    if (!document.getElementById("imagegallery")) return false;
    //创建一个img用来做占位符
    var img = document.createElement("img");
    //设置img的id为placeholder
    img.id = "placeholder";
    //设置img的src值
    img.src = "/编程艺术/images/photos/placeholder.jpeg";
    //设置img的alt值
    img.alt = "my img list";
    //创建一个p标签
    var p = document.createElement("p");
    //设置p标签的id为description
    p.id = "description";
    //给p标签设置文字
    p.innerHTML = "Choose an image";
    //获取ul
    var ul = document.getElementById("imagegallery");
    //把p标签放到ul的后面
    insertAfter(p, ul);
    //把img占位符放到p标签后面
    insertAfter(img, p);
}

/**
 * 创建一个用来更改站位符src值的函数
 * 参数: whichpic 要切换的目标
 */
function showPic(whichpic) {
    //如果找不到占位符img的id就退出当前函数
    if (!document.getElementById("placeholder")) return true;
    //占位符img的id placeholder 
    var img = document.getElementById("placeholder");
    //获取占位符whichpic的href
    var source = whichpic.href;
    //将占位符img的src修改为whichpic的href
    img.src = source;
    //判断是否存在p元素, 
    if (!document.getElementById("description")) return false;
    if (whichpic.title) {
        var text = whichpic.title;
    } else {
        var text = "";
    }
    var p = document.getElementById("description");
    //设置p元素的值
    p.innerHTML = text;

    //取消默认样式
    return false;

}

/**
 * 创建一个用来绑定单击响应函数的函数
 * 作用: 绑定单击响应函数并, 调用showPic函数, 改变src
 *     的值, 来更换图片
 */
function prepareGallery() {
    //判断是否能找到photos页面中的图片列表ul, 如果找不到就退出
    if (!document.getElementById("imagegallery")) return false;
    //获取图片列表
    var imgList = document.getElementById("imagegallery");
    //获取图片列表ul中所有的a
    var allA = imgList.getElementsByTagName("a");
    //遍历所有的a并绑定单击响应函数,并掉用showpic修改占位符中的图片
    for (var i = 0; i < allA.length; i++) {
        allA[i].onclick = function () {
            return showPic(this);
        }
    }

}
//调用
addLoadEvent(prepareplaceholder);
addLoadEvent(prepareGallery);

/**
 * 创建一个函数显示缩略语
 */
function displayAbbreviations() {
    //找出文档中所有的缩略语标签abbr
    abbrs = document.getElementsByTagName("abbr");
    //检查页面中是否存在abbr, 如果没有将退出函数
    if (abbrs.length < 1) return false;
    //创建一个数组用来保存关键字, 和title中的值
    var defs = [];
    //遍历abbrs
    for (var i = 0; i < abbrs.length; i++) {
        //获取abbr元素中的title, 并保存到definition(解说)
        var definition = abbrs[i].title;
        //获取abbr中的内容, 用key 来保存
        var key = abbrs[i].innerHTML;
        //将他们都保存到数组中
        defs[key] = definition;

    }
    //创建一个dl
    var dl = document.createElement("dl");
    //用for/in 循环来遍历上面的数组
    for (key in defs) {
        //创建一个边两来保存解释
        var definition = defs[key];
        //创建一个dt元素
        var dt = document.createElement("dt");
        //将key放到dt中
        dt.innerHTML = key;
        //创建一个dd
        var dd = document.createElement("dd");
        //将数组中的key放入dd
        dd.innerHTML = defs[key];
        //然后将dt和dd放入到dl中
        dl.innerHTML = dt;
        dl.innerHTML = dd;
    }
    //创建一个h2标签
    var h2 = document.createElement("h2");
    //在h2标签中插入Abbreviations
    h2.innerHTML = "Abbreviations";
    //将h2, 和dl依次放入body中
    document.body.appendChild(h2);
    document.body.appendChild(dl);

}

//创建一个函数用来把表格弄得更加的好看
function stripeTables() {
    //找到页面中的table标签
    var table = document.getElementsByTagName("table");
    //创建tr, odd变量
    var tr, odd;
    /*
        创建一个for循环遍历所有的table, 并把odd初始化为false, 
        并找到当前table所有的tr, 
        然后在for循环中再创建一个for循环遍历所有的tr
        然后判断odd的值, 如果为true则设置tr的颜色为#ffc, 并将odd设置为false
        如果为false, 不设置颜色将odd的值设置为true    
    */
    for (var i = 0; i < table.length; i++) {
        odd = false;
        tr = table[i].getElementsByTagName("tr");
        for (var j = 0; j < tr.length; j++) {
            if (odd == true) {
                addClass(tr[j], "odd");
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}

/**
 * 创建一个函数
 * 作用: 当鼠标悬停在表格的哪哪一行的文字加黑加粗
 */
function hightlightRows() {
    //获取页面中所有的tr
    var trs = document.getElementsByTagName("tr");
    //遍历所有的tr
    for (var i = 0; i < trs.length; i++) {
        //保存tr目前的类名
        trs[i].oldClassName = trs[i].ClassName;
        //绑定响应函数, 并添加类名 onmouseover: 鼠标悬停
        trs[i].onmouseover = function () {
            addClass(this, "highlight");
        }
        //onmouseout: 鼠标悬停离开
        trs[i].onmouseout = function () {
            this.className = this.oldClassName;
        }
    }
}


/**
 * 编写一个函数用来, 显示缩略语表
 */
function displayAbbreviations() {
    //获取abbr标签
    var abbr = document.getElementsByTagName("abbr");
    //写一些防止报错的代码
    if (abbr.length < 1) return false;
    //创建一个数组
    var defs = [];
    //遍历所有的abbr标签
    for (var i = 0; i < abbr.length; i++) {
        //判断abbr标签的子节点是否为0, 如果为0则跳过当次循环
        if (abbr[i].childNodes.length < 1) continue;
        //获取abbr的title属性
        var title = abbr[i].title;
        var key = abbr[i].innerHTML;
        //将他们放入数组中
        defs[key] = title;
    }
    //创建一个dl
    var dl = document.createElement("dl");
    //用for/in循环遍历数组defs
    for (key in defs) {
        //创建一个title变量, 用来作为解释文本
        var title = defs[key];
        //创建一个dt, 来放缩略文本
        var dt = document.createElement("dt");
        //将缩略文本key放入dt
        dt.innerHTML = key;
        //创建一个dd用来保存解释文本
        var dd = document.createElement("dd");
        dd.innerHTML = title;
        //把dt和dd依次放入dl
        dl.appendChild(dt);
        dl.appendChild(dd);
    }
    //兼容性代码,如果dl的字节点少于1个就退出当前函数
    if (dl.childNodes.length < 1) return false;
    //创建一个h3函数
    var h3 = document.createElement("h3");
    //向h3元素中添加文本
    h3.innerHTML = "Abbreviations";

    //获取所有的article
    var articles = document.getElementsByTagName("article");
    //如果article的长度等于零则退出当前函数
    if (articles.length == 0) return false;
    var article = articles[0];
    //将h3和dl依次放入article中
    article.appendChild(h3);
    article.appendChild(dl);
}

addLoadEvent(stripeTables);
addLoadEvent(hightlightRows);
addLoadEvent(displayAbbreviations);


/**
 * 1.取得文档中的label属性
 * 2.如果label有for属性, 添加一个事件处理函数
 * 3.在label被单击时, 提取for属性值. 这个值就是响应表单的id值.
 * 4.确保存相应的表单字段.
 * 5.让响应的表单字段获得焦点
 */
function focusLabels() {
    //获取所有的label标签
    var labels = document.getElementsByTagName("label");
    //遍历所有的lebel标签
    for (var i = 0; i < labels.length; i++) {
        //判断label标签是否有for属性如果没有就跳过当次循环
        if (!labels[i].for) continue;
        //为label标签绑定响应函数
        labels[i].onclick = function () {
            //获取label标签的for属性
            var id = this.for;
            //如果获取不到for就退出当前循环
            if (!document.getElementById(id)) return false;
            //创建一个变量保存, 从页面中获得的id的元素
            var element = document.getElementById(id);
            //将光标给获得的元素
            element.focus();
        }
    }
}
addLoadEvent(focusLabels);

/**
 * 写一个关于表单占位符的函数
 */
function resetFields(whichform) {
    //检查浏览器是否支持placeholder属性, 如果不支持, 继续
    // if(Modernizr.input.placeholder) return;
    //遍历表单中的每一个元素
    for (var i = 0; i < whichform.elements.length; i++) {
        //创建一个变量保存当前form子元素
        var element = whichform.elements[i];
        //判断form子元素的type属性, 如果为submit就条过当次循环
        if (element.type == "submit") continue;
        //获取占位符属性
        var check = element.placeholder || element.getAttribute("placeholder");
        //判断当前元素有无占位符, 如果没有就跳过
        if (!check) continue;

        //为元素获得焦点的事件添加一个处理函数, 如果字段的值等于占位符的文本, 则将字段的值设置为空
        element.onfocus = function () {
            //获取占位符属性
            var text = element.placeholder || element.getAttribute("placeholder");
            //判断当前元素的值是否与占位符的值相等, 如果相等则将当前元素的值设置为空
            if (this.value == text) {
                this.className = "";
                this.value = "";
            }
        }

        //为元素失去焦点的事件添加一个处理函数, 如果字段的值为空, 则为其添加占位符值
        element.onblur = function () {
            if (this.value == "") {
                this.className = "placeholder";
                this.value = this.placeholder || this.getAttribute("placeholder")
            }
        }

        element.onblur();


    }
}

/**
 * 编写一个prepareForms函数, 循环遍历文档中的所有form对象
 * ,并将每个form对象传给resetFields函数
 */
function prepareForms() {
    for (var i = 0; i < document.forms.length; i++) {
        var thisform = document.forms[i];
        resetFields(thisform);
        //设置提交响应函数
        thisform.onsubmit = function () {
            return validateForm(this);
        }
        //如果表单没有通过验证, 返回false, 因为验证失败所以不能提交表单
        if(!validateForm(this)) return false;
        //获取一个article元素
        var article = document.getElementsByTagName("article")[0];
        if(submitFormWitFormWithAjax(this, article)) return false;
        return true;
    }
}
addLoadEvent(prepareForms);

/**
 * 检查用户输入了什么
 */
function isFilled(field) {
    //如果被替换为空格的长度为零则退出函数
    if (field.value.replace(" ", "").length == 0) return false;
    //获取占位符
    var placeholder = field.placeholder || field.getAttribute("placeholder");
    //返回用户输入的值和占位符中的值有什么不同
    return (field.value != placeholder);
}

/**
 * 判断用户输入的邮件中是否有@符和点(.), 如果其中
 * 有一个没有就返回false
 */
function isEmail(field) {
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

/**
 * 编写一个名为validateForm的函数, 这个函数以一个form对象为参数
 * 1.循环遍历表单的elements数组
 * 2.如果发现了required属性, 把相应的元素传递给isFilled函数
 * 3.如果isFilled函数返回false, 显示警告消息...
 */
function validateForm(whichform) {
    for (var i = 0; i < whichform.elements.length; i++) {
        //将form当前子元素赋值给element
        var element = whichform.elements[i];
        //判断是否有required属性的值为required
        if (element.required == "required") {
            //判断form中的元素, 在传入isFilled函数,的返回值, 入过为false则继续执行
            if (!isFilled(element)) {
                alert("Please fill in the" + element.name + "field.");
                return false;
            }
        }
        //判断元素的type属性是不是email
        if (element.type == "email") {
            //调用isEmail函数来判断用户输入的值中是否没有@和点(.)
            if (!isEmail(element)) {
                alert("请" + element.name + "请填写有效的邮箱地址");
                return false
            }
        }
    }
}

/**
 * 添加getHTTPObject函数
 */
function getHTTPObject() {
    if (typeof XMLHttpRequest == undefined) {
        XMLHttpRequest = function () {
            try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
            catch (e) { }
            try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
            catch (e) { }
            try { return new ActiveXObject("Msxml2.XMLHTTP"); }
            catch (e) { }
        }
        return false;
    }
}

/**
 * 这个函数接收一个DOM元素作为参数, 然后把所有的子元素都删除掉, 删除
 * 之后, 再把loading.gif图像添加到该元素中
 */
function displayAjaxLoading(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    var content = document.createElement("img");
    content.src = "images/loading.gif";
    content.alt = "Loading...";
    element.appendChild(content);
}

function submitFormWitFormWithAjax(whichform, thetarget) {
    var request = getHTTPObject();
    if (!request) { return false; }
    displayAjaxLoading(thetarget);
    var dataParts = [];
    var element;
    for (var i = 0; i < whichform.elements.length; i++) {
        element = whichform.elements[i];
        dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
    }
    var data = dataParts.join("&");
    //向表单的action属性指定的处理函数发送POST请求
    request.open("POST", whichform.getAttribute("action"), true);
    //并在请求中添加application/x-www-form-urlencoded头部
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //编写onreadystatechange
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if(request.status == 200 || request.status == 0){
                var matches = request.responseText.match(/<article>([\s\S]+)<\article>/);
                if(matches.length > 0){
                    thetarget.innerHTML = matches[1];
                }else{
                    thetarget.innerHTML = "<p>Oops, there was an error. sorry.<\p>";
                }
            }else{
                thetarget.innerHTML = "<p>" + request.statusText + "</p>";
            }
        }
    }

    request.send(data);
    return true;


}

