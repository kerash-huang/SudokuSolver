// Sudoku Easy solver
// make a 9x9 matrix for question
let matrix = [
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
];
for (let a = 0; a < 9; a++) {
    for (let b = 0; b < 9; b++) {
        matrix[a][b] = 0;
    }
}

// Initial matrix plate column values
matrix[0][0] = 9;
matrix[0][4] = 1;
matrix[0][8] = 5;
matrix[1][1] = 2;
matrix[1][4] = 5;
matrix[1][5] = 3;
matrix[1][6] = 1;
matrix[2][3] = 4;
matrix[2][4] = 9;
matrix[2][6] = 8;
matrix[2][8] = 2;
matrix[3][0] = 7;
matrix[3][2] = 2;
matrix[3][3] = 5;
matrix[3][6] = 9;
matrix[3][7] = 8;
matrix[3][8] = 4;
matrix[4][2] = 1;
matrix[4][5] = 9;
matrix[4][7] = 5;
matrix[5][1] = 5;
matrix[5][2] = 9;
matrix[5][4] = 2;
matrix[5][5] = 7;
matrix[5][8] = 3;
matrix[6][0] = 1;
matrix[6][1] = 4;
matrix[6][2] = 5;
matrix[6][3] = 9;
matrix[6][4] = 6;
matrix[6][6] = 3;
matrix[7][0] = 6;
matrix[7][3] = 1;
matrix[7][5] = 5;
matrix[7][8] = 9;
matrix[8][2] = 8;
matrix[8][4] = 7;
matrix[8][6] = 5;

// create a note matrix to log possible result
let note = [
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
];
// create array from 1 to 9 for result note
for (let a = 0; a < 9; a++) {
    for (let b = 0; b < 9; b++) {
        note[a][b] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
}
// clean note value if matrix value exist
matrix.forEach((_row, y) => {
    _row.forEach((val, x) => {
        if (val == 0) {
            return;
        }
        note = removeResultFromNote(note, x, y, val)
    });
});


let scancontinue = false;

do {
    scancontinue = false;
    note.forEach((_row, y) => {
        _row.forEach((val, x) => {
            if (val.length == 1) {
                // console.log("[" + y + "][" + x + "] = ", val);
                matrix[y][x] = val[0]
                note = removeResultFromNote(note, x, y, val[0])
                scancontinue = true;
                // console.log(printMatrix(note));
            }
        });
    })
} while (scancontinue);
console.log(printMatrix(matrix));

/// debug show
function removeResultFromNote(note, x, y, num) {
    if (num == 0) {
        return note;
    }
    for (let _i = 0; _i < 9; _i++) {
        let numpos = note[y][_i].indexOf(num)
        if (numpos >= 0) {
            note[y][_i].splice(numpos, 1);
        }
    }
    for (let _j = 0; _j < 9; _j++) {
        let numpos = note[_j][x].indexOf(num)
        if (numpos >= 0) {
            note[_j][x].splice(numpos, 1);
        }
    }

    note = removeMatrixSection(note, x, y, num);
    note[y][x] = [];
    return note;
}

function removeMatrixSection(note, x, y, num) {
    let yStart = Math.floor(y / 3) * 3
    let yEnd = yStart + 3
    let xStart = Math.floor(x / 3) * 3
    let xEnd = xStart + 3
    for (let _i = yStart; _i < yEnd; _i++) {
        for (let _j = xStart; _j < xEnd; _j++) {
            let numpos = note[_i][_j].indexOf(num)
            if (numpos >= 0) {
                note[_i][_j].splice(numpos, 1);
            }
        }
    }
    return note;
}

function printMatrix(matx) {
    let str = "[Matrix Result] \n-------------------------------------\n";
    matx.forEach((tr, y) => {
        str += "|"
        tr.forEach((v, x) => {
            // str += strpad(JSON.stringify(v), 3, ' ', 'left') + " |";
            str += " " + JSON.stringify(v) + " |";
        });
        str += "\n"
        str += "-------------------------------------\n";
    });
    return str;
}

function strpad(str, length, padChar, padType) {
    str = str.toString(); // 將輸入轉換為字符串
    padChar = padChar || ' '; // 默認填充字符為空格
    padType = padType || 'right'; // 默認填充方式為右側

    if (str.length >= length) {
        return str; // 字符串已達到指定長度，無需填充
    }

    var padding = padChar.repeat(length - str.length); // 生成填充字符的字符串

    if (padType === 'left') {
        return padding + str; // 在左側填充字符串
    } else {
        return str + padding; // 在右側填充字符串（默認）
    }
}
