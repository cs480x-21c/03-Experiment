import json
import pandas as pd
import eml_parser
'''
pip install eml_parser[filemagic]
pip install python-magic-bin
'''
import datetime

def json_serial(obj):
      if isinstance(obj, datetime.datetime):
        serial = obj.isoformat()
        return serial


with open('sample.eml', 'rb') as fhdl:
  raw_email = fhdl.read()

ep = eml_parser.EmlParser()
# parsed_eml = ep.decode_email_bytes(raw_email)
eml = ep.decode_email_bytes(raw_email)
print("\ntop-level keys: ",eml.keys())
print("\nbody-level keys: ",eml['body'][0])
hashes = ep.get_file_hash(eml)
print("\nhashes: ",hashes)


print(json.dumps(eml, default=json_serial))

print("\nPARSED:",ep.parse_email())