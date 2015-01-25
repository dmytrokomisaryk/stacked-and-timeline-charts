$.get('session_history.csv', function (fileContent) {
    var csvObjects = $.csv.toObjects(fileContent);
    var statisticParser = StatisticParser.initialize(csvObjects);

    statisticParser.parse();

    var dates = statisticParser.getDates();
    var statuses = ['passed', 'failed', 'error'];

    StackedChart.initialize(dates, statisticParser.groupByStatus(statuses)).show();
    TimelineChart.initialize(dates, statisticParser.getDurations()).show();
});