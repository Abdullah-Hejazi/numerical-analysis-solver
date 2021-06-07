function LUDecomposition() {
    $('#ludecomp').show()
}

function solveLUDecomposition() {
    let result = $('#thead')
    result.empty()
    $('#resultBody').empty()

    $('#resultTable').show()

    let head = '<tr>'
    head += '<th>x</th>'
    head += '<th>y</th>'
    head += "<th>z</th>"
    head += '</tr>'

    result.append(head)

    startLUDecomposition()
}

function startLUDecomposition() {
    var original = JSON.parse(JSON.stringify(get2DMatrix()))
    var a = JSON.parse(JSON.stringify(get2DMatrix()))

    m21 = a[1][0] / a[0][0]
    m31 = a[2][0] / a[0][0]

    a[1][0] = a[1][0] - (m21 * a[0][0])
    a[1][1] = a[1][1] - (m21 * a[0][1])
    a[1][2] = a[1][2] - (m21 * a[0][2])
    a[1][3] = a[1][3] - (m21 * a[0][3])

    
    a[2][0] = a[2][0] - (m31 * a[0][0])
    a[2][1] = a[2][1] - (m31 * a[0][1])
    a[2][2] = a[2][2] - (m31 * a[0][2])
    a[2][3] = a[2][3] - (m31 * a[0][3])

    m32 = a[2][1] / a[1][1]
    
    a[2][0] = a[2][0] - (m32 * a[1][0])
    a[2][1] = a[2][1] - (m32 * a[1][1])
    a[2][2] = a[2][2] - (m32 * a[1][2])
    a[2][3] = a[2][3] - (m32 * a[1][3])

    
    let u = JSON.parse(JSON.stringify(a))
    let l = JSON.parse(JSON.stringify(original))
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 4; j++) {
            if (i == j) {
                l[i][j] = 1
            } else if (j > i) {
                l[i][j] = 0
            }
        }
        l[i].pop()
        u[i].pop()
    }

    l[1][0] = m21
    l[2][0] = m31
    l[2][1] = m32

    let lcb = solve(l, [
        original[0][3],
        original[1][3],
        original[2][3]
    ])

    let uxc = solve(u, lcb)

    addLUDecompIteration(uxc[0], uxc[1], uxc[2])
}

function get2DMatrix() {
    let matrix = Array.from($('#ludecomp .matrix .matrix-number'))
    let matrix2 = Array.from($('#ludecomp .matrix2 .matrix-number'))
    
    return [
        [(1 * matrix[0].value), (1 * matrix[1].value), (1 * matrix[2].value), (1 * matrix2[0].value)],
        [(1 * matrix[3].value), (1 * matrix[4].value), (1 * matrix[5].value), (1 * matrix2[1].value)],
        [(1 * matrix[6].value), (1 * matrix[7].value), (1 * matrix[8].value), (1 * matrix2[2].value)]
    ]
}

function solve(matrix, matrix2) {
    let x = 0, y = 0, z = 0
    if (matrix[0][1] == 0 && matrix[0][2] == 0) {
        x = matrix2[0] / matrix[0][0]
        y = (matrix2[1] - (matrix[1][0] * x)) / matrix[1][1]
        z = (matrix2[2] - (x * matrix[2][0]) - (y * matrix[2][1])) / matrix[2][2]
        return [x, y, z]
    } else {
        z = matrix2[2] / matrix[2][2]
        y = (matrix2[1] - (z * matrix[1][2])) / matrix[1][1]
        x = (matrix2[0] - (z * matrix[0][2]) - (y * matrix[0][1])) / matrix[0][0]
        return [x, y, z]
    }
}

function addLUDecompIteration(x, y, z) {
    let result = $('#resultBody')
    
    let row = '<tr>'
    row += '<td>' + x + '</td>'
    row += '<td>' + y + '</td>'
    row += '<td>' + z + '</td>'
    row += '</tr>'

    result.append(row)
}