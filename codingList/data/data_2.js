/*
pageLabel : Tab 이름

category : 카테고리
dirRoute : 폴더 이름
pageName : 페이지 이름
fileName : 파일 이름
progress : 진행 상태 ( 완료, 진행중 )
*/

export let pageLabel = 'Page2';

export let data = [{
    category: '공통2',
    dirRoute: 'common',
    list: [{
        pageName: '기본 레이아웃',
        fileName: 'common',
        progress: '완료',
      },
    ]
  },

  {
    category: '샘플',
    dirRoute: 'yourDir',
    list: [{
      pageName: '샘플1',
      fileName: 'yourFile',
      progress: '진행중',
    }, ]
  },

];
