function SimpleFixedPoint() {
    $('#simplefixed').show()
}

function solveSimpleFixedPoint() {
    let result = $('#thead')
    result.empty()
    $('#resultBody').empty()

    $('#resultTable').show()

    let head = '<tr>'
    head += '<th>i</th>'
    head += '<th>xi</th>'
    head += '<th>error</th>'
    head += '</tr>'

    result.append(head)

    startSimpleFixedPoint()
}

function startSimpleFixedPoint() {
    const f = math.compile($('#simplefixed #funcInput').val())
    var x0 = Number($('#simplefixed #xZero').val())
    var error = Number($('#simplefixed #error').val())
    var maxIterations = Number($('#simplefixed #maxIterations').val())

    let xr = x0

    for(let i = 0; i < maxIterations; i++) {
        let xrOld = xr
        xr = f.evaluate({x: xrOld})


        let currentError = Math.abs(((xr - xrOld) / xr) * 100)

        if (currentError < error) {
            addIteration(i, xr, currentError)
            return xr
        }

        addIteration(i, xr, currentError)
    }

    return xr
}

function addIteration(i, xr, currentError) {
    var decimal = Number($('#simplefixed #decimal').val())
    let result = $('#resultBody')
    
    let row = '<tr>'
    row += '<td>' + i + '</td>'
    row += '<td>' + xr.toFixed(decimal) + '</td>'
    row += '<td>' + currentError.toFixed(decimal) + '</td>'
    row += '</tr>'

    console.log(i)

    result.append(row)
}