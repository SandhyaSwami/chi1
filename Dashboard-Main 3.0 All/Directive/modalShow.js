/**
 * Created by karan_sonawane on 1/21/2017.
 */
(function () {
    "use strict";
    angular.module("modal", []).directive('modal', function () {
        return {
            restrict: "E",
            scope: {
                modalShow: '=modalShow'

            },
            link: function ($scope, element, attrs) {
                //Hide or show the modal
                $scope.showModal = function (visible, elem) {
                    if (!elem)
                        elem = element;

                    if (visible){
                        var modalContent=elem.find(".modal-content")
                        console.log()
                        $(modalContent).removeClass("fadeOutRightBig");
                        $(modalContent).addClass("fadeInRightBig");
                        setTimeout(function(){
                            $(elem).show();
                        },300);


                      }

                    else{
                        var modalContent=elem.find(".modal-content")
                        $(modalContent).removeClass("fadeInRightBig ");
                        $(modalContent).addClass("fadeOutRightBig");
                        setTimeout(function(){
                            $(elem).hide();
                        },300)

                    }

                }

                //Watch for changes to the modal-visible attribute
                $scope.$watch('modalShow', function (newValue, oldValue) {
                    $scope.showModal(newValue, attrs.$$element);
                });

                //Update the visible value when the dialog is closed through UI actions (Ok, cancel, etc.)
                $(".close-modal").bind("click", function () {
                    $scope.modalShow=false;
                    if (!$scope.$$phase && !$scope.$root.$$phase)
                        $scope.$apply();
                });

				
				$(".close").bind("click", function () {
                    $scope.modalShow = false;
                    if (!$scope.$$phase && !$scope.$root.$$phase)
                        $scope.$apply();

                    $('#viewComments').click(function (e) {
                        $('#tableID').modal({
                            backdrop: false
                        })



                    });
                });

				
                $(".modal .cancel").bind("click", function () {
                    $scope.modalShow=false;
                    if (!$scope.$$phase && !$scope.$root.$$phase)
                        $scope.$apply();
                });
				///$("#tableID").modal("hide");
            }

        };
    });
})();