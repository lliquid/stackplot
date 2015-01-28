/**
 * Created by panpan (xpp2007@gmail.com) on 4/16/14.
 */
matrix = function () {
    var m = {
        version: '0.0',
        consts: {
            ZERO: 1e-9
        },
        zero: function (m, n) { //initialize a zero matrix with m rows and n columns
            var mat = [];
            for (var i= 0; i < m; i++) {
                var row = [];
                mat.push(row);
                for (var j = 0; j < n; j++) {
                    row.push(0);
                }
            }
            return mat;
        },
        identity: function(m) {
            var mat = this.zeros(m, m);
            for (var i = 0; i < m; i++) {
                mat[i][i] = 1;
            }
            return mat;
        },
        trace: function(mat) {
            var tr = [];
            for (var i = 0, ii = mat.length; i < ii; i++) {
                tr.push(mat[i][i]);
            }
            return tr;
        },
        is_zero: function(mat) {
            var flag = true;
            for (var i= 0, ii= m.get_num_rows(mat); i < ii; i++) {
                for (var j= 0, jj= m.get_num_cols(mat); j < jj; j++) {
                    if (mat[i][j] != 0)
                        flag = false;
                }
            }
            return flag;
        },
        get_num_rows: function(mat) {
            return mat.length;
        },
        get_num_cols: function(mat) {
            if (mat.length == 0)
                return 0;
            else
                return mat[0].length;
        }
    };
    return m;
}();
