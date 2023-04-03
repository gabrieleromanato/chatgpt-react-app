import os

from flask import (
    Blueprint, jsonify, request, current_app
)

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from flaskr.utils import send_request_to_api, get_choices_text_from_api
from flaskr.cache import redis_connection

bp = Blueprint('api', __name__, url_prefix='/v1')

@bp.route('/', methods=['GET','POST'])
def info():
    return jsonify({'info': 'API v.1'})

@bp.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', '')
    password = request.json.get('password', '')
    if username != current_app.config['USERNAME'] or password != current_app.config['PASSWORD']:
        return jsonify({'error': 'Invalid login.'})
    access_token = create_access_token(identity=username)
    return jsonify({'token': access_token})

@bp.route('/question', methods=['POST'])
@jwt_required()
def question():
    text = request.json.get('question', '')
    if not text:
        return jsonify({'error': 'Invalid request.'})
    cached_question = redis_connection.get(text)
    if cached_question:
        return jsonify({'response': cached_question })
    req = send_request_to_api(current_app.config['API_KEY'], text)
    if not req:
        return jsonify({'error': 'Request failed or timed out.'})
    choices_text = get_choices_text_from_api(req.get('choices', []))
    answer = '\n'.join(choices_text)
    redis_connection.set(text, answer)
    return jsonify({'response': answer})
