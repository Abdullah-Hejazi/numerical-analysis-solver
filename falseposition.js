function FalsePosition() {
    $('#falseposition').show()
}

function solveFalsePosition() {
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

    startFalsePosition()
}

function startFalsePosition() {
    const f = math.compile($('#falseposition #funcInput').val())
    var xl = Number($('#falseposition #xLower').val())
    var xu = Number($('#falseposition #xUpper').val())
    var error = Number($('#falseposition #error').val())
    var maxIterations = Number($('#falseposition #maxIterations').val())

    let xrOld = 0

    for(let i = 0; i < maxIterations; i++) {
        let fxl = f.evaluate({x: xl})
        let fxu = f.evaluate({x: xu})

        
        let xr = xu - ((fxu * (xl - xu)) / (fxl - fxu))
        let fxr = f.evaluate({x: xr})

        let currentError = Math.abs(((xr - xrOld) / xr) * 100)

        if (i > 0) {
            if (currentError < error) {
                return xr
            }
        }

        addIteration(i, xl, fxl, xu, fxu, xr, fxr, currentError)

        if (fxl * fxr < 0) {
            xu = xr
        } else if (fxl * fxr > 0) {
            xl = xr
        } else {
            return xr
        }

        xrOld = xr

    }

    return xrOld
}

function addIteration(i, xl, fxl, xu, fxu, xr, fxr, currentError) {
    var decimal = Number($('#falseposition #decimal').val())
    let result = $('#resultBody')
    
    let row = '<tr>'
    row += '<td>' + i + '</td>'
    row += '<td>' + xl.toFixed(decimal) + '</td>'
    row += '<td>' + fxl.toFixed(decimal) + '</td>'
    row += '<td>' + xu.toFixed(decimal) + '</td>'
    row += '<td>' + fxu.toFixed(decimal) + '</td>'
    row += '<td>' + xr.toFixed(decimal) + '</td>'
    row += '<td>' + fxr.toFixed(decimal) + '</td>'
    row += '<td>' + currentError.toFixed(decimal) + '</td>'
    row += '</tr>'

    result.append(row)
}