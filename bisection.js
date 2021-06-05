function Bisection() {
    $('#bisection').show()
}

function solveBisection() {
    let result = $('#thead')
    result.empty()
    $('#resultBody').empty()

    $('#resultTable').show()

    let head = '<tr>'
    head += '<th>i</th>'
    head += '<th>xl</th>'
    head += '<th>f(xl)</th>'
    head += '<th>xu</th>'
    head += '<th>f(xu)</th>'
    head += '<th>xr</th>'
    head += '<th>f(xr)</th>'
    head += '<th>error</th>'
    head += '</tr>'

    result.append(head)

    startBisection()
}

function startBisection() {
    const f = math.compile($('#bisection #funcInput').val())
    var xLower = Number($('#bisection #xLower').val())
    var xUpper = Number($('#bisection #xUpper').val())
    var error = Number($('#bisection #error').val())
    var maxIterations = Number($('#bisection #maxIterations').val())

    let xrOld = 0

    for(let i = 0; i < maxIterations; i++) {
        let xr = ((xLower + xUpper) / 2)

        let fxl = f.evaluate({x: xLower})
        let fxu = f.evaluate({x: xUpper})
        let fxr = f.evaluate({x: xr})

        let currentError = Math.abs(((xr - xrOld) / xr) * 100)

        if (i > 0) {
            if (currentError < error) {
                return xr
            }
        }

        addIteration(i, xLower, fxl, xUpper, fxu, xr, fxr, currentError)

        if (fxl * fxr < 0) {
            xUpper = xr
        } else if (fxl * fxr > 0) {
            xLower = xr
        } else {
            return xr
        }

        xrOld = xr

    }

    return xrOld
}

function addIteration(i, xLower, fxl, xUpper, fxu, xr, fxr, currentError) {
    var decimal = Number($('#bisection #decimal').val())
    let result = $('#resultBody')
    
    let row = '<tr>'
    row += '<td>' + i + '</td>'
    row += '<td>' + xLower.toFixed(decimal) + '</td>'
    row += '<td>' + fxl.toFixed(decimal) + '</td>'
    row += '<td>' + xUpper.toFixed(decimal) + '</td>'
    row += '<td>' + fxu.toFixed(decimal) + '</td>'
    row += '<td>' + xr.toFixed(decimal) + '</td>'
    row += '<td>' + fxr.toFixed(decimal) + '</td>'
    row += '<td>' + currentError.toFixed(decimal) + '</td>'
    row += '</tr>'

    result.append(row)

    console.log({
        xl: xLower,
        fxl: fxl,
        xu: xUpper,
        fxu: fxu,
        xr: xr,
        fxr: fxr,
        e: currentError
    })
}