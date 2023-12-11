// Interval für UI aktualiesierung in ms 
var update_interval = 1000;
// Addresse und Token für Datenabfrage
var api_endpoint = 'http://127.0.0.1:5000'
var access_token = 'admin'

document.addEventListener('DOMContentLoaded', function() {
    function updateCharts() {
        // Fügen Sie den Token als Parameter zur Anfrage hinzu
        fetch(api_endpoint + '?token='+ access_token, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                ramChart.data.datasets[0].data = [data.ram_percent, 100 - data.ram_percent];
                networkChart.data.datasets[0].data = [data.network.upload + data.network.download];
                cpuChart.data.datasets[0].data = [data.cpu_percent];

                ramChart.update();
                networkChart.update();
                cpuChart.update();
                updateDiskCharts(data.disks);
            });
    }

    function createDiskChart(containerId, label) {
        var chartContainer = document.createElement('div');
        chartContainer.classList.add('chart-container');
        chartContainer.id = containerId;

        var chartLabel = document.createElement('div');
        chartLabel.classList.add('chart-label');
        chartLabel.textContent = label;

        var chartCanvas = document.createElement('canvas');
        chartCanvas.width = 300;
        chartCanvas.height = 150;

        chartContainer.appendChild(chartLabel);
        chartContainer.appendChild(chartCanvas);
        document.getElementById('diskChartsRow').appendChild(chartContainer);

        return new Chart(chartCanvas.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Used', 'Free'],
                datasets: [{
                    data: [0, 0],
                    backgroundColor: ['#FF6384', '#36A2EB']
                }]
            }
        });
    }

    function updateDiskCharts(disks) {
        // Prüfe, ob Disk-Charts bereits erstellt wurden
        if (!diskCharts) {
            diskCharts = [];
            disks.forEach((disk, index) => {
                var chartContainerId = 'diskChartContainer_' + index;
                var label = 'Disk ' + (index + 1);
                var diskChart = createDiskChart(chartContainerId, label);
                diskCharts.push(diskChart);
            });
        }

        // Aktualisiere Daten für Disk-Charts
        diskCharts.forEach((diskChart, index) => {
            diskChart.data.datasets[0].data = [disks[index].percent, 100 - disks[index].percent];
            diskChart.update();
        });
    }

    var ramChart = new Chart(document.getElementById('ramChart').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Used', 'Free'],
            datasets: [{
                data: [0, 0],
                backgroundColor: ['#FF6384', '#36A2EB']
            }]
        }
    });

    var networkChart = new Chart(document.getElementById('networkChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Bytes'],
            datasets: [{
                label: 'Network Usage',
                data: [0],
                backgroundColor: '#FFCE56'
            }]
        }
    });

    var cpuChart = new Chart(document.getElementById('cpuChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Percentage'],
            datasets: [{
                label: 'CPU Usage',
                data: [0],
                backgroundColor: '#36A2EB'
            }]
        }
    });

    var diskCharts;  // Hält Referenzen auf erstellte Disk-Charts

    updateCharts();
    setInterval(updateCharts, update_interval);
});