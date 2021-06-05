function Secant() {
    $('#secant').show()
}

function solveSecant() {
    let result = $('#thead')
    result.empty()
    $('#resultBody').empty()

    $('#resultTable').show()

    let head = '<tr>'
    head += '<th>i</th>'
    head += '<th>xi-1</th>'
    head += '<th>f(xi-1)</th>'
    head += "<th>xi</th>"
    head += "<th>f(xi)</th>"
    head += '<th>error</th>'
    head += '</tr>'

    result.append(head)

    startSecant()
}

function startSecant() {
    const f = math.compile($('#secant #funcInput').val())
    var x0 = Number($('#secant #xZero').val())
    let xim1 = Number($('#secant #xMinusOne').val())
    var error = Number($('#secant #error').val())
    var maxIterations = Number($('#secant #maxIterations').val())

    let xrold = x0

    for(let i = 0; i < maxIterations; i++) {
        let fxrold = f.evaluate({x: xrold})
        let fxim1 = f.evaluate({x: xim1})
        let xr = xrold - ((fxrold * (xim1 - xrold)) / (fxim1 - fxrold))

        let currentError = Math.abs(((xr - xrold) / xr)) * 100

        addSecantIteration(i, xim1, fxim1, xrold, fxrold, currentError)

        xim1 = xrold
        xrold = xr

        if (currentError < error) {
            return xrold
        }
    }

    return xrold
}

function addSecantIteration(i, xim1, fxim1, xr, fxrold, currentError) {
    var decimal = Number($('#secant #decimal').val())
    let result = $('#resultBody')
    
    let row = '<tr>'
    row += '<td>' + i + '</td>'
    row += '<td>' + xim1.toFixed(decimal) + '</td>'
    row += '<td>' + fxim1.toFixed(decimal) + '</td>'
    row += '<td>' + xr.toFixed(decimal) + '</td>'
    row += '<td>' + fxrold.toFixed(decimal) + '</td>'
    row += '<td>' + currentError.toFixed(decimal) + '</td>'
    row += '</tr>'

    result.append(row)
}