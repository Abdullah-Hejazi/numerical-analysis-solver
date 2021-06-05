function Newton() {
    $('#newton').show()
}

function solveNewton() {
    let result = $('#thead')
    result.empty()
    $('#resultBody').empty()

    $('#resultTable').show()

    let head = '<tr>'
    head += '<th>i</th>'
    head += '<th>xi</th>'
    head += '<th>f(xi)</th>'
    head += "<th>f'(xi)</th>"
    head += '<th>error</th>'
    head += '</tr>'

    result.append(head)

    startNewton()
}

function startNewton() {
    const f = math.compile($('#newton #funcInput').val())
    const fdash = math.derivative($('#newton #funcInput').val(), 'x')
    var x0 = Number($('#newton #xZero').val())
    var error = Number($('#newton #error').val())
    var maxIterations = Number($('#newton #maxIterations').val())

    let xr = x0

    for(let i = 0; i < maxIterations; i++) {
        var xrOld = xr
        let fxrold = f.evaluate({x: xrOld})
        let fdashxrold =  fdash.evaluate({x: xrOld})
        xr = xrOld - (fxrold / fdashxrold)

        let currentError = Math.abs(((xr - xrOld) / xr)) * 100

        addIteration(i, xrOld, fxrold, fdashxrold, currentError)

        if (currentError < error) {
            return xrOld
        }
    }

    return xrOld
}

function addIteration(i, xrOld, fxrold, fdashxrold, currentError) {
    var decimal = Number($('#newton #decimal').val())
    let result = $('#resultBody')
    
    let row = '<tr>'
    row += '<td>' + i + '</td>'
    row += '<td>' + xrOld.toFixed(decimal) + '</td>'
    row += '<td>' + fxrold.toFixed(decimal) + '</td>'
    row += '<td>' + fdashxrold.toFixed(decimal) + '</td>'
    row += '<td>' + currentError.toFixed(decimal) + '</td>'
    row += '</tr>'

    result.append(row)
}