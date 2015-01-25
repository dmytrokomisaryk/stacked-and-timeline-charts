StatisticParser = {

    initialize: function (data) {
        this.data = data;
        return this;
    },

    parse: function () {
      this.groupByDate();
      this.calculateAverages();
    },

    groupByDate: function () {
        var self = this;
        self.groupedByDate = {};

        $.each(this.data, function (index, row) {
            var date = new Date(row.created_at);
            row.created_at = moment(date).format('MMM, Do');

            if (self.groupedByDate[row.created_at]) {
                self.groupedByDate[row.created_at].push(row);
            } else {
                self.groupedByDate[row.created_at] = [row];
            }
        });

        return self.groupedByDate;
    },

    calculateAverages: function () {
        var self = this;
        self.averagesGroupedByDate = {};

        $.each(this.groupedByDate, function (date, rows) {
            var row = self.mergeRows(rows);

            row.passed_tests_count /= rows.length;
            row.failed_tests_count /= rows.length;
            row.error_tests_count /= rows.length;
            row.duration /= rows.length;

            self.averagesGroupedByDate[date] = row;
        });

        return self.averagesGroupedByDate;
    },

    mergeRows: function (rows) {
        var result = {};
        var self = this;

        $.each(rows, function (index, row) {
            if (self.rowHasField(result)) {
                result.passed_tests_count += parseInt(row.passed_tests_count);
                result.failed_tests_count += parseInt(row.failed_tests_count);
                result.error_tests_count += parseInt(row.error_tests_count);
                result.duration += parseInt(row.duration)
            } else {
                result = row;
                result.passed_tests_count = parseInt(result.passed_tests_count);
                result.failed_tests_count = parseInt(result.failed_tests_count);
                result.error_tests_count = parseInt(row.error_tests_count);
                result.duration = parseInt(result.duration)
            }
        });

        return result;
    },

    rowHasField: function (row) {
        return Object.keys(row).length
    },

    getDates: function () {
        return Object.keys(this.groupedByDate);
    },

    groupByStatus: function (statuses) {
        var result = [];
        var self = this;

        $.each(statuses, function (index, status) {
            var series = {
                name: status,
                data: []
            };

            $.each(self.getDates(), function (index, date) {
                var testsCount = eval('self.averagesGroupedByDate[date].' + status + '_tests_count');
                series.data.push(testsCount);
            });

            result.push(series);
        });

        return result;
    },

    getDurations: function () {
        var self = this;

        return $.map(self.getDates(), function (date) {
            return parseInt(self.averagesGroupedByDate[date].duration);
        });
    }
};