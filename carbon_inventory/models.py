from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate   
import uuid  
from datetime import date, datetime 
from math import ceil 
import pip._vendor.requests as requests
import sys

# add security for passwords 
from werkzeug.security import generate_password_hash, check_password_hash
import secrets 


from flask_marshmallow import Marshmallow


db = SQLAlchemy()

ma = Marshmallow() 


class Carbon(db.Model):
    id = db.Column(db.String, primary_key = True)
    website_url = db.Column(db.String(150), nullable = False)
    carbon_per_webpage = db.Column(db.Numeric(precision=10, scale=2), nullable = False)
    carbon_per_year = db.Column(db.Numeric(precision=10, scale=2), nullable = False)
    trees_needed = db.Column(db.Integer, nullable = False)
    user_token = db.Column(db.String, nullable = False)


    def __init__(self, website_url, user_token, id = ''):
        self.id = self.set_id()
        self.website_url = website_url
        self.carbon_per_webpage = self.carbon_emission(website_url)
        self.carbon_per_year = self.carbon_year(self.carbon_per_webpage)
        self.trees_needed = self.trees_calc(self.carbon_per_webpage)
        self.user_token = user_token 

    def carbon_emission(self, website_url):
        r = requests.get(website_url)
        # print("Correct Content Length: "+r.headers['Content-Length'])
        print("bytes of r.text       : "+str(sys.getsizeof(r.text)))
        print("bytes of r.content    : "+str(sys.getsizeof(r.content)))
        print("len r.text            : "+str(len(r.text)))
        print("len r.content         : "+str(len(r.content)))
    
        total_bytes = int(str(sys.getsizeof(r.text))) + int(str(sys.getsizeof(r.content)))
        print(f"total bytes of data: {total_bytes}")

        C02_perbyte = 312.58 / 1000000000 #carbon per gigabyte divided by gigabyte to determine total carbon emissions for 1 byte of data
        print(f"carbon emissions per 1 byte of data: {C02_perbyte}") 

        C02_emissions = total_bytes * C02_perbyte  #total bytes multiplied by amount of carbon per byte 
        print(C02_emissions)
        return C02_emissions

    
    def carbon_year(self, carbon_per_webpage):
        return float("{:.2f}".format(float(carbon_per_webpage) * 100000 * 12))
       


    def trees_calc(self, carbon_per_webpage):
        return ceil(float("{:.2f}".format(float(carbon_per_webpage) * 100000 * 12)) / 20000)
        



    def __repr__(self):
        return f"The following carbon data has been added for url: {self.website_url}"

    def set_id(self):
        return (secrets.token_urlsafe())


# Create API Schema via Marshmallow Object
class CarbonSchema(ma.Schema):
    class Meta:
        fields = ['id', 'website_url', 'carbon_per_webpage', 'carbon_per_year', 'trees_needed']


carbon_schema = CarbonSchema()
carbons_schema = CarbonSchema(many = True)
