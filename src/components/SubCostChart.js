import { Line } from 'vue-chartjs'
const colors = [
    'rgba(255, 99, 132,',
    'rgba(54, 162, 235,',
    'rgba(255, 206, 86,',
    'rgba(75, 192, 192,',
    'rgba(153, 102, 255,',
    'rgba(255, 159, 64,'
];

export default {
    extends: Line,
    props: {
        costPerMonth: {
            type: Number,
            default: 0,
            required: true
        },
        interestRates: {
            type: Array,
            default: () => [0.06, 0.08, 0.1, 0.12]
        },
        intervals: {
            type: Array,
            default: () => [5, 10, 15, 20, 25, 30, 35, 40]
        }
    },
    data() {
        return {
            chartdata: {
                labels: this.intervals.map(el => el.toString()),
                datasets: this.interestRates.map(rate => {
                    const color = colors.pop()

                    return {
                        label: (rate*100).toString() + "% Interest",
                        data: this.intervals.map(interval => this.compoundInterest(this.costPerMonth, rate, interval)),
                        borderColor: color + '1.0)',
                        backgroundColor: color + '0.4)'
                    }
                })
            }
        }
    },
    mounted () {
        this.renderChart(this.chartdata, {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Years'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                }]
            }
        });
    },
    methods: {
        compoundInterest (monthlyIncrement, rate, years) {
            return ((monthlyIncrement * ((1+rate)**years)) / rate).toFixed(2)
        }
    }
}