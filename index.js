$('.equation-container').hide()
$('#resultTable').hide()


var methodSelect = document.getElementById("method-select")

function ChangeMethod() {
    $('.equation-container').hide()
    $('#resultTable').hide()

    if (methodSelect.value == 1) {
        Bisection()
    } else if(methodSelect.value == 2) {
        FalsePosition()
    } else if(methodSelect.value == 3) {
        SimpleFixedPoint()
    } else if(methodSelect.value == 4) {
        Newton()
    } else if(methodSelect.value == 5) {
        GaussElemenation()
    } else if(methodSelect.value == 6) {
        LUDecomposition()
    } else if(methodSelect.value == 7) {
        CramersRule()
    } else if(methodSelect.value == 8) {
        Secant()
    }
}