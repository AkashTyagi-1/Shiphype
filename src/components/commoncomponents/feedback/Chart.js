import palette from './Color';
export const data = {
  labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN','JULY','AUG','SEPT', 'OCT','NOV','DEC'],
  datasets: [
    {
      
      // backgroundColor: palette.primary.main,
      backgroundColor:'#5DACFA',
      data: [18, 5, 19, 27, 29, 19, 20,12,25,10,29,16]
    },
    {
      
      // backgroundColor: palette.neutral,
      backgroundColor:'#AED4FB',
      data: [11, 20, 12, 29, 30, 25, 13,18, 5, 19, 27, 29]
    }
  ]
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 20,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider
        }
      }
    ]
  }
};