# Data format
import csv
import json
# Using argv
import sys

# argv check
if len(sys.argv) < 2:
    mag_min = 7.9
else:
    mag_min = float(sys.argv[1])

src = open("../HYG-Database/hygdata_v3.csv", "r")
rows = csv.reader(src)
rows = list(rows)
payload = list()

#Get index of each column
indexes = [proper, x, y, z, mag, lum, ci] = [rows[0].index(attr) for attr in ["proper", "x", "y", "z", "mag", "lum", "ci"]]

for row in rows[1:]:
    if float(row[mag]) <= mag_min:
        #reduced <= [('ra', '0.000000'), ('dec', '0.000000'), ('proper', 'Sol'), ('mag', '-26.700')]
        reduced = zip([rows[0][index] for index in indexes],[row[index] for index in indexes])
        payload.append(dict(reduced))

# Remove Sun!!!
payload = payload[1:]

# Write to json
dst = open("reduced.json", "w")
print(f"[*] Reduced -> {len(payload)}")
dst.write(json.dumps(payload, indent = 4))
