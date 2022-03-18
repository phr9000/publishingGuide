// data 파일 import 
import * as data1 from './data/data_1.js';
import * as data2 from './data/data_2.js';

// import 된 모듈 추가
var arry = [
  data1,
  data2
]

$(document).ready(function(){
  var $tab = $('.tab');
  var tabComp = '';
  
  var $tableCont = $('.table-container');
  var tableComp = '';

  var trType = 'odd';

  for( var i = 0; i < arry.length; i++ ) {
    if(i == 0) {
      tabComp += '<li class="list on" data-tab="tab_' + i + '">' + arry[i].pageLabel + '</li>';
      tableComp += '<div class="content on" id="tab_' + i + '">';
    } else {
      tabComp += '<li class="list" data-tab="tab_' + i + '">' + arry[i].pageLabel + '</li>';
      tableComp += '<div class="content" id="tab_' + i + '">';
    }
    tableComp += '<table class="coding-list">\
                    <colgroup>\
                      <col class="number" width="70px"/>\
                      <col class="category" width="120px"/>\
                      <col class="name" width="20%"/>\
                      <col class="link" width="auto"/>\
                      <col class="status" width="90px"/>\
                    </colgroup>\
                    <thead>\
                      <th class="number">Num.</th>\
                      <th class="category" scope="col">카테고리</th>\
                      <th class="name" scope="col">페이지</th>\
                      <th class="link" scope="col">링크</th>\
                      <th class="status" scope="col">상태</th>\
                    </thead>\
                    <tbody>';

    for( var a = 0; a < arry[i].data.length; a++ ) {
      for( var b = 0; b < arry[i].data[a]['list'].length; b++ ) {
        if(b == 0) {
          tableComp += '<tr class="first '+ trType +'">'
        } else {
          tableComp += '<tr class="' + trType +'">'
        }
        tableComp += '<td class="number"></td>';
        if(b == 0) {
          tableComp += '<td class="category" rowspan="' + arry[i].data[a]['list'].length +'">' + arry[i].data[a].category + '</td>';
        }
        tableComp += '<td class="name">' + arry[i].data[a]['list'][b].pageName + '</td>';
        if(arry[i].data[a].dirRoute) {
          tableComp += '<td class="link">' + '<a href="./dist/html/' + arry[i].data[a].dirRoute + '/' + arry[i].data[a]['list'][b].fileName + '.html">' + arry[i].data[a]['list'][b].fileName + '.html</a>' + '</td>';
        } else {
          tableComp += '<td class="link">' + '<a href="./dist/html/' + arry[i].data[a]['list'][b].fileName + '.html">' + arry[i].data[a]['list'][b].fileName + '.html</a>' + '</td>';
        }
        if(arry[i].data[a]['list'][b].progress == '완료') {
          tableComp += '<td class="status ok"></td>'
        } else {
          tableComp += '<td class="status ing"></td>'
        }
        tableComp += '</tr>';
      }

      if(trType == 'even') {
        trType = 'odd';
      } else {
        trType = 'even';
      }
    }

    tableComp += '</tbody>';
    tableComp += '</table>';
    tableComp += '</div>';
  };

  $($tab).prepend(tabComp);
  $($tableCont).prepend(tableComp);

  $('table').each(function () {
    var tds = $(this).find("td.number");
    for (var i = 0; i < tds.length; i++) {
      $(tds[i]).html(i + 1);
    }
  });

  //href 파일명을 val로 전달
  $("td.link").each(function () {
    var setText = $(this).find("a").attr("href")
    var getText = $(this).find("a");

    var resplit = setText.split("/");
    var resplitLength = resplit.length;
    var getNameSplit = resplit[resplitLength - 1].split("?");
    if (setText.length > 0) {
      var tagetBlank = getText.attr("target", "_blank");
      getText.text(getNameSplit);
    } else {
      getText.text('페이지가 없습니다.');
      $(this).addClass('tbd');
      $(this).next('.status').removeClass('ok');
      $(this).next('.status').addClass('ing');
    }
  });

  $("td.link").each(function () {
    var setText = $(this).find("a").attr("href");;
    var timestamp = new Date().getTime();
    var time = timestamp;
    var setLink = $(this).find("a").attr("href");
    var getText = setLink + '?time=' + time;
    if (setText.length > 0) {
      $(this).find("a").attr("href", getText);
    }
  });

  $('#tab .list').click('on', function () {
    var tab_id = $(this).attr('data-tab');

    $('#tab .list').removeClass('on');
    $('.content').removeClass('on');
    $(this).addClass('on');
    $("#" + tab_id).addClass('on');
    $(".coding-list > tbody > tr").show();
  })

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.top_btn').addClass('active');
    } else {
      $('.top_btn').removeClass('active');
    }
  });

  $('.top_btn').on('click', function () {
    $('html, body').scrollTop(0);
  })
});