module.exports = {
    reporter: "mochawesome",
    'reporter-option': [
        'reportDir=report-DigtalSkola',
        'reportFileName=[status]_[datetime]-[name]-report',
        'html=true',
        'json=true',
        'overwrit=false',
        'timestamp=longDate',
    ],
}