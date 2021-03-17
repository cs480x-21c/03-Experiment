function recordAns(oButton) {
    let formEle = oButton.parentNode.parentNode.querySelectorAll('.ansInput')
    let uid=''
    // console.log('he')
    fetch("/recAns", {
        method: "POST",
        body: JSON.stringify({
            answer : formEle[0].value,
            // className: oButton.className
            // student_gender : formEle[1].value,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(response => {
            console.log("sent");
            uid = response
            console.log(response)
            window.location.href="/leads"
        })
    // .then(response => {
    //     addRow(formEle[0].value, formEle[1].value, formEle[2].value, formEle[3].value, formEle[4].value, formEle[5].value, uid)
    // })
}