import jwt
import datetime
from flask import request, jsonify, current_app
from functools import wraps
from models.account import Account

def generate_token(username):
    """
    Given the username create a JWT token that will be stored on the client side to 
    authorize access to the client.
    """

    # Creates the payload storing the username, token creation time and token expiry time
    payload = {
        "username": username,
        'iat': datetime.datetime.utcnow(),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30) 
    }

    # Encode token
    token = jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")

    return token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        """
        Checks and authenticates token to allow autherization to the user.

        Checks request headers for Token. If token is found checks if the 
        given token is valid. Returns success/fail messages dependent on
        the results of token autherization.
        """

        # Checks request header for token
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        
        # Decodes token and authenticates it
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])

            current_user = Account.query.filter_by(username=data["username"]).first()
            if not current_user:
                raise ValueError('Invalid user')
        # In case of expired token 
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 403
        # In case of invalid token
        except jwt.InvalidTokenError as e:
            return jsonify({'message': 'Invalid or expired token! ' + str(e)}), 403

        # On successful JWT authentication
        return f(current_user, *args, **kwargs)

    return decorated
