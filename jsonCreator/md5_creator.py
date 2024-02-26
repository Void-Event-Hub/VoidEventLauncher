import hashlib
import json
import os

file_name = "mods/" + str(input("Quel est le nom du fichier (copier/coller avec l'extension) "))

file_stats = os.stat(file_name)

version = str(input("Quelle est l'architecture ? (modder:modid:version) "))

name = str(input("Quel est le nom du fichier ? (mettre les majs) "))

type = str(input("Quel est le type: m ou f ? (m = mod; f = file) "))

if (type=="m"):
    type="ForgeMod"
elif (type=="f"):
    type="File"
else:
    print("Type de fichier non valable")

url = ("http://94.23.44.138/download/" + file_name)

isr = bool(input("Le mod est-il nécessaire ? (true/false) "))

with open(file_name, 'rb') as file_obj:
    file_contents = file_obj.read()
    md5_hash = hashlib.md5(file_contents).hexdigest()


dictionary = {
    "id": version,
    "name": name,
    "type": type,
    "required": {
        "value": isr
    },
    "artifact": {
        "size": file_stats.st_size,
        "MD5": md5_hash,
        "url": url
    }
}

# Serializing json
json_object = json.dumps(dictionary, indent=4)

# Writing to sample.json
with open("sample.json", "w") as outfile:
    outfile.write(json_object)