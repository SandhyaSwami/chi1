//COMPONENTS
/* MODAL
//Example:
<div modal type="client" size="auto" id="this_modal_id">
Content goes here.
</div>

//Options:
type (required): client, location, ibm, gps or apps (chapter name) - to keep color consistent with the chapter

size (optional): small, medium, large, full_width, full or auto (default)
 */
location_macro.directive('modalCard', function () {
    return {
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        scope : {
            size : '@',
            type : '@',
            title : '@'
        },
        controller : function ($scope) {

            //swipe functionality only for touch devices
            $(".touch_device .carousel-inner .videobox").each(function (index, element) {
                $(element).swipe({});
            });

            //Enable swiping... only for touch devices
            $(".touch_device .carousel-inner").not('.noSwipe').each(function (index, element) {
                $(element).swipe({
                    //Generic swipe handler for all directions
                    swipeRight : function (event, direction, distance, duration, fingerCount) {
                        $(this).parent().carousel('prev');
                    },
                    swipeLeft : function () {
                        $(this).parent().carousel('next');
                    },
                    //Default is 75px, set to 0 for demo so any distance triggers swipe
                    threshold : 0,
                    excludedElements : $.fn.swipe.defaults.excludedElements + ", .videobox_slider"
                });
            });

            //start carousel for subway menu
            $('.carousel.subway_slides').each(function (index, element) {
                $(element).carousel();
            });

            $('.carousel.subway_slides').on('slid.bs.carousel', function () {
                adjust_content_onleave($(this).closest('.carousel'));
            });

            //start carousel for ticker/marquee
            $('.carousel#carousel-ticker').each(function (index, element) {
                load_ticker_bottom(element);
            });

            //start carousel for iphone menu
            $('.carousel.iphone_slides').each(function (index, element) {
                $(element).carousel();
            });

            //start carousel for ipad menu
            $('.carousel.ipad_slides2').each(function (index, element) {
                $(element).carousel();
            });

            //start all simple slides carousel
            $('.carousel.simple_slides').each(function (index, element) {
                $(element).carousel();
            });
        },
        /*link: function(scope, element, attrs, itemsCtrl) {
        replicate_external_modals();
        },*/
        compile: function(element, attributes) {
            return {
                post: function postLink(scope, element, attributes) {
                    $("[data-toggle='popover']").popover();
                }
            };
        },
        templateUrl : 'view/components/modal_card.html'
    };
});

/*ZOOMER*/
location_macro.directive('zoomer', function () {
    return {
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        scope : {
            title : '@'
        },
        link : function (scope, element, attrs, itemsCtrl) {
            element.removeAttr('title');
        },
        templateUrl : 'view/components/zoomer.html'
    };
});

/*CHANNEL SELECTION*/
location_macro.directive('channelSelection', function () {
    return {
        restrict : 'A', //Attribute, Element or Class
        //transclude : true,
        //replace : true,
        scope : {
            //client: '@'
        },
        controller : function ($scope) {
            CHANNELS=CURRENT_CLIENT.menu_items;
            var items = $scope.items = [];
            angular.forEach(CHANNELS, function(channel, key) {
                if(key>0){//remove home
                    var ch_img=channel[1].split('/');
                    $scope.items.push({
                        'label' : channel[0],
                        'name' : channel[1],
                        'image' : ch_img[ch_img.length-1]
                    });
                }
            });
        },
        compile: function(element, attributes) {
            return {
                post: function postLink(scope, element, attributes) {
                    $(element).find('.inactive').removeAttr('href');
                }
            };
        },
        templateUrl : 'view/components/channel_selection.html'
    };
});


/* SCROLLABLE
//Example:
<div scrollable size="large">
Content
</div>

//Options:
size (optional): small, medium, large (default) or very_large
 */
location_macro.directive('scrollable', function () {
    return {
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        scope : {
            size : '@',
            responsive : '@'
        },
        compile: function(element, attributes) {
            return {
                post: function postLink(scope, element, attributes) {
                    $(".high_light").click(function () {
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                    });
                }
            };
        },
        templateUrl : 'view/components/scrollable.html'
    };
});

/* LOADER - dynamicaly loads content from html*/
location_macro.directive('loader', function () {
    return {
        restrict : 'A', //Attribute, Element or Class
        replace : true,
        link: function(scope, element, attrs) {
           scope.getContentUrl = function() {
                return attrs.src;
           };
           },
        templateUrl : 'view/components/loader.html'
    };
});


/* pieChart - creates a pie chart with ChartJS */
location_macro.directive('pieChart', function () {
    return {
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        scope : {
            hideLegend : '@'
        },
        controller : function ($scope) {
            var items = $scope.items = [];
            //shuffles the palette
            var colorPalette = graphPalette(1);
            var i=0;
            this.addItem = function (child_item) {
                if(!child_item.color){
                    child_item.randomColor=colorPalette[i];
                }
                i++;
                items.push(child_item);
            };
        },
        compile: function compile( tElement, tAttributes ) {
            return {
                post: function postLink( scope, element, attributes ) {
                    setTimeout(function () {
                        $(element).loadChart();
                    });
                }
            };
         },
        templateUrl : 'view/components/pie_chart.html'
    };
})
.directive('pieChartItem', function () {
    return {
        require : '^pieChart',
        restrict : 'A',
        replace : true,
        scope : {
            value : '@',
            label : '@',
            color : '@' //optional
        },
        link : function (scope, element, attrs, itemsCtrl) {
            itemsCtrl.addItem(scope);
        },
        templateUrl : 'view/components/chart_legend_item.html'
    };
});

/* pieChart - creates a pie chart with ChartJS */
location_macro.directive('lineChart', function () {
    return {
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        scope : {
            hideLegend : '@',
            theme: '@'//light (default) or dark
        },
        controller : function ($scope) {
            $scope.chartType='lineChart';

            var items = $scope.items = [];
            //shuffles the palette
            var colorPalette = graphPalette(1);
            var i=0;
            this.addItem = function (child_item) {
                if(!child_item.color){
                    child_item.randomColor=colorPalette[i];
                }
                i++;
                items.push(child_item);
            };
        },
        compile: function compile( tElement, tAttributes ) {
            return {
                post: function postLink( scope, element, attributes ) {
                    setTimeout(function () {
                        $(element).loadChart();
                    });
                }
            };
         },
        templateUrl : 'view/components/line_bar_chart.html'
    };
})
.directive('lineChartItem', function () {
    return {
        require : '^lineChart',
        restrict : 'A',
        replace : true,
        scope : {
            label : '@',
            color : '@', //optional
            set   : '@'
        },
        link : function (scope, element, attrs, itemsCtrl) {
            itemsCtrl.addItem(scope);
        },
        templateUrl : 'view/components/chart_legend_item.html'
    };
});

location_macro.directive('barChart', function () {
    return {
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        scope : {
            hideLegend : '@',
            theme: '@'//light (default) or dark
        },
        controller : function ($scope) {
            $scope.chartType='barChart';

            var items = $scope.items = [];
            //shuffles the palette
            var colorPalette = graphPalette(1);
            var i=0;
            this.addItem = function (child_item) {
                if(!child_item.color){
                    child_item.randomColor=colorPalette[i];
                }
                i++;
                items.push(child_item);
            };
        },
        compile: function compile( tElement, tAttributes ) {
            return {
                post: function postLink( scope, element, attributes ) {
                    setTimeout(function () {
                        $(element).loadChart();
                    });
                }
            };
         },
        templateUrl : 'view/components/line_bar_chart.html'
    };
})
.directive('barChartItem', function () {
    return {
        require : '^barChart',
        restrict : 'A',
        replace : true,
        scope : {
            label : '@',
            color : '@', //optional
            set   : '@'
        },
        link : function (scope, element, attrs, itemsCtrl) {
            itemsCtrl.addItem(scope);
        },
        templateUrl : 'view/components/chart_legend_item.html'
    };
})
.directive('toggle',['$compile',function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            if (attrs.toggle=="tooltip"){
                $(element).tooltip();
            }
        }
    };
}]);

location_macro.directive('stackedBarChart', function () {
    return {
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        scope : {
            hideLegend : '@',
            theme: '@'//light (default) or dark
        },
        controller : function ($scope) {
            $scope.chartType='stackedBarChart';

            var items = $scope.items = [];
            //shuffles the palette
            var colorPalette = graphPalette(1);
            var i=0;
            this.addItem = function (child_item) {
                if(!child_item.color){
                    child_item.randomColor=colorPalette[i];
                }
                i++;
                items.push(child_item);
            };
        },
        compile: function compile( tElement, tAttributes ) {
            return {
                post: function postLink( scope, element, attributes ) {
                    setTimeout(function () {
                        $(element).loadChart();
                    });
                }
            };
         },
        templateUrl : 'view/components/line_bar_chart.html'
    };
})
.directive('stackedBarChartItem', function () {
    return {
        require : '^stackedBarChart',
        restrict : 'A',
        replace : true,
        scope : {
            label : '@',
            color : '@', //optional
            set   : '@'
        },
        link : function (scope, element, attrs, itemsCtrl) {
            itemsCtrl.addItem(scope);
        },
        templateUrl : 'view/components/chart_legend_item.html'
    };
});

/*CHART LEGEND*/
location_macro.directive('chartLegend', function () {
    return {
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        controller : function ($scope) {
            var items = $scope.items = [];
            //shuffles the palette
            var colorPalette = graphPalette(1);
            var i=0;
            this.addItem = function (child_item) {
                if(!child_item.color){
                    child_item.randomColor=colorPalette[i];
                }
                i++;
                items.push(child_item);
            };
        },
        templateUrl : 'view/components/chart_legend.html'
    };
})
.directive('chartLegendItem', function () {
    return {
        require : '^chartLegend',
        restrict : 'A',
        replace : true,
        scope : {
            value : '@',
            label : '@',
            color : '@', //optional
        },
        link : function (scope, element, attrs, itemsCtrl) {
            itemsCtrl.addItem(scope);
        },
        templateUrl : 'view/components/chart_legend_item.html'
    };
});

/*DROPDOWN*/
location_macro.directive('dropdown', function () {
    return {
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        scope : {
            inline: '@',
            filter: '@',
            ignoreOrder: '@'
        },
        controller : function ($scope,$http) {
            var items = $scope.items = [];
            $scope.none_selected=true;

            $scope.activate = function (child_active) {
                angular.forEach(items, function (child_item) {
                    child_item.item_active = false;
                });
                $scope.none_selected=false;
                $scope.active_label=child_active.label;
                child_active.item_active = true;
            };

            this.addItem = function (child_item) {
                if(($scope.none_selected && child_item.type === 'item')||(child_item.active)){
                    $scope.activate(child_item);
                }
                items.push(child_item);
            };
            if (typeof isPortal != "undefined") {
                // get list by ajax request
                // https://9.3.68.241:9443/adminpanel/GetClients?client=google
                var client = $.cookie('CLIENT');
                $('#innov_cap_buttons').addClass('hidden');

                // $http.get('test.js')
                $http.get("/adminpanel/GetClient?client="+client)
                // $http.get("https://9.3.68.241:9443/adminpanel/GetClient?client="+client) // for test
                .success(function (data) {
                    // console.log('data',data);
                    var list = [];
                    if(data.status =="success" ){
                        var capabilities = data.data.capabilities;
                        for(var i in capabilities){
                            list.push(capabilities[i].capability);
                        }
                        // console.log('list',list);
                        // remove not in the list
                        var apps = $('#innov_cap_buttons').children('.ph2_bottommargin_row_tiny').children('a');
                        apps.each(function(index, el) {
                            if(list.indexOf($(el).attr('href').substr(1,$(el).attr('href').length)) < 0){
                                $(el).parent().remove();
                            }
                        });
                        $('#innov_cap_buttons').removeClass('hidden');
                    }else{
                        $.messager.popup("Dropdown Failed!");
                    }
                });
            }
        },
        link : function (scope, element, attrs, itemsCtrl) {
            if(scope.filter){
                $(element).dropdownFilter();
            }
        },
        templateUrl : 'view/components/dropdown.html'
    };
})
.directive('dropdownItem', function () {
    return {
        require : '^dropdown',
        restrict : 'A',
        transclude : true,
        replace : true,
        scope : {
            label : '@',
            active: '@'
        },
        link : function (scope, element, attrs, itemsCtrl) {
            scope.type = 'item';
            itemsCtrl.addItem(scope);
        },
        templateUrl : 'view/components/dropdown_item.html'
    };
})
// adding active class for selectable element
.directive('selectable', function(){
    var selected;

    var unselect = function(element) {
        element.removeClass('active');
    }
    var select = function(element) {
        if (selected){
            unselect(selected);
        }
        selected = element;
        element.addClass('active');
    }
    return {
        link : function(scope, element, attrs){
            element.on('click', function(){
                element.siblings().removeClass("active");
                select(element);
            });

        }
    }
})
.directive('dropdownHeader', function () {
    return {
        require : '^dropdown',
        restrict : 'A',
        transclude : true,
        replace : true,
        scope : {
            label : '@'
        },
        link : function (scope, element, attrs, itemsCtrl) {
            scope.type = 'header';
            itemsCtrl.addItem(scope);
        },
        templateUrl : 'view/components/dropdown_header.html'
    };
});

/* TABS - vertical, horizontal and video
//General options:
type (required): vertical, horizontal or video

//VERTICAL TAB
//Example:
<div tabs type="vertical" size="large">
<div tabs-item title="Title for the Item">
Content
</div>
</div>

//Options:
size (optional): small or large (default)

title (required for child item) - can use HTML

//HORIZONTAL TAB
//Example:
<div tabs type="horizontal" topmargin="true">
<div tabs-item title="Title for the Item">
Content
</div>
</div>

//Options:
topmargin (optional): true or false (default) - will add a small space between the items and the content

title (required for child item) - can use HTML

//VIDEO TAB
//Example:
<div tabs type="video">
<div tabs-item thumb="view/common/images/image.jpg">
Content
</div>
</div>

//Options:
thumb (required for child item) - path for image thumbnail
 */
location_macro.directive('tabs', function () {
    return {
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        scope : {
            topmargin : '@',
            size : '@', //small (large = ommit)
            type : '@' //horizontal, vertical, video
        },
        controller : function ($scope) {
            var items = $scope.items = players = [];

            $scope.activate = function (child_item, index) {
                angular.forEach(items, function (child_item) {
                    if(child_item.item_active===true){
                        child_item.item_active = false;
                    }
                });
                child_item.item_active = true;
                if(child_item.invokeMethod == 'getCemexData')    {
                      var controller = $scope.$parent;
                      controller.getCemexData();
                    }
                if ($scope.type == 'video') {

                    var lastActiveVideo = $("iframe.youtube_iframe[active='1']");
                    if (lastActiveVideo.length) {
                        lastActiveVideo.attr('active', '0');
                        if(lastActiveVideo.attr('src')){
                          lastActiveVideo.attr('src', lastActiveVideo.attr('src').replace('autoplay=true', 'autoplay=false'));
                        }
                    }
                    $("iframe.youtube_iframe").eq(index).attr('active', '1');
                }

            };

            this.addItem = function (child_item) {
                if (items.length === 0) { //first one
                    $scope.activate(child_item, 0);
                }
                items.push(child_item);
            };
        },
        templateUrl : 'view/components/tabs.html'
    };
})
.directive('tabsItem', function () {
    return {
        require : '^tabs',
        restrict : 'A',
        transclude : true,
        replace : true,
        scope : {
            title : '@',
            thumb : '@',
            invokeMethod:'@'
        },
        link : function (scope, element, attrs, itemsCtrl) {
            itemsCtrl.addItem(scope);
            element.removeAttr('title');
        },
        controller : function ($scope) {
            $("[data-toggle='popover']").popover();
        },
        templateUrl : 'view/components/tabs_item.html'
    };
});

/* PAGINATION
//Example:
<div pagination>
<div pagination-item title="">
Content
</div>
</div>

//Options:
title (optional for child item) - to use label on dropdown instead of number
 */
location_macro.directive('pagination', function () {
    return {
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        scope : {
            type : '@'
        },
        controller : function ($scope) {
            var items = $scope.items = [];
            $scope.selectedPageNum = 1;

            $scope.setPageNumber = function (selectedPageNum, action) {

                if (action === "next") {
                    //console.log(selectedPageNum + ", " + action);
                    if ($scope.selectedPageNum < items.length) {

                        $scope.selectedPageNum = parseInt($scope.selectedPageNum) + 1;
                    } else {
                        $scope.selectedPageNum = items.length;
                    }
                } else if (action === "back") {
                    if ($scope.selectedPageNum > 1) {
                        $scope.selectedPageNum = parseInt($scope.selectedPageNum) - 1;
                    } else if ($scope.selectedPageNum === 1) {

                        $scope.selectedPageNum = 1;
                    }

                } else if (action === "change") {
                    //console.log(selectedPageNum + ", " + action)
                }
            };

            $scope.$watch('selectedPageNum', function (type) {

                if (!type){
                    return;
                }else{
                    $('.pagetab:visible').find('.pagetab_tab_item.active').findChart();
                }
                //console.log(">>>>>>>>>>>>"+type);

            });

            $scope.activate = function (child_item) {
                angular.forEach(items, function (child_item) {
                    child_item.item_active = false;
                });
                child_item.item_active = true;
            };

            this.addItem = function (child_item) {
                if (items.length === 0) { //first one
                    $scope.activate(child_item);
                }
                items.push(child_item);
            };
        },
        templateUrl : 'view/components/pagination.html'
    };
})
.directive('paginationItem', function () {
    return {
        require : '^pagination',
        restrict : 'A',
        transclude : true,
        replace : true,
        scope : {
            title : '@'
        },
        link : function (scope, element, attrs, itemsCtrl) {
            itemsCtrl.addItem(scope);
            element.removeAttr('title');
        },
        templateUrl : 'view/components/pagination_item.html'
    };
});

/* CAROUSEL
//Example:
<div b-carousel>
<div b-carousel-item title="Title for the Item">
Content
</div>
</div>

//Options:
title (required for child item) - can use HTML
 */
location_macro.directive('bCarousel', function () {
    return {
        restrict : 'A',
        transclude : true,
        replace : true,
        scope : {
            itemSize : '@'
        },
        controller : function ($scope,$window,$location) {

            var getUrlVars = function(){
                var vars = [], hash;
                var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                for(var i = 0; i < hashes.length; i++)
                {
                  hash = hashes[i].split('=');
                  vars.push(hash[0]);
                  vars[hash[0]] = hash[1];
                }
                return vars;
            };
              var getUrlVar = function(name){
                return getUrlVars()[name];
              };
              $scope.item = 0;
              if(getUrlVar('index')){
                $scope.item = parseInt(getUrlVar('index'));
            }

            var items = $scope.items = [];

            $scope.activate = function (child_item) {
                angular.forEach(items, function (child_item) {
                    child_item.item_active = false;
                });
                child_item.item_active = true;
            };

            this.addItem = function (child_item) {
                var sel_child = $scope.item;

                /*if(!$scope.carouselActive){
                sel_child=0;//first one
                }else{
                sel_child=$scope.carouselActive-1;
                if(sel_child>items.length){//protection against out of range items
                sel_child=items.length;
                }
                }*/
                if (items.length === sel_child) {
                    $scope.activate(child_item);
                }
                items.push(child_item);
            };


            //swipe functionality only for touch devices
            $(".touch_device .carousel-inner .videobox").each(function (index, element) {
                $(element).swipe({});
            });

            //Enable swiping... only for touch devices
            $(".touch_device .carousel-inner").each(function (index, element) {
                $(element).swipe({
                    //Generic swipe handler for all directions
                    swipeRight : function (event, direction, distance, duration, fingerCount) {
                        $(this).parent().carousel('prev');
                    },
                    swipeLeft : function () {
                        $(this).parent().carousel('next');
                    },
                    //Default is 75px, set to 0 for demo so any distance triggers swipe
                    threshold : 0,
                    excludedElements : $.fn.swipe.defaults.excludedElements + ", .videobox_slider"
                });
            });

            //start carousel for subway menu
            $('.carousel.subway_slides').each(function (index, element) {
                $(element).carousel();
            });

            $window.add_bcarousel_index_url = function (slide_num) {
                if(slide_num){
                    $location.path($location.path()).search('index', slide_num).replace();
                }else{
                    $location.path($location.path()).search('').replace();
                }
                //refreshes angular
                setTimeout(function () {
                    $scope.$apply();
                },100);//timeout to avoid glitch
            };

            $('.carousel.subway_slides').on('slid.bs.carousel', function () {
                adjust_content_onleave($(this).closest('.carousel'));

                var cur_slide=$(this).find('.carousel-inner .item.active').index();
                add_bcarousel_index_url(cur_slide);
            });

            //start carousel for ticker/marquee
            $('.carousel#carousel-ticker').each(function (index, element) {
                load_ticker_bottom(element);
            });

            //start carousel for iphone menu
            $('.carousel.iphone_slides').each(function (index, element) {
                $(element).carousel();
            });

            //start carousel for ipad menu
            $('.carousel.ipad_slides2').each(function (index, element) {
                $(element).carousel();
            });

            //start all simple slides carousel
            $('.carousel.simple_slides').each(function (index, element) {
                $(element).carousel();
            });
        },
        templateUrl : 'view/components/bottom_carousel.html'
    };
})
.directive('bCarouselItem', function () {
    return {
        require : '^bCarousel',
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        scope : {
            title : '@'
        },
        link : function (scope, element, attrs, itemsCtrl) {
            itemsCtrl.addItem(scope);
            element.removeAttr('title');
        },
        templateUrl : 'view/components/bottom_carousel_item.html'
    };
});

/*Card Carousel*/

location_macro.directive('cardBoard', function () {
    return {
        restrict : 'A',
        transclude : true,
        replace : true,
        scope : {},
        controller : function ($scope,$window,$location) {

            var getUrlVars = function(){
                var vars = [], hash;
                var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                for(var i = 0; i < hashes.length; i++)
                {
                  hash = hashes[i].split('=');
                  vars.push(hash[0]);
                  vars[hash[0]] = hash[1];
                }
                return vars;
            }
              var getUrlVar = function(name){
                return getUrlVars()[name];
              }
              $scope.item = 0;
              if(getUrlVar('index')){
                $scope.item = parseInt(getUrlVar('index'));
            }

            var items = $scope.items = [];

            $scope.activate = function (child_item) {
                angular.forEach(items, function (child_item) {
                    child_item.item_active = false;
                });
                child_item.item_active = true;
            };

            this.addItem = function (child_item) {
                var sel_child = $scope.item;
                if (items.length === sel_child) {
                    $scope.activate(child_item);
                }
                items.push(child_item);
            };


            //swipe functionality only for touch devices
            $(".touch_device .carousel-inner .videobox").each(function (index, element) {
                $(element).swipe({});
            });

            //Enable swiping... only for touch devices
            $(".touch_device .carousel-inner").each(function (index, element) {
                $(element).swipe({
                    //Generic swipe handler for all directions
                    swipeRight : function (event, direction, distance, duration, fingerCount) {
                        $(this).parent().carousel('prev');
                    },
                    swipeLeft : function () {
                        $(this).parent().carousel('next');
                    },
                    //Default is 75px, set to 0 for demo so any distance triggers swipe
                    threshold : 75,
                    excludedElements : ""
                    //excludedElements : ".videobox_slider"
                    //excludedElements : $.fn.swipe.defaults.excludedElements + ", .videobox_slider"
                });
            });

            //start carousel for subway menu
            $('.carousel.card-board').each(function (index, element) {
                $(element).carousel();
            });

            $window.add_card_index_url = function (slide_num) {
                if(slide_num){
                    $location.path($location.path()).search('index', slide_num).replace();
                }else{
                    $location.path($location.path()).search('').replace();
                }
                //refreshes angular
                setTimeout(function () {
                    $scope.$apply();
                },100);//timeout to avoid glitch
            };

            $('.carousel.card-board').on('slid.bs.carousel', function () {
                adjust_content_onleave($(this).closest('.carousel'));

                var cur_slide=$(this).find('.carousel-inner .item.active').index();
                add_card_index_url(cur_slide);
            });
        },
        templateUrl : 'view/components/card_board.html'
    };
})
.directive('cardBoardItem', function () {
    return {
        require : '^cardBoard',
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        scope : {},
        link : function (scope, element, attrs, itemsCtrl) {
            itemsCtrl.addItem(scope);
        },
        templateUrl : 'view/components/card_board_item.html'
    };
});


/*Slide Carousel (PPT)*/

location_macro.directive('slideViewer', function () {
    return {
        restrict : 'A',
        transclude : true,
        replace : true,
        scope : {},
        controller : function ($scope,$window,$location) {

            var getUrlVars = function(){
                var vars = [], hash;
                var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                for(var i = 0; i < hashes.length; i++)
                {
                  hash = hashes[i].split('=');
                  vars.push(hash[0]);
                  vars[hash[0]] = hash[1];
                }
                return vars;
            }
              var getUrlVar = function(name){
                return getUrlVars()[name];
              }
              $scope.item = 0;
              if(getUrlVar('index')){
                $scope.item = parseInt(getUrlVar('index'));
            }

            var items = $scope.items = [];

            $scope.activate = function (child_item) {
                angular.forEach(items, function (child_item) {
                    child_item.item_active = false;
                });
                child_item.item_active = true;
            };

            this.addItem = function (child_item) {
                var sel_child = $scope.item;
                if (items.length === sel_child) {
                    $scope.activate(child_item);
                }
                items.push(child_item);
            };


            //swipe functionality only for touch devices
            $(".touch_device .carousel-inner .videobox").each(function (index, element) {
                $(element).swipe({});
            });

            //Enable swiping... only for touch devices
            $(".touch_device .carousel-inner").each(function (index, element) {
                $(element).swipe({
                    //Generic swipe handler for all directions
                    swipeRight : function (event, direction, distance, duration, fingerCount) {
                        $(this).parent().carousel('prev');
                    },
                    swipeLeft : function () {
                        $(this).parent().carousel('next');
                    },
                    //Default is 75px, set to 0 for demo so any distance triggers swipe
                    threshold : 75,
                    excludedElements : ""
                    //excludedElements : $.fn.swipe.defaults.excludedElements + ", .videobox_slider"
                });
            });

            //start carousel for subway menu
            $('.carousel.slide-viewer').each(function (index, element) {
                $(element).carousel();
            });

            $window.add_sviewer_index_url = function (slide_num) {
                if(slide_num){
                    $location.path($location.path()).search('index', slide_num).replace();
                }else{
                    $location.path($location.path()).search('').replace();
                }
                //refreshes angular
                setTimeout(function () {
                    $scope.$apply();
                },100);//timeout to avoid glitch
            };

            $('.carousel.slide-viewer').on('slid.bs.carousel', function () {
                adjust_content_onleave($(this).closest('.carousel'));

                var cur_slide=$(this).find('.carousel-inner .item.active').index();
                add_sviewer_index_url(cur_slide);
            });
        },
        templateUrl : 'view/components/slide_viewer.html'
    };
})
.directive('slideViewerItem', function () {
    return {
        require : '^slideViewer',
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        scope : {},
        link : function (scope, element, attrs, itemsCtrl) {
            itemsCtrl.addItem(scope);
        },
        templateUrl : 'view/components/slide_viewer_item.html'
    };
});

/* VIDEOBOX
//Example:
<div videobox link-mp4="view/videos/VIDEO_FILE.mp4" youtube-id="39jtNUGgmd4" link-mediahub="http://w3-mediahub.ibm.com/viewerportal/vmds/embed.vp?programId=esc_program%3A26652&contentAssocId=association%3A63709">
<img src="./view/common/images/image01.jpg">
<img src="./view/common/images/image02.jpg">
<img src="./view/common/images/image03.jpg">
</div>

//Options:
link-mp4 (optional) - path to video file

youtube-id (optional) - for https://www.youtube.com/watch?v=39jtNUGgmd4 -> id = 39jtNUGgmd4

link-mediahub (optinal) - go to media hub video page, look for share button (right hand side) and select Embed. Grab the full code that will look like this (below) and copy only the src attribute value.

<iframe seamless frameborder=0 allowfullscreen webkitallowfullscreen mozallowfullscreen src='http://w3-mediahub.ibm.com/viewerportal/vmds/embed.vp?programId=esc_program%3A26652&contentAssocId=association%3A63709' width='640' height='401'></iframe>
 */
location_macro.directive('videobox', function () {
    return {
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        scope : {
            linkMp4 : '@',
            linkMediahub : '@',
            youtubeId : '@'
        },
        link : function (scope, element, attrs, itemsCtrl) {
            animate_video(find_index('.videobox'), element);
        },
        templateUrl : 'view/components/videobox.html'
    };
});

/*IMAGEBOX*/
location_macro.directive('imagebox', function () {
    return {
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        scope : {
            proportion : '@'
        },
        link: function (scope, element, attrs, itemsCtrl) {
            animate_images(find_index('.imagebox'), element);
        },
        templateUrl : 'view/components/imagebox.html'
    };
});

/* MODAL
//Example:
<div modal type="client" size="auto" id="this_modal_id">
Content goes here.
</div>

//Options:
type (required): client, location, ibm, gps or apps (chapter name) - to keep color consistent with the chapter

size (optional): small, medium, large, full_width, full or auto (default)
 */
location_macro.directive('modal', function () {
    return {
        restrict : 'A', //Attribute, Element or Class
        transclude : true,
        replace : true,
        scope : {
            size : '@',
            type : '@',
            client : '@'
        },
        controller : function ($scope) {

            //swipe functionality only for touch devices
            $(".touch_device .carousel-inner .videobox").each(function (index, element) {
                $(element).swipe({});
            });

            //Enable swiping... only for touch devices
            $(".touch_device .carousel-inner").not('.noSwipe').each(function (index, element) {
                $(element).swipe({
                    //Generic swipe handler for all directions
                    swipeRight : function (event, direction, distance, duration, fingerCount) {
                        $(this).parent().carousel('prev');
                    },
                    swipeLeft : function () {
                        $(this).parent().carousel('next');
                    },
                    //Default is 75px, set to 0 for demo so any distance triggers swipe
                    threshold : 0,
                    excludedElements : $.fn.swipe.defaults.excludedElements + ", .videobox_slider"
                });
            });

            //start carousel for subway menu
            $('.carousel.subway_slides').each(function (index, element) {
                $(element).carousel();
            });

            $('.carousel.subway_slides').on('slid.bs.carousel', function () {
                adjust_content_onleave($(this).closest('.carousel'));
            });

            //start carousel for ticker/marquee
            $('.carousel#carousel-ticker').each(function (index, element) {
                load_ticker_bottom(element);
            });

            //start carousel for iphone menu
            $('.carousel.iphone_slides').each(function (index, element) {
                $(element).carousel();
            });

            //start carousel for ipad menu
            $('.carousel.ipad_slides2').each(function (index, element) {
                $(element).carousel();
            });

            //start all simple slides carousel
            $('.carousel.simple_slides').each(function (index, element) {
                $(element).carousel();
            });
        },
        /*link: function(scope, element, attrs, itemsCtrl) {
        replicate_external_modals();
        },*/
        compile: function(element, attributes) {
            return {
                post: function postLink(scope, element, attributes) {
                    $("[data-toggle='popover']").popover();
                }
            };
        },
        templateUrl : 'view/components/modal.html'
    };
});
/* FLASHBOX
//Example:
<div flashbox flash-title="Main Title" subtitle="Sub Title" flash-src="view/cli_unilever/resources/swf/control_scenario05.swf">
</div>

//Options:
flash-title (required): Title of the video

subtitle (required): Description of the video in 5 to 8 words.

flashSrc (required): Flash data file(.swf) path. this is not required when 'flashbox_empty' class is added to flashbox Element.

Note: Add 'flashbox_empty' class to flashbox element to restrict user to play the video.
 */
location_macro.directive('flashbox', function () {
    return {
        replace : true,
        scope : {
            flashTitle : '@',
            subtitle : '@',
            flashSrc : '@'
        },
        templateUrl : 'view/components/flashbox.html',
        compile : function (Ele, Attrs) {
            var flashbox_default_msg = '<p>You need to install Adobe Flash Player to see this content.</p><a href="https://get.adobe.com/flashplayer/" target="_blank"><button class="btn_ph2">Install Adobe Flash Player</button></a>';

            if (!Ele.hasClass('flashbox_empty')) {
                Ele.find('.flashbox_swf').html(flashbox_default_msg).flashbox_load();
            }
        }
    };
});
/**
 * @name: Accordion
 * @example:  <div accordion>
 *                 <div accordion-panel title="Title 1">
 *                     Content Area
 *                 </div>
 *              </div>
 */

location_macro.directive('accordion', function(){
    return {
        restrict: "AE",
        replace: true,
        transclude: true,
        templateUrl : 'view/components/accordion.html',
        scope: {
            titleSize:"@",
        },
        controller : function ($scope) {
            var items = $scope.items = [];
            $scope.none_selected=true;

            $scope.activate = function (child_active) {
                angular.forEach(items, function (child_item) {
                    child_item.item_active = false;
                });
                $scope.none_selected=false;
                $scope.active_label=child_active.label;
                child_active.item_active = true;
            };

            this.addItem = function (child_item) {
                if(($scope.none_selected && child_item.type === 'item')||(child_item.active)){
                    $scope.activate(child_item);
                }
                if($scope.titleSize){
                    child_item.titleSize=$scope.titleSize;
                }
                items.push(child_item);
            };
        },
        link: function(scope, elem, attrs){
            //adding an id to the accordion if there's none
            var id = elem.attr("id");
            if (!id){
                id = "accordion_" + scope.$id;
                elem.attr("id", id);
            }

            //adding the parent id to each child
            $(elem).find("button").each(function(index, element) {
                $(element).attr("data-parent", "#" + id);
                $(element).attr("href", "#" + id + "_" + index);
                $(element).siblings('.panel-collapse').attr('id',id+'_'+index);
            });
        }
    }})
.directive('accordionPanel', function(){
    return {
        require: '^accordion',
        restrict: "AE",
        replace: true,
        transclude: true,
        scope: {
            title:"@",
            titleColor:"@",
            active:"@"
        },
        templateUrl : 'view/components/accordion_panel.html',
        link : function (scope, element, attrs, itemsCtrl) {
            scope.type = 'item';
            itemsCtrl.addItem(scope);
        }
    };
});

// Forum
location_macro.directive('forum', function () {
    return {
        restrict : 'E', //Attribute, Element or Class
        transclude: true,
        controller : function ($scope,$http) {

            // get list by ajax request
            var client = $.cookie('CLIENT');

            $http.get("/adminpanel/GetClient?client="+client)
            .success(function (data) {
                if(data.status =="success" ){
                    var forum_enable = data.data.forum_enable;
                    if(forum_enable == 'Y'){
                        $scope.show=true;
                    } else {
                        $scope.show=false;
                    }
                }else{
                    $.messager.popup("Forum component Failed!");
                }
            });
        },
        templateUrl : 'view/components/forum.html'
    };
});

// Highlight
location_macro.directive('highlightsTitle', function () {
    return {
        restrict : 'E', //Attribute, Element or Class
        transclude: true,
        templateUrl : 'view/components/highlights_title.html'
    };
});
location_macro.directive('highlightsContent', function () {
    return {
        restrict : 'E', //Attribute, Element or Class
        transclude: true,
        templateUrl : 'view/components/highlights_content.html'
    };
});

//for adding HTML entities on titles
location_macro.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

//for URLs
location_macro.filter('trustUrl', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
});

//for first-letter uppercase
location_macro.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1) : '';// + input.substr(1).toLowerCase()
    }
});

location_macro.directive('wphtml', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
            scope.$watch(attrs.wphtml, function(html) {
                ele.html(html);
                $compile(ele.contents())(scope);
            });
        }
    };
});
location_macro.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        $('#topContainer').on("mouseenter",function() {
            angular.element("#graphH").on("scroll", function () {
                if (element.scrollTop() + element.innerHeight() >= element[0].scrollHeight) {
                    angular.element('#scrollBtn').fadeOut("slow");
                } else {
                    angular.element('#scrollBtn').fadeIn("slow");
                }
                scope.$apply();
            });
        });
    };
});










