$(function(){
    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";
    var tap = mobile ? "tap" : "click";

    //阻止屏幕滑动
    $('html,body').on(touchmove,function(e){
        e.preventDefault()
    });
  
    var motionObj = {};
    var loadingPath='images/';
    var stageH=$(window).height();
    var stageW=$(window).width();

    //定义时间动画：
    for(var i=0; i<10; i++){
        motionObj["page"+(i+1)] = new TimelineMax();
    };

    //初始化音乐
    var _music;
    function intsound(){
        var sounds = [
            {src: "bg1.mp3", id: 1}
        ];
        createjs.Sound.alternateExtensions = ["ogg"];
        createjs.Sound.registerSounds(sounds, loadingPath);
    }
    intsound();

    //初始化阻止屏幕双击，当有表单页的时候，要关闭阻止事件，否则不能输入文字了，请传入false值，再次运行即可
    initPreventPageDobuleTap(true);
    initPageMotion();

    //初始化动画
    function initPageMotion(){

        $(".main").fadeIn(300,function(){
            setTimeout(function(){
                $('.longpage').show();
                document.title='李叫兽';
                //setTimeout(function(){
                //    motionObj['page'+1].play();
                //},1000)
                messages1();
            },2000)
        });
    }

    //产生随机姓名
    function GetRandomNum(Min,Max)
    {
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
    }
    var userNamesArray = ['程维','马化腾','柳传志'];
    var _uid = GetRandomNum(0,2);
    var _userName = userNamesArray[_uid];
    console.log(_userName);

    function getUrlParam (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return "";
    }
    var nameParameter = getUrlParam('id');
    if(nameParameter !='' && nameParameter != null && nameParameter != undefined){
        $('.cont').text(userNamesArray[parseInt(nameParameter)]+'邀请你加入了“亿万富豪红包群”群聊，群聊参与人还有：马化腾 腾讯、程维 滴滴、柳传志 联想、刘强东 京东……');
    }


    //播放消息声音
    function playmessagesSound(){
        _music = createjs.Sound.play('1');
        _music.volume = 0.1;
    }

    var _DIST = 0
    var _space = stageH/2-520;
    var _space2 = 0;
    var _timer;
    var msgID;
    var dist;
    //显示消息1
    function messages1(){
        msgID=1;
        dist = -150;
        _timer = setInterval(setMS1,750)
    }
    //显示消息2
    function messages2(){
        dist = 0;
        msgID=4;
        clearInterval(_timer);
        _timer = setInterval(setMS2,1500)
    }

    // function setMS1(){
    //     if(msgID<=9){
    //         // $('#msg'+msgID).fadeIn();
    //         playmessagesSound();
            
    //     }else{
    //         clearInterval(_timer);
    //     }
    //     msgID++;
    // }

    function setMS1(){
        if(msgID<=7){
            if(msgID == 2){
                clearInterval(_timer);
                _timer = setInterval(setMS1,2000)
            }
            else if(msgID==3) {
                // TweenMax.to($(".longpage>div").not($('.di')), .5, { css: {'top': -100 + 'px'}, ease: Linear.easeNone });
                // dist += -100;
                clearInterval(_timer);
                _timer = setInterval(setMS1,3000)
            }
            else if(msgID==4) {
                TweenMax.to($(".longpage>div").not($('.di')), .5, { css: {'top': dist-20 + 'px'}, ease: Linear.easeNone });
                dist += -20;
                clearInterval(_timer);
                _timer = setInterval(setMS1,3000)
            }
            else if(msgID==5) {
                TweenMax.to($(".longpage>div").not($('.di')), .5, { css: {'top': dist-120 + 'px'}, ease: Linear.easeNone });
                dist += -120;
                clearInterval(_timer);
                _timer = setInterval(setMS1,3000)
            }
            else if(msgID==6) {
                TweenMax.to($(".longpage>div").not($('.di')), 1, { css: {'top': dist-600 + 'px'}, ease: Linear.easeNone });
                dist += -600;
            }
            else if(msgID==7) {
                TweenMax.to($(".longpage>div").not($('.di')), .5, { css: {'top': dist-120 + 'px'}, ease: Linear.easeNone });
                dist += -120;
            }
            $('#msg'+msgID).fadeIn();
            playmessagesSound();
        }else{
            clearInterval(_timer);
        }
        msgID++;
    }



    //阻止屏幕双击以后向上位移,当有表单页的时候，要关闭阻止事件，否则不能输入文字了
    function initPreventPageDobuleTap(isPreventPageDobuleTap){
        if(isPreventPageDobuleTap){
            $('.page').on(touchstart,function(e){
                e.preventDefault();
            })
        }else{
            $('.page').off(touchstart);
        }
    }

});
