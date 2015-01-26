TimelineChart = {
  initialize: function (dates, data) {
      this.dates = dates;
      this.data = data;
      return this;
  },

  show: function () {
      $('#timeline').highcharts({
          title: {
              text: 'Daily average duration of the tests',
              x: -20
          },

          subtitle: {
              text: '',
              x: -20
          },

          xAxis: {
              categories: this.dates
          },

          yAxis: {
              title: {
                  text: 'Seconds'
              },

              plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#808080'
              }]
          },

          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle',
              borderWidth: 0
          },

          series: [{
              name: 'Duration',
              data: this.data

          }]
      });
  }
};