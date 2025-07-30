from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Setup SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///questions.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the Question model
class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(500), nullable=False)
    answered = db.Column(db.Boolean, default=False)
    answered_text = db.Column(db.String(1000))
    answered_audio_path = db.Column(db.String(500))  # <-- this is stored if audio was submitted

    def to_dict(self):
        return {
            'id': self.id,
            'question': self.question,
            'answered': self.answered,
            'answered_text': self.answered_text,
            'answered_audio_path': self.answered_audio_path  # <-- Add this!
        }

UPLOAD_FOLDER = 'static/audio'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/delete_question/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    question = Question.query.get(question_id)
    if question:
        db.session.delete(question)
        db.session.commit()
        return jsonify({'success': True})
    return jsonify({'error': 'Question not found'}), 404

# Route to edit a question
@app.route('/edit_question/<int:question_id>', methods=['POST'])
def edit_question(question_id):
    data = request.get_json()
    question = Question.query.get(question_id)

    if not question or 'question' not in data:
        return jsonify({'error': 'Invalid request'}), 404

    question.question = data['question'].strip()
    
    if data.get('reset_answer', False):
        question.answered = False  # mark as unanswered if user confirmed

    db.session.commit()
    return jsonify({'success': True})


@app.route('/upload_audio', methods=['POST'])
def upload_audio():
    file = request.files['audio']
    question_id = request.form.get('id')

    if file and question_id:
        filename = secure_filename(f'q{question_id}.webm')
        path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(path)

        q = Question.query.get(question_id)
        if q:
            q.answered = True
            q.answered_audio_path = path
            db.session.commit()
        return jsonify({"status": "ok", "filename": filename})
    return jsonify({"error": "invalid upload"}), 400


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/answer')
def answer_view():
    return render_template('answer.html')

@app.route('/play')
def play_view():
    return render_template('play.html')


@app.route('/add_question', methods=['POST'])
def add_question():
    data = request.get_json()
    question_text = data.get('question', '').strip()

    if not question_text:
        return jsonify({"error": "Empty question"}), 400

    q = Question(question=question_text)
    db.session.add(q)
    db.session.commit()

    print("Current DB:", [q.question for q in Question.query.all()])
    return jsonify({"status": "ok"})

@app.route('/get_questions', methods=['GET'])
def get_questions():
    questions = Question.query.all()
    return jsonify({"questions": [q.to_dict() for q in questions]})

@app.route('/get_unanswered_questions', methods=['GET'])
def get_unanswered_questions():
    unanswered = Question.query.filter_by(answered=False).all()
    return jsonify({"questions": [q.to_dict() for q in unanswered]})


@app.route('/get_answered_questions', methods=['GET'])
def get_answered_questions():
    answered = Question.query.filter_by(answered=True).all()
    return jsonify({"questions": [q.to_dict() for q in answered]})

@app.route('/answer_question', methods=['POST'])
def answer_question():
    data = request.get_json()
    q = Question.query.get(data['id'])
    if q:
        q.answered = True
        q.answered_text = data['answer'].strip()
        db.session.commit()
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5001)
