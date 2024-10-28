import jwt
import datetime
from flask import request, jsonify, current_app
from functools import wraps
from models.account import Account

def generate_token(username):
    payload = {
        "username": username,
        'iat': datetime.datetime.utcnow(),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30) 
    }

    token = jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")

    return token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])

            current_user = Account.query.filter_by(username=data["username"]).first()
            if not current_user:
                raise ValueError('Invalid user')
            
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 403
        
        except jwt.InvalidTokenError as e:
            return jsonify({'message': 'Invalid or expired token! ' + str(e)}), 403

        return f(current_user, *args, **kwargs)

    return decorated
