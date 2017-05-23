/**
 * Created by vaibhav_parkhi on 4/28/2016.
 */

/**
  * This file hold the all dashboard related constants and deployment environment variables
 */
var AUSTIN_DEV_ENV={
    DBD_ENV:"AUSTIN_DEV_ENV",
    DBD_PROTOCOL:"http",
    DBD_IP_ADDRESS:"9.3.68.40",
    DBD_PORT_NUMBER:"11111",
    DBD_POST_COMMENT_PORT_NUMBER:"11112",
    DBD_WS_PATH:"/gps_operational_api",
    DBD_WS_PATH_COMMENT:"/gps_operational_api",
    DBD_WS_PATH_FILEAPI:"/gps_operational_api",
    DBD_EXTRAPARAM_METRICS:"/microsite/metrics?",
    DBD_EXTRAPARAM_TRENDED:"/microsite/trended?",
    DBD_EXTRAPARAM_INTERVAL:"/metadata/intervals?",
    DBD_EXTRAPARAM_AGGREGATION:"/microsite/aggregations?",
    DBD_EXTRAPARAM_DRILLTHROUGH:"/microsite/drillThrough?",
    DBD_EXTRAPARAM_COMMENTS:"/microsite/commentGraph?",
    DBD_EXTRAPARAM_ADD_COMMENT:"/comments",
    DBD_EXTRAPARAM_TOP_METRICS_DATA:"/microsite/topMetricsData?",
    DBD_EXTRAPARAM_PREDICTIVE:"/microsite/commentGraphPredictive?",
    DBD_EXTRAPARAM_CONFIG:"/microsite/config?",
    DBD_EXTRAPARAM_APPROVER_DRILLTHROUGH:"/microsite/approverDrillThrough?",
    DBD_EXTRAPARAM_ADD_APPROVER:"/approver",
    DBD_EXTRAPARAM_SLADASH:"/microsite/sladash?",
    DBD_EXTRAPARAM_SLADASH_GRAPH:"/microsite/sladashgraph?",
    DBD_EXTRAPARAM_LISTSLA_COMMENT:"/microsite/listslacomment?",
    DBD_EXTRAPARAM_SLAGRAPH_COMMENT:"/slagraphcomment",
    DBD_EXTRAPARAM_FULLHIERARCHY:"/microsite/fullhierarchy?",
    DBD_EXTRAPARAM_HIERARCHY_COMMENT_LIST:"/microsite/hierarchycommentlist?",
    DBD_EXTRAPARAM_UPLOAD_FILE:"/fileapi/upload",
    DBD_EXTRAPARAM_DOWNLOAD_FILE:"/fileapi/download?",
    DBD_EXTRAPARAM_DISPLAY_FILE:"/fileapi/displayfiles",
    DBD_EXTRAPARAM_DELETE_FILE:"/fileapi/deletefile?",
    DBD_EXTRAPARAM_EXPORT_CSV:"/fileapi/exportCSV?",
    DBD_EXTRAPARAM_GEO_BREAKDOWN:"/microsite/geodrillcount?",
    DBD_EXTRAPARAM_UPDATE_COMMENT:"/updatecomment?",
    DBD_EXTRAPARAM_DELETE_COMMENT:"/deletecomment?",
};

///QC ENVIRONMENT;
var AUSTIN_QC_PROXY_ENV={
    DBD_ENV:"AUSTIN_QC_PROXY_ENV",
    DBD_PROTOCOL:"https",
    DBD_IP_ADDRESS:"9.3.68.69",
    DBD_PORT_NUMBER:"9443",
    DBD_WS_PATH:"/microsite/dashboard?",
    DBD_EXTRAPARAM_METRICS:"webservice=metrics&",
    DBD_EXTRAPARAM_INTERVAL:"webservice=intervals&"
};

///AUSTIN DEVELOPMENT PROXY ENVIRONMENT;
var AUSTIN_DEV_PROXY_ENV={
    DBD_ENV:"AUSTIN_DEV_PROXY_ENV",
    DBD_PROTOCOL:"https",
    DBD_IP_ADDRESS:"9.3.68.241",
    DBD_PORT_NUMBER:"9443",
    DBD_WS_PATH:"/login/dashboard?",
    DBD_EXTRAPARAM_METRICS:"webservice=metrics&",
    DBD_EXTRAPARAM_TRENDED:"/microsite/trended?",
    DBD_EXTRAPARAM_INTERVAL:"webservice=intervals&"
};
///SLA STAGING PROXY ENVIRONMENT WITH NON AUTHENTICATION;;
var SLA_STAGING_PROXY_ENV={
    DBD_ENV:"SLA_STAGING_PROXY_ENV",
    DBD_PROTOCOL:"https",
    DBD_IP_ADDRESS:"sldcmstg.gps.ihost.com",
    DBD_PORT_NUMBER:"",
    DBD_POST_COMMENT_PORT_NUMBER:"",
    DBD_WS_PATH:"/gps_operational_api",
    DBD_WS_PATH_COMMENT:"/gps_operational_api",
    DBD_EXTRAPARAM_METRICS:"/microsite/metrics?",
    DBD_EXTRAPARAM_TRENDED:"/microsite/trended?",
    DBD_EXTRAPARAM_INTERVAL:"/metadata/intervals?",
    DBD_EXTRAPARAM_AGGREGATION:"/microsite/aggregations?",
    DBD_EXTRAPARAM_DRILLTHROUGH:"/microsite/drillThrough?",
    DBD_EXTRAPARAM_COMMENTS:"/microsite/commentGraph?",
    DBD_EXTRAPARAM_ADD_COMMENT:"/comments",
    DBD_EXTRAPARAM_TOP_METRICS_DATA:"/microsite/topMetricsData?",
    DBD_EXTRAPARAM_PREDICTIVE:"/microsite/commentGraphPredictive?",
    DBD_EXTRAPARAM_CONFIG:"/microsite/config?",
    DBD_EXTRAPARAM_SLADASH:"/microsite/sladash?",
    DBD_EXTRAPARAM_SLADASH_GRAPH:"/microsite/sladashgraph?",
    DBD_EXTRAPARAM_LISTSLA_COMMENT:"/microsite/listslacomment?",
    DBD_EXTRAPARAM_SLAGRAPH_COMMENT:"/slagraphcomment"
};


///SLA PRODUCTION PROXY ENVIRONMENT WITH NON AUTHENTICATION;
var SLA_PRODUCTION_PROXY_ENV={
    DBD_ENV:"SLA_PRODUCTION_PROXY_ENV",
    DBD_PROTOCOL:"https",
    DBD_IP_ADDRESS:"sldcmwas.gps.ihost.com",
    DBD_PORT_NUMBER:"",
    DBD_POST_COMMENT_PORT_NUMBER:"",
    DBD_WS_PATH:"/gps_operational_api",
    DBD_WS_PATH_COMMENT:"/gps_operational_api",
    DBD_EXTRAPARAM_METRICS:"/microsite/metrics?",
    DBD_EXTRAPARAM_TRENDED:"/microsite/trended?",
    DBD_EXTRAPARAM_INTERVAL:"/metadata/intervals?",
    DBD_EXTRAPARAM_AGGREGATION:"/microsite/aggregations?",
    DBD_EXTRAPARAM_DRILLTHROUGH:"/microsite/drillThrough?",
    DBD_EXTRAPARAM_COMMENTS:"/microsite/commentGraph?",
    DBD_EXTRAPARAM_ADD_COMMENT:"/comments",
    DBD_EXTRAPARAM_TOP_METRICS_DATA:"/microsite/topMetricsData?",
    DBD_EXTRAPARAM_PREDICTIVE:"/microsite/commentGraphPredictive?",
    DBD_EXTRAPARAM_CONFIG:"/microsite/config?",
    DBD_EXTRAPARAM_SLADASH:"/microsite/sladash?",
    DBD_EXTRAPARAM_SLADASH_GRAPH:"/microsite/sladashgraph?",
    DBD_EXTRAPARAM_LISTSLA_COMMENT:"/microsite/listslacomment?",
    DBD_EXTRAPARAM_SLAGRAPH_COMMENT:"/slagraphcomment"
};

// LIFERAY DEV PROXY ENVIRONMENT
var LIFERAY_DEV_PROXY_ENV={
    DBD_ENV:"LIFERAY_DEV_PROXY_ENV",
    DBD_PROTOCOL:"https",
    DBD_IP_ADDRESS:"9.3.68.25",
    DBD_PORT_NUMBER:"9444",
    DBD_POST_COMMENT_PORT_NUMBER:"9444",
    DBD_WS_PATH:"/api/jsonws/vantage-admin-service-portlet.dashboard/get-dashboard-data/data/",
    DBD_WS_PATH_COMMENT:"/api/jsonws/vantage-admin-service-portlet.dashboard",
    DBD_WS_PATH_FILEAPI:"/gps_operational_api",
    DBD_EXTRAPARAM_METRICS:"webservice=metrics&",
    DBD_EXTRAPARAM_TRENDED:"webservice=trended&",
    DBD_EXTRAPARAM_INTERVAL:"webservice=intervals&",
    DBD_EXTRAPARAM_AGGREGATION:"webservice=aggregations&",
    DBD_EXTRAPARAM_DRILLTHROUGH:"webservice=drillThrough&",
    DBD_EXTRAPARAM_COMMENTS:"webservice=commentGraph&",
    DBD_EXTRAPARAM_ADD_COMMENT:"/comments/data/",
    DBD_EXTRAPARAM_TOP_METRICS_DATA:"webservice=topMetrics&",
    DBD_EXTRAPARAM_PREDICTIVE:"webservice=commentGraphPredictive&",
    DBD_EXTRAPARAM_CONFIG:"webservice=config&",
    DBD_EXTRAPARAM_APPROVER_DRILLTHROUGH:"webservice=approverDrillThrough&",
    DBD_EXTRAPARAM_ADD_APPROVER:"webservice=approver&",
    DBD_EXTRAPARAM_SLADASH:"webservice=sladash&",
    DBD_EXTRAPARAM_SLADASH_GRAPH:"webservice=sladashgraph&",
    DBD_EXTRAPARAM_LISTSLA_COMMENT:"webservice=listslacomment&",
    DBD_EXTRAPARAM_SLAGRAPH_COMMENT:"webservice=slagraphcomment&",
    DBD_EXTRAPARAM_FULLHIERARCHY:"webservice=fullhierarchy&",
    DBD_EXTRAPARAM_HIERARCHY_COMMENT_LIST:"webservice=hierarchycommentlist&",
    DBD_EXTRAPARAM_UPLOAD_FILE:"/fileapi/upload",
    DBD_EXTRAPARAM_DOWNLOAD_FILE:"/fileapi/download?",
    DBD_EXTRAPARAM_DISPLAY_FILE:"/fileapi/displayfiles",
    DBD_EXTRAPARAM_DELETE_FILE:"/fileapi/deletefile?",
    DBD_EXTRAPARAM_GEO_BREAKDOWN:"/microsite/geodrillcount?",

};

// LIFERAY DEV PROXY CHINA ENVIRONMENT
var LIFERAY_DEV_PROXY_CHINA_ENV={
    DBD_ENV:"LIFERAY_DEV_PROXY_ENV",
    DBD_PROTOCOL:"https",
    DBD_IP_ADDRESS:"9.3.68.241",
    DBD_PORT_NUMBER:"9444",
    DBD_POST_COMMENT_PORT_NUMBER:"9444",
    DBD_WS_PATH:"/api/jsonws/vantage-admin-service-portlet.dashboard/get-dashboard-data/data/",
    DBD_WS_PATH_COMMENT:"/api/jsonws/vantage-admin-service-portlet.dashboard",
    DBD_WS_PATH_FILEAPI:"/gps_operational_api",
    DBD_EXTRAPARAM_METRICS:"webservice=metrics&",
    DBD_EXTRAPARAM_TRENDED:"webservice=trended&",
    DBD_EXTRAPARAM_INTERVAL:"webservice=intervals&",
    DBD_EXTRAPARAM_AGGREGATION:"webservice=aggregations&",
    DBD_EXTRAPARAM_DRILLTHROUGH:"webservice=drillThrough&",
    DBD_EXTRAPARAM_COMMENTS:"webservice=commentGraph&",
    DBD_EXTRAPARAM_ADD_COMMENT:"/comments/data/",
    DBD_EXTRAPARAM_TOP_METRICS_DATA:"webservice=topMetrics&",
    DBD_EXTRAPARAM_PREDICTIVE:"webservice=commentGraphPredictive&",
    DBD_EXTRAPARAM_CONFIG:"webservice=config&",
    DBD_EXTRAPARAM_APPROVER_DRILLTHROUGH:"webservice=approverDrillThrough&",
    DBD_EXTRAPARAM_ADD_APPROVER:"webservice=approver&",
    DBD_EXTRAPARAM_SLADASH:"webservice=sladash&",
    DBD_EXTRAPARAM_SLADASH_GRAPH:"webservice=sladashgraph&",
    DBD_EXTRAPARAM_LISTSLA_COMMENT:"webservice=listslacomment&",
    DBD_EXTRAPARAM_SLAGRAPH_COMMENT:"webservice=slagraphcomment&",
    DBD_EXTRAPARAM_FULLHIERARCHY:"webservice=fullhierarchy&",
    DBD_EXTRAPARAM_HIERARCHY_COMMENT_LIST:"webservice=hierarchycommentlist&"
};



// LIFERAY STAGING PROXY ENVIRONMENT
var LIFERAY_STAGING_PROXY_ENV={
    DBD_ENV:"LIFERAY_STAGING_PROXY_ENV",
    DBD_PROTOCOL:"https",
    DBD_IP_ADDRESS:"sldcmstg.gps.ihost.com",
    DBD_PORT_NUMBER:"",
    DBD_POST_COMMENT_PORT_NUMBER:"",
    DBD_WS_PATH:"/api/jsonws/vantage-admin-service-portlet.dashboard/get-dashboard-data/data/",
    DBD_WS_PATH_COMMENT:"/api/jsonws/vantage-admin-service-portlet.dashboard",
    DBD_WS_PATH_FILEAPI:"/gps_operational_upload",
    DBD_EXTRAPARAM_METRICS:"webservice=metrics&",
    DBD_EXTRAPARAM_TRENDED:"webservice=trended&",
    DBD_EXTRAPARAM_INTERVAL:"webservice=intervals&",
    DBD_EXTRAPARAM_AGGREGATION:"webservice=aggregations&",
    DBD_EXTRAPARAM_DRILLTHROUGH:"webservice=drillThrough&",
    DBD_EXTRAPARAM_COMMENTS:"webservice=commentGraph&",
    DBD_EXTRAPARAM_ADD_COMMENT:"/comments/data/",
    DBD_EXTRAPARAM_TOP_METRICS_DATA:"webservice=topMetrics&",
    DBD_EXTRAPARAM_PREDICTIVE:"webservice=commentGraphPredictive&",
    DBD_EXTRAPARAM_CONFIG:"webservice=config&",
    DBD_EXTRAPARAM_APPROVER_DRILLTHROUGH:"webservice=approverDrillThrough&",
    DBD_EXTRAPARAM_ADD_APPROVER:"webservice=approver&",
    DBD_EXTRAPARAM_SLADASH:"webservice=sladash&",
    DBD_EXTRAPARAM_SLADASH_GRAPH:"webservice=sladashgraph&",
    DBD_EXTRAPARAM_LISTSLA_COMMENT:"webservice=listslacomment&",
    DBD_EXTRAPARAM_SLAGRAPH_COMMENT:"webservice=slagraphcomment&",
    DBD_EXTRAPARAM_FULLHIERARCHY:"webservice=fullhierarchy&",
    DBD_EXTRAPARAM_HIERARCHY_COMMENT_LIST:"webservice=hierarchycommentlist&",
    DBD_EXTRAPARAM_UPLOAD_FILE:"/fileapi/upload",
    DBD_EXTRAPARAM_DOWNLOAD_FILE:"/fileapi/download?",
    DBD_EXTRAPARAM_DISPLAY_FILE:"/fileapi/displayfiles",
    DBD_EXTRAPARAM_DELETE_FILE:"/fileapi/deletefile?",
    DBD_EXTRAPARAM_EXPORT_CSV:"/fileapi/exportCSV?",
    DBD_EXTRAPARAM_GEO_BREAKDOWN:"webservice=geodrillcount&",
    DBD_EXTRAPARAM_UPDATE_COMMENT:"action=updatecomment&",
    DBD_EXTRAPARAM_DELETE_COMMENT:"action=deletecomment&"


};

// LIFERAY PRODUCTION PROXY ENVIRONMENT
var LIFERAY_PRODUCTION_PROXY_ENV={
    DBD_ENV:"LIFERAY_PRODUCTION_PROXY_ENV",
    DBD_PROTOCOL:"https",
    DBD_IP_ADDRESS:"sldcmwas.gps.ihost.com",
    DBD_PORT_NUMBER:"",
    DBD_POST_COMMENT_PORT_NUMBER:"",
    DBD_WS_PATH:"/api/jsonws/vantage-admin-service-portlet.dashboard/get-dashboard-data/data/",
    DBD_WS_PATH_COMMENT:"/api/jsonws/vantage-admin-service-portlet.dashboard",
    DBD_WS_PATH_FILEAPI:"/gps_operational_upload",
    DBD_EXTRAPARAM_METRICS:"webservice=metrics&",
    DBD_EXTRAPARAM_TRENDED:"webservice=trended&",
    DBD_EXTRAPARAM_INTERVAL:"webservice=intervals&",
    DBD_EXTRAPARAM_AGGREGATION:"webservice=aggregations&",
    DBD_EXTRAPARAM_DRILLTHROUGH:"webservice=drillThrough&",
    DBD_EXTRAPARAM_COMMENTS:"webservice=commentGraph&",
    DBD_EXTRAPARAM_ADD_COMMENT:"/comments/data/",
    DBD_EXTRAPARAM_TOP_METRICS_DATA:"webservice=topMetrics&",
    DBD_EXTRAPARAM_PREDICTIVE:"webservice=commentGraphPredictive&",
    DBD_EXTRAPARAM_CONFIG:"webservice=config&",
    DBD_EXTRAPARAM_APPROVER_DRILLTHROUGH:"webservice=approverDrillThrough&",
    DBD_EXTRAPARAM_ADD_APPROVER:"webservice=approver&",
    DBD_EXTRAPARAM_SLADASH:"webservice=sladash&",
    DBD_EXTRAPARAM_SLADASH_GRAPH:"webservice=sladashgraph&",
    DBD_EXTRAPARAM_LISTSLA_COMMENT:"webservice=listslacomment&",
    DBD_EXTRAPARAM_SLAGRAPH_COMMENT:"webservice=slagraphcomment&",
    DBD_EXTRAPARAM_FULLHIERARCHY:"webservice=fullhierarchy&",
    DBD_EXTRAPARAM_HIERARCHY_COMMENT_LIST:"webservice=hierarchycommentlist&",
    DBD_EXTRAPARAM_UPLOAD_FILE:"/fileapi/upload",
    DBD_EXTRAPARAM_DOWNLOAD_FILE:"/fileapi/download?",
    DBD_EXTRAPARAM_DISPLAY_FILE:"/fileapi/displayfiles",
    DBD_EXTRAPARAM_DELETE_FILE:"/fileapi/deletefile?",
    DBD_EXTRAPARAM_EXPORT_CSV:"/fileapi/exportCSV?",
    DBD_EXTRAPARAM_GEO_BREAKDOWN:"webservice=geodrillcount&",
    DBD_EXTRAPARAM_UPDATE_COMMENT:"action=updatecomment&",
    DBD_EXTRAPARAM_DELETE_COMMENT:"action=deletecomment&"
};

// LIFERAY QC PROXY ENVIRONMENT
var LIFERAY_QC_PROXY_ENV={
    DBD_ENV:"LIFERAY_QC_PROXY_ENV",
    DBD_PROTOCOL:"https",
    DBD_IP_ADDRESS:"gpscvqc.austin.ibm.com",
    DBD_PORT_NUMBER:"443",
    DBD_POST_COMMENT_PORT_NUMBER:"443",
    DBD_WS_PATH:"/api/jsonws/vantage-admin-service-portlet.dashboard/get-dashboard-data/data/",
    DBD_WS_PATH_COMMENT:"/api/jsonws/vantage-admin-service-portlet.dashboard",
    DBD_WS_PATH_FILEAPI:"/gps_operational_api",
    DBD_EXTRAPARAM_METRICS:"webservice=metrics&",
    DBD_EXTRAPARAM_TRENDED:"webservice=trended&",
    DBD_EXTRAPARAM_INTERVAL:"webservice=intervals&",
    DBD_EXTRAPARAM_AGGREGATION:"webservice=aggregations&",
    DBD_EXTRAPARAM_DRILLTHROUGH:"webservice=drillThrough&",
    DBD_EXTRAPARAM_COMMENTS:"webservice=commentGraph&",
    DBD_EXTRAPARAM_ADD_COMMENT:"/comments/data/",
    DBD_EXTRAPARAM_TOP_METRICS_DATA:"webservice=topMetrics&",
    DBD_EXTRAPARAM_PREDICTIVE:"webservice=commentGraphPredictive&",
    DBD_EXTRAPARAM_CONFIG:"webservice=config&",
    DBD_EXTRAPARAM_APPROVER_DRILLTHROUGH:"webservice=approverDrillThrough&",
    DBD_EXTRAPARAM_ADD_APPROVER:"webservice=approver&",
    DBD_EXTRAPARAM_SLADASH:"webservice=sladash&",
    DBD_EXTRAPARAM_SLADASH_GRAPH:"webservice=sladashgraph&",
    DBD_EXTRAPARAM_LISTSLA_COMMENT:"webservice=listslacomment&",
    DBD_EXTRAPARAM_SLAGRAPH_COMMENT:"webservice=slagraphcomment&",
    DBD_EXTRAPARAM_FULLHIERARCHY:"webservice=fullhierarchy&",
    DBD_EXTRAPARAM_HIERARCHY_COMMENT_LIST:"webservice=hierarchycommentlist&",
    DBD_EXTRAPARAM_UPLOAD_FILE:"/fileapi/upload",
    DBD_EXTRAPARAM_DOWNLOAD_FILE:"/fileapi/download?",
    DBD_EXTRAPARAM_DISPLAY_FILE:"/fileapi/displayfiles",
    DBD_EXTRAPARAM_DELETE_FILE:"/fileapi/deletefile?",
    DBD_EXTRAPARAM_EXPORT_CSV:"/fileapi/exportCSV?",
    DBD_EXTRAPARAM_GEO_BREAKDOWN:"webservice=geodrillcount&",
    /*DBD_EXTRAPARAM_UPDATE_COMMENT:"/comments/updatecomment?",
    DBD_EXTRAPARAM_DELETE_COMMENT:"/comments/deletecomment?"*/
};


// LIFERAY QC PROXY ENVIRONMENT
var LIFERAY_QC_PROXY_ENV={
    DBD_ENV:"LIFERAY_QC_PROXY_ENV",
    DBD_PROTOCOL:"https",
    DBD_IP_ADDRESS:"gpscvqc.austin.ibm.com",
    DBD_PORT_NUMBER:"443",
    DBD_POST_COMMENT_PORT_NUMBER:"443",
    DBD_WS_PATH:"/api/jsonws/vantage-admin-service-portlet.dashboard/get-dashboard-data/data/",
    DBD_WS_PATH_COMMENT:"/api/jsonws/vantage-admin-service-portlet.dashboard",
    DBD_WS_PATH_FILEAPI:"/gps_operational_api",
    DBD_EXTRAPARAM_METRICS:"webservice=metrics&",
    DBD_EXTRAPARAM_TRENDED:"webservice=trended&",
    DBD_EXTRAPARAM_INTERVAL:"webservice=intervals&",
    DBD_EXTRAPARAM_AGGREGATION:"webservice=aggregations&",
    DBD_EXTRAPARAM_DRILLTHROUGH:"webservice=drillThrough&",
    DBD_EXTRAPARAM_COMMENTS:"webservice=commentGraph&",
    DBD_EXTRAPARAM_ADD_COMMENT:"/comments/data/",
    DBD_EXTRAPARAM_TOP_METRICS_DATA:"webservice=topMetrics&",
    DBD_EXTRAPARAM_PREDICTIVE:"webservice=commentGraphPredictive&",
    DBD_EXTRAPARAM_CONFIG:"webservice=config&",
    DBD_EXTRAPARAM_APPROVER_DRILLTHROUGH:"webservice=approverDrillThrough&",
    DBD_EXTRAPARAM_ADD_APPROVER:"webservice=approver&",
    DBD_EXTRAPARAM_SLADASH:"webservice=sladash&",
    DBD_EXTRAPARAM_SLADASH_GRAPH:"webservice=sladashgraph&",
    DBD_EXTRAPARAM_LISTSLA_COMMENT:"webservice=listslacomment&",
    DBD_EXTRAPARAM_SLAGRAPH_COMMENT:"webservice=slagraphcomment&",
    DBD_EXTRAPARAM_FULLHIERARCHY:"webservice=fullhierarchy&",
    DBD_EXTRAPARAM_HIERARCHY_COMMENT_LIST:"webservice=hierarchycommentlist&",
    DBD_EXTRAPARAM_UPLOAD_FILE:"/fileapi/upload",
    DBD_EXTRAPARAM_DOWNLOAD_FILE:"/fileapi/download?",
    DBD_EXTRAPARAM_DISPLAY_FILE:"/fileapi/displayfiles",
    DBD_EXTRAPARAM_DELETE_FILE:"/fileapi/deletefile?",
    DBD_EXTRAPARAM_EXPORT_CSV:"/fileapi/exportCSV?",
    DBD_EXTRAPARAM_GEO_BREAKDOWN:"webservice=geodrillcount&",
    /*DBD_EXTRAPARAM_UPDATE_COMMENT:"/comments/updatecomment?",
     DBD_EXTRAPARAM_DELETE_COMMENT:"/comments/deletecomment?"*/
};



//supported API version data arrays
var supported2xVersion=["2.0","2.1","2.2"];
var supported3xVersion=["3.0"];
var MICROSITE_NAMESPACE="microsite";
var DW20_NAMESPACE="dw20";
var DASH_ALL_LBL="All";
var PERIOD_LBL="Period";
var DASH_DATA_TYPE_LBL="SLA";
var DASH_MONTHLY_LBL="MONTHLY";
var DASH_GLOBAL_LBL="Global";
var DASH_DRILL_DOWN_LBL="Drill-Down";
var DASH_PROCESS_LBL="Process";
var DASH_NEW_LBL="New";
var DASH_UPDATE_LBL="Update";
var DASH_SUBMIT_LBL="Submit";

var DASH_SUBMIT_PER_PAGE_LBL="Submit Page";

var DASH_SUBMIT_ALL_LBL="Submit All";

//SUCCESS MESSAGE
var DASH_APPROVER_DATA_SUCC_MESS="Selected metric data approved successfully";
//CONFIRM MESSAGE
var DASH_APPROVER_SUBMIT_ALL_DATA_MESS="Are you sure to submit all metrics?";

var DASH_APPROVER_SUBMIT_PER_PAGE_DATA_MESS="Are you sure to submit the metrics for selected page?";
//REQUEST MESSAGE
var DASH_POST_COMMENT_REQ_MESS="Please comment on this SLA";
//Error message and code
var DASH_CLIENT_NOT_FOUND_ERR_MSG="This client does not seem to be configured adequately in the database. Please contact your administrator"
var DASH_NO_DATA_FOUND_ERR_MESS="No data found";