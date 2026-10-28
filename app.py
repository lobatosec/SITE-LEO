import os
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    """Entrega a página principal index.html"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Entrega arquivos estáticos como CSS, JS e imagens"""
    return send_from_directory('.', filename)

if __name__ == '__main__':
    # Porta injetada dinamicamente pelo Render (PORT) ou 9001 localmente
    port = int(os.environ.get('PORT', 9001))
    # '0.0.0.0' permite receber conexões externas no Render
    app.run(host='0.0.0.0', port=port)
