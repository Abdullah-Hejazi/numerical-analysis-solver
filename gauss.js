function GaussElemenation() {
    $('#gauss').show()
}

function solveGaussElemenation() {
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

    startGaussElemenation()
}

function startGaussElemenation() {
    var a = get2DMatrix()

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

    let z = a[2][3] / a[2][2]
    let y = (a[1][3] - (z * a[1][2])) / a[1][1]
    let x = (a[0][3] - (z * a[0][2]) - (y * a[0][1])) / a[0][0]

    addGaussIteration(x, y, z)
}

function get2DMatrix() {
    let matrix = Array.from($('#gauss .matrix .matrix-number'))
    let matrix2 = Array.from($('#gauss .matrix2 .matrix-number'))
    
    return [
        [(1 * matrix[0].value), (1 * matrix[1].value), (1 * matrix[2].value), (1 * matrix2[0].value)],
        [(1 * matrix[3].value), (1 * matrix[4].value), (1 * matrix[5].value), (1 * matrix2[1].value)],
        [(1 * matrix[6].value), (1 * matrix[7].value), (1 * matrix[8].value), (1 * matrix2[2].value)]
    ]
}

function addGaussIteration(x, y, z) {
    let result = $('#resultBody')
    
    let row = '<tr>'
    row += '<td>' + x + '</td>'
    row += '<td>' + y + '</td>'
    row += '<td>' + z + '</td>'
    row += '</tr>'

    result.append(row)
}