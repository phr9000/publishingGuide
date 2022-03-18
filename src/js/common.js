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

