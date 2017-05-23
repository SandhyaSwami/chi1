/**
 * Created by vaibhav_parkhi on 2/13/2016.
 */

(function () {
    "use strict";
    angular.module("dashboard.chartjs2.0", []).directive('dashboardChart', function () {
        return {
            restrict: "E",
            replace: true,
            scope: {
                data: '=data',
                options: '=options',
                getClick:'&onClick',
                getHover:'&onOver',
                responsive : "@",
                getLoad:"&onLoad",
                type:"=type"
            },
            template: '<canvas></canvas>',
            link: function ($scope, element, attr) {
                var chartObj=null;

                $scope.generateChart = function() {
                    element.empty();
                    element.append('<canvas></canvas>');
                    //var canvas=element[0];
                    if(chartObj !=null){
                        chartObj.clear();
                        chartObj.destroy();
                    }

                    var ctx = element[0].getContext('2d');
                    //ctx.clearRect(0,0,canvas.width,canvas.height);
                    chartObj = eval(new Chart(ctx,{type:$scope.type||'bar',
                        data:$scope.data,
                        options:$scope.options}));
                    var ChartObj_cpy={
                        chart:chartObj
                    }
                    if($scope.getLoad)
                        $scope.getLoad({obj:ChartObj_cpy});

                }
                $scope.$watchCollection('data',function(newValue,oldValue) {
                    if(newValue){
                        $scope.generateChart();
                        if($scope.getClick){
                            element.on('click',function(e){
                                var activePoints = chartObj.getElementAtEvent(e);
                                var pts=chartObj.getDatasetAtEvent(e);
                                var data_to_send={
                                    data:activePoints,
                                    point:pts,
                                    obj:chartObj
                                };
                                if(activePoints.length>0){
                                    $scope.getClick({data:data_to_send});
                                }

                            });
                        }
                        if($scope.getHover){
                            element.on('mousemove',function(e){
                                var activePoints = chartObj.getElementAtEvent(e);
                                var pts=chartObj.getDatasetAtEvent(e);
                                var data_to_send={
                                    data:activePoints,
                                    point:pts
                                };
                                if(activePoints.length>0){
                                    //console.log(activePoints);
                                    $scope.getHover({data:data_to_send});
                                }
                            });
                        }
                    }
                });
                $scope.$watchCollection('type',function(newValue,oldValue) {
                    if(newValue){
                        $scope.generateChart();
                    }
                });
            }
        }
    });
})();