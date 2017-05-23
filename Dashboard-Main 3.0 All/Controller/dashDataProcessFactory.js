/**
 * Created by vaibhav_parkhi on 7/12/2016.
 */
location_macro.factory("dashboardDataProcessFactory", function (utilityService, $location, $q, $rootScope) {
    var dashboardDataProcessFactory = {};
    /*
     process configuration

     */
    dashboardDataProcessFactory.processConfigData = function ($scope, configArr) {
        $scope.loggedUserKey = configArr.userkey;
        $scope.wsTempParamObj.apiKey = configArr.token;
        console.log($scope.loggedUserKey)
        var deferred = $q.defer();
        for (var i = 0; i < configArr.config1.length; i++) {

            if (configArr.config1[i].H0_LABEL != undefined) {
                $scope.currentClientCofig.drillDownHierarchyLabel = configArr.config1[i].H0_LABEL;
            }
            if (configArr.config1[i].DESKTOPAPIVERSION != undefined) {
                $scope.wsTempParamObj.apiversion = configArr.config1[i].DESKTOPAPIVERSION;

            }
            if (configArr.config1[i].CLIENT_NAME != undefined) {
                $scope.currentClientCofig.clientStyleClass = configArr.config1[i].CLIENT_NAME.toLowerCase();
            }
            if (configArr.config1[i].PREDICTIVEON != undefined) {
                $scope.isPredictiveOn = configArr.config1[i].PREDICTIVEON;
            }

            if (configArr.config1[i].MIN_LABEL != undefined) {
                $scope.minLabel = configArr.config1[i].MIN_LABEL
            }

            if (configArr.config1[i].RESULT_LABEL != undefined) {
                $scope.resultLabel = configArr.config1[i].RESULT_LABEL
            }

            if (configArr.config1[i].TARGET_LABEL != undefined) {
                $scope.targetLabel = configArr.config1[i].TARGET_LABEL
            }


            if (configArr.config1[i].WEIGHTEDAVERAGEON != undefined) {
                $scope.isWeightedAverageOn = configArr.config1[i].WEIGHTEDAVERAGEON;
            }
            console.log($scope.isWeightedAverageOn)

            if (configArr.config1[i].AVAILABLEGRAPH != undefined) {
                //$scope.wsTempParamObj.avaliableGraphs = configArr.config1[i].AVAILABLEGRAPH.split(",");
                var tempArr = configArr.config1[i].AVAILABLEGRAPH.split(",");
                for (var j = 0; j < $scope.wsTempParamObj.avaliableGraphs.length; j++) {
                    for (var k = 0; k < tempArr.length; k++) {
                        if (j == parseInt(tempArr[k] - 1)) {
                            $scope.wsTempParamObj.avaliableGraphs[j] = true;
                        }
                    }

                }
            }


            if (configArr.config1[i].DEFAULTINGGRAPH != undefined) {
                $scope.wsTempParamObj.defaultGraph = configArr.config1[i].DEFAULTINGGRAPH;
            }

            if (configArr.config1[i].DRILLDOWNMAXDEPTH != undefined) {
                $scope.maxDrillDownDepth = configArr.config1[i].DRILLDOWNMAXDEPTH;
                console.log($scope.maxDrillDownDepth);
            }
        }
        for (var i = 0; i < configArr.config1.length; i++) {
            try {
                for (var j = 0; j <= $scope.maxDrillDownDepth; j++) {
                    if (configArr.config1[i]['H' + j + "_LABEL"] != undefined) {
                        $scope.drillDownLabelArr[j] = configArr.config1[i]['H' + j + "_LABEL"];
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        for (var i = 0; i < $scope.maxDrillDownDepth; i++) {
            $scope.aggregationsDrillOptionsArrMultilevelArr[i] = new Array();
        }

        if (isSupportedAPIVersion(supported2xVersion, $scope.wsTempParamObj.apiversion) || isSupportedAPIVersion(supported3xVersion, $scope.wsTempParamObj.apiversion)) {
            $scope.metricTypeArr = configArr.metricType;
            $scope.wsTempParamObj.dataType = $scope.metricTypeArr[0].metricType;
        }
        if (isSupportedAPIVersion(supported2xVersion, $scope.wsTempParamObj.apiversion) || isSupportedAPIVersion(supported3xVersion, $scope.wsTempParamObj.apiversion) || $scope.wsTempParamObj.apiversion == "1.0") {
            if (configArr.roleData != undefined && configArr.roleData.length > 0) {
                for (var i = 0; i < configArr.roleData.length; i++) {
                    if (configArr.roleData[i].roleID == 0) {
                        $scope.viewerRole = true;
                    } else if (configArr.roleData[i].roleID == 1) {
                        $scope.approverRole = true;
                    }
                }

                if (!$scope.approverRole && $scope.viewerRole) {
                    if ($location.path() == "/top_metrics_page_one" || $location.path() == "/top_metrics_page_two") {
                        $rootScope.$on('$locationChangeSuccess', function (next, current) {
                            deferred.resolve();
                        });
                    } else {
                        /*$location.path("/digital_dashboard");*/
                    }

                } else {
                    deferred.resolve();
                }


            } else {
                if (!$scope.approverRole) {
                    if ($location.path() == "/top_metrics_page_one" || $location.path() == "/top_metrics_page_two") {

                        $rootScope.$on('$locationChangeSuccess', function (next, current) {
                            deferred.resolve();
                        });
                    } else {
                        /*$location.path("/digital_dashboard");*/
                    }

                } else {
                    deferred.resolve();
                }
            }


        }
        if ($location.path() == "/digital_dashboard" || $location.path() == "/digital-dashboard" || $location.path() == "/approver") {
            if ($location.path() == "/approver") {
                $scope.wsTempParamObj.defaultGraph = 1;
            }
            $scope.initAggregationData();
            $scope.getAggregationsData($scope.wsTempParamObj);
        } else {
            $scope.initAggregationData();
            $scope.getAggregationsData($scope.wsTempParamObj);
            $scope.getFullHierarchy($scope.wsTempParamObj);
        }
    }

    dashboardDataProcessFactory.processGraphData = function ($scope, aggregationsGraphData) {
        var aggregationsDataArr = [];
        $scope._selectedChartDataIndex = 0;
        if (aggregationsGraphData != null) {
            if (aggregationsGraphData.length > 0) {
                for (i = 0; i < aggregationsGraphData.length; i++) {
                    if ($scope.selectedDrillDownOption.shortName != undefined) {
                        for (k = 0; k < aggregationsGraphData[i].data.length; k++) {
                            if ($scope.selectedDrillDownOption.optionLabel == aggregationsGraphData[i].data[k].label) {
                                ///$scope.portalMonthSelectedIndex=k;
                                $scope._selectedChartDataIndex = k;
                                break;
                            }
                        }
                    } else {
                        $scope._selectedChartDataIndex = aggregationsGraphData[i].data.length - 1
                    }
                    var year = String(aggregationsGraphData[i].interval).substring(0, String(aggregationsGraphData[i].interval).length - 2);
                    var month = String(aggregationsGraphData[i].interval).substring(String(aggregationsGraphData[i].interval).length - 2, String(aggregationsGraphData[i].interval).length);
                    var timestamp = utilityService.convertToTimeStamp(parseInt(year), parseInt(month), 15, 16, 0, 0);
                    aggregationsDataArr.push({
                        interval: aggregationsGraphData[i].interval,
                        G: aggregationsGraphData[i].data[$scope._selectedChartDataIndex].G,
                        R: aggregationsGraphData[i].data[$scope._selectedChartDataIndex].R,
                        Y: aggregationsGraphData[i].data[$scope._selectedChartDataIndex].Y
                    });
                    ///console.log(aggregationsDataArr);

                    for (j = 0; j < aggregationsGraphData[i].data.length; j++) {
                        if (aggregationsGraphData[$scope.portalMonthSelectedIndex].data[j] != undefined) {
                            $scope.aggregationsMonthsArr[j] = aggregationsGraphData[$scope.portalMonthSelectedIndex].data[j].label//utilityService.aggregationsGraphData[i].interval
                            $scope.aggregationsGreenValArr[j] = aggregationsGraphData[$scope.portalMonthSelectedIndex].data[j].G;
                            $scope.aggregationsRedValArr[j] = aggregationsGraphData[$scope.portalMonthSelectedIndex].data[j].R;
                            $scope.aggregationsYellowValArr[j] = aggregationsGraphData[$scope.portalMonthSelectedIndex].data[j].Y;
                        }

                    }
                }


            } else {
                ///$scope.showErrorMessageDialog(DASH_NO_DATA_FOUND_ERR_MESS);
            }
        } else {
            /// $scope.showErrorMessageDialog("Unable to found stacked graph data for hierarchy path " + $scope.wsTempParamObj);
        }
        return aggregationsDataArr;

    }


    /* process the Aggregations WS API*/
    dashboardDataProcessFactory.processAggregationsData = function ($scope, aggregationsData) {
        dashboardDataProcessFactory.procrsssAggegationData($scope, aggregationsData);
        $scope.aggregationsGraphData = {};
        $scope.aggregationsBarPerGraphData={};
        $scope.aggregationsBarPerGraphData = dashboardDataProcessFactory.processGraphData($scope, aggregationsData.drillStackedGraphData);
        $scope.aggregationsBarGraphData = aggregationsData.graph;
        dashboardDataProcessFactory.processAggregationsGraphData($scope, $scope.aggregationsBarGraphData);
        dashboardDataProcessFactory.processAggregationsPercentageGraphData($scope, $scope.aggregationsBarPerGraphData);

    }


    dashboardDataProcessFactory.processAggregationsGraphData = function ($scope, aggregationsData) {
        $scope.barChartOption = {
            responsive: false,
            scales: {
                xAxes: [
                    {
                        stacked: $scope.selectedChartType == "percentage" ? true : false,
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
                        stacked: $scope.selectedChartType == "percentage" ? true : false,
                        ticks: $scope.selectedChartType == "percentage" ? {
                            fontColor: "#26262F", // this here
                            suggestedMin: 0,
                            beginAtZero: true,
                            min: 0,
                            max: 100
                        } : {
                            fontColor: "#26262F", // this here
                            suggestedMin: 0,
                            beginAtZero: true
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
                enabled: true,
                mode: "label",

            },


        };
        $scope.aggregationsBarGraphData = aggregationsData;
        if ($scope.aggregationsBarGraphData.length > 0) {
            $scope.totalOfDoughnutChart = parseInt($scope.aggregationsBarGraphData[$scope.portalMonthSelectedIndex].R) + parseInt($scope.aggregationsBarGraphData[$scope.portalMonthSelectedIndex].G) + parseInt($scope.aggregationsBarGraphData[$scope.portalMonthSelectedIndex].Y);
            $scope.doughnutChartData.datasets[0].data[0] = $scope.selectedAggregationRecord.red = $scope.aggregationsBarGraphData[$scope.portalMonthSelectedIndex].R;
            $scope.doughnutChartData.datasets[0].data[1] = $scope.selectedAggregationRecord.green = $scope.aggregationsBarGraphData[$scope.portalMonthSelectedIndex].G;
            $scope.doughnutChartData.datasets[0].data[2] = $scope.selectedAggregationRecord.yellow = $scope.aggregationsBarGraphData[$scope.portalMonthSelectedIndex].Y;
            $scope.doughnutChartBottomDataY.datasets[0].data[0] = $scope.selectedAggregationRecord.yellow;
            $scope.doughnutChartBottomDataY.datasets[0].data[1] = ($scope.selectedAggregationRecord.green + $scope.selectedAggregationRecord.red);
            $scope.doughnutChartBottomDataR.datasets[0].data[0] = $scope.selectedAggregationRecord.red;
            $scope.doughnutChartBottomDataR.datasets[0].data[1] = ($scope.selectedAggregationRecord.yellow + $scope.selectedAggregationRecord.green);
            $scope.doughnutChartBottomDataG.datasets[0].data[0] = $scope.selectedAggregationRecord.green;
            $scope.doughnutChartBottomDataG.datasets[0].data[1] = ($scope.selectedAggregationRecord.yellow + $scope.selectedAggregationRecord.red);
            $('.donutVal').text($scope.totalOfDoughnutChart);
            ///console.log($scope.selectedAggregationRecord.green);
            $('.donutValG').text($scope.selectedAggregationRecord.green);
            $('.donutValY').text($scope.selectedAggregationRecord.yellow);
            $('.donutValR').text($scope.selectedAggregationRecord.red);
            $scope.isDonutValueSet = true;
            $scope.isDonutValueGSet = true;
            if ($scope.portalMonthSelectedIndex == 0) {
                $scope.previousAggregationRecord.green = $scope.aggregationsBarGraphData[$scope.aggregationsBarGraphData.length - 1].G;
                $scope.previousAggregationRecord.yellow = $scope.aggregationsBarGraphData[$scope.aggregationsBarGraphData.length - 1].Y;
                $scope.previousAggregationRecord.red = $scope.aggregationsBarGraphData[$scope.aggregationsBarGraphData.length - 1].R;
            } else {
                $scope.previousAggregationRecord.green = $scope.aggregationsBarGraphData[$scope.portalMonthSelectedIndex - 1].G;
                $scope.previousAggregationRecord.yellow = $scope.aggregationsBarGraphData[$scope.portalMonthSelectedIndex - 1].Y;
                $scope.previousAggregationRecord.red = $scope.aggregationsBarGraphData[$scope.portalMonthSelectedIndex - 1].R;
            }
            $scope.aggregationsGraphData = aggregationsData;
            dashboardDataProcessFactory.processAggregationGraphData($scope, $scope.aggregationsBarGraphData);

        }

    }

    dashboardDataProcessFactory.processAggregationsPercentageGraphData = function ($scope, aggregationsData) {
        $scope.barChartOption = {
            responsive: false,
            scales: {
                xAxes: [
                    {
                        stacked: $scope.selectedChartType == "percentage" ? true : false,
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
                        stacked: $scope.selectedChartType == "percentage" ? true : false,
                        ticks: $scope.selectedChartType == "percentage" ? {
                            fontColor: "#26262F", // this here
                            suggestedMin: 0,
                            beginAtZero: true,
                            min: 0,
                            max: 100
                        } : {
                            fontColor: "#26262F", // this here
                            suggestedMin: 0,
                            beginAtZero: true
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
                enabled: true,
                mode: "label",

            },


        };
        $scope.aggregationsBarPerGraphData = aggregationsData;
        if ($scope.aggregationsBarGraphData.length > 0) {
            dashboardDataProcessFactory.processAggregationPerGraphData($scope, $scope.aggregationsBarPerGraphData);

        }

    }

    dashboardDataProcessFactory.procrsssAggegationData = function ($scope, aggregationsData) {
        var tempIndex = 0;
        $scope.aggregationsBarGraphData = {};
        $scope.aggregationsTrendedBarGraphData = {};
        $scope.aggregationsStackedGraphData = {};
        $scope.aggregationsSpecialStackedGraphData = {};
        $scope.aggregationsGraphData = {};
        $scope.aggregationsApproverArr = [];
        $scope.aggregationsApproverGraphArr = [];
        var i, j;
        $scope.aggregationsStackedGraphData = aggregationsData.dashStackedGraphData;
        $scope.aggregationsTrendedBarGraphData = aggregationsData.graph;
        $scope.aggregationsSpecialStackedGraphData = aggregationsData.drillStackedGraphData;
        $scope.tempAggregationsDrillOptionsArr = $scope.aggregationsDrillOptionsArr;
        if (isSupportedAPIVersion(supported2xVersion, $scope.wsTempParamObj.apiversion) || isSupportedAPIVersion(supported3xVersion, $scope.wsTempParamObj.apiversion)) {
            if ($scope.drillDownLabelArr.length > 0 && $scope.level == "H0") {
                if ($scope.drillDownLabelArr[1] != undefined && $scope.drillDownLabelArr[1] != "" && $scope.drillDownLabelArr[1] != null) {
                    $scope.optionLabel = $scope.drillDownLabelArr[1];
                } else {
                    $scope.optionLabel = DASH_DRILL_DOWN_LBL;
                }

            }
        } else {
            $scope.optionLabel = DASH_DRILL_DOWN_LBL;
        }
        if (aggregationsData.drillOptions.length > 0) {
            $scope.aggregationsDrillOptionsArr = aggregationsData.drillOptions;
        } else {
            $scope.aggregationsDrillOptionsArr = $scope.tempAggregationsDrillOptionsArr;
            $scope.optionLabel = $scope.selectedDrillDownOption.optionLabel;

        }

        $scope.processAggregationMasterGraphArr = aggregationsData.custom1;
        $scope.aggregationsDrillOptionsArr.sort(function (a, b) {
            if (a.optionLabel < b.optionLabel)
                return -1;
            if (a.optionLabel > b.optionLabel)
                return 1;
            return 0;
        });
        $scope.drillDownHierarchyArr[0] = {
            label: $scope.currentClientCofig.drillDownHierarchyLabel,
            level: "H0",
            shortname: $scope.currentClientCofig.drillDownHierarchyLabel,
            id: 0

        };

        if ($scope.selectedDrillDownOption.hierarchy != undefined) {
            if ($scope.aggregationsDrillOptionsArr.length > 0 && $scope.aggregationsDrillOptionsArr[0].hierarchy != $scope.tempAggregationsDrillOptionsArr[0].hierarchy) {
                tempIndex = $scope.selectedDrillDownOption.hierarchy.substring(1, $scope.selectedDrillDownOption.length);
                ///console.log(tempIndex)
                $scope.drillDownHierarchyArr[tempIndex] = {
                    label: $scope.selectedDrillDownOption.optionLabel,
                    level: $scope.selectedDrillDownOption.hierarchy,
                    shortname: $scope.selectedDrillDownOption.shortname,
                    id: tempIndex
                };
                $scope.aggregationsDrillOptionsArrMultilevelArr[tempIndex] = aggregationsData.drillOptions;

                if ($scope.drillDownLabelArr.length > 0) {
                    if ($scope.drillDownLabelArr[parseInt(tempIndex) + 1] != undefined && $scope.drillDownLabelArr[parseInt(tempIndex) + 1] != "" && $scope.drillDownLabelArr[parseInt(tempIndex) + 1] != null) {
                        $scope.optionLabel = $scope.drillDownLabelArr[parseInt(tempIndex) + 1];
                    } else {
                        $scope.optionLabel = DASH_DRILL_DOWN_LBL;
                    }
                }
            } else {
                tempIndex = $scope.selectedDrillDownOption.hierarchy.substring(1, $scope.selectedDrillDownOption.length);
                $scope.aggregationsDrillOptionsArrMultilevelArr[tempIndex] = aggregationsData.drillOptions
            }

        } else {
            $scope.aggregationsDrillOptionsArrMultilevelArr[tempIndex] = aggregationsData.drillOptions;


        }
        dashboardDataProcessFactory.processBreakDownArr($scope.processAggregationMasterGraphArr, $scope);
    }

    //Handle drill down hierarchy
    dashboardDataProcessFactory.processHierarchyData = function ($scope, drillOptions) {
        $scope.drillDownHierarchyArr[0] = {
            label: $scope.currentClientCofig.drillDownHierarchyLabel,
            level: "H0",
            id: 0
        };
        $scope.menuJSON.Hierarchy[$scope.drillDownOptionSelectedIndex].data = [];
        $scope.menuJSON.Hierarchy[$scope.drillDownOptionSelectedIndex].shortName = [];
        for (var h in drillOptions) {
            $scope.menuJSON.Hierarchy[$scope.drillDownOptionSelectedIndex].data[h] = drillOptions[h].optionLabel;
            $scope.menuJSON.Hierarchy[$scope.drillDownOptionSelectedIndex].shortName[h] = drillOptions[h].shortname;
        }
        /*if(!$scope.$$phase) {
         $scope.$digest();
         }*/
    }
    dashboardDataProcessFactory.processAggregationGraphData = function ($scope, graphData) {
        var lastTwelveMonthsGraphData;
        var graphTargetValueArr = [];
        var graphCurrentValueArr = [];
        var graphMinValueArr = [];
        /*if (graphData.length > 12) {
         lastTwelveMonthsGraphData = graphData.slice(0, 12);
         }
         else {
         lastTwelveMonthsGraphData = graphData;
         }*/
        lastTwelveMonthsGraphData = graphData;
        for (var i = 0; i < graphData.length; i++) {
            graphTargetValueArr[i] = parseInt(graphData[i].G);
            graphCurrentValueArr[i] = parseInt(graphData[i].Y);
            graphMinValueArr[i] = parseInt(graphData[i].R);
        }
        var graphInterval = dashboardDataProcessFactory.createArrayObjectValues(lastTwelveMonthsGraphData, 'interval');
        ////console.log(graphTargetValueArr)
        $scope.aggregatedGraphAllRecords.target = graphTargetValueArr = graphTargetValueArr.reverse();
        $scope.aggregatedGraphAllRecords.current = graphCurrentValueArr = graphCurrentValueArr.reverse();
        $scope.aggregatedGraphAllRecords.min = graphMinValueArr = graphMinValueArr.reverse();
        $scope.aggregatedGraphAllRecords.interval = graphInterval = graphInterval.reverse();
        $scope.selectedAggregationRecord.interval = $scope.aggregatedGraphAllRecords.interval[$scope.aggregatedGraphAllRecords.interval.length - 1];
        $scope.aggregationsMonthsArr = graphInterval;
        var flktyAggrData = Flickity.data('.demo__slides');
        $scope.flickityOptions.initialIndex = 0;
        // $scope.showJanToJun();
        $scope.isAggregationButtonVisible = false;
        /* flktyAggrData.unbindDrag();*/
        $scope.graphMinValueArr.firstHalf = graphMinValueArr;
        $scope.graphCurrentValueArr.firstHalf = graphCurrentValueArr;
        $scope.graphTargetValueArr.firstHalf = graphTargetValueArr;
        $scope.graphTargetValueArr.secondHalf = $scope.barChartDataLastMonth.labels = $scope.graphCurrentValueArr.secondHalf = $scope.graphMinValueArr.secondHalf = [];
        $scope.aggregationsDateArr = [];
        $scope.barChartData.labels = dashboardDataProcessFactory.formatMonthDate($scope, $scope.aggregationsMonthsArr);
        $scope.aggregationsDateArr = $scope.aggregationsDateArr.reverse();
        $scope.aggregationsSelectedDate = $scope.aggregationsDateArr[$scope.portalMonthSelectedIndex];
        $scope.btnLabelbar.firstHalf = $scope.barChartData.labels[0][0] + " " + $scope.barChartData.labels[0][1] + " - " + $scope.barChartData.labels[$scope.barChartData.labels.length - 1][0] + " " + $scope.barChartData.labels[$scope.barChartData.labels.length - 1][1];

        $scope.barChartData.datasets[0].data = graphTargetValueArr
        $scope.barChartData.datasets[1].data = graphCurrentValueArr
        $scope.barChartData.datasets[2].data = graphMinValueArr


    }


    dashboardDataProcessFactory.processAggregationPerGraphData = function ($scope, graphData) {
        var lastTwelveMonthsGraphData;
        var graphTargetValueArr = [];
        var graphCurrentValueArr = [];
        var graphMinValueArr = [];
        /*if (graphData.length > 12) {
         lastTwelveMonthsGraphData = graphData.slice(0, 12);
         }
         else {
         lastTwelveMonthsGraphData = graphData;
         }*/
        lastTwelveMonthsGraphData = graphData;
        for (var i = 0; i < graphData.length; i++) {
            graphTargetValueArr[i] = parseInt(graphData[i].G);
            graphCurrentValueArr[i] = parseInt(graphData[i].Y);
            graphMinValueArr[i] = parseInt(graphData[i].R);
        }
        var graphInterval = dashboardDataProcessFactory.createArrayObjectValues(lastTwelveMonthsGraphData, 'interval');
        $scope.aggregatedGraphAllRecords.interval = graphInterval = graphInterval.reverse();
        ////console.log(graphTargetValueArr)
        /*$scope.aggregatedGraphAllRecords.target = graphTargetValueArr = graphTargetValueArr.reverse();
        $scope.aggregatedGraphAllRecords.current = graphCurrentValueArr = graphCurrentValueArr.reverse();
        $scope.aggregatedGraphAllRecords.min = graphMinValueArr = graphMinValueArr.reverse();

        $scope.selectedAggregationRecord.interval = $scope.aggregatedGraphAllRecords.interval[$scope.aggregatedGraphAllRecords.interval.length - 1];*/
        $scope.aggregationsMonthsArr = graphInterval;
        var flktyAggrData = Flickity.data('.demo__slides');
        $scope.flickityOptions.initialIndex = 0;
        // $scope.showJanToJun();
        $scope.isAggregationButtonVisible = false;
        /* flktyAggrData.unbindDrag();*/
        $scope.graphMinValueArr.firstHalf = graphMinValueArr;
        $scope.graphCurrentValueArr.firstHalf = graphCurrentValueArr;
        $scope.graphTargetValueArr.firstHalf = graphTargetValueArr;
        $scope.graphTargetValueArr.secondHalf = $scope.barChartDataLastMonth.labels = $scope.graphCurrentValueArr.secondHalf = $scope.graphMinValueArr.secondHalf = [];
        $scope.aggregationsDateArr = [];
        $scope.barChartData.labels = dashboardDataProcessFactory.formatMonthDate($scope, $scope.aggregationsMonthsArr);
        $scope.aggregationsDateArr = $scope.aggregationsDateArr.reverse();
        $scope.aggregationsSelectedDate = $scope.aggregationsDateArr[$scope.portalMonthSelectedIndex];
        $scope.btnLabelbar.firstHalf = $scope.barChartData.labels[0][0] + " " + $scope.barChartData.labels[0][1] + " - " + $scope.barChartData.labels[$scope.barChartData.labels.length - 1][0] + " " + $scope.barChartData.labels[$scope.barChartData.labels.length - 1][1];

        $scope.barChartData.datasets[0].data = graphTargetValueArr.reverse()
        $scope.barChartData.datasets[1].data = graphCurrentValueArr.reverse()
        $scope.barChartData.datasets[2].data = graphMinValueArr.reverse()


    }
    //sorting comments based on Date
    dashboardDataProcessFactory.sortDataByDate = function (data, prop) {
        data.sort(function (a, b) {
            var c = new Date(a[prop]);
            var d = new Date(b[prop]);
            return c - d;
        });

        return data;
    }
    dashboardDataProcessFactory.createArrayObjectValues = function (items, prop) {
        var arr = [];
        return items.reduce(function (a, b) {
            arr.push(b[prop])
            return arr;
        }, 0);
    };
    dashboardDataProcessFactory.formatMonthDate = function ($scope, DateArr) {
        ///console.log(DateArr);
        var monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        //console.log(DateArr);
        var formattedDate = []
        for (var d in DateArr) {
            var arr = [];
            var year = DateArr[d].toString().split("").slice(0, 4).join("");
            var month = DateArr[d].toString().split("").slice(4).join("");
            if (month < 10) {
                month = month.toString().split("").slice(1).join("");
            }
            //conole.log(monthNames[month])
            $scope.aggregationsDateArr.push(monthNames[month] + " " + year);
            arr.push(monthNames[month]);
            arr.push(year);
            /*console.log(month+" "+year);*/
            formattedDate[d] = arr
        }
        return formattedDate;
    };
    dashboardDataProcessFactory.processDrillThroughMetricData = function ($scope, aggregationsMetricData) {
        /*alert('Success');*/
        if (!$scope.isCardViewVisible) {
            if (aggregationsMetricData.length > 5) {
                $('.view-record').text("1 - " + $scope.listViewNumberOfRecords);
            }
            else {
                $('.view-record').text("1 - " + aggregationsMetricData.length);
            }
        }
        else {
            if (aggregationsMetricData.length > 4) {
                $('.view-record').text("1 - 4");
            }
            else {
                $('.view-record').text("1 - " + aggregationsMetricData.length);
            }
        }


        var i = 0;
        if (aggregationsMetricData.length > 0) {

            for (i = 0; i < aggregationsMetricData.length; i++) {
                if (isSupportedAPIVersion(supported2xVersion, $scope.wsTempParamObj.apiversion) || isSupportedAPIVersion(supported3xVersion, $scope.wsTempParamObj.apiversion)) {

                    $scope.aggregationsMetricMasterArr.push({
                        metricName: aggregationsMetricData[i].metricName,
                        metricKey: aggregationsMetricData[i].metricKey,
                        target: utilityService.formatMetricDataTypes(aggregationsMetricData[i].target, aggregationsMetricData[i].metricType, $scope.wsTempParamObj.clientName),
                        min: utilityService.formatMetricDataTypes(aggregationsMetricData[i].min, aggregationsMetricData[i].metricType, $scope.wsTempParamObj.clientName),
                        actual: utilityService.formatMetricDataTypes(aggregationsMetricData[i].actual, aggregationsMetricData[i].metricType, $scope.wsTempParamObj.clientName),
                        status: aggregationsMetricData[i].status,
                        trend: aggregationsMetricData[i].trend,
                        metricType: aggregationsMetricData[i].metricType,
                        factKey: aggregationsMetricData[i].factKey,
                        commentCount: aggregationsMetricData[i].commentCount,
                        h1label: aggregationsMetricData[i].h1label,
                        h2label: aggregationsMetricData[i].h2label,
                        h3label: aggregationsMetricData[i].h3label,
                        h4label: aggregationsMetricData[i].h4label,
                        h5label: aggregationsMetricData[i].h5label,
                        processName: aggregationsMetricData[i].breakdownName,
                        selected: false,
                        trendDiff: utilityService.formatTrendDiff(aggregationsMetricData[i].trendDiff)
                    });


                } else {
                    $scope.aggregationsMetricMasterArr.push({
                        metricName: aggregationsMetricData[i].metricName,
                        metricKey: aggregationsMetricData[i].metricKey,
                        target: utilityService.formatMetricDataTypes(aggregationsMetricData[i].target, aggregationsMetricData[i].metricType, $scope.wsTempParamObj.clientName),
                        min: utilityService.formatMetricDataTypes(aggregationsMetricData[i].min, aggregationsMetricData[i].metricType, $scope.wsTempParamObj.clientName),
                        actual: utilityService.formatMetricDataTypes(aggregationsMetricData[i].actual, aggregationsMetricData[i].metricType, $scope.wsTempParamObj.clientName),
                        status: aggregationsMetricData[i].status,
                        trend: aggregationsMetricData[i].trend.split("|")[0],
                        metricType: aggregationsMetricData[i].metricType,
                        factKey: aggregationsMetricData[i].trend.split("|")[1],
                        commentCount: aggregationsMetricData[i].trend.split("|")[2],
                        clientGeo: aggregationsMetricData[i].trend.split("|")[3],
                        clientCountry: aggregationsMetricData[i].trend.split("|")[4],
                        processName: aggregationsMetricData[i].trend.split("|")[5]

                    });

                }
            }

            $scope.aggregationsMetricMasterArrClone = $scope.aggregationsMetricMasterArr;
            /* $scope.aggregationsSelectedDate = $scope.aggregationsDatesArr[$scope.portalMonthSelectedIndex];*/
            $scope.filterProcess($scope.processValue, $scope.portalStatusValue);
            if ($scope.showDoughnut) {
                $scope.showDoughnut = false;
            }

        } else {
            $scope.showErrorModal(DASH_NO_DATA_FOUND_ERR_MESS);
        }
    }
    dashboardDataProcessFactory.processDrillDownGraph = function ($scope, arr) {
        //console.log(arr);
        $scope.portalAllMetricGroupRecords = [];
        try {

            for (i = 0; i < arr.length; i++) {
                for (j = 0; j < arr[i].facts.length; j++) {
                    var year = String(arr[i].facts[j].interval).substring(0, String(arr[i].facts[j].interval).length - 2);
                    var month = String(arr[i].facts[j].interval).substring(String(arr[i].facts[j].interval).length - 2, String(arr[i].facts[j].interval).length);
                    var timestamp = utilityService.convertToTimeStamp(parseInt(year), parseInt(month), 15, 16, 0, 0);
                    $scope.portalAllMetricGroupRecords.push({
                        metricKey: arr[i].metricKey,
                        factKey: arr[i].facts[j].factKey,
                        metricGroupName: utilityService.removeSpecialCharacter(arr[i].metricGroupName),
                        target: utilityService.formatMetricGraphData(arr[i].facts[j].target, arr[i].valueType, $scope),
                        current: utilityService.formatMetricGraphData(arr[i].facts[j].current, arr[i].valueType, $scope),
                        min: utilityService.formatMetricGraphData(arr[i].facts[j].min, arr[i].valueType, $scope),
                        status: arr[i].facts[j].status,
                        trend: arr[i].facts[j].trend,
                        timestamp: timestamp,
                        displayDate: utilityService.convertToYearMonthFormat(timestamp),
                        comments: arr[i].facts[j].comments

                    });

                }
            }
            $scope.portalAllMetricGroupRecords = $scope.portalAllMetricGroupRecords.sort(function (a, b) {
                if (a.timestamp > b.timestamp) {
                    return 1;
                }
                if (a.timestamp < b.timestamp) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });

            if ($scope.portalAllMetricGroupRecords.length > 0 && $scope.selectedChartPointIndex != -1) {
                console.log($scope.selectedChartPointIndex);
                if ($scope.isCommentAdded) {
                    if ($scope.selectedChartPointIndex == 0) {
                        $scope.selectedChartPointIndex = $scope.portalLastTwelveMetricGroupRecords.length - 1;
                    }
                    $scope.selectedGraphRecord = $scope.portalLastTwelveMetricGroupRecords[$scope.selectedChartPointIndex];
                    $scope.loadDrillDownChart($scope.portalAllMetricGroupRecords);
                    this.processCommentsData($scope, $scope.portalLastTwelveMetricGroupRecords[$scope.selectedChartPointIndex].comments);

                }
                else {
                    if ($scope.selectedChartPointIndex == 0) {
                        $scope.selectedChartPointIndex = $scope.portalAllMetricGroupRecords.length - 1;
                    }
                    $scope.selectedGraphRecord = $scope.portalAllMetricGroupRecords[$scope.selectedChartPointIndex];
                    $scope.loadDrillDownChart($scope.portalAllMetricGroupRecords);
                    this.processCommentsData($scope, $scope.portalLastTwelveMetricGroupRecords[$scope.selectedChartPointIndex].comments);

                }

            }
        } catch (error) {
            $scope.graphDataError = true;
        }
    }
    //process the comment data
    dashboardDataProcessFactory.processCommentsData = function ($scope, arr) {
        $scope.selectedSLACommentArr = [];
        try {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].commentTimestamp != null) {
                    if (isSupportedAPIVersion(supported3xVersion, $scope.wsTempParamObj.apiversion)) {
                        $scope.selectedSLACommentArr.push({
                            commentContent: arr[i].commentContent,
                            commentKey: arr[i].commentKey,
                            commentTimestamp: arr[i].commentTimestamp,
                            userName: arr[i].userName,
                            slaFactKey: arr[i].factKey,
                            commentUserKey: arr[i].commentUserKey,
                            commentUserName: arr[i].commentUserName,
                            filenameObj: $scope.convertToFileObj(arr[i].attachmentKey, arr[i].fileName, arr[i].attachmentUserKey, arr[i].attachmentUserName, arr[i]),
                        });
                    } else {
                        $scope.selectedSLACommentArr = arr;
                    }

                }
            }
        } catch (error) {
            console.log(error)
        }

    }

    dashboardDataProcessFactory.processBreakDownArr = function (dataArr, $scope) {
        ////$scope.aggregationsProcessArr=[];
        for (var i = 0; i < dataArr.length; i++) {
            $scope.headerLabel = dataArr[1].header
            for (var j = 0; j < dataArr[$scope.portalMonthSelectedIndex].data.length; j++) {
                ///console.log(dataArr[i].data[j].H3);
                $scope.aggregationsProcessArr.push(dataArr[$scope.portalMonthSelectedIndex].data[j].H3);
            }
        }
        $scope.aggregationsProcessArr.unshift($scope.headerLabel + " " + DASH_ALL_LBL);
        if ($scope.portalProcessSelectedIndex == 0) {
            $scope.processValue = $scope.headerLabel + " " + DASH_ALL_LBL;
        }
        //remove duplicates values from array
        $scope.aggregationsProcessArr = $scope.aggregationsProcessArr.filter(function (item, i, ar) {
            return ar.indexOf(item) === i;
        });
        ///$scope.processValue=$scope.headerLabel + " " + DASH_ALL_LBL;
    }
    dashboardDataProcessFactory.processJSON = function (dataArr, $scope) {
        var tempArr = new Array();
        $scope.treemapDataArr = [];
        for (var i = 0; i < dataArr[$scope.portalMonthSelectedIndex].data.length; i++) {
            for (var j = 0; j < dataArr[$scope.portalMonthSelectedIndex].data[i].treemapdata.length; j++) {
                ///console.log(dataArr[$scope.portalMonthSelectedIndex].data[i].treemapdata[j].name)
                if ($scope.processValue == dataArr[$scope.portalMonthSelectedIndex].data[i].treemapdata[j].name) {
                    tempArr[0] = {
                        name: dataArr[$scope.portalMonthSelectedIndex].data[i].treemapdata[j].name,
                        children: dataArr[$scope.portalMonthSelectedIndex].data[i].treemapdata[j].children
                    };
                } else if ($scope.processValue == $scope.headerLabel + " " + DASH_ALL_LBL) {
                    tempArr[i] = {
                        name: dataArr[$scope.portalMonthSelectedIndex].data[i].treemapdata[j].name,
                        children: dataArr[$scope.portalMonthSelectedIndex].data[i].treemapdata[j].children
                    };
                }

            }
        }
        $scope.treemapDataArr = {name: "Global", children: tempArr};

        $("#svgContent").empty();
        //$("#treemapContent").appendChild('<svg width="500" height="300"></svg>');
        var svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var fader = function (color) {
                return d3.interpolateRgb(color, "#fff")(0.2);
            },
            color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
            format = d3.format(",d");

        var treemap = d3.treemap()
            .tile(d3.treemapResquarify)
            .size([width, height])
            .round(true)
            .paddingInner(1);

        var dummydata = {
            "name": "flare",
            "children": [
                {
                    "name": "analytics",
                    "children": [
                        {
                            "name": "cluster",
                            "children": [
                                {"name": "Green00", "size": 100},
                                {"name": "Red00", "size": 80},
                                {"name": "Yellow00", "size": 0}
                            ]
                        },
                        {
                            "name": "optimizationsdsdsdsdssssssssssss",
                            "children": [
                                {"name": "Green11", "size": 100},
                                {"name": "Red11", "size": 80},
                                {"name": "Yellow11", "size": 60}
                            ]
                        },
                        {
                            "name": "optimizationsdsd",
                            "children": [
                                {"name": "Green22", "size": 100},
                                {"name": "Red22", "size": 80},
                                {"name": "Yellow22", "size": 60}
                            ]
                        }
                    ]
                }
            ]
        }
        ///console.log(dummydata);

        ///console.log($scope.treemapDataArr);
        //$scope.treemapDataArr;
        var data = $scope.treemapDataArr;
        var root = d3.hierarchy(data)
            .eachBefore(function (d) {
                d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
            })
            .sum(sumBySize)
            .sort(function (a, b) {
                return b.height - a.height || b.value - a.value;
            });

        treemap(root);

        var cell = svg.selectAll("g")
            .data(root.leaves())
            .enter().append("g")
            .attr("transform", function (d) {
                return "translate(" + d.x0 + "," + d.y0 + ")";
            });

        cell.append("rect")
            .attr("id", function (d) {
                return d.data.id;
            })
            .attr("width", function (d) {
                return d.x1 - d.x0;
            })
            .attr("height", function (d) {
                return d.y1 - d.y0;
            })
            .attr("fill", function (d) {
                return color(d.parent.data.id);
            })
            .text(function (d, i) {
                return d;
            });

        cell.append("clipPath")
            .attr("id", function (d) {
                return "clip-" + d.data.id;
            })
            .append("use")
            .attr("xlink:href", function (d) {
                return "#" + d.data.id;
            });

        cell.append("text")
            .attr("clip-path", function (d, i) {
                return "url(#clip-" + d.data.id + ")";
            })
            .selectAll("tspan")
            .data(function (d, i) {
                return d.data.name.split(/(?=[A-Z][^A-Z])/g);
            })
            .enter().append("tspan")
            .attr("x", 4)
            .attr("y", function (d, i) {
                return 13 + i * 10;
            })
            .text(function (d, i) {
                return d;
            });

        cell.append("title")
            .text(function (d) {
                return d.data.id + "\n" + format(d.value);
            });
        //console.log(cell)

        d3.selectAll("input")
            .data([sumBySize, sumByCount], function (d) {
                return d ? d.name : this.value;
            })
            .on("change", changed);

        var timeout = d3.timeout(function () {
            d3.select("input[value=\"sumByCount\"]")
                .property("checked", true)
                .dispatch("change");
        }, 2000);

        function changed(sum) {
            timeout.stop();

            treemap(root.sum(sum));

            cell.transition()
                .duration(750)
                .attr("transform", function (d) {
                    return "translate(" + d.x0 + "," + d.y0 + ")";
                })
                .select("rect")
                .attr("width", function (d) {
                    return d.x1 - d.x0;
                })
                .attr("height", function (d) {
                    return d.y1 - d.y0;
                });
        }


        function sumByCount(d) {
            return d.size;
        }

        function sumBySize(d) {
            return d.size;
        }


    }

    dashboardDataProcessFactory.processTreeMapData = function ($scope, dataArr) {
        console.log(dataArr.data[$scope.portalMonthSelectedIndex]);
        var root = {};
        var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 410,
            height = 245 - margin.top - margin.bottom,
            formatNumber = d3.format(",d"),
            transitioning;

        var x = d3.scale.linear()
            .domain([0, width])
            .range([0, width]);

        function colores_google(n) {
            var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
            return colores_g[n % colores_g.length];
        }

        var color = d3.scale.category20c();
        ///console.log(d3.scale.category20c().range());
        var y = d3.scale.linear()
            .domain([0, height])
            .range([0, height]);

        var treemap = d3.layout.treemap()
            .children(function (d, depth) {
                return depth ? null : d._children;
            })
            .sort(function (a, b) {
                return a.value - b.value;
            })
            .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
            .round(false);
        $("#chart").empty();
        var svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.bottom + margin.top)
            .style("margin-left", -margin.left + "px")
            .style("margin.right", -margin.right + "px")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .style("shape-rendering", "crispEdges");

        var grandparent = svg.append("g")
            .attr("class", "grandparent");
        root = dataArr.data[$scope.portalMonthSelectedIndex];
        ///console.log(root);
        initialize(root);
        accumulate(root);
        layout(root);
        display(root);

        function initialize(root) {
            root.x = root.y = 0;
            root.dx = width;
            root.dy = height;
            root.depth = 0;
        }

        // Aggregate the values for internal nodes. This is normally done by the
        // treemap layout, but not here because of our custom implementation.
        // We also take a snapshot of the original children (_children) to avoid
        // the children being overwritten when when layout is computed.
        function accumulate(d) {

            return (d._children = d.children)
                ? d.value = d.children.reduce(function (p, v) {
                return p + accumulate(v);
            }, 0)
                : d.value;
        }

        // Compute the treemap layout recursively such that each group of siblings
        // uses the same size (1×1) rather than the dimensions of the parent cell.
        // This optimizes the layout for the current zoom state. Note that a wrapper
        // object is created for the parent node for each group of siblings so that
        // the parent’s dimensions are not discarded as we recurse. Since each group
        // of sibling was laid out in 1×1, we must rescale to fit using absolute
        // coordinates. This lets us use a viewport to zoom.
        function layout(d) {
            if (d._children) {
                treemap.nodes({_children: d._children});
                d._children.forEach(function (c) {
                    c.x = d.x + c.x * d.dx;
                    c.y = d.y + c.y * d.dy;
                    c.dx *= d.dx;
                    c.dy *= d.dy;
                    c.parent = d;
                    layout(c);
                });
            }
        }

        function display(d) {
            grandparent
                .datum(d.parent)
                .on("click", transition)
                .select("text")
                .text(name(d));

            var g1 = svg.insert("g", ".grandparent")
                .datum(d)
                .attr("class", "depth");

            var g = g1.selectAll("g")
                .data(d._children)
                .enter().append("g");

            g.filter(function (d) {
                return d._children;
            })
                .classed("children", true)
            //.on("click", transition);
            g.selectAll(".child")

                .data(function (d) {
                    return d._children || [d];
                })
                .enter().append("rect").style("animation", function (d, i) {
                    return "hideshow " + (i + 1) + "s ease-out"
                }).style("fill", function (d) {
                    for (var i = 0; i < d._children.length; i++) {
                        if (d._children[i].name.indexOf("G:") != -1) {
                            return "#008A52";
                        } else if (d._children[i].name.indexOf("R:") != -1) {
                            return "#D9182D";
                        } else if (d._children[i].name.indexOf("Y:") != -1) {
                            return "#FFCF01";
                        }
                    }
                    return color(d.color);
                })
                .call(rect)

                .style("cursor", "pointer")
                .on("load", transition)
                .on("click", function (d) {
                    dashboardDataProcessFactory.processTreeMapFilterData($scope, d.parent.name, d.name);
                    ///$scope.filterProcess(d.parent.name,d.name)
                })


            g.append("rect")
                .attr("class", "children")
                .call(rect)

                .append("title")

                .text(function (d) {
                    return formatNumber(d.value);
                });

            g.append("text")
                .attr("dy", ".75em")
                .text(function (d) {
                    return d.name;
                })
                .call(text);

            function transition(d) {
                ///console.log(d3.scale.category20c().range());
                if (transitioning || !d) return;
                transitioning = true;

                var g2 = display(d),
                    t1 = g1.transition().duration(750),
                    t2 = g2.transition().duration(750);

                // Update the domain only after entering new elements.
                x.domain([d.x, d.x + d.dx]);
                y.domain([d.y, d.y + d.dy]);

                // Enable anti-aliasing during the transition.
                svg.style("shape-rendering", null);

                // Draw child nodes on top of parent nodes.
                svg.selectAll(".depth").sort(function (a, b) {
                    return a.depth - b.depth;
                });

                // Fade-in entering text.
                g2.selectAll("text").style("fill-opacity", 0);

                // Transition to the new view.
                t1.selectAll("text").call(text).style("fill-opacity", 0);
                t2.selectAll("text").call(text).style("fill-opacity", 1);
                t1.selectAll("rect").call(rect);
                t2.selectAll("rect").call(rect);


                // Remove the old node when the transition is finished.
                t1.remove().each("end", function () {
                    svg.style("shape-rendering", "crispEdges");
                    transitioning = false;
                });
            }

            return g;
        }

        function text(text) {
            text.attr("x", function (d) {
                return x(d.x) + 6;
            })
                .attr("y", function (d) {
                    return y(d.y) + 6;
                });
        }

        function rect(rect) {
            rect.attr("x", function (d) {
                return x(d.x);
            })
                .attr("y", function (d) {
                    return y(d.y);
                })
                .attr("width", function (d) {
                    return x(d.x + d.dx) - x(d.x);
                })
                .attr("height", function (d) {
                    return y(d.y + d.dy) - y(d.y);
                });
        }

        function name(d) {
            return d.parent
                ? name(d.parent) + " / " + d.name
                : d.name;
        }

    }
    dashboardDataProcessFactory.processCommentListData = function ($scope, commentList) {
        if (commentList != null) {
            for (var i = 0; i < commentList.length; i++) {
                $scope.hierarchyCommentList.push({
                    commentTime: utilityService.dateFormatter(commentList[i].commentTime),
                    fullPath: commentList[i].fullPath,
                    userName: commentList[i].userName,
                    metricName: commentList[i].metricGroupName,
                    interval: commentList[i],
                    factKey: commentList[i].factKey,
                    commentUserKey: commentList[i].commentUserKey,
                    commentUserName: commentList[i].commentUserName,
                    filenameObj: $scope.convertToFileObj(commentList[i].attachmentKey, commentList[i].fileName, commentList[i].attachmentUserKey, commentList[i].attachmentUserName, commentList[i]),
                    commentContent: commentList[i].commentContent
                })

            }
            $scope.drillThroughPageArr = $scope.hierarchyCommentList;
            console.log($scope.hierarchyCommentList);
        } else {
            console.log("Not data found!")
        }

    }

    dashboardDataProcessFactory.processBreakdownSummaryData = function ($scope, breakdownSummaryList) {
        console.log(breakdownSummaryList);
        console.log($scope.portalMonthSelectedIndex);
        //Iterate breakdownSummaryList array
        for (var i = 0; i < breakdownSummaryList.length; i++) {
            //Initialize 3 empty arrays, in order to Push All the G Values/R Values/Y Values into an array for calculating max in that array.
            var gArray = [];
            var rArray = [];
            var yArray = [];

            //Iterate GeoData array

            //Iterate all the objects properties in the  geoData objects
            for (var j = 0; j < breakdownSummaryList[$scope.portalMonthSelectedIndex].geoData.length; j++) {
                //Extract all the G/R/Y values from each properties and push into respective arrays

                gArray.push(breakdownSummaryList[$scope.portalMonthSelectedIndex].geoData[j].G);
                rArray.push(breakdownSummaryList[$scope.portalMonthSelectedIndex].geoData[j].R);
                yArray.push(breakdownSummaryList[$scope.portalMonthSelectedIndex].geoData[j].Y);
            }
        }
        var maxArr = gArray.concat(rArray.concat(yArray));
        var maxInArray = Math.max.apply(null, maxArr);
        console.log(maxInArray);
        //In order to calculate percentage, iterate through the GeoData array
        for (var j = 0; j < breakdownSummaryList[$scope.portalMonthSelectedIndex].geoData.length; j++) {
            $scope.breakdownSummaryList[j] = {
                hierarchyName: breakdownSummaryList[$scope.portalMonthSelectedIndex].geoData[j].hierarchyName,
                G: breakdownSummaryList[$scope.portalMonthSelectedIndex].geoData[j].G,
                R: breakdownSummaryList[$scope.portalMonthSelectedIndex].geoData[j].R,
                Y: breakdownSummaryList[$scope.portalMonthSelectedIndex].geoData[j].Y,
                greenPer: Math.abs(breakdownSummaryList[$scope.portalMonthSelectedIndex].geoData[j].G / maxInArray * 100).toFixed(2),
                redPer: Math.abs(breakdownSummaryList[$scope.portalMonthSelectedIndex].geoData[j].R / maxInArray * 100).toFixed(2),
                yellowPer: Math.abs(breakdownSummaryList[$scope.portalMonthSelectedIndex].geoData[j].Y / maxInArray * 100).toFixed(2)
            }

        }


        console.log("Array with Percentage Values is:");
        ///console.log($scope.breakdownSummaryList)
    }

    dashboardDataProcessFactory.processTreeMapFilterData = function ($scope, processValue, statusValue) {
        var updatedStatus = statusValue.trim();
        for (var i = 0; i < $scope.aggregationsProcessArr.length; i++) {
            if (processValue == $scope.aggregationsProcessArr[i]) {
                $scope.portalProcessSelectedIndex = i;

                $scope.wsTempParamObj.breakDownFilter = $scope.processValue = $scope.aggregationsProcessArr[i];
            }
        }

        console.log(updatedStatus)
        if (updatedStatus == "Green") {
            $scope.selectedStatusFromMainPage = "G";
        } else if (updatedStatus == "Red") {
            $scope.selectedStatusFromMainPage = "R";
        } else if (updatedStatus == "Yellow") {
            $scope.selectedStatusFromMainPage = "Y";
        } else {
            $scope.selectedStatusFromMainPage = "A"
        }

        ///console.log($scope.portalStatusValue)
        $scope.processValue = processValue;
        ///$scope.portalStatusValue=statusValue;
        $scope.wsTempParamObj.dateRange = $scope.selectedAggregationRecord.interval;
        $scope.wsTempParamObj.status = $scope.portalStatusValue;
        $scope.getDrillThroughMetricData($scope.wsTempParamObj);
    }

    dashboardDataProcessFactory.processSearchMetricData = function ($scope, searchArr) {
        try {
            for (var i = 0; i < searchArr.length; i++) {
                searchArr[i].metricName = searchArr[i].metricName.replace(/\s\s+/g, ' ')
                searchArr[i].target = utilityService.formatMetricSearchData(searchArr[i].target, searchArr[i].metricType, $scope, searchArr[i]);
                searchArr[i].min = utilityService.formatMetricSearchData(searchArr[i].min, searchArr[i].metricType, $scope, searchArr[i]);
                searchArr[i].actual = utilityService.formatMetricSearchData(searchArr[i].actual, searchArr[i].metricType, $scope, searchArr[i]);
            }
        }
        catch (error) {
            $scope.graphDataError = true;
        }
    }

    dashboardDataProcessFactory.processPathData = function ($scope, searchArr) {
        try {
            for (var i = 0; i < searchArr.length; i++) {
                searchArr[i].fullPath = searchArr[i].fullPath === undefined ? '' : searchArr[i].fullPath;
                if (searchArr[i].h1label !== null) {
                    searchArr[i].fullPath = searchArr[i].fullPath + searchArr[i].h1label + " > "
                }
                if (searchArr[i].h2label !== null) {
                    searchArr[i].fullPath = searchArr[i].fullPath + searchArr[i].h2label + " > "
                }
                if (searchArr[i].h3label !== null) {
                    searchArr[i].fullPath = searchArr[i].fullPath + searchArr[i].h3label;
                }
                if (searchArr[i].h4label !== null) {
                    searchArr[i].fullPath = searchArr[i].fullPath + searchArr[i].h4label;
                }
                if (searchArr[i].h5label !== null) {
                    searchArr[i].fullPath = searchArr[i].fullPath + searchArr[i].h5label;
                }
            }
        }
        catch (error) {
            $scope.graphDataError = true;
        }
    }


    return dashboardDataProcessFactory;
});