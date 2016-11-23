/*
参照了jquery-timelinr的源码, thx.
目前只能实现垂直方向的时间轴.

@instructions
  请在name_timeDateClick的外层再加一层块级元素
  之前一定要初始化      $().timebase(options)

*/

$.fn.timebase = function(options){

  setting = $.extend({
    name_timeMain              : '#t_container',            //value: 主面板 ; elements : any HTML
    name_timeDates             : '#t_date',                 //value: 时间面板; elements : any HTML
    name_timeContentsContainer : '#t_contentContainer',     //value: 内容包含面板(单独用的时候) ; elements: any HTML
    name_timeContents          : '.t_content',              //value: 内容面板 ; elements : any HTML
    name_timeDateClick         : 'a',                       //value: 时间点击 ; elements : any HTML
    speed_date                 : 500,                       //value: 时间面板移动速度     elements: int
    speed_content              : 500,                       //value: 内容包含面板速度     elements: int
    speed_opacity              : 200,                       //value: 透明度变化速度       elements: int
    attr_opacity               : '0.2',                     //value: 默认透明度          elements: string
    boolean_dateMove           : false,                     //value: 时间面板是否移动     elements: bool
    boolean_contentMove        : false,                     //value: 内容包含面板是否移动 elements: bool
    boolean_transition         : false,                     //value: 内容面板是否拉伸     elements: bool
    boolean_opacity            : false                      //value: 透明度是否变化      elements: bool
  },options);

  //判断DOM数据是否合法
  if($(setting.name_timeDates).length > 0 && $(setting.name_timeContents).length > 0){

    var selected        = false;                         //防止多次被点击
    var contentElements = $(setting.name_timeContents);  //内容面板的个数

    //初始化拉伸， 透明
    if(setting.boolean_transition){
      contentElements.hide();
      $(contentElements[0]).show();                 //显示第一个内容面板
    }
    else if(setting.boolean_opacity){
      contentElements.css('opacity', setting.attr_opacity);
      $(contentElements[0]).css('opacity', '1.0') ; //不变第一个内容面板
    }

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

    /**(可选) 移动整个内容条移动 **/
    function contentsMove(currentIndex){
      if(setting.boolean_contentMove ){
        var sumContentsLength = 0;
        for(var index = 0 ; index < currentIndex ; ++index){
          sumContentsLength += $(contentElements[index]).height();
        }

        $(setting.name_timeContentsContainer).animate({
          'marginTop' : -sumContentsLength
        }, setting.sleep_content);
      }
    }

    /**(可选) 内容面板进行拉伸特效**/
    function contentsTransition(currentIndex){
      if(setting.boolean_transition){
          //收起所有除当前内容条外的所有内容条
          for(var index = 0 ; index < contentElements.length ; ++index){
            if(index != currentIndex)
              $(contentElements[index]).slideUp(setting.speed_content);
          }
          //智能展开和缩小当前内容
          $(contentElements[currentIndex]).slideToggle(setting.speed_content);
     }
    }

    /*(可选)  内容面板透明度切换*/
    function contentsOpacity(currentIndex){
       if(setting.boolean_opacity){
          //当前面板透明度最低
          $(contentElements[currentIndex]).css('opacity', '1.0');
          //非当前面板透明度设置为默认
          for(var index = 0 ; index < contentElements.length ; ++index){
            if(index != currentIndex){
              $(contentElements[index]).animate({
                'opacity' : setting.attr_opacity
              }, setting.speed_opacity);
            }
          }
       }
    }

    /**  给超链接注册按键  **/
    $(setting.name_timeDates + ' ' + setting.name_timeDateClick).click(function(event){
        event.preventDefault();
        if(!selected){
          var beforeDateElements = $(this).parent().prevAll();    //时间条当前元素前的所有元素
          var currentIndex = beforeDateElements.length;           //当前name_timeDateClick位置
          var currentDateElement = $(this);                       //当前name_timeDateClick元素

          selected = true;

          contentsOpacity(currentIndex);
          contentsMove(currentIndex);
          contentsTransition(currentIndex);
          dateMove(currentIndex, beforeDateElements);

          selected = false;

          //标记当前元素被选择
          $(setting.name_timeDates + ' ' + setting.name_timeDateClick).removeClass('on');
          currentDateElement.addClass('on');
        }
    });
  }
}
