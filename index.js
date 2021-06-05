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
        FalsePosition()
    } else if(methodSelect.value == 5) {
        FalsePosition()
    } else if(methodSelect.value == 6) {
        FalsePosition()
    } else if(methodSelect.value == 7) {
        FalsePosition()
    }
}