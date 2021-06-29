import json
import csv
import sys
import pandas as pd
import numpy as np

# Download the spreadsheet as a csv file, 
# and put the name of the file here 
file_name = "finalmatrix.csv"

# Number of pixels between each node horizontally
horiz_space_intervals = 180

# Number of pixels from the left edge of the window the first node is
horiz_offset = 300

# Number of pixels between each row of nodes vertically
vert_space_intervals = 30

# Number of pixels from the top of the window the first row is
vert_offset = 17


theme_names = [
    "Revolutionizing Health and Wellness",
    "Confronting Climate Change",
    "Building Resiliency",
    "Shaping Modern Life",
    "Sharing Innovations World Wide"
]

# Sculpting the json to be formatted as needed
data_dict = {}
data_dict.update(nodes=[])
data_dict.update(edges=[])

# Making each node category, and adding empty fields to it
for idx in range(0, len(theme_names)):
    nodes_entry = {}
    nodes_entry.update(clusterID=str(idx+1))
    nodes_entry.update(clusterLabel=theme_names[idx])
    nodes_entry.update(clusterDescription="...",)
    nodes_entry.update(nodes=[])
    data_dict['nodes'].append(nodes_entry)


# Read relevant columns from csv file
df = pd.read_csv(file_name, usecols=range(1,22))
# df[df.columns] = df.apply(lambda x: x.str.strip())
print(df.columns)


# Grab column names
# headers = df.iloc[0]
# new_df = pd.DataFrame(df.values[1:], columns=headers)

# Syntax formatting (Remove NaN and spaces from colum names)
sorted_df = df.replace(np.nan, '', regex=True)
sorted_df.columns = sorted_df.columns.str.replace(' ', '_')
print(sorted_df.columns)

# Create a dict of "Decade start" entries and their corresponding x-coords in pixels
x_count = 0
x_coord_dict = {}
grouped_df = sorted_df.groupby("Decade_start")
for key, item in grouped_df:
    x_coord_dict[key] = (x_count*horiz_space_intervals + horiz_offset)
    x_count+=1


# Create a dict of "College" entries and their corresponding y-coords in pixels
# The number of unique "College" names are determined by  
# the number of unique college names in each entry 
# If there are multiple, it only considers the first one listed in the entry/delineated with a comma
y_count = 0
y_coord_dict = {}
grouped_df = sorted_df.groupby("College")
for key, item in grouped_df:
    y_key = key
    y_key = y_key.split(",")[0]
    if y_key not in y_coord_dict:
        y_coord_dict[y_key] = (y_count*vert_space_intervals + vert_offset)
        y_count+=1


pajek_idx = 1

# Create nodes, add their entry information, append to final JSON object
# Attribute names of row object are HARD CODED. If you change a column name in the spreadsheet, 
# you will have to modify the corresponding name here
for entry in data_dict["nodes"]:
    entries = sorted_df.loc[sorted_df["Theme"] == entry["clusterLabel"]]
    id_count = 0
    for row in entries.itertuples():
        node_info = {}
        node_info.update(id=id_count)
        id_count+=1
        node_info.update(nodeLabel=row.Innovation)
        node_info.update(nodeDescription=row.Exhibit_description)
        node_attributes = {}
        node_attributes.update(Possible_object=row.Possible_object)
        connections = []
        node_attributes.update(Primary_ToI=row.Primary_ToI)
        if (row.Primary_ToI != ""):
            connections.append(row.Primary_ToI)
        node_attributes.update(Secondary_ToI=row.Secondary_ToI)
        if (row.Secondary_ToI != ""):
            connections.append(row.Secondary_ToI)
        node_attributes.update(Tertiary_ToI=row.Tertiary_ToI)
        if (row.Tertiary_ToI != ""):
            connections.append(row.Tertiary_ToI)
        node_attributes.update(URL=row.URL)
        node_attributes.update(Observations=row.Observations)
        node_attributes.update(College=row.College)
        node_attributes.update(Department=row.Department)
        node_attributes.update(Date_or_Decade=row.Decade_start)
        node_attributes.update(Photograph=row.Photograph)
        node_attributes.update(Faculty_Staff_Graduate_Undergrad=row.Members)
        node_attributes.update(Current_Faculty_research=row.Current_Faculty)
        node_attributes.update(Gender=row.Gender)
        node_attributes.update(Other="")
        node_info.update(nodeAttributes=node_attributes)

        vNode_info = {}
        node_info.update(connectors = connections)
        node_info.update(pajekIndex=pajek_idx)
        pajek_idx+=1

        vNode_info.update(posX=x_coord_dict[row.Decade_start])
        college = row.College.split(",")[0]
        vNode_info.update(posY=y_coord_dict[college])
        vNode_info.update(posZ=0)
        vNode_info.update(color="")
        node_info.update(vNode=vNode_info)
        entry["nodes"].append(node_info)


# Print out details
print("Y-coords:")
for key in y_coord_dict:
    print("College: ", key)
print("Num of rows: ", len(y_coord_dict))

print("\nX-coords:")
for key in x_coord_dict:
    print("Decade: ", key)
print("Num of cols: ", len(x_coord_dict))


# Write our JSON to a file
json_obj = json.dumps(data_dict, indent=2)
with open('nodes.json', 'w') as f:
    print(json_obj, file=f)