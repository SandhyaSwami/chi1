/**
 * Created by karan_sonawane on 8/26/2016.
 * Updated by Vaibhav Parkhi on 3/15/2017
 */

location_macro.controller('slaDashboardCtrl', function ($scope, $rootScope, $location, portalservice, utilityService, $route, dashboardDataProcessFactory, $timeout, FlickityService, $window) {

// usSpinnerService removed from above
    $scope.currentClientCofig = $route.current.$$route.config;
    $scope.wsTempParamObj = {
        clientName: $route.current.params.clientName,///$scope.currentClientCofig.name,
        clientGeo: $scope.currentClientCofig.geo,
        clientCountry: $scope.selectedDefaultCountry,
        dataType: DASH_DATA_TYPE_LBL,
        dateType: DASH_MONTHLY_LBL,
        startDate: 0,
        hierarchyPath: $scope.currentClientCofig.hierarchyPath,
        aggregationType: $scope.currentClientCofig.aggregationType,
        status: "",
        dateRange: "",
        slaFactKey: "",
        isCommentPosted: false,
        predictivePeriod: 0,
        isLiferay: $scope.currentClientCofig.isLiferay,
        isLoginServlet: $scope.currentClientCofig.isLoginServlet,
        apiversion: $scope.currentClientCofig.apiversion,
        updatedStatus: "",
        apiKey: $scope.currentClientCofig.commentAPITokenKey,
        avaliableGraphs: [0, 0, 0, 0],
        defaultGraph: "",
        breakDownFilter: "A",
        fileslaFactKey: 0,
        fileAttachmentKey: 0,
        fileCommentKey: 0
    }

    $scope.isClickedonEdit = false;
    $scope.searchMetricsArr = [];
    $scope.searchMetric = "";
    $scope.showDoughnut = false;
    $scope.showRawData = false;
    $scope.userName = "";
    $scope.selectedStatusFromMainPage = "";
    $scope.treemapDataArr = [];
    $scope.showTable = false;
    $scope.showNavigation=false;
    $scope.pageIdArr=[-1,-1];
    if ($route.current.params.value != undefined) {
        $scope.selectedDefaultCountry = $route.current.params.value;
    } else {
        $scope.selectedDefaultCountry = $route.current.$$route.config.defaultCountry;
    }
    if ($route.current.params.userName != undefined) {
        $scope.userName = $route.current.params.userName;
    } else {
        $scope.userName = "admin@ibm.com";//fallback
    }
    /*usSpinnerService.spin('spinner-1');*/
    var barChartObj = null;
    var barChartObjLastMonths = null;
    var lineCommentObj = null;
    var lineCommentObjLast = null;
    var doughnutChartObj = null;
    var doughnutChartObjTwo = null;
    var doughnutChartObjR = null;
    var doughnutChartObjG = null;
    var doughnutChartObjY = null;
    var isMLLoaded = false;
    $scope.totalOfDoughnutChart = 0;
    $scope.isFirstSixMonths = {first: false, commentsFirst: true};
    $scope.isPage2Visible = false;
    $scope.isCommentsVisible = false;
    $scope.isCardViewVisible = false;
    $scope.navHeaderTwo = $scope.currentClientCofig.drillDownHierarchyLabel;
    $scope.menuJSON = {};
    $scope.btnLabelbar = {firstHalf: "", secondHalf: ""};
    $scope.commentBtnLabelLine = {firstHalf: "", secondHalf: ""};
    $scope.isLineChart = false;
    $scope.chartType = "bar";
    $scope.donughtChart = "doughnut";
    $scope.drillDownHierarchyArr = [];
    $scope.selectedDrillDownOption = {};
    $scope.maxDrillDownDepth = 0;
    $scope.selectedMetricRecord = {};
    $scope.commentsChartButtonVisible = true;
    //graph var
    $scope.graphMonthArr = [];
    $scope.graphSLALabelArr = [];
    $scope.aggregatedGraphAllRecords = {};
    $scope.graphCurrentValueArr = {firstHalf: [], secondHalf: []};
    $scope.graphTargetValueArr = {firstHalf: [], secondHalf: []};
    $scope.graphMinValueArr = {firstHalf: [], secondHalf: []};
    $scope.portalAllTemp = [];
    $scope.drillDownLabelArr = [];
    $scope.aggregationsBarGraphData = [];
    $scope.selectedAggregationRecord = {};
    $scope.previousAggregationRecord = {};
    $scope.aggregationsDateArr = ["May 2016"];
    $scope.aggregationsSelectedDate = "";
    $scope.portalMonthSelectedIndex = 0;
    $scope.aggregationsMetricMasterArr = [];
    $scope.portalAllMetricGroupRecords = [];
    $scope.portalLastTwelveMetricGroupRecords = [];
    $scope.aggregationsMetricMasterArrClone = [];
    $scope.selectedChartPointIndex = 0;
    $scope.isAggregationButtonVisible = true;
    $scope.selectedTheme = "theme1";
    //comments
    $scope.selectedSLACommentArr = [];
    $scope.isCommentAdded = false;
    $scope.commentArea = {comment: ""};
    $scope.postCommentObj = {};
    $scope.isViewCommentsVisible = false;
    var commentsGraphClickedIndex = 2;
    $scope.isWeightedAverageOn = 0;
    $scope.weightedAverageOptionArr = ["Count", "Weighted"];
    $scope.aggregationsStatusArr = [
        {label: "All Status", value: "All"},
        {label: "Green", value: "G"},
        {label: "Yellow", value: "Y"},
        {label: "Red", value: "R"}];
    $scope.treeMapArrayData = [];
    $scope.selectedAggregationsType = $scope.weightedAverageOptionArr[0];
    $scope.weightedAverageOptionIndex = 0;
    //metric-type
    $scope.metricTypeSelectedIndex = 0;
    $scope.multiSelectDropDownIndex = 0;
    $scope.menuDrillDown = {
        "Hierarchy": []
    };
    $scope.isDonutValueSet = false;
    $scope.isDonutValueGSet = false;
    $scope.hierarchyCommentList = [];
    $scope.aggregationsProcessArr = [];
    $scope.selectedFileRecord = {};
    $scope.breakdownSummaryList = [];
    $scope.minLabel = "";
    $scope.resultLabel = "";
    $scope.targetLabel = "";
    //added for multi-select
    $scope.optionLabelArr = [];
    $scope.aggregationsDrillOptionsArrMultilevelArr = [];
    $scope.selectedOptionArr = [];
    $scope.loggedUserKey = 0;
    $scope.selectedComment = {};
    $scope.showCommentDeleteDialog = false;
    $scope.currentPageCount = 0;
    $scope.drillThroughPageArr = [];
    $scope.filteredItems = [];
    $scope.selectedDate="";
    $scope.menuJSON = {
        "Hierarchy": [
            {"name": "h1", "data": [], "shortName": []}, {"name": "h2", "data": [], "shortName": []}, {
                "name": "h3",
                "data": [],
                "shortName": []
            },
            {"name": "h4", "data": [], "shortName": []}, {"name": "h5", "data": [], "shortName": []}, {
                "name": "h6",
                "data": [],
                "shortName": []
            }, {"name": "h7", "data": [], "shortName": []},
            {"name": "h8", "data": [], "shortName": []}, {"name": "h9", "data": [], "shortName": []}
        ]
    };
    $scope.level = "H0";
    var chartColorPalette = {
        "theme1": {
            "page1": {
                min: "#D9182D",
                target: "#008A52",
                current: "#FFCF01",
                xGridLine: "rgba(38,38,47,.3)",
                yGridLine: "rgba(38,38,47,.3)",
                fontColor: "#26262F"
            }
            ,
            "page3": {
                min: "#D9182D",
                target: "#008A52",
                current: "#262626",
                xGridLine: "rgba(38,38,47,.3)",
                yGridLine: "rgba(38,38,47,.3)",
                fontColor: "#26262F"
            }
        },
        "theme2": {
            "page1": {
                min: "#D9182D",
                target: "#008A52",
                current: "#FFCF01",
                xGridLine: "rgba(255,255,255,.3)",
                yGridLine: "rgba(255,255,255,.3)",
                fontColor: "rgba(255,255,255,.6)"
            }
            ,
            "page3": {
                min: "#D9182D",
                target: "#008A52",
                current: "#262626",
                xGridLine: "rgba(255,255,255,.3)",
                yGridLine: "rgba(255,255,255,.3)",
                fontColor: "rgba(255,255,255,.6)"
            }
        }
    };
    /*var currentChartTheme=chartColorPalette.theme1;*/
    /*Get Barchart Object from directive*/
    $scope.getChartObjBar = function (obj) {
        barChartObj = obj.chart;
    };
    $scope.getChartObjBarLastMonth = function (obj) {
        barChartObjLastMonths = obj.chart;
    };
    $scope.getChartObjDoughnut = function (obj) {
        doughnutChartObj = obj.chart;
    };
    $scope.getChartObjDoughnutTwo = function (obj) {
        doughnutChartObjTwo = obj.chart;
    };
    var updateChartThemeValues = function (theme) {
        currentChartTheme = theme;
        $scope.doughnutChartData.datasets[0].backgroundColor = [currentChartTheme.page1.min, currentChartTheme.page1.target, currentChartTheme.page1.current];
        $scope.doughnutChartData.datasets[0].hoverBackgroundColor = [currentChartTheme.page1.min, currentChartTheme.page1.target, currentChartTheme.page1.current];
        if (doughnutChartObj) {
            doughnutChartObj.update();
        }
        if (doughnutChartObjTwo) {
            doughnutChartObjTwo.update();
        }
        $scope.barChartData.datasets[0].backgroundColor = $scope.barChartData.datasets[0].borderColor = currentChartTheme.page1.target;
        $scope.barChartData.datasets[1].backgroundColor = $scope.barChartData.datasets[1].borderColor = currentChartTheme.page1.current;
        $scope.barChartData.datasets[2].backgroundColor = $scope.barChartData.datasets[2].borderColor = currentChartTheme.page1.min;
        $scope.barChartOption.scales.yAxes[0].gridLines.color = currentChartTheme.page1.xGridLine;
        $scope.barChartOption.scales.yAxes[0].ticks.fontColor = currentChartTheme.page1.fontColor;
        $scope.barChartOption.scales.xAxes[0].ticks.fontColor = currentChartTheme.page1.fontColor;
        $scope.lineChartCommentOption.scales.yAxes[0].gridLines.color = currentChartTheme.page3.xGridLine;
        $scope.lineChartCommentOption.scales.yAxes[0].ticks.fontColor = currentChartTheme.page3.fontColor;
        $scope.lineChartCommentOption.scales.xAxes[0].ticks.fontColor = currentChartTheme.page3.fontColor;
        $scope.barChartDataLastMonth.datasets[0].backgroundColor = $scope.barChartDataLastMonth.datasets[0].borderColor = currentChartTheme.page1.target;
        $scope.barChartDataLastMonth.datasets[1].backgroundColor = $scope.barChartDataLastMonth.datasets[1].borderColor = currentChartTheme.page1.current;
        $scope.barChartDataLastMonth.datasets[2].backgroundColor = $scope.barChartDataLastMonth.datasets[2].borderColor = currentChartTheme.page1.min;

        $scope.lineChartCommentData.datasets[0].pointHoverBackgroundColor = $scope.lineChartCommentData.datasets[0].borderColor = currentChartTheme.page3.target;
        $scope.lineChartCommentData.datasets[1].pointHoverBackgroundColor = $scope.lineChartCommentData.datasets[1].borderColor = currentChartTheme.page3.min;
        $scope.lineChartCommentData.datasets[2].pointHoverBackgroundColor = $scope.lineChartCommentData.datasets[2].borderColor = currentChartTheme.page3.current;
        $scope.lineChartCommentDataLast.datasets[0].pointHoverBackgroundColor = $scope.lineChartCommentDataLast.datasets[0].borderColor = currentChartTheme.page3.target;
        $scope.lineChartCommentDataLast.datasets[1].pointHoverBackgroundColor = $scope.lineChartCommentDataLast.datasets[1].borderColor = currentChartTheme.page3.min;
        $scope.lineChartCommentDataLast.datasets[2].pointHoverBackgroundColor = $scope.lineChartCommentDataLast.datasets[2].borderColor = currentChartTheme.page3.current;
        if (barChartObj) {
            barChartObj.config.options.scales.yAxes[0].gridLines.color = barChartObjLastMonths.config.options.scales.yAxes[0].gridLines.color = currentChartTheme.page1.xGridLine;
            barChartObj.config.options.scales.yAxes[0].ticks.fontColor = barChartObjLastMonths.config.options.scales.yAxes[0].ticks.fontColor = currentChartTheme.page1.fontColor;
            barChartObj.config.options.scales.xAxes[0].ticks.fontColor = barChartObjLastMonths.config.options.scales.xAxes[0].ticks.fontColor = currentChartTheme.page1.fontColor;
            lineCommentObj.config.options.scales.yAxes[0].gridLines.color = lineCommentObjLast.config.options.scales.yAxes[0].gridLines.color = currentChartTheme.page3.xGridLine;
            lineCommentObj.config.options.scales.yAxes[0].ticks.fontColor = lineCommentObjLast.config.options.scales.yAxes[0].ticks.fontColor = currentChartTheme.page3.fontColor;
            lineCommentObj.config.options.scales.xAxes[0].ticks.fontColor = lineCommentObjLast.config.options.scales.xAxes[0].ticks.fontColor = currentChartTheme.page3.fontColor;
            barChartObj.update();
            barChartObjLastMonths.update();
            lineCommentObj.update();
            lineCommentObjLast.update();
        }
    }

    /* 3d carousel activate*/
    $(document).ready(function () {
        $('.menu-carousel').carousel3d();
    });

    /*bar graph in the content area. Divided in 2 pieces 1) Jan - June 2) Jul Dec. Code starts here*/
    $scope.barChartOption = {
        responsive: false,
        scales: {
            xAxes: [
                {
                    stacked:$scope.selectedChartType=="percentage"?true:false,
                    ticks: {
                        fontColor: "#26262F", // this here
                    },
                    gridLines: {
                        color: "rgba(38,38,47,.3)", // this here
                        display: false
                    }
                }
            ],
            yAxes: [
                {
                    stacked:$scope.selectedChartType=="percentage"?true:false,

                    ticks: {
                        fontColor: "#26262F", // this here
                        suggestedMin: 0,
                        beginAtZero: true,
                        min:0,
                        max:100
                    },
                    gridLines: {
                        color: "rgba(38,38,47,.3)", // this here
                        display: true,
                        zeroLineColor: "rgba(255,255,255,.25)"
                    },
                    barPercentage: 0.8
                }

            ]
        },
        elements: {
            line: {
                tension: 0.2
            }
        },
        legend: {
            display: false,
            position: "bottom"
        },
        tooltips: {
            enabled: false,
            // mode:"label",

        },


    };
    // page1 line graph first
    Chart.defaults.global.animationEasing = 'easeInOutQuad';
    $scope.barChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
        datasets: [{
            label: 'Actual',
            data: [91, 30, 50, 35, 35, 35],
            borderWidth: 2,
            fill: false,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 5,
            pointBackgroundColor: "white",
        }, {
            label: 'Target',
            data: [7, 25, 30, 15, 15, 15],
            borderWidth: 2,
            fill: false,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 5,
            pointBackgroundColor: "white",
        }, {
            label: 'Min',
            data: [2, 18, 13, 12, 11, 19],
            borderWidth: 2,
            fill: false,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 5,
            pointBackgroundColor: "white",
        }]
    };


    // page1 line graph second
    $scope.barChartDataLastMonth = {
        labels: ["July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: 'Actual',
            data: [55, 30, 50, 35, 35, 35],
            fill: false,
            borderWidth: 2,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 5,
            pointBackgroundColor: "white",
        }, {
            label: 'Target',
            data: [18, 25, 30, 15, 15, 15],
            fill: false,
            borderWidth: 2,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 5,
            pointBackgroundColor: "white",
        }, {
            label: 'Min',
            data: [15, 18, 13, 12, 11, 19],
            fill: false,
            borderWidth: 2,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 5,
            pointBackgroundColor: "white",
        }]
    };
    $scope.doughnutChartOption = {
        responsive: false,
        maintainAspectRatio: false,
        tooltips: {
            enabled: false,
        },

        legend: {
            display: false
        },
        title: {
            display: false,
            text: ''
        },
        animation: {
            onProgress: function (obj) {
                if ($scope.isDonutValueSet) {
                    $('.donutVal').each(function () {
                        $(this).prop('Counter', 0).animate({
                            Counter: $(this).text()
                        }, {
                            duration: 1000,
                            easing: 'swing',
                            step: function (now) {
                                $(this).text(Math.ceil(now));
                            }
                        });
                    });
                    $scope.isDonutValueSet = false;
                }
            },
            easing: "easeOutBounce",
            animateScale: true,
            animateRotate: true,


        },
        cutoutPercentage: 67
    };
    $scope.doughnutChartData = {
        datasets: [{
            data: [20, 20, 20],
            borderWidth: 0,
            backgroundColor: [],
            hoverBackgroundColor: [],
            label: 'Dataset 1'
        }],
        labels: [
            "Below Minimum: ",
            "Over Target: ",
            "Over Minimum: "
        ],

    };
    // comments line graph
    $scope.lineChartCommentData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
        datasets: [{
            label: 'Target',
            data: [0, 0, 0, 0, 0, 0],
            borderWidth: 2,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 5,
            pointBackgroundColor: ["white"],
            fill: false
        }, {
            label: 'Min',
            data: [0, 0, 0, 0, 0, 0],
            borderWidth: 2,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 5,
            pointBackgroundColor: ["white"],
            fill: false
        }, {
            label: 'Actual',
            borderDash: [3, 3],
            data: [0, 0, 0, 0, 0, 0],
            borderWidth: 2,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 5,
            pointBackgroundColor: ["white"],
            fill: true
        }]
    };
    $scope.lineChartCommentDataLast = {
        labels: ["July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: 'Target',
            data: [0, 0, 0, 0, 0, 0],
            borderWidth: 2,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 5,
            pointBackgroundColor: ["white"],
            fill: false,
        }, {
            label: 'Min',
            data: [0, 0, 0, 0, 0, 0],
            borderWidth: 2,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 5,
            pointBackgroundColor: ["white"],
            fill: false,
        }, {
            label: 'Actual',
            data: [0, 0, 0, 0, 0, 0],
            borderWidth: 2,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 5,
            pointBackgroundColor: ["white"],
            fill: true
        }]
    }

    //line chart options
    $scope.lineChartCommentOption = {
        responsive: true,
        scales: {
            xAxes: [
                {
                    ticks: {
                        fontColor: "#26262F", // this here
                    },
                    gridLines: {
                        color: "rgba(38,38,47,.3)", // this here
                        display: false
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        fontColor: "#26262F", // this here
                    },
                    gridLines: {
                        color: "rgba(38,38,47,.3)", // this here
                        display: true
                    }
                }
            ]
        },
        elements: {
            line: {
                tension: 0.2
            }
        },
        legend: {
            display: false,
            position: "bottom"
        },
        tooltips: {
            enabled: false
        },

    };
    $scope.chartTypeComment = "line";
    updateChartThemeValues(chartColorPalette.theme1);
    $scope.showDialog = false;
    $scope.showDeleteDialog = false;
    $scope.showAttachmentDialog = false;
    $scope.listViewNumberOfRecords = 6;
    function openMenuML() {
        classie.add(menuEl, 'menu--open');
    }

    function closeMenuML() {
        classie.remove(menuEl, 'menu--open');
    }

    function closeMenuMLDate() {
        classie.remove(dateMenuEL, 'menu--open');
    }

    var createShortNameBreadcrumb = function (isMenuClicked) {
        var breadCrumbObj = {str: $scope.currentClientCofig.drillDownHierarchyLabel, currentSelectedMenuItem: ""};

        var counter = 0;
        var currentSelectedMenuItem = "";
        if (isMenuClicked) {
            $('#ml-menu .menu__link.active').each(function () {
                var ind = $scope.menuJSON.Hierarchy[counter].data.indexOf($(this).text());
                breadCrumbObj.str = breadCrumbObj.str + " > " + $scope.menuJSON.Hierarchy[counter].shortName[ind];
                breadCrumbObj.currentSelectedMenuItem = $(this).text();
                counter++;
            });
        }
        else {
            $('#ml-menu .menu__breadcrumbs a:gt(0)').each(function () {
                var ind = $scope.menuJSON.Hierarchy[counter].data.indexOf($(this).text());
                breadCrumbObj.str = breadCrumbObj.str + " > " + $scope.menuJSON.Hierarchy[counter].shortName[ind];
            });
        }

        return breadCrumbObj;
    }
    $scope.showBreadcrumbData = function (ev, itemName, index, index2) {
        closeMenuML();
        $(ev.target).addClass('active').parent().siblings().children().removeClass('active');
        ev.preventDefault();
        var str = "";
        var currentSelectedMenuItem = "";
        var breadCrumbObj = createShortNameBreadcrumb(true);
        $('#ml-menu .menu__breadcrumbs a:last').text(breadCrumbObj.currentSelectedMenuItem);

        $scope.drillDownHierarchyArr[index + 1] = {
            label: itemName,
            level: "H" + (index + 1),
            id: (index + 1)
        };

        if ($scope.isPage2Visible || $scope.isCommentsVisible) {
            FlickityService.select($scope.flickityId_main, 0);
            $scope.isPage2Visible = false;
            $scope.isCommentsVisible = false;
        }
        $scope.selectedDrillDownOption.hierarchy = $scope.drillDownHierarchyArr[index + 1].level;
        $scope.selectedDrillDownOption.optionLabel = $scope.drillDownHierarchyArr[index + 1].label;
        $scope.navHeaderTwo = breadCrumbObj.str;
        if (!$scope.$$phase) {
            $scope.$digest();
        }

        ///$scope.changeAggregationsDownOption(index + 1);
    }
    $scope.changeAggregationsMonth = function (index) {
        $scope.searchMetricsArr=[];
        $scope.portalMonthSelectedIndex = index;
        $scope.aggregationsSelectedDate = $scope.aggregationsDateArr[index];

        index = ($scope.aggregationsDateArr.length - 1) - index;
        $scope.totalOfDoughnutChart = $scope.aggregatedGraphAllRecords.target[index] + $scope.aggregatedGraphAllRecords.current[index] + $scope.aggregatedGraphAllRecords.min[index];
        $('.donutVal').text($scope.totalOfDoughnutChart);

        $scope.doughnutChartData.datasets[0].data[1] = $scope.selectedAggregationRecord.green = $scope.aggregatedGraphAllRecords.target[index];
        $scope.doughnutChartData.datasets[0].data[2] = $scope.selectedAggregationRecord.yellow = $scope.aggregatedGraphAllRecords.current[index];
        $scope.doughnutChartData.datasets[0].data[0] = $scope.selectedAggregationRecord.red = $scope.aggregatedGraphAllRecords.min[index];
        $('.donutValG').text($scope.selectedAggregationRecord.green);
        $('.donutValY').text($scope.selectedAggregationRecord.yellow);
        $('.donutValR').text($scope.selectedAggregationRecord.red);
        $scope.isDonutValueSet = true;
        $scope.isDonutValueGSet = true;
        $scope.doughnutChartBottomDataY.datasets[0].data[0] = $scope.selectedAggregationRecord.yellow;
        $scope.doughnutChartBottomDataY.datasets[0].data[1] = ($scope.selectedAggregationRecord.green + $scope.selectedAggregationRecord.red);
        // doughnutChartObjY.update();
        $scope.doughnutChartBottomDataR.datasets[0].data[0] = $scope.selectedAggregationRecord.red;
        $scope.doughnutChartBottomDataR.datasets[0].data[1] = ($scope.selectedAggregationRecord.yellow + $scope.selectedAggregationRecord.green);
        // doughnutChartObjR.update();
        $scope.doughnutChartBottomDataG.datasets[0].data[0] = $scope.selectedAggregationRecord.green;
        $scope.doughnutChartBottomDataG.datasets[0].data[1] = ($scope.selectedAggregationRecord.yellow + $scope.selectedAggregationRecord.red);
        // doughnutChartObjG.update();
        $scope.selectedAggregationRecord.interval = $scope.aggregatedGraphAllRecords.interval[index];
        doughnutChartObj.update();
        doughnutChartObjTwo.update();
        /*if (index==0) {
            $scope.previousAggregationRecord.green = $scope.aggregatedGraphAllRecords.target[$scope.aggregatedGraphAllRecords.length - 1];
            $scope.previousAggregationRecord.yellow = $scope.aggregatedGraphAllRecords.current[index - 1];
            $scope.previousAggregationRecord.red = $scope.aggregatedGraphAllRecords.min[index - 1];
        }*/

        if($scope.portalMonthSelectedIndex==0){
            $scope.previousAggregationRecord.green=$scope.aggregationsBarGraphData[$scope.aggregationsBarGraphData.length-1].G;
            $scope.previousAggregationRecord.yellow=$scope.aggregationsBarGraphData[$scope.aggregationsBarGraphData.length-1].Y;
            $scope.previousAggregationRecord.red=$scope.aggregationsBarGraphData[$scope.aggregationsBarGraphData.length-1].R;
        }else{
            $scope.previousAggregationRecord.green=$scope.aggregationsBarGraphData[$scope.portalMonthSelectedIndex-1].G;
            $scope.previousAggregationRecord.yellow=$scope.aggregationsBarGraphData[$scope.portalMonthSelectedIndex-1].Y;
            $scope.previousAggregationRecord.red=$scope.aggregationsBarGraphData[$scope.portalMonthSelectedIndex-1].R;
        }
        if ($scope.isPage2Visible) {
            $scope.aggregationsMetricMasterArr = [];
            $scope.wsTempParamObj.dateRange = $scope.selectedAggregationRecord.interval;
            $scope.getDrillThroughMetricData($scope.wsTempParamObj);
        }
        $scope.getFullHierarchy($scope.wsTempParamObj);
        dashboardDataProcessFactory.processBreakDownArr($scope.processAggregationMasterGraphArr, $scope);
    }

    $scope.calculateTheDoughnutPer = function (value) {
        if (value != null) {
            return Math.abs(value / $scope.totalOfDoughnutChart * 100).toFixed(2);
        } else {
            return "";
        }

    }

    //change the process for aggregation data
    $scope.portalProcessSelectedIndex = 0;
    $scope.changeAggregationsProcess = function () {
        $scope.searchMetricsArr=[];
        $scope.aggregationsMetricMasterArr = [];
        $scope.portalProcessSelectedIndex = this.$index;
        $scope.processValue = this.rec;
        if ($scope.processValue.indexOf('All') != -1) {
            $scope.wsTempParamObj.breakDownFilter = "A";
        } else {
            $scope.wsTempParamObj.breakDownFilter = $scope.processValue;
        }

        if ($scope.isPage2Visible) {
            $scope.filterProcess($scope.processValue, $scope.portalStatusValue);
        } else {
            $scope.getAggregationsData($scope.wsTempParamObj);
            $scope.getFullHierarchy($scope.wsTempParamObj);
        }

    };

    $scope.getChartObjLineComment = function (obj, index) {
        lineCommentObj = obj.chart;
        var gradient = lineCommentObj.chart.ctx.createLinearGradient(0, 0, 0, 450);
        gradient.addColorStop(1, 'rgba(90,168,69, 0.0)');
        gradient.addColorStop(0.5, 'rgba(90,168,69, 0.0)');
        gradient.addColorStop(0.3, 'rgba(90,168,69, 0.0)');
        gradient.addColorStop(0, 'rgba(90,168,69, 0.0)');
        $scope.lineChartCommentData.datasets[2].backgroundColor = gradient;
        lineCommentObj.update();
    };
    $scope.getChartObjLineCommentLast = function (obj) {
        lineCommentObjLast = obj.chart;
        var gradient = lineCommentObjLast.chart.ctx.createLinearGradient(0, 0, 0, 450);
        gradient.addColorStop(1, 'rgba(90,168,69, 0.0)');
        gradient.addColorStop(0.5, 'rgba(90,168,69, 0.0)');
        gradient.addColorStop(0.3, 'rgba(90,168,69, 0.0)');
        gradient.addColorStop(0, 'rgba(90,168,69, 0.0)');
        $scope.lineChartCommentDataLast.datasets[2].backgroundColor = gradient;
        lineCommentObjLast.update();
    };

    $scope.navigateNextPage = function () {
        $scope.isPage2Visible = true;
        if ($scope.aggregationsMetricMasterArr.length == 0) {
            $('.view-record').text("0 - 0");
        }
        $scope.isCommentsVisible = false;
        FlickityService.select($scope.flickityId_main, 1);

    }
    $scope.navigateBack = function () {
        if ($scope.isPage2Visible) {
            FlickityService.select($scope.flickityId_main, 0);
            $scope.isPage2Visible = !$scope.isPage2Visible;
        }
        else if ($scope.isCommentsVisible || !$scope.showSearchModal) {
            FlickityService.select($scope.flickityId_main, 1);
            $scope.isCommentsVisible = false;
            $scope.isPage2Visible = true;
        }

    }
    $scope.navigateCommentPage = function () {
        FlickityService.select($scope.flickityId_main, 2);
        $scope.isPage2Visible = false;
        $scope.isCommentsVisible = true;
    }
    /*Flickity Config Code starts here*/
    // We are defining our own ID so that we can reference it later
    $scope.flickityId = 'flickityId';
    $scope.flickityOptions = {
        cellSelector: '.demo__slide',
        prevNextButtons: false,
        friction: .4,
        selectedAttraction: .1,
        pageDots: false,
        accessibility: false,
        initialIndex: 1
    };
    $scope.flickityIdComments = "commentsFlickitySlides";
    $scope.flickityOptionsComments = {
        cellSelector: '.demo__slide_comment',
        prevNextButtons: false,
        friction: .4,
        selectedAttraction: .1,
        pageDots: false,
        accessibility: false
    };
    $scope.flickityIdCommentsWrapper = "flickityIdCommentsWrapper";
    $scope.flickityOptionsCommentsWrapper = {
        cellSelector: '.demo__slide_comment_wrapper',
        prevNextButtons: false,
        friction: .4,
        selectedAttraction: .1,
        pageDots: false,
        draggable: false,
        accessibility: false
    };
    //Flickity Main carousel for page wrapping
    $scope.flickityId_main = 'flickityId_main';
    $scope.flickityOptions_main = {
        cellSelector: '.demo__slide_main',
        prevNextButtons: false,
        /* friction: .4,
         selectedAttraction: .1,*/
        pageDots: false,
        draggable: false,
        accessibility: false
    };
    $scope.flickityIdCard = 'flickityIdCard';
    $scope.flickityOptionsCard = {
        cellSelector: '.demo__slide_card',
        prevNextButtons: false,
        pageDots: false,
        draggable: false,
        accessibility: false
    };
    // on flickity cell select add active class to custom buttons
    var settle = $rootScope.$on('Flickity:flickityId:select', function (event, data) {
        if (data.instance.cells[0].element.className.search("is-selected") > 0) {
            $scope.isFirstSixMonths.first = true;
        }
        else if (data.instance.cells[1].element.className.search("is-selected") > 0) {
            $scope.isFirstSixMonths.first = false;
        }
        if (!$scope.$$phase) {
            $scope.$digest();
        }
    });
    var settleComments = $rootScope.$on('Flickity:commentsFlickitySlides:select', function (event, data) {
        /* console.log(event);
         console.log(data);*/
        /*data.instance.bindDrag();*/
        if (data.instance.cells[0].element.className.search("is-selected") > 0) {
            $scope.isFirstSixMonths.commentsFirst = true;
        }
        else if (data.instance.cells[1].element.className.search("is-selected") > 0) {
            $scope.isFirstSixMonths.commentsFirst = false;
        }
        if (!$scope.$$phase) {
            $scope.$digest();
        }
    });
    // Go to the first slide when clicked
    $scope.showJanToJun = function () {
        // Go directly to the first cell
        FlickityService.select($scope.flickityId, 0);
    };
    $scope.showJulToDec = function () {
        // Go directly to the second cell
        FlickityService.select($scope.flickityId, 1);
    };
    $scope.showJanToJunComments = function () {
        // Go directly to the first cell
        FlickityService.select($scope.flickityIdComments, 0);
    };
    $scope.showJulToDecComments = function () {
        // Go directly to the second cell
        FlickityService.select($scope.flickityIdComments, 1);
    };
    var intializeViewRecordValue = function (type) {
        $("." + type).scrollTop(0);

        if (type == 'card-view') {
            if ($scope.aggregationsMetricMasterArr.length > 4) {
                $('.view-record').text("1 - 4");
            }
            else if ($scope.aggregationsMetricMasterArr.length == 0) {
                $('.view-record').text("0 - 0");
            }
            else {
                $('.view-record').text("1 - " + $scope.aggregationsMetricMasterArr.length);
            }
        }
        else {
            if ($scope.aggregationsMetricMasterArr.length > 6) {
                $('.view-record').text("1 - " + $scope.listViewNumberOfRecords);
            }
            else if ($scope.aggregationsMetricMasterArr.length == 0) {
                $('.view-record').text("0 - 0");
            }
            else {
                $('.view-record').text("1 - " + $scope.aggregationsMetricMasterArr.length);
            }
        }

    }

    $scope.showListView = function () {
        intializeViewRecordValue('list-view');
        $scope.isCardViewVisible = false;
        // Go directly to the first cell
        FlickityService.select($scope.flickityIdCard, 0);
    };
    $scope.showCardView = function () {
        intializeViewRecordValue('card-view');
        $scope.isCardViewVisible = true;
        // Go directly to the second cell
        FlickityService.select($scope.flickityIdCard, 1);
    };

    /*Multi level menu code starts here*/

    $scope.changeChartType = function (e) {
        if (e.target.checked) {
            $scope.chartType = 'line';
        }
        else {
            $scope.chartType = 'bar';
        }


        if ($scope.chartType == 'bar') {
            $scope.barChartData.datasets[0].fill = false;
            $scope.isLineChart = false;
            $scope.barChartData.datasets[0].backgroundColor = "#008A52";
            $scope.barChartDataLastMonth.datasets[0].fill = false;
            $scope.barChartDataLastMonth.datasets[0].backgroundColor = "#008A52";
        }

        else {
            /* $scope.isLineChart=true;
             $scope.barChartData.datasets[0].fill= true;
             console.log(barChartObj);
             var gradient = barChartObj.chart.ctx.createLinearGradient(0, 0, 0, 450);
             gradient.addColorStop(1, 'rgba(90,168,69, 0.0)');
             gradient.addColorStop(0.5, 'rgba(90,168,69, 0.0)');
             gradient.addColorStop(0.3, 'rgba(90,168,69, 0.0)');
             gradient.addColorStop(0, 'rgba(90,168,69, 0.0)');
             $scope.barChartData.datasets[0].backgroundColor= gradient;
             $scope.barChartDataLastMonth.datasets[0].fill= true;
             var gradient2 = barChartObjLastMonths.chart.ctx.createLinearGradient(0, 0, 0, 450);
             gradient2.addColorStop(0, 'rgba(90,168,69, 0)');
             gradient2.addColorStop(0.3, 'rgba(90,168,69, 0.0)');
             gradient2.addColorStop(0.5, 'rgba(90,168,69, 0.0)');
             gradient2.addColorStop(0.75, 'rgba(90,168,69, 0.0)');
             gradient2.addColorStop(1, 'rgba(90,168,69, 0)');
             $scope.barChartDataLastMonth.datasets[0].backgroundColor= gradient2;*/

        }

    }
    $scope.changeCardListView = function (e) {
        if (e.target.checked) {
            $scope.showListView();
        }
        else {
            $scope.showCardView();

        }
    }
    /*WS Implementation*/
    //page load function on router
    $scope.loadAggregationsData = function () {
        $scope.getConfigData($scope.wsTempParamObj);
    }
    //load configuration
    $scope.getConfigData = function (wsParamObj) {
        // usSpinnerService.spin('spinner-1');
        var promise = portalservice.getConfigData(wsParamObj, $scope.currentClientCofig.deploymentEnv);
        promise.success(function (response) {
            if (response.errorCode === 0) {
                //console.log(response);
                dashboardDataProcessFactory.processConfigData($scope, response.result)
                $scope.isAjaxComplete = true;
                $scope.portalWebSeviceErrorMsg = false;
                $scope.isServiceFailed = false;
                // usSpinnerService.stop('spinner-1');
            }
            else {
                $scope.portalWebSeviceErrorMsg = true;//response.errorMsg;
                // usSpinnerService.stop('spinner-1');
                $scope.showErrorModal(DASH_CLIENT_NOT_FOUND_ERR_MSG);
            }
        });
        promise.error(function (err) {
            // usSpinnerService.stop('spinner-1');
            $scope.isServiceFailed = true;
            $scope.showErrorModal(err);
        });
    }

    $scope.showErrorMessageDialog = function (message) {
        $scope.errorDialogText = message;
        //$("#errorModal").modal("show");
    }

    //get top ten metric data
    $scope.getTopTenMetricData = function (wsParamObj) {
        // usSpinnerService.spin('spinner-1');
        var promise = portalservice.getTopTenMetricData(wsParamObj, $scope.currentClientCofig.deploymentEnv);
        promise.success(function (response) {
            if (response.errorCode === 0) {
                dashboardDataProcessFactory.processTopTenMetricData($scope, response.result);
                $scope.isAjaxComplete = true;
                $scope.portalWebSeviceErrorMsg = false;
                $scope.isServiceFailed = false;
                // usSpinnerService.stop('spinner-1');
            }
            else {
                $scope.portalWebSeviceErrorMsg = true;//response.errorMsg;
                // usSpinnerService.stop('spinner-1');
                $scope.showErrorModal(response.errorMessage);
            }
        });
        promise.error(function (err) {
            // usSpinnerService.stop('spinner-1');
            $scope.isServiceFailed = true;
            $scope.showErrorModal(err);
        });
    }

    //init variables for WS call
    $scope.initAggregationData = function () {
        $scope.aggregationsGraphData = [];
        $scope.aggregationsMonthsArr = [];
        $scope.aggregationsGreenValArr = [];
        $scope.aggregationsRedValArr = [];
        $scope.aggregationsYellowValArr = [];
        ///$scope.aggregationsChartData = {};
        $scope.aggregationsChartObj = [];
        $scope.aggregationsMasterArr = [];
        $scope.selectedAggregationRecord = {yellow: 0, red: 0, green: 0, interval: ""};
        $scope.previousAggregationRecord = {yellow: 0, red: 0, green: 0, interval: ""};
        $scope.selectedAggregationAppRecord = {};
        ////$scope.portalMonthSelectedIndex = 0;
        $scope.aggregationsGraphData = [];
        ///$scope.aggregationsChartData = {};
        $scope.selectedAggregationRecord = {};
        $scope.drillDownOptionSelectedIndex = -1;

    }
    //Pull down menu
    var pullMenuEl = document.querySelector('.pull-side-menu')
    var handleEls = document.querySelectorAll('.nav-side, .close-handle')
    var isOpen = true
    var boundry = new Impulse.Boundry({top: 0, bottom: 0, left: 0, right: 1500})

    var pullDownMenu = new Impulse(pullMenuEl)
        .style('translateX', function (x, y) {
            return x + 'px'
        })

    var drag = pullDownMenu.drag({handle: handleEls, boundary: boundry, direction: 'horizontal'})

    function end() {
        if (this.moved()) {
            isOpen = pullDownMenu.direction('right')
        } else {
            isOpen = !isOpen
            if (isOpen) {
                pullDownMenu.velocity(0, 2000)
            }
        }

        if (isOpen) {
            $('.pull-side-menu').css('display', 'block')
            pullMenuEl.classList.add('open')
            pullDownMenu.accelerate({acceleration: 1500, bounceAcceleration: 4000, bounce: this.moved()})
                .to(boundry.right, 0).start()
                .then(function () {
                })
        } else {
            $('.pull-side-menu').css('display', 'block')
            pullMenuEl.classList.remove('open')
            pullDownMenu.spring({tension: 100, damping: 15})
                .to(boundry.left, 0).start()
        }
    }

    drag.on('end', end)
    pullMenuEl.classList.add('open')
    pullDownMenu.accelerate({acceleration: 1500, bounceAcceleration: 0})
        .to(boundry.right, 0).start()

    /*Pull down menu  changes ends here*/

    //aggregations data for drill-down graph
    $scope.getAggregationsData = function (wsParamObj) {
        // usSpinnerService.spin('spinner-1');
        var promise = portalservice.getAggregationsData(wsParamObj, $scope.currentClientCofig.deploymentEnv);
        promise.success(function (response) {
            if (response.errorCode === 0) {
                $scope.aggregationsGraphData = response.result;
                if ($scope.aggregationsGraphData != null || $scope.aggregationsGraphData != undefined) {
                    //$scope.processAggregationsData($scope.aggregationsGraphData);
                    dashboardDataProcessFactory.processAggregationsData($scope, $scope.aggregationsGraphData);
                    if(doughnutChartObj!=null && doughnutChartObjTwo!=null){
                        doughnutChartObj.update();
                        doughnutChartObjTwo.update();
                    }

                    // doughnutChartObjY.update();
                    // doughnutChartObjR.update();
                    // doughnutChartObjG.update();
                    //Assign Barchart values
                    /*$scope.barChartData.datasets[0].data = $scope.graphTargetValueArr.firstHalf;
                    $scope.barChartData.datasets[1].data = $scope.graphCurrentValueArr.firstHalf;
                    $scope.barChartData.datasets[2].data = $scope.graphMinValueArr.firstHalf;*/
                    console.log($scope.barChartData.datasets);
                    /* $scope.barChartDataLastMonth.datasets[0].data=$scope.graphTargetValueArr.secondHalf;
                     $scope.barChartDataLastMonth.datasets[1].data=$scope.graphCurrentValueArr.secondHalf;
                     $scope.barChartDataLastMonth.datasets[2].data=$scope.graphMinValueArr.secondHalf;*/
                    if(barChartObj!=null){
                        barChartObj.update();
                    }
                }

                $scope.isAjaxComplete = true;
                $scope.portalWebSeviceErrorMsg = false;
                $scope.isServiceFailed = false;
                // usSpinnerService.stop('spinner-1');
            }
            else {
                $scope.portalWebSeviceErrorMsg = true;//response.errorMsg;
                // usSpinnerService.stop('spinner-1');
                $scope.showErrorModal(response.errorMessage);
            }
        });
        promise.error(function (err) {
            // usSpinnerService.stop('spinner-1');
            $scope.isServiceFailed = true;
            $scope.showErrorModal(err);
        });
    }

    /**
     * load the hierarchy comments data from getHierarchyCommentListData API
     * @param wsParamObj
     */
    $scope.getHierarchyCommentListData = function (wsParamObj) {
        // usSpinnerService.spin('spinner-1');
        var promise = portalservice.getHierarchyCommentListData(wsParamObj, $scope.currentClientCofig.deploymentEnv);
        promise.success(function (response) {
            if (response.errorCode === 0) {
                $scope.hierarchyCommentList = [];
                ///$scope.hierarchyCommentList = response.result.hierarchyCommentList;
                dashboardDataProcessFactory.processCommentListData($scope, response.result.hierarchyCommentList)
                dashboardDataProcessFactory.processPathData($scope, response.result.hierarchyCommentList);
                $scope.isAjaxComplete = true;
                $scope.portalWebSeviceErrorMsg = false;
                $scope.isServiceFailed = false;
                $scope.showDeleteDialog = false;
                // usSpinnerService.stop('spinner-1');
            }
            else {
                $scope.portalWebSeviceErrorMsg = true;//response.errorMsg;
                // usSpinnerService.stop('spinner-1');
                $scope.showErrorModal(response.errorMessage);
            }
        });
        promise.error(function (err) {
            // usSpinnerService.stop('spinner-1');
            $scope.isServiceFailed = true;
            $scope.showErrorModal(err);
        });
    }

    /**
     * Construct the drill-down path for the hierarchy path
     * @param arr
     * @return drill-down hierarchy path
     */
    $scope.getDrillDownPath = function (arr) {
        var str = "";
        for (var i = 1; i < arr.length; i++) {
            str += arr[i].level + ":" + arr[i].label + "|";
        }
        return str;
    }
    /*//change the drill-down for aggregation data
     $scope.changeAggregationsDownOption = function (index) {

     $scope.aggregationsMetricMasterArr = [];
     /!*$scope.isCardViewVisible = false;*!/
     $scope.initAggregationData();
     $scope.drillDownOptionSelectedIndex = index;
     $scope.optionLabel = $scope.selectedDrillDownOption.optionLabel;
     //  $scope.wsTempParamObj.startDate = $scope.portalMonthSelectedTimeStamp;

     //$scope.selectedDrillDownOption[1];

     if ($scope.wsTempParamObj.apiversion == "2.0" || $scope.wsTempParamObj.apiversion == "2.1") {
     if ($scope.getDrillDownPath($scope.drillDownHierarchyArr) != "") {
     $scope.wsTempParamObj.hierarchyPath = $scope.getDrillDownPath($scope.drillDownHierarchyArr);
     $scope.wsTempParamObj.hierarchyPath=$scope.wsTempParamObj.hierarchyPath.slice(0,-1);
     } else {
     $scope.wsTempParamObj.hierarchyPath = $scope.selectedDrillDownOption.hierarchy + ":" + $scope.selectedDrillDownOption.optionLabel;
     }
     } else {
     $scope.wsTempParamObj.hierarchyPath = $scope.selectedDrillDownOption.hierarchy + ":" + $scope.selectedDrillDownOption.optionLabel;
     }

     $scope.getAggregationsData($scope.wsTempParamObj);

     };*/
    //change the drill-down for aggregation data
    $scope.changeAggregationsDownOption = function (index1, isSelected) {
        $scope.aggregationsMetricMasterArr = [];
        $scope.searchMetricsArr=[];
        $scope.selectedDrillDownOption = {};
        $scope.isCardViewVisible = false;
        $scope.initAggregationData();
        $scope.drillDownOptionSelectedIndex = this.$index;
        $scope.selectedDrillDownOption = this.rec;
        ///$scope.optionLabel = $scope.selectedDrillDownOption.shortname;
        $scope.wsTempParamObj.startDate = $scope.portalMonthSelectedTimeStamp;
        var tempHierarchyPath = "";
        var tempIndex = index1 + 1;
        $scope.selectedOptionArr[0] = $scope.drillDownLabelArr[0];
        $scope.selectedOptionArr[tempIndex] = $scope.selectedDrillDownOption.shortname;
        if ($scope.aggregationsDrillOptionsArrMultilevelArr[index1].length > 0) {
            $scope.selectedOptionArr = $scope.selectedOptionArr.slice(0, index1 + 2);
            $scope.drillDownHierarchyArr[tempIndex] = {
                label: $scope.selectedDrillDownOption.optionLabel,
                level: $scope.selectedDrillDownOption.hierarchy,
                shortname: $scope.selectedDrillDownOption.shortname,
                id: tempIndex
            };
            var temp = $scope.drillDownHierarchyArr.slice(0, tempIndex + 1);
            $scope.optionLabelArr = [];
            tempHierarchyPath = $scope.getDrillDownPath(temp);
            tempHierarchyPath = tempHierarchyPath.substring(0, tempHierarchyPath.length - 1);
        } else {
            var temp = $scope.drillDownHierarchyArr.slice(0, tempIndex + 1);
            tempHierarchyPath = $scope.getDrillDownPath(temp) + $scope.selectedDrillDownOption.hierarchy + ":" + $scope.selectedDrillDownOption.optionLabel
        }
        console.log($scope.selectedDrillDownOption.optionLabel);
        if (isSupportedAPIVersion(supported2xVersion, $scope.wsTempParamObj.apiversion) || isSupportedAPIVersion(supported3xVersion, $scope.wsTempParamObj.apiversion)) {
            if ($scope.getDrillDownPath($scope.drillDownHierarchyArr) != "") {
                $scope.wsTempParamObj.hierarchyPath = tempHierarchyPath;
            } else {
                $scope.wsTempParamObj.hierarchyPath = $scope.selectedDrillDownOption.hierarchy + ":" + $scope.selectedDrillDownOption.optionLabel;
            }
        } else {
            $scope.wsTempParamObj.hierarchyPath = $scope.selectedDrillDownOption.hierarchy + ":" + $scope.selectedDrillDownOption.optionLabel;
        }
        $scope.getAggregationsData($scope.wsTempParamObj);
        $scope.getFullHierarchy($scope.wsTempParamObj);
        if ($scope.isPage2Visible) {
            $scope.getDrillThroughMetricData($scope.wsTempParamObj);
        }
    };
    // display the trends status
    $scope.displayTrendStatus = function (str) {
        switch (String(str).trim().toUpperCase()) {
            case "U":
                return {'ico-trend-up': true};
                break;
            case "D":
                return {'ico-trend-down': true};
                break;
            case "S":
                return {'ico-trend-right': true};
                break;
            default:
                return {'ico-trend-right': true};

        }
    };
    var clearDrillDownHierarchy = function (index) {
        for (var i = index; i < $scope.menuJSON.Hierarchy.length; i++) {
            $scope.menuJSON.Hierarchy[i].data.length = 0;
            $scope.menuJSON.Hierarchy[i].data = [];
            $scope.menuJSON.Hierarchy[i].shortName = [];
        }
    }
    //calculate the trends arrow direction
    $scope.calculateTrends = function (selectedMonthRecord, previousMonthRecord) {
        return utilityService.calculateTrends(selectedMonthRecord, previousMonthRecord);
    }
    var backMenuFunction = function (mlmenu2) {
        $('.menu__item a').removeClass('active');
        mlmenu2._menuIn(mlmenu2.menus[0], undefined);
        $('.menu__breadcrumbs a').not(':first').remove();
    }
    //click on metric type
    $scope.onClickMetricType = function (rec, index) {
        /* $scope.isCardViewVisible = false;
         $scope.isStatusChanged = false;
         $scope.drillDownHierarchyArr = [];
         $scope.aggregationsProcessArr = [];
         $scope.drillDownHierarchyArr[0] = {
         label: $scope.currentClientCofig.drillDownHierarchyLabel,
         level: "H0",
         id: 0
         };

         $scope.drillDownOptionSelectedIndex = -1;
         $scope.selectedDrillDownOption = {};
         $scope.wsTempParamObj.hierarchyPath = $scope.currentClientCofig.hierarchyPath;
         clearDrillDownHierarchy(1);
         /!*end();*!/

         $scope.initAggregationData();
         $scope.getAggregationsData($scope.wsTempParamObj);
         $scope.getFullHierarchy($scope.wsTempParamObj);*/
        //$('#menu-dropdown-open').prop('checked', false);
        //console.log();
        //backMenuFunction(mlmenu);
        /* pullMenuEl.classList.remove('open');
         menuDown.spring({
         tension: 100,
         damping: 15
         })
         .to(0, boundry.top).start();*/
        /*$( "#ml-menu .menu__breadcrumbs a:eq(0)").trigger('click');*/
        $scope.wsTempParamObj.dataType = rec.metricType;
        $scope.loadHomePage();
        $scope.metricTypeSelectedIndex = index;
        $scope.navHeaderTwo = $scope.currentClientCofig.drillDownHierarchyLabel;
        if ($scope.isPage2Visible) {
            $scope.isPage2Visible = false;
            FlickityService.select($scope.flickityId_main, 0);
        }

    }

    /**
     * Re-loading the whole dashboard data
     */
    $scope.loadHomePage = function () {
        $scope.wsTempParamObj.hierarchyPath = "H0:" + $scope.currentClientCofig.drillDownHierarchyLabel;
        console.log($scope.wsTempParamObj.hierarchyPath)
        $scope.processValue = $scope.headerLabel + " " + DASH_ALL_LBL;
        $scope.portalProcessSelectedIndex = 0;
        $scope.portalMonthSelectedIndex = 0;
        $scope.drillDownHierarchyArr.splice(1, $scope.drillDownHierarchyArr.length - 1);
        if ($scope.drillDownLabelArr.length > 0) {
            if ($scope.drillDownLabelArr[1] != undefined && $scope.drillDownLabelArr[1] != "" || $scope.drillDownLabelArr[1] != null) {
                $scope.optionLabel = $scope.drillDownLabelArr[1];
            } else {
                $scope.optionLabel = DASH_DRILL_DOWN_LBL;
            }
        }
        $scope.initAggregationData();
        $scope.selectedDrillDownOption = {};
        $scope.selectedOptionArr = [];
        $scope.drillDownOptionSelectedIndex = -1;
        $scope.searchMetricsArr=[];
        $scope.drillThroughPageArr=[];
        $scope.wsTempParamObj.breakDownFilter = "A";
        if ($scope.isPage2Visible || $scope.isCommentsVisible) {
            $scope.isPage2Visible = false;
            $scope.isCommentsVisible = false;
            FlickityService.select($scope.flickityId_main, 0);
        }
        $scope.getAggregationsData($scope.wsTempParamObj);
        $scope.getFullHierarchy($scope.wsTempParamObj);
    }


    $scope.loadHomeClick = function () {
       /* $scope.wsTempParamObj.hierarchyPath = "H0:" + $scope.currentClientCofig.drillDownHierarchyLabel;
        console.log($scope.wsTempParamObj.hierarchyPath)
        $scope.processValue = $scope.headerLabel + " " + DASH_ALL_LBL;
        $scope.portalProcessSelectedIndex = 0;
        $scope.portalMonthSelectedIndex = 0;*/
        /*$scope.drillDownHierarchyArr.splice(1, $scope.drillDownHierarchyArr.length - 1);
        if ($scope.drillDownLabelArr.length > 0) {
            if ($scope.drillDownLabelArr[1] != undefined && $scope.drillDownLabelArr[1] != "" || $scope.drillDownLabelArr[1] != null) {
                $scope.optionLabel = $scope.drillDownLabelArr[1];
            } else {
                $scope.optionLabel = DASH_DRILL_DOWN_LBL;
            }
        }
        $scope.initAggregationData();
        $scope.selectedDrillDownOption = {};
        $scope.selectedOptionArr = [];
        $scope.drillDownOptionSelectedIndex = -1;
        $scope.searchMetricsArr=[];
        $scope.drillThroughPageArr=[];*/
        ///$scope.wsTempParamObj.breakDownFilter = "A";
        if ($scope.isPage2Visible || $scope.isCommentsVisible) {
            $scope.isPage2Visible = false;
            $scope.isCommentsVisible = false;
            FlickityService.select($scope.flickityId_main, 0);
        }
        $scope.getAggregationsData($scope.wsTempParamObj);
        $scope.getFullHierarchy($scope.wsTempParamObj);
    }

    $scope.loadPageTwo = function () {
        console.log($scope.pageIdArr);
        if ($scope.isPage2Visible || $scope.isCommentsVisible) {
            if($scope.pageIdArr[0]==3){
                $scope.openModalWindow();
                $scope.isCommentsVisible = false;
                FlickityService.select($scope.flickityId_main, 0);
            }else if($scope.pageIdArr[0]==4){
                openSearchMatrixModal();
                $scope.isCommentsVisible = false;
                FlickityService.select($scope.flickityId_main, 0);
            }else{
                $scope.isPage2Visible = true;
                $scope.isCommentsVisible = false;

                $scope.filterProcess($scope.processValue, $scope.portalStatusValue);
                FlickityService.select($scope.flickityId_main, 1);
            }


            //FlickityService.select($scope.flickityId_main, 0);
        }
    }

    // click event for red, green & yellow
    $scope.onClickCard = function (status) {

        intializeListViewNumbers();
        $scope.isStatusChanged = false;
        $scope.aggregationsMetricMasterArr = [];
        $scope.selectedStatusFromMainPage = status;
        $scope.wsTempParamObj.dateRange = $scope.selectedAggregationRecord.interval;
        $scope.wsTempParamObj.status = status;
        /* $scope.processValue = $scope.headerLabel+" "+DASH_ALL_LBL;
         $scope.monthValue=PERIOD_LBL+' '+DASH_ALL_LBL;*/
        $scope.getDrillThroughMetricData($scope.wsTempParamObj);
        //$scope.showDrillMetricRecords();
    };
    // get the Aggregations MetricData
    $scope.getDrillThroughMetricData = function (wsParamObj) {
        if (!$scope.isStatusChanged) {
            if ($scope.selectedStatusFromMainPage == "G") {
                $scope.portalStatusSelectedIndex = 1;
            } else if ($scope.selectedStatusFromMainPage == "Y") {
                $scope.portalStatusSelectedIndex = 2;
            } else if ($scope.selectedStatusFromMainPage == "R") {
                $scope.portalStatusSelectedIndex = 3;
            } else {
                $scope.portalStatusSelectedIndex = 0;
            }
        }

        $scope.portalStatusLabel = $scope.aggregationsStatusArr[$scope.portalStatusSelectedIndex].label;
        $scope.portalStatusValue = $scope.aggregationsStatusArr[$scope.portalStatusSelectedIndex].value;
        console.log($scope.portalStatusValue);
        $scope.wsTempParamObj.status = "A";
        setTimeout(function () {
            $scope.navigateNextPage();
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        }, 800);
        var promise = portalservice.getDrillThroughMetricData(wsParamObj, $scope.currentClientCofig.deploymentEnv);
        promise.success(function (response) {
            if (response.errorCode === 0) {
                dashboardDataProcessFactory.processDrillThroughMetricData($scope, response.result);
                dashboardDataProcessFactory.processPathData($scope, response.result);
                // usSpinnerService.stop('spinner-1');

                $scope.isAjaxComplete = true;
                $scope.portalWebSeviceErrorMsg = false;
                $scope.isServiceFailed = false;
            }
            else {
                $scope.portalWebSeviceErrorMsg = true;//response.errorMsg;
                // usSpinnerService.stop('spinner-1');
                $scope.navigateNextPage();
                $scope.showErrorModal(response.errorMessage);
            }

        });
        promise.error(function (err) {
            // usSpinnerService.stop('spinner-1');
            /*$scope.navigateNextPage();*/
            $scope.isServiceFailed = true;
            $scope.showErrorModal(err);
        });
    }

    //format the breadcrumb text
    $scope.formatBreadCrumbText = function (rec) {
        var labelTempArr = [];
        var lblStr = "";
        for (var i = 0; i < 5; i++) {
            if (rec["h" + (i + 1) + "label"] != null && rec["h" + (i + 1) + "label"] != undefined) {
                labelTempArr.push(rec["h" + (i + 1) + "label"]);
            }
        }
        if (parseInt($scope.wsTempParamObj.apiversion) >= 2.0) {
            for (var i = 0; i < labelTempArr.length; i++) {
                if (labelTempArr[i] != undefined) {
                    if (i == labelTempArr.length - 1) {
                        lblStr += labelTempArr[i]
                    } else {
                        lblStr += labelTempArr[i] + " > "
                    }
                }

            }
            return lblStr;
        } else {
            return $scope.currentClientCofig.drillDownHierarchyLabel + " > " + rec.clientGeo + " > " + rec.clientCountry;
        }
    }
    // status icon color
    $scope.getCategoryColor = function (colorCode) {
        switch (colorCode) {
            case "R":
                return {'red': true};
                break;
            case "G":
                return {'green': true};
                break;
            case "Y":
                return {' yellow': true};
                break;
            case 4:
                return {'category_10 fr': true};
                break;
        }
    };


    $('.card-view').on('scroll', function () {
        var top = $('.card-view').scrollTop();
        $(".card-view > li").withinviewport().each(function () {
            var arr = $(this).attr("class").split(" ");
            var elemnt = arr[arr.length - 1].slice(4);
            var numOfRecords = parseInt(elemnt);
            if (top <= 200) {
                $('.view-record').text("1 - 4");
            }
            else {
                $('.view-record').text((numOfRecords - 2) + " - " + (numOfRecords + 1));
            }
            if (numOfRecords + 1 == $scope.aggregationsMetricMasterArr.length && ($scope.aggregationsMetricMasterArr.length % 2 != 0)) {
                $('.view-record').text((numOfRecords - 1) + " - " + (numOfRecords + 1));
            }
        });
    });
    $('.list-view').on('scroll', function () {

        $(".list-view > li").withinviewport().each(function () {
            var arr = $(this).attr("class").split(" ");
            var elemnt = arr[arr.length - 1].slice(4);
            var numOfRecords = parseInt(elemnt);
            var start = (numOfRecords - ($scope.listViewNumberOfRecords - 1));
            if (start <= 0)
                start = 1;
            $('.view-record').text(start + " - " + (numOfRecords + 1));
        });
    });
    var intializeListViewNumbers = function () {
        var ht = $(window).height();
        if (ht > 600) {
            $scope.listViewNumberOfRecords = 7;
        }

    }
    //Page 3 Drill down graph WS integration
    $scope.intializeDrillDownData = function (rec) {
        console.log(rec);
        $scope.pageIdArr[0]=1;
        $scope.pageIdArr[1]=2;
        $scope.showNavigation=true;
        $scope.selectedMetricRecord = {};
        $scope.selectedMetricRecord = rec;
        $scope.selectedDate=$scope.aggregationsSelectedDate;
        console.log($scope.selectedDate);
        $scope.currentPageCount = this.index;
        console.log($scope.currentPageCount);
        $scope.wsTempParamObj.slaFactKey = $scope.selectedMetricRecord.factKey;
        ///$scope.wsTempParamObj.clientName = "pepsico"
        $scope.wsTempParamObj.clientCountry = $scope.selectedMetricRecord.clientCountry;
        $scope.wsTempParamObj.clientGeo = $scope.selectedMetricRecord.clientGeo;
        $scope.wsTempParamObj.isCommentPosted = false;
        $scope.isCommentAdded = false;
        commentsGraphClickedIndex = 2;
        $scope.selectedChartPointIndex = 0;
        $scope.loadDrillDownGraph($scope.wsTempParamObj);
    }

    $scope.loadCommentGraphPage = function (rec) {
        $scope.selectedMetricRecord = {};
        $scope.selectedMetricRecord = rec;
        $scope.wsTempParamObj.slaFactKey = $scope.selectedMetricRecord.factKey;
        ///$scope.wsTempParamObj.clientName = "pepsico"
        $scope.wsTempParamObj.clientCountry = $scope.selectedMetricRecord.clientCountry;
        $scope.wsTempParamObj.clientGeo = $scope.selectedMetricRecord.clientGeo;
        $scope.wsTempParamObj.isCommentPosted = false;
        $scope.isCommentAdded = false;
        commentsGraphClickedIndex = 2;
        $scope.selectedChartPointIndex = 0;
        $scope.loadDrillDownGraph($scope.wsTempParamObj);
    }
    // get call for the drill down graph data
    $scope.loadDrillDownGraph = function (wsTempParamObj) {
        $scope.allMonthsMetricsRecords = [];
        // usSpinnerService.spin('spinner-1');
        /*setTimeout(function(){

         },400);*/
        $scope.navigateCommentPage();
        portalservice.getCommentsData(wsTempParamObj, $scope.currentClientCofig.deploymentEnv).success(function (response) {
            if (response.errorCode === 0) {
                $scope.allMonthsMetricsRecords = response.result;
                dashboardDataProcessFactory.processDrillDownGraph($scope, $scope.allMonthsMetricsRecords);
                // usSpinnerService.stop('spinner-1');
                /////$scope.getCommentsData(wsTempParamObj);
                $scope.portalWebSeviceErrorMsg = false;
                $scope.isServiceFailed = false;
            }
            else {
                $scope.portalWebSeviceErrorMsg = true;//response.errorMsg;
                // usSpinnerService.stop('spinner-1');
                $scope.showErrorModal(response.errorMessage);
            }
        }).error(function (err) {
            // usSpinnerService.stop('spinner-1');
            $scope.isServiceFailed = true;
            $scope.showErrorModal(err);
        });
    }
    //For Chart.js 2.0 Multiline labels need to be created by array of labels-[["Jan","2016"]["Feb","2016"]]
    var createMultilineLabels = function (labels) {
        labelsArr = [];
        for (var i = 0; i < labels.length; i++) {
            var arr = [];
            arr = labels[i].split(" ");
            labelsArr[i] = arr;
        }
        return labelsArr;
    }
    // Function will initialize background color to white by default So that onclick we can change
    var initializeLineChartColor = function () {
        for (var i = 0; i < $scope.lineChartCommentData.datasets[0].data.length; i++) {
            $scope.lineChartCommentData.datasets[0].pointBackgroundColor[i] = "white";
            $scope.lineChartCommentData.datasets[1].pointBackgroundColor[i] = "white";
            $scope.lineChartCommentData.datasets[2].pointBackgroundColor[i] = "white";
        }
        for (var i = 0; i < $scope.lineChartCommentDataLast.datasets[0].data.length; i++) {
            $scope.lineChartCommentDataLast.datasets[0].pointBackgroundColor[i] = "white";
            $scope.lineChartCommentDataLast.datasets[1].pointBackgroundColor[i] = "white";
            $scope.lineChartCommentDataLast.datasets[2].pointBackgroundColor[i] = "white";
        }
        lineCommentObj.update();
        //lineCommentObjLast.update();

    }
    $scope.generateDisplayLabelButton = function (arr) {
        return arr[0][0] + " " + arr[0][1] + " - " + arr[arr.length - 1][0] + " " + arr[arr.length - 1][1];
    }
    //load Drill down chart Page 3 ,Select last twelve Months divide into 2 and show in 2 different charts
    $scope.loadDrillDownChart = function (arr) {
        $scope.portalLastTwelveMetricGroupRecords = [];
        $scope.portalLastTwelveMetricGroupRecords = arr;
        firstHalf = $scope.portalLastTwelveMetricGroupRecords;
        $scope.lineChartCommentData.datasets[0].data = dashboardDataProcessFactory.createArrayObjectValues(firstHalf, 'target');
        $scope.lineChartCommentData.datasets[1].data = dashboardDataProcessFactory.createArrayObjectValues(firstHalf, 'min');
        $scope.lineChartCommentData.datasets[2].data = dashboardDataProcessFactory.createArrayObjectValues(firstHalf, 'current');
        $scope.lineChartCommentData.labels = createMultilineLabels(dashboardDataProcessFactory.createArrayObjectValues(firstHalf, 'displayDate'));
        $scope.commentsChartButtonVisible = false;
        var monthArr=dashboardDataProcessFactory.createArrayObjectValues(firstHalf, 'displayDate');
        console.log(dashboardDataProcessFactory.createArrayObjectValues(firstHalf, 'displayDate'));
        for(var i=0;i<monthArr.length;i++){
            if($scope.selectedDate==monthArr[i]){
                $scope.selectedChartPointIndex=i;
            }
        }
        if ($scope.selectedChartPointIndex == 0) {
            $scope.selectedChartPointIndex = $scope.portalLastTwelveMetricGroupRecords.length - 1;
        }
        onClickChangeBackgroundColor($scope.lineChartCommentData, lineCommentObj, $scope.selectedChartPointIndex);
    }


    var onClickChangeBackgroundColor = function (data, obj, index) {
        index = $scope.selectedChartPointIndex;
        console.log(index);
        obj = lineCommentObj;
        data = $scope.lineChartCommentData;
        $scope.selectedGraphRecord = $scope.portalLastTwelveMetricGroupRecords[index];
        console.log($scope.selectedGraphRecord);
        initializeLineChartColor();
        data.datasets[0].pointBackgroundColor[index] = currentChartTheme.page3.target;
        data.datasets[1].pointBackgroundColor[index] = currentChartTheme.page3.min;
        data.datasets[2].pointBackgroundColor[index] = currentChartTheme.page3.current;
        obj.update();
    }

    /**
     *
     * @param data
     */

    $scope.commentChartClick = function (data) {
        var activePoints = data.data;
        if (activePoints.length > 0) {
            commentsGraphClickedIndex = 0;
            var data_index = activePoints[0]._index;
            var data_index = activePoints[0]._index;
            $scope.selectedGraphRecord = $scope.portalLastTwelveMetricGroupRecords[data_index];
            $scope.selectedDate=$scope.selectedGraphRecord.displayDate;
            console.log($scope.selectedGraphRecord.factKey);
            $scope.wsTempParamObj.fileslaFactKey=$scope.selectedGraphRecord.factKey;
            $scope.selectedChartPointIndex = data_index;
            dashboardDataProcessFactory.processCommentsData($scope, $scope.portalLastTwelveMetricGroupRecords[data_index].comments);
            if (!$scope.$$phase) {
                $scope.$digest();
            }
            onClickChangeBackgroundColor($scope.lineChartCommentData, lineCommentObj, $scope.selectedChartPointIndex);
        }

    }
    $scope.onAddComment = function (event) {
        $('#comment_text').val($.trim($('#comment_text').val()));
        if ($("#comment_text").val().length > 0) {
            if ($scope.isClickedonEdit) {
                console.log($scope.commentArea.comment);
                $scope.postCommentObj.factkey = $scope.selectedGraphRecord.factKey;
                $scope.postCommentObj.commenttxt = $scope.commentArea.comment;
                $scope.postCommentObj.userKey = $scope.loggedUserKey;
                $scope.postCommentObj.commentKey = $scope.selectedComment.commentKey;
                console.log($scope.postCommentObj);
                $scope.updateComment($scope.wsTempParamObj, $scope.postCommentObj);
            } else {
                $scope.postCommentObj.factkey = $scope.selectedGraphRecord.factKey;
                $scope.postCommentObj.commentAPITokenKey = $scope.currentClientCofig.commentAPITokenKey;
                $scope.postCommentObj.commenttxt = utilityService.handleSingleQuote($scope.commentArea.comment);
                $scope.postCommentObj.userName = $scope.userName;
                $scope.postComment($scope.wsTempParamObj, $scope.postCommentObj);
            }

        } else {
            $("#comment_text").attr("placeholder", "Enter the comments first ...");
        }

    }
    // post comment API for posting comment
    $scope.postComment = function (wsParamObj, commentObj) {
        // usSpinnerService.spin('spinner-1');
        var promise = portalservice.postComment(wsParamObj, $scope.currentClientCofig.deploymentEnv, commentObj);
        promise.success(function (response) {
            if (response.errorCode === 0) {
                $scope.isCommentAdded = true;
                $scope.wsTempParamObj.isCommentPosted = true;
                $scope.commentArea.comment = "";
                $scope.wsTempParamObj.fileslaFactKey = response.result[0].slaFactKey;
                $scope.wsTempParamObj.fileCommentKey = response.result[0].commentKey;
                $scope.uploadFile();
                if ($scope.selectedFileLength == 0 || $scope.selectedFileLength > 4) {
                    $scope.loadDrillDownGraph($scope.wsTempParamObj);

                    $scope.$watch(function (scope) {
                            console.log(scope.selectedSLACommentArr[0]);
                            return scope.selectedSLACommentArr
                        },
                        function (newValue, oldValue) {
                            $scope.selectedMetricRecord.commentCount = newValue.length;
                        }
                    );
                }

                // usSpinnerService.stop('spinner-1');
                $scope.isAjaxComplete = true;
                $scope.portalWebSeviceErrorMsg = false;
                $scope.isServiceFailed = false;

            }
            else {
                $scope.portalWebSeviceErrorMsg = true;//response.errorMsg;
                // usSpinnerService.stop('spinner-1');
                $scope.showErrorModal(response.errorMessage);
            }
        });
        promise.error(function (err) {
            // usSpinnerService.stop('spinner-1');
            $scope.isServiceFailed = true;
            $scope.showErrorModal(err);
        });
    }


    $scope.editComment = function (rec, index) {
        $scope.selectedComment = {};
        $scope.selectedComment = rec;
        $scope.isClickedonEdit = true;
        $scope.commentArea.comment = rec.commentContent;
        console.log($scope.selectedGraphRecord.factKey);
        console.log($scope.selectedComment);
    }

    $scope.updateComment = function (wsParamObj, commentObj) {
        var promise = portalservice.updateComment(wsParamObj, $scope.currentClientCofig.deploymentEnv, commentObj);
        promise.success(function (response) {
            if (response.errorCode === 0) {
                console.log(response.result);
                $scope.commentArea.comment = "";
                $scope.wsTempParamObj.fileslaFactKey = response.result[0].slaFactKey;
                $scope.wsTempParamObj.fileCommentKey = response.result[0].commentKey;
                $scope.uploadFile();
                if ($scope.selectedFileLength == 0 || $scope.selectedFileLength > 4) {
                    $scope.loadDrillDownGraph($scope.wsTempParamObj);

                    $scope.$watch(function (scope) {
                            console.log(scope.selectedSLACommentArr[0]);
                            return scope.selectedSLACommentArr
                        },
                        function (newValue, oldValue) {
                            $scope.selectedMetricRecord.commentCount = newValue.length;
                        }
                    );
                }
                $scope.isAjaxComplete = true;
                $scope.portalWebSeviceErrorMsg = false;
                $scope.isServiceFailed = false;
                $scope.showDeleteDialog = false;
                $scope.isClickedonEdit = false;
                $("#file1").val('');
                // usSpinnerService.stop('spinner-1');
            }
            else {
                $scope.portalWebSeviceErrorMsg = true;//response.errorMsg;
                $scope.showErrorModal(response.errorMessage);
                $scope.isClickedonEdit = false;
            }
        });
        promise.error(function (err) {
            // usSpinnerService.stop('spinner-1');
            $scope.isServiceFailed = true;
            $scope.isClickedonEdit = false;
            $scope.showErrorModal(err);
        });
    }

    $scope.deleteComment = function (rec, index) {
        $scope.showCommentDeleteDialog = true;
        $scope.postCommentObj = {};
        $scope.postCommentObj.userKey = $scope.loggedUserKey;
        $scope.postCommentObj.commentKey = rec.commentKey;
    }

    $scope.confirmDeleteComment = function () {
        var promise = portalservice.deleteComment($scope.wsTempParamObj, $scope.currentClientCofig.deploymentEnv, $scope.postCommentObj);
        promise.success(function (response) {
            if (response.errorCode === 0) {
                console.log(response);
                $scope.loadDrillDownGraph($scope.wsTempParamObj);
                $scope.$watch(function (scope) {
                        return scope.selectedSLACommentArr;
                    },
                    function (newValue, oldValue) {
                        $scope.selectedMetricRecord.commentCount = newValue.length;
                    }
                );
                $scope.isAjaxComplete = true;
                $scope.portalWebSeviceErrorMsg = false;
                $scope.isServiceFailed = false;
                $scope.showCommentDeleteDialog = false;
                // usSpinnerService.stop('spinner-1');
            }
            else {
                $scope.portalWebSeviceErrorMsg = true;//response.errorMsg;
                // usSpinnerService.stop('spinner-1');
                $scope.showErrorModal(response.errorMessage);
            }
        });
        promise.error(function (err) {
            // usSpinnerService.stop('spinner-1');
            $scope.isServiceFailed = true;
            $scope.showErrorModal(err);
        });
    }
    $scope.showAddComments = function () {
        $scope.isViewCommentsVisible = false;
        FlickityService.select($scope.flickityIdCommentsWrapper, 0);
    }
    $scope.viewComments = function () {
        $scope.isViewCommentsVisible = true;
        FlickityService.select($scope.flickityIdCommentsWrapper, 1);
    }
    $scope.showErrorModal = function (msg) {
        $scope.showDialog = true;
        $scope.errorMessage = msg;
    }
    //New aggregation types count,weighted call
    $scope.changeAggregationsType = function (type) {
        $scope.aggregationsMetricMasterArr = [];
        $scope.isStatusChanged = true;
        /*$scope.processValue=$scope.headerLabel+" "+DASH_ALL_LBL;*/
        $scope.weightedAverageOptionIndex = this.$index;
        $scope.selectedAggregationsType = this.rec;
        $scope.wsTempParamObj.aggregationType = $scope.selectedAggregationsType;
        if (!$scope.isPage2Visible) {
            $scope.getAggregationsData($scope.wsTempParamObj);
            $scope.getFullHierarchy($scope.wsTempParamObj);
        } else {
            $scope.getDrillThroughMetricData($scope.wsTempParamObj);
        }
    };
    // toggle theme
    $scope.changeTheme = function (theme) {

        if (theme == "theme1" && $scope.selectedTheme != theme) {
            updateChartThemeValues(chartColorPalette.theme1);
            $('link[href="view/style/css/style.css"]').attr({href: "view/style/css/style_light.css"});
            $scope.selectedTheme = theme;
        }
        else if (theme == "theme2" && $scope.selectedTheme != theme) {
            updateChartThemeValues(chartColorPalette.theme2);
            $('link[href="view/style/css/style_light.css"]').attr({href: "view/style/css/style.css"});
            $scope.selectedTheme = theme;
        }

    }

    //New Design changes starts here
    $scope.doughnutChartBottomOption = {
        responsive: false,
        maintainAspectRatio: false,
        tooltips: {
            enabled: false,
        },

        legend: {
            display: false
        },
        title: {
            display: false,
            text: ''
        },
        animation: {
            onProgress: function (obj) {
                if ($scope.isDonutValueGSet) {
                    $('.donutValG').each(function () {
                        $(this).prop('Counter', 0).animate({
                            Counter: $(this).text()
                        }, {
                            duration: 1000,
                            easing: 'swing',
                            step: function (now) {
                                $(this).text(Math.ceil(now));
                            }
                        });
                    });
                    $('.donutValY').each(function () {
                        $(this).prop('Counter', 0).animate({
                            Counter: $(this).text()
                        }, {
                            duration: 1000,
                            easing: 'swing',
                            step: function (now) {
                                $(this).text(Math.ceil(now));
                            }
                        });
                    });
                    $('.donutValR').each(function () {
                        $(this).prop('Counter', 0).animate({
                            Counter: $(this).text()
                        }, {
                            duration: 1000,
                            easing: 'swing',
                            step: function (now) {
                                $(this).text(Math.ceil(now));
                            }
                        });
                    });
                    $scope.isDonutValueGSet = false;
                }


            },
            easing: "easeOutBounce",
            animateScale: true,
            animateRotate: true


        },
        cutoutPercentage: 90
    };
    $scope.doughnutChartBottomDataG = {
        datasets: [{
            data: [20, 20],
            borderWidth: 0,
            backgroundColor: ["#008A52", "#d9d9d0"],
            hoverBackgroundColor: [],

        }],
        labels: [
            "Below Minimum: ",
            "Over Target: "
        ],

    };
    $scope.doughnutChartBottomDataY = {
        datasets: [{
            data: [20, 20],
            borderWidth: 0,
            backgroundColor: ["pink", "purple"],
            hoverBackgroundColor: [],
        }],
        labels: [
            "Below Minimum: ",
            "Over Target: "
        ],

    };
    $scope.doughnutChartBottomDataR = {
        datasets: [{
            data: [20, 20],
            borderWidth: 0,
            backgroundColor: ["#D9182D", "#d9d9d0"],
            hoverBackgroundColor: [],

        }],
        labels: [
            "Below Minimum: ",
            "Over Target: "
        ],

    };
    $scope.getChartObjDoughnutBottomG = function (obj) {
        doughnutChartObjG = obj.chart;
    };
    $scope.getChartObjDoughnutBottomY = function (obj) {
        doughnutChartObjY = obj.chart;
    };
    $scope.getChartObjDoughnutBottomR = function (obj) {
        doughnutChartObjR = obj.chart;
    };
//click will create the layout of breadcrumb
    $scope.onClickBreadCrumb = function (obj, $event, index) {
        $scope.aggregationsMetricMasterArr = [];
        $scope.multiSelectDropDownIndex = index;
        console.log($scope.multiSelectDropDownIndex);
        $scope.isCardViewVisible = false;
        var index = parseInt(obj.id) + 1;
        $scope.drillDownHierarchyArr.splice(index, $scope.drillDownHierarchyArr.length - 1);
        //console.log(obj.level);
        if (isSupportedAPIVersion(supported2xVersion, $scope.wsTempParamObj.apiversion) || isSupportedAPIVersion(supported3xVersion, $scope.wsTempParamObj.apiversion)) {
            if ($scope.getDrillDownPath($scope.drillDownHierarchyArr).charAt($scope.getDrillDownPath($scope.drillDownHierarchyArr).length - 1) == '|' && obj.level != "H0") {
                //console.log($scope.getDrillDownPath($scope.drillDownHierarchyArr).substr(0, $scope.getDrillDownPath($scope.drillDownHierarchyArr).length - 1))
                $scope.wsTempParamObj.hierarchyPath = $scope.getDrillDownPath($scope.drillDownHierarchyArr).substr(0, $scope.getDrillDownPath($scope.drillDownHierarchyArr).length - 1)
            } else {
                $scope.wsTempParamObj.hierarchyPath = obj.level + ":" + obj.label;
            }
        } else {
            $scope.wsTempParamObj.hierarchyPath = obj.level + ":" + obj.label;
        }
        $scope.level = obj.level;

        var tempIndex = obj.level.substring(1, 2);
        if ($scope.drillDownLabelArr.length > 0) {
            if ($scope.drillDownLabelArr[parseInt(tempIndex) + 1] != undefined && $scope.drillDownLabelArr[parseInt(tempIndex) + 1] != "" || $scope.drillDownLabelArr[parseInt(tempIndex) + 1] != null) {
                $scope.optionLabel = $scope.drillDownLabelArr[parseInt(tempIndex) + 1];
            } else {
                $scope.optionLabel = DASH_DRILL_DOWN_LBL;
            }
        }
        $scope.selectedDrillDownOption = {};
        $scope.initAggregationData();
        $scope.selectedOptionArr = [];
        $scope.drillDownOptionSelectedIndex = -1;
        if ($scope.level == "H0") {
            $scope.searchMetricsArr = [];
            $scope.isCardViewVisible = false;
            $scope.isStatusChanged = false;
            $scope.portalProcessSelectedIndex = 0;
            $scope.wsTempParamObj.breakDownFilter = "A";
            ///$scope.portalMonthSelectedIndex = 0;
            if ($scope.isPage2Visible || $scope.isCommentsVisible) {
                $scope.isPage2Visible = false;
                $scope.isCommentsVisible = false;
                FlickityService.select($scope.flickityId_main, 0);
            }
        }
        $scope.getAggregationsData($scope.wsTempParamObj);
        $scope.getFullHierarchy($scope.wsTempParamObj);
        if ($scope.level != "H0" && $scope.isPage2Visible) {
            $scope.getAggregationsData($scope.wsTempParamObj);
            $scope.getDrillThroughMetricData($scope.wsTempParamObj);
        }
        $event.preventDefault();
    }


    $scope.showDoughnut = false;
    $scope.openDoughnutModal = function (modalId) {
        $scope.getBreakdownSummaryData($scope.wsTempParamObj)
        $scope.showDoughnut = true;
    }

    $scope.openRawDataModal = function () {
        // $scope.getBreakdownSummaryData($scope.wsTempParamObj)
        $scope.showRawData = true;
    }



    //show the tree-map
    $scope.getFullHierarchy = function (wsTempParamObj) {
        $scope.treeMapArrayData = [];
        portalservice.getFullHierarchy(wsTempParamObj, $scope.currentClientCofig.deploymentEnv).success(function (response) {
            if (response.errorCode === 0) {
                $scope.treeMapArrayData = response.result;
                dashboardDataProcessFactory.processTreeMapData($scope, $scope.treeMapArrayData);
                $scope.portalWebSeviceErrorMsg = false;
                $scope.isServiceFailed = false;
            }
            else {
                $scope.portalWebSeviceErrorMsg = true;//response.errorMsg;
                // usSpinnerService.stop('spinner-1');
                $scope.showErrorModal(response.errorMessage);
            }
        }).error(function (err) {
            // usSpinnerService.stop('spinner-1');
            $scope.isServiceFailed = true;
            $scope.showErrorModal(err);
        });
    }

    /**
     * Formatting the bar percentage height
     * @param data
     * @param type
     * @param rec
     * @param subType
     * @return {string}
     */
    $scope.formatMetricData = function (data, type, rec, subType) {
        ////console.log(data+" "+maxNumber);
        switch (type.toLowerCase()) {
            case "percentage":
                return data != null ? 'height: ' + data : "height:0%";
            case "dollar":
                var maxValue = utilityService.findMaxNumber(rec.min, rec.target, rec.actual, type);
                var calValPercentageVal = utilityService.percentageOfBarGraph(rec, maxValue, subType)
                return data != null ? 'height: ' + calValPercentageVal + '%' : "height:0%";
            case "count":

                var maxValue = utilityService.findMaxNumber(rec.min, rec.target, rec.actual, type);
                var calValPercentageVal = utilityService.percentageOfBarGraph(rec, maxValue, subType)
                return data != null ? 'height: ' + calValPercentageVal + '%' : "height:0%";


            case "days":
                var maxValue = utilityService.findMaxNumber(rec.min, rec.target, rec.actual, type);
                var calValPercentageVal = utilityService.percentageOfBarGraph(rec, maxValue, subType)
                return data != null ? 'height: ' + calValPercentageVal + '%' : "height:0%";

        }
    }


    $scope.openModalWindow = function (modalId) {
        $scope.pageIdArr[0]=3;
        $scope.pageIdArr[1]=1;
        $scope.getHierarchyCommentListData($scope.wsTempParamObj);
        $scope.showTable = true;
    }

    $scope.convertToMonthYearFormat = function (rec) {
        var year = String(rec.interval).substring(0, String(rec.interval).length - 2);
        var month = String(rec.interval).substring(String(rec.interval).length - 2, String(rec.interval).length);
        var timestamp = utilityService.convertToTimeStamp(parseInt(year), parseInt(month), 15, 16, 0, 0);
        return utilityService.convertToYearMonthFormat(timestamp);
    }

    $scope.convertToFileObj = function (attachmentKey, fileName, attachmentUserKey, attachmentUserName, obj) {
        var tempArr = [];
        var attachmentKeyArr = [];
        var fileNameArr = [];
        var attachmentUserKeys = [];
        var attachmentUserNames = [];
        if (attachmentKey != null && attachmentKey != "" && fileName != null && fileName != "" &&
            attachmentUserKey != null && attachmentUserKey != "" && attachmentUserName != null && attachmentUserName != "") {
            attachmentKeyArr = attachmentKey.split('|');
            fileNameArr = fileName.split('|');
            attachmentUserKeys = attachmentUserKey.split('|');
            attachmentUserNames = attachmentUserName.split('!')
            for (var i = 0; i < attachmentKeyArr.length; i++) {
                tempArr[i] = {
                    attachmentkey: attachmentKeyArr[i],
                    attachmentUserKey: attachmentUserKeys[i],
                    attachmentUserName: attachmentUserNames[i],
                    fileName: fileNameArr[i],
                    slaFactKey: obj.factKey,
                    commentKey: obj.commentKey,
                    commentUserKey: obj.commentUserKey,
                    commentUserName: obj.commentUserName,
                    isloggedUser: $scope.loggedUserKey == attachmentUserKeys[i] ? true : false
                }
            }
        }
        return tempArr;
    }
    $scope.formdata = null;
    $scope.filesObj=[];
    $scope.selectedFileLength = 0;
    // get the selected file from file dialog box
    $scope.getTheFiles = function (files) {
        console.log(files);
        $scope.filesObj=files;
        $scope.selectedFileLength = $scope.filesObj.length;
        if (files.length > 3) {
            return;
        }

    };
    $scope.uploadFile = function () {
        $scope.formdata = new FormData();
        angular.forEach($scope.filesObj, function (value, key) {
            console.log(value + " " + key);
            $scope.formdata.append("file", value)
        });
        if ($scope.selectedFileLength < 4 && $scope.selectedFileLength > 0) {
            $scope.formdata.append("clientName", $scope.wsTempParamObj.clientName);
            $scope.formdata.append("slaFactKey", $scope.wsTempParamObj.fileslaFactKey);
            $scope.formdata.append("commentKey", $scope.wsTempParamObj.fileCommentKey);
            $scope.wsTempParamObj.formData = $scope.formdata;
            console.log($scope.wsTempParamObj.formData);
            if ($scope.wsTempParamObj.formData instanceof FormData) {
                portalservice.uploadFile($scope.wsTempParamObj, $scope.currentClientCofig.deploymentEnv).success(function (response) {
                    console.log(response)
                    if (response) {
                        $scope.loadDrillDownGraph($scope.wsTempParamObj);
                        $scope.$watch(function (scope) {
                                return scope.selectedSLACommentArr;
                            },
                            function (newValue, oldValue) {
                                $scope.selectedMetricRecord.commentCount = newValue.length;
                            }
                        );
                    } else {
                        $scope.portalWebSeviceErrorMsg = true;//response.errorMsg;
                        // usSpinnerService.stop('spinner-1');
                        // $scope.showErrorMessageDialog(response.errorMessage);
                    }
                }).error(function (err) {
                    $scope.isServiceFailed = true;
                    $scope.showErrorMessageDialog(err);
                })
                $("#file1").val('');
            } else {
                console.log("select the file to upload it!")
            }
        } else if ($scope.selectedFileLength == 0) {
            ///$scope.showAttachmentDialog = true;
        } else {
            $scope.showAttachmentDialog = true;
        }

    }

    ///download the attachment/file
    $scope.downloadFile = function (rec) {
        console.log(rec);
        $scope.wsTempParamObj.fileCommentKey = rec.commentKey;
        $scope.wsTempParamObj.fileAttachmentKey = rec.attachmentkey;
        if($scope.selectedGraphRecord!=null){
            $scope.wsTempParamObj.fileslaFactKey = $scope.selectedGraphRecord.factKey;
        }else{
            $scope.wsTempParamObj.fileslaFactKey = rec.slaFactKey;
        }
        var promise = portalservice.getDownloadFile($scope.wsTempParamObj, $scope.currentClientCofig.deploymentEnv);
        promise.success(function (response,status,headers) {
            headers=headers();
            console.log(status);
            console.log(headers);
            var mimetype = headers['x-mimetype'];
            console.log(mimetype);
            if (response) {
                console.log(response);
                var linkElement = document.createElement('a');
                try {
                    var blob = new Blob([response], { type: mimetype });
                    var url = window.URL.createObjectURL(blob);

                    linkElement.setAttribute('href', url);
                    linkElement.setAttribute("download", rec.fileName);

                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    linkElement.dispatchEvent(clickEvent);
                } catch (ex) {
                    console.log(ex);
                }
            }else {
                $scope.portalWebSeviceErrorMsg = true;//response.errorMsg;
                $scope.showErrorModal(response.errorMessage);
            }
        });
        promise.error(function (err) {
            $scope.isServiceFailed = true;
            $scope.showErrorModal(err);
        });
    }

    /// delete the file attachment
    $scope.deleteFile = function (rec) {
        console.log(rec);
        $scope.selectedFileRecord = rec;
        $scope.showDeleteDialog = true;
        $scope.wsTempParamObj.fileCommentKey = rec.commentKey;
        $scope.wsTempParamObj.fileAttachmentKey = rec.attachmentkey;
        $scope.wsTempParamObj.fileslaFactKey = rec.slaFactKey != undefined ? rec.slaFactKey : $scope.selectedMetricRecord.factKey;
    }

    // confirm delete modal window
    $scope.onConfirmDelete = function () {
        portalservice.deleteFile($scope.wsTempParamObj, $scope.currentClientCofig.deploymentEnv).success(function (response) {
            console.log(response)
            if (response) {
                console.log(response);
                ///$scope.selectedSLACommentArr=[];
                $scope.getHierarchyCommentListData($scope.wsTempParamObj);
                $scope.loadDrillDownGraph($scope.wsTempParamObj);
                $scope.$watch(function (scope) {
                        return scope.selectedSLACommentArr
                    },
                    function (newValue, oldValue) {
                        $scope.selectedMetricRecord.commentCount = newValue.length;
                    }
                );
            } else {
                $scope.portalWebSeviceErrorMsg = true;//response.errorMsg;
                // usSpinnerService.stop('spinner-1');
                // $scope.showErrorMessageDialog(response.errorMessage);
            }
        }).error(function (err) {
            usSpinnerService.stop('spinner-1');
            $scope.isServiceFailed = true;
            $scope.showErrorMessageDialog(err);
        })
    }


    $scope.calculatePerc = function (calValPercentageVal) {
        return calValPercentageVal != null ? 'width: ' + calValPercentageVal + '%' : "width:0%";
    }

    $scope.getBreakdownSummaryData = function (wsParamObj) {
        // usSpinnerService.spin('spinner-1');
        var promise = portalservice.getBreakdownSummaryData(wsParamObj, $scope.currentClientCofig.deploymentEnv);
        promise.success(function (response) {
            if (response.errorCode === 0) {
                $scope.breakdownSummaryList = [];
                ///$scope.breakdownSummaryList = response.result.breakdownSummaryList;

                dashboardDataProcessFactory.processBreakdownSummaryData($scope, response.result.geoDrillCountData)
                $scope.isAjaxComplete = true;
                $scope.portalWebSeviceErrorMsg = false;
                $scope.isServiceFailed = false;
                $scope.showDeleteDialog = false;
                // usSpinnerService.stop('spinner-1');
            }
            else {
                $scope.portalWebSeviceErrorMsg = true;//response.errorMsg;
                // usSpinnerService.stop('spinner-1');
                $scope.showErrorModal(response.errorMessage);
            }
        });
        promise.error(function (err) {
            // usSpinnerService.stop('spinner-1');
            $scope.isServiceFailed = true;
            $scope.showErrorModal(err);
        });
    }

    $scope.addSendCommentToggle = function () {
        alert('lala');
    }

    $scope.changeAggregationsStatus = function () {
        $scope.aggregationsMetricMasterArr = [];
        //$scope.portalMonthSelectedIndex = 0;
        $scope.monthValue = PERIOD_LBL + ' ' + DASH_ALL_LBL;
        $scope.portalStatusSelectedIndex = this.$index;
        $scope.portalStatusLabel = this.rec.label;
        $scope.portalStatusValue = this.rec.value;
        $scope.isStatusChanged = true;
        $scope.filterProcess($scope.processValue, $scope.portalStatusValue);
    };

    /**
     * @param processName
     * @param status
     * @returns filtered drill-through metrics array bases on selection of drop-down
     * like status, process
     */
    $scope.portalStatusValue = "All"
    $scope.filterProcess = function (processName, status) {
        $scope.aggregationsMetricMasterArr = [];
        $scope.currentPage_portal = 0;
        for (var i = 0; i < $scope.aggregationsMetricMasterArrClone.length; i++) {

            if (processName.toLowerCase() == $scope.aggregationsMetricMasterArrClone[i].processName.toLowerCase() && processName.toLowerCase() != $scope.headerLabel.toLowerCase() + ' all') {
                if (status != null || status != undefined) {
                    if (status.toLowerCase() == $scope.aggregationsMetricMasterArrClone[i].status.toLowerCase() && status.toLowerCase() != $scope.aggregationsStatusArr[0].value.toLowerCase()) {
                        $scope.aggregationsMetricMasterArr.push($scope.aggregationsMetricMasterArrClone[i]);
                    } else if (status.toLowerCase() == $scope.aggregationsStatusArr[0].value.toLowerCase()) {
                        $scope.aggregationsMetricMasterArr.push($scope.aggregationsMetricMasterArrClone[i]);
                    }
                } else {
                    $scope.aggregationsMetricMasterArr.push($scope.aggregationsMetricMasterArrClone[i]);
                }
            }

        }
        if (processName.toLowerCase() == $scope.headerLabel.toLowerCase() + " " + DASH_ALL_LBL.toLowerCase()) {
            if (status != null || status != undefined) {
                for (var i = 0; i < $scope.aggregationsMetricMasterArrClone.length; i++) {
                    if (status.toLowerCase() == $scope.aggregationsMetricMasterArrClone[i].status.toLowerCase() && status.toLowerCase() != $scope.aggregationsStatusArr[0].value.toLowerCase()) {
                        $scope.aggregationsMetricMasterArr.push($scope.aggregationsMetricMasterArrClone[i]);
                    } else if (status.toLowerCase() == $scope.aggregationsStatusArr[0].value.toLowerCase()) {
                        $scope.aggregationsMetricMasterArr.push($scope.aggregationsMetricMasterArrClone[i]);
                    }

                }
            } else {
                $scope.aggregationsMetricMasterArr = $scope.aggregationsMetricMasterArrClone;
            }
        }
        $scope.drillThroughPageArr = $scope.aggregationsMetricMasterArr;
    }

    //check the loggedUser
    $scope.isLoggedUser = function (record) {
        return $scope.loggedUserKey == record.commentUserKey ? true : false;
    }

    //export to CSV
    $scope.exportToCSV = function () {
       /* var serviceURL = constructFileAPIURI($scope.currentClientCofig.deploymentEnv) + $scope.currentClientCofig.deploymentEnv.DBD_EXTRAPARAM_EXPORT_CSV + "clientName=" + cleanURL($scope.currentClientCofig.deploymentEnv, $scope.wsTempParamObj.clientName) + "&hierarchyPath=" + cleanURL($scope.currentClientCofig.deploymentEnv, $scope.wsTempParamObj.hierarchyPath) + "&status=" + cleanURL($scope.currentClientCofig.deploymentEnv, $scope.wsTempParamObj.status) + "&dataType=" + cleanURL($scope.currentClientCofig.deploymentEnv, $scope.wsTempParamObj.dataType) + "&aggregationType=" + cleanURL($scope.currentClientCofig.deploymentEnv, $scope.wsTempParamObj.aggregationType) + "&breakDownFilter=" + cleanURL($scope.currentClientCofig.deploymentEnv, $scope.wsTempParamObj.breakDownFilter);
        console.log(serviceURL);
        $window.open(serviceURL, '_self');*/
        var promise = portalservice.exportTOCSV($scope.wsTempParamObj, $scope.currentClientCofig.deploymentEnv);
        ////console.log(promise.$$state.status);
        promise.success(function (response,status,headers) {
            headers=headers();
            console.log(status);
            console.log(headers);
            var contentType = headers['x-filename'];
            console.log(contentType);
            if (response) {
                console.log(response);
                var linkElement = document.createElement('a');
                try {
                    var blob = new Blob([response], { type: "text/csv" });
                    var url = window.URL.createObjectURL(blob);

                    linkElement.setAttribute('href', url);
                    linkElement.setAttribute("download", contentType);

                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    linkElement.dispatchEvent(clickEvent);
                } catch (ex) {
                    console.log(ex);
                }
            }else {
                $scope.portalWebSeviceErrorMsg = true;//response.errorMsg;
                $scope.showErrorModal(response.errorMessage);
            }
        });
        promise.error(function (err,status) {
            // usSpinnerService.stop('spinner-1');
            /*$scope.navigateNextPage();*/
            console.log("Unable to download the file due invalid token provided!");
            $scope.isServiceFailed = true;
            $scope.showErrorModal(err);
        });



    }
    // Code for Search Field starts here

    $scope.search = openSearchMatrixModal;
    $scope.keyPressed = function (e) {
        //e.which gives which key is pressed, for enter key, it gives 13 number
        if (e && e.which === 13) {
            //Call search function if Enter key is pressed.
            openSearchMatrixModal();
            $('.search-query').val("");

            $scope.$watch(function (scope) {
                    return scope.filteredItems
                },
                function (newValue, oldValue) {
                    $scope.filteredItems = newValue;
                    console.log($scope.filteredItems);
                    if ($scope.filteredItems.length > 0) {
                        $scope.drillThroughPageArr = $scope.filteredItems;
                    } else {
                        $scope.drillThroughPageArr = $scope.searchMetricsArr;
                    }

                }
            );


        }
    }

    function openSearchMatrixModal() {
        $scope.pageIdArr[0]=4;
        $scope.pageIdArr[1]=1;
        $scope.showSearchModal = true;
        if ($scope.searchMetricsArr.length == 0) {
            $scope.getSearchedMetricsResultData($scope.wsTempParamObj);
        }

    }

    // Code for Search Field ends here

    $scope.getSearchedMetricsResultData = function (wsParamObj) {
        $scope.wsTempParamObj.dateRange = $scope.selectedAggregationRecord.interval;
        $scope.wsTempParamObj.status = "A";
        var promise = portalservice.getDrillThroughMetricData(wsParamObj, $scope.currentClientCofig.deploymentEnv);
        promise.success(function (response) {
            if (response.errorCode === 0) {
                $scope.searchMetricsArr = response.result;
                dashboardDataProcessFactory.processSearchMetricData($scope, $scope.searchMetricsArr);
                dashboardDataProcessFactory.processPathData($scope, $scope.searchMetricsArr);
                $scope.isAjaxComplete = true;
                $scope.portalWebSeviceErrorMsg = false;
                $scope.isServiceFailed = false;
                console.log($scope.searchMetricsArr)
            }

            else {
                $scope.portalWebSeviceErrorMsg = true;//response.errorMsg;
                // usSpinnerService.stop('spinner-1');
                $scope.navigateNextPage();
                $scope.showErrorModal(response.errorMessage);
            }
        });
        promise.error(function (err) {
            // usSpinnerService.stop('spinner-1');
            /*$scope.navigateNextPage();*/
            $scope.isServiceFailed = true;
            $scope.showErrorModal(err);
        });
    }


    //start next & previous
    $scope.onClickNext = function () {
        console.log($scope.drillThroughPageArr.length);
        if ($scope.currentPageCount < $scope.drillThroughPageArr.length - 1) {
            $scope.currentPageCount++;
            $scope.loadCommentGraphPage($scope.drillThroughPageArr[$scope.currentPageCount]);
        }

    }

    $scope.onClickPrevious = function () {
        if ($scope.currentPageCount >= 1) {
            $scope.currentPageCount--;
            $scope.loadCommentGraphPage($scope.drillThroughPageArr[$scope.currentPageCount]);
        }
    }

    //end start next & previous


    $scope.onClickView = function (rec, index) {
        $scope.showNavigation=false;
        $scope.selectedMetricRecord = {};
        $scope.selectedMetricRecord = rec;
        $scope.selectedDate=$scope.convertToMonthYearFormat(rec.interval);
        console.log($scope.selectedDate);
        $scope.currentPageCount = index;
        $scope.wsTempParamObj.slaFactKey = $scope.selectedMetricRecord.factKey;
        ///$scope.wsTempParamObj.clientName = "pepsico"
        $scope.wsTempParamObj.clientCountry = $scope.selectedMetricRecord.clientCountry;
        $scope.wsTempParamObj.clientGeo = $scope.selectedMetricRecord.clientGeo;
        $scope.wsTempParamObj.isCommentPosted = false;
        $scope.isCommentAdded = false;
        commentsGraphClickedIndex = 2;
        $scope.selectedChartPointIndex = 0;
        $scope.loadDrillDownGraph($scope.wsTempParamObj);
        $scope.showSearchModal = false;
        $scope.showTable = false;
    }


    $scope.onClickSearchView = function (rec, index) {
        $scope.showNavigation=true;
        $scope.selectedMetricRecord = {};
        $scope.selectedMetricRecord = rec;
        $scope.selectedDate=$scope.aggregationsSelectedDate;
        console.log($scope.selectedDate);
        $scope.currentPageCount = index;
        $scope.wsTempParamObj.slaFactKey = $scope.selectedMetricRecord.factKey;
        ///$scope.wsTempParamObj.clientName = "pepsico"
        $scope.wsTempParamObj.clientCountry = $scope.selectedMetricRecord.clientCountry;
        $scope.wsTempParamObj.clientGeo = $scope.selectedMetricRecord.clientGeo;
        $scope.wsTempParamObj.isCommentPosted = false;
        $scope.isCommentAdded = false;
        commentsGraphClickedIndex = 2;
        $scope.selectedChartPointIndex = 0;
        $scope.loadDrillDownGraph($scope.wsTempParamObj);
        $scope.showSearchModal = false;
        $scope.showTable = false;
    }

    ///auto focus on search box
    $scope.showAutoFocus = function () {
        if (!$(this).is(':checked')) {
            setTimeout(function(){
                $("#showFocus").focus();
            }, 500);


        }
    }

    //disabling/enabling the pre/next button on graph page
    $scope.disablePrevious=function(){
        if($scope.currentPageCount==0){
            return {'navigation-disabled': true};
        }else{
            return {'navigation-disabled': false};
        }
    }

    $scope.disableNext=function(){
        if($scope.currentPageCount==$scope.drillThroughPageArr.length-1){
            return {'navigation-disabled': true};
        }else{
            return {'navigation-disabled': false};
        }
    }

    $scope.croppedUsername=function(username){
        return username.substring(0,2);
        
    }
    $scope.selectedChartType="trended";
    $scope.onClickChartType=function(type){
        $('.button-trended').removeClass("clicked");
        $('.button-percentage').removeClass("clicked"); 
        $scope.selectedChartType=type;
        if($scope.selectedChartType=="trended"){
            $('.button-trended').addClass("clicked"); 

            dashboardDataProcessFactory.processAggregationsGraphData($scope,$scope.aggregationsTrendedBarGraphData)
        }else if($scope.selectedChartType=="percentage"){
            $('.button-percentage').addClass("clicked");
            dashboardDataProcessFactory.processAggregationsPercentageGraphData($scope,dashboardDataProcessFactory.processGraphData($scope,$scope.aggregationsSpecialStackedGraphData));
            console.log(dashboardDataProcessFactory.processGraphData($scope,$scope.aggregationsSpecialStackedGraphData))
        }

    }

});
location_macro.filter("as", function ($parse) {
    return function (value, path) {
        return $parse(path).assign(this, value);
    };
});
