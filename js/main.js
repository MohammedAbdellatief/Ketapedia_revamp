$(function () { // wait for document ready

    //reload page on size change to adjust tablet orientation
    // var supportsOrientationChange = "onorientationchange" in window,
    //    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    // window.addEventListener(orientationEvent, function() {
    //    window.location.reload();
    // }, false);

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    //apply whole script only on screen larger than 768 px wide or if tablet
    if ( !/Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)  &&  $(window).width() >= 768) {

        $('body').removeClass('min_v');

        var $device = $('.device'),
            $play = $('.play'),
            $vLab = $('.v_lab'),
            $depth = $('.depth'),
            $covers = $('.covers li'),
            $deviceInner = $('.device svg'),
            $deviceInnerPath = $('.device path'),
            $innerS1 = $('.innerS1'),
            $innerS2 = $('.innerS2'),
            $innerS3 = $('.innerS3'),
            $wHeight = $(window).height(),
            $wWidth = $(window).width(),
            $dHeight = $($device).height(),
            $dWidth = $($device).width(),
            $dOffset = $($device).offset(),
            $bottomLP = $('.laptop_bottom svg').offset(),
            $bottomLPRight = $bottomLP.right,
            $bottomLPTop = $bottomLP.top,
            $scroll = $('.btm_scroll'),
            $screen = $('.white_screen'),
            $stagger1 = $('.stg1')
        ;


        // init
        var ctrl = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: 'onLeave'
            }
        });

        // change behaviour of controller to animate scroll instead of jump
        ctrl.scrollTo(function (newpos) {
            TweenMax.to(window, 1.3, {scrollTo: {y: newpos ,autoKill : true},ease: Power2.easeInOut});
        });

        //  bind scroll to anchor links
        $(document).on("click", "a[href^=#]", function (e) {
            var id = $(this).attr("href");
            if ($(id).length > 0) {
                e.preventDefault();
                // trigger scroll
                ctrl.scrollTo(id);
            }
        });

        // Create all scenes
        $(".sec").each(function() {
            new ScrollMagic.Scene({
                triggerElement: this,
                duration: '40%'
            })
                .setPin(this)
                .addTo(ctrl);
        });



        //intro animations
        var tlIntro = new TimelineMax();
        tlIntro
            .set($stagger1,{visibility: 'visible'})
            .staggerFrom($stagger1,.8,{opacity:0, y:'+=50', ease: Power3.easeInOut},.06,0)
            .to($device,.1,{className:"+=draw",onComplete:    function(){
                $device.removeClass('transition , slow');
            }},'-=.5')
            .set($play ,{visibility:'visible'})
            .from($play,1.2, {opacity:0,scale:0,ease: Elastic.easeOut.config(1, 0.6), delay:.7})
            .from($scroll,.7, {opacity:0,scale:0,ease: Elastic.easeOut.config(1, 0.6)},'-=1.1')
        ;



        // device rotation (sec 1:2)
        var sec1 = new TimelineMax();
        sec1
            .to($play,.3, {opacity:0,scale:0},0)
            .to($device, 1, {x: '-130%' ,scale:'+=.3', rotation:90},0)
            .to($('.device.top'),1,{opacity:0, delay:.5},0)
            .staggerTo($stagger1,.15,{opacity:0, y:'-=50'},.06,0)
        ;


        new ScrollMagic.Scene({
            duration: '150%'
        })
            .setTween(sec1)
            .triggerElement($('body')[0])
            .addTo(ctrl);




        // sec2 animaion (sec 2:3)
        var sec2 = new TimelineMax();
        sec2
            .from($innerS2, 5, {opacity: 0,delay:6},0)
            .staggerFrom($covers,2,{opacity:0,scale:'-=.5', delay:6},1,0)
            .set($vLab ,{display:'block', zIndex:999})
        ;


        new ScrollMagic.Scene({
            triggerElement: $('#sec1')[0],
            triggerHook:1,
            duration: '100%'
        })
            .setTween(sec2)
            .addTo(ctrl);

        //animation A
        function animationA(){
            var tl1 = new TimelineMax();
            tl1
                //.set(ripple,{ rx:'1',ry:'1'})
                .to(liquidOrange, 1.2, {scaleY:'+=1.4',transformOrigin:'50% 100%', ease: Power0.easeNone},0)
                .to(liquidOrangeTop, 1.2, {scale:'-=.63',y:'-=150',transformOrigin:'50% 50%', ease: Power0.easeNone},0)
                .to(tube, 2.2, {strokeDashoffset:0 , ease: Sine.easeOut})
                .to(drop, .3, {transformOrigin:'50% 50%',opacity:1,scale:'+=3', ease: Sine.easeOut})
                .to(drop, .9, {y:160 , opacity:0,ease: Expo.easeIn, onComplete: function(){
                        tl1.set(drop,{css:{display:'none'}});
                    }})
                .set(liquidGreenTop,{ className:'+=wavy'} )
                .fromTo(goovey,.5, {attr:{"values":0}},{attr:{"values":360}})
                .to(turb,1, {attr:{"baseFrequency":0}}, '-=.5')
                .to(liquidGreen,.3,{css:{fill:'#9364CC'}},'-=1')
                .from(ripple,.5,{ css:{rx:'0', ry:'0', opacity:1}}, '-=1')

            ;
            return tl1;
        }
        //animation B
        function animationB(){
            var tl1 = new TimelineMax({repeat:-1});
            tl1
                .staggerFromTo(bubble,.75, { scale:0,transformOrigin:'center center',opacity:1.5}, {opacity:0,scale:3 , ease: SlowMo.ease.config(0.9, 0.5, false) },.5,0)
                .staggerFromTo(boile,.4, { opacity:0, ease: Power0.easeNone }, { opacity:1,scale:0,y:'-=60' , ease: Power0.easeNone},.1,0)

            ;
            return tl1;
        }



        //science animation
        var master = new TimelineMax({paused:'true'}),
            liquidOrange = $('.liquidOrange'),
            liquidOrangeTop = $('.liquidOrange_top'),
            liquidGreen = $('.liquidGreen'),
            liquidGreenTop = $('.liquidGreen_top'),
            ripple = $('.ripple'),
            drop = $('#drop'),
            pops = $('#pops circle'),
            tube = $('#tube'),
            boile = $('#boile circle'),
            goovey = $('#wavy'),
            turb = $('#turb'),
            bubble = $('.bubble');

            master
                .add(animationA())
                .add(animationB(),'-=.7');



        // device rotation Y (sec 2:3)
        var sec3 = new TimelineMax();
        sec3
            .to($covers,2,{opacity:0, delay:1.5})
            .to($device, 7, {bottom:'-=200', x:'+=240'},'-=1')
            .to($deviceInner,10, {rotationY:-70},'-=6.5')
            .to($depth,2, {opacity:1},'-=1.5')
            .from($vLab,2, {opacity: 0, onComplete: function(){
                master.play();
            }},11)
            .from($innerS3,2, {opacity: 0, delay:5},'-=7')
            .to($screen,2,{fillOpacity:.75},3)
        ;



        new ScrollMagic.Scene({
            triggerElement: $('#sec2')[0],
            duration: '140%'

        })
            //.addIndicators()
            .setTween(sec3)
            .addTo(ctrl);


        // footer animation
        var footer = new TimelineMax();
        footer
            .to([$vLab,$depth],1, {opacity: 0, delay:1,onComplete:function(){
                //TweenMax.set($vLab,{position:'absolute', display:'block'});
            }})
            .to($device, 3, {scale:'.45',right: '21%', left:'auto', y:0,bottom:20, rotation:0, className:'+=white'},1.5)
            .to($deviceInnerPath, 1.5, {fillOpacity:1},1.5)
            .to($deviceInner, 3, {rotationY:-30, onComplete: function(){
                master.pause(0);
                footer.set($device,{position:'absolute', bottom:'25%'});
            }},1.5);


        new ScrollMagic.Scene({
            triggerElement: $('#sec3')[0],
            triggerHook:0,
            duration: '120%'
        })
            .setTween(footer)
            .addTo(ctrl)
        ;



    }
    // if screen smaller than 768px
    else if( /Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)  &&  $(window).width() >= 768 ){
        $('body').addClass('min_v');

    }

    //if touch device apply scroll on swipe
    //$(function(){
    //    var section = 1;
    //
    //    $('#swipebox')
    //        .swipeEvents()
    //        .bind("swipeDown",  function(){
    //            //swipe down code
    //            if(section > 1){
    //                section--;
    //                TweenMax.to(window, 0.5, {scrollTo:{y:$("#sec" + section).offset().top}});
    //            }
    //
    //        })
    //        .bind("swipeUp",    function(){
    //            //swipe up code
    //            if(section < 4){
    //                section++;
    //            }
    //            TweenMax.to(window, 0.5, {scrollTo:{y:$("#sec" + section).offset().top}});
    //
    //        });
    //});


});