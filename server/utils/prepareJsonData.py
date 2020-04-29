import json
import re

def transformValue(value):
  if value == 'No data':
    return value
  
  transformed_value = value.split(' [')
  return re.sub("[^0-9-]", "", transformed_value[0].replace(' ', ''))

def getRangeValue(value):
  if value == 'No data':
    return value
  
  transformed_value = value.split(' [')
  return re.sub("[^0-9-]", "", transformed_value[1].replace(']', '').replace(' ', '').replace('–', '-'))

for filename in ['../data/aids_hiv_countries.json', '../data/aids_hiv_regions.json']:
  aids = {}

  with open(filename, 'r') as f1:
    aids = json.load(f1)
    aids_data = aids["data"]

    refined_data = [{k:(transformValue(v) if k == 'Value' else v) for (k,v) in elem.items()} for elem in aids_data]
    ranges_array = [getRangeValue(v) for elem in aids_data for (k,v) in elem.items() if k == 'Value']

    for i in range(len(refined_data)):
      refined_data[i]['Range'] = ranges_array[i]

    aids["data"] = refined_data

  print(aids)

  with open(filename, 'w') as f:
    json.dump(aids, f)
