from flask import Blueprint, request, jsonify 
from carbon_inventory.models import db, Carbon, CarbonSchema, carbon_schema, carbons_schema

api = Blueprint('api', __name__, url_prefix = '/api')

@api.route('/getdata/')
# @token_required
def getdata():
    return {'some': 'value'}

# CREATE CARBON ENDPOINT
@api.route('/carbons', methods = ['POST'])
def create_carbon():
    website_url = request.json['website_url']
    user_token = request.json['token'] 

    print(f"BIG TESTER: {user_token}")

    carbon = Carbon(website_url, user_token = user_token)

    db.session.add(carbon)
    db.session.commit() 


    response = carbon_schema.dump(carbon)
    return jsonify(response)



# RETRIEVE ALL Carbon ENDPOINT
@api.route('/carbons/<token>', methods = ['GET'])
def get_carbons(token):
   
    carbons = Carbon.query.filter_by(user_token = token).all()
    response = carbons_schema.dump(carbons)
    return jsonify(response)


# RETRIEVE ONE Carbon ENDPOINT
@api.route('/carbons/<token>/<id>', methods = ['GET'])
def get_carbon(token, id):
    owner = token
    if owner == token:
        carbon = Carbon.query.get(id)
        response = carbon_schema.dump(carbon)
        return jsonify(response)
    else:
        return jsonify({"message": "Valid Token Required"}),401


# # UPDATE CARBON ENDPOINT
@api.route('/carbons/<token>/<id>', methods = ['POST','PUT'])
def update_carbon(token,id):
    carbon = Carbon.query.get(id) # grab carbon instance

    carbon.website_url = request.json['website_url']
    carbon.user_token = token 

    db.session.commit()
    response = carbon_schema.dump(carbon)
    return jsonify(response)


# # DELETE CARBON ENDPOINT
@api.route('/carbons/<id>', methods = ['DELETE'])
def delete_carbon(id):
    carbon = Carbon.query.get(id)
    db.session.delete(carbon)
    db.session.commit()
    response = carbon_schema.dump(carbon)
    return jsonify(response)