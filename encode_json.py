import base64

# Put the secret.json file name here
file_name = ''

def encode_image(image):
      with open(image, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
      return encoded_string

print(encode_image(file_name))