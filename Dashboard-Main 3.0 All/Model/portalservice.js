/**
 * Created by vaibhav_parkhi on 10/15/2015.
 */
location_macro.service('portalservice', ['$http', function(http) {

    ///New API for all months data
    this.getTrendedMetricData=function(wsParamObj,currentDeploymentEnv){
        var serviceURL = constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_TRENDED+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&clientGeo="+cleanURL(currentDeploymentEnv,wsParamObj.clientGeo)+"&clientCountry="+cleanURL(currentDeploymentEnv,wsParamObj.clientCountry)+"&dataType="+cleanURL(currentDeploymentEnv,wsParamObj.dataType)+"&dateType="+cleanURL(currentDeploymentEnv,wsParamObj.dateType);
        var config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion},data: {}};
        console.log("serviceURL ----------------:" + serviceURL);
        return  http(config);
    }

    this.getMetricsData = function(wsParamObj,currentDeploymentEnv)
    {
        var serviceURL = constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_METRICS+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&clientGeo="+cleanURL(currentDeploymentEnv,wsParamObj.clientGeo)+"&clientCountry="+cleanURL(currentDeploymentEnv,wsParamObj.clientCountry)+"&dataType="+cleanURL(currentDeploymentEnv,wsParamObj.dataType)+"&dateType="+cleanURL(currentDeploymentEnv,wsParamObj.dateType)+"&startDate="+wsParamObj.startDate;
        var config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion},data: {}};
        console.log("serviceURL :" + serviceURL);
        return  http(config);
    }

    this.getAggregationsData = function(wsParamObj,currentDeploymentEnv)
    {
        var serviceURL = "";
        console.log(wsParamObj.apiversion);
        if(wsParamObj.apiversion==2.2 || wsParamObj.apiversion==3.0){
            serviceURL=constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_AGGREGATION+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&hierarchyPath="+cleanURL(currentDeploymentEnv,wsParamObj.hierarchyPath)+"&aggregationType="+cleanURL(currentDeploymentEnv,wsParamObj.aggregationType)+"&dataType="+cleanURL(currentDeploymentEnv,wsParamObj.dataType)+"&intervalType="+cleanURL(currentDeploymentEnv,wsParamObj.dateType)+"&breakDownFilter="+cleanURL(currentDeploymentEnv,wsParamObj.breakDownFilter)+"&dynamic=true";
        }else{
            serviceURL=constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_AGGREGATION+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&hierarchyPath="+cleanURL(currentDeploymentEnv,wsParamObj.hierarchyPath)+"&aggregationType="+cleanURL(currentDeploymentEnv,wsParamObj.aggregationType)+"&dataType="+cleanURL(currentDeploymentEnv,wsParamObj.dataType)+"&intervalType="+cleanURL(currentDeploymentEnv,wsParamObj.dateType)+"&dynamic=true";
        }
        //var serviceURL2 = constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_AGGREGATION+"clientName="+cleanURL(wsParamObj.clientName)+"&hierarchyPath="+cleanURL(wsParamObj.hierarchyPath)+"&aggregationType="+cleanURL(wsParamObj.aggregationType)+"&dataType="+cleanURL(wsParamObj.dataType)+"&intervalType="+cleanURL(wsParamObj.dateType);
        ///var serviceURL = constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_AGGREGATION+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&hierarchyPath="+cleanURL(currentDeploymentEnv,wsParamObj.hierarchyPath)+"&aggregationType="+cleanURL(currentDeploymentEnv,wsParamObj.aggregationType)+"&dataType="+cleanURL(currentDeploymentEnv,wsParamObj.dataType)+"&intervalType="+cleanURL(currentDeploymentEnv,wsParamObj.dateType)+"&dynamic=true";
        //var serviceURL = "http://localhost:8080/gps_operational_api"+currentDeploymentEnv.DBD_EXTRAPARAM_AGGREGATION+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&hierarchyPath="+cleanURL(currentDeploymentEnv,wsParamObj.hierarchyPath)+"&aggregationType="+cleanURL(currentDeploymentEnv,wsParamObj.aggregationType)+"&dataType="+cleanURL(currentDeploymentEnv,wsParamObj.dataType)+"&intervalType="+cleanURL(currentDeploymentEnv,wsParamObj.dateType)+"&dynamic=true";
        //var serviceURL = "http://9.3.68.40:11111/gps_operational_api/microsite/aggregations?clientName=Pepsico&hierarchyPath=H1%3AAMEA&aggregationType=COUNT&dataType=SLA&intervalType=monthly";//constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_METRICS+"clientName="+cleanURL(wsParamObj.clientName)+"&clientGeo="+cleanURL(wsParamObj.clientGeo)+"&clientCountry="+cleanURL(wsParamObj.clientCountry)+"&dataType="+cleanURL(wsParamObj.dataType)+"&dateType="+cleanURL(wsParamObj.dateType)+"&startDate="+wsParamObj.startDate;
        var config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion},data: {}};
        console.log("serviceURL ............. :" + serviceURL);
        return  http(config);

    }

    this.getFullHierarchy=function(wsParamObj,currentDeploymentEnv){
        var serviceURL = constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_FULLHIERARCHY+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&hierarchyPath="+cleanURL(currentDeploymentEnv,wsParamObj.hierarchyPath)+"&aggregationType="+cleanURL(currentDeploymentEnv,wsParamObj.aggregationType)+"&dataType="+cleanURL(currentDeploymentEnv,wsParamObj.dataType)+"&intervalType="+cleanURL(currentDeploymentEnv,wsParamObj.dateType)+"&breakDownFilter="+cleanURL(currentDeploymentEnv,wsParamObj.breakDownFilter)+"&dynamic=true";
        //var serviceURL = "http://9.3.68.40:11111/gps_operational_api/microsite/aggregations?clientName=Pepsico&hierarchyPath=H1%3AAMEA&aggregationType=COUNT&dataType=SLA&intervalType=monthly";//constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_METRICS+"clientName="+cleanURL(wsParamObj.clientName)+"&clientGeo="+cleanURL(wsParamObj.clientGeo)+"&clientCountry="+cleanURL(wsParamObj.clientCountry)+"&dataType="+cleanURL(wsParamObj.dataType)+"&dateType="+cleanURL(wsParamObj.dateType)+"&startDate="+wsParamObj.startDate;
        var config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion},data: {}};
        console.log("serviceURL getDrillThroughMetricData :" + serviceURL);
        return  http(config);
    }

    this.getHierarchyCommentListData=function(wsParamObj,currentDeploymentEnv){
        var serviceURL = constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_HIERARCHY_COMMENT_LIST+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&hierarchyPath="+cleanURL(currentDeploymentEnv,wsParamObj.hierarchyPath)+"&aggregationType="+cleanURL(currentDeploymentEnv,wsParamObj.aggregationType)+"&dataType="+cleanURL(currentDeploymentEnv,wsParamObj.dataType)+"&intervalType="+cleanURL(currentDeploymentEnv,wsParamObj.dateType)+"&breakDownFilter="+cleanURL(currentDeploymentEnv,wsParamObj.breakDownFilter)+"&dynamic=true";
        //var serviceURL = "http://9.3.68.40:11111/gps_operational_api/microsite/aggregations?clientName=Pepsico&hierarchyPath=H1%3AAMEA&aggregationType=COUNT&dataType=SLA&intervalType=monthly";//constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_METRICS+"clientName="+cleanURL(wsParamObj.clientName)+"&clientGeo="+cleanURL(wsParamObj.clientGeo)+"&clientCountry="+cleanURL(wsParamObj.clientCountry)+"&dataType="+cleanURL(wsParamObj.dataType)+"&dateType="+cleanURL(wsParamObj.dateType)+"&startDate="+wsParamObj.startDate;
        var config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion},data: {}};
        console.log("serviceURL getDrillThroughMetricData :" + serviceURL);
        return  http(config);
    }

    this.getBreakdownSummaryData=function(wsParamObj,currentDeploymentEnv){
        var serviceURL = constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_GEO_BREAKDOWN+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&hierarchyPath="+cleanURL(currentDeploymentEnv,wsParamObj.hierarchyPath)+"&aggregationType="+cleanURL(currentDeploymentEnv,wsParamObj.aggregationType)+"&dataType="+cleanURL(currentDeploymentEnv,wsParamObj.dataType)+"&intervalType="+cleanURL(currentDeploymentEnv,wsParamObj.dateType)+"&breakDownFilter="+cleanURL(currentDeploymentEnv,wsParamObj.breakDownFilter)+"&dynamic=true";
        //var serviceURL = "http://9.3.68.40:11111/gps_operational_api/microsite/aggregations?clientName=Pepsico&hierarchyPath=H1%3AAMEA&aggregationType=COUNT&dataType=SLA&intervalType=monthly";//constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_METRICS+"clientName="+cleanURL(wsParamObj.clientName)+"&clientGeo="+cleanURL(wsParamObj.clientGeo)+"&clientCountry="+cleanURL(wsParamObj.clientCountry)+"&dataType="+cleanURL(wsParamObj.dataType)+"&dateType="+cleanURL(wsParamObj.dateType)+"&startDate="+wsParamObj.startDate;
        var config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion},data: {}};
        console.log("serviceURL getBreakdownSummaryData :" + serviceURL);
        return  http(config);
    }

    this.getDrillThroughMetricData=function(wsParamObj,currentDeploymentEnv){
        /*var serviceURL = constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_DRILLTHROUGH+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&hierarchyPath="+cleanURL(currentDeploymentEnv,wsParamObj.hierarchyPath)+"&status="+cleanURL(currentDeploymentEnv,wsParamObj.status)+"&dataType="+cleanURL(currentDeploymentEnv,wsParamObj.dataType)+"&dateRange="+wsParamObj.dateRange+"&dynamic=true";*/
        if(wsParamObj.apiversion==2.1 || wsParamObj.apiversion==2.2 || wsParamObj.apiversion==3.0){
            var serviceURL = constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_DRILLTHROUGH+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&hierarchyPath="+cleanURL(currentDeploymentEnv,wsParamObj.hierarchyPath)+"&status="+cleanURL(currentDeploymentEnv,wsParamObj.status)+"&dataType="+cleanURL(currentDeploymentEnv,wsParamObj.dataType)+"&aggregationType="+cleanURL(currentDeploymentEnv,wsParamObj.aggregationType)+"&dateRange="+wsParamObj.dateRange+"&dynamic=true";
        }
        else{
            var serviceURL = constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_DRILLTHROUGH+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&hierarchyPath="+cleanURL(currentDeploymentEnv,wsParamObj.hierarchyPath)+"&status="+cleanURL(currentDeploymentEnv,wsParamObj.status)+"&dataType="+cleanURL(currentDeploymentEnv,wsParamObj.dataType)+"&dateRange="+wsParamObj.dateRange+"&dynamic=true";
        }
        //var serviceURL = "http://9.3.68.40:11111/gps_operational_api/microsite/aggregations?clientName=Pepsico&hierarchyPath=H1%3AAMEA&aggregationType=COUNT&dataType=SLA&intervalType=monthly";//constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_METRICS+"clientName="+cleanURL(wsParamObj.clientName)+"&clientGeo="+cleanURL(wsParamObj.clientGeo)+"&clientCountry="+cleanURL(wsParamObj.clientCountry)+"&dataType="+cleanURL(wsParamObj.dataType)+"&dateType="+cleanURL(wsParamObj.dateType)+"&startDate="+wsParamObj.startDate;
        var config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion},data: {}};
        console.log("serviceURL getDrillThroughMetricData :" + serviceURL);
        return  http(config);
    }

    this.getApproverDrillThroughMetricData=function(wsParamObj,currentDeploymentEnv){
        var serviceURL = constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_APPROVER_DRILLTHROUGH+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&hierarchyPath="+cleanURL(currentDeploymentEnv,wsParamObj.hierarchyPath)+"&status="+cleanURL(currentDeploymentEnv,wsParamObj.status)+"&dataType="+cleanURL(currentDeploymentEnv,wsParamObj.dataType)+"&dateRange="+wsParamObj.dateRange+"&dynamic=true";
        //var serviceURL = "http://9.3.68.40:11111/gps_operational_api/microsite/aggregations?clientName=Pepsico&hierarchyPath=H1%3AAMEA&aggregationType=COUNT&dataType=SLA&intervalType=monthly";//constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_METRICS+"clientName="+cleanURL(wsParamObj.clientName)+"&clientGeo="+cleanURL(wsParamObj.clientGeo)+"&clientCountry="+cleanURL(wsParamObj.clientCountry)+"&dataType="+cleanURL(wsParamObj.dataType)+"&dateType="+cleanURL(wsParamObj.dateType)+"&startDate="+wsParamObj.startDate;
        var config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion},data: {}};
        console.log("serviceURL getDrillThroughMetricData :" + serviceURL);
        return  http(config);
    }

    this.getTopTenMetricData=function(wsParamObj,currentDeploymentEnv){
        var serviceURL = constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_TOP_METRICS_DATA+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&dynamic=true";
        var config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion},data: {}};
        console.log("serviceURL getAggregationsMetricData :" + serviceURL);
        return  http(config);
    }

    this.getCommentsData=function(wsParamObj,currentDeploymentEnv){
        var serviceURL = constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_COMMENTS+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&factKey="+wsParamObj.slaFactKey+"&dynamic=true";
        var config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion},data: {}};
        console.log("serviceURL getCommentsData :" + serviceURL);
        return  http(config);
    }

    this.getCommentsPredictiveData=function(wsParamObj,currentDeploymentEnv){
        //var serviceURL = "http://9.3.68.40:11111/gps_operational_api/microsite/commentGraphPredictive?clientName=Pepsico&factKey=168492&predictivePeriod="+6+"&regressionType=LINEAR&dynamic=true";
        var serviceURL = constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_PREDICTIVE+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&factKey="+wsParamObj.slaFactKey+"&predictivePeriod="+wsParamObj.predictivePeriod+"&regressionType=LINEAR&dynamic=true";
        var config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion},data: {}};
        console.log("serviceURL getCommentsData :" + serviceURL);
        return  http(config);
    }

    this.getConfigData=function(wsParamObj,currentDeploymentEnv){
        var serviceURL=null;
        var config=null;
        if(wsParamObj.isLiferay){
            serviceURL =constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_CONFIG+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&dynamic=true";//constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_CONFIG+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&dynamic=true";
            config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': "2.0"},data: {}};
        }else{
            serviceURL ="http://9.3.68.40:11112/gps_operational_api"+currentDeploymentEnv.DBD_EXTRAPARAM_CONFIG+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&dynamic=true";
            config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': "2.0","X_AUTH_TOKEN":"Td9jvC77jEWcpLMdkscXlGbSNCSjQlFU"},data: {}};
        }
        console.log("serviceURL getCommentsData :" + serviceURL);
        return  http(config);
    }

    this.postComment=function(wsParamObj,currentDeploymentEnv,commentObj){
        var serviceURL = null;
        var config =null;
        if(isSupportedAPIVersion(supported2xVersion,wsParamObj.apiversion) || isSupportedAPIVersion(supported3xVersion,wsParamObj.apiversion)){
            if(wsParamObj.isLiferay){
                serviceURL=constructPostCommentURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_ADD_COMMENT+"slaFactKey="+commentObj.factkey+"&content="+cleanComment(currentDeploymentEnv,commentObj.commenttxt)+"&clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&action=POST";
                config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion}};
            }else if(wsParamObj.isLoginServlet){
                serviceURL=constructPostCommentURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_ADD_COMMENT;
                config ={method: 'POST',url: serviceURL,headers: {'X_AUTH_TOKEN': commentObj.commentAPITokenKey,'Content-Type':"application/json",'API_VERSION': wsParamObj.apiversion},data:{"content": cleanComment(currentDeploymentEnv,commentObj.commenttxt), "slaFactKey": commentObj.factkey,"userName":commentObj.userName,"clientName":cleanURL(currentDeploymentEnv,wsParamObj.clientName)}};
            }else{
                serviceURL=constructPostCommentURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_ADD_COMMENT;
                config ={method: 'POST',url: serviceURL,headers: {'X_AUTH_TOKEN': commentObj.commentAPITokenKey,'Content-Type':"application/json",'API_VERSION': wsParamObj.apiversion},data:{"content": cleanComment(currentDeploymentEnv,commentObj.commenttxt), "slaFactKey": commentObj.factkey,"clientName":cleanURL(currentDeploymentEnv,wsParamObj.clientName),"userName":commentObj.userName}};
            }
            return http(config);
        }else{
            if(wsParamObj.isLiferay){
                serviceURL=constructPostCommentURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_ADD_COMMENT+"slaFactKey="+commentObj.factkey+"&content="+cleanComment(currentDeploymentEnv,commentObj.commenttxt)+"&action=POST";
                config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion}};
            }else if(wsParamObj.isLoginServlet){
                serviceURL=constructPostCommentURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_ADD_COMMENT;
                config ={method: 'POST',url: serviceURL,headers: {'X_AUTH_TOKEN': commentObj.commentAPITokenKey,'Content-Type':"application/json",'API_VERSION': wsParamObj.apiversion},data:{"content": cleanComment(currentDeploymentEnv,commentObj.commenttxt), "slaFactKey": commentObj.factkey,"userName":commentObj.userName}};
            }else{
                serviceURL=constructPostCommentURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_ADD_COMMENT;
                config ={method: 'POST',url: serviceURL,headers: {'X_AUTH_TOKEN': commentObj.commentAPITokenKey,'Content-Type':"application/json",'API_VERSION': wsParamObj.apiversion},data:{"content": cleanComment(currentDeploymentEnv,commentObj.commenttxt), "slaFactKey": commentObj.factkey,"userName":commentObj.userName}};
            }
            console.log("serviceURL getCommentsData :" + serviceURL);
            console.log(config);
            return http(config);
        }

    }


    this.postApproverData=function(wsParamObj,currentDeploymentEnv,approverObj){
        var serviceURL = null;
        var config =null;
        if(wsParamObj.apiversion=="2.1" ||wsParamObj.apiversion=="2.2" || wsParamObj.apiversion=="3.0"){
            if(wsParamObj.isLiferay){
                serviceURL=constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_ADD_APPROVER+"&approverMetricData=["+approverObj.approverMetricData+"]&clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&userName="+approverObj.userName;
                config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion}};
            }else if(wsParamObj.isLoginServlet){
                serviceURL=constructPostCommentURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_ADD_APPROVER;
                config ={method: 'POST',url: serviceURL,headers: {'X_AUTH_TOKEN': wsParamObj.apiKey,'Content-Type':"application/json",'API_VERSION': wsParamObj.apiversion},data:{"approverMetricData": approverObj.approverMetricData,"clientName":cleanURL(currentDeploymentEnv,wsParamObj.clientName),"userName":approverObj.userName}};
            }else{
                serviceURL=constructPostCommentURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_ADD_APPROVER;
                config ={method: 'POST',url: serviceURL,headers: {'X_AUTH_TOKEN': wsParamObj.apiKey,'Content-Type':"application/json",'API_VERSION': wsParamObj.apiversion},data:{"approverMetricData": approverObj.approverMetricData,"clientName":cleanURL(currentDeploymentEnv,wsParamObj.clientName),"userName":approverObj.userName}};
            }
        }
        console.log(serviceURL)
        console.log(config);
        return http(config);

    }


    this.getFileList=function(wsParamObj,currentDeploymentEnv){
        var serviceURL = constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_DISPLAY_FILE;
        var config ={method: 'GET', cache: true ,url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion},data: {}};
        console.log("serviceURL getFileList :" + serviceURL);
        return  http(config);
    }

    this.getDownloadFile=function(wsParamObj,currentDeploymentEnv){
        var serviceURL = constructFileAPIURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_DOWNLOAD_FILE+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&slaFactKey="+wsParamObj.fileslaFactKey+"&commentKey="+wsParamObj.fileCommentKey+"&attachmentKey="+wsParamObj.fileAttachmentKey;
        var config ={method: 'GET', cache: true, url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion,'X_AUTH_TOKEN': wsParamObj.apiKey},data: {},responseType: 'arraybuffer'};
        console.log("serviceURL getDownloadFile :" + serviceURL);
        console.log(http(config))
        return  http(config);
    }


    this.exportTOCSV=function(wsParamObj,currentDeploymentEnv){
        var serviceURL = constructFileAPIURI(currentDeploymentEnv)+ currentDeploymentEnv.DBD_EXTRAPARAM_EXPORT_CSV + "clientName=" + cleanURL(currentDeploymentEnv, wsParamObj.clientName) + "&hierarchyPath=" + cleanURL(currentDeploymentEnv, wsParamObj.hierarchyPath) + "&status=" + cleanURL(currentDeploymentEnv, wsParamObj.status) + "&dataType=" + cleanURL(currentDeploymentEnv, wsParamObj.dataType) + "&aggregationType=" + cleanURL(currentDeploymentEnv, wsParamObj.aggregationType) + "&breakDownFilter=" + cleanURL(currentDeploymentEnv, wsParamObj.breakDownFilter);
        var config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion,'X_AUTH_TOKEN': wsParamObj.apiKey},data: {},responseType: 'arraybuffer'};
        console.log("serviceURL getDownloadFile :" + serviceURL);
        console.log(http(config))
        return  http(config);
    }

    this.uploadFile=function(wsParamObj,currentDeploymentEnv){
        var serviceURL = constructFileAPIURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_UPLOAD_FILE;
        console.log(serviceURL);
        return http.post(serviceURL, wsParamObj.formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined,'API_VERSION': wsParamObj.apiversion,'X_AUTH_TOKEN': wsParamObj.apiKey}
        });
    }

    this.deleteFile=function(wsParamObj,currentDeploymentEnv){
        var serviceURL = constructFileAPIURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_DELETE_FILE+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&slaFactKey="+wsParamObj.fileslaFactKey+"&commentKey="+wsParamObj.fileCommentKey+"&attachmentKey="+wsParamObj.fileAttachmentKey;
        var config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion,'X_AUTH_TOKEN': wsParamObj.apiKey},data: {}};
        console.log("serviceURL deleteFile :" + serviceURL);
        return  http(config);
    }

    this.updateComment=function(wsParamObj,currentDeploymentEnv,commentObj){
        var serviceURL = null;
        var config =null;
        if(wsParamObj.isLiferay){
            serviceURL = constructPostCommentURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_ADD_COMMENT+"action=updatecomment&clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&userKey="+commentObj.userKey+"&commentContent="+cleanComment(currentDeploymentEnv,commentObj.commenttxt)+"&commentKey="+commentObj.commentKey;
            config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion,'X_AUTH_TOKEN': wsParamObj.apiKey},data: {}};
            console.log("serviceURL deleteFile :" + serviceURL);
        }else{
            serviceURL = constructPostCommentURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_ADD_COMMENT+"/updatecomment?clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&userKey="+commentObj.userKey+"&commentContent="+cleanComment(currentDeploymentEnv,commentObj.commenttxt)+"&commentKey="+commentObj.commentKey;
            config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion,'X_AUTH_TOKEN': wsParamObj.apiKey},data: {}};
        }
        return  http(config);
    }

    this.deleteComment=function(wsParamObj,currentDeploymentEnv,commentObj){
        var serviceURL = null;
        var config =null;
        if(wsParamObj.isLiferay){
            serviceURL = constructPostCommentURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_ADD_COMMENT+"action=deletecomment&clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&userKey="+commentObj.userKey+"&commentKey="+commentObj.commentKey;
            config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion,'X_AUTH_TOKEN': wsParamObj.apiKey},data: {}};
            console.log("serviceURL deleteFile :" + serviceURL);
        }else{
            serviceURL = constructPostCommentURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_ADD_COMMENT+"/deletecomment?clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&userKey="+commentObj.userKey+"&commentKey="+commentObj.commentKey;
            config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion,'X_AUTH_TOKEN': wsParamObj.apiKey},data: {}};
            console.log("serviceURL deleteFile :" + serviceURL);
        }

        return  http(config);
    }

    this.getApproverDrillThroughMetricData=function(wsParamObj,currentDeploymentEnv){
        var serviceURL = constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_APPROVER_DRILLTHROUGH+"clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&hierarchyPath="+cleanURL(currentDeploymentEnv,wsParamObj.hierarchyPath)+"&status="+cleanURL(currentDeploymentEnv,wsParamObj.status)+"&dataType="+cleanURL(currentDeploymentEnv,wsParamObj.dataType)+"&dateRange="+wsParamObj.dateRange+"&dynamic=true";
        //var serviceURL = "http://9.3.68.40:11111/gps_operational_api/microsite/aggregations?clientName=Pepsico&hierarchyPath=H1%3AAMEA&aggregationType=COUNT&dataType=SLA&intervalType=monthly";//constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_METRICS+"clientName="+cleanURL(wsParamObj.clientName)+"&clientGeo="+cleanURL(wsParamObj.clientGeo)+"&clientCountry="+cleanURL(wsParamObj.clientCountry)+"&dataType="+cleanURL(wsParamObj.dataType)+"&dateType="+cleanURL(wsParamObj.dateType)+"&startDate="+wsParamObj.startDate;
        var config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion},data: {}};
        console.log("serviceURL getDrillThroughMetricData :" + serviceURL);
        return  http(config);
    }

    this.postApproverData=function(wsParamObj,currentDeploymentEnv,approverObj){
        var serviceURL = null;
        var config =null;
        if(wsParamObj.apiversion=="2.1" || wsParamObj.apiversion=="2.2" || wsParamObj.apiversion=="3.0"){
            if(wsParamObj.isLiferay){
                serviceURL=constructURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_ADD_APPROVER+"&approverMetricData=["+approverObj.approverMetricData+"]&clientName="+cleanURL(currentDeploymentEnv,wsParamObj.clientName)+"&userName="+approverObj.userName;
                config ={method: 'GET',url: serviceURL,headers: {'API_VERSION': wsParamObj.apiversion}};
            }else if(wsParamObj.isLoginServlet){
                serviceURL=constructPostCommentURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_ADD_APPROVER;
                config ={method: 'POST',url: serviceURL,headers: {'X_AUTH_TOKEN': wsParamObj.apiKey,'Content-Type':"application/json",'API_VERSION': wsParamObj.apiversion},data:{"approverMetricData": approverObj.approverMetricData,"clientName":cleanURL(currentDeploymentEnv,wsParamObj.clientName),"userName":approverObj.userName}};
            }else{
                serviceURL=constructPostCommentURI(currentDeploymentEnv)+currentDeploymentEnv.DBD_EXTRAPARAM_ADD_APPROVER;
                config ={method: 'POST',url: serviceURL,headers: {'X_AUTH_TOKEN': wsParamObj.apiKey,'Content-Type':"application/json",'API_VERSION': wsParamObj.apiversion},data:{"approverMetricData": approverObj.approverMetricData,"clientName":cleanURL(currentDeploymentEnv,wsParamObj.clientName),"userName":approverObj.userName}};
            }
        }
        console.log(serviceURL);
        return http(config);

    }



}]);
