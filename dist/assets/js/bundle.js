$(document).ready(function () {
  $('.header').load('../../html/component/header.html');
  $('.footer').load('../../html/component/footer.html');

  if($('.fixed-head').length > 0) {
    sync_header();
  }

  function sync_header() {
    var $fixedHead = $('.fixed-head');
    $fixedHead.each(function() {
    
      var $tableContainer = $(this);

      var $bodyRow = $tableContainer.find('.table-body-container').not('.nodata').find('tr').eq(0);

      $bodyRow.find('td').each(function() {
        var $this = $(this);
        var index = $bodyRow.find('td').index(this);
        var thisWidth = $this.outerWidth();
        $tableContainer.find('table').find('th').eq(index).css('width', thisWidth);
      });
    });
  }
});


$(document).ready(function () {
  // 드롭다운 데이터 Json 형식 샘플 1
  var data = {
    0 : {
      'option' : '선택한 리스트', // 옵션 명
      'select' : true,         // 선택 여부 ( true : 선택, false : 미선택 )
      'disabled' : false,      // 비활성화 여부 (true : 비활성화, false : 활성화)
    },
    1 : {
      'option' : '활성화 옵션', // 옵션 명
      'select' : false,        // 선택 여부 ( true : 선택, false : 미선택 )
      'disabled' : false,      // 비활성화 여부 (true : 비활성화, false : 활성화)
    },
    2 : {
      'option' : '비활성화 리스트', // 옵션 명
      'select' : false,     // 선택 여부 ( true : 선택, false : 미선택 )
      'disabled' : true,   // 비활성화 여부 (true : 비활성화, false : 활성화)
    },
    3 : {
      'option' : 'option2', // 옵션 명
      'select' : false,     // 선택 여부 ( true : 선택, false : 미선택 )
      'disabled' : false,   // 비활성화 여부 (true : 비활성화, false : 활성화)
    },
  }

  // 드롭다운 데이터 Json 형식 샘플 2
  var data2 = {
    0 : {
      'option' : '샘플 옵션 1', // 옵션 명
      'select' : false,        // 선택 여부 ( true : 선택, false : 미선택 )
      'disabled' : false,      // 비활성화 여부 (true : 비활성화, false : 활성화)
    },
    1 : {
      'option' : '샘플 옵션 2', // 옵션 명
      'select' : false,        // 선택 여부 ( true : 선택, false : 미선택 )
      'disabled' : false,      // 비활성화 여부 (true : 비활성화, false : 활성화)
    },
    2 : {
      'option' : '샘플 옵션 3', // 옵션 명
      'select' : false,        // 선택 여부 ( true : 선택, false : 미선택 )
      'disabled' : false,      // 비활성화 여부 (true : 비활성화, false : 활성화)
    },
    3 : {
      'option' : '샘플 옵션 4', // 옵션 명
      'select' : false,        // 선택 여부 ( true : 선택, false : 미선택 )
      'disabled' : false,      // 비활성화 여부 (true : 비활성화, false : 활성화)
    },
  }

  // 커스텀 드롭다운 함수 실행 //
  customDropdown(data, 'dropdown-sample-id', 'select-sample-id');
  customDropdown(data2, 'dropdown-sample-id-2', 'select-sample-id-2');


  // 커스텀 드롭다운 구조 생성 함수 //
  // customDropdown(JSON데이터, 드롭다운 ID, 셀렉트 박스 ID)
  function customDropdown(data, dropdown, selectbox) {
    var dropdown_id = '#' + dropdown;   // 드롭다운 ID
    var selectbox_id = '#' + selectbox; // 셀렉트박스 ID
    
    var selectOption = '<div class="select-option filled">'; // 선택 옵션 표시 구조
    var dropdown = '<ul class="dropdown-list">'; // 커스텀 드롭다운 리스트 구조
    var option = ''; // select tag 옵션 구조
    var selected = false; // 선택 된 데이터가 없으면 false, 있으면 true (기본값 false)
  
    for (const key in data) {
      if(data[key].select) {
        selected = true;
        selectOption += '';
        selectOption += '<span class="filled">' + data[key].option +'</span>';
  
        dropdown += '<li class="list active">' + data[key].option + '</li>';
  
        option += '<option value="' + data[key].option +'" selected="selected">' + data[key].option +'</option>';
      } else {
        if(data[key].disabled) {
          option += '<option disabled value="' + data[key].option +'">' + data[key].option +'</option>';
          dropdown += '<li class="list disabled">' + data[key].option + '</li>';
        } else {
          option += '<option value="' + data[key].option +'">' + data[key].option +'</option>';
          dropdown += '<li class="list">' + data[key].option + '</li>';
        }
      }
    }
  
    if(selected == false) {
      selectOption += '<span>None</span>';
    }
  
    selectOption += '</div">';
    dropdown += '</ul>'
    
    $(dropdown_id).prepend(selectOption);
    $(dropdown_id).append(dropdown);
    $(selectbox_id).append(option);
  }

  $(window).on('load', function() {
    // dropdown: Dropdown 박스 열기 //
    $('.dropdown-container').find('.dropdown-area').not('.disabled').on('click', function (e) {
      this.target = $(this);
      this.target.attr('tabindex', 1).focus();
      this.target.toggleClass('active');
      this.target.find('.dropdown-list').slideToggle(100);
      e.stopImmediatePropagation();
    });

    // dropdown: 포커스 아웃 시 옵션 리스트 영역 닫기 //
    $('.dropdown-container').find('.dropdown-area').focusout(function (e) {
      this.target = $(this);
      this.target.removeAttr('tabindex');
      this.target.removeClass('active');
      this.target.find('.dropdown-list').slideUp(100);

      e.stopImmediatePropagation();
    });

    // dropdown: 옵션 리스트 선택하고 Dropdown 박스 닫기 //
    $('.dropdown-container').find('.dropdown-area .dropdown-list li').not('.disabled').on('click', function () {
      var idx = $(this).index();
      this.select_box = $(this).closest('.dropdown-container');
      this.dropdown_box = this.select_box.find('.dropdown-area');
      this.dropdown_box.find('.dropdown-list li').removeClass('active');
      $(this).addClass('active');
      this.dropdown_box.find('.select-option').find('span').addClass('filled');
      this.dropdown_box.find('.select-option').find('span').text($(this).text());
      this.select_box.find('select').find('option').attr('selected', false);
      this.select_box.find('select').find('option').eq(idx).attr('selected', true);
    });
  });
});