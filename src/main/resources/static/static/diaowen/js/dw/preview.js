$(document).ready(function(){
// 获取问题标题文本框和选项文本框的引用
  var questionTitleInput = document.getElementById("quTitleSaveTag");
  var optionInputs = document.querySelectorAll(".quItemInputCase");
  var ctx=$("#ctx").val();
  var sid = $.getUrlParam("sid");
  var surveyId = $.getUrlParam("surveyId");
  var template = $.getUrlParam("template");
  $("#sid").val(sid);
  $("#id").val(surveyId);
  loadSurveyData(function(){
    $("#surveyList").attr("href","/#/dw/survey");
    $("#designSurvey").attr("href","/static/diaowen/design.html?surveyId="+surveyId);
    $("#dwPhone").hide();
    $("#dwPad").hide();
    var tag = $("#tag").val();
    $("#PcSurvey").attr("src","/static/diaowen/answer-p.html?surveyId="+surveyId+"&sid="+sid+"&tag="+tag);
    bindEvent();
    if(template!=null && template==="1"){
      $("#editorPreview").hide();
      $("#templatePreview").show();
    }
  });
  // 监听问题标题文本框的输入事件
  questionTitleInput.addEventListener("input", function() {
    var inputText = questionTitleInput.value;
    var questionTitleElement = document.querySelector(".quCoTitle .quCoTitleEdit");
    questionTitleElement.textContent = inputText;
  });
// 监听选项文本框的输入事件
  optionInputs.forEach(function(optionInput, index) {
    optionInput.addEventListener("input", function() {
      var inputText = optionInput.value;
      var optionElement = document.querySelectorAll(".quCoOptionEdit")[index];
      optionElement.textContent = inputText;
    });
  });
});
function bindEvent(){
  $(".centerTabbarBtn").click(function(){
    var surveyId = $("#id").val();
    var sid = $("#sid").val();
    var tag = $("#tag").val();
    $(".centerTabbarBtn").removeClass("active");
    $(this).addClass("active");
    var thHref=$(this).attr("href");
    if(thHref==="#dwPc"){

    }else if(thHref==="#dwPad"){
      $("#PadSurvey").attr("src","/static/diaowen/answer-m.html?surveyId="+surveyId+"&sid="+sid+"&tag="+tag);
    }else if(thHref==="#dwPhone"){
      $("#PhoneSurvey").attr("src","/static/diaowen/answer-m.html?surveyId="+surveyId+"&sid="+sid+"&tag="+tag);
    }
    $(".dwPreviewBody").hide();
    $(thHref).show();
    return false;
  });

  $("#confirgDevSuvey").click(function(){
    var ctx = $("#ctx").val();
    var surveyId = $("#id").val();
    var url = ctx+"/design/survey-design/devSurvey.do";
    var data = "surveyId="+surveyId;
    $.ajax({
      url: url,
      data: data,
      type: "post",
      success: function (httpResult){
        if(httpResult.resultCode===200){
          window.location.href="/#/dw/survey/c/url/"+surveyId;
        }else{
          alert(httpResult.resultMsg);
        }
      },
      error: function(xmlHttpRequest, textStatus, errorThrown){
        // alert(xmlHttpRequest);
        if(xmlHttpRequest.status===401){
          window.location.href="/#/login";
        }else if(xmlHttpRequest.status===403){
          alert("没有发布权限");
          // window.location.href="/#/exception/403";
        }
      }
    });
  });

}

function loadSurveyData(callback){
  var ctx=$("#ctx").val();
  var surveyId = $("#id").val();
  var url = ctx+"/survey/info.do";
  var data = "id="+surveyId;
  $.ajax({
    url:url,
    data:data,
    type:"get",
    success:function(httpResult){
      if(httpResult.resultCode==401){
        window.location.href="/#/login";
      }
      //surveyName
      if(httpResult.resultCode==200){
        $("#surveyName").val(httpResult.data.surveyName);
      }
      if(callback!=null){
        callback();
      }
    }
  });
}
