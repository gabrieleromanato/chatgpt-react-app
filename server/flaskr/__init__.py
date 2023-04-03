import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

load_dotenv()


def create_app(test_config=None):

    app = Flask(__name__, instance_relative_config=True)

    CORS(app)

    app.config.from_mapping(
        API_KEY=os.getenv('API_KEY'),
        JWT_SECRET_KEY=os.getenv('JWT_SECRET_KEY'),
        USERNAME=os.getenv('USERNAME'),
        PASSWORD=os.getenv('PASSWORD'),
        REDIS_PORT=os.getenv('REDIS_PORT'),
        REDIS_HOST=os.getenv('REDIS_HOST')
    )

    jwt = JWTManager(app)

    from . import api
    app.register_blueprint(api.bp)

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    return app
