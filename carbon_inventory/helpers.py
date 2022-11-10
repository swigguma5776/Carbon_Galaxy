
from flask import json, request, jsonify 

# from carbon_inventory.models import User
import decimal


class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            #Convert decimal instances into strings
            return str(obj)
        return super(JSONEncoder, self).default(obj)