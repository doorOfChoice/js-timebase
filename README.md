# js-timebase

能解决一些基本问题的轻型时间轴模块，目前只支持垂直结构.

> * 支持内容面板的收缩
> * 支持时间面板和内容边版的动态高度增长

使用方法

```
$(function(){
    $().timebase(options);
});
```


基本变量
```
* name_timeMain              : '#t_container',            //value: 主面板 ; elements : any HTML
* name_timeDates             : '#t_date',             //value: 时间面板; elements : any HTML
* name_timeContentsContainer : '#t_contentContainer', //value: 内容包含面板(单独用的时候) ; elements: any * HTML
* name_timeContents          : '.t_content',          //value: 内容面板 ; elements : any HTML
* name_timeDateClick         : 'a',                   //value: 时间点击 ; elements : any HTML
* speed_date                 : 500,                   //value: 时间面板移动速度    elements: int
* speed_content              : 500,                   //value: 内容包含面板速度    elements: int
* boolean_dateMove           : false,                 //value: 时间面板是否移动    elements: bool
* boolean_contentMove        : false,                 //value: 内容包含面板是否移动 elements: bool
* boolean_traction           : false                  //value: 内容面板是否拉伸     elements: bool
```

代码示范

```
//script这样写
$(function(){
    $().timebase({
        boolean_dateMove : true,
         boolean_contentMove : true
    });
});

//HTML
<div id='t_container' >
        <div id='t_date' style="float:left">
          <div><a href="#">a</a></div>
          <div><a href="#">b</a></div>
        </div>

        <div id='t_contentContainer' style="float:right">
          <div class="t_content">hello</div>
          <div class="t_content">world</div>
        </div>
</div>
```