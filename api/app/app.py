from flask import Flask, jsonify, request
from flask_cors import CORS
import psutil
import os

api_token = os.environ.get("SYSTEM_MONITOR_API_TOKEN", "admin")

app = Flask(__name__)
CORS(app)


def get_system_status():
    ram_percent = psutil.virtual_memory().percent
    ram_total = psutil.virtual_memory().total
    cpu_percent = psutil.cpu_percent(interval=1)
    cpu_cores = psutil.cpu_count(logical=False)
    network_io = psutil.net_io_counters()
    network_upload = network_io.bytes_sent
    network_download = network_io.bytes_recv

    disk_info = []
    for partition in psutil.disk_partitions():
        disk_usage = psutil.disk_usage(partition.mountpoint)
        disk_info.append({
            'device': partition.device,
            'mountpoint': partition.mountpoint,
            'total': disk_usage.total,
            'used': disk_usage.used,
            'free': disk_usage.free,
            'percent': disk_usage.percent
        })

    status = {
        'ram_percent': ram_percent,
        'ram_total': ram_total,
        'cpu_percent': cpu_percent,
        'cpu_cores': cpu_cores,
        'network': {
            'upload': network_upload,
            'download': network_download
        },
        'disks': disk_info
    }
    return status


@app.route('/', methods=['GET'])
def index():
    if request.args.get('token') == api_token:
        status = get_system_status()
        return jsonify(status)
    else:
        return jsonify({"error": "Invalid token"}), 401


if __name__ == '__main__':
    app.run(host="0.0.0.0")
