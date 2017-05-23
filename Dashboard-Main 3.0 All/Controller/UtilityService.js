/**
 * Created by vaibhav_parkhi on 11/2/2015.
 */
location_macro.factory("utilityService",function(){
    var utilityFactory={};
    utilityFactory.convertToMonthDateFormat = function (timestamp) {
        if (timestamp.indexOf("days") != -1) {
            return timestamp;
        } else {
            var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            var year = timestamp.substring(0, 4);
            var month = timestamp.substring(4, 6);
            var date = timestamp.substring(6, 8);
            var time = this.convertToTimeStamp(parseInt(year), parseInt(month), parseInt(date), 16, 0, 0);
            var date = new Date(time);
            return date.getDate() + " - " + monthArr[date.getMonth()];
        }

    }
    utilityFactory.convertToYearMonthFormat=function(timestamp) {
        var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var date = new Date(timestamp);
        ///alert(date.toDateString());
        return monthArr[date.getMonth()] + " " + date.getFullYear();
    }
    ///convert the date format of 20151015 to 25-May
    utilityFactory.convertToTimeStamp=function (year, month, day, hour, minute, second) {
        var datum = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
        return datum.getTime();

    }
    utilityFactory.convertToYYYYMMDDFormat=function (timestamp) {
        var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var date = new Date(timestamp);
        return date.getFullYear() + " / " + this.showTwoDigit(parseInt(date.getMonth() + 1)) + " / " + this.showTwoDigit(date.getDate());
    }
    utilityFactory.showTwoDigit=function(value) {
        if (value < 10) {
            return "0" + value;
        } else {
            return value;
        }
    }

    utilityFactory. getIdOfSLA=function(str) {
        /*if (str.lastIndexOf('-') != -1) {
            console.log(str.substring(0, str.lastIndexOf('-')))
            return str.substring(0, str.lastIndexOf('-')).trim();
        }else{
            return str;
        }*/
        return str;
    }
    //check for duplicate value in array
    utilityFactory.arrayContains=function(arr, val, equals) {
        var i = arr.length;
        while (i--) {
            if (equals(arr[i], val)) {
                return true;
            }
        }
        return false;
    }

    // remove duplicate element from input array
    utilityFactory.removeDuplicates=function (arr, equals) {
        var originalArr = arr.slice(0);
        var i, len, j, val;
        arr.length = 0;

        for (i = 0, len = originalArr.length; i < len; ++i) {
            val = originalArr[i];
            if (!this.arrayContains(arr, val, equals)) {
                arr.push(val);
            }
        }
    }
    utilityFactory.removeSpecialCharacter=function(str){
        return str;//.replace("�","-");
    }

    utilityFactory.formatMetricDataTypes=function(data,type,clientName){
        switch(type.toLowerCase()){
            case "percentage":

                if(clientName=="JDE"){
                    return data != null ? Math.abs(data * 100).toFixed(0)+"%":"N/A";
                }else{
                    return data != null ? Math.abs(data * 100).toFixed(2)+"%":"N/A";
                }

            case "dollar":
                return data != null ? "$"+data:"N/A";
            case "count":
                return  data != null ? data:"N/A";
            case "days":
                return  data != null ? data+" Days":"N/A";
            default:
                return data != null ? data:"N/A";

        }
    }
    utilityFactory.formatMetricGraphData=function(data,type,$scope){
        switch(type.toLowerCase().trim()){
            case "percentage":
                    $scope.valueTypeSymbol = "%";
                return data != null ? Math.abs(data * 100).toFixed(2):0;
            case "dollar":
                return data != null ? data:0;
            case "count":
                    $scope.valueTypeSymbol = "";
                    return data != null ? data:0;
            case "days":
                return data != null ? data:0;
            default:
                return data != null ? data:0;

        }
    }

    utilityFactory.formatMetricSearchData = function (data, type, $scope,searchArrObj) {
        console.log(data)
        switch (type.toLowerCase().trim()) {
            case "percentage":
                searchArrObj.searchMetricTypeSymbol = "%";
                return data != null ? Math.abs(data * 100).toFixed(2) : 0;
            case "dollar":
                return data != null ? data : 0;
            case "count":
                searchArrObj.searchMetricTypeSymbol = "";
                return data != null ? data : 0;
            case "days":
                return data != null ? data : 0;
            default:
                return data != null ? data : 0;

        }
    }

    utilityFactory.convertToHyperLink=function(str)
    {
        var reg_exUrl = "/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/";

        console.log(str.replace(reg_exUrl,"<a target=_blank href=reg_exUrl>reg_exUrl</a>"));
        return

    }
    utilityFactory.handleSingleQuote=function(str)
    {
        return str.replace(new RegExp("'",'g'),"''''");

    }
    utilityFactory.calculateTrends = function (selectedMonthRecord, previousMonthRecord) {
        if (selectedMonthRecord > previousMonthRecord) {
            return "U";
        } else if (selectedMonthRecord < previousMonthRecord) {
            return "D";
        } else if ((selectedMonthRecord == previousMonthRecord) || selectedMonthRecord == "UNKNOWN" || previousMonthRecord == "UNKNOWN" || selectedMonthRecord == null || previousMonthRecord == null) {
            return "S";
        }

    }
    //only calculate for min,max & target value with data type
    utilityFactory.findMaxNumber=function(value1,value2,value3,type){
        var maxValue=0;
        ///console.log(type);
        if(type.toLowerCase()=="count" || type.toLowerCase()=="dollar" || type.toLowerCase()=="days"){
            /////console.log(value1+""+value2+""+value3);
            maxValue=Math.max(parseInt(value1),parseInt(value2),parseInt(value3));
        }

        return maxValue;
    }

    utilityFactory.percentageOfBarGraph=function(rec,maxValue,subType){
        var calValPercentageVal=0;
            if(subType=="min"){
                calValPercentageVal=(rec.min/maxValue)*100;
                return calValPercentageVal;
            }else if(subType=="target"){
                calValPercentageVal=(rec.target/maxValue)*100;
                return calValPercentageVal;
            }else if(subType=="actual"){
                calValPercentageVal=(rec.actual/maxValue)*100;
                return calValPercentageVal;
            }
    }
    utilityFactory.dateFormatter=function(value){
        ///var dateTime = new Date(value);
        var dateTime = moment(value).format("YYYY-MM-DD HH:mm:ss");
        return dateTime;
    }
    utilityFactory.formatTrendDiff=function(value){

        if(Math.sign(value) === 1){
            return value != null ? Math.abs(value * 100).toFixed(2)+"%":"N/A";
        }else if(Math.sign(value) === -1){
            return value != null ? "-"+Math.abs(value * 100).toFixed(2)+"%":"N/A";
        }else if(value==0) {
            return value != null ? Math.abs(value * 100).toFixed(2)+"%":"N/A";
        }
        return value;
    }
    return utilityFactory;
});