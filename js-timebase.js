/*
参照了jquery-timelinr的源码, thx.
目前只能实现垂直方向的时间轴.

@instructions
  请在name_timeDateClick的外层再加一层块级元素
  之前一定要初始化      $().timebase(options)

@function
  实现了
  1.内容的拉伸
  2.时间轴和内容轴的动态高度移动
*/

$.fn.timebase = function(options){

  setting = $.extend({
    name_timeMain              : '#t_container',            //value: 主面板 ; elements : any HTML
    name_timeDates             : '#t_date',                 //value: 时间面板; elements : any HTML
    name_timeContentsContainer : '#t_contentContainer',     //value: 内容包含面板(单独用的时候) ; elements: any HTML
    name_timeContents          : '.t_content',              //value: 内容面板 ; elements : any HTML
    name_timeDateClick         : 'a',                       //value: 时间点击 ; elements : any HTML
    speed_date                 : 500,                       //value: 时间面板移动速度    elements: int
    speed_content              : 500,                       //value: 内容包含面板速度    elements: int
    boolean_dateMove           : false,                     //value: 时间面板是否移动    elements: bool
    boolean_contentMove        : false,                     //value: 内容包含面板是否移动 elements: bool
    boolean_traction           : false                      //value: 内容面板是否拉伸     elements: bool
  },options);



  var contentElements = $(setting.name_timeContents);       //内容面板的个数




  /**（可选）移动整个时间条移动 **/
  function dateMove(currentIndex, beforeDateElements){

    if(setting.boolean_dateMove){
        //垂直方向总的移动长度（时间条）
        var sumDateLength = 0;

        //统计各自应该移动的高度
        for(var index = 0 ; index < currentIndex ; ++index){
          sumDateLength += $(beforeDateElements[index]).height();
        }

        //设置时间条移动动画
        $(setting.name_timeDates).animate({
          'marginTop' : -sumDateLength
        }, setting.sleep_date);
    }
  }

  /**（可选）移动整个内容条移动 **/
  function contentsMove(currentIndex){

    if(setting.boolean_contentMove){
      var sumContentsLength = 0;
      for(var index = 0 ; index < currentIndex ; ++index){
        sumContentsLength += $(contentElements[index]).height();
      }

      $(setting.name_timeContentsContainer).animate({
        'marginTop' : -sumContentsLength
      }, setting.sleep_content);
    }
  }

  /* （可选）内容面板进行拉伸特效*/
  function contentsTraction(currentIndex, currentDateElement){
    if(setting.boolean_traction){
        contentElements.hide();
        //标记当前元素被选择
        $(setting.name_timeDates + ' ' + setting.name_timeDateClick).removeClass('on');
        currentDateElement.addClass('on');

        //收起所有除当前内容条外的所有内容条
        for(var index = 0 ; index < contentElements.length ; ++index){
          if(index != currentIndex)
            $(contentElements[index]).slideUp(setting.speed_content);
        }

        //智能展开和缩小当前内容
        $(contentElements[currentIndex]).slideToggle(setting.speed_content);
   }
  }


  /**  给超链接注册按键  **/
  $(setting.name_timeDates + ' ' + setting.name_timeDateClick).click(function(event){


      var beforeDateElements = $(this).parent().prevAll();    //时间条当前元素前的所有元素

      var currentIndex = beforeDateElements.length;           //当前name_timeDateClick位置

      var currentDateElement = $(this);                       //当前name_timeDateClick元素

      contentsMove(currentIndex);
      dateMove(currentIndex, beforeDateElements);
      contentsTraction(currentIndex, currentDateElement);

  });
}
