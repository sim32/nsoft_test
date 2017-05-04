$(document).ready(function () {
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };

    var dateFromObj,
        dateToObj,
        dateFromStr     = '',
        dateToStr       = '',
        templateRow     = _.template($('#templateRow').html()),
        templateFooter  = _.template($('#templateFooter').html()),
        $tableBody      = $('#tableBody'),
        dataRows        = [],
        sortBy,
        reverseSort     = false;

    $('.input-daterange input').each(function() {
        $(this).datepicker({
            startDate:  '01-01-2016',
            endDate:    '31-12-2020',
            language:   'ru'
        });
        $(this).on('changeDate', function(e) {
            $('#alertDateEmpty').hide();
            switch (e.target.id) {
                case 'dateFrom':
                    dateFromObj = moment(e.date);
                    dateToObj   = moment($('#dateTo').val(), 'DD.MM.YYYY');

                    dateFromStr = dateFromObj.isValid() ? dateFromObj.unix() : '';
                    dateToStr   = dateToObj.isValid() ? dateToObj.unix() : '';
                    break;
                case 'dateTo':
                    dateToObj   = moment(e.date);
                    dateFromObj = moment($('#dateFrom').val(), 'DD.MM.YYYY');

                    dateFromStr = dateFromObj.isValid() ? dateFromObj.unix() : '';
                    dateToStr   = dateToObj.isValid() ? dateToObj.unix() : '';
                    break;
            }

            if (_.indexOf([dateFromStr, dateToStr], '') != -1) {
                $('#alertDateEmpty').show();
            }

            var url = '/orders' + dateFromStr + '_' + dateToStr + '.json';
            $.ajax({
                url: url,
                method: "GET"
            }).done(function(data){
                showData(data);
            });
        });
    });

    var fSortBy = function(data, name) {
        var arr;
        switch (name) {
            case 'name':
                arr = _.sortBy(data, 'name');
                break;
            case 'price':
                arr =  _.sortBy(data, 'price');
                break;
            case 'tax':
                arr = _.sortBy(data, 'tax');
                break;
            case 'total':
                arr = _.sortBy(data, 'total');
                break;
            case 'qty':
                arr = _.sortBy(data, 'qty');
                break;
        }

        if (reverseSort) {
            arr.reverse();
        }
        return arr;
    }
    var showData = function(data) {
        $tableBody.html('');
        var footer = {
            qty:    0,
            count:  0,
            price:  0,
            tax:    0,
            total:  0
        };

        dataRows = [];
        _.each(data, function (el) {
            var row = {
                name:   el.name,
                qty:    parseInt(el.qty),
                price:  parseFloat(el.price),
                tax:    parseFloat(el.tax),
                total:  parseFloat(el.total)
            };
            dataRows.push(row);
            footer.qty      += row.qty;
            footer.price    += row.price;
            footer.tax      += row.tax;
            footer.total    += row.total;
            footer.count++;
        });

        if (!_.isUndefined(sortBy)) {
            dataRows = fSortBy(dataRows, sortBy);
        }

        _.each(dataRows, function (el) {
            $tableBody.append(templateRow(el));
        });
        $tableBody.append(templateFooter(footer));
    };

    $('.sortItem').on('click', function(){
        if (dataRows.length) {
            var currentSort = $(this).data('sort');
            reverseSort = currentSort == sortBy && !reverseSort;
            sortBy = currentSort;
            showData(dataRows);
        }
    })
});