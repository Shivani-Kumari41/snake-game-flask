from flask import Flask, render_template

app = Flask(__name__)

# Home Page ke liye
@app.route('/')
def index():
    return render_template('index.html')

# Snake Game page ke liye
@app.route('/snake')
def snake():
    return render_template('snake.html')

if __name__ == '__main__':
    app.run(debug=True)